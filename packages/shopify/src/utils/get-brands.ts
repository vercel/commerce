import {
  GetAllProductVendorsQuery,
  GetAllProductVendorsQueryVariables,
} from '../../schema'
import { ShopifyConfig } from '../api'
import getAllProductVendors from './queries/get-all-product-vendors-query'

const getBrands = async (config: ShopifyConfig) => {
  const { data } = await config.fetch<
    GetAllProductVendorsQuery,
    GetAllProductVendorsQueryVariables
  >(getAllProductVendors, {
    variables: {
      first: 250,
    },
  })

  let vendorsStrings = data.products.edges.map(({ node: { vendor } }) => vendor)

  return [...new Set(vendorsStrings)].map((v) => {
    const id = v.replace(/\s+/g, '-').toLowerCase()
    return {
      id,
      name: v,
      slug: id,
      path: `/${id}`,
    }
  })
}

export default getBrands
