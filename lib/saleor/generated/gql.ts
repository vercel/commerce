/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'fragment FeaturedProduct on Product {\n  id\n  slug\n  name\n  isAvailableForPurchase\n  description\n  seoTitle\n  seoDescription\n  pricing {\n    priceRange {\n      start {\n        gross {\n          currency\n          amount\n        }\n      }\n      stop {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n  media {\n    url(size: 2160)\n    type\n    alt\n  }\n  collections {\n    name\n  }\n  updatedAt\n  variants {\n    id\n    name\n    pricing {\n      price {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n}':
    types.FeaturedProductFragmentDoc,
  'query GetCategoryBySlug($slug: String!) {\n  category(slug: $slug) {\n    id\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n  }\n}':
    types.GetCategoryBySlugDocument,
  'query GetCategoryProductsBySlug($slug: String!) {\n  category(slug: $slug) {\n    products(channel: "default-channel", first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          isAvailableForPurchase\n          description\n          seoTitle\n          seoDescription\n          pricing {\n            priceRange {\n              start {\n                gross {\n                  currency\n                  amount\n                }\n              }\n              stop {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n          media {\n            url(size: 2160)\n            type\n            alt\n          }\n          collections {\n            name\n          }\n          updatedAt\n          variants {\n            id\n            name\n            pricing {\n              price {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetCategoryProductsBySlugDocument,
  'query GetCollectionBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    id\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n  }\n}':
    types.GetCollectionBySlugDocument,
  'query GetCollectionProductsBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    products(first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          isAvailableForPurchase\n          description\n          seoTitle\n          seoDescription\n          pricing {\n            priceRange {\n              start {\n                gross {\n                  currency\n                  amount\n                }\n              }\n              stop {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n          media {\n            url(size: 2160)\n            type\n            alt\n          }\n          collections {\n            name\n          }\n          updatedAt\n          variants {\n            id\n            name\n            pricing {\n              price {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetCollectionProductsBySlugDocument,
  'query GetCollections {\n  collections(channel: "default-channel", first: 100) {\n    edges {\n      node {\n        id\n        name\n        slug\n        description\n        seoTitle\n        seoDescription\n      }\n    }\n  }\n}':
    types.GetCollectionsDocument,
  'query GetFeaturedProducts($first: Int!) {\n  products(first: $first, channel: "default-channel") {\n    edges {\n      node {\n        ...FeaturedProduct\n      }\n    }\n  }\n}':
    types.GetFeaturedProductsDocument,
  'fragment MenuItem on MenuItem {\n  id\n  name\n  url\n  collection {\n    slug\n  }\n  category {\n    slug\n  }\n  page {\n    slug\n  }\n}\n\nquery GetMenuBySlug($slug: String!) {\n  menu(slug: $slug, channel: "default-channel") {\n    id\n    slug\n    name\n    items {\n      ...MenuItem\n      children {\n        ...MenuItem\n        children {\n          ...MenuItem\n          children {\n            ...MenuItem\n          }\n        }\n      }\n    }\n  }\n}':
    types.MenuItemFragmentDoc,
  'query GetPageBySlug($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    slug\n    content\n    seoTitle\n    seoDescription\n    created\n  }\n}':
    types.GetPageBySlugDocument,
  'query GetPages {\n  pages(first: 10) {\n    edges {\n      node {\n        id\n        title\n        slug\n        content\n        seoTitle\n        seoDescription\n        created\n      }\n    }\n  }\n}':
    types.GetPagesDocument,
  'query GetProductBySlug($slug: String!) {\n  product(channel: "default-channel", slug: $slug) {\n    id\n    slug\n    name\n    isAvailableForPurchase\n    description\n    seoTitle\n    seoDescription\n    pricing {\n      priceRange {\n        start {\n          gross {\n            currency\n            amount\n          }\n        }\n        stop {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n    media {\n      url(size: 2160)\n      type\n      alt\n    }\n    collections {\n      name\n    }\n    updatedAt\n    variants {\n      id\n      name\n      pricing {\n        price {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetProductBySlugDocument,
  'query SearchProducts($search: String!, $sortBy: ProductOrderField!, $sortDirection: OrderDirection!) {\n  products(\n    first: 100\n    channel: "default-channel"\n    sortBy: {field: $sortBy, direction: $sortDirection}\n    filter: {search: $search}\n  ) {\n    edges {\n      node {\n        id\n        slug\n        name\n        isAvailableForPurchase\n        description\n        seoTitle\n        seoDescription\n        pricing {\n          priceRange {\n            start {\n              gross {\n                currency\n                amount\n              }\n            }\n            stop {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n        media {\n          url(size: 2160)\n          type\n          alt\n        }\n        collections {\n          name\n        }\n        updatedAt\n        variants {\n          id\n          name\n          pricing {\n            price {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.SearchProductsDocument,
  'query GetProducts {\n  products(first: 10, channel: "default-channel") {\n    edges {\n      node {\n        name\n      }\n    }\n  }\n}':
    types.GetProductsDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment FeaturedProduct on Product {\n  id\n  slug\n  name\n  isAvailableForPurchase\n  description\n  seoTitle\n  seoDescription\n  pricing {\n    priceRange {\n      start {\n        gross {\n          currency\n          amount\n        }\n      }\n      stop {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n  media {\n    url(size: 2160)\n    type\n    alt\n  }\n  collections {\n    name\n  }\n  updatedAt\n  variants {\n    id\n    name\n    pricing {\n      price {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n}'
): typeof import('./graphql').FeaturedProductFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCategoryBySlug($slug: String!) {\n  category(slug: $slug) {\n    id\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n  }\n}'
): typeof import('./graphql').GetCategoryBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCategoryProductsBySlug($slug: String!) {\n  category(slug: $slug) {\n    products(channel: "default-channel", first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          isAvailableForPurchase\n          description\n          seoTitle\n          seoDescription\n          pricing {\n            priceRange {\n              start {\n                gross {\n                  currency\n                  amount\n                }\n              }\n              stop {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n          media {\n            url(size: 2160)\n            type\n            alt\n          }\n          collections {\n            name\n          }\n          updatedAt\n          variants {\n            id\n            name\n            pricing {\n              price {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): typeof import('./graphql').GetCategoryProductsBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCollectionBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    id\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n  }\n}'
): typeof import('./graphql').GetCollectionBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCollectionProductsBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    products(first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          isAvailableForPurchase\n          description\n          seoTitle\n          seoDescription\n          pricing {\n            priceRange {\n              start {\n                gross {\n                  currency\n                  amount\n                }\n              }\n              stop {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n          media {\n            url(size: 2160)\n            type\n            alt\n          }\n          collections {\n            name\n          }\n          updatedAt\n          variants {\n            id\n            name\n            pricing {\n              price {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): typeof import('./graphql').GetCollectionProductsBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCollections {\n  collections(channel: "default-channel", first: 100) {\n    edges {\n      node {\n        id\n        name\n        slug\n        description\n        seoTitle\n        seoDescription\n      }\n    }\n  }\n}'
): typeof import('./graphql').GetCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetFeaturedProducts($first: Int!) {\n  products(first: $first, channel: "default-channel") {\n    edges {\n      node {\n        ...FeaturedProduct\n      }\n    }\n  }\n}'
): typeof import('./graphql').GetFeaturedProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment MenuItem on MenuItem {\n  id\n  name\n  url\n  collection {\n    slug\n  }\n  category {\n    slug\n  }\n  page {\n    slug\n  }\n}\n\nquery GetMenuBySlug($slug: String!) {\n  menu(slug: $slug, channel: "default-channel") {\n    id\n    slug\n    name\n    items {\n      ...MenuItem\n      children {\n        ...MenuItem\n        children {\n          ...MenuItem\n          children {\n            ...MenuItem\n          }\n        }\n      }\n    }\n  }\n}'
): typeof import('./graphql').MenuItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetPageBySlug($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    slug\n    content\n    seoTitle\n    seoDescription\n    created\n  }\n}'
): typeof import('./graphql').GetPageBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetPages {\n  pages(first: 10) {\n    edges {\n      node {\n        id\n        title\n        slug\n        content\n        seoTitle\n        seoDescription\n        created\n      }\n    }\n  }\n}'
): typeof import('./graphql').GetPagesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetProductBySlug($slug: String!) {\n  product(channel: "default-channel", slug: $slug) {\n    id\n    slug\n    name\n    isAvailableForPurchase\n    description\n    seoTitle\n    seoDescription\n    pricing {\n      priceRange {\n        start {\n          gross {\n            currency\n            amount\n          }\n        }\n        stop {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n    media {\n      url(size: 2160)\n      type\n      alt\n    }\n    collections {\n      name\n    }\n    updatedAt\n    variants {\n      id\n      name\n      pricing {\n        price {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n  }\n}'
): typeof import('./graphql').GetProductBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SearchProducts($search: String!, $sortBy: ProductOrderField!, $sortDirection: OrderDirection!) {\n  products(\n    first: 100\n    channel: "default-channel"\n    sortBy: {field: $sortBy, direction: $sortDirection}\n    filter: {search: $search}\n  ) {\n    edges {\n      node {\n        id\n        slug\n        name\n        isAvailableForPurchase\n        description\n        seoTitle\n        seoDescription\n        pricing {\n          priceRange {\n            start {\n              gross {\n                currency\n                amount\n              }\n            }\n            stop {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n        media {\n          url(size: 2160)\n          type\n          alt\n        }\n        collections {\n          name\n        }\n        updatedAt\n        variants {\n          id\n          name\n          pricing {\n            price {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): typeof import('./graphql').SearchProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetProducts {\n  products(first: 10, channel: "default-channel") {\n    edges {\n      node {\n        name\n      }\n    }\n  }\n}'
): typeof import('./graphql').GetProductsDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
