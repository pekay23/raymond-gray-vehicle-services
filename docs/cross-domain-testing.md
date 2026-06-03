# Testing cross-domain booking submissions

The booking form posts **same-origin** to `/api/booking`, which proxies
**server-to-server** to `${NEXT_PUBLIC_API_URL}/api/vehicle-bookings` on the main
platform. Because the proxy is server-side, there is **no CORS** to satisfy — the
same code path works identically on localhost and on the live site. You only need
to point `NEXT_PUBLIC_API_URL` at a reachable platform.

## Environments

| Where you test | `NEXT_PUBLIC_API_URL` | Notes |
|---|---|---|
| **Localhost → live platform** (default) | `https://www.raymond-gray.org` | Full chain, no 2nd server. Writes to the **production** DB — use test data. |
| **Localhost → local platform** | `http://localhost:3000` | Fully offline. Run platform on `:3000`, run this site on another port: `bun run dev -- -p 3100`. |
| **Live site** | set in Vercel to `https://www.raymond-gray.org` | Real users. |

Both apps default to port `:3000`, so if you run both locally, move this one.

## Quick test (PowerShell)

The platform rejects submissions made <3s after `formLoadedAt`, so set it ~10s in
the past. `serviceType` must be one of `A1 A2 B1 B2 Repairs Diagnostics`.

```powershell
# 1) Local site (bun run dev) — exercises the proxy + whatever NEXT_PUBLIC_API_URL points at
$base = "http://localhost:3000"      # or your -p port

# 2) ...or hit the live site directly:
# $base = "https://vehicleservices.raymond-gray.org"

$body = @{
  fullName       = "TEST Booking"
  whatsappNumber = "+233551010108"
  email          = "test@example.com"
  vehicleMake    = "Toyota"
  vehicleModel   = "Camry"
  regNumber      = "TEST-0000"
  odometer       = "45000"
  serviceType    = "Diagnostics"
  description    = "Automated cross-domain test — please ignore."
  bookingOption  = "dropoff"
  location       = ""
  preferredDate  = ""
  formLoadedAt   = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds() - 10000
} | ConvertTo-Json

Invoke-RestMethod -Uri "$base/api/booking" -Method Post -ContentType "application/json" -Body $body
```

**Expected success:** `{ success = True; jobId = RGV-00042 }` (a sequential
`RGV-#####` id). Confirm it appears in the platform admin at
`/admin/vehicle-bookings`.

## Quick test (curl / bash)

```bash
BASE="http://localhost:3000"   # or https://vehicleservices.raymond-gray.org
LOADED=$(( $(date +%s%3N) - 10000 ))

curl -sS -X POST "$BASE/api/booking" \
  -H "Content-Type: application/json" \
  -d "{
    \"fullName\":\"TEST Booking\",
    \"whatsappNumber\":\"+233551010108\",
    \"email\":\"test@example.com\",
    \"vehicleMake\":\"Toyota\",\"vehicleModel\":\"Camry\",\"regNumber\":\"TEST-0000\",
    \"odometer\":\"45000\",\"serviceType\":\"Diagnostics\",
    \"description\":\"Automated cross-domain test\",
    \"bookingOption\":\"dropoff\",\"location\":\"\",\"preferredDate\":\"\",
    \"formLoadedAt\": $LOADED
  }"
```

## Interpreting results

| Response | Meaning |
|---|---|
| `{ success: true, jobId: "RGV-..." }` | ✅ End-to-end works. |
| `{ success: true, jobId: "RGV-..." }` but no admin row | The platform's bot/timing/honeypot check absorbed it — make `formLoadedAt` older and retry. |
| `502 Booking service is unavailable` | Proxy reached a non-JSON response — `NEXT_PUBLIC_API_URL` or the `/api/vehicle-bookings` path is wrong/unreachable. |
| `400 { error: "Validation Failed" }` | Payload shape rejected by the platform schema (check `serviceType` enum, `whatsappNumber` format, non-empty `description`). |
| `429` | Platform per-IP rate limit (5/window). Wait and retry. |

The browser UI also degrades gracefully: any failure on the page surfaces the
"Book via WhatsApp" fallback, so a misconfigured upstream never strands a lead.
