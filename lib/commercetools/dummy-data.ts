import { CentPrecisionMoney as CommercetoolsCentPrecisionMoney } from "@commercetools/platform-sdk";

// Dummy locale to be used as key for 'LocalizedString' and locale projections (https://docs.commercetools.com/api/types#localizedstring)
export const DUMMY_LOCALE = "de-DE";

// Dummy country for query parameters for product selection
export const DUMMY_COUNTRY = "DE";

// Dummy currency code for query parameters for product selection
export const DUMMY_CURRENCY_CODE = "EUR";

// Dummy pricerange for products
export const DUMMY_PRICERANGE = {
  minVariantPrice: { amount: "1", currencyCode: "EUR" },
  maxVariantPrice: { amount: "99.99", currencyCode: "EUR" }
};

export const DUMMY_DELIMITER = " ";
export const DUMMY_LIMIT = 200;

// Dummy image for products
export const DUMMY_IMAGE = {
  url: "https://picsum.photos/800/600",
  width: 800,
  height: 800,
  altText: "dummy-image"
};

export const DUMMY_ZERO_EUR0: CommercetoolsCentPrecisionMoney = {
  centAmount: 0,
  fractionDigits: 2,
  currencyCode: "EUR",
  type: "centPrecision"
};
