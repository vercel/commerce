export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Query = {
  __typename?: 'Query'
  /** The active Channel */
  activeChannel: Channel
  /** The active Customer */
  activeCustomer?: Maybe<Customer>
  /**
   * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentApproved` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
   */
  activeOrder?: Maybe<Order>
  /** An array of supported Countries */
  availableCountries: Array<Country>
  /** A list of Collections available to the shop */
  collections: CollectionList
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is speicified, an error will result. */
  collection?: Maybe<Collection>
  /** Returns a list of eligible shipping methods based on the current active Order */
  eligibleShippingMethods: Array<ShippingMethodQuote>
  /** Returns a list of payment methods and their eligibility based on the current active Order */
  eligiblePaymentMethods: Array<PaymentMethodQuote>
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>
  /** Returns the possible next states that the activeOrder can transition to */
  nextOrderStates: Array<Scalars['String']>
  /**
   * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
   */
  order?: Maybe<Order>
  /**
   * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
   */
  orderByCode?: Maybe<Order>
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is speicified, an error will result. */
  product?: Maybe<Product>
  /** Get a list of Products */
  products: ProductList
  /** Search Products based on the criteria set by the `SearchInput` */
  search: SearchResponse
}

export type QueryCollectionsArgs = {
  options?: Maybe<CollectionListOptions>
}

export type QueryCollectionArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
}

export type QueryOrderArgs = {
  id: Scalars['ID']
}

export type QueryOrderByCodeArgs = {
  code: Scalars['String']
}

export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>
  slug?: Maybe<Scalars['String']>
}

export type QueryProductsArgs = {
  options?: Maybe<ProductListOptions>
}

export type QuerySearchArgs = {
  input: SearchInput
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Adds an item to the order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
  addItemToOrder: UpdateOrderItemsResult
  /** Remove an OrderLine from the Order */
  removeOrderLine: RemoveOrderItemsResult
  /** Remove all OrderLine from the Order */
  removeAllOrderLines: RemoveOrderItemsResult
  /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
  adjustOrderLine: UpdateOrderItemsResult
  /** Applies the given coupon code to the active Order */
  applyCouponCode: ApplyCouponCodeResult
  /** Removes the given coupon code from the active Order */
  removeCouponCode?: Maybe<Order>
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>
  /** Sets the shipping address for this order */
  setOrderShippingAddress: ActiveOrderResult
  /** Sets the billing address for this order */
  setOrderBillingAddress: ActiveOrderResult
  /** Allows any custom fields to be set for the active order */
  setOrderCustomFields: ActiveOrderResult
  /** Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query */
  setOrderShippingMethod: SetOrderShippingMethodResult
  /** Add a Payment to the Order */
  addPaymentToOrder: AddPaymentToOrderResult
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  setCustomerForOrder: SetCustomerForOrderResult
  /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
  login: NativeAuthenticationResult
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult
  /** End the current authenticated session */
  logout: Success
  /**
   * Register a Customer account with the given credentials. There are three possible registration flows:
   *
   * _If `authOptions.requireVerification` is set to `true`:_
   *
   * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosed password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   *
   * _If `authOptions.requireVerification` is set to `false`:_
   *
   * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
   */
  registerCustomerAccount: RegisterCustomerAccountResult
  /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
  refreshCustomerVerification: RefreshCustomerVerificationResult
  /** Update an existing Customer */
  updateCustomer: Customer
  /** Create a new Customer Address */
  createCustomerAddress: Address
  /** Update an existing Address */
  updateCustomerAddress: Address
  /** Delete an existing Address */
  deleteCustomerAddress: Success
  /**
   * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
   *
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the a password _must_ be
   * provided here.
   */
  verifyCustomerAccount: VerifyCustomerAccountResult
  /** Update the password of the active Customer */
  updateCustomerPassword: UpdateCustomerPasswordResult
  /**
   * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
   */
  requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult
  /**
   * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
   */
  updateCustomerEmailAddress: UpdateCustomerEmailAddressResult
  /** Requests a password reset email to be sent */
  requestPasswordReset?: Maybe<RequestPasswordResetResult>
  /** Resets a Customer's password based on the provided token */
  resetPassword: ResetPasswordResult
}

export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID']
  quantity: Scalars['Int']
}

export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID']
}

export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID']
  quantity: Scalars['Int']
}

export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String']
}

export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String']
}

export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String']
}

export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput
}

export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput
}

export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput
}

export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: Scalars['ID']
}

export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput
}

export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput
}

export type MutationLoginArgs = {
  username: Scalars['String']
  password: Scalars['String']
  rememberMe?: Maybe<Scalars['Boolean']>
}

export type MutationAuthenticateArgs = {
  input: AuthenticationInput
  rememberMe?: Maybe<Scalars['Boolean']>
}

export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput
}

export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String']
}

export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput
}

export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput
}

export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput
}

export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID']
}

export type MutationVerifyCustomerAccountArgs = {
  token: Scalars['String']
  password?: Maybe<Scalars['String']>
}

export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type MutationRequestUpdateCustomerEmailAddressArgs = {
  password: Scalars['String']
  newEmailAddress: Scalars['String']
}

export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String']
}

export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String']
}

export type MutationResetPasswordArgs = {
  token: Scalars['String']
  password: Scalars['String']
}

export type Address = Node & {
  __typename?: 'Address'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  fullName?: Maybe<Scalars['String']>
  company?: Maybe<Scalars['String']>
  streetLine1: Scalars['String']
  streetLine2?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  province?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  country: Country
  phoneNumber?: Maybe<Scalars['String']>
  defaultShippingAddress?: Maybe<Scalars['Boolean']>
  defaultBillingAddress?: Maybe<Scalars['Boolean']>
  customFields?: Maybe<Scalars['JSON']>
}

export type Asset = Node & {
  __typename?: 'Asset'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  name: Scalars['String']
  type: AssetType
  fileSize: Scalars['Int']
  mimeType: Scalars['String']
  width: Scalars['Int']
  height: Scalars['Int']
  source: Scalars['String']
  preview: Scalars['String']
  focalPoint?: Maybe<Coordinate>
  customFields?: Maybe<Scalars['JSON']>
}

export type Coordinate = {
  __typename?: 'Coordinate'
  x: Scalars['Float']
  y: Scalars['Float']
}

export type AssetList = PaginatedList & {
  __typename?: 'AssetList'
  items: Array<Asset>
  totalItems: Scalars['Int']
}

export enum AssetType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Binary = 'BINARY',
}

export type CurrentUser = {
  __typename?: 'CurrentUser'
  id: Scalars['ID']
  identifier: Scalars['String']
  channels: Array<CurrentUserChannel>
}

export type CurrentUserChannel = {
  __typename?: 'CurrentUserChannel'
  id: Scalars['ID']
  token: Scalars['String']
  code: Scalars['String']
  permissions: Array<Permission>
}

export type Channel = Node & {
  __typename?: 'Channel'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  code: Scalars['String']
  token: Scalars['String']
  defaultTaxZone?: Maybe<Zone>
  defaultShippingZone?: Maybe<Zone>
  defaultLanguageCode: LanguageCode
  currencyCode: CurrencyCode
  pricesIncludeTax: Scalars['Boolean']
  customFields?: Maybe<Scalars['JSON']>
}

export type Collection = Node & {
  __typename?: 'Collection'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode?: Maybe<LanguageCode>
  name: Scalars['String']
  slug: Scalars['String']
  breadcrumbs: Array<CollectionBreadcrumb>
  position: Scalars['Int']
  description: Scalars['String']
  featuredAsset?: Maybe<Asset>
  assets: Array<Asset>
  parent?: Maybe<Collection>
  children?: Maybe<Array<Collection>>
  filters: Array<ConfigurableOperation>
  translations: Array<CollectionTranslation>
  productVariants: ProductVariantList
  customFields?: Maybe<Scalars['JSON']>
}

export type CollectionProductVariantsArgs = {
  options?: Maybe<ProductVariantListOptions>
}

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb'
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
}

export type CollectionTranslation = {
  __typename?: 'CollectionTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
  slug: Scalars['String']
  description: Scalars['String']
}

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList'
  items: Array<Collection>
  totalItems: Scalars['Int']
}

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList'
  items: Array<ProductVariant>
  totalItems: Scalars['Int']
}

export type ProductVariantListOptions = {
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  sort?: Maybe<ProductVariantSortParameter>
  filter?: Maybe<ProductVariantFilterParameter>
}

export enum GlobalFlag {
  True = 'TRUE',
  False = 'FALSE',
  Inherit = 'INHERIT',
}

export enum AdjustmentType {
  Promotion = 'PROMOTION',
  DistributedOrderPromotion = 'DISTRIBUTED_ORDER_PROMOTION',
}

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED',
}

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * @docsCategory common
 */
export enum Permission {
  Placeholder = 'Placeholder',
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum ErrorCode {
  UnknownError = 'UNKNOWN_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  OrderLimitError = 'ORDER_LIMIT_ERROR',
  NegativeQuantityError = 'NEGATIVE_QUANTITY_ERROR',
  InsufficientStockError = 'INSUFFICIENT_STOCK_ERROR',
  OrderModificationError = 'ORDER_MODIFICATION_ERROR',
  IneligibleShippingMethodError = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  OrderPaymentStateError = 'ORDER_PAYMENT_STATE_ERROR',
  IneligiblePaymentMethodError = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  PaymentFailedError = 'PAYMENT_FAILED_ERROR',
  PaymentDeclinedError = 'PAYMENT_DECLINED_ERROR',
  CouponCodeInvalidError = 'COUPON_CODE_INVALID_ERROR',
  CouponCodeExpiredError = 'COUPON_CODE_EXPIRED_ERROR',
  CouponCodeLimitError = 'COUPON_CODE_LIMIT_ERROR',
  AlreadyLoggedInError = 'ALREADY_LOGGED_IN_ERROR',
  MissingPasswordError = 'MISSING_PASSWORD_ERROR',
  PasswordAlreadySetError = 'PASSWORD_ALREADY_SET_ERROR',
  VerificationTokenInvalidError = 'VERIFICATION_TOKEN_INVALID_ERROR',
  VerificationTokenExpiredError = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  IdentifierChangeTokenInvalidError = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  IdentifierChangeTokenExpiredError = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  PasswordResetTokenInvalidError = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PasswordResetTokenExpiredError = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  NotVerifiedError = 'NOT_VERIFIED_ERROR',
  NoActiveOrderError = 'NO_ACTIVE_ORDER_ERROR',
}

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR',
}

/** Retured when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError'
  errorCode: ErrorCode
  message: Scalars['String']
  authenticationError: Scalars['String']
}

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError'
  errorCode: ErrorCode
  message: Scalars['String']
  transitionError: Scalars['String']
  fromState: Scalars['String']
  toState: Scalars['String']
}

/** Retured when attemting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Retured when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  __typename?: 'OrderLimitError'
  errorCode: ErrorCode
  message: Scalars['String']
  maxItems: Scalars['Int']
}

/** Retured when attemting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  __typename?: 'NegativeQuantityError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  __typename?: 'InsufficientStockError'
  errorCode: ErrorCode
  message: Scalars['String']
  quantityAvailable: Scalars['Int']
  order: Order
}

export type PaginatedList = {
  items: Array<Node>
  totalItems: Scalars['Int']
}

export type Node = {
  id: Scalars['ID']
}

export type ErrorResult = {
  errorCode: ErrorCode
  message: Scalars['String']
}

export type Adjustment = {
  __typename?: 'Adjustment'
  adjustmentSource: Scalars['String']
  type: AdjustmentType
  description: Scalars['String']
  amount: Scalars['Int']
}

export type TaxLine = {
  __typename?: 'TaxLine'
  description: Scalars['String']
  taxRate: Scalars['Float']
}

export type ConfigArg = {
  __typename?: 'ConfigArg'
  name: Scalars['String']
  value: Scalars['String']
}

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  required: Scalars['Boolean']
  defaultValue?: Maybe<Scalars['JSON']>
  label?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  ui?: Maybe<Scalars['JSON']>
}

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation'
  code: Scalars['String']
  args: Array<ConfigArg>
}

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition'
  code: Scalars['String']
  args: Array<ConfigArgDefinition>
  description: Scalars['String']
}

export type DeletionResponse = {
  __typename?: 'DeletionResponse'
  result: DeletionResult
  message?: Maybe<Scalars['String']>
}

export type ConfigArgInput = {
  name: Scalars['String']
  /** A JSON stringified representation of the actual value */
  value: Scalars['String']
}

export type ConfigurableOperationInput = {
  code: Scalars['String']
  arguments: Array<ConfigArgInput>
}

export type StringOperators = {
  eq?: Maybe<Scalars['String']>
  notEq?: Maybe<Scalars['String']>
  contains?: Maybe<Scalars['String']>
  notContains?: Maybe<Scalars['String']>
  in?: Maybe<Array<Scalars['String']>>
  notIn?: Maybe<Array<Scalars['String']>>
  regex?: Maybe<Scalars['String']>
}

export type BooleanOperators = {
  eq?: Maybe<Scalars['Boolean']>
}

export type NumberRange = {
  start: Scalars['Float']
  end: Scalars['Float']
}

export type NumberOperators = {
  eq?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  lte?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  gte?: Maybe<Scalars['Float']>
  between?: Maybe<NumberRange>
}

export type DateRange = {
  start: Scalars['DateTime']
  end: Scalars['DateTime']
}

export type DateOperators = {
  eq?: Maybe<Scalars['DateTime']>
  before?: Maybe<Scalars['DateTime']>
  after?: Maybe<Scalars['DateTime']>
  between?: Maybe<DateRange>
}

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: Maybe<Scalars['ID']>
  or?: Maybe<Array<Scalars['ID']>>
}

export type SearchInput = {
  term?: Maybe<Scalars['String']>
  facetValueIds?: Maybe<Array<Scalars['ID']>>
  facetValueOperator?: Maybe<LogicalOperator>
  facetValueFilters?: Maybe<Array<FacetValueFilterInput>>
  collectionId?: Maybe<Scalars['ID']>
  collectionSlug?: Maybe<Scalars['String']>
  groupByProduct?: Maybe<Scalars['Boolean']>
  take?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
  sort?: Maybe<SearchResultSortParameter>
}

export type SearchResultSortParameter = {
  name?: Maybe<SortOrder>
  price?: Maybe<SortOrder>
}

export type CreateCustomerInput = {
  title?: Maybe<Scalars['String']>
  firstName: Scalars['String']
  lastName: Scalars['String']
  phoneNumber?: Maybe<Scalars['String']>
  emailAddress: Scalars['String']
  customFields?: Maybe<Scalars['JSON']>
}

export type CreateAddressInput = {
  fullName?: Maybe<Scalars['String']>
  company?: Maybe<Scalars['String']>
  streetLine1: Scalars['String']
  streetLine2?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  province?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  countryCode: Scalars['String']
  phoneNumber?: Maybe<Scalars['String']>
  defaultShippingAddress?: Maybe<Scalars['Boolean']>
  defaultBillingAddress?: Maybe<Scalars['Boolean']>
  customFields?: Maybe<Scalars['JSON']>
}

export type UpdateAddressInput = {
  id: Scalars['ID']
  fullName?: Maybe<Scalars['String']>
  company?: Maybe<Scalars['String']>
  streetLine1?: Maybe<Scalars['String']>
  streetLine2?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  province?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  defaultShippingAddress?: Maybe<Scalars['Boolean']>
  defaultBillingAddress?: Maybe<Scalars['Boolean']>
  customFields?: Maybe<Scalars['JSON']>
}

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success'
  success: Scalars['Boolean']
}

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote'
  id: Scalars['ID']
  price: Scalars['Int']
  priceWithTax: Scalars['Int']
  code: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  metadata?: Maybe<Scalars['JSON']>
}

export type PaymentMethodQuote = {
  __typename?: 'PaymentMethodQuote'
  id: Scalars['ID']
  code: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  isEligible: Scalars['Boolean']
  eligibilityMessage?: Maybe<Scalars['String']>
}

export type Country = Node & {
  __typename?: 'Country'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  code: Scalars['String']
  name: Scalars['String']
  enabled: Scalars['Boolean']
  translations: Array<CountryTranslation>
}

export type CountryTranslation = {
  __typename?: 'CountryTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
}

export type CountryList = PaginatedList & {
  __typename?: 'CountryList'
  items: Array<Country>
  totalItems: Scalars['Int']
}

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  Aed = 'AED',
  /** Afghan afghani */
  Afn = 'AFN',
  /** Albanian lek */
  All = 'ALL',
  /** Armenian dram */
  Amd = 'AMD',
  /** Netherlands Antillean guilder */
  Ang = 'ANG',
  /** Angolan kwanza */
  Aoa = 'AOA',
  /** Argentine peso */
  Ars = 'ARS',
  /** Australian dollar */
  Aud = 'AUD',
  /** Aruban florin */
  Awg = 'AWG',
  /** Azerbaijani manat */
  Azn = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  Bam = 'BAM',
  /** Barbados dollar */
  Bbd = 'BBD',
  /** Bangladeshi taka */
  Bdt = 'BDT',
  /** Bulgarian lev */
  Bgn = 'BGN',
  /** Bahraini dinar */
  Bhd = 'BHD',
  /** Burundian franc */
  Bif = 'BIF',
  /** Bermudian dollar */
  Bmd = 'BMD',
  /** Brunei dollar */
  Bnd = 'BND',
  /** Boliviano */
  Bob = 'BOB',
  /** Brazilian real */
  Brl = 'BRL',
  /** Bahamian dollar */
  Bsd = 'BSD',
  /** Bhutanese ngultrum */
  Btn = 'BTN',
  /** Botswana pula */
  Bwp = 'BWP',
  /** Belarusian ruble */
  Byn = 'BYN',
  /** Belize dollar */
  Bzd = 'BZD',
  /** Canadian dollar */
  Cad = 'CAD',
  /** Congolese franc */
  Cdf = 'CDF',
  /** Swiss franc */
  Chf = 'CHF',
  /** Chilean peso */
  Clp = 'CLP',
  /** Renminbi (Chinese) yuan */
  Cny = 'CNY',
  /** Colombian peso */
  Cop = 'COP',
  /** Costa Rican colon */
  Crc = 'CRC',
  /** Cuban convertible peso */
  Cuc = 'CUC',
  /** Cuban peso */
  Cup = 'CUP',
  /** Cape Verde escudo */
  Cve = 'CVE',
  /** Czech koruna */
  Czk = 'CZK',
  /** Djiboutian franc */
  Djf = 'DJF',
  /** Danish krone */
  Dkk = 'DKK',
  /** Dominican peso */
  Dop = 'DOP',
  /** Algerian dinar */
  Dzd = 'DZD',
  /** Egyptian pound */
  Egp = 'EGP',
  /** Eritrean nakfa */
  Ern = 'ERN',
  /** Ethiopian birr */
  Etb = 'ETB',
  /** Euro */
  Eur = 'EUR',
  /** Fiji dollar */
  Fjd = 'FJD',
  /** Falkland Islands pound */
  Fkp = 'FKP',
  /** Pound sterling */
  Gbp = 'GBP',
  /** Georgian lari */
  Gel = 'GEL',
  /** Ghanaian cedi */
  Ghs = 'GHS',
  /** Gibraltar pound */
  Gip = 'GIP',
  /** Gambian dalasi */
  Gmd = 'GMD',
  /** Guinean franc */
  Gnf = 'GNF',
  /** Guatemalan quetzal */
  Gtq = 'GTQ',
  /** Guyanese dollar */
  Gyd = 'GYD',
  /** Hong Kong dollar */
  Hkd = 'HKD',
  /** Honduran lempira */
  Hnl = 'HNL',
  /** Croatian kuna */
  Hrk = 'HRK',
  /** Haitian gourde */
  Htg = 'HTG',
  /** Hungarian forint */
  Huf = 'HUF',
  /** Indonesian rupiah */
  Idr = 'IDR',
  /** Israeli new shekel */
  Ils = 'ILS',
  /** Indian rupee */
  Inr = 'INR',
  /** Iraqi dinar */
  Iqd = 'IQD',
  /** Iranian rial */
  Irr = 'IRR',
  /** Icelandic króna */
  Isk = 'ISK',
  /** Jamaican dollar */
  Jmd = 'JMD',
  /** Jordanian dinar */
  Jod = 'JOD',
  /** Japanese yen */
  Jpy = 'JPY',
  /** Kenyan shilling */
  Kes = 'KES',
  /** Kyrgyzstani som */
  Kgs = 'KGS',
  /** Cambodian riel */
  Khr = 'KHR',
  /** Comoro franc */
  Kmf = 'KMF',
  /** North Korean won */
  Kpw = 'KPW',
  /** South Korean won */
  Krw = 'KRW',
  /** Kuwaiti dinar */
  Kwd = 'KWD',
  /** Cayman Islands dollar */
  Kyd = 'KYD',
  /** Kazakhstani tenge */
  Kzt = 'KZT',
  /** Lao kip */
  Lak = 'LAK',
  /** Lebanese pound */
  Lbp = 'LBP',
  /** Sri Lankan rupee */
  Lkr = 'LKR',
  /** Liberian dollar */
  Lrd = 'LRD',
  /** Lesotho loti */
  Lsl = 'LSL',
  /** Libyan dinar */
  Lyd = 'LYD',
  /** Moroccan dirham */
  Mad = 'MAD',
  /** Moldovan leu */
  Mdl = 'MDL',
  /** Malagasy ariary */
  Mga = 'MGA',
  /** Macedonian denar */
  Mkd = 'MKD',
  /** Myanmar kyat */
  Mmk = 'MMK',
  /** Mongolian tögrög */
  Mnt = 'MNT',
  /** Macanese pataca */
  Mop = 'MOP',
  /** Mauritanian ouguiya */
  Mru = 'MRU',
  /** Mauritian rupee */
  Mur = 'MUR',
  /** Maldivian rufiyaa */
  Mvr = 'MVR',
  /** Malawian kwacha */
  Mwk = 'MWK',
  /** Mexican peso */
  Mxn = 'MXN',
  /** Malaysian ringgit */
  Myr = 'MYR',
  /** Mozambican metical */
  Mzn = 'MZN',
  /** Namibian dollar */
  Nad = 'NAD',
  /** Nigerian naira */
  Ngn = 'NGN',
  /** Nicaraguan córdoba */
  Nio = 'NIO',
  /** Norwegian krone */
  Nok = 'NOK',
  /** Nepalese rupee */
  Npr = 'NPR',
  /** New Zealand dollar */
  Nzd = 'NZD',
  /** Omani rial */
  Omr = 'OMR',
  /** Panamanian balboa */
  Pab = 'PAB',
  /** Peruvian sol */
  Pen = 'PEN',
  /** Papua New Guinean kina */
  Pgk = 'PGK',
  /** Philippine peso */
  Php = 'PHP',
  /** Pakistani rupee */
  Pkr = 'PKR',
  /** Polish złoty */
  Pln = 'PLN',
  /** Paraguayan guaraní */
  Pyg = 'PYG',
  /** Qatari riyal */
  Qar = 'QAR',
  /** Romanian leu */
  Ron = 'RON',
  /** Serbian dinar */
  Rsd = 'RSD',
  /** Russian ruble */
  Rub = 'RUB',
  /** Rwandan franc */
  Rwf = 'RWF',
  /** Saudi riyal */
  Sar = 'SAR',
  /** Solomon Islands dollar */
  Sbd = 'SBD',
  /** Seychelles rupee */
  Scr = 'SCR',
  /** Sudanese pound */
  Sdg = 'SDG',
  /** Swedish krona/kronor */
  Sek = 'SEK',
  /** Singapore dollar */
  Sgd = 'SGD',
  /** Saint Helena pound */
  Shp = 'SHP',
  /** Sierra Leonean leone */
  Sll = 'SLL',
  /** Somali shilling */
  Sos = 'SOS',
  /** Surinamese dollar */
  Srd = 'SRD',
  /** South Sudanese pound */
  Ssp = 'SSP',
  /** São Tomé and Príncipe dobra */
  Stn = 'STN',
  /** Salvadoran colón */
  Svc = 'SVC',
  /** Syrian pound */
  Syp = 'SYP',
  /** Swazi lilangeni */
  Szl = 'SZL',
  /** Thai baht */
  Thb = 'THB',
  /** Tajikistani somoni */
  Tjs = 'TJS',
  /** Turkmenistan manat */
  Tmt = 'TMT',
  /** Tunisian dinar */
  Tnd = 'TND',
  /** Tongan paʻanga */
  Top = 'TOP',
  /** Turkish lira */
  Try = 'TRY',
  /** Trinidad and Tobago dollar */
  Ttd = 'TTD',
  /** New Taiwan dollar */
  Twd = 'TWD',
  /** Tanzanian shilling */
  Tzs = 'TZS',
  /** Ukrainian hryvnia */
  Uah = 'UAH',
  /** Ugandan shilling */
  Ugx = 'UGX',
  /** United States dollar */
  Usd = 'USD',
  /** Uruguayan peso */
  Uyu = 'UYU',
  /** Uzbekistan som */
  Uzs = 'UZS',
  /** Venezuelan bolívar soberano */
  Ves = 'VES',
  /** Vietnamese đồng */
  Vnd = 'VND',
  /** Vanuatu vatu */
  Vuv = 'VUV',
  /** Samoan tala */
  Wst = 'WST',
  /** CFA franc BEAC */
  Xaf = 'XAF',
  /** East Caribbean dollar */
  Xcd = 'XCD',
  /** CFA franc BCEAO */
  Xof = 'XOF',
  /** CFP franc (franc Pacifique) */
  Xpf = 'XPF',
  /** Yemeni rial */
  Yer = 'YER',
  /** South African rand */
  Zar = 'ZAR',
  /** Zambian kwacha */
  Zmw = 'ZMW',
  /** Zimbabwean dollar */
  Zwl = 'ZWL',
}

export type CustomField = {
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
}

export type StringCustomFieldConfig = CustomField & {
  __typename?: 'StringCustomFieldConfig'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  length?: Maybe<Scalars['Int']>
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
  pattern?: Maybe<Scalars['String']>
  options?: Maybe<Array<StringFieldOption>>
}

export type StringFieldOption = {
  __typename?: 'StringFieldOption'
  value: Scalars['String']
  label?: Maybe<Array<LocalizedString>>
}

export type LocaleStringCustomFieldConfig = CustomField & {
  __typename?: 'LocaleStringCustomFieldConfig'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  length?: Maybe<Scalars['Int']>
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
  pattern?: Maybe<Scalars['String']>
}

export type IntCustomFieldConfig = CustomField & {
  __typename?: 'IntCustomFieldConfig'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
  min?: Maybe<Scalars['Int']>
  max?: Maybe<Scalars['Int']>
  step?: Maybe<Scalars['Int']>
}

export type FloatCustomFieldConfig = CustomField & {
  __typename?: 'FloatCustomFieldConfig'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
  min?: Maybe<Scalars['Float']>
  max?: Maybe<Scalars['Float']>
  step?: Maybe<Scalars['Float']>
}

export type BooleanCustomFieldConfig = CustomField & {
  __typename?: 'BooleanCustomFieldConfig'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
}

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  __typename?: 'DateTimeCustomFieldConfig'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
  min?: Maybe<Scalars['String']>
  max?: Maybe<Scalars['String']>
  step?: Maybe<Scalars['Int']>
}

export type RelationCustomFieldConfig = CustomField & {
  __typename?: 'RelationCustomFieldConfig'
  name: Scalars['String']
  type: Scalars['String']
  list: Scalars['Boolean']
  label?: Maybe<Array<LocalizedString>>
  description?: Maybe<Array<LocalizedString>>
  readonly?: Maybe<Scalars['Boolean']>
  internal?: Maybe<Scalars['Boolean']>
  entity: Scalars['String']
  scalarFields: Array<Scalars['String']>
}

export type LocalizedString = {
  __typename?: 'LocalizedString'
  languageCode: LanguageCode
  value: Scalars['String']
}

export type CustomFieldConfig =
  | StringCustomFieldConfig
  | LocaleStringCustomFieldConfig
  | IntCustomFieldConfig
  | FloatCustomFieldConfig
  | BooleanCustomFieldConfig
  | DateTimeCustomFieldConfig
  | RelationCustomFieldConfig

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  name: Scalars['String']
  customers: CustomerList
}

export type CustomerGroupCustomersArgs = {
  options?: Maybe<CustomerListOptions>
}

export type CustomerListOptions = {
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  sort?: Maybe<CustomerSortParameter>
  filter?: Maybe<CustomerFilterParameter>
}

export type Customer = Node & {
  __typename?: 'Customer'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  title?: Maybe<Scalars['String']>
  firstName: Scalars['String']
  lastName: Scalars['String']
  phoneNumber?: Maybe<Scalars['String']>
  emailAddress: Scalars['String']
  addresses?: Maybe<Array<Address>>
  orders: OrderList
  user?: Maybe<User>
  customFields?: Maybe<Scalars['JSON']>
}

export type CustomerOrdersArgs = {
  options?: Maybe<OrderListOptions>
}

export type CustomerList = PaginatedList & {
  __typename?: 'CustomerList'
  items: Array<Customer>
  totalItems: Scalars['Int']
}

export type FacetValue = Node & {
  __typename?: 'FacetValue'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  facet: Facet
  name: Scalars['String']
  code: Scalars['String']
  translations: Array<FacetValueTranslation>
  customFields?: Maybe<Scalars['JSON']>
}

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
}

export type Facet = Node & {
  __typename?: 'Facet'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
  code: Scalars['String']
  values: Array<FacetValue>
  translations: Array<FacetTranslation>
  customFields?: Maybe<Scalars['JSON']>
}

export type FacetTranslation = {
  __typename?: 'FacetTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
}

export type FacetList = PaginatedList & {
  __typename?: 'FacetList'
  items: Array<Facet>
  totalItems: Scalars['Int']
}

export type HistoryEntry = Node & {
  __typename?: 'HistoryEntry'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  type: HistoryEntryType
  data: Scalars['JSON']
}

export enum HistoryEntryType {
  CustomerRegistered = 'CUSTOMER_REGISTERED',
  CustomerVerified = 'CUSTOMER_VERIFIED',
  CustomerDetailUpdated = 'CUSTOMER_DETAIL_UPDATED',
  CustomerAddedToGroup = 'CUSTOMER_ADDED_TO_GROUP',
  CustomerRemovedFromGroup = 'CUSTOMER_REMOVED_FROM_GROUP',
  CustomerAddressCreated = 'CUSTOMER_ADDRESS_CREATED',
  CustomerAddressUpdated = 'CUSTOMER_ADDRESS_UPDATED',
  CustomerAddressDeleted = 'CUSTOMER_ADDRESS_DELETED',
  CustomerPasswordUpdated = 'CUSTOMER_PASSWORD_UPDATED',
  CustomerPasswordResetRequested = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CustomerPasswordResetVerified = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CustomerEmailUpdateRequested = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CustomerEmailUpdateVerified = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CustomerNote = 'CUSTOMER_NOTE',
  OrderStateTransition = 'ORDER_STATE_TRANSITION',
  OrderPaymentTransition = 'ORDER_PAYMENT_TRANSITION',
  OrderFulfillment = 'ORDER_FULFILLMENT',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderFulfillmentTransition = 'ORDER_FULFILLMENT_TRANSITION',
  OrderNote = 'ORDER_NOTE',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED',
  OrderModified = 'ORDER_MODIFIED',
}

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList'
  items: Array<HistoryEntry>
  totalItems: Scalars['Int']
}

export type HistoryEntryListOptions = {
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  sort?: Maybe<HistoryEntrySortParameter>
  filter?: Maybe<HistoryEntryFilterParameter>
}

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Albanian */
  Sq = 'sq',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Armenian */
  Hy = 'hy',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Basque */
  Eu = 'eu',
  /** Belarusian */
  Be = 'be',
  /** Bosnian */
  Bs = 'bs',
  /** Breton */
  Br = 'br',
  /** Bulgarian */
  Bg = 'bg',
  /** Burmese */
  My = 'my',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  ZhHans = 'zh_Hans',
  /** Traditional Chinese */
  ZhHant = 'zh_Hant',
  /** Church Slavic */
  Cu = 'cu',
  /** Cornish */
  Kw = 'kw',
  /** Corsican */
  Co = 'co',
  /** Croatian */
  Hr = 'hr',
  /** Czech */
  Cs = 'cs',
  /** Danish */
  Da = 'da',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  NlBe = 'nl_BE',
  /** Dzongkha */
  Dz = 'dz',
  /** English */
  En = 'en',
  /** Australian English */
  EnAu = 'en_AU',
  /** Canadian English */
  EnCa = 'en_CA',
  /** British English */
  EnGb = 'en_GB',
  /** American English */
  EnUs = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Estonian */
  Et = 'et',
  /** Ewe */
  Ee = 'ee',
  /** Faroese */
  Fo = 'fo',
  /** Finnish */
  Fi = 'fi',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  FrCa = 'fr_CA',
  /** Swiss French */
  FrCh = 'fr_CH',
  /** Fulah */
  Ff = 'ff',
  /** Galician */
  Gl = 'gl',
  /** Ganda */
  Lg = 'lg',
  /** Georgian */
  Ka = 'ka',
  /** German */
  De = 'de',
  /** Austrian German */
  DeAt = 'de_AT',
  /** Swiss High German */
  DeCh = 'de_CH',
  /** Greek */
  El = 'el',
  /** Gujarati */
  Gu = 'gu',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Hungarian */
  Hu = 'hu',
  /** Icelandic */
  Is = 'is',
  /** Igbo */
  Ig = 'ig',
  /** Indonesian */
  Id = 'id',
  /** Interlingua */
  Ia = 'ia',
  /** Irish */
  Ga = 'ga',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Kalaallisut */
  Kl = 'kl',
  /** Kannada */
  Kn = 'kn',
  /** Kashmiri */
  Ks = 'ks',
  /** Kazakh */
  Kk = 'kk',
  /** Khmer */
  Km = 'km',
  /** Kikuyu */
  Ki = 'ki',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Korean */
  Ko = 'ko',
  /** Kurdish */
  Ku = 'ku',
  /** Kyrgyz */
  Ky = 'ky',
  /** Lao */
  Lo = 'lo',
  /** Latin */
  La = 'la',
  /** Latvian */
  Lv = 'lv',
  /** Lingala */
  Ln = 'ln',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Luxembourgish */
  Lb = 'lb',
  /** Macedonian */
  Mk = 'mk',
  /** Malagasy */
  Mg = 'mg',
  /** Malay */
  Ms = 'ms',
  /** Malayalam */
  Ml = 'ml',
  /** Maltese */
  Mt = 'mt',
  /** Manx */
  Gv = 'gv',
  /** Maori */
  Mi = 'mi',
  /** Marathi */
  Mr = 'mr',
  /** Mongolian */
  Mn = 'mn',
  /** Nepali */
  Ne = 'ne',
  /** North Ndebele */
  Nd = 'nd',
  /** Northern Sami */
  Se = 'se',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Odia */
  Or = 'or',
  /** Oromo */
  Om = 'om',
  /** Ossetic */
  Os = 'os',
  /** Pashto */
  Ps = 'ps',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  FaAf = 'fa_AF',
  /** Polish */
  Pl = 'pl',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  PtBr = 'pt_BR',
  /** European Portuguese */
  PtPt = 'pt_PT',
  /** Punjabi */
  Pa = 'pa',
  /** Quechua */
  Qu = 'qu',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  RoMd = 'ro_MD',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Russian */
  Ru = 'ru',
  /** Samoan */
  Sm = 'sm',
  /** Sango */
  Sg = 'sg',
  /** Sanskrit */
  Sa = 'sa',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Serbian */
  Sr = 'sr',
  /** Shona */
  Sn = 'sn',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Sindhi */
  Sd = 'sd',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Somali */
  So = 'so',
  /** Southern Sotho */
  St = 'st',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  EsEs = 'es_ES',
  /** Mexican Spanish */
  EsMx = 'es_MX',
  /** Sundanese */
  Su = 'su',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  SwCd = 'sw_CD',
  /** Swedish */
  Sv = 'sv',
  /** Tajik */
  Tg = 'tg',
  /** Tamil */
  Ta = 'ta',
  /** Tatar */
  Tt = 'tt',
  /** Telugu */
  Te = 'te',
  /** Thai */
  Th = 'th',
  /** Tibetan */
  Bo = 'bo',
  /** Tigrinya */
  Ti = 'ti',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Turkmen */
  Tk = 'tk',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uyghur */
  Ug = 'ug',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Welsh */
  Cy = 'cy',
  /** Western Frisian */
  Fy = 'fy',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Zulu */
  Zu = 'zu',
}

export type Order = Node & {
  __typename?: 'Order'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']>
  /** A unique code for the Order */
  code: Scalars['String']
  state: Scalars['String']
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean']
  customer?: Maybe<Customer>
  shippingAddress?: Maybe<OrderAddress>
  billingAddress?: Maybe<OrderAddress>
  lines: Array<OrderLine>
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  surcharges: Array<Surcharge>
  discounts: Array<Discount>
  /** An array of all coupon codes applied to the Order */
  couponCodes: Array<Scalars['String']>
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>
  payments?: Maybe<Array<Payment>>
  fulfillments?: Maybe<Array<Fulfillment>>
  totalQuantity: Scalars['Int']
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the OrderItems.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  subTotal: Scalars['Int']
  /** Same as subTotal, but inclusive of tax */
  subTotalWithTax: Scalars['Int']
  currencyCode: CurrencyCode
  shippingLines: Array<ShippingLine>
  shipping: Scalars['Int']
  shippingWithTax: Scalars['Int']
  /** Equal to subTotal plus shipping */
  total: Scalars['Int']
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  totalWithTax: Scalars['Int']
  /** A summary of the taxes being applied to this Order */
  taxSummary: Array<OrderTaxSummary>
  history: HistoryEntryList
  customFields?: Maybe<Scalars['JSON']>
}

export type OrderHistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>
}

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary'
  /** A description of this tax */
  description: Scalars['String']
  /** The taxRate as a percentage */
  taxRate: Scalars['Float']
  /** The total net price or OrderItems to which this taxRate applies */
  taxBase: Scalars['Int']
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Int']
}

export type OrderAddress = {
  __typename?: 'OrderAddress'
  fullName?: Maybe<Scalars['String']>
  company?: Maybe<Scalars['String']>
  streetLine1?: Maybe<Scalars['String']>
  streetLine2?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  province?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  customFields?: Maybe<Scalars['JSON']>
}

export type OrderList = PaginatedList & {
  __typename?: 'OrderList'
  items: Array<Order>
  totalItems: Scalars['Int']
}

export type ShippingLine = {
  __typename?: 'ShippingLine'
  shippingMethod: ShippingMethod
  price: Scalars['Int']
  priceWithTax: Scalars['Int']
  discountedPrice: Scalars['Int']
  discountedPriceWithTax: Scalars['Int']
  discounts: Array<Discount>
}

export type Discount = {
  __typename?: 'Discount'
  adjustmentSource: Scalars['String']
  type: AdjustmentType
  description: Scalars['String']
  amount: Scalars['Int']
  amountWithTax: Scalars['Int']
}

export type OrderItem = Node & {
  __typename?: 'OrderItem'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  cancelled: Scalars['Boolean']
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Int']
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Int']
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Int']
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Int']
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportially-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Int']
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Int']
  unitTax: Scalars['Int']
  taxRate: Scalars['Float']
  adjustments: Array<Adjustment>
  taxLines: Array<TaxLine>
  fulfillment?: Maybe<Fulfillment>
  refundId?: Maybe<Scalars['ID']>
}

export type OrderLine = Node & {
  __typename?: 'OrderLine'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  productVariant: ProductVariant
  featuredAsset?: Maybe<Asset>
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Int']
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Int']
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  unitPriceChangeSinceAdded: Scalars['Int']
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  unitPriceWithTaxChangeSinceAdded: Scalars['Int']
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Int']
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Int']
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportially-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Int']
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Int']
  quantity: Scalars['Int']
  items: Array<OrderItem>
  taxRate: Scalars['Float']
  /** The total price of the line excluding tax and discounts. */
  linePrice: Scalars['Int']
  /** The total price of the line including tax bit excluding discounts. */
  linePriceWithTax: Scalars['Int']
  /** The price of the line including discounts, excluding tax */
  discountedLinePrice: Scalars['Int']
  /** The price of the line including discounts and tax */
  discountedLinePriceWithTax: Scalars['Int']
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportially-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  proratedLinePrice: Scalars['Int']
  /** The proratedLinePrice including tax */
  proratedLinePriceWithTax: Scalars['Int']
  /** The total tax on this line */
  lineTax: Scalars['Int']
  discounts: Array<Discount>
  taxLines: Array<TaxLine>
  order: Order
  customFields?: Maybe<Scalars['JSON']>
}

export type Payment = Node & {
  __typename?: 'Payment'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  method: Scalars['String']
  amount: Scalars['Int']
  state: Scalars['String']
  transactionId?: Maybe<Scalars['String']>
  errorMessage?: Maybe<Scalars['String']>
  refunds: Array<Refund>
  metadata?: Maybe<Scalars['JSON']>
}

export type Refund = Node & {
  __typename?: 'Refund'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  items: Scalars['Int']
  shipping: Scalars['Int']
  adjustment: Scalars['Int']
  total: Scalars['Int']
  method?: Maybe<Scalars['String']>
  state: Scalars['String']
  transactionId?: Maybe<Scalars['String']>
  reason?: Maybe<Scalars['String']>
  orderItems: Array<OrderItem>
  paymentId: Scalars['ID']
  metadata?: Maybe<Scalars['JSON']>
}

export type Fulfillment = Node & {
  __typename?: 'Fulfillment'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  orderItems: Array<OrderItem>
  state: Scalars['String']
  method: Scalars['String']
  trackingCode?: Maybe<Scalars['String']>
  customFields?: Maybe<Scalars['JSON']>
}

export type Surcharge = Node & {
  __typename?: 'Surcharge'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  description: Scalars['String']
  sku?: Maybe<Scalars['String']>
  taxLines: Array<TaxLine>
  price: Scalars['Int']
  priceWithTax: Scalars['Int']
  taxRate: Scalars['Float']
}

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  code: Scalars['String']
  name: Scalars['String']
  options: Array<ProductOption>
  translations: Array<ProductOptionGroupTranslation>
  customFields?: Maybe<Scalars['JSON']>
}

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
}

export type ProductOption = Node & {
  __typename?: 'ProductOption'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  code: Scalars['String']
  name: Scalars['String']
  groupId: Scalars['ID']
  group: ProductOptionGroup
  translations: Array<ProductOptionTranslation>
  customFields?: Maybe<Scalars['JSON']>
}

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
}

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse'
  success: Scalars['Boolean']
}

export type SearchResponse = {
  __typename?: 'SearchResponse'
  items: Array<SearchResult>
  totalItems: Scalars['Int']
  facetValues: Array<FacetValueResult>
}

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult'
  facetValue: FacetValue
  count: Scalars['Int']
}

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset'
  id: Scalars['ID']
  preview: Scalars['String']
  focalPoint?: Maybe<Coordinate>
}

export type SearchResult = {
  __typename?: 'SearchResult'
  sku: Scalars['String']
  slug: Scalars['String']
  productId: Scalars['ID']
  productName: Scalars['String']
  productAsset?: Maybe<SearchResultAsset>
  productVariantId: Scalars['ID']
  productVariantName: Scalars['String']
  productVariantAsset?: Maybe<SearchResultAsset>
  price: SearchResultPrice
  priceWithTax: SearchResultPrice
  currencyCode: CurrencyCode
  description: Scalars['String']
  facetIds: Array<Scalars['ID']>
  facetValueIds: Array<Scalars['ID']>
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']>
  /** A relevence score for the result. Differs between database implementations */
  score: Scalars['Float']
}

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice'
  value: Scalars['Int']
}

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange'
  min: Scalars['Int']
  max: Scalars['Int']
}

export type Product = Node & {
  __typename?: 'Product'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
  slug: Scalars['String']
  description: Scalars['String']
  featuredAsset?: Maybe<Asset>
  assets: Array<Asset>
  variants: Array<ProductVariant>
  optionGroups: Array<ProductOptionGroup>
  facetValues: Array<FacetValue>
  translations: Array<ProductTranslation>
  collections: Array<Collection>
  customFields?: Maybe<Scalars['JSON']>
}

export type ProductTranslation = {
  __typename?: 'ProductTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
  slug: Scalars['String']
  description: Scalars['String']
}

export type ProductList = PaginatedList & {
  __typename?: 'ProductList'
  items: Array<Product>
  totalItems: Scalars['Int']
}

export type ProductVariant = Node & {
  __typename?: 'ProductVariant'
  id: Scalars['ID']
  product: Product
  productId: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  sku: Scalars['String']
  name: Scalars['String']
  featuredAsset?: Maybe<Asset>
  assets: Array<Asset>
  price: Scalars['Int']
  currencyCode: CurrencyCode
  priceWithTax: Scalars['Int']
  stockLevel: Scalars['String']
  taxRateApplied: TaxRate
  taxCategory: TaxCategory
  options: Array<ProductOption>
  facetValues: Array<FacetValue>
  translations: Array<ProductVariantTranslation>
  customFields?: Maybe<ProductVariantCustomFields>
}

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
}

export type Promotion = Node & {
  __typename?: 'Promotion'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  startsAt?: Maybe<Scalars['DateTime']>
  endsAt?: Maybe<Scalars['DateTime']>
  couponCode?: Maybe<Scalars['String']>
  perCustomerUsageLimit?: Maybe<Scalars['Int']>
  name: Scalars['String']
  enabled: Scalars['Boolean']
  conditions: Array<ConfigurableOperation>
  actions: Array<ConfigurableOperation>
}

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList'
  items: Array<Promotion>
  totalItems: Scalars['Int']
}

export type Role = Node & {
  __typename?: 'Role'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  code: Scalars['String']
  description: Scalars['String']
  permissions: Array<Permission>
  channels: Array<Channel>
}

export type RoleList = PaginatedList & {
  __typename?: 'RoleList'
  items: Array<Role>
  totalItems: Scalars['Int']
}

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  code: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  fulfillmentHandlerCode: Scalars['String']
  checker: ConfigurableOperation
  calculator: ConfigurableOperation
  translations: Array<ShippingMethodTranslation>
  customFields?: Maybe<Scalars['JSON']>
}

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  languageCode: LanguageCode
  name: Scalars['String']
  description: Scalars['String']
}

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList'
  items: Array<ShippingMethod>
  totalItems: Scalars['Int']
}

export type Tag = Node & {
  __typename?: 'Tag'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  value: Scalars['String']
}

export type TagList = PaginatedList & {
  __typename?: 'TagList'
  items: Array<Tag>
  totalItems: Scalars['Int']
}

export type TaxCategory = Node & {
  __typename?: 'TaxCategory'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  name: Scalars['String']
  isDefault: Scalars['Boolean']
}

export type TaxRate = Node & {
  __typename?: 'TaxRate'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  name: Scalars['String']
  enabled: Scalars['Boolean']
  value: Scalars['Float']
  category: TaxCategory
  zone: Zone
  customerGroup?: Maybe<CustomerGroup>
}

export type TaxRateList = PaginatedList & {
  __typename?: 'TaxRateList'
  items: Array<TaxRate>
  totalItems: Scalars['Int']
}

export type User = Node & {
  __typename?: 'User'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  identifier: Scalars['String']
  verified: Scalars['Boolean']
  roles: Array<Role>
  lastLogin?: Maybe<Scalars['DateTime']>
  authenticationMethods: Array<AuthenticationMethod>
  customFields?: Maybe<Scalars['JSON']>
}

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  strategy: Scalars['String']
}

export type Zone = Node & {
  __typename?: 'Zone'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  name: Scalars['String']
  members: Array<Country>
}

/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export type OrderModificationError = ErrorResult & {
  __typename?: 'OrderModificationError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export type IneligibleShippingMethodError = ErrorResult & {
  __typename?: 'IneligibleShippingMethodError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export type OrderPaymentStateError = ErrorResult & {
  __typename?: 'OrderPaymentStateError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export type IneligiblePaymentMethodError = ErrorResult & {
  __typename?: 'IneligiblePaymentMethodError'
  errorCode: ErrorCode
  message: Scalars['String']
  eligibilityCheckerMessage?: Maybe<Scalars['String']>
}

/** Returned when a Payment fails due to an error. */
export type PaymentFailedError = ErrorResult & {
  __typename?: 'PaymentFailedError'
  errorCode: ErrorCode
  message: Scalars['String']
  paymentErrorMessage: Scalars['String']
}

/** Returned when a Payment is declined by the payment provider. */
export type PaymentDeclinedError = ErrorResult & {
  __typename?: 'PaymentDeclinedError'
  errorCode: ErrorCode
  message: Scalars['String']
  paymentErrorMessage: Scalars['String']
}

/** Returned if the provided coupon code is invalid */
export type CouponCodeInvalidError = ErrorResult & {
  __typename?: 'CouponCodeInvalidError'
  errorCode: ErrorCode
  message: Scalars['String']
  couponCode: Scalars['String']
}

/** Returned if the provided coupon code is invalid */
export type CouponCodeExpiredError = ErrorResult & {
  __typename?: 'CouponCodeExpiredError'
  errorCode: ErrorCode
  message: Scalars['String']
  couponCode: Scalars['String']
}

/** Returned if the provided coupon code is invalid */
export type CouponCodeLimitError = ErrorResult & {
  __typename?: 'CouponCodeLimitError'
  errorCode: ErrorCode
  message: Scalars['String']
  couponCode: Scalars['String']
  limit: Scalars['Int']
}

/** Retured when attemting to set the Customer for an Order when already logged in. */
export type AlreadyLoggedInError = ErrorResult & {
  __typename?: 'AlreadyLoggedInError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Retured when attemting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/** Retured when attemting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Retured if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Retured if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenInvalidError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Retured if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Retured if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Retured if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  __typename?: 'NotVerifiedError'
  errorCode: ErrorCode
  message: Scalars['String']
}

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  __typename?: 'NoActiveOrderError'
  errorCode: ErrorCode
  message: Scalars['String']
}

export type AuthenticationInput = {
  native?: Maybe<NativeAuthInput>
}

export type RegisterCustomerInput = {
  emailAddress: Scalars['String']
  title?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
}

export type UpdateCustomerInput = {
  title?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  customFields?: Maybe<Scalars['JSON']>
}

export type UpdateOrderInput = {
  customFields?: Maybe<Scalars['JSON']>
}

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /** This field should correspond to the `code` property of a PaymentMethodHandler. */
  method: Scalars['String']
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  metadata: Scalars['JSON']
}

export type CollectionListOptions = {
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  sort?: Maybe<CollectionSortParameter>
  filter?: Maybe<CollectionFilterParameter>
}

export type OrderListOptions = {
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  sort?: Maybe<OrderSortParameter>
  filter?: Maybe<OrderFilterParameter>
}

export type ProductListOptions = {
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  sort?: Maybe<ProductSortParameter>
  filter?: Maybe<ProductFilterParameter>
}

export type UpdateOrderItemsResult =
  | Order
  | OrderModificationError
  | OrderLimitError
  | NegativeQuantityError
  | InsufficientStockError

export type RemoveOrderItemsResult = Order | OrderModificationError

export type SetOrderShippingMethodResult =
  | Order
  | OrderModificationError
  | IneligibleShippingMethodError
  | NoActiveOrderError

export type ApplyCouponCodeResult =
  | Order
  | CouponCodeExpiredError
  | CouponCodeInvalidError
  | CouponCodeLimitError

export type AddPaymentToOrderResult =
  | Order
  | OrderPaymentStateError
  | IneligiblePaymentMethodError
  | PaymentFailedError
  | PaymentDeclinedError
  | OrderStateTransitionError
  | NoActiveOrderError

export type TransitionOrderToStateResult = Order | OrderStateTransitionError

export type SetCustomerForOrderResult =
  | Order
  | AlreadyLoggedInError
  | EmailAddressConflictError
  | NoActiveOrderError

export type RegisterCustomerAccountResult =
  | Success
  | MissingPasswordError
  | NativeAuthStrategyError

export type RefreshCustomerVerificationResult =
  | Success
  | NativeAuthStrategyError

export type VerifyCustomerAccountResult =
  | CurrentUser
  | VerificationTokenInvalidError
  | VerificationTokenExpiredError
  | MissingPasswordError
  | PasswordAlreadySetError
  | NativeAuthStrategyError

export type UpdateCustomerPasswordResult =
  | Success
  | InvalidCredentialsError
  | NativeAuthStrategyError

export type RequestUpdateCustomerEmailAddressResult =
  | Success
  | InvalidCredentialsError
  | EmailAddressConflictError
  | NativeAuthStrategyError

export type UpdateCustomerEmailAddressResult =
  | Success
  | IdentifierChangeTokenInvalidError
  | IdentifierChangeTokenExpiredError
  | NativeAuthStrategyError

export type RequestPasswordResetResult = Success | NativeAuthStrategyError

export type ResetPasswordResult =
  | CurrentUser
  | PasswordResetTokenInvalidError
  | PasswordResetTokenExpiredError
  | NativeAuthStrategyError

export type NativeAuthenticationResult =
  | CurrentUser
  | InvalidCredentialsError
  | NotVerifiedError
  | NativeAuthStrategyError

export type AuthenticationResult =
  | CurrentUser
  | InvalidCredentialsError
  | NotVerifiedError

export type ActiveOrderResult = Order | NoActiveOrderError

export type CollectionFilterParameter = {
  createdAt?: Maybe<DateOperators>
  updatedAt?: Maybe<DateOperators>
  languageCode?: Maybe<StringOperators>
  name?: Maybe<StringOperators>
  slug?: Maybe<StringOperators>
  position?: Maybe<NumberOperators>
  description?: Maybe<StringOperators>
}

export type CollectionSortParameter = {
  id?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  slug?: Maybe<SortOrder>
  position?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
}

export type ProductFilterParameter = {
  createdAt?: Maybe<DateOperators>
  updatedAt?: Maybe<DateOperators>
  languageCode?: Maybe<StringOperators>
  name?: Maybe<StringOperators>
  slug?: Maybe<StringOperators>
  description?: Maybe<StringOperators>
}

export type ProductSortParameter = {
  id?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  slug?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
}

export type ProductVariantFilterParameter = {
  createdAt?: Maybe<DateOperators>
  updatedAt?: Maybe<DateOperators>
  languageCode?: Maybe<StringOperators>
  sku?: Maybe<StringOperators>
  name?: Maybe<StringOperators>
  price?: Maybe<NumberOperators>
  currencyCode?: Maybe<StringOperators>
  priceWithTax?: Maybe<NumberOperators>
  stockLevel?: Maybe<StringOperators>
  discountPrice?: Maybe<NumberOperators>
}

export type ProductVariantSortParameter = {
  id?: Maybe<SortOrder>
  productId?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  sku?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  price?: Maybe<SortOrder>
  priceWithTax?: Maybe<SortOrder>
  stockLevel?: Maybe<SortOrder>
  discountPrice?: Maybe<SortOrder>
}

export type CustomerFilterParameter = {
  createdAt?: Maybe<DateOperators>
  updatedAt?: Maybe<DateOperators>
  title?: Maybe<StringOperators>
  firstName?: Maybe<StringOperators>
  lastName?: Maybe<StringOperators>
  phoneNumber?: Maybe<StringOperators>
  emailAddress?: Maybe<StringOperators>
}

export type CustomerSortParameter = {
  id?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  firstName?: Maybe<SortOrder>
  lastName?: Maybe<SortOrder>
  phoneNumber?: Maybe<SortOrder>
  emailAddress?: Maybe<SortOrder>
}

export type OrderFilterParameter = {
  createdAt?: Maybe<DateOperators>
  updatedAt?: Maybe<DateOperators>
  orderPlacedAt?: Maybe<DateOperators>
  code?: Maybe<StringOperators>
  state?: Maybe<StringOperators>
  active?: Maybe<BooleanOperators>
  totalQuantity?: Maybe<NumberOperators>
  subTotal?: Maybe<NumberOperators>
  subTotalWithTax?: Maybe<NumberOperators>
  currencyCode?: Maybe<StringOperators>
  shipping?: Maybe<NumberOperators>
  shippingWithTax?: Maybe<NumberOperators>
  total?: Maybe<NumberOperators>
  totalWithTax?: Maybe<NumberOperators>
}

export type OrderSortParameter = {
  id?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  orderPlacedAt?: Maybe<SortOrder>
  code?: Maybe<SortOrder>
  state?: Maybe<SortOrder>
  totalQuantity?: Maybe<SortOrder>
  subTotal?: Maybe<SortOrder>
  subTotalWithTax?: Maybe<SortOrder>
  shipping?: Maybe<SortOrder>
  shippingWithTax?: Maybe<SortOrder>
  total?: Maybe<SortOrder>
  totalWithTax?: Maybe<SortOrder>
}

export type HistoryEntryFilterParameter = {
  createdAt?: Maybe<DateOperators>
  updatedAt?: Maybe<DateOperators>
  type?: Maybe<StringOperators>
}

export type HistoryEntrySortParameter = {
  id?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
}

export type ProductVariantCustomFields = {
  __typename?: 'ProductVariantCustomFields'
  discountPrice?: Maybe<Scalars['Int']>
}

export type NativeAuthInput = {
  username: Scalars['String']
  password: Scalars['String']
}

export type CartFragment = { __typename?: 'Order' } & Pick<
  Order,
  | 'id'
  | 'code'
  | 'createdAt'
  | 'totalQuantity'
  | 'subTotal'
  | 'subTotalWithTax'
  | 'total'
  | 'totalWithTax'
  | 'currencyCode'
> & {
    customer?: Maybe<{ __typename?: 'Customer' } & Pick<Customer, 'id'>>
    lines: Array<
      { __typename?: 'OrderLine' } & Pick<
        OrderLine,
        | 'id'
        | 'quantity'
        | 'linePriceWithTax'
        | 'discountedLinePriceWithTax'
        | 'unitPriceWithTax'
        | 'discountedUnitPriceWithTax'
      > & {
          featuredAsset?: Maybe<
            { __typename?: 'Asset' } & Pick<Asset, 'id' | 'preview'>
          >
          discounts: Array<
            { __typename?: 'Discount' } & Pick<
              Discount,
              'description' | 'amount'
            >
          >
          productVariant: { __typename?: 'ProductVariant' } & Pick<
            ProductVariant,
            | 'id'
            | 'name'
            | 'sku'
            | 'price'
            | 'priceWithTax'
            | 'stockLevel'
            | 'productId'
          > & { product: { __typename?: 'Product' } & Pick<Product, 'slug'> }
        }
    >
  }

export type SearchResultFragment = { __typename?: 'SearchResult' } & Pick<
  SearchResult,
  'productId' | 'productName' | 'description' | 'slug' | 'sku' | 'currencyCode'
> & {
    productAsset?: Maybe<
      { __typename?: 'SearchResultAsset' } & Pick<
        SearchResultAsset,
        'id' | 'preview'
      >
    >
    priceWithTax:
      | ({ __typename?: 'PriceRange' } & Pick<PriceRange, 'min' | 'max'>)
      | ({ __typename?: 'SinglePrice' } & Pick<SinglePrice, 'value'>)
  }

export type AddItemToOrderMutationVariables = Exact<{
  variantId: Scalars['ID']
  quantity: Scalars['Int']
}>

export type AddItemToOrderMutation = { __typename?: 'Mutation' } & {
  addItemToOrder:
    | ({ __typename: 'Order' } & CartFragment)
    | ({ __typename: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'OrderLimitError' } & Pick<
        OrderLimitError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'NegativeQuantityError' } & Pick<
        NegativeQuantityError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'InsufficientStockError' } & Pick<
        InsufficientStockError,
        'errorCode' | 'message'
      >)
}

export type AdjustOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID']
  quantity: Scalars['Int']
}>

export type AdjustOrderLineMutation = { __typename?: 'Mutation' } & {
  adjustOrderLine:
    | ({ __typename: 'Order' } & CartFragment)
    | ({ __typename: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'OrderLimitError' } & Pick<
        OrderLimitError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'NegativeQuantityError' } & Pick<
        NegativeQuantityError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'InsufficientStockError' } & Pick<
        InsufficientStockError,
        'errorCode' | 'message'
      >)
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login:
    | ({ __typename: 'CurrentUser' } & Pick<CurrentUser, 'id'>)
    | ({ __typename: 'InvalidCredentialsError' } & Pick<
        InvalidCredentialsError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'NotVerifiedError' } & Pick<
        NotVerifiedError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'NativeAuthStrategyError' } & Pick<
        NativeAuthStrategyError,
        'errorCode' | 'message'
      >)
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation' } & {
  logout: { __typename?: 'Success' } & Pick<Success, 'success'>
}

export type RemoveOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID']
}>

export type RemoveOrderLineMutation = { __typename?: 'Mutation' } & {
  removeOrderLine:
    | ({ __typename: 'Order' } & CartFragment)
    | ({ __typename: 'OrderModificationError' } & Pick<
        OrderModificationError,
        'errorCode' | 'message'
      >)
}

export type SignupMutationVariables = Exact<{
  input: RegisterCustomerInput
}>

export type SignupMutation = { __typename?: 'Mutation' } & {
  registerCustomerAccount:
    | ({ __typename: 'Success' } & Pick<Success, 'success'>)
    | ({ __typename: 'MissingPasswordError' } & Pick<
        MissingPasswordError,
        'errorCode' | 'message'
      >)
    | ({ __typename: 'NativeAuthStrategyError' } & Pick<
        NativeAuthStrategyError,
        'errorCode' | 'message'
      >)
}

export type ActiveCustomerQueryVariables = Exact<{ [key: string]: never }>

export type ActiveCustomerQuery = { __typename?: 'Query' } & {
  activeCustomer?: Maybe<
    { __typename?: 'Customer' } & Pick<
      Customer,
      'id' | 'firstName' | 'lastName' | 'emailAddress'
    >
  >
}

export type GetAllProductPathsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>
}>

export type GetAllProductPathsQuery = { __typename?: 'Query' } & {
  products: { __typename?: 'ProductList' } & {
    items: Array<{ __typename?: 'Product' } & Pick<Product, 'slug'>>
  }
}

export type GetAllProductsQueryVariables = Exact<{
  input: SearchInput
}>

export type GetAllProductsQuery = { __typename?: 'Query' } & {
  search: { __typename?: 'SearchResponse' } & {
    items: Array<{ __typename?: 'SearchResult' } & SearchResultFragment>
  }
}

export type ActiveOrderQueryVariables = Exact<{ [key: string]: never }>

export type ActiveOrderQuery = { __typename?: 'Query' } & {
  activeOrder?: Maybe<{ __typename?: 'Order' } & CartFragment>
}

export type GetCollectionsQueryVariables = Exact<{ [key: string]: never }>

export type GetCollectionsQuery = { __typename?: 'Query' } & {
  collections: { __typename?: 'CollectionList' } & {
    items: Array<
      { __typename?: 'Collection' } & Pick<
        Collection,
        'id' | 'name' | 'description' | 'slug'
      > & {
          productVariants: { __typename?: 'ProductVariantList' } & Pick<
            ProductVariantList,
            'totalItems'
          >
          parent?: Maybe<{ __typename?: 'Collection' } & Pick<Collection, 'id'>>
          children?: Maybe<
            Array<{ __typename?: 'Collection' } & Pick<Collection, 'id'>>
          >
        }
    >
  }
}

export type GetProductQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type GetProductQuery = { __typename?: 'Query' } & {
  product?: Maybe<
    { __typename?: 'Product' } & Pick<
      Product,
      'id' | 'name' | 'slug' | 'description'
    > & {
        assets: Array<
          { __typename?: 'Asset' } & Pick<Asset, 'id' | 'preview' | 'name'>
        >
        variants: Array<
          { __typename?: 'ProductVariant' } & Pick<
            ProductVariant,
            'id' | 'priceWithTax' | 'currencyCode'
          > & {
              options: Array<
                { __typename?: 'ProductOption' } & Pick<
                  ProductOption,
                  'id' | 'name' | 'code' | 'groupId'
                > & {
                    group: { __typename?: 'ProductOptionGroup' } & Pick<
                      ProductOptionGroup,
                      'id'
                    > & {
                        options: Array<
                          { __typename?: 'ProductOption' } & Pick<
                            ProductOption,
                            'name'
                          >
                        >
                      }
                  }
              >
            }
        >
        optionGroups: Array<
          { __typename?: 'ProductOptionGroup' } & Pick<
            ProductOptionGroup,
            'id' | 'code' | 'name'
          > & {
              options: Array<
                { __typename?: 'ProductOption' } & Pick<
                  ProductOption,
                  'id' | 'name'
                >
              >
            }
        >
      }
  >
}

export type SearchQueryVariables = Exact<{
  input: SearchInput
}>

export type SearchQuery = { __typename?: 'Query' } & {
  search: { __typename?: 'SearchResponse' } & Pick<
    SearchResponse,
    'totalItems'
  > & { items: Array<{ __typename?: 'SearchResult' } & SearchResultFragment> }
}
