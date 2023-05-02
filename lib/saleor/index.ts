import { Cart, Collection, Menu, Page, Product } from 'lib/types';
import { parseEditorJsToHtml } from './editorjs';
import {
  GetCategoryBySlugDocument,
  GetCategoryProductsBySlugDocument,
  GetCollectionBySlugDocument,
  GetCollectionProductsBySlugDocument,
  GetCollectionsDocument,
  GetMenuBySlugDocument,
  GetPageBySlugDocument,
  GetPagesDocument,
  GetProductBySlugDocument,
  MenuItemFragment,
  OrderDirection,
  ProductOrderField,
  SearchProductsDocument,
  TypedDocumentString
} from './generated/graphql';
import { invariant } from './utils';

const endpoint = process.env.SALEOR_INSTANCE_URL;
invariant(endpoint, `Missing SALEOR_INSTANCE_URL!`);

type GraphQlError = {
  message: string;
};
type GraphQlErrorRespone<T> = { data: T } | { errors: readonly GraphQlError[] };

export async function saleorFetch<Result, Variables>({
  query,
  variables,
  headers,
  cache = 'force-cache'
}: {
  query: TypedDocumentString<Result, Variables>;
  variables: Variables;
  headers?: HeadersInit;
  cache?: RequestCache;
}): Promise<Result> {
  invariant(endpoint, `Missing SALEOR_INSTANCE_URL!`);

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({
      query: query.toString(),
      ...(variables && { variables })
    }),
    cache,
    next: { revalidate: 900 } // 15 minutes
  });

  const body = (await result.json()) as GraphQlErrorRespone<Result>;

  if ('errors' in body) {
    throw body.errors[0];
  }

  return body.data;
}

export async function getCollections(): Promise<Collection[]> {
  const saleorCollections = await saleorFetch({
    query: GetCollectionsDocument,
    variables: {}
  });

  return (
    saleorCollections.collections?.edges.map((edge) => {
      return {
        handle: edge.node.slug,
        title: edge.node.name,
        description: edge.node.description as string,
        seo: {
          title: edge.node.seoTitle || edge.node.name,
          description: edge.node.seoDescription || ''
        },
        updatedAt: '', // @todo ?
        path: `/search/${edge.node.slug}`
      };
    }) ?? []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const saleorPage = await saleorFetch({
    query: GetPageBySlugDocument,
    variables: {
      slug: handle
    }
  });

  if (!saleorPage.page) {
    throw new Error(`Page not found: ${handle}`);
  }

  return {
    id: saleorPage.page.id,
    title: saleorPage.page.title,
    handle: saleorPage.page.slug,
    body: saleorPage.page.content || '',
    bodySummary: saleorPage.page.seoDescription || '',
    seo: {
      title: saleorPage.page.seoTitle || saleorPage.page.title,
      description: saleorPage.page.seoDescription || ''
    },
    createdAt: saleorPage.page.created,
    updatedAt: saleorPage.page.created
  };
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const saleorProduct = await saleorFetch({
    query: GetProductBySlugDocument,
    variables: {
      slug: handle
    }
  });

  if (!saleorProduct.product) {
    throw new Error(`Product not found: ${handle}`);
  }

  const images =
    saleorProduct.product.media
      ?.filter((media) => media.type === 'IMAGE')
      .map((media) => {
        return {
          url: media.url,
          altText: media.alt,
          width: 2048,
          height: 2048
        };
      }) || [];

  return {
    id: saleorProduct.product.id,
    handle: saleorProduct.product.slug,
    availableForSale: saleorProduct.product.isAvailableForPurchase || true,
    title: saleorProduct.product.name,
    description: saleorProduct.product.description || '',
    descriptionHtml: saleorProduct.product.description
      ? parseEditorJsToHtml(saleorProduct.product.description)
      : '',
    options: [], // @todo
    priceRange: {
      maxVariantPrice: {
        amount: saleorProduct.product.pricing?.priceRange?.stop?.gross.amount.toString() || '0',
        currencyCode: saleorProduct.product.pricing?.priceRange?.stop?.gross.currency || ''
      },
      minVariantPrice: {
        amount: saleorProduct.product.pricing?.priceRange?.start?.gross.amount.toString() || '0',
        currencyCode: saleorProduct.product.pricing?.priceRange?.start?.gross.currency || ''
      }
    },
    variants:
      saleorProduct.product.variants?.map((variant) => {
        return {
          id: variant.id,
          title: variant.name,
          availableForSale: saleorProduct.product?.isAvailableForPurchase || true,
          selectedOptions: [], // @todo
          price: {
            amount: variant.pricing?.price?.gross.amount.toString() || '0',
            currencyCode: variant.pricing?.price?.gross.currency || ''
          }
        };
      }) || [],
    images: images,
    featuredImage: images[0]!,
    seo: {
      title: saleorProduct.product.seoTitle || saleorProduct.product.name,
      description: saleorProduct.product.seoDescription || ''
    },
    tags: saleorProduct.product.collections?.map((c) => c.name) || [],
    updatedAt: saleorProduct.product.updatedAt
  };
}

const _getCollection = async (handle: string) =>
  (
    await saleorFetch({
      query: GetCollectionBySlugDocument,
      variables: {
        slug: handle
      }
    })
  ).collection;
const _getCategory = async (handle: string) =>
  (
    await saleorFetch({
      query: GetCategoryBySlugDocument,
      variables: {
        slug: handle
      }
    })
  ).category;

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const saleorCollection = (await _getCollection(handle)) || (await _getCategory(handle));

  if (!saleorCollection) {
    throw new Error(`Collection not found: ${handle}`);
  }

  return {
    handle: saleorCollection.slug,
    title: saleorCollection.name,
    description: saleorCollection.description as string,
    seo: {
      title: saleorCollection.seoTitle || saleorCollection.name,
      description: saleorCollection.seoDescription || ''
    },
    updatedAt: '', // @todo ?
    path: `/search/${saleorCollection.slug}`
  };
}

const handleToSlug: Record<string, string> = {
  'hidden-homepage-featured-items': 'featured',
  'hidden-homepage-carousel': 'all-products'
};
const _getCollectionProducts = async (handle: string) =>
  (
    await saleorFetch({
      query: GetCollectionProductsBySlugDocument,
      variables: {
        slug: handleToSlug[handle] || handle
      }
    })
  ).collection;
const _getCategoryProducts = async (handle: string) =>
  (
    await saleorFetch({
      query: GetCategoryProductsBySlugDocument,
      variables: {
        slug: handleToSlug[handle] || handle
      }
    })
  ).category;

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  const saleorCollectionProducts =
    (await _getCollectionProducts(handle)) || (await _getCategoryProducts(handle));

  if (!saleorCollectionProducts) {
    throw new Error(`Collection not found: ${handle}`);
  }

  return (
    saleorCollectionProducts.products?.edges.map((product) => {
      const images =
        product.node.media
          ?.filter((media) => media.type === 'IMAGE')
          .map((media) => {
            return {
              url: media.url,
              altText: media.alt,
              width: 2048,
              height: 2048
            };
          }) || [];

      return {
        id: product.node.id,
        handle: product.node.slug,
        availableForSale: product.node.isAvailableForPurchase || true,
        title: product.node.name,
        description: product.node.description || '',
        descriptionHtml: product.node.description
          ? parseEditorJsToHtml(product.node.description)
          : '',
        options: [], // @todo
        priceRange: {
          maxVariantPrice: {
            amount: product.node.pricing?.priceRange?.stop?.gross.amount.toString() || '0',
            currencyCode: product.node.pricing?.priceRange?.stop?.gross.currency || ''
          },
          minVariantPrice: {
            amount: product.node.pricing?.priceRange?.start?.gross.amount.toString() || '0',
            currencyCode: product.node.pricing?.priceRange?.start?.gross.currency || ''
          }
        },
        variants:
          product.node.variants?.map((variant) => {
            return {
              id: variant.id,
              title: variant.name,
              availableForSale: product.node?.isAvailableForPurchase || true,
              selectedOptions: [], // @todo
              price: {
                amount: variant.pricing?.price?.gross.amount.toString() || '0',
                currencyCode: variant.pricing?.price?.gross.currency || ''
              }
            };
          }) || [],
        images: images,
        featuredImage: images[0]!,
        seo: {
          title: product.node.seoTitle || product.node.name,
          description: product.node.seoDescription || ''
        },
        tags: product.node.collections?.map((c) => c.name) || [],
        updatedAt: product.node.updatedAt
      };
    }) || []
  );
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const handleToSlug: Record<string, string> = {
    'next-js-frontend-footer-menu': 'footer',
    'next-js-frontend-header-menu': 'navbar'
  };

  const saleorMenu = await saleorFetch({
    query: GetMenuBySlugDocument,
    variables: {
      slug: handleToSlug[handle] || handle
    }
  });

  if (!saleorMenu.menu) {
    throw new Error(`Menu not found: ${handle}`);
  }

  const result = flattenMenuItems(saleorMenu.menu.items);

  return (
    result
      .filter(
        (menu) =>
          menu.path &&
          // manually removing empty categories
          // @todo ?
          menu.path !== '/search/paints' &&
          menu.path !== '/search/juices' &&
          menu.path !== '/search/alcohol' &&
          menu.path !== '/search/homewares' &&
          menu.path !== '/search/groceries'
      )
      // unique by path
      .filter((item1, idx, arr) => arr.findIndex((item2) => item2.path === item1.path) === idx)
      .slice(0, 3)
  );
}

type MenuItemWithChildren = MenuItemFragment & {
  children?: null | undefined | MenuItemWithChildren[];
};
function flattenMenuItems(menuItems: null | undefined | MenuItemWithChildren[]): Menu[] {
  return (
    menuItems?.flatMap((item) => {
      const path =
        item.url ||
        (item.collection
          ? `/search/${item.collection.slug}`
          : item.category
          ? `/search/${item.category.slug}`
          : '');
      return [
        {
          path: path,
          title: item.name
        },
        ...flattenMenuItems(item.children)
      ];
    }) || []
  );
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: ProductOrderField;
}): Promise<Product[]> {
  const saleorProducts = await saleorFetch({
    query: SearchProductsDocument,
    variables: {
      search: query || '',
      sortBy: sortKey || ProductOrderField.Rank,
      sortDirection: reverse ? OrderDirection.Desc : OrderDirection.Asc
    }
  });

  return (
    saleorProducts.products?.edges.map((product) => {
      const images =
        product.node.media
          ?.filter((media) => media.type === 'IMAGE')
          .map((media) => {
            return {
              url: media.url,
              altText: media.alt,
              width: 2048,
              height: 2048
            };
          }) || [];

      return {
        id: product.node.id,
        handle: product.node.slug,
        availableForSale: product.node.isAvailableForPurchase || true,
        title: product.node.name,
        description: product.node.description || '',
        descriptionHtml: product.node.description
          ? parseEditorJsToHtml(product.node.description)
          : '',
        options: [], // @todo
        priceRange: {
          maxVariantPrice: {
            amount: product.node.pricing?.priceRange?.stop?.gross.amount.toString() || '0',
            currencyCode: product.node.pricing?.priceRange?.stop?.gross.currency || ''
          },
          minVariantPrice: {
            amount: product.node.pricing?.priceRange?.start?.gross.amount.toString() || '0',
            currencyCode: product.node.pricing?.priceRange?.start?.gross.currency || ''
          }
        },
        variants:
          product.node.variants?.map((variant) => {
            return {
              id: variant.id,
              title: variant.name,
              availableForSale: product.node?.isAvailableForPurchase || true,
              selectedOptions: [], // @todo
              price: {
                amount: variant.pricing?.price?.gross.amount.toString() || '0',
                currencyCode: variant.pricing?.price?.gross.currency || ''
              }
            };
          }) || [],
        images: images,
        featuredImage: images[0]!,
        seo: {
          title: product.node.seoTitle || product.node.name,
          description: product.node.seoDescription || ''
        },
        tags: product.node.collections?.map((c) => c.name) || [],
        updatedAt: product.node.updatedAt
      };
    }) || []
  );
}

export async function getPages(): Promise<Page[]> {
  const saleorPages = await saleorFetch({
    query: GetPagesDocument,
    variables: {}
  });

  return (
    saleorPages.pages?.edges.map((page) => {
      return {
        id: page.node.id,
        title: page.node.title,
        handle: page.node.slug,
        body: page.node.content || '',
        bodySummary: page.node.seoDescription || '',
        seo: {
          title: page.node.seoTitle || page.node.title,
          description: page.node.seoDescription || ''
        },
        createdAt: page.node.created,
        updatedAt: page.node.created
      };
    }) || []
  );
}

export async function getCart(cartId: string): Promise<Cart | null> {
  // @todo
  return null;
}
export async function createCart(): Promise<Cart> {
  // @todo
  throw new Error(`Not implemented`);
}
export async function getProductRecommendations(productId: string): Promise<Product[]> {
  // @todo
  return [];
}
