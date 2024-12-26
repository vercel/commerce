import { Meta_Data } from './base';
import { Tax } from './taxes';

export type Shipping = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

export type Shipping_Line = {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: Tax[];
  meta_data: Meta_Data;
};

export interface ShippingZone {
  id: number;
  name: string;
  order: number;
}

export interface ShippingZoneLocation {
  code: string;
  type: 'postcode' | 'state' | 'country' | 'continent';
}

export interface ShippingZoneMethodSetting {
  id: string;
  label: string;
  description: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'color'
    | 'password'
    | 'textarea'
    | 'select'
    | 'multiselect'
    | 'radio'
    | 'image_width'
    | 'checkbox';
  value: string;
  default: string;
  tip: string;
  placeholder: string;
}

export interface ShippingZoneMethod {
  instace_id: number;
  title: string;
  order: number;
  enabled: boolean;
  method_id: string;
  method_title: string;
  method_description: string;
  method_supports: Partial<ShippingZoneMethodSetting>[];
}

export interface ShippingMethods {
  id: string;
  title: string;
  description: string;
}

export type ShippingZonesParams = Partial<ShippingZone>;
export type ShippingZonesLocationsParams = Partial<ShippingZoneLocation>;
export type ShippingZonesMethodsParams = Partial<ShippingZoneMethod>;
export type ShippingMethodsParams = Partial<ShippingMethods>;