import { Product } from "commerce-sdk";
import { clientConfig, getGuestUserAuthToken } from "./get-auth-token";

const getshopperProductsClient = async () => {
    const shopperToken = await getGuestUserAuthToken();
    const configAuth = {
      ...clientConfig, 
      headers: {"authorization":`Bearer ${shopperToken.access_token}`}
    };
    const ShopperProducts = new Product.ShopperProducts(configAuth)
    return ShopperProducts
}


export const sdk = {
    getshopperProductsClient
}
export type Sdk = typeof sdk
export default sdk