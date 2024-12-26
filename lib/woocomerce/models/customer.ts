import { Meta_Data } from './base';
import { Billing } from './billing';
import { Shipping } from './shipping';

export interface Customer {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: Billing;
  shipping: Shipping;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: Meta_Data[];
}

export type CustomersParams = Partial<Customer>;
