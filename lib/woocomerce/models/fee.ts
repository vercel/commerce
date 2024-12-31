import { Meta_Data } from './base';
import { Tax } from './taxes';

export type Fee_Lines = {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  total: string;
  total_tax: string;
  taxes: Partial<Tax>[];
  meta_data: Partial<Meta_Data>;
};
