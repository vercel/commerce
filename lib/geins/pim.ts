import { GeinsCore } from '@geins/core';
import { USE_CATEGORY_FOR_RECOMMENDATIONS_BACKUP } from './constants';
import { categoriesQuery } from './queries/queries/categories';
import { listPageInfoQuery } from './queries/queries/listPageInfo';
import { productQuery } from './queries/queries/product';
import { productsQuery } from './queries/queries/products';
import { relatedProductsQuery } from './queries/queries/products-related';
import {
  reshapeCategories,
  reshapeListPageMetadata,
  reshapeProduct,
  reshapeProducts,
  translateSortKey
} from './reshape';
import {
  CategoryItemType,
  CollectionType,
  ProductRelationType,
  ProductRelationTypeEnum,
  ProductType
} from './types';

export const getCategoryMetadata = async (
  geinsCore: GeinsCore,
  slug: string
): Promise<CollectionType> => {
  const data = await geinsCore.graphql.query({
    queryAsString: listPageInfoQuery,
    variables: { url: slug }
  });
  return reshapeListPageMetadata(data);
};

export const getCategories = async (
  geinsCore: GeinsCore,
  parentNodeId?: number
): Promise<CategoryItemType[]> => {
  const variables = {
    includeHidden: false,
    parentCategoryId: parentNodeId
  };
  const data = await geinsCore.graphql.query({ queryAsString: categoriesQuery, variables });
  return reshapeCategories(data);
};

export const getProduct = async (
  geinsCore: GeinsCore,
  slug: string
): Promise<ProductType | undefined> => {
  const variables = {
    alias: slug
  };
  const data = await geinsCore.graphql.query({ queryAsString: productQuery, variables });
  if (!data.product) {
    return undefined;
  }
  return reshapeProduct(data.product);
};

export const getProducts = async (
  geinsCore: GeinsCore,
  {
    query,
    reverse,
    sortKey
  }: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  }
): Promise<ProductType[]> => {
  const variables = {
    filter: {
      sort: translateSortKey(sortKey || '', reverse || false),
      includeCollapsed: true,
      filterMode: 'CURRENT',
      searchText: query
    }
  };

  const data = await geinsCore.graphql.query({ queryAsString: productsQuery, variables });
  if (!data || !data.products || !data.products.products) {
    return [];
  }

  return reshapeProducts(data.products.products);
};

export const getProductRecommendations = async (
  geinsCore: GeinsCore,
  product: ProductType
): Promise<ProductType[]> => {
  const variables = {
    alias: product.slug
  };

  const data = await geinsCore.graphql.query({ queryAsString: relatedProductsQuery, variables });

  if (data?.relatedProducts && data.relatedProducts.length > 0) {
    return reshapeProducts(data.relatedProducts);
  }

  if (USE_CATEGORY_FOR_RECOMMENDATIONS_BACKUP) {
    const categoryAlias = product.relations?.filter(
      (relation: ProductRelationType) => relation.type === ProductRelationTypeEnum.CATEGORY
    );
    if (categoryAlias && categoryAlias[0]) {
      return getCategoryProducts(geinsCore, { category: categoryAlias[0].alias, take: 4 });
    }
  }

  return [];
};

export const getCategoryProducts = async (
  geinsCore: GeinsCore,
  {
    category,
    reverse,
    sortKey,
    take,
    skip
  }: {
    category: string;
    reverse?: boolean;
    sortKey?: string;
    take?: number;
    skip?: number;
  }
): Promise<ProductType[]> => {
  const variables = {
    categoryAlias: category,
    filter: {
      sort: translateSortKey(sortKey || '', reverse || false),
      includeCollapsed: false
    },
    ...(take && { take }),
    ...(skip && { skip })
  };
  const data = await geinsCore.graphql.query({
    queryAsString: productsQuery,
    variables,
    requestOptions: { fetchPolicy: 'no-cache' }
  });

  if (!data || !data.products || !data.products.products) {
    return [];
  }

  return reshapeProducts(data.products.products);
};
