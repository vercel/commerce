import { Meta_Data } from './base';

export interface Coupon {
  id: number;
  code: string;
  amount: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  discount_type: string;
  description: string;
  date_expires: string;
  date_expires_gmt: string;
  usage_count: number;
  individual_use: boolean;
  product_ids: number[];
  excluded_product_ids: number[];
  usage_limit: number;
  usage_limit_per_user: number;
  limit_usage_to_x_items: number;
  free_shipping: boolean;
  product_categories: number[];
  excluded_product_categories: number[];
  exclude_sale_items: boolean;
  minimum_amount: string;
  maximum_amount: string;
  email_restrictions: string[];
  used_by: string[];
  meta_data: Meta_Data[];
}

export type Coupon_Lines = {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: Partial<Meta_Data>;
};

export type CouponsParams = Partial<Coupon>;