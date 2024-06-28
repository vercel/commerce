const addressFragment = /* GraphQL */ `
  fragment Address on CustomerAddress {
    id
    address1
    address2
    firstName
    lastName
    provinceCode: zoneCode
    city
    zip
    countryCodeV2: territoryCode
    company
    phone: phoneNumber
  }
`;

export default addressFragment;
