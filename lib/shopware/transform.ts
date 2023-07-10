import {
  ApiSchemas,
  CategoryListingResultSW,
  Collection,
  Menu,
  Page,
  Product,
  ProductOption,
  ProductVariant
} from './types';
import {
  ExtendedCategory,
  ExtendedCmsPage,
  ExtendedProduct,
  ExtendedProductListingResult
} from './api-extended';
import { ListItem } from 'components/layout/search/filter';

export function transformMenu(res: ExtendedCategory[], type: string) {
  let menu: Menu[] = [];

  res.map((item) => menu.push(transformMenuItem(item, type)));

  return menu;
}

function transformMenuItem(item: ExtendedCategory, type: string): Menu {
  // @ToDo: currently only footer-navigation is used for cms pages, this need to be more dynamic (shoud depending on the item)
  return {
    id: item.id ?? '',
    title: item.name,
    children: item.children?.map((item) => transformMenuItem(item, type)) ?? [],
    path:
      item.seoUrls && item.seoUrls.length > 0 && item.seoUrls[0] && item.seoUrls[0].seoPathInfo
        ? type === 'footer-navigation'
          ? '/cms/' + item.seoUrls[0].seoPathInfo
          : '/search/' + item.seoUrls[0].seoPathInfo
        : '',
    type: item.children && item.children.length > 0 ? 'headline' : 'link'
  };
}

export function transformPage(
  seoUrlElement: ApiSchemas['SeoUrl'],
  category: ExtendedCategory
): Page {
  let plainHtmlContent;
  if (category.cmsPage) {
    const cmsPage: ExtendedCmsPage = category.cmsPage;
    plainHtmlContent = transformToPlainHtmlContent(cmsPage);
  }

  return {
    id: seoUrlElement.id ?? '',
    title: category.translated?.metaTitle ?? category.name ?? '',
    handle: seoUrlElement.seoPathInfo,
    body: plainHtmlContent ?? category.description ?? '',
    bodySummary: category.translated?.metaDescription ?? category.description ?? '',
    seo: {
      title: category.translated?.metaTitle ?? category.name ?? '',
      description: category.translated?.metaDescription ?? category.description ?? ''
    },
    createdAt: seoUrlElement.createdAt ?? '',
    updatedAt: seoUrlElement.updatedAt ?? '',
    routeName: seoUrlElement.routeName,
    originalCmsPage: category.cmsPage,
    foreignKey: seoUrlElement.foreignKey
  };
}

export function transformToPlainHtmlContent(cmsPage: ExtendedCmsPage): string {
  let plainHtmlContent = '';

  cmsPage.sections?.map((section) => {
    section.blocks?.map((block) => {
      block.slots?.map((slot) => {
        if (slot.slot === 'content' && slot.config?.content) {
          const currentContent: string = slot.config.content.value + '';
          // we do not add content with h1, because will be added via template already
          if (!currentContent.match(/(<\/?h)([1])/)) {
            plainHtmlContent += currentContent;
          }
        }
      });
    });
  });

  return plainHtmlContent;
}

export function transformCollection(
  seoUrlElement: ApiSchemas['SeoUrl'],
  resCategory: ExtendedCategory
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

export function transformProducts(res: ExtendedProductListingResult): Product[] {
  let products: Product[] = [];

  if (res.elements && res.elements.length > 0) {
    res.elements.map((item) => products.push(transformProduct(item)));
  }

  return products;
}

export function transformProduct(item: ExtendedProduct): Product {
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

function transformOptions(parent: ExtendedProduct): ProductOption[] {
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

function transformVariants(parent: ExtendedProduct): ProductVariant[] {
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

export function transformHandle(handle: string | []): string {
  let collectionName: string | [] | undefined = handle;
  if (Array.isArray(collectionName)) {
    collectionName = collectionName.join('/');
  }

  return collectionName ?? '';
}
