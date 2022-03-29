import { Product as SFCCProduct } from "commerce-sdk";
import type { Product, ProductImage } from '@vercel/commerce/types/product'
// import type { RawProduct } from '../../types/product'


export function normalizeProduct(product: SFCCProduct.ShopperProducts.Product): Product {
    return {
        id: product.id,
        slug: product.id, // use product ID as a slug
        // path: `/${product.id}`,
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