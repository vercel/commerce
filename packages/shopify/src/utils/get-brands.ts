import {
  GetAllProductVendorsQuery,
  GetAllProductVendorsQueryVariables,
} from '../../schema'
import { ShopifyConfig } from '../api'
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

const getBrands = async (config: ShopifyConfig): Promise<BrandEdge[]> => {
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
      node: {
        entityId: id,
        name: v,
        path: `brands/${id}`,
      },
    }
  })
}

export default getBrands
