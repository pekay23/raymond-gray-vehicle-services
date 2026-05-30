# Future Plans: Raymond Gray Vehicle Services Subdomain

## Phase 3: Deployment & Infrastructure Setup

### 1. Vercel Deployment
- Initialize a Git repository for this project and push to GitHub.
- Import the repository into Vercel as a Next.js project.
- Configure Environment Variables in Vercel:
  - set `NEXT_PUBLIC_API_URL` to `https://raymond-gray.org` (the production API endpoint for the main platform).

### 2. DNS & Custom Domain Configuration
- In Vercel, assign the custom domain `vehicleservices.raymond-gray.org` to the project.
- In your DNS provider, configure the necessary CNAME/A records pointing to Vercel.

### 3. API Security & CORS Tightening (Main Platform)
- Once the subdomain is live, update the CORS configuration in the main platform's API route (`src/app/api/vehicle-bookings/route.ts`).
- Change the wildcard `*` origin to strictly allow only `https://vehicleservices.raymond-gray.org` to prevent unauthorized form submissions.

## Phase 4: Final Cleanup (Main Platform)

### 1. Permanent SEO Redirects
- Remove the temporary `redirect()` component inside `src/app/(public)/services/vehicle-repairs/page.tsx`.
- Configure a permanent HTTP 301 redirect in the main platform's `next.config.ts` to point `/services/vehicle-repairs` directly to `https://vehicleservices.raymond-gray.org`.

### 2. Legal & Documentation Updates
- Update the Privacy Policy and Terms & Conditions on the main platform to clarify that vehicle service data and processing are handled via the dedicated subdomain.

### 3. Continuous Integration
- Ensure that any future changes to the Shared Admin Portal (Main Platform) APIs consider backwards compatibility with the data structures submitted by the satellite form.
