import { SwellConfig } from '../api'

const getVendors = async (config: SwellConfig) => {
  const vendors: [string] =
    (await config.fetch('attributes', 'get', ['brand']))?.values ?? []

  return [...new Set(vendors)].map((v) => ({
    id: v,
    name: v,
    slug: v.replace(/\s+/g, '-').toLowerCase(),
    path: `/${v}`,
  }))
}

export default getVendors
