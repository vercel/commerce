import {
  Product as BaseProduct,
  ProductVariant as BaseProductVariant,
  Cart as BaseCart,
  CheckoutResource as BaseCheckoutResource,
  AttributeInput,
  Client as BaseClient,
  Shop as BaseShop,
  Image as BaseImage,
} from 'shopify-buy'

export type SelectedOptions = {
  id: string
  name: string
  value: string
}

export type PresentmentPrice = {
  price: PriceV2
}

export type ProductVariant = BaseProductVariant & {
  selectedOptions: Array<SelectedOptions>
  presentmentPrices: Array<PresentmentPrice>
}

// TODO
export type ProductOptions = {
  node: {
    __typename: string
    displayName: string
    values: {
      edges: [
        {
          node: {
            label: string
            id: string
          }
        }
      ]
    }
  }
}

// TODO
export type ProductEdge = {
  node: Product
}

export type Product = BaseProduct & {
  handle: string
  name: string
  path: string
  entityId: number
  descriptionHtml: string
  prices: {
    price: {
      value: number
      currencyCode: string
    }
    retailPrice: {
      value: number
      currencyCode: string
    }
  }
  images: {
    edges: [{ node: { urlOriginal: string; altText: string } }]
  }
  productOptions: ProductOptions
  variants: Array<ProductVariant> & {
    edges: [
      {
        node: {
          productOptions: ProductOptions[]
          entityId: number
        }
      }
    ]
  }
}

export type PriceV2 = {
  amount: number
  currencyCode: string
}

export type Cart = BaseCart & {
  webUrl?: string
  currencyCode?: string
  lineItemsSubtotalPrice?: PriceV2
  totalPriceV2?: PriceV2
}

export type Shop = BaseShop & {
  currencyCode?: string
}

export type Create = {
  presentmentCurrencyCode?: string
}

export type CheckoutResource = BaseCheckoutResource & {
  updateLineItems(
    checkoutId: string | number,
    lineItems: AttributeInput[]
  ): Promise<Cart>

  create: (input: Create) => Promise<Cart>
}

export type Client = BaseClient & {
  checkout: CheckoutResource
}

export type Page = {
  id: string
  title: string
  name: string
  handle: string
  body: string
  bodySummary: string
  url: string
  sort_order: number
}

export type PageEdge = {
  node: Page
}

export type Image = BaseImage
