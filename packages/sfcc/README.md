# Next.js SalesForce Cloud Commerce Provider

SalesForce Cloud Commerce Demo: https://salesforce-cloud-commerce.vercel.store/

## Installation

1. Copy the `.env.template` file in this directory to `/site/.env.local` in the main directory
2. Run `yarn` and then `yarn dev` in root folder

## Features:

```json
{
  "provider": "sfcc",
  "features": {
    "wishlist": false,
    "cart": false,
    "search": true,
    "customerAuth": false,
    "customCheckout": false
  }
}
```

## References

- SDK: https://github.com/SalesforceCommerceCloud/commerce-sdk
- isomorphic SDK (currently not used atm): https://github.com/SalesforceCommerceCloud/commerce-sdk-isomorphic
- PWA Kit storefront example: https://pwa-kit.mobify-storefront.com/

## Training Material and Documentation:

For a detailed introduction into commerce clouds feature set and data setup please refer to our Training Material and Documentation:

- [Salesforce Trailhead for B2C Commerce Cloud](https://trailhead.salesforce.com/en/content/learn/trails/cc-overview)
- [Salesforce Trailhead for Development on B2C Commerce Cloud](https://trailhead.salesforce.com/en/content/learn/trails/develop-for-commerce-cloud)
- [B2C Commerce Cloud Documentation](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp)
- [B2C Commerce Cloud Open Commerce API Doc](https://documentation.b2c.commercecloud.salesforce.com/DOC1/topic/com.demandware.dochelp/OCAPI/current/usage/OpenCommerceAPI.html?cp=0_15)
- [Developer Center for Commerce Cloud (Commerce APIs specifically)](https://developer.salesforce.com/docs/commerce/commerce-api/overview)
- [SLAS Org Admin Setup Guide](https://developer.salesforce.com/docs/commerce/commerce-api/references?meta=slas-admin:Summary)
