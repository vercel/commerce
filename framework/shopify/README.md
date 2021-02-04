## Table of Contents

- [Getting Started](#getting-started)
  - [Modifications](#modifications)
    - [Adding item to Cart](#adding-item-to-cart)
    - [Proceed to Checkout](#proceed-to-checkout)
- [General Usage](#general-usage)
  - [CommerceProvider](#commerceprovider)
  - [useCommerce](#usecommerce)
- [Hooks](#hooks)
  - [usePrice](#useprice)
  - [useAddItem](#useadditem)
  - [useRemoveItem](#useremoveitem)
  - [useUpdateItem](#useupdateitem)
- [APIs](#apis)
  - [getProduct](#getproduct)
  - [getAllProducts](#getallproducts)
  - [getAllCollections](#getallcollections)
  - [getAllPages](#getallpages)

# Shopify Storefront Data Hooks

Collection of hooks and data fetching functions to integrate Shopify in a React application. Designed to work with [Next.js Commerce](https://demo.vercel.store/).

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
