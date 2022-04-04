
import { GetProductOperation, Product } from '@vercel/commerce/types/product'
import type { SFCCConfig } from '../index'
import type { OperationContext } from '@vercel/commerce/api/operations'
import staticData from '../../data.json'
import { normalizeProduct } from '../utils/normalise-product';

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<SFCCConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {    

    // TODO: support locale
    const { sdk, locale } = commerce.getConfig(config) as SFCCConfig
    const shopperProductsClient = await sdk.getshopperProductsClient()
    const product = await shopperProductsClient.getProduct({parameters: {id: variables?.slug as string}});
    const normalizedProduct = normalizeProduct(product)
  
    // TODO: add dummy data 
    const singleProduct = staticData.products.find(({ slug }) => slug === "new-short-sleeve-t-shirt");
    if (singleProduct) {
      console.log(" == API == operations == getProductOperation = singleProduct: ", singleProduct)
      // normalizedProduct['images'] = singleProduct['images']
      normalizedProduct['variants'] = singleProduct['variants'] as any // TODO: variants
      normalizedProduct['options'] = singleProduct['options'] // TODO: options
    }

    return {
      product: normalizedProduct,
    }
  }

  return getProduct
}
