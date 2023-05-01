/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
  'query GetCollectionBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    id\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n  }\n}':
    types.GetCollectionBySlugDocument,
  'query GetCollectionProductsBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    products(first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          isAvailableForPurchase\n          description\n          seoTitle\n          seoDescription\n          pricing {\n            priceRange {\n              start {\n                gross {\n                  currency\n                  amount\n                }\n              }\n              stop {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n          media {\n            url(size: 2160)\n            type\n            alt\n          }\n          collections {\n            name\n          }\n          updatedAt\n          variants {\n            id\n            name\n            pricing {\n              price {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetCollectionProductsBySlugDocument,
  'query GetCollections {\n  collections(channel: "default-channel", first: 100) {\n    edges {\n      node {\n        id\n        name\n        slug\n        description\n        seoTitle\n        seoDescription\n      }\n    }\n  }\n}':
    types.GetCollectionsDocument,
  'query GetFeaturedProducts($first: Int!) {\n  products(first: $first, channel: "default-channel") {\n    edges {\n      node {\n        ...FeaturedProduct\n      }\n    }\n  }\n}':
    types.GetFeaturedProductsDocument,
  'query GetMenuBySlug($slug: String!) {\n  menu(slug: $slug, channel: "default-channel") {\n    id\n    slug\n    name\n    items {\n      id\n      name\n      url\n      collection {\n        slug\n      }\n      children {\n        id\n        collection {\n          slug\n        }\n      }\n    }\n  }\n}':
    types.GetMenuBySlugDocument,
  'query GetPageBySlug($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    slug\n    content\n    seoTitle\n    seoDescription\n    created\n  }\n}':
    types.GetPageBySlugDocument,
  'query GetProductBySlug($slug: String!) {\n  product(slug: $slug) {\n    id\n    slug\n    name\n    isAvailableForPurchase\n    description\n    seoTitle\n    seoDescription\n    pricing {\n      priceRange {\n        start {\n          gross {\n            currency\n            amount\n          }\n        }\n        stop {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n    media {\n      url(size: 2160)\n      type\n      alt\n    }\n    collections {\n      name\n    }\n    updatedAt\n    variants {\n      id\n      name\n      pricing {\n        price {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetProductBySlugDocument,
  'query SearchProducts($search: String!, $sortBy: ProductOrderField!, $sortDirection: OrderDirection!) {\n  products(\n    first: 100\n    channel: "default-channel"\n    sortBy: {field: $sortBy, direction: $sortDirection}\n    filter: {search: $search}\n  ) {\n    edges {\n      node {\n        id\n        slug\n        name\n        isAvailableForPurchase\n        description\n        seoTitle\n        seoDescription\n        pricing {\n          priceRange {\n            start {\n              gross {\n                currency\n                amount\n              }\n            }\n            stop {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n        media {\n          url(size: 2160)\n          type\n          alt\n        }\n        collections {\n          name\n        }\n        updatedAt\n        variants {\n          id\n          name\n          pricing {\n            price {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.SearchProductsDocument,
  'query GetProducts {\n  products(first: 10, channel: "default-channel") {\n    edges {\n      node {\n        name\n      }\n    }\n  }\n}':
    types.GetProductsDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment FeaturedProduct on Product {\n  id\n  slug\n  name\n  isAvailableForPurchase\n  description\n  seoTitle\n  seoDescription\n  pricing {\n    priceRange {\n      start {\n        gross {\n          currency\n          amount\n        }\n      }\n      stop {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n  media {\n    url(size: 2160)\n    type\n    alt\n  }\n  collections {\n    name\n  }\n  updatedAt\n  variants {\n    id\n    name\n    pricing {\n      price {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['fragment FeaturedProduct on Product {\n  id\n  slug\n  name\n  isAvailableForPurchase\n  description\n  seoTitle\n  seoDescription\n  pricing {\n    priceRange {\n      start {\n        gross {\n          currency\n          amount\n        }\n      }\n      stop {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n  media {\n    url(size: 2160)\n    type\n    alt\n  }\n  collections {\n    name\n  }\n  updatedAt\n  variants {\n    id\n    name\n    pricing {\n      price {\n        gross {\n          currency\n          amount\n        }\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCollectionBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    id\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n  }\n}'
): (typeof documents)['query GetCollectionBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    id\n    name\n    slug\n    description\n    seoTitle\n    seoDescription\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCollectionProductsBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    products(first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          isAvailableForPurchase\n          description\n          seoTitle\n          seoDescription\n          pricing {\n            priceRange {\n              start {\n                gross {\n                  currency\n                  amount\n                }\n              }\n              stop {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n          media {\n            url(size: 2160)\n            type\n            alt\n          }\n          collections {\n            name\n          }\n          updatedAt\n          variants {\n            id\n            name\n            pricing {\n              price {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetCollectionProductsBySlug($slug: String!) {\n  collection(channel: "default-channel", slug: $slug) {\n    products(first: 100) {\n      edges {\n        node {\n          id\n          slug\n          name\n          isAvailableForPurchase\n          description\n          seoTitle\n          seoDescription\n          pricing {\n            priceRange {\n              start {\n                gross {\n                  currency\n                  amount\n                }\n              }\n              stop {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n          media {\n            url(size: 2160)\n            type\n            alt\n          }\n          collections {\n            name\n          }\n          updatedAt\n          variants {\n            id\n            name\n            pricing {\n              price {\n                gross {\n                  currency\n                  amount\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetCollections {\n  collections(channel: "default-channel", first: 100) {\n    edges {\n      node {\n        id\n        name\n        slug\n        description\n        seoTitle\n        seoDescription\n      }\n    }\n  }\n}'
): (typeof documents)['query GetCollections {\n  collections(channel: "default-channel", first: 100) {\n    edges {\n      node {\n        id\n        name\n        slug\n        description\n        seoTitle\n        seoDescription\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetFeaturedProducts($first: Int!) {\n  products(first: $first, channel: "default-channel") {\n    edges {\n      node {\n        ...FeaturedProduct\n      }\n    }\n  }\n}'
): (typeof documents)['query GetFeaturedProducts($first: Int!) {\n  products(first: $first, channel: "default-channel") {\n    edges {\n      node {\n        ...FeaturedProduct\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetMenuBySlug($slug: String!) {\n  menu(slug: $slug, channel: "default-channel") {\n    id\n    slug\n    name\n    items {\n      id\n      name\n      url\n      collection {\n        slug\n      }\n      children {\n        id\n        collection {\n          slug\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetMenuBySlug($slug: String!) {\n  menu(slug: $slug, channel: "default-channel") {\n    id\n    slug\n    name\n    items {\n      id\n      name\n      url\n      collection {\n        slug\n      }\n      children {\n        id\n        collection {\n          slug\n        }\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetPageBySlug($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    slug\n    content\n    seoTitle\n    seoDescription\n    created\n  }\n}'
): (typeof documents)['query GetPageBySlug($slug: String!) {\n  page(slug: $slug) {\n    id\n    title\n    slug\n    content\n    seoTitle\n    seoDescription\n    created\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetProductBySlug($slug: String!) {\n  product(slug: $slug) {\n    id\n    slug\n    name\n    isAvailableForPurchase\n    description\n    seoTitle\n    seoDescription\n    pricing {\n      priceRange {\n        start {\n          gross {\n            currency\n            amount\n          }\n        }\n        stop {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n    media {\n      url(size: 2160)\n      type\n      alt\n    }\n    collections {\n      name\n    }\n    updatedAt\n    variants {\n      id\n      name\n      pricing {\n        price {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetProductBySlug($slug: String!) {\n  product(slug: $slug) {\n    id\n    slug\n    name\n    isAvailableForPurchase\n    description\n    seoTitle\n    seoDescription\n    pricing {\n      priceRange {\n        start {\n          gross {\n            currency\n            amount\n          }\n        }\n        stop {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n    media {\n      url(size: 2160)\n      type\n      alt\n    }\n    collections {\n      name\n    }\n    updatedAt\n    variants {\n      id\n      name\n      pricing {\n        price {\n          gross {\n            currency\n            amount\n          }\n        }\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query SearchProducts($search: String!, $sortBy: ProductOrderField!, $sortDirection: OrderDirection!) {\n  products(\n    first: 100\n    channel: "default-channel"\n    sortBy: {field: $sortBy, direction: $sortDirection}\n    filter: {search: $search}\n  ) {\n    edges {\n      node {\n        id\n        slug\n        name\n        isAvailableForPurchase\n        description\n        seoTitle\n        seoDescription\n        pricing {\n          priceRange {\n            start {\n              gross {\n                currency\n                amount\n              }\n            }\n            stop {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n        media {\n          url(size: 2160)\n          type\n          alt\n        }\n        collections {\n          name\n        }\n        updatedAt\n        variants {\n          id\n          name\n          pricing {\n            price {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query SearchProducts($search: String!, $sortBy: ProductOrderField!, $sortDirection: OrderDirection!) {\n  products(\n    first: 100\n    channel: "default-channel"\n    sortBy: {field: $sortBy, direction: $sortDirection}\n    filter: {search: $search}\n  ) {\n    edges {\n      node {\n        id\n        slug\n        name\n        isAvailableForPurchase\n        description\n        seoTitle\n        seoDescription\n        pricing {\n          priceRange {\n            start {\n              gross {\n                currency\n                amount\n              }\n            }\n            stop {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n        media {\n          url(size: 2160)\n          type\n          alt\n        }\n        collections {\n          name\n        }\n        updatedAt\n        variants {\n          id\n          name\n          pricing {\n            price {\n              gross {\n                currency\n                amount\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetProducts {\n  products(first: 10, channel: "default-channel") {\n    edges {\n      node {\n        name\n      }\n    }\n  }\n}'
): (typeof documents)['query GetProducts {\n  products(first: 10, channel: "default-channel") {\n    edges {\n      node {\n        name\n      }\n    }\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
