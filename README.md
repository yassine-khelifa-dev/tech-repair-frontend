# Tech Repair Frontend

Tech Repair Frontend is the customer-facing React application for submitting repair requests. It connects to the Laravel backend, loads the device catalog dynamically, and lets customers describe a repair issue with the correct device model and supported specification options.

The frontend is intentionally separated from the backend repository. The Laravel backend manages the admin workflow, database, API, model configuration, repair requests, tickets, and notifications. This React app focuses on the public customer experience.

## Project Links

- Frontend repository: https://github.com/yassine-khelifa-dev/tech-repair-frontend
- Backend repository: https://github.com/yassine-khelifa-dev/tech-repair
- Customer request app: https://repair-request.eprostam.com
- Backend/admin app: https://tech-repair.eprostam.com

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
VITE_API_BASE_URL=https://tech-repair.eprostam.com/api
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

Because the current Hostinger server does not provide `npm`, the production build is generated locally and the `dist` folder is committed when needed.

## Hostinger Deployment

The frontend is deployed under:

```text
/home/u384905436/domains/eprostam.com/public_html/repair-request
```

After pushing changes to GitHub, update the server with:

```bash
cd /home/u384905436/domains/eprostam.com/public_html/repair-request
git pull origin main
```

If the domain cannot point directly to `dist`, use an `.htaccess` file in the project root to route requests to the built app.

## Related Backend

The Laravel backend repository is:

https://github.com/yassine-khelifa-dev/tech-repair

The backend provides the catalog API, repair request endpoint, admin dashboard, repair ticket workflow, notifications, and dynamic model configuration.
