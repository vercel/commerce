import { productInfo } from './product';

export const searchFacets = /* GraphQL */`
fragment searchFacets on Facet {
    label
    field
    values {
        label
        value
        isApplied
        filterValue
        isDisplayed
        count
    }
}`;

export const searchResults = /* GraphQL */`
fragment searchResults on ProductSearchResult {
    totalCount
    pageSize
    pageCount
    startIndex
    items {
        ...productInfo
    }
    facets {
        ...searchFacets
    }
}
${searchFacets}
${productInfo}
`;
