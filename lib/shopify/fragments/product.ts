import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
    fragment product on Product {
        id
        handle
        availableForSale
        title
        description
        descriptionHtml
        options {
            id
            name
            values
        }
        priceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
        variants(first: 250) {
            edges {
                node {
                    id
                    title
                    availableForSale
                    selectedOptions {
                        name
                        value
                    }
                    price {
                        amount
                        currencyCode
                    }
                }
            }
        }
        featuredImage {
            ...image
        }
        images(first: 99) {
            edges {
                node {
                    ...image
                }
            }
        }
        seo {
            ...seo
        }
        tags
        updatedAt
        collections(first: 99) {
            nodes {
                handle
                title
            }
        }
        compareAtPriceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
    }
    ${imageFragment}
    ${seoFragment}
`;

export default productFragment;
