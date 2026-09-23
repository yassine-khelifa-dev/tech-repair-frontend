# Tech Repair Frontend

Tech Repair Frontend is the customer-facing React application for submitting repair requests. It connects to the Laravel backend, loads the device catalog dynamically, and lets customers describe a repair issue with the correct device model and supported specification options.

The frontend is intentionally separated from the backend repository. The Laravel backend manages the admin workflow, database, API, model configuration, repair requests, tickets, and notifications. This React app focuses on the public customer experience.

## Project Links

- Frontend repository: https://github.com/yassine-khelifa-dev/tech-repair-frontend
- Backend repository: https://github.com/yassine-khelifa-dev/tech-repair

The deployed frontend and backend URLs are configured outside the repository. Server paths, domains, credentials, and deployment-specific details should not be committed.

## Stack

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Axios
- Tailwind CSS

## What The Frontend Does

The repair request form is driven by the backend catalog.

The customer flow is:

1. Select a device category.
2. Select a brand.
3. Select a device model.
4. Load the attributes and options allowed for that selected model.
5. Fill in customer information.
6. Add device identifiers and issue description.
7. Upload optional device images.
8. Submit the repair request to the Laravel API.

The important part is that the frontend does not hardcode options like colors, RAM, or storage. Those values come from the backend. If a model only supports selected options, the form only displays those options.

## API Connection

The production API base URL is configured with:

```env
VITE_API_BASE_URL=https://your-backend-domain.example/api
```

The Axios client is defined in:

```text
src/api/axios.ts
```

## Routes

```text
/                         Home page
/repair-request           Repair request form
/repair-request/success   Success confirmation
```

## Local Installation

```bash
npm install
npm run dev
```

For local backend development, create a local environment file:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Then start the Laravel backend locally:

```bash
php artisan serve
```

## Production Build

```bash
npm run build
```

The build output is generated in:

```text
dist/
```

When the hosting environment cannot run Node.js, the production build can be generated locally and the `dist` folder can be committed when needed.

## Deployment Notes

Build the frontend locally, commit the generated `dist` files when the hosting environment cannot run Node.js, then update the deployment directory from Git:

```bash
git pull origin main
```

If the web root cannot point directly to `dist`, use the hosting configuration or an `.htaccess` file to route requests to the built app.

## Related Backend

The Laravel backend repository is:

https://github.com/yassine-khelifa-dev/tech-repair

The backend provides the catalog API, repair request endpoint, admin dashboard, repair ticket workflow, notifications, and dynamic model configuration.
