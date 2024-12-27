import { Meta_Data } from './base';

export type Refund = {
  id: number;
  reason: string;
  total: string;
};

export type Order_Refund_Line = {
  id: number;
  total: string;
  subtotal: string;
  refund_total: number;
};

export type Order_Refund_Line_Item = {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: Partial<Order_Refund_Line>[];
  meta_data: Partial<Meta_Data>[];
  sku: string;
  price: string;
  refund_total: number;
};
