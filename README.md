[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgeins-io%2Fvercel-nextjs-commerce&env=GEINS_API_KEY,GEINS_ACCOUNT_NAME,GEINS_CHANNEL,GEINS_TLD,GEINS_LOCALE,GEINS_MARKET,GEINS_IMAGE_URL,GEINS_CURRENCY_CODE,GEINS_CHECKOUT_ID&envDescription=Read%20more%20about%20environment%20varibles%20in%20the%20example%20file&envLink=https%3A%2F%2Fgithub.com%2Fgeins-io%2Fvercel-nextjs-commerce%2Fblob%2Fmain%2F.env.example&project-name=geins-nextjs-commerce-starter&repository-name=geins-nextjs-commerce-starter&demo-title=Geins%20Next.js%20Commerce%20Starter&demo-description=Commerce%20website%20created%20with%20Next.js&demo-url=http%3A%2F%2Fgeins.io&demo-image=avatars.githubusercontent.com%2Fu%2F123540473)

# Next.js Commerce x Geins

A high-performance, server-rendered Next.js (15 RC) App Router ecommerce application.

This template showcases the integration of [Geins Commerce API](https://docs.geins.io) with [Next.js Commerce](https://github.com/vercel/commerce), leveraging the open-source [Geins SDK](https://github.com/geins-io/geins).

## Features

- **React Server Components**: Build fast and scalable UIs with Next.js's server-first approach.
- **Server Actions**: Simplify backend logic and data fetching.
- **Modern React APIs**: Including `Suspense` and `useOptimistic`.
- **Integration with Geins**: Harness the power of Geins for exceptional ecommerce capabilities.

## What is Geins?

[Geins](https://geins.io/) is the ultimate toolkit for modern commerce. With Geins, developers and agencies can craft unique, tailored shopping experiences using:

- A hybrid model combining the reliability of a managed platform with open-source flexibility.
- A robust API-first approach enabling precise customization.
- Features for managing channels, content, CRM, events, and more.

Explore the [Geins Commerce API documentation](https://docs.geins.io) for detailed usage instructions and capabilities.

## Getting Started

To run this application locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or later)
- [Geins API-Key](https://geins.io/)

### Environment Variables

Set up your environment variables as defined in `.env.example`. It's recommended to use [Vercel's Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for secure storage.

> ⚠️ **Important**: Never commit your `.env` file to version control.

### Steps to Run Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/geins-io/vercel-nextjs-commerce.git
   cd <your-repo>
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Link your local instance with Vercel and pull environment variables:

   ```bash
   npm i -g vercel
   vercel link
   vercel env pull
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Access the app on [http://localhost:3000](http://localhost:3000).
