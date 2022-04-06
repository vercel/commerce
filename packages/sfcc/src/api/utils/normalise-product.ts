import { Product as SFCCProduct, Search } from "commerce-sdk";
import type { Product, ProductImage } from '@vercel/commerce/types/product'
// import type { RawProduct } from '../../types/product'


export function normalizeProduct(product: SFCCProduct.ShopperProducts.Product): Product {
    return {
        id: product.id,
        // TODO: use `name-ID` as a virtual slug (for search 1:1)
        slug: product.id, // use product ID as a slug
        name: product.name!,
        description: product.longDescription!,
        price: {
            value: product.price!,
            currencyCode: product.currency
        },
        images: product.imageGroups![0].images.map(image => ({
            url: image.disBaseLink,
            altText: image.title
        })) as ProductImage[],
        variants: [] as any, // TODO
        options: [] as any // TODO
    };
}

export function normalizeSearchProducts(products: Search.ShopperSearch.ProductSearchHit[]): Product[] {

    return products.map(product => ({
        id: product.productId,
        slug: product.productId, // use product ID as a slug
        name: product.productName!,
        description: '',
        price: {
            value: product.price!,
            currencyCode: product.currency
        },
        images: [
            {
                url: product.image!.link,
                altText: product.productName
            } as ProductImage
        ],
        variants: [] as any, // TODO
        options: [] as any // TODO
    }));

}