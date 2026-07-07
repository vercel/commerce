import { Product, ProductOption, ProductVariant } from "lib/shopify/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

const GRIND_OPTION_NAME = /grind/i;

/**
 * Resolves the single option axis a product can be quick-added by from the
 * grid — the "Grind" option (Whole Bean / Standard Drip / Coarse — Cold
 * Brew) when present, else the only multi-value option. Returns each value
 * paired with the exact variant it resolves to, so quick-add always sends
 * the precise Shopify variant id (= fulfillment SKU).
 *
 * Products with more than one multi-value option can't be resolved to a
 * variant from a single chip, so they return `undefined` and the grid links
 * to the product page instead.
 */
export function getQuickAddOption(product: Product):
  | {
      option: ProductOption;
      choices: { value: string; variant: ProductVariant | undefined }[];
    }
  | undefined {
  const multiValueOptions = product.options.filter(
    (option) => option.values.length > 1,
  );

  if (multiValueOptions.length > 1) {
    return undefined;
  }

  const option =
    product.options.find((option) => GRIND_OPTION_NAME.test(option.name)) ||
    multiValueOptions[0] ||
    product.options[0];

  if (!option) {
    return undefined;
  }

  return {
    option,
    choices: option.values.map((value) => ({
      value,
      variant: product.variants.find((variant) =>
        variant.selectedOptions.some(
          (selected) =>
            selected.name === option.name && selected.value === value,
        ),
      ),
    })),
  };
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    "SHOPIFY_STORE_DOMAIN",
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n",
      )}\n`,
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes("[") ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes("]")
  ) {
    throw new Error(
      "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.",
    );
  }
};
