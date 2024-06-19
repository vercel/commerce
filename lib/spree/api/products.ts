import commerce from '@market/client';
import { ProductAttr, extractSuccess } from '@spree/storefront-api-v2-sdk';

export async function getProduct(id: string): Promise<ProductAttr | null> {
  let product = null;

  const params = {
    id,
    include: 'option_types'
  };

  try {
    const response = await extractSuccess(commerce.products.show(params));
    product = response.data;
  } catch (error) {
    console.log('Error fetching product', error);
  }

  return product;
}

export async function getProducts({ taxons = [] } = {}): Promise<ProductAttr[]> {
  const filter = { filter: { taxons: taxons.join(',') }, sort: '-updated_at' };

  const params = {
    methodPath: 'products.list',
    arguments: [
      {
        include: 'option_types',
        per_page: 100,
        ...filter
      }
    ]
  };

  const successResponse = await extractSuccess(commerce.products.list(params));

  return successResponse.data;
}
