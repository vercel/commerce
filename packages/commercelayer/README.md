# Commerce Layer Provider

Before getting started, you should do the following:

- Create a Commerce Layer [developer account](https://dashboard.commercelayer.io).
- Create a new [organization](https://commercelayer.io/docs/data-model/users-and-organizations/) for your business.
- Follow our [onboarding guides](https://docs.commercelayer.io/developers/) to setup your organization and create all the required resources.

Next, copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git) using the command below:

```bash
cp packages/commercelayer/.env.template .env.local
```

Next, add your `CLIENT_ID`, `ENDPOINT`, and `MARKET_SCOPE` from your organization's **sales_channel** application in `.env.local`.

```env
NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID="xxxxxxxxxxxx-RwM8YY5sq4wKQg4Q"
NEXT_PUBLIC_COMMERCELAYER_ENDPOINT="https://my-organization.commercelayer.io"
NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE="market:2952"
```

## Content management

Commerce Layer does not provide a collaborative environment to create and modify digital content but is [CMS agnostic](https://commercelayer.io/docs/core-concepts/content-vs-commerce). It manages the transactional part of a sales channel and allows users to integrate with any CMS of their choice. This will enable businesses to utilize any content model, produce a better customer experience, and unleash creativity. For now, in this provider, you will have to provide a JSON file containing your product content data as a variable in `.env.local`. This file must follow the same format [here](https://data.commercelayer.app/vercel-provider/content-data.json). In the future, you will be able to use your favorite CMSs out-of-the-box, or you can even set that up yourself now.

```
NEXT_PUBLIC_COMMERCELAYER_CONTENT_DATA_URL="https://data.commercelayer.app/vercel-provider/content-data.json"
```

<details>
  <summary>You content JSON file must follow this format.</summary>
  
  ```json
{
    "products": [
        {
      "id": "SHIRTWLS000000FFFFFF",
      "name": "Black Women Long Sleeve Shirt",
      "brandId": "Commerce Layer",
      "path": "/black-women-long-sleeve-shirt",
      "slug": "black-women-long-sleeve-shirt",
      "categoryId": "clothings",
      "price": { "value": 50, "currencyCode": "USD" },
      "descriptionHtml": "<p><span>This relaxed long sleeve tee combines the best of both worlds, proving that cozy can also be chic. 65/35 polyester/viscose. Drop shoulder. Curved bottom hem.</span></p>",
      "images": [
        {
          "url": "https://data.commercelayer.app/vercel-provider/SHIRTWLS000000FFFFFF_FLAT.png",
          "altText": " A Black Women Long Sleeve Shirt",
          "width": 1000,
          "height": 1000
        },
        {
          "url": "https://data.commercelayer.app/vercel-provider/SHIRTWLS000000FFFFFF_01.png",
          "altText": " A Black Women Long Sleeve Shirt",
          "width": 1000,
          "height": 1000
        },
        {
          "url": "https://data.commercelayer.app/vercel-provider/SHIRTWLS000000FFFFFF_02.png",
          "altText": " A Black Women Long Sleeve Shirt",
          "width": 1000,
          "height": 1000
        }
      ],
      "variants": [
        {
          "id": "SHIRTWLS000000FFFFFFXSXX",
          "options": [
            {
              "__typename": "MultipleChoiceOption",
              "id": "SHIRTWLS000000FFFFFFXSXX",
              "displayName": "Size",
              "values": [
                {
                  "label": "XS"
                }
              ]
            }
          ]
        },
        {
          "id": "SHIRTWLS000000FFFFFFSXXX",
          "options": [
            {
              "__typename": "MultipleChoiceOption",
              "id": "SHIRTWLS000000FFFFFFSXXX",
              "displayName": "Size",
              "values": [
                {
                  "label": "S"
                }
              ]
            }
          ]
        },
        {
          "id": "SHIRTWLS000000FFFFFFMXXX",
          "options": [
            {
              "__typename": "MultipleChoiceOption",
              "id": "SHIRTWLS000000FFFFFFMXXX",
              "displayName": "Size",
              "values": [
                {
                  "label": "M"
                }
              ]
            }
          ]
        },
        {
          "id": "SHIRTWLS000000FFFFFFLXXX",
          "options": [
            {
              "__typename": "MultipleChoiceOption",
              "id": "SHIRTWLS000000FFFFFFLXXX",
              "displayName": "Size",
              "values": [
                {
                  "label": "L"
                }
              ]
            }
          ]
        }
      ],
      "options": [
        {
          "id": "option-color",
          "displayName": "Color",
          "values": [
            {
              "label": "Black color",
              "hexColors": ["#000"]
            }
          ]
        },
        {
          "id": "option-size",
          "displayName": "Size",
          "values": [
            {
              "label": "XS"
            },
            {
              "label": "S"
            },
            {
              "label": "M"
            },
            {
              "label": "L"
            }
          ]
        }
      ]
    },
    {},
    {},
    ...
    ]
}
```
</details>

## Checkout

The checkout in this provider is powered by the open-sourced [Commmerce Layer React Checkout](https://github.com/commercelayer/commercelayer-react-checkout) application that provides you with a PCI-compliant, PSD2-compliant, and production-ready checkout flow that lets you easily place orders through the Commerce Layer API.

## Future upgrades

For now, this provider supports a single market. In the future, we would add multi-market support by default so you can add more than one market from your organization to your application. Also, note that the demo is configured to serve a US market; hence you need to checkout with an address in the United States to get the available shipping methods. You can learn more about how to create markets in different categorized geographical regions for your organization [in our documentation](https://commercelayer.io/docs/data-model/markets-and-business-models).

## Contribute

Our commitment to Open Source can be found [here](https://vercel.com/oss).

If you find an issue with the provider or want a new feature, feel free to open a PR or [create a new issue](https://github.com/vercel/commerce/issues).