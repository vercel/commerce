import { SwellConfig } from '../api'

export type BrandNode = {
  name: string
  path: string
}

export type BrandEdge = {
  node: BrandNode
}

export type Brands = BrandEdge[]

const getVendors = async (config: SwellConfig) => {
  const vendors: [string] =
    (await config.fetch('attributes', 'get', ['brand']))?.values ?? []

  return [...new Set(vendors)].map((v) => ({
    node: {
      entityId: v,
      name: v,
      path: `brands/${v}`,
    },
  }))
}

export default getVendors
