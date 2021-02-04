import { CommerceAPIFetchOptions } from '@commerce/api'
import {
  CheckoutCreateInput,
  CheckoutCreatePayload,
  Maybe,
} from '@framework/schema'
import { getProductQuery } from 'framework/bigcommerce/product/get-product'
import Cookies from 'js-cookie'
import { getConfig, ShopifyConfig } from '..'

const createCheckoutMutation = `
mutation($input) {
    checkoutCreate(input: $input) {
        checkout {
        id
        webUrl
        lineItems(first: 100) {
                edges {
                    node {
                        title
                        quantity
                    }
                }
            }
        }
    }
}
`

const getCheckoutQuery = `
query {
    shop {
        name
        currencyCode
        checkout {
            id
            webUrl
            lineItems(first: 100) {
                edges {
                    node {
                        title
                        quantity
                    }
                } 
            }
        }
    }
}
`

const createCheckout = async (fetcher: any, input: CheckoutCreateInput) => {
  return await fetcher(createCheckoutMutation, {
    variables: {
      input,
    },
  })
}

const getCheckout = async (req: any, res: any, config: any): Promise<any> => {
  console.log(config)

  return
  config = getConfig(config)

  const { data: shop } = await config.fetch(getProductQuery)

  const checkout = shop?.checkout
  const completedAt = checkout.completedAt

  const checkoutId = Cookies.get('nextjs-commerce-shopify-token')

  const checkoutCreateInput = {
    presentmentCurrencyCode: shop?.currencyCode,
  }

  // we could have a cart id stored in session storage
  // user could be refreshing or navigating back and forthlet checkoutResource
  let checkoutCreatePayload: Maybe<CheckoutCreatePayload>

  if (checkoutId) {
    checkoutCreatePayload = await createCheckout(
      config.fetch,
      checkoutCreateInput
    )
    const existingCheckout = checkoutCreatePayload?.checkout
    const completedAt = existingCheckout?.completedAt
    if (completedAt) {
      checkoutCreatePayload = await createCheckout(
        config.fetch,
        checkoutCreateInput
      )
    }
  } else {
    checkoutCreatePayload = await createCheckout(
      config.fetch,
      checkoutCreateInput
    )
  }

  console.log(checkout)
}

export default getCheckout
