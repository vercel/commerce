export const viewerQuery = /* GraphQL */ `
  query viewer {
    viewer {
      _id
      addressBook {
        edges {
          node {
            _id
            isBillingDefault
            isShippingDefault
            phone
          }
        }
      }
      emailRecords {
        address
      }
      firstName
      lastName
      name
      primaryEmailAddress
      createdAt
    }
  }
`
export default viewerQuery
