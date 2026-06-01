# ADR 003: Secure Payment Mutations and Secret Management

## Context
With the App Router, client-side code and server-side code live in close proximity. We must ensure that our private API keys for payment gateways (like Stripe or Shopify) are never exposed to the browser.

## Decision
1. **No Secrets in the Client:** Any React component marked with the `"use client"` directive is strictly forbidden from importing or accessing private environment variables (e.g., `process.env.STRIPE_SECRET_KEY`).
2. **Server Actions Only:** All payment processing, cart mutations, and checkout initializations must occur securely on the server using Next.js Server Actions or dedicated API Route Handlers.