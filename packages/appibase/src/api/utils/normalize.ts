import { Product, ProductOption, ProductImage } from '@vercel/commerce/types/product'
import { Category } from '@vercel/commerce/types/site'
import { Cart, LineItem } from '@vercel/commerce/types/cart'
import type { AppibaseProduct, AppibaseCollection, AppibaseCart } from '../../types'


const NormalizeProduct = (product: AppibaseProduct): Product => {
  const options: ProductOption[] = [];

  for(const variation of (product.variations?.data || [])) {
    const option : ProductOption | undefined = options.find(o => o.displayName === variation.name);
    if(!option) {
      options.push({ 
        id: `option-${variation.name.toLowerCase()}`, 
        displayName : variation.name, values: variation.options?.map(o => ({ label: o.name  })) || []
      });
    }  
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.image_urls.map(i => <ProductImage> { url: i }),
    sku: product.sku,
    slug: product.sku,
    variants: product.children?.data?.map(p => ({ 
      id: p.id,
      options: p.variation_options?.data.map(o => ({
        __typename: "MultipleChoiceOption",
        id: o.id,
        displayName: o.variation_name || "",
        values: [{ label: o.name || "" }]
      })) || []
    })) || [],
    price: { value: product.prices.data[0].amount.float, currencyCode: product.prices.data[0].currency },
    options
  }
}

const NormalizeCategory = (collection: AppibaseCollection): Category => {
  return {
    id: String(collection.id),
    name: collection.name,
    slug: collection.slug,
    path: '/' + collection.slug,
  }
}

const NormalizeCart = (cart: AppibaseCart): Cart => {
  return {
    id: String(cart.id),
    createdAt: (new Date()).toDateString(),
    currency: {
      code: cart.currency
    },
    taxesIncluded: cart.tax_incl,
    lineItemsSubtotalPrice: cart.subtotal_amount.float,
    subtotalPrice: cart.subtotal_amount.float,
    totalPrice: cart.total_amount.float,
    lineItems: cart.cart_items?.data.map(i => ({
      id: i.id,
      variantId: i.id,
      productId: i.id,
      name: i.name,
      discounts: [],
      path: i.sku,
      variant: {
        sku: i.sku,
        id: i.id,
        name: i.name,
        requiresShipping: true,
        price: i.price.float,
        listPrice: i.price.float,
        image: { url: i.image_url }
      },
      quantity: parseInt(i.quantity)
    })) || []
  }
}

export { NormalizeProduct, NormalizeCategory, NormalizeCart }