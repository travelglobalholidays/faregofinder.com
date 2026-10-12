# Flight search and booking integration

The `/flights` form connects to `/flights/result`, offer selection, login or registration, booking review, traveller details, add-ons, payment review, and booking confirmation. Components use the existing FaresGoFinder theme variables, logo, and centralized contact information.

Browser API requests go through `/api/[...path]`. The proxy uses `API_URL`, then `NEXT_PUBLIC_API_URL`, then `https://api.airflighto.com/api`. Local environment files point to the same backend as Flightoway. Set the matching environment variable in hosting configuration when deploying.

Search URLs retain itinerary and passenger details. Reloading or sharing a results URL fetches fresh offers. Filters and pagination use the current search; refreshing results makes a new request. Login and registration resume the selected offer, retain failed drafts for retry, and reject expired offers. Booking routes require authentication.

Run `npm run test:booking` for the eight regression tests and `npm run build` for the production build.

## Verification and remaining backend issue

Production build and eight regression tests passed. HTTP route checks passed for search, results, authentication, and booking steps. A real API search returned 216 one-way offers; a round-trip search returned 948 offers with two itinerary legs.

The shared backend currently returns a one-passenger offer when searching for two adults and one child. The frontend rejects these offers instead of displaying incorrect group fares. Local backend source at `D:/RanaAtishProjects/airflighto/airflighto_backend/src/controllers/flight.controllers.js` normalizes passenger counts to an array, while `src/services/duffel.service.js` expects a counts object and defaults that array to one adult. The deployed backend must make those formats consistent before multi-traveller booking can work. No backend source or deployed service was modified.

Authentication, draft continuation, and booking endpoints were verified with isolated regression fixtures. Actual user login, payment submission, and ticket confirmation were not performed. Visual browser verification was unavailable in this session.
