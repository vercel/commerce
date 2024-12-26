import { Meta_Data } from './base';
import { Taxes } from './taxes';

export type Fee_Lines = {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  total: string;
  total_tax: string;
  taxes: Partial<Taxes>[];
  meta_data: Partial<Meta_Data>;
};
