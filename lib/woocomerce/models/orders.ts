import { Meta_Data } from './base';
import { Billing } from './billing';
import { Coupon_Lines } from './coupon';
import { Fee_Lines } from './fee';
import { Line_Item } from './item';
import { Order_Refund_Line_Item, Refund } from './refund';
import { Shipping, Shipping_Line } from './shipping';
import { Tax_Line } from './taxes';

export interface Order {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: Partial<Billing>;
  shipping: Shipping;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string;
  date_paid_gmt: string;
  date_completed: string;
  date_completed_gmt: string;
  cart_hash: string;
  meta_data: Partial<Meta_Data>[];
  line_items: Partial<Line_Item>[];
  tax_lines: Partial<Tax_Line>[];
  shipping_lines: Partial<Shipping_Line>[];
  fee_lines: Partial<Fee_Lines>[];
  coupon_lines: Partial<Coupon_Lines>[];
  refunds: Partial<Refund>[];
  set_paid: boolean;
}
export interface OrderNotes {
  id: number;
  author: string;
  date_created: Date;
  date_created_gmt: Date;
  note: string;
  customer_note: boolean;
  added_by_user: boolean;
}

export interface OrderRefunds {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  amount: string;
  reason: string;
  refunded_by: number;
  refunded_payment: boolean;
  meta_data: Partial<Meta_Data>[];
  line_items: Partial<Order_Refund_Line_Item>[];
  api_refund: boolean;
}

export type OrderParams = Partial<Order>;
export type OrderNotesParams = Partial<OrderNotes>;
export type OrderRefundsParams = Partial<OrderRefunds>;
/**
 * Union type for all possible params for Orders
 */
export type OrdersMainParams = OrderParams & OrderNotesParams & OrderRefundsParams;
