# Google Calendar Integration Setup

This project uses a Cloudflare Worker to fetch availability from multiple Google Calendars without exposing your calendar credentials.

## Prerequisites

1. **Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing

2. **Enable Google Calendar API**
   - Navigate to APIs & Services > Library
   - Search for "Google Calendar API"
   - Enable it

3. **Create Service Account**
   - Go to IAM & Admin > Service Accounts
   - Create a service account
   - Download the JSON key file (you'll need the private key)
   - Copy the service account email (e.g., `name@project.iam.gserviceaccount.com`)

4. **Share Your Calendars**
   - Open Google Calendar in browser
   - Go to Settings > Calendars
   - Click on each apartment calendar
   - Click "Share with specific people"
   - Add the service account email
   - Set permission to "See all event details"

## Environment Variables

Get these values from your service account JSON key:

```bash
CENTRO_CALENDAR_ID="your-calendar-id@group.calendar.google.com"
MAJESTIC_CALENDAR_ID="your-calendar-id@group.calendar.google.com"
MIRAMAR_CALENDAR_ID="your-calendar-id@group.calendar.google.com"
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
```

The private key should have `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` with newlines.

## Deploy to Cloudflare Workers

### Option 1: Quick Deploy (wrangler CLI)

```bash
npm install -g wrangler
wrangler login
```

Edit `wrangler.toml` to add your environment variables, or set them in the Cloudflare dashboard.

```bash
wrangler deploy
```

### Option 2: Cloudflare Dashboard

1. Go to [Cloudflare Workers](https://workers.cloudflare.com/)
2. Click "Create Worker"
3. Copy the contents of `worker.js` into the editor
4. Click "Save and Deploy"
5. Go to Settings > Variables
6. Add the environment variables:
   - `CENTRO_CALENDAR_ID`
   - `MAJESTIC_CALENDAR_ID`
   - `MAJESTIC_CALENDAR_ID`
   - `MIRAMAR_CALENDAR_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (the full private key including BEGIN/END markers)

## Update Your Site

Update the JavaScript to point to your worker URL:

In `js/app.js`, change:
```javascript
const response = await fetch('/availability?apartment=' + apartment);
```

To:
```javascript
const response = await fetch('https://your-worker.your-subdomain.workers.dev/availability?apartment=' + apartment);
```

## Testing

1. Deploy the worker
2. Visit `https://your-worker.workers.dev/availability?apartment=centro`
3. You should see JSON with busy dates: `{"busy":[{"start":"2024-02-01T00:00:00.000Z","end":"2024-02-05T00:00:00.000Z"}]}`

## Troubleshooting

- **401 Unauthorized**: Check service account email and calendar sharing permissions
- **403 Forbidden**: Ensure Google Calendar API is enabled
- **Empty busy array**: Make sure calendars have events and are shared with service account
- **Private key format**: Use the full key including BEGIN/END markers with proper line breaks
