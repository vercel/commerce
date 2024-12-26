import { Meta_Data } from './base';

export type Tax = {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: Meta_Data;
};

export type Tax_Line = {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: Partial<Meta_Data>;
};

export interface TaxRate {
  id: number;
  country: string;
  state: string;
  postcode: string;
  city: string;
  postcodes: string[];
  cities: string[];
  rate: string;
  name: string;
  priority: number;
  compound: boolean;
  shipping: boolean;
  order: number;
  class: string;
}

export interface TaxClass {
  slug: string;
  name: string;
}

export type TaxRatesParams = Partial<TaxRate>;
export type TaxClassesParams = Partial<TaxClass>;