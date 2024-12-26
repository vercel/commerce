import {
  Attribute,
  Category,
  Default_Attribute,
  Dimension,
  Image,
  Meta_Data,
  Tag
} from './base';

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  catalog_visibility: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: Date;
  date_on_sale_from_gmt: Date;
  date_on_sale_to: Date;
  date_on_sale_to_gmt: Date;
  price_html: string;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  external_url: string;
  button_text: string;
  tax_status: string;
  manage_stock: boolean;
  stock_quantity: number;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  sold_individually: boolean;
  weight: string;
  dimensions: Partial<Dimension>;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  upsell_ids: number[];
  cross_sell_ids: number[];
  parent_id: number;
  purchase_note: string;
  categories: Partial<Category>[];
  tags: Partial<Tag>[];
  images: Partial<Image>[];
  attributes: Partial<Attribute>[];
  default_attributes: Partial<Default_Attribute>[];
  variations: number[];
  grouped_Product: number[];
  menu_order: number;
  meta_data: Partial<Meta_Data>[];
  per_page: number;
  page: number;
  context: 'views' | 'edit' | string;
  search: string;
  after: string;
  before: string;
  modified_after: string;
  modified_before: string;
  dates_are_gmt: boolean;
  exclude: number[];
  include: number[];
  offset: number;
  order: 'asc' | 'desc' | string;
  orderby:
    | 'id'
    | 'include'
    | 'name'
    | 'date'
    | 'title'
    | 'slug'
    | 'price'
    | 'popularity'
    | 'rating'
    | string;
  parent: number[];
  parent_exclude: number[];
  status: 'draft' | 'any' | 'pending' | 'publish' | 'private' | string;
  type: 'simple' | 'grouped' | 'external' | 'variable' | string;
  sku: string;
  featured: boolean;
  category: string;
  tag: string;
  attribute: string;
  attribute_term: string;
  tax_class: string;
  on_sale: boolean;
  min_price: string;
  max_price: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder' | string;
}

export interface ProductVariations {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  description: string;
  permalink: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: Date;
  date_on_sale_from_gmt: Date;
  date_on_sale_to: Date;
  date_on_sale_to_gmt: Date;
  on_sale: boolean;
  status: string;
  purchasable: boolean;
  virtual: boolean;
  downloadable: boolean;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number;
  stock_status: string;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  weight: string;
  dimensions: Partial<Dimension>;
  shipping_class: string;
  shipping_class_id: number;
  image: Partial<Image>;
  attributes: Partial<Attribute>[];
  menu_order: number;
  meta_data: Partial<Meta_Data>[];
}

export interface ProductAttributes {
  id: number;
  name: string;
  slug: string;
  type: string;
  order_by: string;
  has_archives: boolean;
}

export interface ProductAttributesTerms {
  id: number;
  name: string;
  slug: string;
  description: string;
  menu_order: number;
  count: number;
}

export interface ProductCategories {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: Partial<Image>;
  menu_order: number;
  count: number;
}

export interface ProductShippingClass {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface ProductTags {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface ProductReviews {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  parent_id: number;
  status: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  verified: boolean;
}

type ProductParams = Partial<Product>;
type ProductVariationsParams = Partial<ProductVariations>;
type ProductAttributesParams = Partial<ProductAttributes>;
type ProductAttributesTermsParams = Partial<ProductAttributesTerms>;
type ProductCategoriesParams = Partial<ProductCategories>;
type ProductShippingClassesParams = Partial<ProductShippingClass>;
type ProductTagsParams = Partial<ProductTags>;
type ProductReviewsParams = Partial<ProductReviews>;


export type ProductMainParams =
  | (ProductParams & ProductVariationsParams & ProductAttributesParams)
  | ProductAttributesTermsParams
  | ProductCategoriesParams
  | ProductShippingClassesParams
  | ProductTagsParams
  | ProductReviewsParams;
