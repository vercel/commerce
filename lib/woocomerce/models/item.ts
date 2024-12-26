import { Meta_Data } from "./base";
import { Tax } from "./taxes";

export type Line_Item = {
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
    taxes: Tax[];
    meta_data: Meta_Data;
    sku: string;
    price: number;
  };