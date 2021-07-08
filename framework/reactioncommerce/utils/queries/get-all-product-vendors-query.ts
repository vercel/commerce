const getAllProductVendors = /* GraphQL */ `
  query getAllProductVendors($shopIds: [ID]!) {
    vendors(shopIds: $shopIds) {
      nodes {
        name
      }
    }
  }
`
export default getAllProductVendors
