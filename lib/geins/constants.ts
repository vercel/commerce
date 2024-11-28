export const USE_CATEGORY_FOR_RECOMMENDATIONS_BACKUP =
  process.env.GEINS_USE_CATEGORY_FOR_RECOMMENDATIONS_BACKUP || true;
export const IMAGE_URL =
  process.env.GEINS_IMAGE_URL || `https://${process.env.GEINS_ACCOUNT_NAME}.commerce.services`;
export const DEFAULT_SKU_VARIATION = process.env.GEINS_SKU_DEFAULT_VARIATION || 'Size';
export const CURRENCY_CODE = process.env.GEINS_CURRENCY_CODE || 'USD';
export const PAYMENT_ID = parseInt(process.env.GEINS_PAYMENT_ID ?? '0');
export const SHORT_DESCRIPTION = process.env.GEINS_PRODUCT_DESCRIPTION_SHORT_TEXT || 'text2';
export const LONG_DESCRIPTION = process.env.GEINS_PRODUCT_DESCRIPTION_LONG_TEXT || 'text1';
