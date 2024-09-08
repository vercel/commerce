export type FourthwallMoney = {
  value: number;
  currencyCode: string;
}

export type FourthwallProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;

  images: FourthwallProductImage[];
  variants: FourthwallProductVariant[];
};

export type FourthwallProductImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type FourthwallProductVariant = {
  id: string;
  name: string;
  sku: string;
  unitPrice: FourthwallMoney;

  images: FourthwallProductImage[];

  // other attr
};
