export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: any
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any
}

/** Login result */
export type LoginResult = {
  __typename?: 'LoginResult'
  /** The result of a login */
  result: Scalars['String']
}

/** Logout result */
export type LogoutResult = {
  __typename?: 'LogoutResult'
  /** The result of a logout */
  result: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  login: LoginResult
  logout: LogoutResult
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

/** Aggregated */
export type Aggregated = {
  __typename?: 'Aggregated'
  /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
  availableToSell: Scalars['Long']
  /** Indicates a threshold low-stock level.  This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
  warningLevel: Scalars['Int']
}

/** Aggregated Product Inventory */
export type AggregatedInventory = {
  __typename?: 'AggregatedInventory'
  /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
  availableToSell: Scalars['Int']
  /** Indicates a threshold low-stock level. This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
  warningLevel: Scalars['Int']
}

/** Brand */
export type Brand = Node & {
  __typename?: 'Brand'
  /** The ID of an object */
  id: Scalars['ID']
  /** Id of the brand. */
  entityId: Scalars['Int']
  /** Name of the brand. */
  name: Scalars['String']
  /** Default image for brand. */
  defaultImage?: Maybe<Image>
  /** Page title for the brand. */
  pageTitle: Scalars['String']
  /** Meta description for the brand. */
  metaDesc: Scalars['String']
  /** Meta keywords for the brand. */
  metaKeywords: Array<Scalars['String']>
  /** Search keywords for the brand. */
  searchKeywords: Array<Scalars['String']>
  /** Path for the brand page. */
  path: Scalars['String']
  products: ProductConnection
  /** Metafield data related to a brand. */
  metafields: MetafieldConnection
}

/** Brand */
export type BrandProductsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Brand */
export type BrandMetafieldsArgs = {
  namespace: Scalars['String']
  keys?: Maybe<Array<Scalars['String']>>
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A connection to a list of items. */
export type BrandConnection = {
  __typename?: 'BrandConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BrandEdge>>>
}

/** An edge in a connection. */
export type BrandEdge = {
  __typename?: 'BrandEdge'
  /** The item at the end of the edge. */
  node: Brand
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Breadcrumb */
export type Breadcrumb = {
  __typename?: 'Breadcrumb'
  /** Category id. */
  entityId: Scalars['Int']
  /** Name of the category. */
  name: Scalars['String']
}

/** A connection to a list of items. */
export type BreadcrumbConnection = {
  __typename?: 'BreadcrumbConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BreadcrumbEdge>>>
}

/** An edge in a connection. */
export type BreadcrumbEdge = {
  __typename?: 'BreadcrumbEdge'
  /** The item at the end of the edge. */
  node: Breadcrumb
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Bulk pricing tier that sets a fixed price for the product or variant. */
export type BulkPricingFixedPriceDiscount = BulkPricingTier & {
  __typename?: 'BulkPricingFixedPriceDiscount'
  /** This price will override the current product price. */
  price: Scalars['BigDecimal']
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>
}

/** Bulk pricing tier that reduces the price of the product or variant by a percentage. */
export type BulkPricingPercentageDiscount = BulkPricingTier & {
  __typename?: 'BulkPricingPercentageDiscount'
  /** The percentage that will be removed from the product price. */
  percentOff: Scalars['BigDecimal']
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>
}

/** Bulk pricing tier that will subtract an amount from the price of the product or variant. */
export type BulkPricingRelativePriceDiscount = BulkPricingTier & {
  __typename?: 'BulkPricingRelativePriceDiscount'
  /** The price of the product/variant will be reduced by this priceAdjustment. */
  priceAdjustment: Scalars['BigDecimal']
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>
}

/** A set of bulk pricing tiers that define price discounts which apply when purchasing specified quantities of a product or variant. */
export type BulkPricingTier = {
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>
}

/** Product Option */
export type CatalogProductOption = {
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** Product Option Value */
export type CatalogProductOptionValue = {
  /** Unique ID for the option value. */
  entityId: Scalars['Int']
  /** Label for the option value. */
  label: Scalars['String']
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']
}

/** Category */
export type Category = Node & {
  __typename?: 'Category'
  /** The ID of an object */
  id: Scalars['ID']
  /** Unique ID for the category. */
  entityId: Scalars['Int']
  /** Category name. */
  name: Scalars['String']
  /** Category path. */
  path: Scalars['String']
  /** Default image for the category. */
  defaultImage?: Maybe<Image>
  /** Category description. */
  description: Scalars['String']
  /** Category breadcrumbs. */
  breadcrumbs: BreadcrumbConnection
  products: ProductConnection
  /** Metafield data related to a category. */
  metafields: MetafieldConnection
}

/** Category */
export type CategoryBreadcrumbsArgs = {
  depth: Scalars['Int']
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Category */
export type CategoryProductsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Category */
export type CategoryMetafieldsArgs = {
  namespace: Scalars['String']
  keys?: Maybe<Array<Scalars['String']>>
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A connection to a list of items. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CategoryEdge>>>
}

/** An edge in a connection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge'
  /** The item at the end of the edge. */
  node: Category
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** An item in a tree of categories. */
export type CategoryTreeItem = {
  __typename?: 'CategoryTreeItem'
  /** The id category. */
  entityId: Scalars['Int']
  /** The name of category. */
  name: Scalars['String']
  /** Path assigned to this category */
  path: Scalars['String']
  /** The description of this category. */
  description: Scalars['String']
  /** The number of products in this category. */
  productCount: Scalars['Int']
  /** Subcategories of this category */
  children: Array<CategoryTreeItem>
}

/** A simple yes/no question represented by a checkbox. */
export type CheckboxOption = CatalogProductOption & {
  __typename?: 'CheckboxOption'
  /** Indicates the default checked status. */
  checkedByDefault: Scalars['Boolean']
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** Contact field */
export type ContactField = {
  __typename?: 'ContactField'
  /** Store address line. */
  address: Scalars['String']
  /** Store country. */
  country: Scalars['String']
  /** Store address type. */
  addressType: Scalars['String']
  /** Store email. */
  email: Scalars['String']
  /** Store phone number. */
  phone: Scalars['String']
}

/** Custom field */
export type CustomField = {
  __typename?: 'CustomField'
  /** Custom field id. */
  entityId: Scalars['Int']
  /** Name of the custom field. */
  name: Scalars['String']
  /** Value of the custom field. */
  value: Scalars['String']
}

/** A connection to a list of items. */
export type CustomFieldConnection = {
  __typename?: 'CustomFieldConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CustomFieldEdge>>>
}

/** An edge in a connection. */
export type CustomFieldEdge = {
  __typename?: 'CustomFieldEdge'
  /** The item at the end of the edge. */
  node: CustomField
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** A customer that shops on a store */
export type Customer = {
  __typename?: 'Customer'
  /** The ID of the customer. */
  entityId: Scalars['Int']
  /** The company name of the customer. */
  company: Scalars['String']
  /** The customer group id of the customer. */
  customerGroupId: Scalars['Int']
  /** The email address of the customer. */
  email: Scalars['String']
  /** The first name of the customer. */
  firstName: Scalars['String']
  /** The last name of the customer. */
  lastName: Scalars['String']
  /** The notes of the customer. */
  notes: Scalars['String']
  /** The phone number of the customer. */
  phone: Scalars['String']
  /** The tax exempt category of the customer. */
  taxExemptCategory: Scalars['String']
  /** Customer addresses count. */
  addressCount: Scalars['Int']
  /** Customer attributes count. */
  attributeCount: Scalars['Int']
  /** Customer store credit. */
  storeCredit: Array<Money>
  /** Customer attributes. */
  attributes: CustomerAttributes
}

/** A custom, store-specific attribute for a customer */
export type CustomerAttribute = {
  __typename?: 'CustomerAttribute'
  /** The ID of the custom customer attribute */
  entityId: Scalars['Int']
  /** The value of the custom customer attribute */
  value?: Maybe<Scalars['String']>
  /** The name of the custom customer attribute */
  name: Scalars['String']
}

/** Custom, store-specific customer attributes */
export type CustomerAttributes = {
  __typename?: 'CustomerAttributes'
  attribute: CustomerAttribute
}

/** Custom, store-specific customer attributes */
export type CustomerAttributesAttributeArgs = {
  entityId: Scalars['Int']
}

/** A calendar for allowing selection of a date. */
export type DateFieldOption = CatalogProductOption & {
  __typename?: 'DateFieldOption'
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** Date Time Extended */
export type DateTimeExtended = {
  __typename?: 'DateTimeExtended'
  /** ISO-8601 formatted date in UTC */
  utc: Scalars['DateTime']
}

/** Display field */
export type DisplayField = {
  __typename?: 'DisplayField'
  /** Short date format. */
  shortDateFormat: Scalars['String']
  /** Extended date format. */
  extendedDateFormat: Scalars['String']
}

/** A form allowing selection and uploading of a file from the user's local computer. */
export type FileUploadFieldOption = CatalogProductOption & {
  __typename?: 'FileUploadFieldOption'
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** Image */
export type Image = {
  __typename?: 'Image'
  /** Absolute path to image using store CDN. */
  url: Scalars['String']
  /** Absolute path to original image using store CDN. */
  urlOriginal: Scalars['String']
  /** Text description of an image that can be used for SEO and/or accessibility purposes. */
  altText: Scalars['String']
  /** Indicates whether this is the primary image. */
  isDefault: Scalars['Boolean']
}

/** Image */
export type ImageUrlArgs = {
  width: Scalars['Int']
  height?: Maybe<Scalars['Int']>
}

/** A connection to a list of items. */
export type ImageConnection = {
  __typename?: 'ImageConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ImageEdge>>>
}

/** An edge in a connection. */
export type ImageEdge = {
  __typename?: 'ImageEdge'
  /** The item at the end of the edge. */
  node: Image
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** An inventory */
export type Inventory = {
  __typename?: 'Inventory'
  /** Locations */
  locations: LocationConnection
}

/** An inventory */
export type InventoryLocationsArgs = {
  entityIds?: Maybe<Array<Scalars['Int']>>
  codes?: Maybe<Array<Scalars['String']>>
  typeIds?: Maybe<Array<Scalars['String']>>
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Inventory By Locations */
export type InventoryByLocations = {
  __typename?: 'InventoryByLocations'
  /** Location id. */
  locationEntityId: Scalars['Long']
  /** Number of available products in stock. */
  availableToSell: Scalars['Long']
  /** Indicates a threshold low-stock level. */
  warningLevel: Scalars['Int']
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean']
}

/** A connection to a list of items. */
export type LocationConnection = {
  __typename?: 'LocationConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<LocationEdge>>>
}

/** An edge in a connection. */
export type LocationEdge = {
  __typename?: 'LocationEdge'
  /** The item at the end of the edge. */
  node: InventoryByLocations
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Logo field */
export type LogoField = {
  __typename?: 'LogoField'
  /** Logo title. */
  title: Scalars['String']
  /** Store logo image. */
  image: Image
}

/** Measurement */
export type Measurement = {
  __typename?: 'Measurement'
  /** Unformatted weight measurement value. */
  value: Scalars['Float']
  /** Unit of measurement. */
  unit: Scalars['String']
}

/** A connection to a list of items. */
export type MetafieldConnection = {
  __typename?: 'MetafieldConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MetafieldEdge>>>
}

/** An edge in a connection. */
export type MetafieldEdge = {
  __typename?: 'MetafieldEdge'
  /** The item at the end of the edge. */
  node: Metafields
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Key/Value pairs of data attached tied to a resource entity (product, brand, category, etc.) */
export type Metafields = {
  __typename?: 'Metafields'
  /** The ID of an object */
  id: Scalars['ID']
  /** The ID of the metafield when referencing via our backend API. */
  entityId: Scalars['Int']
  /** A label for identifying a metafield data value. */
  key: Scalars['String']
  /** A metafield value. */
  value: Scalars['String']
}

/** A money object - includes currency code and a money amount */
export type Money = {
  __typename?: 'Money'
  /** Currency code of the current money. */
  currencyCode: Scalars['String']
  /** The amount of money. */
  value: Scalars['BigDecimal']
}

/** A min and max pair of money objects */
export type MoneyRange = {
  __typename?: 'MoneyRange'
  /** Minimum money object. */
  min: Money
  /** Maximum money object. */
  max: Money
}

/** A multi-line text input field, aka a text box. */
export type MultiLineTextFieldOption = CatalogProductOption & {
  __typename?: 'MultiLineTextFieldOption'
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** An option type that has a fixed list of values. */
export type MultipleChoiceOption = CatalogProductOption & {
  __typename?: 'MultipleChoiceOption'
  /** The chosen display style for this multiple choice option. */
  displayStyle: Scalars['String']
  /** List of option values. */
  values: ProductOptionValueConnection
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** An option type that has a fixed list of values. */
export type MultipleChoiceOptionValuesArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A simple multiple choice value comprised of an id and a label. */
export type MultipleChoiceOptionValue = CatalogProductOptionValue & {
  __typename?: 'MultipleChoiceOptionValue'
  /** Unique ID for the option value. */
  entityId: Scalars['Int']
  /** Label for the option value. */
  label: Scalars['String']
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']
}

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID']
}

/** A single line text input field that only accepts numbers. */
export type NumberFieldOption = CatalogProductOption & {
  __typename?: 'NumberFieldOption'
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** A connection to a list of items. */
export type OptionConnection = {
  __typename?: 'OptionConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OptionEdge>>>
}

/** An edge in a connection. */
export type OptionEdge = {
  __typename?: 'OptionEdge'
  /** The item at the end of the edge. */
  node: ProductOption
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** A connection to a list of items. */
export type OptionValueConnection = {
  __typename?: 'OptionValueConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OptionValueEdge>>>
}

/** An edge in a connection. */
export type OptionValueEdge = {
  __typename?: 'OptionValueEdge'
  /** The item at the end of the edge. */
  node: ProductOptionValue
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

export type OptionValueId = {
  optionEntityId: Scalars['Int']
  valueEntityId: Scalars['Int']
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>
}

/** The min and max range of prices that apply to this product. */
export type PriceRanges = {
  __typename?: 'PriceRanges'
  /** Product price min/max range. */
  priceRange: MoneyRange
  /** Product retail price min/max range. */
  retailPriceRange?: Maybe<MoneyRange>
}

/** The various prices that can be set on a product. */
export type Prices = {
  __typename?: 'Prices'
  /** Calculated price of the product. */
  price: Money
  /** Sale price of the product. */
  salePrice?: Maybe<Money>
  /** Original price of the product. */
  basePrice?: Maybe<Money>
  /** Retail price of the product. */
  retailPrice?: Maybe<Money>
  /** Minimum advertised price of the product. */
  mapPrice?: Maybe<Money>
  /** Product price min/max range. */
  priceRange: MoneyRange
  /** Product retail price min/max range. */
  retailPriceRange?: Maybe<MoneyRange>
  /** The difference between the retail price (MSRP) and the current price, which can be presented to the shopper as their savings. */
  saved?: Maybe<Money>
  /** List of bulk pricing tiers applicable to a product or variant. */
  bulkPricing: Array<BulkPricingTier>
}

/** Product */
export type Product = Node & {
  __typename?: 'Product'
  /** The ID of an object */
  id: Scalars['ID']
  /** Id of the product. */
  entityId: Scalars['Int']
  /** Default product variant when no options are selected. */
  sku: Scalars['String']
  /** Relative URL path to product page. */
  path: Scalars['String']
  /** Name of the product. */
  name: Scalars['String']
  /** Description of the product. */
  description: Scalars['String']
  /** Description of the product in plain text. */
  plainTextDescription: Scalars['String']
  /** Warranty information of the product. */
  warranty: Scalars['String']
  /** Minimum purchasable quantity for this product in a single order. */
  minPurchaseQuantity?: Maybe<Scalars['Int']>
  /** Maximum purchasable quantity for this product in a single order. */
  maxPurchaseQuantity?: Maybe<Scalars['Int']>
  /** Absolute URL path for adding a product to cart. */
  addToCartUrl: Scalars['String']
  /** Absolute URL path for adding a product to customer's wishlist. */
  addToWishlistUrl: Scalars['String']
  /** Prices object determined by supplied product ID, variant ID, and selected option IDs. */
  prices?: Maybe<Prices>
  /**
   * The minimum and maximum price of this product based on variant pricing and/or modifier price rules.
   * @deprecated Use priceRanges inside prices node instead.
   */
  priceRanges?: Maybe<PriceRanges>
  /** Weight of the product. */
  weight?: Maybe<Measurement>
  /** Height of the product. */
  height?: Maybe<Measurement>
  /** Width of the product. */
  width?: Maybe<Measurement>
  /** Depth of the product. */
  depth?: Maybe<Measurement>
  /** Product options. */
  options: OptionConnection
  /** Product options. */
  productOptions: ProductOptionConnection
  /** Summary of the product reviews, includes the total number of reviews submitted and summation of the ratings on the reviews (ratings range from 0-5 per review). */
  reviewSummary: Reviews
  /** Type of product, ex: physical, digital */
  type: Scalars['String']
  /**
   * The availability state of the product.
   * @deprecated Use status inside availabilityV2 instead.
   */
  availability: Scalars['String']
  /**
   * A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'.
   * @deprecated Use description inside availabilityV2 instead.
   */
  availabilityDescription: Scalars['String']
  /** The availability state of the product. */
  availabilityV2: ProductAvailability
  /** List of categories associated with the product. */
  categories: CategoryConnection
  /** Brand associated with the product. */
  brand?: Maybe<Brand>
  /** Variants associated with the product. */
  variants: VariantConnection
  /** Custom fields of the product. */
  customFields: CustomFieldConnection
  /** A list of the images for a product. */
  images: ImageConnection
  /** Default image for a product. */
  defaultImage?: Maybe<Image>
  /** Related products for this product. */
  relatedProducts: RelatedProductsConnection
  /** Inventory information of the product. */
  inventory: ProductInventory
  /** Metafield data related to a product. */
  metafields: MetafieldConnection
  /**
   * Product creation date
   * @deprecated Alpha version. Do not use in production.
   */
  createdAt: DateTimeExtended
}

/** Product */
export type ProductPlainTextDescriptionArgs = {
  characterLimit?: Maybe<Scalars['Int']>
}

/** Product */
export type ProductPricesArgs = {
  includeTax?: Maybe<Scalars['Boolean']>
  currencyCode?: Maybe<CurrencyCode>
}

/** Product */
export type ProductPriceRangesArgs = {
  includeTax?: Maybe<Scalars['Boolean']>
}

/** Product */
export type ProductOptionsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Product */
export type ProductProductOptionsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Product */
export type ProductCategoriesArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Product */
export type ProductVariantsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  entityIds?: Maybe<Array<Scalars['Int']>>
  optionValueIds?: Maybe<Array<OptionValueId>>
}

/** Product */
export type ProductCustomFieldsArgs = {
  names?: Maybe<Array<Scalars['String']>>
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Product */
export type ProductImagesArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Product */
export type ProductRelatedProductsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Product */
export type ProductMetafieldsArgs = {
  namespace: Scalars['String']
  keys?: Maybe<Array<Scalars['String']>>
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Product availability */
export type ProductAvailability = {
  /** The availability state of the product. */
  status: ProductAvailabilityStatus
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']
}

/** Product availability status */
export enum ProductAvailabilityStatus {
  Available = 'Available',
  Preorder = 'Preorder',
  Unavailable = 'Unavailable',
}

/** Available Product */
export type ProductAvailable = ProductAvailability & {
  __typename?: 'ProductAvailable'
  /** The availability state of the product. */
  status: ProductAvailabilityStatus
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']
}

/** A connection to a list of items. */
export type ProductConnection = {
  __typename?: 'ProductConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductEdge>>>
}

/** An edge in a connection. */
export type ProductEdge = {
  __typename?: 'ProductEdge'
  /** The item at the end of the edge. */
  node: Product
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Product Inventory Information */
export type ProductInventory = {
  __typename?: 'ProductInventory'
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean']
  /** Indicates whether this product's inventory is being tracked on variant level. If true, you may wish to check the variants node to understand the true inventory of each individual variant, rather than relying on this product-level aggregate to understand how many items may be added to cart. */
  hasVariantInventory: Scalars['Boolean']
  /** Aggregated product inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
  aggregated?: Maybe<AggregatedInventory>
}

/** Product Option */
export type ProductOption = {
  __typename?: 'ProductOption'
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
  /** Option values. */
  values: OptionValueConnection
}

/** Product Option */
export type ProductOptionValuesArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A connection to a list of items. */
export type ProductOptionConnection = {
  __typename?: 'ProductOptionConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductOptionEdge>>>
}

/** An edge in a connection. */
export type ProductOptionEdge = {
  __typename?: 'ProductOptionEdge'
  /** The item at the end of the edge. */
  node: CatalogProductOption
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Product Option Value */
export type ProductOptionValue = {
  __typename?: 'ProductOptionValue'
  /** Unique ID for the option value. */
  entityId: Scalars['Int']
  /** Label for the option value. */
  label: Scalars['String']
}

/** A connection to a list of items. */
export type ProductOptionValueConnection = {
  __typename?: 'ProductOptionValueConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductOptionValueEdge>>>
}

/** An edge in a connection. */
export type ProductOptionValueEdge = {
  __typename?: 'ProductOptionValueEdge'
  /** The item at the end of the edge. */
  node: CatalogProductOptionValue
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** A Product PickList Value - a product to be mapped to the base product if selected. */
export type ProductPickListOptionValue = CatalogProductOptionValue & {
  __typename?: 'ProductPickListOptionValue'
  /** The ID of the product associated with this option value. */
  productId: Scalars['Int']
  /** Unique ID for the option value. */
  entityId: Scalars['Int']
  /** Label for the option value. */
  label: Scalars['String']
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']
}

/** PreOrder Product */
export type ProductPreOrder = ProductAvailability & {
  __typename?: 'ProductPreOrder'
  /** The message to be shown in the store when a product is put into the pre-order availability state, e.g. "Expected release date is %%DATE%%" */
  message?: Maybe<Scalars['String']>
  /** Product release date */
  willBeReleasedAt?: Maybe<DateTimeExtended>
  /** The availability state of the product. */
  status: ProductAvailabilityStatus
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']
}

/** Unavailable Product */
export type ProductUnavailable = ProductAvailability & {
  __typename?: 'ProductUnavailable'
  /** The message to be shown in the store when "Call for pricing" is enabled for this product, e.g. "Contact us at 555-5555" */
  message?: Maybe<Scalars['String']>
  /** The availability state of the product. */
  status: ProductAvailabilityStatus
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  site: Site
  /** The currently logged in customer. */
  customer?: Maybe<Customer>
  /** Fetches an object given its ID */
  node?: Maybe<Node>
  /** @deprecated Alpha version. Do not use in production. */
  inventory: Inventory
}

export type QueryNodeArgs = {
  id: Scalars['ID']
}

/** A connection to a list of items. */
export type RelatedProductsConnection = {
  __typename?: 'RelatedProductsConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<RelatedProductsEdge>>>
}

/** An edge in a connection. */
export type RelatedProductsEdge = {
  __typename?: 'RelatedProductsEdge'
  /** The item at the end of the edge. */
  node: Product
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Review Rating Summary */
export type Reviews = {
  __typename?: 'Reviews'
  /** Total number of reviews on product. */
  numberOfReviews: Scalars['Int']
  /** Summation of rating scores from each review. */
  summationOfRatings: Scalars['Int']
}

/** route */
export type Route = {
  __typename?: 'Route'
  /** node */
  node?: Maybe<Node>
}

/** Store settings information from the control panel. */
export type Settings = {
  __typename?: 'Settings'
  /** The name of the store. */
  storeName: Scalars['String']
  /** The hash of the store. */
  storeHash: Scalars['String']
  /** The current store status. */
  status: StorefrontStatusType
  /** Logo information for the store. */
  logo: LogoField
  /** Contact information for the store. */
  contact?: Maybe<ContactField>
  /** Store urls. */
  url: UrlField
  /** Store display format information. */
  display: DisplayField
  /** Channel ID. */
  channelId: Scalars['Long']
}

/** A site */
export type Site = {
  __typename?: 'Site'
  categoryTree: Array<CategoryTreeItem>
  /** Details of the brand. */
  brands: BrandConnection
  /** Details of the products. */
  products: ProductConnection
  /** Details of the newest products. */
  newestProducts: ProductConnection
  /** Details of the best selling products. */
  bestSellingProducts: ProductConnection
  /** Details of the featured products. */
  featuredProducts: ProductConnection
  /** A single product object with variant pricing overlay capabilities. */
  product?: Maybe<Product>
  /** Route for a node */
  route: Route
  /** Store settings. */
  settings?: Maybe<Settings>
}

/** A site */
export type SiteBrandsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  productEntityIds?: Maybe<Array<Scalars['Int']>>
}

/** A site */
export type SiteProductsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  ids?: Maybe<Array<Scalars['ID']>>
  entityIds?: Maybe<Array<Scalars['Int']>>
}

/** A site */
export type SiteNewestProductsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A site */
export type SiteBestSellingProductsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A site */
export type SiteFeaturedProductsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A site */
export type SiteProductArgs = {
  id?: Maybe<Scalars['ID']>
  entityId?: Maybe<Scalars['Int']>
  variantEntityId?: Maybe<Scalars['Int']>
  optionValueIds?: Maybe<Array<OptionValueId>>
  sku?: Maybe<Scalars['String']>
}

/** A site */
export type SiteRouteArgs = {
  path: Scalars['String']
}

/** Storefront Mode */
export enum StorefrontStatusType {
  Launched = 'LAUNCHED',
  Maintenance = 'MAINTENANCE',
  PreLaunch = 'PRE_LAUNCH',
  Hibernation = 'HIBERNATION',
}

/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export type SwatchOptionValue = CatalogProductOptionValue & {
  __typename?: 'SwatchOptionValue'
  /** List of up to 3 hex encoded colors to associate with a swatch value. */
  hexColors: Array<Scalars['String']>
  /** Absolute path of a swatch texture image. */
  imageUrl?: Maybe<Scalars['String']>
  /** Unique ID for the option value. */
  entityId: Scalars['Int']
  /** Label for the option value. */
  label: Scalars['String']
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']
}

/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export type SwatchOptionValueImageUrlArgs = {
  width: Scalars['Int']
  height?: Maybe<Scalars['Int']>
}

/** A single line text input field. */
export type TextFieldOption = CatalogProductOption & {
  __typename?: 'TextFieldOption'
  /** Unique ID for the option. */
  entityId: Scalars['Int']
  /** Display name for the option. */
  displayName: Scalars['String']
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']
}

/** Url field */
export type UrlField = {
  __typename?: 'UrlField'
  /** Store url. */
  vanityUrl: Scalars['String']
  /** CDN url to fetch assets. */
  cdnUrl: Scalars['String']
}

/** Variant */
export type Variant = Node & {
  __typename?: 'Variant'
  /** The ID of an object */
  id: Scalars['ID']
  /** Id of the variant. */
  entityId: Scalars['Int']
  /** Sku of the variant. */
  sku: Scalars['String']
  /** The variant's weight. If a weight was not explicitly specified on the variant, this will be the product's weight. */
  weight?: Maybe<Measurement>
  /** The variant's height. If a height was not explicitly specified on the variant, this will be the product's height. */
  height?: Maybe<Measurement>
  /** The variant's width. If a width was not explicitly specified on the variant, this will be the product's width. */
  width?: Maybe<Measurement>
  /** The variant's depth. If a depth was not explicitly specified on the variant, this will be the product's depth. */
  depth?: Maybe<Measurement>
  /** The options which define a variant. */
  options: OptionConnection
  /** Product options that compose this variant. */
  productOptions: ProductOptionConnection
  /** Default image for a variant. */
  defaultImage?: Maybe<Image>
  /** Variant prices */
  prices?: Maybe<Prices>
  /** Variant inventory */
  inventory?: Maybe<VariantInventory>
  /** Metafield data related to a variant. */
  metafields: MetafieldConnection
}

/** Variant */
export type VariantOptionsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Variant */
export type VariantProductOptionsArgs = {
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Variant */
export type VariantPricesArgs = {
  includeTax?: Maybe<Scalars['Boolean']>
  currencyCode?: Maybe<CurrencyCode>
}

/** Variant */
export type VariantMetafieldsArgs = {
  namespace: Scalars['String']
  keys?: Maybe<Array<Scalars['String']>>
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** A connection to a list of items. */
export type VariantConnection = {
  __typename?: 'VariantConnection'
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<VariantEdge>>>
}

/** An edge in a connection. */
export type VariantEdge = {
  __typename?: 'VariantEdge'
  /** The item at the end of the edge. */
  node: Variant
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Variant Inventory */
export type VariantInventory = {
  __typename?: 'VariantInventory'
  /** Aggregated product variant inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
  aggregated?: Maybe<Aggregated>
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean']
  /** Inventory by locations. */
  byLocation?: Maybe<LocationConnection>
}

/** Variant Inventory */
export type VariantInventoryByLocationArgs = {
  locationEntityIds?: Maybe<Array<Scalars['Int']>>
  before?: Maybe<Scalars['String']>
  after?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Please select a currency */
export enum CurrencyCode {
  Adp = 'ADP',
  Aed = 'AED',
  Afa = 'AFA',
  Afn = 'AFN',
  Alk = 'ALK',
  All = 'ALL',
  Amd = 'AMD',
  Ang = 'ANG',
  Aoa = 'AOA',
  Aok = 'AOK',
  Aon = 'AON',
  Aor = 'AOR',
  Ara = 'ARA',
  Arl = 'ARL',
  Arm = 'ARM',
  Arp = 'ARP',
  Ars = 'ARS',
  Ats = 'ATS',
  Aud = 'AUD',
  Awg = 'AWG',
  Azm = 'AZM',
  Azn = 'AZN',
  Bad = 'BAD',
  Bam = 'BAM',
  Ban = 'BAN',
  Bbd = 'BBD',
  Bdt = 'BDT',
  Bec = 'BEC',
  Bef = 'BEF',
  Bel = 'BEL',
  Bgl = 'BGL',
  Bgm = 'BGM',
  Bgn = 'BGN',
  Bgo = 'BGO',
  Bhd = 'BHD',
  Bif = 'BIF',
  Bmd = 'BMD',
  Bnd = 'BND',
  Bob = 'BOB',
  Bol = 'BOL',
  Bop = 'BOP',
  Bov = 'BOV',
  Brb = 'BRB',
  Brc = 'BRC',
  Bre = 'BRE',
  Brl = 'BRL',
  Brn = 'BRN',
  Brr = 'BRR',
  Brz = 'BRZ',
  Bsd = 'BSD',
  Btn = 'BTN',
  Buk = 'BUK',
  Bwp = 'BWP',
  Byb = 'BYB',
  Byr = 'BYR',
  Bzd = 'BZD',
  Cad = 'CAD',
  Cdf = 'CDF',
  Che = 'CHE',
  Chf = 'CHF',
  Chw = 'CHW',
  Cle = 'CLE',
  Clf = 'CLF',
  Clp = 'CLP',
  Cnx = 'CNX',
  Cny = 'CNY',
  Cop = 'COP',
  Cou = 'COU',
  Crc = 'CRC',
  Csd = 'CSD',
  Csk = 'CSK',
  Cve = 'CVE',
  Cyp = 'CYP',
  Czk = 'CZK',
  Ddm = 'DDM',
  Dem = 'DEM',
  Djf = 'DJF',
  Dkk = 'DKK',
  Dop = 'DOP',
  Dzd = 'DZD',
  Ecs = 'ECS',
  Ecv = 'ECV',
  Eek = 'EEK',
  Egp = 'EGP',
  Ern = 'ERN',
  Esa = 'ESA',
  Esb = 'ESB',
  Esp = 'ESP',
  Etb = 'ETB',
  Eur = 'EUR',
  Fim = 'FIM',
  Fjd = 'FJD',
  Fkp = 'FKP',
  Frf = 'FRF',
  Gbp = 'GBP',
  Gek = 'GEK',
  Gel = 'GEL',
  Ghc = 'GHC',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gmd = 'GMD',
  Gnf = 'GNF',
  Gns = 'GNS',
  Gqe = 'GQE',
  Grd = 'GRD',
  Gtq = 'GTQ',
  Gwe = 'GWE',
  Gwp = 'GWP',
  Gyd = 'GYD',
  Hkd = 'HKD',
  Hnl = 'HNL',
  Hrd = 'HRD',
  Hrk = 'HRK',
  Htg = 'HTG',
  Huf = 'HUF',
  Idr = 'IDR',
  Iep = 'IEP',
  Ilp = 'ILP',
  Ilr = 'ILR',
  Ils = 'ILS',
  Inr = 'INR',
  Iqd = 'IQD',
  Isj = 'ISJ',
  Isk = 'ISK',
  Itl = 'ITL',
  Jmd = 'JMD',
  Jod = 'JOD',
  Jpy = 'JPY',
  Kes = 'KES',
  Kgs = 'KGS',
  Khr = 'KHR',
  Kmf = 'KMF',
  Krh = 'KRH',
  Kro = 'KRO',
  Krw = 'KRW',
  Kwd = 'KWD',
  Kyd = 'KYD',
  Kzt = 'KZT',
  Lak = 'LAK',
  Lbp = 'LBP',
  Lkr = 'LKR',
  Lrd = 'LRD',
  Lsl = 'LSL',
  Ltl = 'LTL',
  Ltt = 'LTT',
  Luc = 'LUC',
  Luf = 'LUF',
  Lul = 'LUL',
  Lvl = 'LVL',
  Lvr = 'LVR',
  Lyd = 'LYD',
  Mad = 'MAD',
  Maf = 'MAF',
  Mcf = 'MCF',
  Mdc = 'MDC',
  Mdl = 'MDL',
  Mga = 'MGA',
  Mgf = 'MGF',
  Mkd = 'MKD',
  Mkn = 'MKN',
  Mlf = 'MLF',
  Mmk = 'MMK',
  Mnt = 'MNT',
  Mop = 'MOP',
  Mro = 'MRO',
  Mtl = 'MTL',
  Mtp = 'MTP',
  Mur = 'MUR',
  Mvp = 'MVP',
  Mvr = 'MVR',
  Mwk = 'MWK',
  Mxn = 'MXN',
  Mxp = 'MXP',
  Mxv = 'MXV',
  Myr = 'MYR',
  Mze = 'MZE',
  Mzm = 'MZM',
  Mzn = 'MZN',
  Nad = 'NAD',
  Ngn = 'NGN',
  Nic = 'NIC',
  Nio = 'NIO',
  Nlg = 'NLG',
  Nok = 'NOK',
  Npr = 'NPR',
  Nzd = 'NZD',
  Omr = 'OMR',
  Pab = 'PAB',
  Pei = 'PEI',
  Pen = 'PEN',
  Pes = 'PES',
  Pgk = 'PGK',
  Php = 'PHP',
  Pkr = 'PKR',
  Pln = 'PLN',
  Plz = 'PLZ',
  Pte = 'PTE',
  Pyg = 'PYG',
  Qar = 'QAR',
  Rhd = 'RHD',
  Rol = 'ROL',
  Ron = 'RON',
  Rsd = 'RSD',
  Rub = 'RUB',
  Rur = 'RUR',
  Rwf = 'RWF',
  Sar = 'SAR',
  Sbd = 'SBD',
  Scr = 'SCR',
  Sdd = 'SDD',
  Sdg = 'SDG',
  Sdp = 'SDP',
  Sek = 'SEK',
  Sgd = 'SGD',
  Shp = 'SHP',
  Sit = 'SIT',
  Skk = 'SKK',
  Sll = 'SLL',
  Sos = 'SOS',
  Srd = 'SRD',
  Srg = 'SRG',
  Ssp = 'SSP',
  Std = 'STD',
  Sur = 'SUR',
  Svc = 'SVC',
  Syp = 'SYP',
  Szl = 'SZL',
  Thb = 'THB',
  Tjr = 'TJR',
  Tjs = 'TJS',
  Tmm = 'TMM',
  Tmt = 'TMT',
  Tnd = 'TND',
  Top = 'TOP',
  Tpe = 'TPE',
  Trl = 'TRL',
  Try = 'TRY',
  Ttd = 'TTD',
  Twd = 'TWD',
  Tzs = 'TZS',
  Uah = 'UAH',
  Uak = 'UAK',
  Ugs = 'UGS',
  Ugx = 'UGX',
  Usd = 'USD',
  Usn = 'USN',
  Uss = 'USS',
  Uyi = 'UYI',
  Uyp = 'UYP',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Veb = 'VEB',
  Vef = 'VEF',
  Vnd = 'VND',
  Vnn = 'VNN',
  Vuv = 'VUV',
  Wst = 'WST',
  Xaf = 'XAF',
  Xcd = 'XCD',
  Xeu = 'XEU',
  Xfo = 'XFO',
  Xfu = 'XFU',
  Xof = 'XOF',
  Xpf = 'XPF',
  Xre = 'XRE',
  Ydd = 'YDD',
  Yer = 'YER',
  Yud = 'YUD',
  Yum = 'YUM',
  Yun = 'YUN',
  Yur = 'YUR',
  Zal = 'ZAL',
  Zar = 'ZAR',
  Zmk = 'ZMK',
  Zmw = 'ZMW',
  Zrn = 'ZRN',
  Zrz = 'ZRZ',
  Zwd = 'ZWD',
  Zwl = 'ZWL',
  Zwr = 'ZWR',
}

export type GetLoggedInCustomerQueryVariables = Exact<{ [key: string]: never }>

export type GetLoggedInCustomerQuery = { __typename?: 'Query' } & {
  customer?: Maybe<
    { __typename?: 'Customer' } & Pick<
      Customer,
      | 'entityId'
      | 'firstName'
      | 'lastName'
      | 'email'
      | 'company'
      | 'customerGroupId'
      | 'notes'
      | 'phone'
      | 'addressCount'
      | 'attributeCount'
    > & {
        storeCredit: Array<
          { __typename?: 'Money' } & Pick<Money, 'value' | 'currencyCode'>
        >
      }
  >
}

export type CategoryTreeItemFragment = {
  __typename?: 'CategoryTreeItem'
} & Pick<
  CategoryTreeItem,
  'entityId' | 'name' | 'path' | 'description' | 'productCount'
>

export type ProductPricesFragment = { __typename?: 'Prices' } & {
  price: { __typename?: 'Money' } & Pick<Money, 'value' | 'currencyCode'>
  salePrice?: Maybe<
    { __typename?: 'Money' } & Pick<Money, 'value' | 'currencyCode'>
  >
  retailPrice?: Maybe<
    { __typename?: 'Money' } & Pick<Money, 'value' | 'currencyCode'>
  >
}

export type SwatchOptionFragment = { __typename?: 'SwatchOptionValue' } & Pick<
  SwatchOptionValue,
  'isDefault' | 'hexColors'
>

export type MultipleChoiceOptionFragment = {
  __typename?: 'MultipleChoiceOption'
} & {
  values: { __typename?: 'ProductOptionValueConnection' } & {
    edges?: Maybe<
      Array<
        Maybe<
          { __typename?: 'ProductOptionValueEdge' } & {
            node:
              | ({ __typename?: 'MultipleChoiceOptionValue' } & Pick<
                  MultipleChoiceOptionValue,
                  'label'
                >)
              | ({ __typename?: 'ProductPickListOptionValue' } & Pick<
                  ProductPickListOptionValue,
                  'label'
                >)
              | ({ __typename?: 'SwatchOptionValue' } & Pick<
                  SwatchOptionValue,
                  'label'
                > &
                  SwatchOptionFragment)
          }
        >
      >
    >
  }
}

export type ProductInfoFragment = { __typename?: 'Product' } & Pick<
  Product,
  'entityId' | 'name' | 'path' | 'description'
> & {
    brand?: Maybe<{ __typename?: 'Brand' } & Pick<Brand, 'entityId'>>
    prices?: Maybe<{ __typename?: 'Prices' } & ProductPricesFragment>
    images: { __typename?: 'ImageConnection' } & {
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: 'ImageEdge' } & {
              node: { __typename?: 'Image' } & Pick<
                Image,
                'urlOriginal' | 'altText' | 'isDefault'
              >
            }
          >
        >
      >
    }
    variants: { __typename?: 'VariantConnection' } & {
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: 'VariantEdge' } & {
              node: { __typename?: 'Variant' } & Pick<Variant, 'entityId'> & {
                  defaultImage?: Maybe<
                    { __typename?: 'Image' } & Pick<
                      Image,
                      'urlOriginal' | 'altText' | 'isDefault'
                    >
                  >
                }
            }
          >
        >
      >
    }
    productOptions: { __typename?: 'ProductOptionConnection' } & {
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: 'ProductOptionEdge' } & {
              node:
                | ({ __typename: 'CheckboxOption' } & Pick<
                    CheckboxOption,
                    'entityId' | 'displayName'
                  >)
                | ({ __typename: 'DateFieldOption' } & Pick<
                    DateFieldOption,
                    'entityId' | 'displayName'
                  >)
                | ({ __typename: 'FileUploadFieldOption' } & Pick<
                    FileUploadFieldOption,
                    'entityId' | 'displayName'
                  >)
                | ({ __typename: 'MultiLineTextFieldOption' } & Pick<
                    MultiLineTextFieldOption,
                    'entityId' | 'displayName'
                  >)
                | ({ __typename: 'MultipleChoiceOption' } & Pick<
                    MultipleChoiceOption,
                    'entityId' | 'displayName'
                  > &
                    MultipleChoiceOptionFragment)
                | ({ __typename: 'NumberFieldOption' } & Pick<
                    NumberFieldOption,
                    'entityId' | 'displayName'
                  >)
                | ({ __typename: 'TextFieldOption' } & Pick<
                    TextFieldOption,
                    'entityId' | 'displayName'
                  >)
            }
          >
        >
      >
    }
    localeMeta: { __typename?: 'MetafieldConnection' } & {
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: 'MetafieldEdge' } & {
              node: { __typename?: 'Metafields' } & Pick<
                Metafields,
                'key' | 'value'
              >
            }
          >
        >
      >
    }
  }

export type ProductConnnectionFragment = {
  __typename?: 'ProductConnection'
} & {
  pageInfo: { __typename?: 'PageInfo' } & Pick<
    PageInfo,
    'startCursor' | 'endCursor'
  >
  edges?: Maybe<
    Array<
      Maybe<
        { __typename?: 'ProductEdge' } & Pick<ProductEdge, 'cursor'> & {
            node: { __typename?: 'Product' } & ProductInfoFragment
          }
      >
    >
  >
}

export type GetAllProductPathsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>
}>

export type GetAllProductPathsQuery = { __typename?: 'Query' } & {
  site: { __typename?: 'Site' } & {
    products: { __typename?: 'ProductConnection' } & {
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: 'ProductEdge' } & {
              node: { __typename?: 'Product' } & Pick<Product, 'path'>
            }
          >
        >
      >
    }
  }
}

export type GetAllProductsQueryVariables = Exact<{
  hasLocale?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  entityIds?: Maybe<Array<Scalars['Int']>>
  first?: Maybe<Scalars['Int']>
  products?: Maybe<Scalars['Boolean']>
  featuredProducts?: Maybe<Scalars['Boolean']>
  bestSellingProducts?: Maybe<Scalars['Boolean']>
  newestProducts?: Maybe<Scalars['Boolean']>
}>

export type GetAllProductsQuery = { __typename?: 'Query' } & {
  site: { __typename?: 'Site' } & {
    products: { __typename?: 'ProductConnection' } & ProductConnnectionFragment
    featuredProducts: {
      __typename?: 'ProductConnection'
    } & ProductConnnectionFragment
    bestSellingProducts: {
      __typename?: 'ProductConnection'
    } & ProductConnnectionFragment
    newestProducts: {
      __typename?: 'ProductConnection'
    } & ProductConnnectionFragment
  }
}

export type GetCustomerIdQueryVariables = Exact<{ [key: string]: never }>

export type GetCustomerIdQuery = { __typename?: 'Query' } & {
  customer?: Maybe<{ __typename?: 'Customer' } & Pick<Customer, 'entityId'>>
}

export type GetProductQueryVariables = Exact<{
  hasLocale?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  path: Scalars['String']
}>

export type GetProductQuery = { __typename?: 'Query' } & {
  site: { __typename?: 'Site' } & {
    route: { __typename?: 'Route' } & {
      node?: Maybe<
        | { __typename: 'Brand' }
        | { __typename: 'Category' }
        | ({ __typename: 'Product' } & {
            variants: { __typename?: 'VariantConnection' } & {
              edges?: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'VariantEdge' } & {
                      node: { __typename?: 'Variant' } & Pick<
                        Variant,
                        'entityId'
                      > & {
                          defaultImage?: Maybe<
                            { __typename?: 'Image' } & Pick<
                              Image,
                              'urlOriginal' | 'altText' | 'isDefault'
                            >
                          >
                          prices?: Maybe<
                            { __typename?: 'Prices' } & ProductPricesFragment
                          >
                          inventory?: Maybe<
                            { __typename?: 'VariantInventory' } & Pick<
                              VariantInventory,
                              'isInStock'
                            > & {
                                aggregated?: Maybe<
                                  { __typename?: 'Aggregated' } & Pick<
                                    Aggregated,
                                    'availableToSell' | 'warningLevel'
                                  >
                                >
                              }
                          >
                          productOptions: {
                            __typename?: 'ProductOptionConnection'
                          } & {
                            edges?: Maybe<
                              Array<
                                Maybe<
                                  { __typename?: 'ProductOptionEdge' } & {
                                    node:
                                      | ({
                                          __typename: 'CheckboxOption'
                                        } & Pick<
                                          CheckboxOption,
                                          'entityId' | 'displayName'
                                        >)
                                      | ({
                                          __typename: 'DateFieldOption'
                                        } & Pick<
                                          DateFieldOption,
                                          'entityId' | 'displayName'
                                        >)
                                      | ({
                                          __typename: 'FileUploadFieldOption'
                                        } & Pick<
                                          FileUploadFieldOption,
                                          'entityId' | 'displayName'
                                        >)
                                      | ({
                                          __typename: 'MultiLineTextFieldOption'
                                        } & Pick<
                                          MultiLineTextFieldOption,
                                          'entityId' | 'displayName'
                                        >)
                                      | ({
                                          __typename: 'MultipleChoiceOption'
                                        } & Pick<
                                          MultipleChoiceOption,
                                          'entityId' | 'displayName'
                                        > &
                                          MultipleChoiceOptionFragment)
                                      | ({
                                          __typename: 'NumberFieldOption'
                                        } & Pick<
                                          NumberFieldOption,
                                          'entityId' | 'displayName'
                                        >)
                                      | ({
                                          __typename: 'TextFieldOption'
                                        } & Pick<
                                          TextFieldOption,
                                          'entityId' | 'displayName'
                                        >)
                                  }
                                >
                              >
                            >
                          }
                        }
                    }
                  >
                >
              >
            }
          } & ProductInfoFragment)
        | { __typename: 'Variant' }
      >
    }
  }
}

export type GetSiteInfoQueryVariables = Exact<{ [key: string]: never }>

export type GetSiteInfoQuery = { __typename?: 'Query' } & {
  site: { __typename?: 'Site' } & {
    categoryTree: Array<
      { __typename?: 'CategoryTreeItem' } & {
        children: Array<
          { __typename?: 'CategoryTreeItem' } & {
            children: Array<
              { __typename?: 'CategoryTreeItem' } & CategoryTreeItemFragment
            >
          } & CategoryTreeItemFragment
        >
      } & CategoryTreeItemFragment
    >
    brands: { __typename?: 'BrandConnection' } & {
      pageInfo: { __typename?: 'PageInfo' } & Pick<
        PageInfo,
        'startCursor' | 'endCursor'
      >
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: 'BrandEdge' } & Pick<BrandEdge, 'cursor'> & {
                node: { __typename?: 'Brand' } & Pick<
                  Brand,
                  | 'entityId'
                  | 'name'
                  | 'pageTitle'
                  | 'metaDesc'
                  | 'metaKeywords'
                  | 'searchKeywords'
                  | 'path'
                > & {
                    defaultImage?: Maybe<
                      { __typename?: 'Image' } & Pick<
                        Image,
                        'urlOriginal' | 'altText'
                      >
                    >
                  }
              }
          >
        >
      >
    }
  }
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginResult' } & Pick<LoginResult, 'result'>
}
