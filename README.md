# 3-Card Tarot Reading Web App

This is a full-stack web application for booking and paying for 3-card tarot readings, designed to be used with a live stream on Kick. It's built with Next.js, TypeScript, and Tailwind CSS, and uses Stripe for payments.

## Features

- **Mobile-First Design:** A clean, dark UI that looks great on any device.
- **Single Product:** A 3-Card Reading product.
- **Stripe Checkout:** Secure, one-time payments via Stripe Checkout.
- **Webhook Integration:** Confirmed orders are sent to an n8n workflow via a secure webhook.
- **No Database:** Order data is passed through Stripe's metadata, keeping the architecture simple.
- **Ready for Render:** Includes a `render.yaml` for easy deployment on Render.com.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Zod](https://zod.dev/) for validation

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)
- A [Stripe](https://stripe.com/) account
- An [n8n](https://n8n.io/) workflow with an incoming webhook trigger

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### 3. Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.local.example .env.local
```

Now, fill in the values in `.env.local`:

- `SITE_URL`: The public URL of your deployed application (e.g., `https://my-site.onrender.com`). For local development, use `http://localhost:3000`.
- `KICK_CHANNEL_URL`: The full URL to your Kick channel.
- `STRIPE_SECRET_KEY`: Your Stripe secret key (e.g., `sk_test_...`).
- `STRIPE_WEBHOOK_SECRET`: The signing secret for your Stripe webhook endpoint.
- `STRIPE_PRICE_3CARD`: The API ID of the Stripe Price for your product.
- `N8N_WEBHOOK_URL`: The URL of your n8n incoming webhook.
- `N8N_AUTH_SECRET`: A strong, random secret you create for signing payloads sent to n8n.

### 4. Creating the Stripe Product and Price

1.  Go to your Stripe Dashboard.
2.  Navigate to **Products** and click **+ Add product**.
3.  Fill in the product details (e.g., Name: "3-Card Reading").
4.  Under **Pricing**, set the price and currency.
5.  Click **Save product**.
6.  On the product page, find the **Pricing** section and copy the **API ID** (e.g., `price_...`). This is your `STRIPE_PRICE_3CARD`.

### 5. Running the Development Server

Once your environment variables are set, you can run the application locally:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Testing the Stripe Webhook Locally

To test the Stripe webhook integration on your local machine, you can use the [Stripe CLI](https://stripe.com/docs/stripe-cli).

1.  **Install the Stripe CLI** and log in to your account.

2.  **Forward webhook events** to your local server. The webhook endpoint is at `/api/stripe/webhook`.
    ```bash
    stripe listen --forward-to localhost:3000/api/stripe/webhook
    ```

3.  The CLI will print a **webhook signing secret** (e.g., `whsec_...`). Copy this and use it as your `STRIPE_WEBHOOK_SECRET` in your `.env.local` file.

4.  Now, when you complete a test purchase through the order form, Stripe will send the `checkout.session.completed` event to your local server, and you can see the logs in your terminal.

## Deployment on Render

This project is configured for deployment on [Render](https://render.com/).

1.  Create a new **Web Service** on Render and connect your GitHub repository.
2.  Render will automatically detect the `render.yaml` file and configure the service.
3.  Under **Environment**, add the environment variables from your `.env.local` file. **Important:** Do not commit your `.env.local` file to Git.
4.  Deploy the service. Render will use the `npm ci && npm run build` command to build the project and `npm run start` to run it.
5.  Once deployed, make sure to update your `SITE_URL` environment variable to the public URL provided by Render. You will also need to create a new webhook endpoint in Stripe that points to `https://your-site.onrender.com/api/stripe/webhook`.
