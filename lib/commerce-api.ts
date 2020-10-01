import BigcommerceAPI from "./bigcommerce/api";

const API_URL = process.env.NEXT_EXAMPLE_BIGCOMMERCE_STOREFRONT_API_URL!;
const API_TOKEN = process.env.NEXT_EXAMPLE_BIGCOMMERCE_STOREFRONT_API_TOKEN!;

export const commerce = new BigcommerceAPI({
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
});
