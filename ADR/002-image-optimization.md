# ADR 002: Next.js Image Optimization

## Context
E-commerce storefronts are highly sensitive to load times. Unoptimized product images are the number one cause of poor Core Web Vitals.

## Decision
1. **Mandatory Next/Image:** The native HTML `<img>` tag is strictly forbidden anywhere in the repository.
2. All images must utilize the `next/image` component to ensure automatic WebP conversion, lazy loading, and proper sizing.