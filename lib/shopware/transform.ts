import {
  ApiSchemas,
  CategoryListingResultSW,
  Collection,
  Menu,
  Product,
  ProductOption,
  ProductVariant
} from './types';
import { ListItem } from 'components/layout/search/filter';

export function transformMenu(res: ApiSchemas['NavigationRouteResponse']) {
  let menu: Menu[] = [];

  res.map((item) => menu.push(transformMenuItem(item)));

  return menu;
}

function transformMenuItem(item: ApiSchemas['Category']): Menu {
  return {
    id: item.id ?? '',
    title: item.name,
    children: item.children?.map((item) => transformMenuItem(item)) ?? [],
    path:
      item.seoUrls && item.seoUrls.length > 0 && item.seoUrls[0] && item.seoUrls[0].seoPathInfo
        ? '/search/' + item.seoUrls[0].seoPathInfo
        : '',
    type: item.children && item.children.length > 0 ? 'headline' : 'link'
  };
}

export function transformPage(
  seoUrlElement: ApiSchemas['SeoUrl'],
  resCategory: ApiSchemas['Category']
) {
  return {
    id: seoUrlElement.id ?? '',
    title: resCategory.translated?.metaTitle ?? resCategory.name ?? '',
    handle: seoUrlElement.seoPathInfo,
    body: resCategory.description ?? '',
    bodySummary: resCategory.translated?.metaDescription ?? resCategory.description ?? '',
    seo: {
      title: resCategory.translated?.metaTitle ?? resCategory.name ?? '',
      description: resCategory.translated?.metaDescription ?? resCategory.description ?? ''
    },
    createdAt: seoUrlElement.createdAt ?? '',
    updatedAt: seoUrlElement.updatedAt ?? '',
    routeName: seoUrlElement.routeName,
    foreignKey: seoUrlElement.foreignKey
  };
}

export function transformCollection(
  seoUrlElement: ApiSchemas['SeoUrl'],
  resCategory: ApiSchemas['Category']
) {
  return {
    handle: seoUrlElement.seoPathInfo,
    title: resCategory.translated?.metaTitle ?? resCategory.name ?? '',
    description: resCategory.description ?? '',
    seo: {
      title: resCategory.translated?.metaTitle ?? resCategory.name ?? '',
      description: resCategory.translated?.metaDescription ?? resCategory.description ?? ''
    },
    updatedAt: seoUrlElement.updatedAt ?? seoUrlElement.createdAt ?? ''
  };
}

export function transformStaticCollection(resCategory: CategoryListingResultSW): Collection[] {
  let collection: Collection[] = [];

  if (resCategory.elements && resCategory.elements.length > 0) {
    resCategory.elements.map((item) =>
      collection.push({
        handle:
          item.seoUrls && item.seoUrls.length > 0 && item.seoUrls[0] && item.seoUrls[0].seoPathInfo
            ? item.seoUrls[0].seoPathInfo
            : '',
        title: item.translated?.metaTitle ?? item.name ?? '',
        description: item.description ?? '',
        seo: {
          title: item.translated?.metaTitle ?? item.name ?? '',
          description: item.translated?.metaDescription ?? item.description ?? ''
        },
        updatedAt: item.updatedAt ?? item.createdAt ?? ''
      })
    );
  }

  return collection;
}

export function transformStaticCollectionToList(collection: Collection[]): ListItem[] {
  let listItem: ListItem[] = [];

  if (collection && collection.length > 0) {
    collection.map((item) =>
      listItem.push({
        title: item.title,
        path: `/search/${item.handle}`
      })
    );
  }

  return listItem;
}

export function transformProducts(res: ApiSchemas['ProductListingResult']): Product[] {
  let products: Product[] = [];

  if (res.elements && res.elements.length > 0) {
    res.elements.map((item) => products.push(transformProduct(item)));
  }

  return products;
}

export function transformProduct(item: ApiSchemas['Product']): Product {
  const productOptions = transformOptions(item);
  const productVariants = transformVariants(item);

  return {
    id: item.id ?? '',
    path:
      item.seoUrls && item.seoUrls.length > 0 && item.seoUrls[0] && item.seoUrls[0].seoPathInfo
        ? item.seoUrls[0].seoPathInfo
        : '',
    availableForSale: item.available ?? false,
    title: item.translated ? item.translated.name ?? '' : item.name,
    description: item.translated?.metaDescription
      ? item.translated.metaDescription ?? ''
      : item.metaDescription ?? '',
    descriptionHtml: item.translated?.description
      ? item.translated.description ?? ''
      : item.description ?? '',
    options: productOptions,
    priceRange: {
      maxVariantPrice: {
        amount: item.calculatedPrice?.totalPrice ? String(item.calculatedPrice?.totalPrice) : '0',
        currencyCode: 'EUR'
      },
      minVariantPrice: {
        amount: item.calculatedCheapestPrice?.totalPrice
          ? String(item.calculatedPrice?.totalPrice)
          : '0',
        currencyCode: 'EUR'
      }
    },
    variants: productVariants,
    featuredImage: {
      url: item.cover?.media?.url ?? '',
      altText: item.cover?.media?.translated?.alt ?? '',
      width: item.cover?.media?.metaData?.width ? Number(item.cover?.media?.metaData?.width) : 0,
      height: item.cover?.media?.metaData?.width ? Number(item.cover?.media?.metaData?.height) : 0
    },
    images: item.media
      ? item.media.map((img) => ({
          url: img.media?.url ?? '',
          altText: img.media?.translated?.alt ?? '',
          width: img.media?.metaData?.width ? Number(img.media?.metaData?.width) : 0,
          height: img.media?.metaData?.width ? Number(img.media?.metaData?.height) : 0
        }))
      : [],
    seo: {
      title: item.translated?.metaTitle ?? item.translated?.name ?? item.name ?? '',
      description: item.translated?.metaDescription ?? ''
    },
    tags: [''], // @ToDo: Add keywords or do we have tags?
    updatedAt: item.updatedAt ?? ''
  };
}

function transformOptions(parent: ApiSchemas['Product']): ProductOption[] {
  // we only transform options for parents with children, ignore child products with options
  let productOptions: ProductOption[] = [];
  if (parent.children && parent.parentId === null && parent.children.length > 0) {
    let group: { [key: string]: string[] } = {};
    parent.children.map((child) => {
      child.options?.map((option) => {
        if (option && option.group) {
          group[option.group.name] = group[option.group.name]
            ? [...new Set([...(group[option.group.name] as []), ...[option.name]])]
            : [option.name];
        }
      });
    });

    if (parent.id) {
      for (const [key, value] of Object.entries(group)) {
        productOptions.push({
          id: parent.id,
          name: key,
          values: value
        });
      }
    }
  }

  return productOptions;
}

function transformVariants(parent: ApiSchemas['Product']): ProductVariant[] {
  let productVariants: ProductVariant[] = [];
  if (parent.children && parent.parentId === null && parent.children.length > 0) {
    parent.children.map((child) => {
      if (child.id) {
        let selectedOptions: { name: string; value: string }[] = [];
        child.options?.map((option) => {
          if (option.group) {
            selectedOptions.push({
              name: option.group.name,
              value: option.name
            });
          }
        });
        const currentVariant: ProductVariant = {
          id: child.id,
          title: child.name,
          availableForSale: child.available ?? false,
          selectedOptions: selectedOptions,
          price: {
            amount: child.calculatedPrice?.totalPrice
              ? String(child.calculatedPrice?.totalPrice)
              : '0',
            currencyCode: 'EUR'
          }
        };

        productVariants.push(currentVariant);
      }
    });
  }

  return productVariants;
}
