import { ShopifyConfig } from '../api'
import fetchAllProducts from '../api/utils/fetch-all-products'
import getAllProductVendors from './queries/get-all-product-vendors-query'

export type Brand = {
  entityId: string
  name: string
  path: string
}

export type BrandEdge = {
  node: Brand
}

export type Brands = BrandEdge[]

const getVendors = async (config: ShopifyConfig): Promise<BrandEdge[]> => {
  const vendors = await fetchAllProducts({
    config,
    query: getAllProductVendors,
    variables: {
      first: 250,
    },
  })

  let vendorsStrings = vendors.map(({ node: { vendor } }) => vendor)

  return [...new Set(vendorsStrings)].map((v) => {
    const id = v.replace(/\s+/g, '-').toLowerCase()
    return {
      node: {
        entityId: id,
        name: v,
        path: `brands/${id}`,
      },
    }
  })
}

export default getVendors
