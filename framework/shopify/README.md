## Getting Started

1. Environment variables need to be set:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=
```

2. Point the framework to `shopify` by updating `tsconfig.json`:

```
"@framework/*": ["framework/shopify/*"],
"@framework": ["framework/shopify"]
```
