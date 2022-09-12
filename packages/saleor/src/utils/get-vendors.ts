import { SaleorConfig } from '../api'

export type Brand = {
  entityId: string
  name: string
  path: string
}

export type BrandEdge = {
  node: Brand
}

export type Brands = BrandEdge[]

// TODO: Find a way to get vendors from meta
const getVendors = async (config: SaleorConfig): Promise<BrandEdge[]> => {
  // const vendors = await fetchAllProducts({
  //   config,
  //   query: getAllProductVendors,
  //   variables: {
  //     first: 100,
  //   },
  // })

  // let vendorsStrings = vendors.map(({ node: { vendor } }) => vendor)

  // return [...new Set(vendorsStrings)].map((v) => {
  //   const id = v.replace(/\s+/g, '-').toLowerCase()
  //   return {
  //     node: {
  //       entityId: id,
  //       name: v,
  //       path: `/${id}`,
  //     },
  //   }
  // })

  return []
}

export default getVendors
