import normalizeProduct from '../../utils/normalizations/normalize-product';
import { requireConfigValue } from '../../isomorphic-config';

const imagesSize = requireConfigValue('imagesSize');
const imagesQuality = requireConfigValue('imagesQuality');

export default function getProductsOperation({ commerce }) {
  async function getProducts({ taxons = [], config: userConfig } = {}) {
    const filter = { filter: { taxons: taxons.join(',') }, sort: '-updated_at' };

    const variables = {
      methodPath: 'products.list',
      arguments: [
        {
          include: 'primary_variant,variants,images,option_types,variants.option_values',
          per_page: 100,
          ...filter,
          image_transformation: {
            quality: imagesQuality,
            size: imagesSize
          }
        }
      ]
    };

    const config = commerce.getConfig(userConfig);
    const { fetch: apiFetch } = config;
    const { data: spreeSuccessResponse } = await apiFetch('__UNUSED__', { variables });
    const normalizedProducts = spreeSuccessResponse.data.map((spreeProduct) =>
      normalizeProduct(spreeSuccessResponse, spreeProduct)
    );

    return { products: normalizedProducts };
  }

  return getProducts;
}
