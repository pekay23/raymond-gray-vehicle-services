# Advanced Booking System

The application features a robust, multi-step booking wizard located at `/book`. This flow is designed to gather comprehensive service requests efficiently while preventing spam and ensuring a high conversion rate.

## Booking Wizard Steps

### 1. Vehicle Details
Captures essential vehicle information to prime the workshop.
*   **Fields:** Make, Model, Registration Number, and current Odometer reading.

### 2. Maintenance Type
Allows users to select from structured service tiers.
*   **Tiers:** A1 (Minor), A2 (Intermediate), B1 (Major), B2 (Complete Plan), General Repairs, or Diagnostics.
*   **Custom Inputs:** Includes a free-text area for specific fault descriptions or unusual noises.

### 3. Service Logistics
Determines how the vehicle reaches the service team.
*   **Workshop Drop-off:** Standard facility visit.
*   **Home Call / Towing:** Triggers an interactive **Location Picker** component that captures precise geographic coordinates (latitude/longitude) and street addresses.
*   **Scheduling:** Integrated date picker for preferred service dates.

### 4. Contact & Confirmation
Finalizes the booking and collects authorization.
*   **Fields:** Captures user contact details including a WhatsApp number and Email.
*   **Review Summary:** Displays a dynamic summary of the selected vehicle, service, and logistics strategy.
*   **Authorization:** Requires explicit agreement to terms regarding quotes, itemized parts, and repair authorizations.

## Submission & Fallbacks

*   **API Submission:** The form attempts a direct secure JSON submission to the backend API.
*   **WhatsApp Fallback & Integration:** If the API is unavailable, or if the user explicitly prefers direct contact, the system generates a pre-filled WhatsApp message containing the full booking summary, ensuring the lead is never lost.
*   **Bot Protection:** Measures the exact time taken to complete the form. Submissions occurring in under 3 seconds are silently dropped as bot traffic to protect backend resources.
