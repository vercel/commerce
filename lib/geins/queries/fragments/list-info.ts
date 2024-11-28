import metaFragment from './meta';

const listInfoFragment = /* GraphQL */ `
  fragment ListInfo on PageInfoType {
    id
    alias
    canonicalUrl
    primaryImage
    name
    primaryDescription
    secondaryDescription
    hideTitle
    hideDescription
    logo
    meta {
      ...Meta
    }
    subCategories {
      name
      alias
      canonicalUrl
    }
  }
  ${metaFragment}
`;
export default listInfoFragment;
