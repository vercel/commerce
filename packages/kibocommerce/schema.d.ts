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
  /** The `AnyScalar` type allows any scalar value by examining the input and passing the serialize, parseValue, and parseLiteral operations to their respective types. */
  AnyScalar: any
  /** DateTime custom scalar type */
  DateTime: any
  /** Object custom scalar type */
  Object: any
}

export type AccountPasswordInfoCollectionInput = {
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<AccountPasswordInfoInput>>>
}

export type AccountPasswordInfoInput = {
  accountId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
  unlockAccount?: Maybe<Scalars['Boolean']>
  passwordInfo?: Maybe<PasswordInfoInput>
}

export type AccountSalesRep = {
  __typename?: 'AccountSalesRep'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AccountSalesRep>
  accountId: Scalars['Int']
  adminUserId?: Maybe<Scalars['String']>
}

export type AccountSalesRep_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AccountSalesRepInput = {
  accountId: Scalars['Int']
  adminUserId?: Maybe<Scalars['String']>
}

export type ActiveDateRange = {
  __typename?: 'ActiveDateRange'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ActiveDateRange>
  startDate?: Maybe<Scalars['DateTime']>
  endDate?: Maybe<Scalars['DateTime']>
}

export type ActiveDateRange_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ActiveDateRangeInput = {
  startDate?: Maybe<Scalars['DateTime']>
  endDate?: Maybe<Scalars['DateTime']>
}

export type AddressValidationRequestInput = {
  address?: Maybe<CuAddressInput>
}

export type AddressValidationResponse = {
  __typename?: 'AddressValidationResponse'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AddressValidationResponse>
  addressCandidates?: Maybe<Array<Maybe<CuAddress>>>
}

export type AddressValidationResponse_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Adjustment = {
  __typename?: 'Adjustment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Adjustment>
  amount?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  internalComment?: Maybe<Scalars['String']>
}

export type Adjustment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AdjustmentInput = {
  amount?: Maybe<Scalars['Float']>
  description?: Maybe<Scalars['String']>
  internalComment?: Maybe<Scalars['String']>
}

export type AppliedLineItemProductDiscount = {
  __typename?: 'AppliedLineItemProductDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AppliedLineItemProductDiscount>
  appliesToSalePrice?: Maybe<Scalars['Boolean']>
  discountQuantity: Scalars['Int']
  productQuantity?: Maybe<Scalars['Int']>
  impactPerUnit?: Maybe<Scalars['Float']>
}

export type AppliedLineItemProductDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AppliedLineItemProductDiscountInput = {
  appliesToSalePrice?: Maybe<Scalars['Boolean']>
  discountQuantity: Scalars['Int']
  productQuantity?: Maybe<Scalars['Int']>
  impactPerUnit?: Maybe<Scalars['Float']>
}

export type AppliedLineItemShippingDiscount = {
  __typename?: 'AppliedLineItemShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AppliedLineItemShippingDiscount>
  methodCode?: Maybe<Scalars['String']>
  discount?: Maybe<CrAppliedDiscount>
  discountQuantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
}

export type AppliedLineItemShippingDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AppliedLineItemShippingDiscountInput = {
  methodCode?: Maybe<Scalars['String']>
  discount?: Maybe<CrAppliedDiscountInput>
  discountQuantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
}

export type AttributeDetail = {
  __typename?: 'AttributeDetail'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AttributeDetail>
  valueType?: Maybe<Scalars['String']>
  inputType?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  usageType?: Maybe<Scalars['String']>
  dataTypeSequence: Scalars['Int']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  validation?: Maybe<PrAttributeValidation>
  searchableInStorefront?: Maybe<Scalars['Boolean']>
  searchDisplayValue?: Maybe<Scalars['Boolean']>
  allowFilteringAndSortingInStorefront?: Maybe<Scalars['Boolean']>
  indexValueWithCase?: Maybe<Scalars['Boolean']>
  customWeightInStorefrontSearch?: Maybe<Scalars['Boolean']>
  displayIntention?: Maybe<Scalars['String']>
}

export type AttributeDetail_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AttributeVocabularyValueDisplayInfo = {
  __typename?: 'AttributeVocabularyValueDisplayInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AttributeVocabularyValueDisplayInfo>
  cmsId?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  colorValue?: Maybe<Scalars['String']>
}

export type AttributeVocabularyValueDisplayInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AuditRecord = {
  __typename?: 'AuditRecord'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AuditRecord>
  id?: Maybe<Scalars['String']>
  changes?: Maybe<Array<Maybe<AuditRecordChange>>>
  auditInfo?: Maybe<CrAuditInfo>
}

export type AuditRecord_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AuditRecordChange = {
  __typename?: 'AuditRecordChange'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AuditRecordChange>
  type?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  fields?: Maybe<Array<Maybe<AuditRecordChangeField>>>
}

export type AuditRecordChange_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AuditRecordChangeField = {
  __typename?: 'AuditRecordChangeField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<AuditRecordChangeField>
  name?: Maybe<Scalars['String']>
  oldValue?: Maybe<Scalars['String']>
  newValue?: Maybe<Scalars['String']>
}

export type AuditRecordChangeField_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type AuditRecordChangeFieldInput = {
  name?: Maybe<Scalars['String']>
  oldValue?: Maybe<Scalars['String']>
  newValue?: Maybe<Scalars['String']>
}

export type AuditRecordChangeInput = {
  type?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  fields?: Maybe<Array<Maybe<AuditRecordChangeFieldInput>>>
}

export type AuditRecordInput = {
  id?: Maybe<Scalars['String']>
  changes?: Maybe<Array<Maybe<AuditRecordChangeInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type B2BAccount = {
  __typename?: 'B2BAccount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BAccount>
  users?: Maybe<Array<Maybe<B2BUser>>>
  isActive?: Maybe<Scalars['Boolean']>
  priceList?: Maybe<Scalars['String']>
  salesReps?: Maybe<Array<Maybe<AccountSalesRep>>>
  rootAccountId?: Maybe<Scalars['Int']>
  parentAccountId?: Maybe<Scalars['Int']>
  approvalStatus?: Maybe<Scalars['String']>
  id: Scalars['Int']
  customerSet?: Maybe<Scalars['String']>
  commerceSummary?: Maybe<CommerceSummary>
  contacts?: Maybe<Array<Maybe<CustomerContact>>>
  companyOrOrganization?: Maybe<Scalars['String']>
  notes?: Maybe<Array<Maybe<CustomerNote>>>
  attributes?: Maybe<Array<Maybe<CustomerAttribute>>>
  segments?: Maybe<Array<Maybe<CustomerSegment>>>
  taxId?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
  customerSinceDate?: Maybe<Scalars['DateTime']>
  accountType?: Maybe<Scalars['String']>
}

export type B2BAccount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type B2BAccountCollection = {
  __typename?: 'B2BAccountCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BAccountCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<B2BAccount>>>
}

export type B2BAccountCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type B2BAccountInput = {
  users?: Maybe<Array<Maybe<B2BUserInput>>>
  isActive?: Maybe<Scalars['Boolean']>
  priceList?: Maybe<Scalars['String']>
  salesReps?: Maybe<Array<Maybe<AccountSalesRepInput>>>
  rootAccountId?: Maybe<Scalars['Int']>
  parentAccountId?: Maybe<Scalars['Int']>
  approvalStatus?: Maybe<Scalars['String']>
  id: Scalars['Int']
  customerSet?: Maybe<Scalars['String']>
  commerceSummary?: Maybe<CommerceSummaryInput>
  contacts?: Maybe<Array<Maybe<CustomerContactInput>>>
  companyOrOrganization?: Maybe<Scalars['String']>
  notes?: Maybe<Array<Maybe<CustomerNoteInput>>>
  attributes?: Maybe<Array<Maybe<CustomerAttributeInput>>>
  segments?: Maybe<Array<Maybe<CustomerSegmentInput>>>
  taxId?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfoInput>
  customerSinceDate?: Maybe<Scalars['DateTime']>
  accountType?: Maybe<Scalars['String']>
}

export type B2BUser = {
  __typename?: 'B2BUser'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BUser>
  emailAddress?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Maybe<UserRole>>>
  isLocked?: Maybe<Scalars['Boolean']>
  isActive?: Maybe<Scalars['Boolean']>
  isRemoved?: Maybe<Scalars['Boolean']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  hasExternalPassword?: Maybe<Scalars['Boolean']>
}

export type B2BUser_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type B2BUserAndAuthInfoInput = {
  b2BUser?: Maybe<B2BUserInput>
  externalPassword?: Maybe<Scalars['String']>
  isImport?: Maybe<Scalars['Boolean']>
}

export type B2BUserCollection = {
  __typename?: 'B2BUserCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<B2BUserCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<B2BUser>>>
}

export type B2BUserCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type B2BUserInput = {
  emailAddress?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  roles?: Maybe<Array<Maybe<UserRoleInput>>>
  isLocked?: Maybe<Scalars['Boolean']>
  isActive?: Maybe<Scalars['Boolean']>
  isRemoved?: Maybe<Scalars['Boolean']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  hasExternalPassword?: Maybe<Scalars['Boolean']>
}

export type BillingInfo = {
  __typename?: 'BillingInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<BillingInfo>
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  billingContact?: Maybe<Contact>
  isSameBillingShippingAddress?: Maybe<Scalars['Boolean']>
  card?: Maybe<PaymentCard>
  token?: Maybe<PaymentToken>
  purchaseOrder?: Maybe<PurchaseOrderPayment>
  check?: Maybe<CheckPayment>
  auditInfo?: Maybe<CrAuditInfo>
  storeCreditCode?: Maybe<Scalars['String']>
  storeCreditType?: Maybe<Scalars['String']>
  customCreditType?: Maybe<Scalars['String']>
  externalTransactionId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
}

export type BillingInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type BillingInfoInput = {
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  billingContact?: Maybe<ContactInput>
  isSameBillingShippingAddress?: Maybe<Scalars['Boolean']>
  card?: Maybe<PaymentCardInput>
  token?: Maybe<PaymentTokenInput>
  purchaseOrder?: Maybe<PurchaseOrderPaymentInput>
  check?: Maybe<CheckPaymentInput>
  auditInfo?: Maybe<CrAuditInfoInput>
  storeCreditCode?: Maybe<Scalars['String']>
  storeCreditType?: Maybe<Scalars['String']>
  customCreditType?: Maybe<Scalars['String']>
  externalTransactionId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
}

export type BoxType = {
  __typename?: 'BoxType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<BoxType>
  name?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  length?: Maybe<Scalars['Float']>
}

export type BoxType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type BpmConfiguration = {
  __typename?: 'BpmConfiguration'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<BpmConfiguration>
  shipmentType?: Maybe<Scalars['String']>
  workflowContainerId?: Maybe<Scalars['String']>
  workflowProcessId?: Maybe<Scalars['String']>
}

export type BpmConfiguration_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type BundledProductSummary = {
  __typename?: 'BundledProductSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<BundledProductSummary>
  productShortDescription?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  measurements?: Maybe<PrPackageMeasurements>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  creditValue?: Maybe<Scalars['Float']>
  productType?: Maybe<Scalars['String']>
}

export type BundledProductSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export enum BundlingStrategyEnum {
  ItemDependency = 'ITEM_DEPENDENCY',
}

export type CancelReasonCollection = {
  __typename?: 'CancelReasonCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CancelReasonCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CancelReasonItem>>>
}

export type CancelReasonCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CancelReasonItem = {
  __typename?: 'CancelReasonItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CancelReasonItem>
  reasonCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  needsMoreInfo?: Maybe<Scalars['Boolean']>
}

export type CancelReasonItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CanceledItem = {
  __typename?: 'CanceledItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CanceledItem>
  canceledReason?: Maybe<CanceledReason>
  auditInfo?: Maybe<CrAuditInfo>
  lineId: Scalars['Int']
  originalOrderItemId?: Maybe<Scalars['String']>
  parentId?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isTaxable?: Maybe<Scalars['Boolean']>
  quantity: Scalars['Int']
  unitPrice: Scalars['Float']
  actualPrice: Scalars['Float']
  overridePrice?: Maybe<Scalars['Float']>
  itemDiscount: Scalars['Float']
  lineItemCost: Scalars['Float']
  itemTax: Scalars['Float']
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  duty: Scalars['Float']
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurements>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  weightedShipmentAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedDutyAdjustment: Scalars['Float']
  taxableShipping: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableHandling: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  parentItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  giftCards?: Maybe<Array<Maybe<GiftCard>>>
}

export type CanceledItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CanceledItemInput = {
  canceledReason?: Maybe<CanceledReasonInput>
  auditInfo?: Maybe<CrAuditInfoInput>
  lineId: Scalars['Int']
  originalOrderItemId?: Maybe<Scalars['String']>
  parentId?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isTaxable?: Maybe<Scalars['Boolean']>
  quantity: Scalars['Int']
  unitPrice: Scalars['Float']
  actualPrice: Scalars['Float']
  overridePrice?: Maybe<Scalars['Float']>
  itemDiscount: Scalars['Float']
  lineItemCost: Scalars['Float']
  itemTax: Scalars['Float']
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  duty: Scalars['Float']
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurementsInput>
  options?: Maybe<Array<Maybe<CrProductOptionInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  weightedShipmentAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedDutyAdjustment: Scalars['Float']
  taxableShipping: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableHandling: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentFieldInput>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  parentItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  giftCards?: Maybe<Array<Maybe<GiftCardInput>>>
}

export type CanceledReason = {
  __typename?: 'CanceledReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CanceledReason>
  reasonCode?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  moreInfo?: Maybe<Scalars['String']>
}

export type CanceledReason_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CanceledReasonInput = {
  reasonCode?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  moreInfo?: Maybe<Scalars['String']>
}

export type CapturableShipmentSummary = {
  __typename?: 'CapturableShipmentSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CapturableShipmentSummary>
  shipmentNumber: Scalars['Int']
  shipmentTotal: Scalars['Float']
  amountApplied: Scalars['Float']
}

export type CapturableShipmentSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CapturableShipmentSummaryInput = {
  shipmentNumber: Scalars['Int']
  shipmentTotal: Scalars['Float']
  amountApplied: Scalars['Float']
}

export type Card = {
  __typename?: 'Card'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Card>
  id?: Maybe<Scalars['String']>
  nameOnCard?: Maybe<Scalars['String']>
  cardType?: Maybe<Scalars['String']>
  expireMonth?: Maybe<Scalars['Int']>
  expireYear?: Maybe<Scalars['Int']>
  cardNumberPart?: Maybe<Scalars['String']>
  contactId: Scalars['Int']
  isDefaultPayMethod?: Maybe<Scalars['Boolean']>
}

export type Card_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CardCollection = {
  __typename?: 'CardCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CardCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Card>>>
}

export type CardCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CardInput = {
  id?: Maybe<Scalars['String']>
  nameOnCard?: Maybe<Scalars['String']>
  cardType?: Maybe<Scalars['String']>
  expireMonth?: Maybe<Scalars['Int']>
  expireYear?: Maybe<Scalars['Int']>
  cardNumberPart?: Maybe<Scalars['String']>
  contactId: Scalars['Int']
  isDefaultPayMethod?: Maybe<Scalars['Boolean']>
}

export type Carrier = {
  __typename?: 'Carrier'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Carrier>
  carrierType?: Maybe<Scalars['String']>
  isEnabled?: Maybe<Scalars['Boolean']>
  shippingMethodMappings?: Maybe<ShippingMethodMappings>
}

export type Carrier_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CarrierServiceGenerateLabelResponse = {
  __typename?: 'CarrierServiceGenerateLabelResponse'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CarrierServiceGenerateLabelResponse>
  imageURL?: Maybe<Scalars['String']>
  integratorId?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['Float']>
  trackingNumber?: Maybe<Scalars['String']>
}

export type CarrierServiceGenerateLabelResponse_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Cart = {
  __typename?: 'Cart'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Cart>
  items?: Maybe<Array<Maybe<CartItem>>>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
  priceListCode?: Maybe<Scalars['String']>
  cartMessage?: Maybe<CartMessage>
  cartMessages?: Maybe<Array<Maybe<CartMessage>>>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingSubTotal?: Maybe<Scalars['Float']>
  handlingTotal?: Maybe<Scalars['Float']>
  userId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  channelCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  subtotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  taxTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  extendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  auditInfo?: Maybe<CrAuditInfo>
}

export type Cart_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CartChangeMessageCollection = {
  __typename?: 'CartChangeMessageCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartChangeMessageCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<ChangeMessage>>>
}

export type CartChangeMessageCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CartInput = {
  items?: Maybe<Array<Maybe<CartItemInput>>>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
  priceListCode?: Maybe<Scalars['String']>
  cartMessage?: Maybe<CartMessageInput>
  cartMessages?: Maybe<Array<Maybe<CartMessageInput>>>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingSubTotal?: Maybe<Scalars['Float']>
  handlingTotal?: Maybe<Scalars['Float']>
  userId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  channelCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  subtotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  taxTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  extendedProperties?: Maybe<Array<Maybe<ExtendedPropertyInput>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type CartItem = {
  __typename?: 'CartItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartItem>
  id?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  product?: Maybe<CrProduct>
  quantity: Scalars['Int']
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  subtotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  taxableTotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CommerceUnitPrice>
  productDiscount?: Maybe<AppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscount>>>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscount>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  parentItemId?: Maybe<Scalars['String']>
}

export type CartItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CartItemCollection = {
  __typename?: 'CartItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartItemCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CartItem>>>
}

export type CartItemCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CartItemInput = {
  id?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  product?: Maybe<CrProductInput>
  quantity: Scalars['Int']
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  subtotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  taxableTotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CommerceUnitPriceInput>
  productDiscount?: Maybe<AppliedLineItemProductDiscountInput>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscountInput>>>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscountInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfoInput>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  parentItemId?: Maybe<Scalars['String']>
}

export type CartMessage = {
  __typename?: 'CartMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartMessage>
  message?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  productsRemoved?: Maybe<Array<Maybe<CrProduct>>>
}

export type CartMessage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CartMessageInput = {
  message?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  productsRemoved?: Maybe<Array<Maybe<CrProductInput>>>
}

export type CartSummary = {
  __typename?: 'CartSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CartSummary>
  itemCount?: Maybe<Scalars['Int']>
  totalQuantity?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Float']>
  isExpired?: Maybe<Scalars['Boolean']>
  hasActiveCart?: Maybe<Scalars['Boolean']>
}

export type CartSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CategoryCollection = {
  __typename?: 'CategoryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<PrCategory>>>
}

export type CategoryCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CategoryContent = {
  __typename?: 'CategoryContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryContent>
  categoryImages?: Maybe<Array<Maybe<CategoryImage>>>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  pageTitle?: Maybe<Scalars['String']>
  metaTagTitle?: Maybe<Scalars['String']>
  metaTagDescription?: Maybe<Scalars['String']>
  metaTagKeywords?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
}

export type CategoryContent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CategoryImage = {
  __typename?: 'CategoryImage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryImage>
  imageLabel?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  cmsId?: Maybe<Scalars['String']>
  videoUrl?: Maybe<Scalars['String']>
  mediaType?: Maybe<Scalars['String']>
  sequence?: Maybe<Scalars['Int']>
}

export type CategoryImage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CategoryPagedCollection = {
  __typename?: 'CategoryPagedCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CategoryPagedCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<PrCategory>>>
}

export type CategoryPagedCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ChangeMessage = {
  __typename?: 'ChangeMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChangeMessage>
  id?: Maybe<Scalars['String']>
  correlationId?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  userFirstName?: Maybe<Scalars['String']>
  userLastName?: Maybe<Scalars['String']>
  userScopeType?: Maybe<Scalars['String']>
  appId?: Maybe<Scalars['String']>
  appKey?: Maybe<Scalars['String']>
  appName?: Maybe<Scalars['String']>
  subjectType?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  identifier?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
  verb?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  oldValue?: Maybe<Scalars['String']>
  newValue?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Float']>
  createDate?: Maybe<Scalars['DateTime']>
}

export type ChangeMessage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ChangeMessageInput = {
  id?: Maybe<Scalars['String']>
  correlationId?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  userFirstName?: Maybe<Scalars['String']>
  userLastName?: Maybe<Scalars['String']>
  userScopeType?: Maybe<Scalars['String']>
  appId?: Maybe<Scalars['String']>
  appKey?: Maybe<Scalars['String']>
  appName?: Maybe<Scalars['String']>
  subjectType?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  identifier?: Maybe<Scalars['String']>
  subject?: Maybe<Scalars['String']>
  verb?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  oldValue?: Maybe<Scalars['String']>
  newValue?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Float']>
  createDate?: Maybe<Scalars['DateTime']>
}

export type ChangePasswordResult = {
  __typename?: 'ChangePasswordResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChangePasswordResult>
  accountId: Scalars['Int']
  succeeded?: Maybe<Scalars['Boolean']>
  errorMessage?: Maybe<Scalars['String']>
}

export type ChangePasswordResult_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ChangePasswordResultCollection = {
  __typename?: 'ChangePasswordResultCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChangePasswordResultCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<ChangePasswordResult>>>
}

export type ChangePasswordResultCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Channel = {
  __typename?: 'Channel'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Channel>
  tenantId: Scalars['Int']
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  groupCode?: Maybe<Scalars['String']>
  siteIds?: Maybe<Array<Scalars['Int']>>
  auditInfo?: Maybe<CrAuditInfo>
}

export type Channel_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ChannelCollection = {
  __typename?: 'ChannelCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChannelCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Channel>>>
}

export type ChannelCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ChannelGroup = {
  __typename?: 'ChannelGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChannelGroup>
  tenantId: Scalars['Int']
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
}

export type ChannelGroup_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ChannelGroupCollection = {
  __typename?: 'ChannelGroupCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ChannelGroupCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<ChannelGroup>>>
}

export type ChannelGroupCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ChannelGroupInput = {
  tenantId: Scalars['Int']
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type ChannelInput = {
  tenantId: Scalars['Int']
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  groupCode?: Maybe<Scalars['String']>
  siteIds?: Maybe<Array<Scalars['Int']>>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type CheckPayment = {
  __typename?: 'CheckPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CheckPayment>
  checkNumber?: Maybe<Scalars['String']>
}

export type CheckPayment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CheckPaymentInput = {
  checkNumber?: Maybe<Scalars['String']>
}

export type Checkout = {
  __typename?: 'Checkout'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Checkout>
  id?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  number?: Maybe<Scalars['Int']>
  originalCartId?: Maybe<Scalars['String']>
  submittedDate?: Maybe<Scalars['DateTime']>
  type?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  groupings?: Maybe<Array<Maybe<CheckoutGrouping>>>
  auditInfo?: Maybe<CrAuditInfo>
  destinations?: Maybe<Array<Maybe<Destination>>>
  payments?: Maybe<Array<Maybe<Payment>>>
  amountRemainingForPayment: Scalars['Float']
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  customerAccountId?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  currencyCode?: Maybe<Scalars['String']>
  priceListCode?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<Maybe<OrderAttribute>>>
  shopperNotes?: Maybe<ShopperNotes>
  availableActions?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  channelCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
  ipAddress?: Maybe<Scalars['String']>
  sourceDevice?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  dutyTotal?: Maybe<Scalars['Float']>
  feeTotal: Scalars['Float']
  subTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  shippingSubTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingSubTotal: Scalars['Float']
  itemLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelHandlingDiscountTotal: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  total: Scalars['Float']
}

export type Checkout_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CheckoutActionInput = {
  actionName?: Maybe<Scalars['String']>
}

export type CheckoutCollection = {
  __typename?: 'CheckoutCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CheckoutCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Checkout>>>
}

export type CheckoutCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CheckoutGroupRates = {
  __typename?: 'CheckoutGroupRates'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CheckoutGroupRates>
  groupingId?: Maybe<Scalars['String']>
  shippingRates?: Maybe<Array<Maybe<ShippingRate>>>
}

export type CheckoutGroupRates_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CheckoutGroupShippingMethodInput = {
  groupingId?: Maybe<Scalars['String']>
  shippingRate?: Maybe<ShippingRateInput>
}

export type CheckoutGrouping = {
  __typename?: 'CheckoutGrouping'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CheckoutGrouping>
  id?: Maybe<Scalars['String']>
  destinationId?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  orderItemIds?: Maybe<Array<Scalars['String']>>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  standaloneGroup?: Maybe<Scalars['Boolean']>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscount>>>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  shippingAmount?: Maybe<Scalars['Float']>
  shippingSubTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingTax?: Maybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingAmount?: Maybe<Scalars['Float']>
  handlingSubTotal: Scalars['Float']
  itemLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelHandlingDiscountTotal: Scalars['Float']
  handlingTax?: Maybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  taxData?: Maybe<Scalars['Object']>
}

export type CheckoutGrouping_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CheckoutGroupingInput = {
  id?: Maybe<Scalars['String']>
  destinationId?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  orderItemIds?: Maybe<Array<Scalars['String']>>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  standaloneGroup?: Maybe<Scalars['Boolean']>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscountInput>>>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  shippingAmount?: Maybe<Scalars['Float']>
  shippingSubTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingTax?: Maybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingAmount?: Maybe<Scalars['Float']>
  handlingSubTotal: Scalars['Float']
  itemLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelHandlingDiscountTotal: Scalars['Float']
  handlingTax?: Maybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  taxData?: Maybe<Scalars['Object']>
}

export type CheckoutInput = {
  id?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  number?: Maybe<Scalars['Int']>
  originalCartId?: Maybe<Scalars['String']>
  submittedDate?: Maybe<Scalars['DateTime']>
  type?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<CrOrderItemInput>>>
  groupings?: Maybe<Array<Maybe<CheckoutGroupingInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
  destinations?: Maybe<Array<Maybe<DestinationInput>>>
  payments?: Maybe<Array<Maybe<PaymentInput>>>
  amountRemainingForPayment: Scalars['Float']
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  customerAccountId?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  currencyCode?: Maybe<Scalars['String']>
  priceListCode?: Maybe<Scalars['String']>
  attributes?: Maybe<Array<Maybe<OrderAttributeInput>>>
  shopperNotes?: Maybe<ShopperNotesInput>
  availableActions?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  channelCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
  ipAddress?: Maybe<Scalars['String']>
  sourceDevice?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  dutyTotal?: Maybe<Scalars['Float']>
  feeTotal: Scalars['Float']
  subTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  itemTotal: Scalars['Float']
  shippingSubTotal: Scalars['Float']
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingSubTotal: Scalars['Float']
  itemLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelHandlingDiscountTotal: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  total: Scalars['Float']
}

export type CoHttpContentInput = {
  headers?: Maybe<Array<Maybe<KeyValuePair2Input>>>
}

export type CoHttpMethodInput = {
  method?: Maybe<Scalars['String']>
}

export type CoHttpRequestMessageInput = {
  version?: Maybe<Scalars['String']>
  content?: Maybe<CoHttpContentInput>
  method?: Maybe<CoHttpMethodInput>
  requestUri?: Maybe<Scalars['DateTime']>
  headers?: Maybe<Array<Maybe<KeyValuePair2Input>>>
  properties?: Maybe<Scalars['Object']>
}

export type CommerceSummary = {
  __typename?: 'CommerceSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CommerceSummary>
  totalOrderAmount?: Maybe<CurrencyAmount>
  orderCount: Scalars['Int']
  lastOrderDate?: Maybe<Scalars['DateTime']>
  wishlistCount: Scalars['Int']
  visitsCount: Scalars['Int']
}

export type CommerceSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CommerceSummaryInput = {
  totalOrderAmount?: Maybe<CurrencyAmountInput>
  orderCount: Scalars['Int']
  lastOrderDate?: Maybe<Scalars['DateTime']>
  wishlistCount: Scalars['Int']
  visitsCount: Scalars['Int']
}

export type CommerceUnitPrice = {
  __typename?: 'CommerceUnitPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CommerceUnitPrice>
  extendedAmount?: Maybe<Scalars['Float']>
  listAmount?: Maybe<Scalars['Float']>
  saleAmount?: Maybe<Scalars['Float']>
  overrideAmount?: Maybe<Scalars['Float']>
}

export type CommerceUnitPrice_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CommerceUnitPriceInput = {
  extendedAmount?: Maybe<Scalars['Float']>
  listAmount?: Maybe<Scalars['Float']>
  saleAmount?: Maybe<Scalars['Float']>
  overrideAmount?: Maybe<Scalars['Float']>
}

export type ConfiguredProduct = {
  __typename?: 'ConfiguredProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ConfiguredProduct>
  productCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  variationProductCode?: Maybe<Scalars['String']>
  upc?: Maybe<Scalars['String']>
  mfgPartNumber?: Maybe<Scalars['String']>
  purchasableState?: Maybe<ProductPurchasableState>
  priceRange?: Maybe<ProductPriceRange>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
  price?: Maybe<ProductPrice>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  measurements?: Maybe<PrPackageMeasurements>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  options?: Maybe<Array<Maybe<ProductOption>>>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  priceListEntryTypeProperty?: Maybe<ProductProperty>
  productImages?: Maybe<Array<Maybe<ProductImage>>>
}

export type ConfiguredProduct_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Contact = {
  __typename?: 'Contact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Contact>
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  companyOrOrganization?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<CrPhone>
  address?: Maybe<CrAddress>
}

export type Contact_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ContactInput = {
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  companyOrOrganization?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<CrPhoneInput>
  address?: Maybe<CrAddressInput>
}

export type ContactType = {
  __typename?: 'ContactType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ContactType>
  name?: Maybe<Scalars['String']>
  isPrimary?: Maybe<Scalars['Boolean']>
}

export type ContactType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ContactTypeInput = {
  name?: Maybe<Scalars['String']>
  isPrimary?: Maybe<Scalars['Boolean']>
}

export type Coordinates = {
  __typename?: 'Coordinates'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Coordinates>
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type Coordinates_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CoordinatesInput = {
  lat: Scalars['Float']
  lng: Scalars['Float']
}

export type CrAddress = {
  __typename?: 'CrAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAddress>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
  postalOrZipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
}

export type CrAddress_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrAddressInput = {
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
  postalOrZipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
}

export type CrAppliedDiscount = {
  __typename?: 'CrAppliedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAppliedDiscount>
  impact?: Maybe<Scalars['Float']>
  discount?: Maybe<CrDiscount>
  couponCode?: Maybe<Scalars['String']>
  excluded?: Maybe<Scalars['Boolean']>
}

export type CrAppliedDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrAppliedDiscountInput = {
  impact?: Maybe<Scalars['Float']>
  discount?: Maybe<CrDiscountInput>
  couponCode?: Maybe<Scalars['String']>
  excluded?: Maybe<Scalars['Boolean']>
}

export type CrAuditInfo = {
  __typename?: 'CrAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrAuditInfo>
  updateDate?: Maybe<Scalars['DateTime']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  createBy?: Maybe<Scalars['String']>
}

export type CrAuditInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrAuditInfoInput = {
  updateDate?: Maybe<Scalars['DateTime']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  createBy?: Maybe<Scalars['String']>
}

export type CrBundledProduct = {
  __typename?: 'CrBundledProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrBundledProduct>
  quantity: Scalars['Int']
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  creditValue?: Maybe<Scalars['Float']>
  deltaPrice?: Maybe<Scalars['Float']>
  productCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  stock?: Maybe<ProductStock>
  productReservationId?: Maybe<Scalars['Int']>
  allocationId?: Maybe<Scalars['Int']>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurements>
  fulfillmentStatus?: Maybe<Scalars['String']>
}

export type CrBundledProduct_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrBundledProductInput = {
  quantity: Scalars['Int']
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  creditValue?: Maybe<Scalars['Float']>
  deltaPrice?: Maybe<Scalars['Float']>
  productCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  stock?: Maybe<ProductStockInput>
  productReservationId?: Maybe<Scalars['Int']>
  allocationId?: Maybe<Scalars['Int']>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurementsInput>
  fulfillmentStatus?: Maybe<Scalars['String']>
}

export type CrCategory = {
  __typename?: 'CrCategory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrCategory>
  id?: Maybe<Scalars['Int']>
  parent?: Maybe<CrCategory>
}

export type CrCategory_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrCategoryInput = {
  id?: Maybe<Scalars['Int']>
  parent?: Maybe<CrCategoryInput>
}

export type CrDiscount = {
  __typename?: 'CrDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrDiscount>
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  itemIds?: Maybe<Array<Scalars['String']>>
  expirationDate?: Maybe<Scalars['DateTime']>
  hasMultipleTargetProducts?: Maybe<Scalars['Boolean']>
}

export type CrDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrDiscountInput = {
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  itemIds?: Maybe<Array<Scalars['String']>>
  expirationDate?: Maybe<Scalars['DateTime']>
  hasMultipleTargetProducts?: Maybe<Scalars['Boolean']>
}

export type CrMeasurement = {
  __typename?: 'CrMeasurement'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrMeasurement>
  unit?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Float']>
}

export type CrMeasurement_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrMeasurementInput = {
  unit?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Float']>
}

export type CrOrderItem = {
  __typename?: 'CrOrderItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrOrderItem>
  id?: Maybe<Scalars['String']>
  destinationId?: Maybe<Scalars['String']>
  originalCartItemId?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  dutyAmount?: Maybe<Scalars['Float']>
  expectedDeliveryDate?: Maybe<Scalars['DateTime']>
  localeCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  product?: Maybe<CrProduct>
  quantity: Scalars['Int']
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  subtotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  taxableTotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CommerceUnitPrice>
  productDiscount?: Maybe<AppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscount>>>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscount>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  parentItemId?: Maybe<Scalars['String']>
}

export type CrOrderItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrOrderItemInput = {
  id?: Maybe<Scalars['String']>
  destinationId?: Maybe<Scalars['String']>
  originalCartItemId?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  fulfillmentMethod?: Maybe<Scalars['String']>
  dutyAmount?: Maybe<Scalars['Float']>
  expectedDeliveryDate?: Maybe<Scalars['DateTime']>
  localeCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  product?: Maybe<CrProductInput>
  quantity: Scalars['Int']
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  subtotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  taxableTotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CommerceUnitPriceInput>
  productDiscount?: Maybe<AppliedLineItemProductDiscountInput>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscountInput>>>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscountInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfoInput>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  parentItemId?: Maybe<Scalars['String']>
}

export type CrPackageMeasurements = {
  __typename?: 'CrPackageMeasurements'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPackageMeasurements>
  height?: Maybe<CrMeasurement>
  width?: Maybe<CrMeasurement>
  length?: Maybe<CrMeasurement>
  weight?: Maybe<CrMeasurement>
}

export type CrPackageMeasurements_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrPackageMeasurementsInput = {
  height?: Maybe<CrMeasurementInput>
  width?: Maybe<CrMeasurementInput>
  length?: Maybe<CrMeasurementInput>
  weight?: Maybe<CrMeasurementInput>
}

export type CrPhone = {
  __typename?: 'CrPhone'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrPhone>
  home?: Maybe<Scalars['String']>
  mobile?: Maybe<Scalars['String']>
  work?: Maybe<Scalars['String']>
}

export type CrPhone_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrPhoneInput = {
  home?: Maybe<Scalars['String']>
  mobile?: Maybe<Scalars['String']>
  work?: Maybe<Scalars['String']>
}

export type CrProduct = {
  __typename?: 'CrProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProduct>
  mfgPartNumber?: Maybe<Scalars['String']>
  upc?: Maybe<Scalars['String']>
  sku?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  imageAlternateText?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  properties?: Maybe<Array<Maybe<CrProductProperty>>>
  categories?: Maybe<Array<Maybe<CrCategory>>>
  price?: Maybe<CrProductPrice>
  discountsRestricted?: Maybe<Scalars['Boolean']>
  discountsRestrictedStartDate?: Maybe<Scalars['DateTime']>
  discountsRestrictedEndDate?: Maybe<Scalars['DateTime']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  productType?: Maybe<Scalars['String']>
  productUsage?: Maybe<Scalars['String']>
  bundledProducts?: Maybe<Array<Maybe<CrBundledProduct>>>
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  productCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  stock?: Maybe<ProductStock>
  productReservationId?: Maybe<Scalars['Int']>
  allocationId?: Maybe<Scalars['Int']>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurements>
  fulfillmentStatus?: Maybe<Scalars['String']>
}

export type CrProduct_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrProductInput = {
  mfgPartNumber?: Maybe<Scalars['String']>
  upc?: Maybe<Scalars['String']>
  sku?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  imageAlternateText?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<CrProductOptionInput>>>
  properties?: Maybe<Array<Maybe<CrProductPropertyInput>>>
  categories?: Maybe<Array<Maybe<CrCategoryInput>>>
  price?: Maybe<CrProductPriceInput>
  discountsRestricted?: Maybe<Scalars['Boolean']>
  discountsRestrictedStartDate?: Maybe<Scalars['DateTime']>
  discountsRestrictedEndDate?: Maybe<Scalars['DateTime']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  productType?: Maybe<Scalars['String']>
  productUsage?: Maybe<Scalars['String']>
  bundledProducts?: Maybe<Array<Maybe<CrBundledProductInput>>>
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentFieldInput>>>
  productCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  stock?: Maybe<ProductStockInput>
  productReservationId?: Maybe<Scalars['Int']>
  allocationId?: Maybe<Scalars['Int']>
  allocationExpiration?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurementsInput>
  fulfillmentStatus?: Maybe<Scalars['String']>
}

export type CrProductOption = {
  __typename?: 'CrProductOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductOption>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
  shopperEnteredValue?: Maybe<Scalars['Object']>
  attributeFQN?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  stringValue?: Maybe<Scalars['String']>
}

export type CrProductOption_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrProductOptionInput = {
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
  shopperEnteredValue?: Maybe<Scalars['Object']>
  attributeFQN?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  stringValue?: Maybe<Scalars['String']>
}

export type CrProductPrice = {
  __typename?: 'CrProductPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductPrice>
  price?: Maybe<Scalars['Float']>
  salePrice?: Maybe<Scalars['Float']>
  tenantOverridePrice?: Maybe<Scalars['Float']>
  msrp?: Maybe<Scalars['Float']>
  creditValue?: Maybe<Scalars['Float']>
  priceListCode?: Maybe<Scalars['String']>
  priceListEntryMode?: Maybe<Scalars['String']>
}

export type CrProductPrice_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrProductPriceInput = {
  price?: Maybe<Scalars['Float']>
  salePrice?: Maybe<Scalars['Float']>
  tenantOverridePrice?: Maybe<Scalars['Float']>
  msrp?: Maybe<Scalars['Float']>
  creditValue?: Maybe<Scalars['Float']>
  priceListCode?: Maybe<Scalars['String']>
  priceListEntryMode?: Maybe<Scalars['String']>
}

export type CrProductProperty = {
  __typename?: 'CrProductProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductProperty>
  attributeFQN?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  values?: Maybe<Array<Maybe<CrProductPropertyValue>>>
}

export type CrProductProperty_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrProductPropertyInput = {
  attributeFQN?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  values?: Maybe<Array<Maybe<CrProductPropertyValueInput>>>
}

export type CrProductPropertyValue = {
  __typename?: 'CrProductPropertyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CrProductPropertyValue>
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type CrProductPropertyValue_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CrProductPropertyValueInput = {
  stringValue?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type Credit = {
  __typename?: 'Credit'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Credit>
  code?: Maybe<Scalars['String']>
  activationDate?: Maybe<Scalars['DateTime']>
  creditType?: Maybe<Scalars['String']>
  customCreditType?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  initialBalance?: Maybe<Scalars['Float']>
  currentBalance?: Maybe<Scalars['Float']>
  expirationDate?: Maybe<Scalars['DateTime']>
  customerId?: Maybe<Scalars['Int']>
  auditInfo?: Maybe<CuAuditInfo>
  creditTypeId: Scalars['Int']
}

export type Credit_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CreditAuditEntry = {
  __typename?: 'CreditAuditEntry'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditAuditEntry>
  activityType?: Maybe<Scalars['String']>
  details?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
  activityTypeId: Scalars['Int']
}

export type CreditAuditEntry_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CreditAuditEntryCollection = {
  __typename?: 'CreditAuditEntryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditAuditEntryCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CreditAuditEntry>>>
}

export type CreditAuditEntryCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CreditCollection = {
  __typename?: 'CreditCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Credit>>>
}

export type CreditCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CreditInput = {
  code?: Maybe<Scalars['String']>
  activationDate?: Maybe<Scalars['DateTime']>
  creditType?: Maybe<Scalars['String']>
  customCreditType?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  initialBalance?: Maybe<Scalars['Float']>
  currentBalance?: Maybe<Scalars['Float']>
  expirationDate?: Maybe<Scalars['DateTime']>
  customerId?: Maybe<Scalars['Int']>
  auditInfo?: Maybe<CuAuditInfoInput>
  creditTypeId: Scalars['Int']
}

export type CreditTransaction = {
  __typename?: 'CreditTransaction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditTransaction>
  id?: Maybe<Scalars['Int']>
  transactionType?: Maybe<Scalars['String']>
  comments?: Maybe<Scalars['String']>
  impactAmount?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CuAuditInfo>
  orderId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
}

export type CreditTransaction_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CreditTransactionCollection = {
  __typename?: 'CreditTransactionCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CreditTransactionCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CreditTransaction>>>
}

export type CreditTransactionCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CreditTransactionInput = {
  id?: Maybe<Scalars['Int']>
  transactionType?: Maybe<Scalars['String']>
  comments?: Maybe<Scalars['String']>
  impactAmount?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CuAuditInfoInput>
  orderId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
}

export type CuAddress = {
  __typename?: 'CuAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAddress>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
  postalOrZipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
}

export type CuAddress_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAddressInput = {
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
  postalOrZipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
}

export type CuAttribute = {
  __typename?: 'CuAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttribute>
  id?: Maybe<Scalars['Int']>
  adminName?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  attributeCode: Scalars['String']
  inputType?: Maybe<Scalars['String']>
  valueType: Scalars['String']
  dataType?: Maybe<Scalars['String']>
  attributeMetadata?: Maybe<Array<Maybe<CuAttributeMetadataItem>>>
  attributeFQN?: Maybe<Scalars['String']>
  content?: Maybe<CuAttributeLocalizedContent>
  validation?: Maybe<CuAttributeValidation>
  vocabularyValues?: Maybe<Array<Maybe<CuAttributeVocabularyValue>>>
  auditInfo?: Maybe<CuAuditInfo>
  isActive?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  isReadOnly?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  isVisible?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  displayGroup: Scalars['String']
}

export type CuAttribute_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAttributeCollection = {
  __typename?: 'CuAttributeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CuAttribute>>>
}

export type CuAttributeCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAttributeInput = {
  id?: Maybe<Scalars['Int']>
  adminName?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  attributeCode: Scalars['String']
  inputType?: Maybe<Scalars['String']>
  valueType: Scalars['String']
  dataType?: Maybe<Scalars['String']>
  attributeMetadata?: Maybe<Array<Maybe<CuAttributeMetadataItemInput>>>
  attributeFQN?: Maybe<Scalars['String']>
  content?: Maybe<CuAttributeLocalizedContentInput>
  validation?: Maybe<CuAttributeValidationInput>
  vocabularyValues?: Maybe<Array<Maybe<CuAttributeVocabularyValueInput>>>
  auditInfo?: Maybe<CuAuditInfoInput>
  isActive?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  isReadOnly?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  isVisible?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  displayGroup: Scalars['String']
}

export type CuAttributeLocalizedContent = {
  __typename?: 'CuAttributeLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeLocalizedContent>
  localeCode?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CuAttributeLocalizedContent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAttributeLocalizedContentInput = {
  localeCode?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type CuAttributeMetadataItem = {
  __typename?: 'CuAttributeMetadataItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeMetadataItem>
  key: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeMetadataItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAttributeMetadataItemInput = {
  key: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeValidation = {
  __typename?: 'CuAttributeValidation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeValidation>
  regularExpression?: Maybe<Scalars['String']>
  minStringLength?: Maybe<Scalars['Int']>
  maxStringLength?: Maybe<Scalars['Int']>
  minNumericValue?: Maybe<Scalars['Float']>
  maxNumericValue?: Maybe<Scalars['Float']>
  minDateTime?: Maybe<Scalars['DateTime']>
  maxDateTime?: Maybe<Scalars['DateTime']>
}

export type CuAttributeValidation_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAttributeValidationInput = {
  regularExpression?: Maybe<Scalars['String']>
  minStringLength?: Maybe<Scalars['Int']>
  maxStringLength?: Maybe<Scalars['Int']>
  minNumericValue?: Maybe<Scalars['Float']>
  maxNumericValue?: Maybe<Scalars['Float']>
  minDateTime?: Maybe<Scalars['DateTime']>
  maxDateTime?: Maybe<Scalars['DateTime']>
}

export type CuAttributeValueLocalizedContent = {
  __typename?: 'CuAttributeValueLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeValueLocalizedContent>
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeValueLocalizedContent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAttributeValueLocalizedContentInput = {
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type CuAttributeVocabularyValue = {
  __typename?: 'CuAttributeVocabularyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAttributeVocabularyValue>
  value: Scalars['String']
  sequence?: Maybe<Scalars['Int']>
  isHidden?: Maybe<Scalars['Boolean']>
  content?: Maybe<CuAttributeValueLocalizedContent>
}

export type CuAttributeVocabularyValue_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAttributeVocabularyValueInput = {
  value: Scalars['String']
  sequence?: Maybe<Scalars['Int']>
  isHidden?: Maybe<Scalars['Boolean']>
  content?: Maybe<CuAttributeValueLocalizedContentInput>
}

export type CuAuditInfo = {
  __typename?: 'CuAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuAuditInfo>
  updateDate?: Maybe<Scalars['DateTime']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  createBy?: Maybe<Scalars['String']>
}

export type CuAuditInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuAuditInfoInput = {
  updateDate?: Maybe<Scalars['DateTime']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  createBy?: Maybe<Scalars['String']>
}

export type CuPhone = {
  __typename?: 'CuPhone'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CuPhone>
  home?: Maybe<Scalars['String']>
  mobile?: Maybe<Scalars['String']>
  work?: Maybe<Scalars['String']>
}

export type CuPhone_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CuPhoneInput = {
  home?: Maybe<Scalars['String']>
  mobile?: Maybe<Scalars['String']>
  work?: Maybe<Scalars['String']>
}

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CurrencyAmount>
  currencyCode?: Maybe<Scalars['String']>
  amount: Scalars['Float']
}

export type CurrencyAmount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CurrencyAmountInput = {
  currencyCode?: Maybe<Scalars['String']>
  amount: Scalars['Float']
}

export type CurrencyExchangeRate = {
  __typename?: 'CurrencyExchangeRate'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CurrencyExchangeRate>
  fromCurrencyCode?: Maybe<Scalars['String']>
  toCurrencyCode?: Maybe<Scalars['String']>
  rate?: Maybe<Scalars['Float']>
  multiplier?: Maybe<Scalars['Float']>
  decimalPlaces?: Maybe<Scalars['Int']>
  roundingStrategy?: Maybe<Scalars['Int']>
  referenceData?: Maybe<Scalars['String']>
}

export type CurrencyExchangeRate_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Customer = {
  __typename?: 'Customer'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Customer>
  customerContact?: Maybe<Contact>
  data?: Maybe<Scalars['Object']>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
}

export type Customer_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerAccount = {
  __typename?: 'CustomerAccount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAccount>
  emailAddress?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  isAnonymous?: Maybe<Scalars['Boolean']>
  isLocked?: Maybe<Scalars['Boolean']>
  isActive?: Maybe<Scalars['Boolean']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  hasExternalPassword?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  customerSet?: Maybe<Scalars['String']>
  commerceSummary?: Maybe<CommerceSummary>
  contacts?: Maybe<Array<Maybe<CustomerContact>>>
  companyOrOrganization?: Maybe<Scalars['String']>
  notes?: Maybe<Array<Maybe<CustomerNote>>>
  attributes?: Maybe<Array<Maybe<CustomerAttribute>>>
  segments?: Maybe<Array<Maybe<CustomerSegment>>>
  taxId?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
  customerSinceDate?: Maybe<Scalars['DateTime']>
  accountType?: Maybe<Scalars['String']>
}

export type CustomerAccount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerAccountAndAuthInfoInput = {
  account?: Maybe<CustomerAccountInput>
  password?: Maybe<Scalars['String']>
  externalPassword?: Maybe<Scalars['String']>
  isImport?: Maybe<Scalars['Boolean']>
}

export type CustomerAccountCollection = {
  __typename?: 'CustomerAccountCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAccountCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerAccount>>>
}

export type CustomerAccountCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerAccountInput = {
  emailAddress?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  isAnonymous?: Maybe<Scalars['Boolean']>
  isLocked?: Maybe<Scalars['Boolean']>
  isActive?: Maybe<Scalars['Boolean']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  hasExternalPassword?: Maybe<Scalars['Boolean']>
  id: Scalars['Int']
  customerSet?: Maybe<Scalars['String']>
  commerceSummary?: Maybe<CommerceSummaryInput>
  contacts?: Maybe<Array<Maybe<CustomerContactInput>>>
  companyOrOrganization?: Maybe<Scalars['String']>
  notes?: Maybe<Array<Maybe<CustomerNoteInput>>>
  attributes?: Maybe<Array<Maybe<CustomerAttributeInput>>>
  segments?: Maybe<Array<Maybe<CustomerSegmentInput>>>
  taxId?: Maybe<Scalars['String']>
  externalId?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfoInput>
  customerSinceDate?: Maybe<Scalars['DateTime']>
  accountType?: Maybe<Scalars['String']>
}

export type CustomerAttribute = {
  __typename?: 'CustomerAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAttribute>
  auditInfo?: Maybe<CuAuditInfo>
  fullyQualifiedName?: Maybe<Scalars['String']>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type CustomerAttribute_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerAttributeCollection = {
  __typename?: 'CustomerAttributeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAttributeCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerAttribute>>>
}

export type CustomerAttributeCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerAttributeInput = {
  auditInfo?: Maybe<CuAuditInfoInput>
  fullyQualifiedName?: Maybe<Scalars['String']>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type CustomerAuditEntry = {
  __typename?: 'CustomerAuditEntry'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAuditEntry>
  customerAccountId: Scalars['Int']
  customerAuditEntryId: Scalars['Int']
  entryDate: Scalars['DateTime']
  entryUser?: Maybe<Scalars['String']>
  application?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  fieldPath?: Maybe<Scalars['String']>
  oldValue?: Maybe<Scalars['String']>
  newValue?: Maybe<Scalars['String']>
}

export type CustomerAuditEntry_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerAuditEntryCollection = {
  __typename?: 'CustomerAuditEntryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAuditEntryCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerAuditEntry>>>
}

export type CustomerAuditEntryCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerAuthTicket = {
  __typename?: 'CustomerAuthTicket'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerAuthTicket>
  customerAccount?: Maybe<CustomerAccount>
  accessToken?: Maybe<Scalars['String']>
  accessTokenExpiration: Scalars['DateTime']
  refreshToken?: Maybe<Scalars['String']>
  refreshTokenExpiration: Scalars['DateTime']
  userId?: Maybe<Scalars['String']>
  jwtAccessToken?: Maybe<Scalars['String']>
}

export type CustomerAuthTicket_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerContact = {
  __typename?: 'CustomerContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerContact>
  accountId: Scalars['Int']
  types?: Maybe<Array<Maybe<ContactType>>>
  auditInfo?: Maybe<CuAuditInfo>
  faxNumber?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  companyOrOrganization?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<CuPhone>
  address?: Maybe<CuAddress>
}

export type CustomerContact_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerContactCollection = {
  __typename?: 'CustomerContactCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerContactCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerContact>>>
}

export type CustomerContactCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerContactInput = {
  accountId: Scalars['Int']
  types?: Maybe<Array<Maybe<ContactTypeInput>>>
  auditInfo?: Maybe<CuAuditInfoInput>
  faxNumber?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  companyOrOrganization?: Maybe<Scalars['String']>
  phoneNumbers?: Maybe<CuPhoneInput>
  address?: Maybe<CuAddressInput>
}

export type CustomerInput = {
  customerContact?: Maybe<ContactInput>
  data?: Maybe<Scalars['Object']>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
}

export type CustomerLoginInfoInput = {
  emailAddress?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  externalPassword?: Maybe<Scalars['String']>
  isImport?: Maybe<Scalars['Boolean']>
}

export type CustomerNote = {
  __typename?: 'CustomerNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerNote>
  id: Scalars['Int']
  content?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
}

export type CustomerNote_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerNoteCollection = {
  __typename?: 'CustomerNoteCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerNoteCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerNote>>>
}

export type CustomerNoteCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerNoteInput = {
  id: Scalars['Int']
  content?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfoInput>
}

export type CustomerPurchaseOrderAccount = {
  __typename?: 'CustomerPurchaseOrderAccount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerPurchaseOrderAccount>
  id: Scalars['Int']
  accountId: Scalars['Int']
  isEnabled?: Maybe<Scalars['Boolean']>
  creditLimit: Scalars['Float']
  availableBalance: Scalars['Float']
  totalAvailableBalance: Scalars['Float']
  overdraftAllowance?: Maybe<Scalars['Float']>
  overdraftAllowanceType?: Maybe<Scalars['String']>
  customerPurchaseOrderPaymentTerms?: Maybe<
    Array<Maybe<CustomerPurchaseOrderPaymentTerm>>
  >
  auditInfo?: Maybe<CuAuditInfo>
}

export type CustomerPurchaseOrderAccount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerPurchaseOrderAccountCollection = {
  __typename?: 'CustomerPurchaseOrderAccountCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerPurchaseOrderAccountCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerPurchaseOrderAccount>>>
}

export type CustomerPurchaseOrderAccountCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerPurchaseOrderAccountInput = {
  id: Scalars['Int']
  accountId: Scalars['Int']
  isEnabled?: Maybe<Scalars['Boolean']>
  creditLimit: Scalars['Float']
  availableBalance: Scalars['Float']
  totalAvailableBalance: Scalars['Float']
  overdraftAllowance?: Maybe<Scalars['Float']>
  overdraftAllowanceType?: Maybe<Scalars['String']>
  customerPurchaseOrderPaymentTerms?: Maybe<
    Array<Maybe<CustomerPurchaseOrderPaymentTermInput>>
  >
  auditInfo?: Maybe<CuAuditInfoInput>
}

export type CustomerPurchaseOrderPaymentTerm = {
  __typename?: 'CustomerPurchaseOrderPaymentTerm'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerPurchaseOrderPaymentTerm>
  siteId: Scalars['Int']
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
}

export type CustomerPurchaseOrderPaymentTerm_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerPurchaseOrderPaymentTermInput = {
  siteId: Scalars['Int']
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfoInput>
}

export type CustomerSegment = {
  __typename?: 'CustomerSegment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSegment>
  id: Scalars['Int']
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
}

export type CustomerSegment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerSegmentCollection = {
  __typename?: 'CustomerSegmentCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSegmentCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerSegment>>>
}

export type CustomerSegmentCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerSegmentInput = {
  id: Scalars['Int']
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfoInput>
}

export type CustomerSet = {
  __typename?: 'CustomerSet'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSet>
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
  sites?: Maybe<Array<Maybe<CustomerSetSite>>>
  isDefault?: Maybe<Scalars['Boolean']>
  aggregateInfo?: Maybe<CustomerSetAggregateInfo>
}

export type CustomerSet_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerSetAggregateInfo = {
  __typename?: 'CustomerSetAggregateInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSetAggregateInfo>
  customerCount: Scalars['Int']
}

export type CustomerSetAggregateInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerSetCollection = {
  __typename?: 'CustomerSetCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSetCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CustomerSet>>>
}

export type CustomerSetCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerSetSite = {
  __typename?: 'CustomerSetSite'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<CustomerSetSite>
  siteId: Scalars['Int']
  customerSetCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type CustomerSetSite_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type CustomerUserAuthInfoInput = {
  username?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
}

export type Destination = {
  __typename?: 'Destination'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Destination>
  id?: Maybe<Scalars['String']>
  destinationContact?: Maybe<Contact>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
  data?: Maybe<Scalars['Object']>
}

export type Destination_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DestinationInput = {
  id?: Maybe<Scalars['String']>
  destinationContact?: Maybe<ContactInput>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
  data?: Maybe<Scalars['Object']>
}

export type DigitalPackage = {
  __typename?: 'DigitalPackage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DigitalPackage>
  id?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<DigitalPackageItem>>>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
}

export type DigitalPackage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DigitalPackageInput = {
  id?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<DigitalPackageItemInput>>>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
}

export type DigitalPackageItem = {
  __typename?: 'DigitalPackageItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DigitalPackageItem>
  giftCardCode?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
}

export type DigitalPackageItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DigitalPackageItemInput = {
  giftCardCode?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
}

export type DigitalWalletInput = {
  digitalWalletData?: Maybe<Scalars['String']>
  cartId?: Maybe<Scalars['String']>
}

export type DiscountSelectionsInput = {
  discountIds?: Maybe<Array<Scalars['Int']>>
}

export type DiscountValidationSummary = {
  __typename?: 'DiscountValidationSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DiscountValidationSummary>
  applicableDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
}

export type DiscountValidationSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Document = {
  __typename?: 'Document'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Document>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  publishSetCode?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  listFQN?: Maybe<Scalars['String']>
  contentLength?: Maybe<Scalars['Int']>
  contentMimeType?: Maybe<Scalars['String']>
  contentUpdateDate?: Maybe<Scalars['DateTime']>
  publishState?: Maybe<Scalars['String']>
  properties?: Maybe<Scalars['Object']>
  insertDate?: Maybe<Scalars['DateTime']>
  updateDate?: Maybe<Scalars['DateTime']>
  activeDateRange?: Maybe<ActiveDateRange>
}

export type Document_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentCollection = {
  __typename?: 'DocumentCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentCollection>
  subPaths?: Maybe<Array<Scalars['String']>>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Document>>>
}

export type DocumentCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentDraftSummary = {
  __typename?: 'DocumentDraftSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentDraftSummary>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  listFQN?: Maybe<Scalars['String']>
  activeUpdateDate?: Maybe<Scalars['DateTime']>
  draftUpdateDate: Scalars['DateTime']
  updatedBy?: Maybe<Scalars['String']>
  activeUpdatedBy?: Maybe<Scalars['String']>
  publishType?: Maybe<Scalars['String']>
  publishSetCode?: Maybe<Scalars['String']>
  masterCatalogId?: Maybe<Scalars['Int']>
  catalogId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
}

export type DocumentDraftSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentDraftSummaryPagedCollection = {
  __typename?: 'DocumentDraftSummaryPagedCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentDraftSummaryPagedCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<DocumentDraftSummary>>>
}

export type DocumentDraftSummaryPagedCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentInput = {
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  publishSetCode?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  listFQN?: Maybe<Scalars['String']>
  contentLength?: Maybe<Scalars['Int']>
  contentMimeType?: Maybe<Scalars['String']>
  contentUpdateDate?: Maybe<Scalars['DateTime']>
  publishState?: Maybe<Scalars['String']>
  properties?: Maybe<Scalars['Object']>
  insertDate?: Maybe<Scalars['DateTime']>
  updateDate?: Maybe<Scalars['DateTime']>
  activeDateRange?: Maybe<ActiveDateRangeInput>
}

export type DocumentInstallation = {
  __typename?: 'DocumentInstallation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentInstallation>
  name?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  properties?: Maybe<Scalars['Object']>
  locale?: Maybe<Scalars['String']>
}

export type DocumentInstallation_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentInstallationInput = {
  name?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  properties?: Maybe<Scalars['Object']>
  locale?: Maybe<Scalars['String']>
}

export type DocumentList = {
  __typename?: 'DocumentList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentList>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  listFQN?: Maybe<Scalars['String']>
  documentTypes?: Maybe<Array<Scalars['String']>>
  supportsPublishing?: Maybe<Scalars['Boolean']>
  enablePublishing?: Maybe<Scalars['Boolean']>
  supportsActiveDateRanges?: Maybe<Scalars['Boolean']>
  enableActiveDateRanges?: Maybe<Scalars['Boolean']>
  views?: Maybe<Array<Maybe<View>>>
  usages?: Maybe<Array<Scalars['String']>>
  security?: Maybe<Scalars['String']>
  scopeId?: Maybe<Scalars['Int']>
  scopeType?: Maybe<Scalars['String']>
  documentListType?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
}

export type DocumentList_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentListCollection = {
  __typename?: 'DocumentListCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentListCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<DocumentList>>>
}

export type DocumentListCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentListInput = {
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  listFQN?: Maybe<Scalars['String']>
  documentTypes?: Maybe<Array<Scalars['String']>>
  supportsPublishing?: Maybe<Scalars['Boolean']>
  enablePublishing?: Maybe<Scalars['Boolean']>
  supportsActiveDateRanges?: Maybe<Scalars['Boolean']>
  enableActiveDateRanges?: Maybe<Scalars['Boolean']>
  views?: Maybe<Array<Maybe<ViewInput>>>
  usages?: Maybe<Array<Scalars['String']>>
  security?: Maybe<Scalars['String']>
  scopeId?: Maybe<Scalars['Int']>
  scopeType?: Maybe<Scalars['String']>
  documentListType?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
}

export type DocumentListType = {
  __typename?: 'DocumentListType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentListType>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  documentListTypeFQN?: Maybe<Scalars['String']>
  scopeType?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  defaultDocuments?: Maybe<Array<Maybe<DocumentInstallation>>>
  documentTypeFQNs?: Maybe<Array<Scalars['String']>>
  supportsPublishing?: Maybe<Scalars['Boolean']>
  enablePublishing?: Maybe<Scalars['Boolean']>
  supportsActiveDateRanges?: Maybe<Scalars['Boolean']>
  enableActiveDateRanges?: Maybe<Scalars['Boolean']>
  views?: Maybe<Array<Maybe<View>>>
  usages?: Maybe<Array<Scalars['String']>>
  metadata?: Maybe<Scalars['Object']>
}

export type DocumentListType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentListTypeCollection = {
  __typename?: 'DocumentListTypeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentListTypeCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<DocumentListType>>>
}

export type DocumentListTypeCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentListTypeInput = {
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  documentListTypeFQN?: Maybe<Scalars['String']>
  scopeType?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  defaultDocuments?: Maybe<Array<Maybe<DocumentInstallationInput>>>
  documentTypeFQNs?: Maybe<Array<Scalars['String']>>
  supportsPublishing?: Maybe<Scalars['Boolean']>
  enablePublishing?: Maybe<Scalars['Boolean']>
  supportsActiveDateRanges?: Maybe<Scalars['Boolean']>
  enableActiveDateRanges?: Maybe<Scalars['Boolean']>
  views?: Maybe<Array<Maybe<ViewInput>>>
  usages?: Maybe<Array<Scalars['String']>>
  metadata?: Maybe<Scalars['Object']>
}

export type DocumentType = {
  __typename?: 'DocumentType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentType>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  adminName?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  properties?: Maybe<Array<Maybe<Property>>>
}

export type DocumentType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentTypeCollection = {
  __typename?: 'DocumentTypeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<DocumentTypeCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<DocumentType>>>
}

export type DocumentTypeCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type DocumentTypeInput = {
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  documentTypeFQN?: Maybe<Scalars['String']>
  adminName?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['Object']>
  properties?: Maybe<Array<Maybe<PropertyInput>>>
}

export type EntityCollection = {
  __typename?: 'EntityCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Scalars['Object']>>
}

export type EntityCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type EntityContainer = {
  __typename?: 'EntityContainer'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityContainer>
  tenantId: Scalars['Int']
  siteId?: Maybe<Scalars['Int']>
  masterCatalogId?: Maybe<Scalars['Int']>
  catalogId?: Maybe<Scalars['Int']>
  localeCode?: Maybe<Scalars['String']>
  listFullName?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  item?: Maybe<Scalars['Object']>
  createBy?: Maybe<Scalars['String']>
  createDate: Scalars['DateTime']
  updateBy?: Maybe<Scalars['String']>
  updateDate: Scalars['DateTime']
}

export type EntityContainer_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type EntityContainerCollection = {
  __typename?: 'EntityContainerCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityContainerCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<EntityContainer>>>
}

export type EntityContainerCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type EntityList = {
  __typename?: 'EntityList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityList>
  tenantId: Scalars['Int']
  nameSpace?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  contextLevel?: Maybe<Scalars['String']>
  useSystemAssignedId?: Maybe<Scalars['Boolean']>
  idProperty?: Maybe<IndexedProperty>
  indexA?: Maybe<IndexedProperty>
  indexB?: Maybe<IndexedProperty>
  indexC?: Maybe<IndexedProperty>
  indexD?: Maybe<IndexedProperty>
  isVisibleInStorefront?: Maybe<Scalars['Boolean']>
  isLocaleSpecific?: Maybe<Scalars['Boolean']>
  isShopperSpecific?: Maybe<Scalars['Boolean']>
  isSandboxDataCloningSupported?: Maybe<Scalars['Boolean']>
  views?: Maybe<Array<Maybe<ListView>>>
  usages?: Maybe<Array<Scalars['String']>>
  metadata?: Maybe<Scalars['Object']>
  createDate: Scalars['DateTime']
  updateDate: Scalars['DateTime']
}

export type EntityList_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type EntityListCollection = {
  __typename?: 'EntityListCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<EntityListCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<EntityList>>>
}

export type EntityListCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type EntityListInput = {
  tenantId: Scalars['Int']
  nameSpace?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  contextLevel?: Maybe<Scalars['String']>
  useSystemAssignedId?: Maybe<Scalars['Boolean']>
  idProperty?: Maybe<IndexedPropertyInput>
  indexA?: Maybe<IndexedPropertyInput>
  indexB?: Maybe<IndexedPropertyInput>
  indexC?: Maybe<IndexedPropertyInput>
  indexD?: Maybe<IndexedPropertyInput>
  isVisibleInStorefront?: Maybe<Scalars['Boolean']>
  isLocaleSpecific?: Maybe<Scalars['Boolean']>
  isShopperSpecific?: Maybe<Scalars['Boolean']>
  isSandboxDataCloningSupported?: Maybe<Scalars['Boolean']>
  views?: Maybe<Array<Maybe<ListViewInput>>>
  usages?: Maybe<Array<Scalars['String']>>
  metadata?: Maybe<Scalars['Object']>
  createDate: Scalars['DateTime']
  updateDate: Scalars['DateTime']
}

export type ExclusionListEntryLocationCodeInput = {
  locationCode: Scalars['String']
  orderItemID: Scalars['Int']
}

export type ExtendedProperty = {
  __typename?: 'ExtendedProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ExtendedProperty>
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ExtendedProperty_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ExtendedPropertyInput = {
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type Facet = {
  __typename?: 'Facet'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Facet>
  label?: Maybe<Scalars['String']>
  facetType?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<FacetValue>>>
}

export type Facet_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type FacetValue = {
  __typename?: 'FacetValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FacetValue>
  label?: Maybe<Scalars['String']>
  isApplied?: Maybe<Scalars['Boolean']>
  count: Scalars['Int']
  value?: Maybe<Scalars['String']>
  filterValue?: Maybe<Scalars['String']>
  rangeQueryValueStart?: Maybe<Scalars['String']>
  rangeQueryValueEnd?: Maybe<Scalars['String']>
  parentFacetValue?: Maybe<Scalars['String']>
  isDisplayed?: Maybe<Scalars['Boolean']>
  childrenFacetValues?: Maybe<Array<Maybe<FacetValue>>>
}

export type FacetValue_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type FulfillmentActionInput = {
  actionName?: Maybe<Scalars['String']>
  packageIds?: Maybe<Array<Scalars['String']>>
  pickupIds?: Maybe<Array<Scalars['String']>>
  digitalPackageIds?: Maybe<Array<Scalars['String']>>
}

export type FulfillmentField = {
  __typename?: 'FulfillmentField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FulfillmentField>
  name?: Maybe<Scalars['String']>
  userEnteredValue?: Maybe<Scalars['Object']>
  required?: Maybe<Scalars['Boolean']>
}

export type FulfillmentField_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type FulfillmentFieldInput = {
  name?: Maybe<Scalars['String']>
  userEnteredValue?: Maybe<Scalars['Object']>
  required?: Maybe<Scalars['Boolean']>
}

export type FulfillmentInfo = {
  __typename?: 'FulfillmentInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FulfillmentInfo>
  fulfillmentContact?: Maybe<Contact>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
}

export type FulfillmentInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type FulfillmentInfoInput = {
  fulfillmentContact?: Maybe<ContactInput>
  isDestinationCommercial?: Maybe<Scalars['Boolean']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type FulfillmentShopperNotes = {
  __typename?: 'FulfillmentShopperNotes'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FulfillmentShopperNotes>
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
  giftMessage?: Maybe<Scalars['String']>
}

export type FulfillmentShopperNotes_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type FulfillmentShopperNotesInput = {
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
  giftMessage?: Maybe<Scalars['String']>
}

export type FulfillmentTask = {
  __typename?: 'FulfillmentTask'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<FulfillmentTask>
  links?: Maybe<Scalars['Object']>
  active?: Maybe<Scalars['Boolean']>
  attributes?: Maybe<Scalars['Object']>
  completed?: Maybe<Scalars['Boolean']>
  completedDate?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  inputs?: Maybe<Array<Maybe<TaskInput>>>
  name?: Maybe<Scalars['String']>
  skippable?: Maybe<Scalars['Boolean']>
  subject?: Maybe<Scalars['String']>
  taskId?: Maybe<Scalars['String']>
}

export type FulfillmentTask_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type FulfillmentTaskInput = {
  links?: Maybe<Scalars['Object']>
  active?: Maybe<Scalars['Boolean']>
  attributes?: Maybe<Scalars['Object']>
  completed?: Maybe<Scalars['Boolean']>
  completedDate?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  inputs?: Maybe<Array<Maybe<TaskInputInput>>>
  name?: Maybe<Scalars['String']>
  skippable?: Maybe<Scalars['Boolean']>
  subject?: Maybe<Scalars['String']>
  taskId?: Maybe<Scalars['String']>
}

export type GatewayGiftCard = {
  __typename?: 'GatewayGiftCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<GatewayGiftCard>
  cardNumber?: Maybe<Scalars['String']>
  amount: Scalars['Float']
  currencyCode?: Maybe<Scalars['String']>
}

export type GatewayGiftCard_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type GatewayGiftCardInput = {
  cardNumber?: Maybe<Scalars['String']>
  amount: Scalars['Float']
  currencyCode?: Maybe<Scalars['String']>
}

export type GiftCard = {
  __typename?: 'GiftCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<GiftCard>
  activationDate?: Maybe<Scalars['DateTime']>
  cardNumber?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  creditType?: Maybe<Scalars['String']>
  creditValue?: Maybe<Scalars['Float']>
  currencyCode?: Maybe<Scalars['String']>
  currentBalance?: Maybe<Scalars['Float']>
  customerId?: Maybe<Scalars['Int']>
  expirationDate?: Maybe<Scalars['DateTime']>
  initialBalance?: Maybe<Scalars['Float']>
}

export type GiftCard_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type GiftCardInput = {
  activationDate?: Maybe<Scalars['DateTime']>
  cardNumber?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  creditType?: Maybe<Scalars['String']>
  creditValue?: Maybe<Scalars['Float']>
  currencyCode?: Maybe<Scalars['String']>
  currentBalance?: Maybe<Scalars['Float']>
  customerId?: Maybe<Scalars['Int']>
  expirationDate?: Maybe<Scalars['DateTime']>
  initialBalance?: Maybe<Scalars['Float']>
}

export type Hours = {
  __typename?: 'Hours'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Hours>
  label?: Maybe<Scalars['String']>
  openTime?: Maybe<Scalars['String']>
  closeTime?: Maybe<Scalars['String']>
  isClosed?: Maybe<Scalars['Boolean']>
}

export type Hours_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type HoursInput = {
  label?: Maybe<Scalars['String']>
  openTime?: Maybe<Scalars['String']>
  closeTime?: Maybe<Scalars['String']>
  isClosed?: Maybe<Scalars['Boolean']>
}

export type InStockNotificationSubscription = {
  __typename?: 'InStockNotificationSubscription'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<InStockNotificationSubscription>
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  customerId?: Maybe<Scalars['Int']>
  productCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
}

export type InStockNotificationSubscription_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type InStockNotificationSubscriptionCollection = {
  __typename?: 'InStockNotificationSubscriptionCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<InStockNotificationSubscriptionCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<InStockNotificationSubscription>>>
}

export type InStockNotificationSubscriptionCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type InStockNotificationSubscriptionInput = {
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  customerId?: Maybe<Scalars['Int']>
  productCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfoInput>
}

export type IndexedProperty = {
  __typename?: 'IndexedProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<IndexedProperty>
  propertyName?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
}

export type IndexedProperty_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type IndexedPropertyInput = {
  propertyName?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
}

export type InvalidCoupon = {
  __typename?: 'InvalidCoupon'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<InvalidCoupon>
  couponCode?: Maybe<Scalars['String']>
  reasonCode: Scalars['Int']
  reason?: Maybe<Scalars['String']>
  createDate: Scalars['DateTime']
  discountId: Scalars['Int']
}

export type InvalidCoupon_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type InvalidCouponInput = {
  couponCode?: Maybe<Scalars['String']>
  reasonCode: Scalars['Int']
  reason?: Maybe<Scalars['String']>
  createDate: Scalars['DateTime']
  discountId: Scalars['Int']
}

export enum InventoryRequestTypeEnum {
  All = 'ALL',
  Partial = 'PARTIAL',
  Any = 'ANY',
  AllStores = 'ALL_STORES',
}

export type ItemsForDestinationInput = {
  destinationId?: Maybe<Scalars['String']>
  itemIds?: Maybe<Array<Scalars['String']>>
}

export type JsonNode = {
  __typename?: 'JsonNode'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<JsonNode>
  array?: Maybe<Scalars['Boolean']>
  bigDecimal?: Maybe<Scalars['Boolean']>
  bigInteger?: Maybe<Scalars['Boolean']>
  binary?: Maybe<Scalars['Boolean']>
  boolean?: Maybe<Scalars['Boolean']>
  containerNode?: Maybe<Scalars['Boolean']>
  double?: Maybe<Scalars['Boolean']>
  float?: Maybe<Scalars['Boolean']>
  floatingPointNumber?: Maybe<Scalars['Boolean']>
  int?: Maybe<Scalars['Boolean']>
  integralNumber?: Maybe<Scalars['Boolean']>
  long?: Maybe<Scalars['Boolean']>
  missingNode?: Maybe<Scalars['Boolean']>
  nodeType?: Maybe<NodeTypeEnum>
  null?: Maybe<Scalars['Boolean']>
  number?: Maybe<Scalars['Boolean']>
  object?: Maybe<Scalars['Boolean']>
  pojo?: Maybe<Scalars['Boolean']>
  short?: Maybe<Scalars['Boolean']>
  textual?: Maybe<Scalars['Boolean']>
  valueNode?: Maybe<Scalars['Boolean']>
}

export type JsonNode_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type KeyValuePair2Input = {
  key?: Maybe<Scalars['String']>
  value?: Maybe<Array<Scalars['String']>>
}

export type ListView = {
  __typename?: 'ListView'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ListView>
  name?: Maybe<Scalars['String']>
  usages?: Maybe<Array<Scalars['String']>>
  metaData?: Maybe<Scalars['Object']>
  security?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  defaultSort?: Maybe<Scalars['String']>
  fields?: Maybe<Array<Maybe<ListViewField>>>
}

export type ListView_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ListViewCollection = {
  __typename?: 'ListViewCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ListViewCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<ListView>>>
}

export type ListViewCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ListViewField = {
  __typename?: 'ListViewField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ListViewField>
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
}

export type ListViewField_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ListViewFieldInput = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
}

export type ListViewInput = {
  name?: Maybe<Scalars['String']>
  usages?: Maybe<Array<Scalars['String']>>
  metaData?: Maybe<Scalars['Object']>
  security?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  defaultSort?: Maybe<Scalars['String']>
  fields?: Maybe<Array<Maybe<ListViewFieldInput>>>
}

export type LoAddress = {
  __typename?: 'LoAddress'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAddress>
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
  postalOrZipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
}

export type LoAddress_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAddressInput = {
  address1?: Maybe<Scalars['String']>
  address2?: Maybe<Scalars['String']>
  address3?: Maybe<Scalars['String']>
  address4?: Maybe<Scalars['String']>
  cityOrTown?: Maybe<Scalars['String']>
  stateOrProvince?: Maybe<Scalars['String']>
  postalOrZipCode?: Maybe<Scalars['String']>
  countryCode?: Maybe<Scalars['String']>
  addressType?: Maybe<Scalars['String']>
  isValidated?: Maybe<Scalars['Boolean']>
}

export type LoAttribute = {
  __typename?: 'LoAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttribute>
  id?: Maybe<Scalars['Int']>
  adminName?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  attributeCode: Scalars['String']
  inputType?: Maybe<Scalars['String']>
  valueType: Scalars['String']
  dataType?: Maybe<Scalars['String']>
  attributeMetadata?: Maybe<Array<Maybe<LoAttributeMetadataItem>>>
  attributeFQN?: Maybe<Scalars['String']>
  content?: Maybe<LoAttributeLocalizedContent>
  validation?: Maybe<LoAttributeValidation>
  vocabularyValues?: Maybe<Array<Maybe<LoAttributeVocabularyValue>>>
  auditInfo?: Maybe<LoAuditInfo>
  isActive?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  isReadOnly?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  isVisible?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  displayGroup: Scalars['String']
}

export type LoAttribute_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAttributeCollection = {
  __typename?: 'LoAttributeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<LoAttribute>>>
}

export type LoAttributeCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAttributeInput = {
  id?: Maybe<Scalars['Int']>
  adminName?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  attributeCode: Scalars['String']
  inputType?: Maybe<Scalars['String']>
  valueType: Scalars['String']
  dataType?: Maybe<Scalars['String']>
  attributeMetadata?: Maybe<Array<Maybe<LoAttributeMetadataItemInput>>>
  attributeFQN?: Maybe<Scalars['String']>
  content?: Maybe<LoAttributeLocalizedContentInput>
  validation?: Maybe<LoAttributeValidationInput>
  vocabularyValues?: Maybe<Array<Maybe<LoAttributeVocabularyValueInput>>>
  auditInfo?: Maybe<LoAuditInfoInput>
  isActive?: Maybe<Scalars['Boolean']>
  isRequired?: Maybe<Scalars['Boolean']>
  isReadOnly?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  isVisible?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  displayGroup: Scalars['String']
}

export type LoAttributeLocalizedContent = {
  __typename?: 'LoAttributeLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeLocalizedContent>
  localeCode?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type LoAttributeLocalizedContent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAttributeLocalizedContentInput = {
  localeCode?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type LoAttributeMetadataItem = {
  __typename?: 'LoAttributeMetadataItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeMetadataItem>
  key: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeMetadataItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAttributeMetadataItemInput = {
  key: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeValidation = {
  __typename?: 'LoAttributeValidation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeValidation>
  regularExpression?: Maybe<Scalars['String']>
  minStringLength?: Maybe<Scalars['Int']>
  maxStringLength?: Maybe<Scalars['Int']>
  minNumericValue?: Maybe<Scalars['Float']>
  maxNumericValue?: Maybe<Scalars['Float']>
  minDateTime?: Maybe<Scalars['DateTime']>
  maxDateTime?: Maybe<Scalars['DateTime']>
}

export type LoAttributeValidation_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAttributeValidationInput = {
  regularExpression?: Maybe<Scalars['String']>
  minStringLength?: Maybe<Scalars['Int']>
  maxStringLength?: Maybe<Scalars['Int']>
  minNumericValue?: Maybe<Scalars['Float']>
  maxNumericValue?: Maybe<Scalars['Float']>
  minDateTime?: Maybe<Scalars['DateTime']>
  maxDateTime?: Maybe<Scalars['DateTime']>
}

export type LoAttributeValueLocalizedContent = {
  __typename?: 'LoAttributeValueLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeValueLocalizedContent>
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeValueLocalizedContent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAttributeValueLocalizedContentInput = {
  localeCode: Scalars['String']
  value: Scalars['String']
}

export type LoAttributeVocabularyValue = {
  __typename?: 'LoAttributeVocabularyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAttributeVocabularyValue>
  value: Scalars['String']
  sequence?: Maybe<Scalars['Int']>
  isHidden?: Maybe<Scalars['Boolean']>
  content?: Maybe<LoAttributeValueLocalizedContent>
}

export type LoAttributeVocabularyValue_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAttributeVocabularyValueInput = {
  value: Scalars['String']
  sequence?: Maybe<Scalars['Int']>
  isHidden?: Maybe<Scalars['Boolean']>
  content?: Maybe<LoAttributeValueLocalizedContentInput>
}

export type LoAuditInfo = {
  __typename?: 'LoAuditInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoAuditInfo>
  updateDate?: Maybe<Scalars['DateTime']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  createBy?: Maybe<Scalars['String']>
}

export type LoAuditInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoAuditInfoInput = {
  updateDate?: Maybe<Scalars['DateTime']>
  createDate?: Maybe<Scalars['DateTime']>
  updateBy?: Maybe<Scalars['String']>
  createBy?: Maybe<Scalars['String']>
}

export type LoFulfillmentType = {
  __typename?: 'LoFulfillmentType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoFulfillmentType>
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type LoFulfillmentType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LoFulfillmentTypeInput = {
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type Location = {
  __typename?: 'Location'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Location>
  code?: Maybe<Scalars['String']>
  locationTypes?: Maybe<Array<Maybe<LocationType>>>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  address?: Maybe<LoAddress>
  geo?: Maybe<Coordinates>
  phone?: Maybe<Scalars['String']>
  fax?: Maybe<Scalars['String']>
  supportsInventory?: Maybe<Scalars['Boolean']>
  fulfillmentTypes?: Maybe<Array<Maybe<LoFulfillmentType>>>
  regularHours?: Maybe<RegularHours>
  shippingOriginContact?: Maybe<ShippingOriginContact>
  note?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Scalars['String']>>
  attributes?: Maybe<Array<Maybe<LocationAttribute>>>
  auditInfo?: Maybe<LoAuditInfo>
  allowFulfillmentWithNoStock?: Maybe<Scalars['Boolean']>
  isDisabled?: Maybe<Scalars['Boolean']>
  express?: Maybe<Scalars['Boolean']>
  transferEnabled?: Maybe<Scalars['Boolean']>
  includeInInventoryAggregrate?: Maybe<Scalars['Boolean']>
  includeInLocationExport?: Maybe<Scalars['Boolean']>
  warehouseEnabled?: Maybe<Scalars['Boolean']>
  requiresManifest?: Maybe<Scalars['Boolean']>
}

export type Location_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationAttribute = {
  __typename?: 'LocationAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationAttribute>
  attributeDefinition?: Maybe<LoAttribute>
  auditInfo?: Maybe<LoAuditInfo>
  fullyQualifiedName?: Maybe<Scalars['String']>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type LocationAttribute_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationAttributeInput = {
  attributeDefinition?: Maybe<LoAttributeInput>
  auditInfo?: Maybe<LoAuditInfoInput>
  fullyQualifiedName?: Maybe<Scalars['String']>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type LocationCollection = {
  __typename?: 'LocationCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Location>>>
}

export type LocationCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationGroup = {
  __typename?: 'LocationGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationGroup>
  locationGroupId: Scalars['Int']
  locationGroupCode?: Maybe<Scalars['String']>
  siteIds?: Maybe<Array<Scalars['Int']>>
  name?: Maybe<Scalars['String']>
  locationCodes?: Maybe<Array<Scalars['String']>>
  auditInfo?: Maybe<LoAuditInfo>
}

export type LocationGroup_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationGroupCollection = {
  __typename?: 'LocationGroupCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationGroupCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<LocationGroup>>>
}

export type LocationGroupCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationGroupConfiguration = {
  __typename?: 'LocationGroupConfiguration'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationGroupConfiguration>
  tenantId: Scalars['Int']
  siteId: Scalars['Int']
  locationGroupId: Scalars['Int']
  locationGroupCode?: Maybe<Scalars['String']>
  customerFailedToPickupAfterAction?: Maybe<Scalars['String']>
  customerFailedToPickupDeadline?: Maybe<Scalars['Int']>
  sendCustomerPickupReminder?: Maybe<Scalars['Int']>
  enableForSTH?: Maybe<Scalars['Boolean']>
  enableForISPU?: Maybe<Scalars['Boolean']>
  enableAdvancedOptionForPickWaveCreation?: Maybe<Scalars['Boolean']>
  maximumNumberOfOrdersInPickWave?: Maybe<Scalars['Int']>
  defaultNumberOfOrdersInPickWave?: Maybe<Scalars['Int']>
  pickWavePrintFormat?: Maybe<Scalars['String']>
  closePickWavePermissions?: Maybe<Array<Scalars['String']>>
  wmsEnabled?: Maybe<Scalars['Boolean']>
  enableScanningOfUpcForShipToHome?: Maybe<Scalars['Boolean']>
  allowReturns?: Maybe<Scalars['Boolean']>
  returnRefundReduction?: Maybe<Scalars['Boolean']>
  defaultReturnRefundReductionAmount?: Maybe<Scalars['Int']>
  maximumReturnRefundReductionAmount?: Maybe<Scalars['Int']>
  defaultCarrier?: Maybe<Scalars['String']>
  carriers?: Maybe<Array<Maybe<Carrier>>>
  printReturnLabel?: Maybe<Scalars['Boolean']>
  defaultPrinterType?: Maybe<Scalars['String']>
  boxTypes?: Maybe<Array<Maybe<BoxType>>>
  attributes?: Maybe<Array<Maybe<LocationAttribute>>>
  bpmConfigurations?: Maybe<Array<Maybe<BpmConfiguration>>>
  auditInfo?: Maybe<LoAuditInfo>
  autoPackingListPopup?: Maybe<Scalars['Boolean']>
  blockPartialStock?: Maybe<Scalars['Boolean']>
  defaultMaxNumberOfShipmentsInPickWave?: Maybe<Scalars['Int']>
  displayProductImagesInPickWaveDetails?: Maybe<Scalars['Boolean']>
  enablePnpForSTH?: Maybe<Scalars['Boolean']>
  enablePnpForBOPIS?: Maybe<Scalars['Boolean']>
  blockPartialCancel?: Maybe<Scalars['Boolean']>
  packageSettings?: Maybe<PackageSettings>
}

export type LocationGroupConfiguration_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationGroupInput = {
  locationGroupId: Scalars['Int']
  locationGroupCode?: Maybe<Scalars['String']>
  siteIds?: Maybe<Array<Scalars['Int']>>
  name?: Maybe<Scalars['String']>
  locationCodes?: Maybe<Array<Scalars['String']>>
  auditInfo?: Maybe<LoAuditInfoInput>
}

export type LocationInput = {
  code?: Maybe<Scalars['String']>
  locationTypes?: Maybe<Array<Maybe<LocationTypeInput>>>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  address?: Maybe<LoAddressInput>
  geo?: Maybe<CoordinatesInput>
  phone?: Maybe<Scalars['String']>
  fax?: Maybe<Scalars['String']>
  supportsInventory?: Maybe<Scalars['Boolean']>
  fulfillmentTypes?: Maybe<Array<Maybe<LoFulfillmentTypeInput>>>
  regularHours?: Maybe<RegularHoursInput>
  shippingOriginContact?: Maybe<ShippingOriginContactInput>
  note?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Scalars['String']>>
  attributes?: Maybe<Array<Maybe<LocationAttributeInput>>>
  auditInfo?: Maybe<LoAuditInfoInput>
  allowFulfillmentWithNoStock?: Maybe<Scalars['Boolean']>
  isDisabled?: Maybe<Scalars['Boolean']>
  express?: Maybe<Scalars['Boolean']>
  transferEnabled?: Maybe<Scalars['Boolean']>
  includeInInventoryAggregrate?: Maybe<Scalars['Boolean']>
  includeInLocationExport?: Maybe<Scalars['Boolean']>
  warehouseEnabled?: Maybe<Scalars['Boolean']>
  requiresManifest?: Maybe<Scalars['Boolean']>
}

export type LocationInventory = {
  __typename?: 'LocationInventory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationInventory>
  productCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
  stockAvailable?: Maybe<Scalars['Int']>
  softStockAvailable?: Maybe<Scalars['Int']>
  sku?: Maybe<Scalars['String']>
  mfgPartNumber?: Maybe<Scalars['String']>
}

export type LocationInventory_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationInventoryCollection = {
  __typename?: 'LocationInventoryCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationInventoryCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<LocationInventory>>>
}

export type LocationInventoryCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationInventoryQueryInput = {
  locationCodes?: Maybe<Array<Scalars['String']>>
  productCodes?: Maybe<Array<Scalars['String']>>
}

export type LocationType = {
  __typename?: 'LocationType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationType>
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  auditInfo?: Maybe<LoAuditInfo>
}

export type LocationType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationTypeInput = {
  code?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  auditInfo?: Maybe<LoAuditInfoInput>
}

export type LocationUsage = {
  __typename?: 'LocationUsage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationUsage>
  locationUsageTypeCode?: Maybe<Scalars['String']>
  locationTypeCodes?: Maybe<Array<Scalars['String']>>
  locationCodes?: Maybe<Array<Scalars['String']>>
  auditInfo?: Maybe<LoAuditInfo>
}

export type LocationUsage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationUsageCollection = {
  __typename?: 'LocationUsageCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LocationUsageCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<LocationUsage>>>
}

export type LocationUsageCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type LocationUsageInput = {
  locationUsageTypeCode?: Maybe<Scalars['String']>
  locationTypeCodes?: Maybe<Array<Scalars['String']>>
  locationCodes?: Maybe<Array<Scalars['String']>>
  auditInfo?: Maybe<LoAuditInfoInput>
}

export type LoginState = {
  __typename?: 'LoginState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<LoginState>
  isPasswordChangeRequired?: Maybe<Scalars['Boolean']>
  lastPasswordChangeOn?: Maybe<Scalars['DateTime']>
  isLocked?: Maybe<Scalars['Boolean']>
  lastLockedOn?: Maybe<Scalars['DateTime']>
  failedLoginAttemptCount: Scalars['Int']
  remainingLoginAttempts: Scalars['Int']
  firstFailedLoginAttemptOn?: Maybe<Scalars['DateTime']>
  lastLoginOn?: Maybe<Scalars['DateTime']>
  createdOn?: Maybe<Scalars['DateTime']>
  updatedOn?: Maybe<Scalars['DateTime']>
}

export type LoginState_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type MzdbHttpContentInput = {
  headers?: Maybe<Array<Maybe<MzdbStringStringIEnumerableKeyValuePairInput>>>
}

export type MzdbHttpMethodInput = {
  method?: Maybe<Scalars['String']>
}

export type MzdbHttpRequestMessageInput = {
  version?: Maybe<Scalars['String']>
  content?: Maybe<MzdbHttpContentInput>
  method?: Maybe<MzdbHttpMethodInput>
  requestUri?: Maybe<Scalars['DateTime']>
  headers?: Maybe<Array<Maybe<MzdbStringStringIEnumerableKeyValuePairInput>>>
  properties?: Maybe<Scalars['Object']>
}

export type MzdbStringStringIEnumerableKeyValuePairInput = {
  key?: Maybe<Scalars['String']>
  value?: Maybe<Array<Scalars['String']>>
}

export type Mutation = {
  __typename?: 'Mutation'
  createCustomerAccountAttributeDefinition?: Maybe<CuAttribute>
  updateCustomerAccountAttributeDefinition?: Maybe<CuAttribute>
  validateCustomerAddress?: Maybe<AddressValidationResponse>
  validateAddress?: Maybe<Array<Maybe<CuAddress>>>
  createCustomerAuthTicket?: Maybe<CustomerAuthTicket>
  refreshCustomerAuthTickets?: Maybe<CustomerAuthTicket>
  createCustomerB2bAccountAttribute?: Maybe<CustomerAttribute>
  deleteB2bAccountAttribute?: Maybe<Scalars['Boolean']>
  updateCustomerB2bAccountAttribute?: Maybe<CustomerAttribute>
  createCustomerB2bAccount?: Maybe<B2BAccount>
  updateCustomerB2bAccount?: Maybe<B2BAccount>
  createCustomerB2bAccountUser?: Maybe<B2BUser>
  updateCustomerB2bAccountUser?: Maybe<B2BUser>
  removeCustomerB2bAccountUser?: Maybe<Scalars['Boolean']>
  addRoleToCustomerB2bAccount?: Maybe<Scalars['Boolean']>
  deleteB2bAccountRole?: Maybe<Scalars['Boolean']>
  createCustomerCredit?: Maybe<Credit>
  updateCustomerCredit?: Maybe<Credit>
  deleteCustomerCredit?: Maybe<Scalars['Boolean']>
  updateCustomerCreditAssociateToShopper?: Maybe<Credit>
  resendCustomerCreditEmail?: Maybe<Scalars['Boolean']>
  createCustomerCreditTransaction?: Maybe<CreditTransaction>
  createCustomerAccountAttribute?: Maybe<CustomerAttribute>
  deleteCustomerAccountAttribute?: Maybe<Scalars['Boolean']>
  updateCustomerAccountAttribute?: Maybe<CustomerAttribute>
  createCustomerAccountCard?: Maybe<Card>
  updateCustomerAccountCard?: Maybe<Card>
  deleteCustomerAccountCard?: Maybe<Scalars['Boolean']>
  createCustomerAccountContact?: Maybe<CustomerContact>
  updateCustomerAccountContacts?: Maybe<CustomerContactCollection>
  updateCustomerAccountContact?: Maybe<CustomerContact>
  deleteCustomerAccountContact?: Maybe<Scalars['Boolean']>
  createCustomerAccount?: Maybe<CustomerAccount>
  updateCustomerAccount?: Maybe<CustomerAccount>
  deleteCustomerAccount?: Maybe<Scalars['Boolean']>
  createCustomerAccountTransaction?: Maybe<Transaction>
  deleteCustomerAccountTransaction?: Maybe<Scalars['Boolean']>
  recomputeCustomerAccountLifetimeValue?: Maybe<Scalars['Boolean']>
  createCustomerAccountNote?: Maybe<CustomerNote>
  updateCustomerAccountNote?: Maybe<CustomerNote>
  deleteCustomerAccountNote?: Maybe<Scalars['Boolean']>
  createCustomerAccountPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  updateCustomerPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  createCustomerAccountPurchaseOrderAccountTransaction?: Maybe<PurchaseOrderTransaction>
  createPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccountCollection>
  changeCustomerAccountPassword?: Maybe<Scalars['Boolean']>
  updateCustomerAccountPasswords?: Maybe<ChangePasswordResultCollection>
  resetCustomerAccountPassword?: Maybe<Scalars['Boolean']>
  createCustomerAccountLogin?: Maybe<CustomerAuthTicket>
  createCustomerAccountAndLogin?: Maybe<CustomerAuthTicket>
  setCustomerAccountLoginLocked?: Maybe<Scalars['Boolean']>
  setCustomerAccountPasswordChangeRequired?: Maybe<Scalars['Boolean']>
  createCustomerAccounts?: Maybe<CustomerAccountCollection>
  createCustomerSegment?: Maybe<CustomerSegment>
  updateCustomerSegment?: Maybe<CustomerSegment>
  deleteCustomerSegment?: Maybe<Scalars['Boolean']>
  createCustomerSegmentAccount?: Maybe<Scalars['Boolean']>
  deleteCustomerSegmentAccount?: Maybe<Scalars['Boolean']>
  createInStockNotification?: Maybe<InStockNotificationSubscription>
  deleteInStockNotification?: Maybe<Scalars['Boolean']>
  createResolvedPriceList?: Maybe<ResolvedPriceList>
  configureProduct?: Maybe<ConfiguredProduct>
  validateProduct?: Maybe<ProductValidationSummary>
  validateProductDiscounts?: Maybe<DiscountValidationSummary>
  manageLocationProductInventory?: Maybe<LocationInventoryCollection>
  createProductCost?: Maybe<ProductCostCollection>
  createCartForUser?: Maybe<Cart>
  updateUserCart?: Maybe<Cart>
  updateCurrentCart?: Maybe<Cart>
  deleteCurrentCart?: Maybe<Scalars['Boolean']>
  updateCart?: Maybe<Cart>
  deleteCart?: Maybe<Scalars['Boolean']>
  deleteUserCart?: Maybe<Scalars['Boolean']>
  rejectCartDiscount?: Maybe<Cart>
  updateCartCoupon?: Maybe<Cart>
  deleteCartCoupons?: Maybe<Cart>
  deleteCartCoupon?: Maybe<Cart>
  addExtendedPropertyToCurrentCart?: Maybe<Array<Maybe<ExtendedProperty>>>
  updateCurrentCartExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  deleteCurrentCartExtendedProperties?: Maybe<Scalars['Boolean']>
  updateCurrentCartExtendedProperty?: Maybe<ExtendedProperty>
  deleteCurrentCartExtendedProperty?: Maybe<Scalars['Boolean']>
  deleteCurrentCartItems?: Maybe<Cart>
  addItemToCurrentCart?: Maybe<CartItem>
  deleteCartItems?: Maybe<Cart>
  addItemToCart?: Maybe<CartItem>
  updateCurrentCartItem?: Maybe<CartItem>
  deleteCurrentCartItem?: Maybe<Scalars['Boolean']>
  updateCartItem?: Maybe<CartItem>
  deleteCartItem?: Maybe<Scalars['Boolean']>
  addItemsToCurrentCart?: Maybe<Scalars['Boolean']>
  addItemsToCart?: Maybe<Scalars['Boolean']>
  updateCurrentCartItemQuantity?: Maybe<CartItem>
  updateCartItemQuantity?: Maybe<CartItem>
  deleteCurrentCartMessages?: Maybe<Scalars['Boolean']>
  deleteCurrentCartMessage?: Maybe<Scalars['Boolean']>
  createCommerceChannel?: Maybe<Channel>
  updateChannel?: Maybe<Channel>
  deleteCommerceChannel?: Maybe<Scalars['Boolean']>
  createCommerceChannelGroup?: Maybe<ChannelGroup>
  updateChannelGroup?: Maybe<ChannelGroup>
  deleteCommerceChannelGroup?: Maybe<Scalars['Boolean']>
  createCheckoutAttribute?: Maybe<Array<Maybe<OrderAttribute>>>
  updateCheckoutAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  updateCheckout?: Maybe<Checkout>
  createCheckout?: Maybe<Checkout>
  createCheckoutShippingMethod?: Maybe<Checkout>
  createCheckoutAction?: Maybe<Checkout>
  updateCheckoutDigitalWalletType?: Maybe<Checkout>
  updateCheckoutPriceList?: Maybe<Checkout>
  resendCheckoutEmail?: Maybe<Scalars['Boolean']>
  updateCheckoutCoupon?: Maybe<Checkout>
  deleteCheckoutCoupons?: Maybe<Checkout>
  deleteCheckoutCoupon?: Maybe<Checkout>
  updateCheckoutDestination?: Maybe<Destination>
  deleteCheckoutDestination?: Maybe<Scalars['Boolean']>
  createCheckoutDestination?: Maybe<Destination>
  createCheckoutItem?: Maybe<Checkout>
  deleteCheckoutItem?: Maybe<Checkout>
  updateCheckoutItemDestination?: Maybe<Checkout>
  createCheckoutItemDestination?: Maybe<Checkout>
  createCheckoutPaymentAction?: Maybe<Checkout>
  updateCheckoutPaymentAction?: Maybe<Checkout>
  createOrderPaymentAction?: Maybe<Order>
  createOrderPaymentPaymentAction?: Maybe<Order>
  createOrderAutoCapture?: Maybe<Order>
  createOrderPickup?: Maybe<Pickup>
  updateOrderPickup?: Maybe<Pickup>
  deleteOrderPickup?: Maybe<Scalars['Boolean']>
  createOrderRefund?: Maybe<Refund>
  updateOrderRefund?: Maybe<Scalars['Boolean']>
  createOrderShipment?: Maybe<Array<Maybe<PackageObj>>>
  deleteOrderShipment?: Maybe<Scalars['Boolean']>
  repriceOrderShipment?: Maybe<Shipment>
  createOrderShipmentAdjustment?: Maybe<Shipment>
  createOrderShipmentItemAdjustment?: Maybe<Shipment>
  splitOrderShipment?: Maybe<Array<Maybe<Shipment>>>
  updateOrderValidationResults?: Maybe<OrderValidationResult>
  updateOrderAdjustment?: Maybe<Order>
  deleteOrderAdjustment?: Maybe<Order>
  updateOrderShippingAdjustment?: Maybe<Order>
  deleteOrderAdjustmentShipping?: Maybe<Order>
  updateOrderHandlingAdjustment?: Maybe<Order>
  deleteOrderAdjustmentHandling?: Maybe<Order>
  createOrderAttribute?: Maybe<Array<Maybe<OrderAttribute>>>
  updateOrderAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  updateOrderBillingInfo?: Maybe<BillingInfo>
  cancelOrder?: Maybe<Order>
  createOrder?: Maybe<Order>
  updateUserOrder?: Maybe<Order>
  updateOrderPriceList?: Maybe<Order>
  resendOrderEmail?: Maybe<Scalars['Boolean']>
  updateOrder?: Maybe<Order>
  updateOrderDigitalWalletTpe?: Maybe<Order>
  updateOrderDraft?: Maybe<Scalars['Boolean']>
  createOrderAction?: Maybe<Order>
  updateOrderDiscount?: Maybe<Order>
  updateOrderPrice?: Maybe<Order>
  updateOrderCoupon?: Maybe<Order>
  deleteOrderCoupons?: Maybe<Order>
  deleteOrderCoupon?: Maybe<Order>
  createOrderDigitalPackage?: Maybe<DigitalPackage>
  updateOrderDigitalPackage?: Maybe<DigitalPackage>
  deleteOrderDigitalPackage?: Maybe<Scalars['Boolean']>
  createOrderExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  updateOrderExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  deleteOrderExtendedProperties?: Maybe<Scalars['Boolean']>
  updateOrderExtendedProperty?: Maybe<ExtendedProperty>
  deleteOrderExtendedProperty?: Maybe<Scalars['Boolean']>
  createOrderFulfillmentAction?: Maybe<Order>
  resendOrderFulfillmentEmail?: Maybe<Order>
  updateOrderFulfillmentInfo?: Maybe<FulfillmentInfo>
  createOrderItem?: Maybe<Order>
  deleteOrderItem?: Maybe<Order>
  updateOrderItemPrice?: Maybe<Order>
  updateOrderItemQuantity?: Maybe<Order>
  updateOrderItemDutyAmount?: Maybe<Order>
  updateOrderItemFulfillment?: Maybe<Order>
  updateOrderItemDiscount?: Maybe<Order>
  createOrderNote?: Maybe<OrderNote>
  updateOrderNotes?: Maybe<OrderNote>
  deleteOrderNote?: Maybe<Scalars['Boolean']>
  createOrderPackage?: Maybe<PackageObj>
  updateOrderPackage?: Maybe<PackageObj>
  deleteOrderPackage?: Maybe<Scalars['Boolean']>
  validateOrder?: Maybe<OrderValidationResult>
  updateQuote?: Maybe<Quote>
  deleteQuote?: Maybe<Scalars['Boolean']>
  createQuote?: Maybe<Quote>
  createQuoteItem?: Maybe<Quote>
  deleteQuoteItem?: Maybe<Scalars['Boolean']>
  createReturn?: Maybe<ReturnObj>
  resendReturnEmail?: Maybe<Scalars['Boolean']>
  updateReturn?: Maybe<ReturnObj>
  deleteReturn?: Maybe<Scalars['Boolean']>
  createReturnAction?: Maybe<ReturnCollection>
  setReturnShip?: Maybe<Order>
  createReturnPaymentAction?: Maybe<ReturnObj>
  createReturnPaymentPaymentAction?: Maybe<ReturnObj>
  setReturnRestock?: Maybe<ReturnObj>
  createReturnItem?: Maybe<ReturnObj>
  deleteReturnItem?: Maybe<ReturnObj>
  createReturnNote?: Maybe<OrderNote>
  updateReturnNote?: Maybe<OrderNote>
  deleteReturnNote?: Maybe<Scalars['Boolean']>
  createReturnPackage?: Maybe<PackageObj>
  updateReturnPackage?: Maybe<PackageObj>
  deleteReturnPackage?: Maybe<Scalars['Boolean']>
  createReturnShipment?: Maybe<Array<Maybe<PackageObj>>>
  deleteReturnShipment?: Maybe<Scalars['Boolean']>
  createWishlist?: Maybe<Wishlist>
  updateWishlist?: Maybe<Wishlist>
  deleteWishlist?: Maybe<Scalars['Boolean']>
  deleteWishlistItems?: Maybe<Wishlist>
  createWishlistItem?: Maybe<WishlistItem>
  updateWishlistItem?: Maybe<WishlistItem>
  deleteWishlistItem?: Maybe<Scalars['Boolean']>
  updateWishlistItemQuantity?: Maybe<WishlistItem>
  updateDocumentListDocumentContent?: Maybe<Scalars['Boolean']>
  deleteDocumentListDocumentContent?: Maybe<Scalars['Boolean']>
  updateDocumentListDocumentTreeContent?: Maybe<Scalars['Boolean']>
  deleteDocumentListDocumentTreeContent?: Maybe<Scalars['Boolean']>
  createDocumentListDocument?: Maybe<Document>
  updateDocumentListDocument?: Maybe<Document>
  patchDocumentListDocument?: Maybe<Document>
  deleteDocumentListDocument?: Maybe<Scalars['Boolean']>
  createDocumentList?: Maybe<DocumentList>
  updateDocumentList?: Maybe<DocumentList>
  deleteDocumentList?: Maybe<Scalars['Boolean']>
  createDocumentListType?: Maybe<DocumentListType>
  updateDocumentListType?: Maybe<DocumentListType>
  createDocumentDraft?: Maybe<Scalars['Boolean']>
  toggleDocumentPublishing?: Maybe<Scalars['Boolean']>
  createDocumentType?: Maybe<DocumentType>
  updateDocumentType?: Maybe<DocumentType>
  createPropertyType?: Maybe<PropertyType>
  updatePropertyType?: Maybe<PropertyType>
  deletePropertyType?: Maybe<Scalars['Boolean']>
  adminCreateLocation?: Maybe<Location>
  adminUpdateLocation?: Maybe<Location>
  deleteAdminLocation?: Maybe<Scalars['Boolean']>
  adminCreateLocationAttribute?: Maybe<LoAttribute>
  adminUpdateLocationAttribute?: Maybe<LoAttribute>
  adminCreateLocationGroup?: Maybe<LocationGroup>
  updateLocationUsage?: Maybe<LocationUsage>
  adminCreateLocationType?: Maybe<LocationType>
  adminUpdateLocationType?: Maybe<LocationType>
  deleteAdminLocationType?: Maybe<Scalars['Boolean']>
  updateEntityListEntities?: Maybe<Scalars['Boolean']>
  deleteEntityListEntity?: Maybe<Scalars['Boolean']>
  createEntityListEntity?: Maybe<Scalars['Boolean']>
  updateEntityList?: Maybe<EntityList>
  deleteEntityList?: Maybe<Scalars['Boolean']>
  createEntityList?: Maybe<EntityList>
  createEntityListView?: Maybe<ListView>
  updateEntityListView?: Maybe<ListView>
  deleteEntityListView?: Maybe<Scalars['Boolean']>
  createTargetRule?: Maybe<TargetRule>
  updateTargetRule?: Maybe<TargetRule>
  deleteCommerceTargetRule?: Maybe<Scalars['Boolean']>
  validateTargetRule?: Maybe<Scalars['Boolean']>
  createOrderRoutingSuggestion?: Maybe<SuggestionResponse>
}

export type MutationCreateCustomerAccountAttributeDefinitionArgs = {
  attributeInput?: Maybe<CuAttributeInput>
}

export type MutationUpdateCustomerAccountAttributeDefinitionArgs = {
  attributeFQN: Scalars['String']
  attributeInput?: Maybe<CuAttributeInput>
}

export type MutationValidateCustomerAddressArgs = {
  addressValidationRequestInput?: Maybe<AddressValidationRequestInput>
}

export type MutationValidateAddressArgs = {
  addressInput?: Maybe<CuAddressInput>
}

export type MutationCreateCustomerAuthTicketArgs = {
  customerUserAuthInfoInput?: Maybe<CustomerUserAuthInfoInput>
}

export type MutationRefreshCustomerAuthTicketsArgs = {
  refreshToken?: Maybe<Scalars['String']>
}

export type MutationCreateCustomerB2bAccountAttributeArgs = {
  accountId: Scalars['Int']
  customerAttributeInput?: Maybe<CustomerAttributeInput>
}

export type MutationDeleteB2bAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
}

export type MutationUpdateCustomerB2bAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  customerAttributeInput?: Maybe<CustomerAttributeInput>
}

export type MutationCreateCustomerB2bAccountArgs = {
  b2BAccountInput?: Maybe<B2BAccountInput>
}

export type MutationUpdateCustomerB2bAccountArgs = {
  accountId: Scalars['Int']
  b2BAccountInput?: Maybe<B2BAccountInput>
}

export type MutationCreateCustomerB2bAccountUserArgs = {
  accountId: Scalars['Int']
  b2BUserAndAuthInfoInput?: Maybe<B2BUserAndAuthInfoInput>
}

export type MutationUpdateCustomerB2bAccountUserArgs = {
  accountId: Scalars['Int']
  userId: Scalars['String']
  b2BUserInput?: Maybe<B2BUserInput>
}

export type MutationRemoveCustomerB2bAccountUserArgs = {
  accountId: Scalars['Int']
  userId: Scalars['String']
}

export type MutationAddRoleToCustomerB2bAccountArgs = {
  accountId: Scalars['Int']
  userId: Scalars['String']
  roleId: Scalars['Int']
}

export type MutationDeleteB2bAccountRoleArgs = {
  accountId: Scalars['Int']
  userId: Scalars['String']
  roleId: Scalars['Int']
}

export type MutationCreateCustomerCreditArgs = {
  userId?: Maybe<Scalars['String']>
  creditInput?: Maybe<CreditInput>
}

export type MutationUpdateCustomerCreditArgs = {
  code: Scalars['String']
  creditInput?: Maybe<CreditInput>
}

export type MutationDeleteCustomerCreditArgs = {
  code: Scalars['String']
}

export type MutationUpdateCustomerCreditAssociateToShopperArgs = {
  code: Scalars['String']
}

export type MutationResendCustomerCreditEmailArgs = {
  code: Scalars['String']
  userId?: Maybe<Scalars['String']>
}

export type MutationCreateCustomerCreditTransactionArgs = {
  code: Scalars['String']
  creditTransactionInput?: Maybe<CreditTransactionInput>
}

export type MutationCreateCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
  customerAttributeInput?: Maybe<CustomerAttributeInput>
}

export type MutationDeleteCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  userId?: Maybe<Scalars['String']>
}

export type MutationUpdateCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  userId?: Maybe<Scalars['String']>
  customerAttributeInput?: Maybe<CustomerAttributeInput>
}

export type MutationCreateCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardInput?: Maybe<CardInput>
}

export type MutationUpdateCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardId: Scalars['String']
  cardInput?: Maybe<CardInput>
}

export type MutationDeleteCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardId: Scalars['String']
}

export type MutationCreateCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  customerContactInput?: Maybe<CustomerContactInput>
}

export type MutationUpdateCustomerAccountContactsArgs = {
  accountId: Scalars['Int']
  customerContactInput?: Maybe<CustomerContactInput>
}

export type MutationUpdateCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  contactId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
  customerContactInput?: Maybe<CustomerContactInput>
}

export type MutationDeleteCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  contactId: Scalars['Int']
}

export type MutationCreateCustomerAccountArgs = {
  customerAccountInput?: Maybe<CustomerAccountInput>
}

export type MutationUpdateCustomerAccountArgs = {
  accountId: Scalars['Int']
  customerAccountInput?: Maybe<CustomerAccountInput>
}

export type MutationDeleteCustomerAccountArgs = {
  accountId: Scalars['Int']
}

export type MutationCreateCustomerAccountTransactionArgs = {
  accountId: Scalars['Int']
  transactionInput?: Maybe<TransactionInput>
}

export type MutationDeleteCustomerAccountTransactionArgs = {
  accountId: Scalars['Int']
  transactionId: Scalars['String']
}

export type MutationRecomputeCustomerAccountLifetimeValueArgs = {
  accountId: Scalars['Int']
}

export type MutationCreateCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  customerNoteInput?: Maybe<CustomerNoteInput>
}

export type MutationUpdateCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  noteId: Scalars['Int']
  customerNoteInput?: Maybe<CustomerNoteInput>
}

export type MutationDeleteCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  noteId: Scalars['Int']
}

export type MutationCreateCustomerAccountPurchaseOrderAccountArgs = {
  accountId: Scalars['Int']
  customerPurchaseOrderAccountInput?: Maybe<CustomerPurchaseOrderAccountInput>
}

export type MutationUpdateCustomerPurchaseOrderAccountArgs = {
  accountId: Scalars['Int']
  customerPurchaseOrderAccountInput?: Maybe<CustomerPurchaseOrderAccountInput>
}

export type MutationCreateCustomerAccountPurchaseOrderAccountTransactionArgs = {
  accountId: Scalars['Int']
  purchaseOrderTransactionInput?: Maybe<PurchaseOrderTransactionInput>
}

export type MutationCreatePurchaseOrderAccountArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  accountType?: Maybe<Scalars['String']>
}

export type MutationChangeCustomerAccountPasswordArgs = {
  accountId: Scalars['Int']
  unlockAccount?: Maybe<Scalars['Boolean']>
  userId?: Maybe<Scalars['String']>
  passwordInfoInput?: Maybe<PasswordInfoInput>
}

export type MutationUpdateCustomerAccountPasswordsArgs = {
  accountPasswordInfoCollectionInput?: Maybe<AccountPasswordInfoCollectionInput>
}

export type MutationResetCustomerAccountPasswordArgs = {
  resetPasswordInfoInput?: Maybe<ResetPasswordInfoInput>
}

export type MutationCreateCustomerAccountLoginArgs = {
  accountId: Scalars['Int']
  customerLoginInfoInput?: Maybe<CustomerLoginInfoInput>
}

export type MutationCreateCustomerAccountAndLoginArgs = {
  customerAccountAndAuthInfoInput?: Maybe<CustomerAccountAndAuthInfoInput>
}

export type MutationSetCustomerAccountLoginLockedArgs = {
  accountId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
  graphQLBoolean?: Maybe<Scalars['Boolean']>
}

export type MutationSetCustomerAccountPasswordChangeRequiredArgs = {
  accountId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
  graphQLBoolean?: Maybe<Scalars['Boolean']>
}

export type MutationCreateCustomerAccountsArgs = {
  customerAccountAndAuthInfoInput?: Maybe<CustomerAccountAndAuthInfoInput>
}

export type MutationCreateCustomerSegmentArgs = {
  customerSegmentInput?: Maybe<CustomerSegmentInput>
}

export type MutationUpdateCustomerSegmentArgs = {
  id: Scalars['Int']
  customerSegmentInput?: Maybe<CustomerSegmentInput>
}

export type MutationDeleteCustomerSegmentArgs = {
  id: Scalars['Int']
}

export type MutationCreateCustomerSegmentAccountArgs = {
  id: Scalars['Int']
  graphQLInt?: Maybe<Scalars['Int']>
}

export type MutationDeleteCustomerSegmentAccountArgs = {
  id: Scalars['Int']
  accountId: Scalars['Int']
}

export type MutationCreateInStockNotificationArgs = {
  inStockNotificationSubscriptionInput?: Maybe<InStockNotificationSubscriptionInput>
}

export type MutationDeleteInStockNotificationArgs = {
  id: Scalars['Int']
}

export type MutationCreateResolvedPriceListArgs = {
  object?: Maybe<Scalars['Object']>
}

export type MutationConfigureProductArgs = {
  productCode: Scalars['String']
  includeOptionDetails?: Maybe<Scalars['Boolean']>
  skipInventoryCheck?: Maybe<Scalars['Boolean']>
  quantity?: Maybe<Scalars['Int']>
  purchaseLocation?: Maybe<Scalars['String']>
  variationProductCodeFilter?: Maybe<Scalars['String']>
  productOptionSelectionsInput?: Maybe<ProductOptionSelectionsInput>
}

export type MutationValidateProductArgs = {
  productCode: Scalars['String']
  skipInventoryCheck?: Maybe<Scalars['Boolean']>
  quantity?: Maybe<Scalars['Int']>
  skipDefaults?: Maybe<Scalars['Boolean']>
  purchaseLocation?: Maybe<Scalars['String']>
  productOptionSelectionsInput?: Maybe<ProductOptionSelectionsInput>
}

export type MutationValidateProductDiscountsArgs = {
  productCode: Scalars['String']
  variationProductCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  allowInactive?: Maybe<Scalars['Boolean']>
  skipInventoryCheck?: Maybe<Scalars['Boolean']>
  discountSelectionsInput?: Maybe<DiscountSelectionsInput>
}

export type MutationManageLocationProductInventoryArgs = {
  locationInventoryQueryInput?: Maybe<LocationInventoryQueryInput>
}

export type MutationCreateProductCostArgs = {
  productCostQueryInput?: Maybe<ProductCostQueryInput>
}

export type MutationCreateCartForUserArgs = {
  userId: Scalars['String']
}

export type MutationUpdateUserCartArgs = {
  userId: Scalars['String']
  cartInput?: Maybe<CartInput>
}

export type MutationUpdateCurrentCartArgs = {
  cartInput?: Maybe<CartInput>
}

export type MutationUpdateCartArgs = {
  cartId: Scalars['String']
  cartInput?: Maybe<CartInput>
}

export type MutationDeleteCartArgs = {
  cartId: Scalars['String']
}

export type MutationDeleteUserCartArgs = {
  userId: Scalars['String']
}

export type MutationRejectCartDiscountArgs = {
  cartId: Scalars['String']
  discountId: Scalars['Int']
}

export type MutationUpdateCartCouponArgs = {
  cartId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationDeleteCartCouponsArgs = {
  cartId: Scalars['String']
}

export type MutationDeleteCartCouponArgs = {
  cartId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationAddExtendedPropertyToCurrentCartArgs = {
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
}

export type MutationUpdateCurrentCartExtendedPropertiesArgs = {
  upsert?: Maybe<Scalars['Boolean']>
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
}

export type MutationDeleteCurrentCartExtendedPropertiesArgs = {
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationUpdateCurrentCartExtendedPropertyArgs = {
  key: Scalars['String']
  upsert?: Maybe<Scalars['Boolean']>
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
}

export type MutationDeleteCurrentCartExtendedPropertyArgs = {
  key: Scalars['String']
}

export type MutationAddItemToCurrentCartArgs = {
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationDeleteCartItemsArgs = {
  cartId: Scalars['String']
}

export type MutationAddItemToCartArgs = {
  cartId: Scalars['String']
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationUpdateCurrentCartItemArgs = {
  cartItemId: Scalars['String']
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationDeleteCurrentCartItemArgs = {
  cartItemId: Scalars['String']
}

export type MutationUpdateCartItemArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationDeleteCartItemArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
}

export type MutationAddItemsToCurrentCartArgs = {
  throwErrorOnInvalidItems?: Maybe<Scalars['Boolean']>
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationAddItemsToCartArgs = {
  cartId: Scalars['String']
  throwErrorOnInvalidItems?: Maybe<Scalars['Boolean']>
  cartItemInput?: Maybe<CartItemInput>
}

export type MutationUpdateCurrentCartItemQuantityArgs = {
  cartItemId: Scalars['String']
  quantity: Scalars['Int']
}

export type MutationUpdateCartItemQuantityArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
  quantity: Scalars['Int']
}

export type MutationDeleteCurrentCartMessageArgs = {
  messageId: Scalars['String']
}

export type MutationCreateCommerceChannelArgs = {
  channelInput?: Maybe<ChannelInput>
}

export type MutationUpdateChannelArgs = {
  code: Scalars['String']
  channelInput?: Maybe<ChannelInput>
}

export type MutationDeleteCommerceChannelArgs = {
  code: Scalars['String']
}

export type MutationCreateCommerceChannelGroupArgs = {
  channelGroupInput?: Maybe<ChannelGroupInput>
}

export type MutationUpdateChannelGroupArgs = {
  code: Scalars['String']
  channelGroupInput?: Maybe<ChannelGroupInput>
}

export type MutationDeleteCommerceChannelGroupArgs = {
  code: Scalars['String']
}

export type MutationCreateCheckoutAttributeArgs = {
  checkoutId: Scalars['String']
  orderAttributeInput?: Maybe<OrderAttributeInput>
}

export type MutationUpdateCheckoutAttributesArgs = {
  checkoutId: Scalars['String']
  removeMissing?: Maybe<Scalars['Boolean']>
  orderAttributeInput?: Maybe<OrderAttributeInput>
}

export type MutationUpdateCheckoutArgs = {
  checkoutId: Scalars['String']
  checkoutInput?: Maybe<CheckoutInput>
}

export type MutationCreateCheckoutArgs = {
  cartId?: Maybe<Scalars['String']>
}

export type MutationCreateCheckoutShippingMethodArgs = {
  checkoutId: Scalars['String']
  checkoutGroupShippingMethodInput?: Maybe<CheckoutGroupShippingMethodInput>
}

export type MutationCreateCheckoutActionArgs = {
  checkoutId: Scalars['String']
  checkoutActionInput?: Maybe<CheckoutActionInput>
}

export type MutationUpdateCheckoutDigitalWalletTypeArgs = {
  checkoutId: Scalars['String']
  digitalWalletType: Scalars['String']
  digitalWalletInput?: Maybe<DigitalWalletInput>
}

export type MutationUpdateCheckoutPriceListArgs = {
  checkoutId: Scalars['String']
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationResendCheckoutEmailArgs = {
  checkoutId: Scalars['String']
}

export type MutationUpdateCheckoutCouponArgs = {
  checkoutId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationDeleteCheckoutCouponsArgs = {
  checkoutId: Scalars['String']
}

export type MutationDeleteCheckoutCouponArgs = {
  checkoutId: Scalars['String']
  couponCode: Scalars['String']
}

export type MutationUpdateCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationId: Scalars['String']
  destinationInput?: Maybe<DestinationInput>
}

export type MutationDeleteCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationId: Scalars['String']
}

export type MutationCreateCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationInput?: Maybe<DestinationInput>
}

export type MutationCreateCheckoutItemArgs = {
  checkoutId: Scalars['String']
  orderItemInput?: Maybe<CrOrderItemInput>
}

export type MutationDeleteCheckoutItemArgs = {
  checkoutId: Scalars['String']
  itemId: Scalars['String']
}

export type MutationUpdateCheckoutItemDestinationArgs = {
  checkoutId: Scalars['String']
  itemId: Scalars['String']
  destinationId: Scalars['String']
}

export type MutationCreateCheckoutItemDestinationArgs = {
  checkoutId: Scalars['String']
  itemsForDestinationInput?: Maybe<ItemsForDestinationInput>
}

export type MutationCreateCheckoutPaymentActionArgs = {
  checkoutId: Scalars['String']
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationUpdateCheckoutPaymentActionArgs = {
  checkoutId: Scalars['String']
  paymentId: Scalars['String']
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationCreateOrderPaymentActionArgs = {
  orderId: Scalars['String']
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationCreateOrderPaymentPaymentActionArgs = {
  orderId: Scalars['String']
  paymentId: Scalars['String']
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationCreateOrderAutoCaptureArgs = {
  orderId: Scalars['String']
  forceCapture?: Maybe<Scalars['Boolean']>
}

export type MutationCreateOrderPickupArgs = {
  orderId: Scalars['String']
  pickupInput?: Maybe<PickupInput>
}

export type MutationUpdateOrderPickupArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
  pickupInput?: Maybe<PickupInput>
}

export type MutationDeleteOrderPickupArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
}

export type MutationCreateOrderRefundArgs = {
  orderId: Scalars['String']
  refundInput?: Maybe<RefundInput>
}

export type MutationUpdateOrderRefundArgs = {
  orderId: Scalars['String']
  refundId: Scalars['String']
}

export type MutationCreateOrderShipmentArgs = {
  orderId: Scalars['String']
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationDeleteOrderShipmentArgs = {
  orderId: Scalars['String']
  shipmentId: Scalars['String']
}

export type MutationRepriceOrderShipmentArgs = {
  shipmentNumber: Scalars['Int']
  orderId: Scalars['String']
  repriceShipmentObjectInput?: Maybe<RepriceShipmentObjectInput>
}

export type MutationCreateOrderShipmentAdjustmentArgs = {
  orderId: Scalars['String']
  shipmentNumber: Scalars['Int']
  shipmentAdjustmentInput?: Maybe<ShipmentAdjustmentInput>
}

export type MutationCreateOrderShipmentItemAdjustmentArgs = {
  shipmentNumber: Scalars['Int']
  itemId: Scalars['Int']
  orderId: Scalars['String']
  shipmentItemAdjustmentInput?: Maybe<ShipmentItemAdjustmentInput>
}

export type MutationSplitOrderShipmentArgs = {
  orderId: Scalars['String']
  shipmentNumber: Scalars['String']
  splitShipmentsObjectInput?: Maybe<SplitShipmentsObjectInput>
}

export type MutationUpdateOrderValidationResultsArgs = {
  orderId: Scalars['String']
  orderValidationResultInput?: Maybe<OrderValidationResultInput>
}

export type MutationUpdateOrderAdjustmentArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  adjustmentInput?: Maybe<AdjustmentInput>
}

export type MutationDeleteOrderAdjustmentArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationUpdateOrderShippingAdjustmentArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  adjustmentInput?: Maybe<AdjustmentInput>
}

export type MutationDeleteOrderAdjustmentShippingArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationUpdateOrderHandlingAdjustmentArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  adjustmentInput?: Maybe<AdjustmentInput>
}

export type MutationDeleteOrderAdjustmentHandlingArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationCreateOrderAttributeArgs = {
  orderId: Scalars['String']
  orderAttributeInput?: Maybe<OrderAttributeInput>
}

export type MutationUpdateOrderAttributesArgs = {
  orderId: Scalars['String']
  removeMissing?: Maybe<Scalars['Boolean']>
  orderAttributeInput?: Maybe<OrderAttributeInput>
}

export type MutationUpdateOrderBillingInfoArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  billingInfoInput?: Maybe<BillingInfoInput>
}

export type MutationCancelOrderArgs = {
  orderId: Scalars['String']
  canceledReasonInput?: Maybe<CanceledReasonInput>
}

export type MutationCreateOrderArgs = {
  cartId?: Maybe<Scalars['String']>
  quoteId?: Maybe<Scalars['String']>
  orderInput?: Maybe<OrderInput>
}

export type MutationUpdateUserOrderArgs = {
  orderId: Scalars['String']
}

export type MutationUpdateOrderPriceListArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationResendOrderEmailArgs = {
  orderId: Scalars['String']
  orderActionInput?: Maybe<OrderActionInput>
}

export type MutationUpdateOrderArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  orderInput?: Maybe<OrderInput>
}

export type MutationUpdateOrderDigitalWalletTpeArgs = {
  orderId: Scalars['String']
  digitalWalletType: Scalars['String']
  digitalWalletInput?: Maybe<DigitalWalletInput>
}

export type MutationUpdateOrderDraftArgs = {
  orderId: Scalars['String']
  version?: Maybe<Scalars['String']>
}

export type MutationCreateOrderActionArgs = {
  orderId: Scalars['String']
  orderActionInput?: Maybe<OrderActionInput>
}

export type MutationUpdateOrderDiscountArgs = {
  orderId: Scalars['String']
  discountId: Scalars['Int']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  appliedDiscountInput?: Maybe<CrAppliedDiscountInput>
}

export type MutationUpdateOrderPriceArgs = {
  refreshShipping?: Maybe<Scalars['Boolean']>
  orderInput?: Maybe<OrderInput>
}

export type MutationUpdateOrderCouponArgs = {
  orderId: Scalars['String']
  couponCode: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationDeleteOrderCouponsArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationDeleteOrderCouponArgs = {
  orderId: Scalars['String']
  couponCode: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationCreateOrderDigitalPackageArgs = {
  orderId: Scalars['String']
  digitalPackageInput?: Maybe<DigitalPackageInput>
}

export type MutationUpdateOrderDigitalPackageArgs = {
  orderId: Scalars['String']
  digitalPackageId: Scalars['String']
  digitalPackageInput?: Maybe<DigitalPackageInput>
}

export type MutationDeleteOrderDigitalPackageArgs = {
  orderId: Scalars['String']
  digitalPackageId: Scalars['String']
}

export type MutationCreateOrderExtendedPropertiesArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
}

export type MutationUpdateOrderExtendedPropertiesArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  upsert?: Maybe<Scalars['Boolean']>
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
}

export type MutationDeleteOrderExtendedPropertiesArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationUpdateOrderExtendedPropertyArgs = {
  orderId: Scalars['String']
  key: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  upsert?: Maybe<Scalars['Boolean']>
  extendedPropertyInput?: Maybe<ExtendedPropertyInput>
}

export type MutationDeleteOrderExtendedPropertyArgs = {
  orderId: Scalars['String']
  key: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationCreateOrderFulfillmentActionArgs = {
  orderId: Scalars['String']
  fulfillmentActionInput?: Maybe<FulfillmentActionInput>
}

export type MutationResendOrderFulfillmentEmailArgs = {
  orderId: Scalars['String']
  fulfillmentActionInput?: Maybe<FulfillmentActionInput>
}

export type MutationUpdateOrderFulfillmentInfoArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  fulfillmentInfoInput?: Maybe<FulfillmentInfoInput>
}

export type MutationCreateOrderItemArgs = {
  orderId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  skipInventoryCheck?: Maybe<Scalars['Boolean']>
  orderItemInput?: Maybe<CrOrderItemInput>
}

export type MutationDeleteOrderItemArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationUpdateOrderItemPriceArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  price: Scalars['Float']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationUpdateOrderItemQuantityArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  quantity: Scalars['Int']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationUpdateOrderItemDutyAmountArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  dutyAmount: Scalars['Float']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type MutationUpdateOrderItemFulfillmentArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  orderItemInput?: Maybe<CrOrderItemInput>
}

export type MutationUpdateOrderItemDiscountArgs = {
  orderId: Scalars['String']
  orderItemId: Scalars['String']
  discountId: Scalars['Int']
  updateMode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  appliedDiscountInput?: Maybe<CrAppliedDiscountInput>
}

export type MutationCreateOrderNoteArgs = {
  orderId: Scalars['String']
  orderNoteInput?: Maybe<OrderNoteInput>
}

export type MutationUpdateOrderNotesArgs = {
  orderId: Scalars['String']
  noteId: Scalars['String']
  orderNoteInput?: Maybe<OrderNoteInput>
}

export type MutationDeleteOrderNoteArgs = {
  orderId: Scalars['String']
  noteId: Scalars['String']
}

export type MutationCreateOrderPackageArgs = {
  orderId: Scalars['String']
  packageObjInput?: Maybe<PackageObjInput>
}

export type MutationUpdateOrderPackageArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
  packageObjInput?: Maybe<PackageObjInput>
}

export type MutationDeleteOrderPackageArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type MutationValidateOrderArgs = {
  orderInput?: Maybe<OrderInput>
}

export type MutationUpdateQuoteArgs = {
  quoteId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  quoteInput?: Maybe<QuoteInput>
}

export type MutationDeleteQuoteArgs = {
  quoteId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type MutationCreateQuoteArgs = {
  quoteInput?: Maybe<QuoteInput>
}

export type MutationCreateQuoteItemArgs = {
  quoteId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
  orderItemInput?: Maybe<CrOrderItemInput>
}

export type MutationDeleteQuoteItemArgs = {
  quoteId: Scalars['String']
  quoteItemId: Scalars['String']
  updateMode?: Maybe<Scalars['String']>
}

export type MutationCreateReturnArgs = {
  returnObjInput?: Maybe<ReturnObjInput>
}

export type MutationResendReturnEmailArgs = {
  returnActionInput?: Maybe<ReturnActionInput>
}

export type MutationUpdateReturnArgs = {
  returnId: Scalars['String']
  returnObjInput?: Maybe<ReturnObjInput>
}

export type MutationDeleteReturnArgs = {
  returnId: Scalars['String']
}

export type MutationCreateReturnActionArgs = {
  returnActionInput?: Maybe<ReturnActionInput>
}

export type MutationSetReturnShipArgs = {
  returnId: Scalars['String']
  returnItemSpecifierInput?: Maybe<ReturnItemSpecifierInput>
}

export type MutationCreateReturnPaymentActionArgs = {
  returnId: Scalars['String']
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationCreateReturnPaymentPaymentActionArgs = {
  returnId: Scalars['String']
  paymentId: Scalars['String']
  paymentActionInput?: Maybe<PaymentActionInput>
}

export type MutationSetReturnRestockArgs = {
  returnId: Scalars['String']
  restockableReturnItemInput?: Maybe<RestockableReturnItemInput>
}

export type MutationCreateReturnItemArgs = {
  returnId: Scalars['String']
  returnItemInput?: Maybe<ReturnItemInput>
}

export type MutationDeleteReturnItemArgs = {
  returnId?: Maybe<Scalars['String']>
  returnItemId?: Maybe<Scalars['String']>
  orderId: Scalars['String']
  orderItemId: Scalars['String']
}

export type MutationCreateReturnNoteArgs = {
  returnId: Scalars['String']
  orderNoteInput?: Maybe<OrderNoteInput>
}

export type MutationUpdateReturnNoteArgs = {
  returnId: Scalars['String']
  noteId: Scalars['String']
  orderNoteInput?: Maybe<OrderNoteInput>
}

export type MutationDeleteReturnNoteArgs = {
  returnId: Scalars['String']
  noteId: Scalars['String']
}

export type MutationCreateReturnPackageArgs = {
  returnId: Scalars['String']
  packageObjInput?: Maybe<PackageObjInput>
}

export type MutationUpdateReturnPackageArgs = {
  returnId: Scalars['String']
  packageId: Scalars['String']
  packageObjInput?: Maybe<PackageObjInput>
}

export type MutationDeleteReturnPackageArgs = {
  returnId: Scalars['String']
  packageId: Scalars['String']
}

export type MutationCreateReturnShipmentArgs = {
  returnId: Scalars['String']
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationDeleteReturnShipmentArgs = {
  returnId: Scalars['String']
  shipmentId: Scalars['String']
}

export type MutationCreateWishlistArgs = {
  wishlistInput?: Maybe<WishlistInput>
}

export type MutationUpdateWishlistArgs = {
  wishlistId: Scalars['String']
  wishlistInput?: Maybe<WishlistInput>
}

export type MutationDeleteWishlistArgs = {
  wishlistId: Scalars['String']
}

export type MutationDeleteWishlistItemsArgs = {
  wishlistId: Scalars['String']
}

export type MutationCreateWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemInput?: Maybe<WishlistItemInput>
}

export type MutationUpdateWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
  wishlistItemInput?: Maybe<WishlistItemInput>
}

export type MutationDeleteWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
}

export type MutationUpdateWishlistItemQuantityArgs = {
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
  quantity: Scalars['Int']
}

export type MutationUpdateDocumentListDocumentContentArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
  httpRequestMessageInput?: Maybe<CoHttpRequestMessageInput>
}

export type MutationDeleteDocumentListDocumentContentArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
}

export type MutationUpdateDocumentListDocumentTreeContentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
  httpRequestMessageInput?: Maybe<CoHttpRequestMessageInput>
}

export type MutationDeleteDocumentListDocumentTreeContentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
  httpRequestMessageInput?: Maybe<CoHttpRequestMessageInput>
}

export type MutationCreateDocumentListDocumentArgs = {
  documentListName: Scalars['String']
  documentInput?: Maybe<DocumentInput>
}

export type MutationUpdateDocumentListDocumentArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
  documentInput?: Maybe<DocumentInput>
}

export type MutationPatchDocumentListDocumentArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
  documentInput?: Maybe<DocumentInput>
}

export type MutationDeleteDocumentListDocumentArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
}

export type MutationCreateDocumentListArgs = {
  documentListInput?: Maybe<DocumentListInput>
}

export type MutationUpdateDocumentListArgs = {
  documentListName: Scalars['String']
  documentListInput?: Maybe<DocumentListInput>
}

export type MutationDeleteDocumentListArgs = {
  documentListName: Scalars['String']
}

export type MutationCreateDocumentListTypeArgs = {
  documentListTypeInput?: Maybe<DocumentListTypeInput>
}

export type MutationUpdateDocumentListTypeArgs = {
  documentListTypeFQN: Scalars['String']
  documentListTypeInput?: Maybe<DocumentListTypeInput>
}

export type MutationCreateDocumentDraftArgs = {
  documentLists?: Maybe<Scalars['String']>
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationToggleDocumentPublishingArgs = {
  documentLists?: Maybe<Scalars['String']>
  graphQLString?: Maybe<Scalars['String']>
}

export type MutationCreateDocumentTypeArgs = {
  documentTypeInput?: Maybe<DocumentTypeInput>
}

export type MutationUpdateDocumentTypeArgs = {
  documentTypeName: Scalars['String']
  documentTypeInput?: Maybe<DocumentTypeInput>
}

export type MutationCreatePropertyTypeArgs = {
  propertyTypeInput?: Maybe<PropertyTypeInput>
}

export type MutationUpdatePropertyTypeArgs = {
  propertyTypeName: Scalars['String']
  propertyTypeInput?: Maybe<PropertyTypeInput>
}

export type MutationDeletePropertyTypeArgs = {
  propertyTypeName: Scalars['String']
}

export type MutationAdminCreateLocationArgs = {
  locationInput?: Maybe<LocationInput>
}

export type MutationAdminUpdateLocationArgs = {
  locationCode: Scalars['String']
  locationInput?: Maybe<LocationInput>
}

export type MutationDeleteAdminLocationArgs = {
  locationCode: Scalars['String']
}

export type MutationAdminCreateLocationAttributeArgs = {
  attributeInput?: Maybe<LoAttributeInput>
}

export type MutationAdminUpdateLocationAttributeArgs = {
  attributeFQN: Scalars['String']
  attributeInput?: Maybe<LoAttributeInput>
}

export type MutationAdminCreateLocationGroupArgs = {
  locationGroupInput?: Maybe<LocationGroupInput>
}

export type MutationUpdateLocationUsageArgs = {
  code: Scalars['String']
  locationUsageInput?: Maybe<LocationUsageInput>
}

export type MutationAdminCreateLocationTypeArgs = {
  locationTypeInput?: Maybe<LocationTypeInput>
}

export type MutationAdminUpdateLocationTypeArgs = {
  locationTypeCode: Scalars['String']
  locationTypeInput?: Maybe<LocationTypeInput>
}

export type MutationDeleteAdminLocationTypeArgs = {
  locationTypeCode: Scalars['String']
}

export type MutationUpdateEntityListEntitiesArgs = {
  entityListFullName: Scalars['String']
  id: Scalars['String']
  httpRequestMessageInput?: Maybe<MzdbHttpRequestMessageInput>
}

export type MutationDeleteEntityListEntityArgs = {
  entityListFullName: Scalars['String']
  id: Scalars['String']
}

export type MutationCreateEntityListEntityArgs = {
  entityListFullName: Scalars['String']
  httpRequestMessageInput?: Maybe<MzdbHttpRequestMessageInput>
}

export type MutationUpdateEntityListArgs = {
  entityListFullName: Scalars['String']
  entityListInput?: Maybe<EntityListInput>
}

export type MutationDeleteEntityListArgs = {
  entityListFullName: Scalars['String']
}

export type MutationCreateEntityListArgs = {
  entityListInput?: Maybe<EntityListInput>
}

export type MutationCreateEntityListViewArgs = {
  entityListFullName: Scalars['String']
  listViewInput?: Maybe<ListViewInput>
}

export type MutationUpdateEntityListViewArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
  listViewInput?: Maybe<ListViewInput>
}

export type MutationDeleteEntityListViewArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
}

export type MutationCreateTargetRuleArgs = {
  targetRuleInput?: Maybe<TargetRuleInput>
}

export type MutationUpdateTargetRuleArgs = {
  code: Scalars['String']
  targetRuleInput?: Maybe<TargetRuleInput>
}

export type MutationDeleteCommerceTargetRuleArgs = {
  code: Scalars['String']
}

export type MutationValidateTargetRuleArgs = {
  targetRuleInput?: Maybe<TargetRuleInput>
}

export type MutationCreateOrderRoutingSuggestionArgs = {
  returnSuggestionLog?: Maybe<Scalars['Boolean']>
  suggestionRequestInput?: Maybe<SuggestionRequestInput>
}

export enum NodeTypeEnum {
  Array = 'ARRAY',
  Binary = 'BINARY',
  Boolean = 'BOOLEAN',
  Missing = 'MISSING',
  Null = 'NULL',
  Number = 'NUMBER',
  Object = 'OBJECT',
  Pojo = 'POJO',
  String = 'STRING',
}

export type Order = {
  __typename?: 'Order'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Order>
  orderNumber?: Maybe<Scalars['Int']>
  locationCode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  parentOrderId?: Maybe<Scalars['String']>
  parentOrderNumber?: Maybe<Scalars['Int']>
  parentCheckoutId?: Maybe<Scalars['String']>
  parentCheckoutNumber?: Maybe<Scalars['Int']>
  partialOrderNumber?: Maybe<Scalars['Int']>
  partialOrderCount?: Maybe<Scalars['Int']>
  isPartialOrder?: Maybe<Scalars['Boolean']>
  parentReturnId?: Maybe<Scalars['String']>
  parentReturnNumber?: Maybe<Scalars['Int']>
  originalCartId?: Maybe<Scalars['String']>
  originalQuoteId?: Maybe<Scalars['String']>
  originalQuoteNumber?: Maybe<Scalars['Int']>
  priceListCode?: Maybe<Scalars['String']>
  availableActions?: Maybe<Array<Scalars['String']>>
  shopperNotes?: Maybe<ShopperNotes>
  customerAccountId?: Maybe<Scalars['Int']>
  customerTaxId?: Maybe<Scalars['String']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  email?: Maybe<Scalars['String']>
  ipAddress?: Maybe<Scalars['String']>
  sourceDevice?: Maybe<Scalars['String']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  status?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  paymentStatus?: Maybe<Scalars['String']>
  returnStatus?: Maybe<Scalars['String']>
  isEligibleForReturns?: Maybe<Scalars['Boolean']>
  totalCollected: Scalars['Float']
  attributes?: Maybe<Array<Maybe<OrderAttribute>>>
  adjustment?: Maybe<Adjustment>
  shippingAdjustment?: Maybe<Adjustment>
  handlingAdjustment?: Maybe<Adjustment>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscount>>>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingSubTotal?: Maybe<Scalars['Float']>
  handlingTotal?: Maybe<Scalars['Float']>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal?: Maybe<Scalars['Float']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  submittedDate?: Maybe<Scalars['DateTime']>
  cancelledDate?: Maybe<Scalars['DateTime']>
  closedDate?: Maybe<Scalars['DateTime']>
  acceptedDate?: Maybe<Scalars['DateTime']>
  notes?: Maybe<Array<Maybe<OrderNote>>>
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  validationResults?: Maybe<Array<Maybe<OrderValidationResult>>>
  billingInfo?: Maybe<BillingInfo>
  payments?: Maybe<Array<Maybe<Payment>>>
  refunds?: Maybe<Array<Maybe<Refund>>>
  packages?: Maybe<Array<Maybe<PackageObj>>>
  pickups?: Maybe<Array<Maybe<Pickup>>>
  digitalPackages?: Maybe<Array<Maybe<DigitalPackage>>>
  shipments?: Maybe<Array<Maybe<Shipment>>>
  isDraft?: Maybe<Scalars['Boolean']>
  hasDraft?: Maybe<Scalars['Boolean']>
  isImport?: Maybe<Scalars['Boolean']>
  isHistoricalImport?: Maybe<Scalars['Boolean']>
  importDate?: Maybe<Scalars['DateTime']>
  isUnified?: Maybe<Scalars['Boolean']>
  externalId?: Maybe<Scalars['String']>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
  amountAvailableForRefund: Scalars['Float']
  amountRemainingForPayment: Scalars['Float']
  amountRefunded: Scalars['Float']
  readyToCapture?: Maybe<Scalars['Boolean']>
  isOptInForSms?: Maybe<Scalars['Boolean']>
  userId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  channelCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  subtotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  taxTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  extendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  auditInfo?: Maybe<CrAuditInfo>
}

export type Order_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderActionInput = {
  actionName?: Maybe<Scalars['String']>
}

export type OrderAttribute = {
  __typename?: 'OrderAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderAttribute>
  auditInfo?: Maybe<CrAuditInfo>
  fullyQualifiedName?: Maybe<Scalars['String']>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type OrderAttribute_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderAttributeInput = {
  auditInfo?: Maybe<CrAuditInfoInput>
  fullyQualifiedName?: Maybe<Scalars['String']>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type OrderCollection = {
  __typename?: 'OrderCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Order>>>
}

export type OrderCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderInput = {
  orderNumber?: Maybe<Scalars['Int']>
  locationCode?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  parentOrderId?: Maybe<Scalars['String']>
  parentOrderNumber?: Maybe<Scalars['Int']>
  parentCheckoutId?: Maybe<Scalars['String']>
  parentCheckoutNumber?: Maybe<Scalars['Int']>
  partialOrderNumber?: Maybe<Scalars['Int']>
  partialOrderCount?: Maybe<Scalars['Int']>
  isPartialOrder?: Maybe<Scalars['Boolean']>
  parentReturnId?: Maybe<Scalars['String']>
  parentReturnNumber?: Maybe<Scalars['Int']>
  originalCartId?: Maybe<Scalars['String']>
  originalQuoteId?: Maybe<Scalars['String']>
  originalQuoteNumber?: Maybe<Scalars['Int']>
  priceListCode?: Maybe<Scalars['String']>
  availableActions?: Maybe<Array<Scalars['String']>>
  shopperNotes?: Maybe<ShopperNotesInput>
  customerAccountId?: Maybe<Scalars['Int']>
  customerTaxId?: Maybe<Scalars['String']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  email?: Maybe<Scalars['String']>
  ipAddress?: Maybe<Scalars['String']>
  sourceDevice?: Maybe<Scalars['String']>
  acceptsMarketing?: Maybe<Scalars['Boolean']>
  status?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  paymentStatus?: Maybe<Scalars['String']>
  returnStatus?: Maybe<Scalars['String']>
  isEligibleForReturns?: Maybe<Scalars['Boolean']>
  totalCollected: Scalars['Float']
  attributes?: Maybe<Array<Maybe<OrderAttributeInput>>>
  adjustment?: Maybe<AdjustmentInput>
  shippingAdjustment?: Maybe<AdjustmentInput>
  handlingAdjustment?: Maybe<AdjustmentInput>
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscountInput>>>
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  handlingAmount?: Maybe<Scalars['Float']>
  handlingSubTotal?: Maybe<Scalars['Float']>
  handlingTotal?: Maybe<Scalars['Float']>
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal?: Maybe<Scalars['Float']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  submittedDate?: Maybe<Scalars['DateTime']>
  cancelledDate?: Maybe<Scalars['DateTime']>
  closedDate?: Maybe<Scalars['DateTime']>
  acceptedDate?: Maybe<Scalars['DateTime']>
  notes?: Maybe<Array<Maybe<OrderNoteInput>>>
  items?: Maybe<Array<Maybe<CrOrderItemInput>>>
  validationResults?: Maybe<Array<Maybe<OrderValidationResultInput>>>
  billingInfo?: Maybe<BillingInfoInput>
  payments?: Maybe<Array<Maybe<PaymentInput>>>
  refunds?: Maybe<Array<Maybe<RefundInput>>>
  packages?: Maybe<Array<Maybe<PackageObjInput>>>
  pickups?: Maybe<Array<Maybe<PickupInput>>>
  digitalPackages?: Maybe<Array<Maybe<DigitalPackageInput>>>
  shipments?: Maybe<Array<Maybe<ShipmentInput>>>
  isDraft?: Maybe<Scalars['Boolean']>
  hasDraft?: Maybe<Scalars['Boolean']>
  isImport?: Maybe<Scalars['Boolean']>
  isHistoricalImport?: Maybe<Scalars['Boolean']>
  importDate?: Maybe<Scalars['DateTime']>
  isUnified?: Maybe<Scalars['Boolean']>
  externalId?: Maybe<Scalars['String']>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
  amountAvailableForRefund: Scalars['Float']
  amountRemainingForPayment: Scalars['Float']
  amountRefunded: Scalars['Float']
  readyToCapture?: Maybe<Scalars['Boolean']>
  isOptInForSms?: Maybe<Scalars['Boolean']>
  userId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  channelCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  subtotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  taxTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  extendedProperties?: Maybe<Array<Maybe<ExtendedPropertyInput>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type OrderItemCollection = {
  __typename?: 'OrderItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderItemCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<CrOrderItem>>>
}

export type OrderItemCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderItemInput = {
  backorderable?: Maybe<Scalars['Boolean']>
  customItemData: Scalars['Object']
  itemDependency: Scalars['Int']
  orderItemID: Scalars['Int']
  partNumber: Scalars['String']
  quantity: Scalars['Int']
  sku: Scalars['String']
  upc: Scalars['String']
}

export type OrderNote = {
  __typename?: 'OrderNote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderNote>
  id?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
}

export type OrderNote_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderNoteInput = {
  id?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type OrderReturnableItem = {
  __typename?: 'OrderReturnableItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderReturnableItem>
  productCode?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  shipmentNumber?: Maybe<Scalars['Int']>
  shipmentItemId?: Maybe<Scalars['Int']>
  quantityOrdered: Scalars['Int']
  quantityFulfilled: Scalars['Int']
  quantityReturned: Scalars['Int']
  quantityReturnable: Scalars['Int']
  fulfillmentStatus?: Maybe<Scalars['String']>
  orderItemId?: Maybe<Scalars['String']>
  orderLineId: Scalars['Int']
  orderItemOptionAttributeFQN?: Maybe<Scalars['String']>
  unitQuantity: Scalars['Int']
  parentProductCode?: Maybe<Scalars['String']>
  parentProductName?: Maybe<Scalars['String']>
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  sku?: Maybe<Scalars['String']>
  mfgPartNumber?: Maybe<Scalars['String']>
}

export type OrderReturnableItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderReturnableItemCollection = {
  __typename?: 'OrderReturnableItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderReturnableItemCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<OrderReturnableItem>>>
}

export type OrderReturnableItemCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export enum OrderTypeEnum {
  Directship = 'DIRECTSHIP',
  Transfer = 'TRANSFER',
}

export type OrderValidationMessage = {
  __typename?: 'OrderValidationMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderValidationMessage>
  orderItemId?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
}

export type OrderValidationMessage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderValidationMessageInput = {
  orderItemId?: Maybe<Scalars['String']>
  messageType?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
}

export type OrderValidationResult = {
  __typename?: 'OrderValidationResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<OrderValidationResult>
  validationId?: Maybe<Scalars['String']>
  validatorName?: Maybe<Scalars['String']>
  validatorType?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  createdDate?: Maybe<Scalars['DateTime']>
  messages?: Maybe<Array<Maybe<OrderValidationMessage>>>
}

export type OrderValidationResult_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type OrderValidationResultInput = {
  validationId?: Maybe<Scalars['String']>
  validatorName?: Maybe<Scalars['String']>
  validatorType?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  createdDate?: Maybe<Scalars['DateTime']>
  messages?: Maybe<Array<Maybe<OrderValidationMessageInput>>>
}

export type PackageItem = {
  __typename?: 'PackageItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PackageItem>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
}

export type PackageItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PackageItemInput = {
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
}

export type PackageObj = {
  __typename?: 'PackageObj'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PackageObj>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shipmentId?: Maybe<Scalars['String']>
  trackingNumber?: Maybe<Scalars['String']>
  trackingNumbers?: Maybe<Array<Scalars['String']>>
  packagingType?: Maybe<Scalars['String']>
  hasLabel?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<CrPackageMeasurements>
  carrier?: Maybe<Scalars['String']>
  signatureRequired?: Maybe<Scalars['Boolean']>
  trackings?: Maybe<Array<Maybe<Tracking>>>
  id?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<PackageItem>>>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
}

export type PackageObj_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PackageObjInput = {
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shipmentId?: Maybe<Scalars['String']>
  trackingNumber?: Maybe<Scalars['String']>
  trackingNumbers?: Maybe<Array<Scalars['String']>>
  packagingType?: Maybe<Scalars['String']>
  hasLabel?: Maybe<Scalars['Boolean']>
  measurements?: Maybe<CrPackageMeasurementsInput>
  carrier?: Maybe<Scalars['String']>
  signatureRequired?: Maybe<Scalars['Boolean']>
  trackings?: Maybe<Array<Maybe<TrackingInput>>>
  id?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<PackageItemInput>>>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
}

export type PackageSettings = {
  __typename?: 'PackageSettings'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PackageSettings>
  unitType?: Maybe<Scalars['String']>
}

export type PackageSettings_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PasswordInfoInput = {
  oldPassword?: Maybe<Scalars['String']>
  newPassword?: Maybe<Scalars['String']>
  externalPassword?: Maybe<Scalars['String']>
}

export type Payment = {
  __typename?: 'Payment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Payment>
  id?: Maybe<Scalars['String']>
  groupId?: Maybe<PaymentActionTarget>
  paymentServiceTransactionId?: Maybe<Scalars['String']>
  availableActions?: Maybe<Array<Scalars['String']>>
  orderId?: Maybe<Scalars['String']>
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  externalTransactionId?: Maybe<Scalars['String']>
  billingInfo?: Maybe<BillingInfo>
  data?: Maybe<Scalars['Object']>
  status?: Maybe<Scalars['String']>
  subPayments?: Maybe<Array<Maybe<SubPayment>>>
  interactions?: Maybe<Array<Maybe<PaymentInteraction>>>
  isRecurring?: Maybe<Scalars['Boolean']>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  auditInfo?: Maybe<CrAuditInfo>
  gatewayGiftCard?: Maybe<GatewayGiftCard>
}

export type Payment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PaymentActionInput = {
  actionName?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  checkNumber?: Maybe<Scalars['String']>
  returnUrl?: Maybe<Scalars['String']>
  cancelUrl?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Float']>
  interactionDate?: Maybe<Scalars['DateTime']>
  newBillingInfo?: Maybe<BillingInfoInput>
  referenceSourcePaymentId?: Maybe<Scalars['String']>
  manualGatewayInteraction?: Maybe<PaymentGatewayInteractionInput>
  externalTransactionId?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
}

export type PaymentActionTarget = {
  __typename?: 'PaymentActionTarget'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PaymentActionTarget>
  targetType?: Maybe<Scalars['String']>
  targetId?: Maybe<Scalars['String']>
  targetNumber?: Maybe<Scalars['Int']>
}

export type PaymentActionTarget_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PaymentActionTargetInput = {
  targetType?: Maybe<Scalars['String']>
  targetId?: Maybe<Scalars['String']>
  targetNumber?: Maybe<Scalars['Int']>
}

export type PaymentCard = {
  __typename?: 'PaymentCard'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PaymentCard>
  paymentServiceCardId?: Maybe<Scalars['String']>
  isUsedRecurring?: Maybe<Scalars['Boolean']>
  nameOnCard?: Maybe<Scalars['String']>
  isCardInfoSaved?: Maybe<Scalars['Boolean']>
  isTokenized?: Maybe<Scalars['Boolean']>
  paymentOrCardType?: Maybe<Scalars['String']>
  cardNumberPartOrMask?: Maybe<Scalars['String']>
  expireMonth: Scalars['Int']
  expireYear: Scalars['Int']
  bin?: Maybe<Scalars['String']>
}

export type PaymentCard_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PaymentCardInput = {
  paymentServiceCardId?: Maybe<Scalars['String']>
  isUsedRecurring?: Maybe<Scalars['Boolean']>
  nameOnCard?: Maybe<Scalars['String']>
  isCardInfoSaved?: Maybe<Scalars['Boolean']>
  isTokenized?: Maybe<Scalars['Boolean']>
  paymentOrCardType?: Maybe<Scalars['String']>
  cardNumberPartOrMask?: Maybe<Scalars['String']>
  expireMonth: Scalars['Int']
  expireYear: Scalars['Int']
  bin?: Maybe<Scalars['String']>
}

export type PaymentCollection = {
  __typename?: 'PaymentCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PaymentCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Payment>>>
}

export type PaymentCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PaymentGatewayInteractionInput = {
  gatewayInteractionId?: Maybe<Scalars['Int']>
  gatewayTransactionId?: Maybe<Scalars['String']>
  gatewayAuthCode?: Maybe<Scalars['String']>
  gatewayAVSCodes?: Maybe<Scalars['String']>
  gatewayCVV2Codes?: Maybe<Scalars['String']>
  gatewayResponseCode?: Maybe<Scalars['String']>
  gatewayResponseText?: Maybe<Scalars['String']>
}

export type PaymentGatewayResponseData = {
  __typename?: 'PaymentGatewayResponseData'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PaymentGatewayResponseData>
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type PaymentGatewayResponseData_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PaymentGatewayResponseDataInput = {
  key?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type PaymentInput = {
  id?: Maybe<Scalars['String']>
  groupId?: Maybe<PaymentActionTargetInput>
  paymentServiceTransactionId?: Maybe<Scalars['String']>
  availableActions?: Maybe<Array<Scalars['String']>>
  orderId?: Maybe<Scalars['String']>
  paymentType?: Maybe<Scalars['String']>
  paymentWorkflow?: Maybe<Scalars['String']>
  externalTransactionId?: Maybe<Scalars['String']>
  billingInfo?: Maybe<BillingInfoInput>
  data?: Maybe<Scalars['Object']>
  status?: Maybe<Scalars['String']>
  subPayments?: Maybe<Array<Maybe<SubPaymentInput>>>
  interactions?: Maybe<Array<Maybe<PaymentInteractionInput>>>
  isRecurring?: Maybe<Scalars['Boolean']>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
  gatewayGiftCard?: Maybe<GatewayGiftCardInput>
}

export type PaymentInteraction = {
  __typename?: 'PaymentInteraction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PaymentInteraction>
  id?: Maybe<Scalars['String']>
  gatewayInteractionId?: Maybe<Scalars['Int']>
  paymentId?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  target?: Maybe<PaymentActionTarget>
  currencyCode?: Maybe<Scalars['String']>
  interactionType?: Maybe<Scalars['String']>
  checkNumber?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  paymentEntryStatus?: Maybe<Scalars['String']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isManual?: Maybe<Scalars['Boolean']>
  gatewayTransactionId?: Maybe<Scalars['String']>
  gatewayAuthCode?: Maybe<Scalars['String']>
  gatewayAVSCodes?: Maybe<Scalars['String']>
  gatewayCVV2Codes?: Maybe<Scalars['String']>
  gatewayResponseCode?: Maybe<Scalars['String']>
  gatewayResponseText?: Maybe<Scalars['String']>
  gatewayResponseData?: Maybe<Array<Maybe<PaymentGatewayResponseData>>>
  paymentTransactionInteractionIdReference?: Maybe<Scalars['Int']>
  amount?: Maybe<Scalars['Float']>
  note?: Maybe<Scalars['String']>
  interactionDate?: Maybe<Scalars['DateTime']>
  auditInfo?: Maybe<CrAuditInfo>
  returnId?: Maybe<Scalars['String']>
  refundId?: Maybe<Scalars['String']>
  capturableShipmentsSummary?: Maybe<Array<Maybe<CapturableShipmentSummary>>>
}

export type PaymentInteraction_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PaymentInteractionInput = {
  id?: Maybe<Scalars['String']>
  gatewayInteractionId?: Maybe<Scalars['Int']>
  paymentId?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  target?: Maybe<PaymentActionTargetInput>
  currencyCode?: Maybe<Scalars['String']>
  interactionType?: Maybe<Scalars['String']>
  checkNumber?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  paymentEntryStatus?: Maybe<Scalars['String']>
  isRecurring?: Maybe<Scalars['Boolean']>
  isManual?: Maybe<Scalars['Boolean']>
  gatewayTransactionId?: Maybe<Scalars['String']>
  gatewayAuthCode?: Maybe<Scalars['String']>
  gatewayAVSCodes?: Maybe<Scalars['String']>
  gatewayCVV2Codes?: Maybe<Scalars['String']>
  gatewayResponseCode?: Maybe<Scalars['String']>
  gatewayResponseText?: Maybe<Scalars['String']>
  gatewayResponseData?: Maybe<Array<Maybe<PaymentGatewayResponseDataInput>>>
  paymentTransactionInteractionIdReference?: Maybe<Scalars['Int']>
  amount?: Maybe<Scalars['Float']>
  note?: Maybe<Scalars['String']>
  interactionDate?: Maybe<Scalars['DateTime']>
  auditInfo?: Maybe<CrAuditInfoInput>
  returnId?: Maybe<Scalars['String']>
  refundId?: Maybe<Scalars['String']>
  capturableShipmentsSummary?: Maybe<
    Array<Maybe<CapturableShipmentSummaryInput>>
  >
}

export type PaymentToken = {
  __typename?: 'PaymentToken'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PaymentToken>
  paymentServiceTokenId?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type PaymentToken_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PaymentTokenInput = {
  paymentServiceTokenId?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type Pickup = {
  __typename?: 'Pickup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Pickup>
  id?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<PickupItem>>>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
}

export type Pickup_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PickupInput = {
  id?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<PickupItemInput>>>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
  availableActions?: Maybe<Array<Scalars['String']>>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
}

export type PickupItem = {
  __typename?: 'PickupItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PickupItem>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
}

export type PickupItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PickupItemInput = {
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  fulfillmentItemType?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  optionAttributeFQN?: Maybe<Scalars['String']>
}

export type PrAppliedDiscount = {
  __typename?: 'PrAppliedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrAppliedDiscount>
  couponCode?: Maybe<Scalars['String']>
  discount?: Maybe<PrDiscount>
  discounts?: Maybe<Array<Maybe<PrDiscount>>>
  impact: Scalars['Float']
}

export type PrAppliedDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PrAttributeValidation = {
  __typename?: 'PrAttributeValidation'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrAttributeValidation>
  regularExpression?: Maybe<Scalars['String']>
  minStringLength?: Maybe<Scalars['Int']>
  maxStringLength?: Maybe<Scalars['Int']>
  minNumericValue?: Maybe<Scalars['Float']>
  maxNumericValue?: Maybe<Scalars['Float']>
  minDateValue?: Maybe<Scalars['DateTime']>
  maxDateValue?: Maybe<Scalars['DateTime']>
}

export type PrAttributeValidation_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PrBundledProduct = {
  __typename?: 'PrBundledProduct'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrBundledProduct>
  content?: Maybe<ProductContent>
  productCode?: Maybe<Scalars['String']>
  goodsType?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  measurements?: Maybe<PrPackageMeasurements>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  optionAttributeFQN?: Maybe<Scalars['String']>
  optionValue?: Maybe<Scalars['Object']>
  creditValue?: Maybe<Scalars['Float']>
  productType?: Maybe<Scalars['String']>
}

export type PrBundledProduct_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PrCategory = {
  __typename?: 'PrCategory'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrCategory>
  categoryId: Scalars['Int']
  parentCategory?: Maybe<PrCategory>
  content?: Maybe<CategoryContent>
  childrenCategories?: Maybe<Array<Maybe<PrCategory>>>
  sequence?: Maybe<Scalars['Int']>
  isDisplayed?: Maybe<Scalars['Boolean']>
  categoryCode?: Maybe<Scalars['String']>
  count?: Maybe<Scalars['Int']>
  updateDate: Scalars['DateTime']
  shouldSlice?: Maybe<Scalars['Boolean']>
}

export type PrCategory_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PrDiscount = {
  __typename?: 'PrDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrDiscount>
  discountId: Scalars['Int']
  expirationDate?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  friendlyDescription?: Maybe<Scalars['String']>
  impact: Scalars['Float']
}

export type PrDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PrMeasurement = {
  __typename?: 'PrMeasurement'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrMeasurement>
  unit?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Float']>
}

export type PrMeasurement_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PrPackageMeasurements = {
  __typename?: 'PrPackageMeasurements'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PrPackageMeasurements>
  packageHeight?: Maybe<PrMeasurement>
  packageWidth?: Maybe<PrMeasurement>
  packageLength?: Maybe<PrMeasurement>
  packageWeight?: Maybe<PrMeasurement>
}

export type PrPackageMeasurements_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PriceList = {
  __typename?: 'PriceList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PriceList>
  priceListCode?: Maybe<Scalars['String']>
  priceListId: Scalars['Int']
  enabled?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  resolvable?: Maybe<Scalars['Boolean']>
  isIndexed?: Maybe<Scalars['Boolean']>
  filteredInStoreFront?: Maybe<Scalars['Boolean']>
  isSiteDefault?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  ancestors?: Maybe<Array<Maybe<PriceListNode>>>
  descendants?: Maybe<Array<Maybe<PriceListNode>>>
  validSites?: Maybe<Array<Scalars['Int']>>
}

export type PriceList_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PriceListNode = {
  __typename?: 'PriceListNode'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PriceListNode>
  priceListCode?: Maybe<Scalars['String']>
  priceListId: Scalars['Int']
  parentPriceListId?: Maybe<Scalars['Int']>
  priceListLevel: Scalars['Int']
}

export type PriceListNode_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingAppliedDiscount = {
  __typename?: 'PricingAppliedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedDiscount>
  impact: Scalars['Float']
  discount?: Maybe<PricingDiscount>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
}

export type PricingAppliedDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingAppliedLineItemProductDiscount = {
  __typename?: 'PricingAppliedLineItemProductDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedLineItemProductDiscount>
  appliesToSalePrice?: Maybe<Scalars['Boolean']>
  quantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
  isForced?: Maybe<Scalars['Boolean']>
  normalizedImpact: Scalars['Float']
  impact: Scalars['Float']
  discount?: Maybe<PricingDiscount>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
}

export type PricingAppliedLineItemProductDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingAppliedLineItemShippingDiscount = {
  __typename?: 'PricingAppliedLineItemShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedLineItemShippingDiscount>
  shippingMethodCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  impactPerUnit: Scalars['Float']
  isForced?: Maybe<Scalars['Boolean']>
  normalizedImpact: Scalars['Float']
  impact: Scalars['Float']
  discount?: Maybe<PricingDiscount>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
}

export type PricingAppliedLineItemShippingDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingAppliedOrderShippingDiscount = {
  __typename?: 'PricingAppliedOrderShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingAppliedOrderShippingDiscount>
  shippingMethodCode?: Maybe<Scalars['String']>
  impact: Scalars['Float']
  discount?: Maybe<PricingDiscount>
  couponCode?: Maybe<Scalars['String']>
  couponSetId?: Maybe<Scalars['Int']>
}

export type PricingAppliedOrderShippingDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingDiscount = {
  __typename?: 'PricingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingDiscount>
  discountId: Scalars['Int']
  name?: Maybe<Scalars['String']>
  friendlyDescription?: Maybe<Scalars['String']>
  amount: Scalars['Float']
  scope?: Maybe<Scalars['String']>
  maxRedemptions?: Maybe<Scalars['Int']>
  maximumUsesPerUser?: Maybe<Scalars['Int']>
  requiresAuthenticatedUser?: Maybe<Scalars['Boolean']>
  doesNotApplyToProductsWithSalePrice?: Maybe<Scalars['Boolean']>
  maximumRedemptionsPerOrder?: Maybe<Scalars['Int']>
  maximumDiscountValuePerOrder?: Maybe<Scalars['Float']>
  maxDiscountValuePerRedemption?: Maybe<Scalars['Float']>
  doesNotApplyToMultiShipToOrders?: Maybe<Scalars['Boolean']>
  includedPriceLists?: Maybe<Array<Scalars['String']>>
  redemptions: Scalars['Int']
  type?: Maybe<Scalars['String']>
  amountType?: Maybe<Scalars['String']>
  target?: Maybe<PricingDiscountTarget>
  condition?: Maybe<PricingDiscountCondition>
  expirationDate?: Maybe<Scalars['DateTime']>
  stackingLayer: Scalars['Int']
}

export type PricingDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingDiscountCondition = {
  __typename?: 'PricingDiscountCondition'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingDiscountCondition>
  requiresCoupon?: Maybe<Scalars['Boolean']>
  couponCode?: Maybe<Scalars['String']>
  minimumQuantityProductsRequiredInCategories?: Maybe<Scalars['Int']>
  includedCategoryIds?: Maybe<Array<Scalars['Int']>>
  excludedCategoryIds?: Maybe<Array<Scalars['Int']>>
  minimumQuantityRequiredProducts?: Maybe<Scalars['Int']>
  includedProductCodes?: Maybe<Array<Scalars['String']>>
  excludedProductCodes?: Maybe<Array<Scalars['String']>>
  paymentWorkflows?: Maybe<Array<Scalars['String']>>
  customerSegmentIds?: Maybe<Array<Scalars['Int']>>
  minimumOrderAmount?: Maybe<Scalars['Float']>
  maximumOrderAmount?: Maybe<Scalars['Float']>
  minimumLifetimeValueAmount?: Maybe<Scalars['Float']>
  startDate?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  minimumCategorySubtotalBeforeDiscounts?: Maybe<Scalars['Float']>
}

export type PricingDiscountCondition_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingDiscountTarget = {
  __typename?: 'PricingDiscountTarget'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingDiscountTarget>
  type?: Maybe<Scalars['String']>
  includedCategoryIds?: Maybe<Array<Scalars['Int']>>
  excludedCategoryIds?: Maybe<Array<Scalars['Int']>>
  includedCategoriesOperator?: Maybe<Scalars['String']>
  excludedCategoriesOperator?: Maybe<Scalars['String']>
  includedProductCodes?: Maybe<Array<Scalars['String']>>
  excludedProductCodes?: Maybe<Array<Scalars['String']>>
  includeAllProducts?: Maybe<Scalars['Boolean']>
  shippingMethods?: Maybe<Array<Scalars['String']>>
  shippingZones?: Maybe<Array<Scalars['String']>>
}

export type PricingDiscountTarget_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingProductAttribute = {
  __typename?: 'PricingProductAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingProductAttribute>
  inputType?: Maybe<Scalars['String']>
  valueType?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type PricingProductAttribute_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingProductProperty = {
  __typename?: 'PricingProductProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingProductProperty>
  attributeFQN?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<PricingProductPropertyValue>>>
  attributeDetail?: Maybe<PricingProductAttribute>
  isHidden?: Maybe<Scalars['Boolean']>
  isMultiValue?: Maybe<Scalars['Boolean']>
}

export type PricingProductProperty_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingProductPropertyValue = {
  __typename?: 'PricingProductPropertyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingProductPropertyValue>
  value?: Maybe<Scalars['Object']>
  stringValue?: Maybe<Scalars['String']>
}

export type PricingProductPropertyValue_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingTaxAttribute = {
  __typename?: 'PricingTaxAttribute'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxAttribute>
  fullyQualifiedName?: Maybe<Scalars['String']>
  attributeDefinitionId?: Maybe<Scalars['Int']>
  values?: Maybe<Array<Scalars['Object']>>
}

export type PricingTaxAttribute_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingTaxContext = {
  __typename?: 'PricingTaxContext'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxContext>
  taxContextId?: Maybe<Scalars['String']>
  customerId?: Maybe<Scalars['String']>
  taxExemptId?: Maybe<Scalars['String']>
  originAddress?: Maybe<CrAddress>
  destinationAddress?: Maybe<CrAddress>
}

export type PricingTaxContext_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingTaxableLineItem = {
  __typename?: 'PricingTaxableLineItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxableLineItem>
  id?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  variantProductCode?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  productProperties?: Maybe<Array<Maybe<PricingProductProperty>>>
  quantity: Scalars['Int']
  lineItemPrice: Scalars['Float']
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  shippingAmount: Scalars['Float']
  handlingAmount?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  isTaxable?: Maybe<Scalars['Boolean']>
  reason?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  productDiscount?: Maybe<PricingAppliedLineItemProductDiscount>
  shippingDiscount?: Maybe<PricingAppliedLineItemShippingDiscount>
  productDiscounts?: Maybe<Array<Maybe<PricingAppliedLineItemProductDiscount>>>
  shippingDiscounts?: Maybe<
    Array<Maybe<PricingAppliedLineItemShippingDiscount>>
  >
  originAddress?: Maybe<CrAddress>
  destinationAddress?: Maybe<CrAddress>
}

export type PricingTaxableLineItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PricingTaxableOrder = {
  __typename?: 'PricingTaxableOrder'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PricingTaxableOrder>
  orderDate: Scalars['DateTime']
  taxContext?: Maybe<PricingTaxContext>
  lineItems?: Maybe<Array<Maybe<PricingTaxableLineItem>>>
  shippingAmount: Scalars['Float']
  currencyCode?: Maybe<Scalars['String']>
  handlingFee: Scalars['Float']
  originalDocumentCode?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  orderNumber?: Maybe<Scalars['Int']>
  originalOrderDate: Scalars['DateTime']
  data?: Maybe<Scalars['Object']>
  attributes?: Maybe<Array<Maybe<PricingTaxAttribute>>>
  shippingDiscounts?: Maybe<Array<Maybe<PricingAppliedOrderShippingDiscount>>>
  shippingDiscount?: Maybe<PricingAppliedOrderShippingDiscount>
  orderDiscounts?: Maybe<Array<Maybe<PricingAppliedDiscount>>>
  orderDiscount?: Maybe<PricingAppliedDiscount>
  handlingDiscounts?: Maybe<Array<Maybe<PricingAppliedDiscount>>>
  handlingDiscount?: Maybe<PricingAppliedDiscount>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  taxRequestType?: Maybe<Scalars['String']>
}

export type PricingTaxableOrder_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Product = {
  __typename?: 'Product'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Product>
  productCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  productSequence?: Maybe<Scalars['Int']>
  productUsage?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  bundledProducts?: Maybe<Array<Maybe<PrBundledProduct>>>
  content?: Maybe<ProductContent>
  purchasableState?: Maybe<ProductPurchasableState>
  isActive?: Maybe<Scalars['Boolean']>
  publishState?: Maybe<Scalars['String']>
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  productType?: Maybe<Scalars['String']>
  productTypeId?: Maybe<Scalars['Int']>
  isTaxable?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  createDate: Scalars['DateTime']
  updateDate: Scalars['DateTime']
  dateFirstAvailableInCatalog?: Maybe<Scalars['DateTime']>
  catalogStartDate?: Maybe<Scalars['DateTime']>
  catalogEndDate?: Maybe<Scalars['DateTime']>
  daysAvailableInCatalog?: Maybe<Scalars['Int']>
  upc?: Maybe<Scalars['String']>
  upCs?: Maybe<Array<Scalars['String']>>
  mfgPartNumber?: Maybe<Scalars['String']>
  mfgPartNumbers?: Maybe<Array<Scalars['String']>>
  variationProductCode?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  measurements?: Maybe<PrPackageMeasurements>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  options?: Maybe<Array<Maybe<ProductOption>>>
  variations?: Maybe<Array<Maybe<VariationSummary>>>
  validPriceLists?: Maybe<Array<Scalars['String']>>
  locationsInStock?: Maybe<Array<Scalars['String']>>
  slicingAttributeFQN?: Maybe<Scalars['String']>
  productImageGroups?: Maybe<Array<Maybe<ProductImageGroup>>>
  sliceValue?: Maybe<Scalars['String']>
  productCollections?: Maybe<Array<Maybe<ProductCollectionInfo>>>
  productCollectionMembers?: Maybe<Array<Maybe<ProductCollectionMember>>>
  collectionMembersProductContent?: Maybe<Array<Maybe<ProductContent>>>
  score: Scalars['Float']
  personalizationScore: Scalars['Float']
}

export type Product_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductPropertiesArgs = {
  filterAttribute?: Maybe<Scalars['String']>
  filterOperator?: Maybe<Scalars['String']>
  filterValue?: Maybe<Scalars['Object']>
}

export type ProductCollection = {
  __typename?: 'ProductCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollection>
  nextCursorMark?: Maybe<Scalars['String']>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Product>>>
}

export type ProductCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductCollectionInfo = {
  __typename?: 'ProductCollectionInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollectionInfo>
  productCode?: Maybe<Scalars['String']>
  isPrimary?: Maybe<Scalars['Boolean']>
}

export type ProductCollectionInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductCollectionMember = {
  __typename?: 'ProductCollectionMember'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollectionMember>
  memberKey?: Maybe<ProductCollectionMemberKey>
}

export type ProductCollectionMember_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductCollectionMemberKey = {
  __typename?: 'ProductCollectionMemberKey'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCollectionMemberKey>
  value?: Maybe<Scalars['String']>
}

export type ProductCollectionMemberKey_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductContent = {
  __typename?: 'ProductContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductContent>
  productName?: Maybe<Scalars['String']>
  productFullDescription?: Maybe<Scalars['String']>
  productShortDescription?: Maybe<Scalars['String']>
  metaTagTitle?: Maybe<Scalars['String']>
  metaTagDescription?: Maybe<Scalars['String']>
  metaTagKeywords?: Maybe<Scalars['String']>
  seoFriendlyUrl?: Maybe<Scalars['String']>
  productImages?: Maybe<Array<Maybe<ProductImage>>>
}

export type ProductContent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductCost = {
  __typename?: 'ProductCost'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCost>
  productCode?: Maybe<Scalars['String']>
  cost: Scalars['Float']
}

export type ProductCost_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductCostCollection = {
  __typename?: 'ProductCostCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductCostCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<ProductCost>>>
}

export type ProductCostCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductCostQueryInput = {
  productCodes?: Maybe<Array<Scalars['String']>>
}

export type ProductForIndexing = {
  __typename?: 'ProductForIndexing'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductForIndexing>
  slices?: Maybe<Array<Maybe<Product>>>
  productCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  productSequence?: Maybe<Scalars['Int']>
  productUsage?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  bundledProducts?: Maybe<Array<Maybe<PrBundledProduct>>>
  content?: Maybe<ProductContent>
  purchasableState?: Maybe<ProductPurchasableState>
  isActive?: Maybe<Scalars['Boolean']>
  publishState?: Maybe<Scalars['String']>
  price?: Maybe<ProductPrice>
  priceRange?: Maybe<ProductPriceRange>
  volumePriceBands?: Maybe<Array<Maybe<ProductVolumePrice>>>
  volumePriceRange?: Maybe<ProductPriceRange>
  availableShippingDiscounts?: Maybe<Array<Maybe<PrDiscount>>>
  productType?: Maybe<Scalars['String']>
  productTypeId?: Maybe<Scalars['Int']>
  isTaxable?: Maybe<Scalars['Boolean']>
  isRecurring?: Maybe<Scalars['Boolean']>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  createDate: Scalars['DateTime']
  updateDate: Scalars['DateTime']
  dateFirstAvailableInCatalog?: Maybe<Scalars['DateTime']>
  catalogStartDate?: Maybe<Scalars['DateTime']>
  catalogEndDate?: Maybe<Scalars['DateTime']>
  daysAvailableInCatalog?: Maybe<Scalars['Int']>
  upc?: Maybe<Scalars['String']>
  upCs?: Maybe<Array<Scalars['String']>>
  mfgPartNumber?: Maybe<Scalars['String']>
  mfgPartNumbers?: Maybe<Array<Scalars['String']>>
  variationProductCode?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  measurements?: Maybe<PrPackageMeasurements>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  options?: Maybe<Array<Maybe<ProductOption>>>
  variations?: Maybe<Array<Maybe<VariationSummary>>>
  validPriceLists?: Maybe<Array<Scalars['String']>>
  locationsInStock?: Maybe<Array<Scalars['String']>>
  slicingAttributeFQN?: Maybe<Scalars['String']>
  productImageGroups?: Maybe<Array<Maybe<ProductImageGroup>>>
  sliceValue?: Maybe<Scalars['String']>
  productCollections?: Maybe<Array<Maybe<ProductCollectionInfo>>>
  productCollectionMembers?: Maybe<Array<Maybe<ProductCollectionMember>>>
  collectionMembersProductContent?: Maybe<Array<Maybe<ProductContent>>>
  score: Scalars['Float']
  personalizationScore: Scalars['Float']
}

export type ProductForIndexing_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductImage = {
  __typename?: 'ProductImage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductImage>
  imageLabel?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  cmsId?: Maybe<Scalars['String']>
  videoUrl?: Maybe<Scalars['String']>
  mediaType?: Maybe<Scalars['String']>
  sequence?: Maybe<Scalars['Int']>
  productImageGroupId?: Maybe<Scalars['String']>
}

export type ProductImage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductImageGroup = {
  __typename?: 'ProductImageGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductImageGroup>
  productImageGroupId: Scalars['String']
  productImageGroupTags?: Maybe<Array<Maybe<ProductImageGroupTag>>>
}

export type ProductImageGroup_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductImageGroupTag = {
  __typename?: 'ProductImageGroupTag'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductImageGroupTag>
  attributeFqn?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ProductImageGroupTag_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductInventoryInfo = {
  __typename?: 'ProductInventoryInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductInventoryInfo>
  manageStock?: Maybe<Scalars['Boolean']>
  outOfStockBehavior?: Maybe<Scalars['String']>
  onlineStockAvailable?: Maybe<Scalars['Int']>
  onlineSoftStockAvailable?: Maybe<Scalars['Int']>
  onlineLocationCode?: Maybe<Scalars['String']>
  availableDate?: Maybe<Scalars['DateTime']>
}

export type ProductInventoryInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductOption = {
  __typename?: 'ProductOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductOption>
  attributeFQN?: Maybe<Scalars['String']>
  isRequired?: Maybe<Scalars['Boolean']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  values?: Maybe<Array<Maybe<ProductOptionValue>>>
  attributeDetail?: Maybe<AttributeDetail>
  isProductImageGroupSelector?: Maybe<Scalars['Boolean']>
}

export type ProductOption_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductOptionSelectionInput = {
  attributeFQN?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
  attributeValueId?: Maybe<Scalars['Int']>
  shopperEnteredValue?: Maybe<Scalars['Object']>
}

export type ProductOptionSelectionsInput = {
  variationProductCode?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<ProductOptionSelectionInput>>>
}

export type ProductOptionValue = {
  __typename?: 'ProductOptionValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductOptionValue>
  value?: Maybe<Scalars['Object']>
  attributeValueId: Scalars['Int']
  stringValue?: Maybe<Scalars['String']>
  isEnabled?: Maybe<Scalars['Boolean']>
  isSelected?: Maybe<Scalars['Boolean']>
  isDefault?: Maybe<Scalars['Boolean']>
  deltaWeight?: Maybe<Scalars['Float']>
  deltaPrice?: Maybe<Scalars['Float']>
  shopperEnteredValue?: Maybe<Scalars['Object']>
  bundledProduct?: Maybe<PrBundledProduct>
  displayInfo?: Maybe<AttributeVocabularyValueDisplayInfo>
}

export type ProductOptionValue_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductPrice = {
  __typename?: 'ProductPrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPrice>
  msrp?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  priceType?: Maybe<Scalars['String']>
  salePrice?: Maybe<Scalars['Float']>
  salePriceType?: Maybe<Scalars['String']>
  catalogSalePrice?: Maybe<Scalars['Float']>
  catalogListPrice?: Maybe<Scalars['Float']>
  discount?: Maybe<PrAppliedDiscount>
  creditValue?: Maybe<Scalars['Float']>
  effectivePricelistCode?: Maybe<Scalars['String']>
  priceListEntryCode?: Maybe<Scalars['String']>
  priceListEntryMode?: Maybe<Scalars['String']>
}

export type ProductPrice_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductPriceRange = {
  __typename?: 'ProductPriceRange'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPriceRange>
  lower?: Maybe<ProductPrice>
  upper?: Maybe<ProductPrice>
}

export type ProductPriceRange_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductPricingBehaviorInfo = {
  __typename?: 'ProductPricingBehaviorInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPricingBehaviorInfo>
  discountsRestricted?: Maybe<Scalars['Boolean']>
  discountsRestrictedStartDate?: Maybe<Scalars['DateTime']>
  discountsRestrictedEndDate?: Maybe<Scalars['DateTime']>
}

export type ProductPricingBehaviorInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductProperty = {
  __typename?: 'ProductProperty'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductProperty>
  attributeFQN?: Maybe<Scalars['String']>
  isHidden?: Maybe<Scalars['Boolean']>
  isMultiValue?: Maybe<Scalars['Boolean']>
  attributeDetail?: Maybe<AttributeDetail>
  values?: Maybe<Array<Maybe<ProductPropertyValue>>>
  propertyType?: Maybe<Scalars['String']>
}

export type ProductProperty_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductPropertyValue = {
  __typename?: 'ProductPropertyValue'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPropertyValue>
  value?: Maybe<Scalars['Object']>
  stringValue?: Maybe<Scalars['String']>
  displayInfo?: Maybe<AttributeVocabularyValueDisplayInfo>
}

export type ProductPropertyValue_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductPurchasableState = {
  __typename?: 'ProductPurchasableState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductPurchasableState>
  isPurchasable?: Maybe<Scalars['Boolean']>
  messages?: Maybe<Array<Maybe<ValidationMessage>>>
}

export type ProductPurchasableState_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductSearchRandomAccessCursor = {
  __typename?: 'ProductSearchRandomAccessCursor'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductSearchRandomAccessCursor>
  cursorMarks?: Maybe<Array<Scalars['String']>>
}

export type ProductSearchRandomAccessCursor_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductSearchResult = {
  __typename?: 'ProductSearchResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductSearchResult>
  facets?: Maybe<Array<Maybe<Facet>>>
  solrDebugInfo?: Maybe<SolrDebugInfo>
  searchRedirect?: Maybe<Scalars['String']>
  searchEngine?: Maybe<Scalars['String']>
  nextCursorMark?: Maybe<Scalars['String']>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Product>>>
}

export type ProductSearchResult_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductStock = {
  __typename?: 'ProductStock'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductStock>
  manageStock?: Maybe<Scalars['Boolean']>
  isOnBackOrder?: Maybe<Scalars['Boolean']>
  availableDate?: Maybe<Scalars['DateTime']>
  stockAvailable?: Maybe<Scalars['Int']>
  aggregateInventory?: Maybe<Scalars['Int']>
}

export type ProductStock_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductStockInput = {
  manageStock?: Maybe<Scalars['Boolean']>
  isOnBackOrder?: Maybe<Scalars['Boolean']>
  availableDate?: Maybe<Scalars['DateTime']>
  stockAvailable?: Maybe<Scalars['Int']>
  aggregateInventory?: Maybe<Scalars['Int']>
}

export type ProductValidationSummary = {
  __typename?: 'ProductValidationSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductValidationSummary>
  productCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  productUsage?: Maybe<Scalars['String']>
  fulfillmentTypesSupported?: Maybe<Array<Scalars['String']>>
  goodsType?: Maybe<Scalars['String']>
  bundledProducts?: Maybe<Array<Maybe<BundledProductSummary>>>
  upc?: Maybe<Scalars['String']>
  mfgPartNumber?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  purchasableState?: Maybe<ProductPurchasableState>
  price?: Maybe<ProductPrice>
  measurements?: Maybe<PrPackageMeasurements>
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  image?: Maybe<ProductImage>
  productShortDescription?: Maybe<Scalars['String']>
  productName?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Maybe<PrCategory>>>
  properties?: Maybe<Array<Maybe<ProductProperty>>>
  pricingBehavior?: Maybe<ProductPricingBehaviorInfo>
  inventoryInfo?: Maybe<ProductInventoryInfo>
  isTaxable?: Maybe<Scalars['Boolean']>
  productType?: Maybe<Scalars['String']>
}

export type ProductValidationSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ProductVolumePrice = {
  __typename?: 'ProductVolumePrice'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ProductVolumePrice>
  isCurrent?: Maybe<Scalars['Boolean']>
  minQty: Scalars['Int']
  maxQty?: Maybe<Scalars['Int']>
  priceRange?: Maybe<ProductPriceRange>
  price?: Maybe<ProductPrice>
}

export type ProductVolumePrice_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Property = {
  __typename?: 'Property'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Property>
  name?: Maybe<Scalars['String']>
  isRequired?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  propertyType?: Maybe<PropertyType>
}

export type Property_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PropertyInput = {
  name?: Maybe<Scalars['String']>
  isRequired?: Maybe<Scalars['Boolean']>
  isMultiValued?: Maybe<Scalars['Boolean']>
  propertyType?: Maybe<PropertyTypeInput>
}

export type PropertyType = {
  __typename?: 'PropertyType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PropertyType>
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  propertyTypeFQN?: Maybe<Scalars['String']>
  adminName?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  isQueryable?: Maybe<Scalars['Boolean']>
  isSortable?: Maybe<Scalars['Boolean']>
  isAggregatable?: Maybe<Scalars['Boolean']>
}

export type PropertyType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PropertyTypeCollection = {
  __typename?: 'PropertyTypeCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PropertyTypeCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<PropertyType>>>
}

export type PropertyTypeCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PropertyTypeInput = {
  name?: Maybe<Scalars['String']>
  namespace?: Maybe<Scalars['String']>
  propertyTypeFQN?: Maybe<Scalars['String']>
  adminName?: Maybe<Scalars['String']>
  installationPackage?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
  dataType?: Maybe<Scalars['String']>
  isQueryable?: Maybe<Scalars['Boolean']>
  isSortable?: Maybe<Scalars['Boolean']>
  isAggregatable?: Maybe<Scalars['Boolean']>
}

export type PurchaseOrderCustomField = {
  __typename?: 'PurchaseOrderCustomField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PurchaseOrderCustomField>
  code?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type PurchaseOrderCustomField_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PurchaseOrderCustomFieldInput = {
  code?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type PurchaseOrderPayment = {
  __typename?: 'PurchaseOrderPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PurchaseOrderPayment>
  purchaseOrderNumber?: Maybe<Scalars['String']>
  paymentTerm?: Maybe<PurchaseOrderPaymentTerm>
  customFields?: Maybe<Array<Maybe<PurchaseOrderCustomField>>>
}

export type PurchaseOrderPayment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PurchaseOrderPaymentInput = {
  purchaseOrderNumber?: Maybe<Scalars['String']>
  paymentTerm?: Maybe<PurchaseOrderPaymentTermInput>
  customFields?: Maybe<Array<Maybe<PurchaseOrderCustomFieldInput>>>
}

export type PurchaseOrderPaymentTerm = {
  __typename?: 'PurchaseOrderPaymentTerm'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PurchaseOrderPaymentTerm>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type PurchaseOrderPaymentTerm_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PurchaseOrderPaymentTermInput = {
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type PurchaseOrderTransaction = {
  __typename?: 'PurchaseOrderTransaction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PurchaseOrderTransaction>
  customerPurchaseOrderAccountId: Scalars['Int']
  externalId?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  transactionDate: Scalars['DateTime']
  orderId?: Maybe<Scalars['String']>
  purchaseOrderNumber?: Maybe<Scalars['String']>
  transactionAmount: Scalars['Float']
  creditLimit: Scalars['Float']
  additionalTransactionDetail?: Maybe<Scalars['String']>
  availableBalance: Scalars['Float']
  transactionTypeId: Scalars['Int']
  transactionDescription?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfo>
}

export type PurchaseOrderTransaction_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PurchaseOrderTransactionCollection = {
  __typename?: 'PurchaseOrderTransactionCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<PurchaseOrderTransactionCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<PurchaseOrderTransaction>>>
}

export type PurchaseOrderTransactionCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type PurchaseOrderTransactionInput = {
  customerPurchaseOrderAccountId: Scalars['Int']
  externalId?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  transactionDate: Scalars['DateTime']
  orderId?: Maybe<Scalars['String']>
  purchaseOrderNumber?: Maybe<Scalars['String']>
  transactionAmount: Scalars['Float']
  creditLimit: Scalars['Float']
  additionalTransactionDetail?: Maybe<Scalars['String']>
  availableBalance: Scalars['Float']
  transactionTypeId: Scalars['Int']
  transactionDescription?: Maybe<Scalars['String']>
  author?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CuAuditInfoInput>
}

export type Query = {
  __typename?: 'Query'
  customerAccountAttributeDefinitions?: Maybe<CuAttributeCollection>
  customerAccountAttributeVocabularyValues?: Maybe<
    Array<Maybe<CuAttributeVocabularyValue>>
  >
  customerAccountAttributeDefinition?: Maybe<CuAttribute>
  b2bAccountAttributes?: Maybe<CustomerAttributeCollection>
  b2bAccountAttributeVocabularyValues?: Maybe<CustomerAttribute>
  b2bAccounts?: Maybe<B2BAccountCollection>
  b2bAccount?: Maybe<B2BAccount>
  b2bAccountUsers?: Maybe<B2BUserCollection>
  b2bAccountUserRoles?: Maybe<UserRoleCollection>
  customerCreditAuditTrail?: Maybe<CreditAuditEntryCollection>
  customerCredits?: Maybe<CreditCollection>
  customerCredit?: Maybe<Credit>
  customerCreditTransactions?: Maybe<CreditTransactionCollection>
  customerAccountAttributes?: Maybe<CustomerAttributeCollection>
  customerAccountAttribute?: Maybe<CustomerAttribute>
  customerAccountCards?: Maybe<CardCollection>
  customerAccountCard?: Maybe<Card>
  customerAccountContacts?: Maybe<CustomerContactCollection>
  customerAccountContact?: Maybe<CustomerContact>
  customerAccounts?: Maybe<CustomerAccountCollection>
  customerAccount?: Maybe<CustomerAccount>
  getCurrentAccount?: Maybe<CustomerAccount>
  customerAccountTransactions?: Maybe<Array<Maybe<Transaction>>>
  customerAccountNotes?: Maybe<CustomerNoteCollection>
  customerAccountNote?: Maybe<CustomerNote>
  customerAccountSegments?: Maybe<CustomerSegmentCollection>
  customerAccountAuditLog?: Maybe<CustomerAuditEntryCollection>
  customerPurchaseOrderAccount?: Maybe<CustomerPurchaseOrderAccount>
  customerPurchaseOrderAccountTransaction?: Maybe<PurchaseOrderTransactionCollection>
  customerAccountLoginState?: Maybe<LoginState>
  customerSegments?: Maybe<CustomerSegmentCollection>
  customerSegment?: Maybe<CustomerSegment>
  customerSets?: Maybe<CustomerSetCollection>
  customerSet?: Maybe<CustomerSet>
  inStockNotifications?: Maybe<InStockNotificationSubscriptionCollection>
  inStockNotification?: Maybe<InStockNotificationSubscription>
  authTicket?: Maybe<CustomerAuthTicket>
  exchangeRates?: Maybe<Array<Maybe<CurrencyExchangeRate>>>
  resolvedPriceList?: Maybe<ResolvedPriceList>
  categoriesTree?: Maybe<CategoryCollection>
  categories?: Maybe<CategoryPagedCollection>
  category?: Maybe<PrCategory>
  products?: Maybe<ProductCollection>
  product?: Maybe<Product>
  productVersion?: Maybe<ProductForIndexing>
  productLocationInventory?: Maybe<LocationInventoryCollection>
  suggestionSearch?: Maybe<SearchSuggestionResult>
  productSearchRandomAccessCursor?: Maybe<ProductSearchRandomAccessCursor>
  productSearch?: Maybe<ProductSearchResult>
  priceList?: Maybe<PriceList>
  cartsSummary?: Maybe<CartSummary>
  userCartSummary?: Maybe<CartSummary>
  cartSummary?: Maybe<CartSummary>
  userCart?: Maybe<Cart>
  currentCart?: Maybe<Cart>
  cart?: Maybe<Cart>
  currentCartExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  currentCartItems?: Maybe<CartItemCollection>
  cartItems?: Maybe<CartItemCollection>
  currentCartItem?: Maybe<CartItem>
  cartItem?: Maybe<CartItem>
  currentCartMessages?: Maybe<CartChangeMessageCollection>
  channels?: Maybe<ChannelCollection>
  channel?: Maybe<Channel>
  channelGroups?: Maybe<ChannelGroupCollection>
  channelGroup?: Maybe<ChannelGroup>
  checkoutAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  checkout?: Maybe<Checkout>
  checkouts?: Maybe<CheckoutCollection>
  checkoutShippingMethods?: Maybe<Array<Maybe<CheckoutGroupRates>>>
  checkoutActions?: Maybe<Array<Maybe<Scalars['String']>>>
  checkoutDestination?: Maybe<Destination>
  checkoutDestinations?: Maybe<Array<Maybe<Destination>>>
  orderPackageActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderPaymentActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderPayment?: Maybe<Payment>
  orderPayments?: Maybe<PaymentCollection>
  orderPickup?: Maybe<Pickup>
  orderPickupActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderReturnableItems?: Maybe<OrderReturnableItemCollection>
  orderShipment?: Maybe<Shipment>
  orderShipmentMethods?: Maybe<Array<Maybe<ShippingRate>>>
  orderValidationResults?: Maybe<Array<Maybe<OrderValidationResult>>>
  orderAttributes?: Maybe<Array<Maybe<OrderAttribute>>>
  orderBillingInfo?: Maybe<BillingInfo>
  orderCancelReasons?: Maybe<CancelReasonCollection>
  orders?: Maybe<OrderCollection>
  order?: Maybe<Order>
  orderActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderTaxableOrders?: Maybe<Array<Maybe<PricingTaxableOrder>>>
  orderDigitalPackage?: Maybe<DigitalPackage>
  orderDigitalPackageActions?: Maybe<Array<Maybe<Scalars['String']>>>
  orderExtendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  orderFulfillmentInfo?: Maybe<FulfillmentInfo>
  orderItems?: Maybe<OrderItemCollection>
  orderNotes?: Maybe<Array<Maybe<OrderNote>>>
  orderNote?: Maybe<OrderNote>
  orderPackage?: Maybe<PackageObj>
  orderPackageLabel?: Maybe<Scalars['Boolean']>
  quote?: Maybe<Quote>
  quotes?: Maybe<QuoteCollection>
  customerAccountQuote?: Maybe<Quote>
  quoteItems?: Maybe<Array<Maybe<CrOrderItem>>>
  customerAccountQuoteItems?: Maybe<Array<Maybe<CrOrderItem>>>
  quoteItem?: Maybe<CrOrderItem>
  returns?: Maybe<ReturnCollection>
  returnReasons?: Maybe<ReasonCollection>
  returnReason?: Maybe<ReturnObj>
  returnActions?: Maybe<Array<Maybe<Scalars['String']>>>
  returnPayments?: Maybe<PaymentCollection>
  returnPayment?: Maybe<Payment>
  returnPaymentActions?: Maybe<Array<Maybe<Scalars['String']>>>
  returnShippingLabel?: Maybe<CarrierServiceGenerateLabelResponse>
  returnItems?: Maybe<ReturnItemCollection>
  returnItem?: Maybe<ReturnItem>
  returnNotes?: Maybe<Array<Maybe<OrderNote>>>
  returnNote?: Maybe<OrderNote>
  returnPackage?: Maybe<PackageObj>
  returnPackageLabel?: Maybe<Scalars['Boolean']>
  returnShipment?: Maybe<Shipment>
  wishlists?: Maybe<WishlistCollection>
  wishlist?: Maybe<Wishlist>
  customerWishlist?: Maybe<Wishlist>
  wishlistItems?: Maybe<WishlistItemCollection>
  customerWishlistItems?: Maybe<WishlistItemCollection>
  wishlistItem?: Maybe<WishlistItem>
  orderItem?: Maybe<CrOrderItem>
  documentListDocumentContent?: Maybe<Scalars['Boolean']>
  documentListDocumentTransform?: Maybe<Scalars['Boolean']>
  documentListTreeDocumentContent?: Maybe<Scalars['Boolean']>
  documentListTreeDocumentTransform?: Maybe<Scalars['Boolean']>
  documentListDocuments?: Maybe<DocumentCollection>
  documentListDocument?: Maybe<Document>
  documentListTreeDocument?: Maybe<Document>
  documentLists?: Maybe<DocumentListCollection>
  documentList?: Maybe<DocumentList>
  documentListViewDocuments?: Maybe<DocumentCollection>
  documentListTypes?: Maybe<DocumentListTypeCollection>
  documentListType?: Maybe<DocumentListType>
  documentDrafts?: Maybe<DocumentDraftSummaryPagedCollection>
  documentTypes?: Maybe<DocumentTypeCollection>
  documentType?: Maybe<DocumentType>
  propertyTypes?: Maybe<PropertyTypeCollection>
  propertyType?: Maybe<PropertyType>
  adminLocations?: Maybe<LocationCollection>
  adminLocation?: Maybe<Location>
  adminLocationAttributes?: Maybe<LoAttributeCollection>
  adminLocationAttributeVocabularyValues?: Maybe<
    Array<Maybe<LoAttributeVocabularyValue>>
  >
  adminLocationAttribute?: Maybe<LoAttribute>
  adminLocationGroups?: Maybe<LocationGroupCollection>
  dslLocation?: Maybe<Location>
  spLocations?: Maybe<LocationCollection>
  spLocation?: Maybe<Location>
  usageTypeLocations?: Maybe<LocationCollection>
  location?: Maybe<Location>
  locationUsages?: Maybe<LocationUsageCollection>
  locationUsage?: Maybe<LocationUsage>
  adminLocationTypes?: Maybe<Array<Maybe<LocationType>>>
  adminLocationType?: Maybe<LocationType>
  locationGroupConfig?: Maybe<LocationGroupConfiguration>
  locationGroup?: Maybe<LocationGroup>
  entityListEntity?: Maybe<Scalars['Boolean']>
  entityListEntities?: Maybe<EntityCollection>
  entityListEntityContainer?: Maybe<EntityContainer>
  entityListEntityContainers?: Maybe<EntityContainerCollection>
  entityList?: Maybe<EntityList>
  entityLists?: Maybe<EntityListCollection>
  entityListViews?: Maybe<ListViewCollection>
  entityListView?: Maybe<ListView>
  entityListViewEntityContainers?: Maybe<EntityContainerCollection>
  entityListViewEntities?: Maybe<EntityCollection>
  entityListViewEntityContainer?: Maybe<EntityContainer>
  entityListViewEntity?: Maybe<Scalars['Boolean']>
  carrierLocaleServiceTypes?: Maybe<Array<Maybe<ServiceType>>>
  localeServiceTypes?: Maybe<Array<Maybe<ServiceType>>>
  targetRules?: Maybe<TargetRuleCollection>
  targetRule?: Maybe<TargetRule>
  orderRoutingRoutingSuggestionLog?: Maybe<Array<Maybe<JsonNode>>>
}

export type QueryCustomerAccountAttributeDefinitionsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountAttributeVocabularyValuesArgs = {
  attributeFQN: Scalars['String']
}

export type QueryCustomerAccountAttributeDefinitionArgs = {
  attributeFQN: Scalars['String']
}

export type QueryB2bAccountAttributesArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryB2bAccountAttributeVocabularyValuesArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
}

export type QueryB2bAccountsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  fields?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
  qLimit?: Maybe<Scalars['Int']>
}

export type QueryB2bAccountArgs = {
  accountId: Scalars['Int']
}

export type QueryB2bAccountUsersArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
  qLimit?: Maybe<Scalars['Int']>
}

export type QueryB2bAccountUserRolesArgs = {
  accountId: Scalars['Int']
  userId: Scalars['String']
}

export type QueryCustomerCreditAuditTrailArgs = {
  code: Scalars['String']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerCreditsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerCreditArgs = {
  code: Scalars['String']
}

export type QueryCustomerCreditTransactionsArgs = {
  code: Scalars['String']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountAttributesArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountAttributeArgs = {
  accountId: Scalars['Int']
  attributeFQN: Scalars['String']
  userId?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountCardsArgs = {
  accountId: Scalars['Int']
}

export type QueryCustomerAccountCardArgs = {
  accountId: Scalars['Int']
  cardId: Scalars['String']
}

export type QueryCustomerAccountContactsArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountContactArgs = {
  accountId: Scalars['Int']
  contactId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  fields?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
  qLimit?: Maybe<Scalars['Int']>
  isAnonymous?: Maybe<Scalars['Boolean']>
}

export type QueryCustomerAccountArgs = {
  accountId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountTransactionsArgs = {
  accountId: Scalars['Int']
}

export type QueryCustomerAccountNotesArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountNoteArgs = {
  accountId: Scalars['Int']
  noteId: Scalars['Int']
}

export type QueryCustomerAccountSegmentsArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountAuditLogArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerPurchaseOrderAccountArgs = {
  accountId: Scalars['Int']
}

export type QueryCustomerPurchaseOrderAccountTransactionArgs = {
  accountId: Scalars['Int']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountLoginStateArgs = {
  accountId: Scalars['Int']
  userId?: Maybe<Scalars['String']>
}

export type QueryCustomerSegmentsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerSegmentArgs = {
  id: Scalars['Int']
}

export type QueryCustomerSetsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
}

export type QueryCustomerSetArgs = {
  code: Scalars['String']
}

export type QueryInStockNotificationsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryInStockNotificationArgs = {
  id: Scalars['Int']
}

export type QueryAuthTicketArgs = {
  accountId?: Maybe<Scalars['Int']>
}

export type QueryResolvedPriceListArgs = {
  customerAccountId?: Maybe<Scalars['Int']>
}

export type QueryCategoriesArgs = {
  filter?: Maybe<Scalars['String']>
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
}

export type QueryCategoryArgs = {
  categoryId: Scalars['Int']
  allowInactive?: Maybe<Scalars['Boolean']>
}

export type QueryProductsArgs = {
  filter?: Maybe<Scalars['String']>
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  responseOptions?: Maybe<Scalars['String']>
  cursorMark?: Maybe<Scalars['String']>
  defaultSort?: Maybe<Scalars['String']>
  mid?: Maybe<Scalars['String']>
  includeAllImages?: Maybe<Scalars['Boolean']>
}

export type QueryProductArgs = {
  productCode: Scalars['String']
  variationProductCode?: Maybe<Scalars['String']>
  allowInactive?: Maybe<Scalars['Boolean']>
  skipInventoryCheck?: Maybe<Scalars['Boolean']>
  supressOutOfStock404?: Maybe<Scalars['Boolean']>
  quantity?: Maybe<Scalars['Int']>
  acceptVariantProductCode?: Maybe<Scalars['Boolean']>
  purchaseLocation?: Maybe<Scalars['String']>
  variationProductCodeFilter?: Maybe<Scalars['String']>
  sliceValue?: Maybe<Scalars['String']>
  includeAllImages?: Maybe<Scalars['Boolean']>
}

export type QueryProductVersionArgs = {
  productCode: Scalars['String']
  productVersion?: Maybe<Scalars['Int']>
  lastModifiedDate?: Maybe<Scalars['DateTime']>
}

export type QueryProductLocationInventoryArgs = {
  productCode: Scalars['String']
  locationCodes?: Maybe<Scalars['String']>
}

export type QuerySuggestionSearchArgs = {
  query?: Maybe<Scalars['String']>
  groups?: Maybe<Scalars['String']>
  pageSize?: Maybe<Scalars['Int']>
  mid?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryProductSearchRandomAccessCursorArgs = {
  query?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  pageSize?: Maybe<Scalars['Int']>
}

export type QueryProductSearchArgs = {
  query?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  facetTemplate?: Maybe<Scalars['String']>
  facetTemplateSubset?: Maybe<Scalars['String']>
  facet?: Maybe<Scalars['String']>
  facetFieldRangeQuery?: Maybe<Scalars['String']>
  facetHierPrefix?: Maybe<Scalars['String']>
  facetHierValue?: Maybe<Scalars['String']>
  facetHierDepth?: Maybe<Scalars['String']>
  facetStartIndex?: Maybe<Scalars['String']>
  facetPageSize?: Maybe<Scalars['String']>
  facetSettings?: Maybe<Scalars['String']>
  facetValueFilter?: Maybe<Scalars['String']>
  sortBy?: Maybe<Scalars['String']>
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  searchSettings?: Maybe<Scalars['String']>
  enableSearchTuningRules?: Maybe<Scalars['Boolean']>
  searchTuningRuleContext?: Maybe<Scalars['String']>
  searchTuningRuleCode?: Maybe<Scalars['String']>
  facetTemplateExclude?: Maybe<Scalars['String']>
  facetPrefix?: Maybe<Scalars['String']>
  responseOptions?: Maybe<Scalars['String']>
  cursorMark?: Maybe<Scalars['String']>
  facetValueSort?: Maybe<Scalars['String']>
  defaultSort?: Maybe<Scalars['String']>
  sortDefinitionName?: Maybe<Scalars['String']>
  defaultSortDefinitionName?: Maybe<Scalars['String']>
  shouldSlice?: Maybe<Scalars['Boolean']>
  mid?: Maybe<Scalars['String']>
  omitNamespace?: Maybe<Scalars['Boolean']>
}

export type QueryPriceListArgs = {
  priceListCode?: Maybe<Scalars['String']>
}

export type QueryUserCartSummaryArgs = {
  userId: Scalars['String']
}

export type QueryCartSummaryArgs = {
  cartId: Scalars['String']
}

export type QueryUserCartArgs = {
  userId: Scalars['String']
}

export type QueryCartArgs = {
  cartId: Scalars['String']
}

export type QueryCartItemsArgs = {
  cartId: Scalars['String']
}

export type QueryCurrentCartItemArgs = {
  cartItemId: Scalars['String']
}

export type QueryCartItemArgs = {
  cartId: Scalars['String']
  cartItemId: Scalars['String']
}

export type QueryChannelsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryChannelArgs = {
  code: Scalars['String']
}

export type QueryChannelGroupsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryChannelGroupArgs = {
  code: Scalars['String']
}

export type QueryCheckoutAttributesArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
  qLimit?: Maybe<Scalars['Int']>
}

export type QueryCheckoutShippingMethodsArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutActionsArgs = {
  checkoutId: Scalars['String']
}

export type QueryCheckoutDestinationArgs = {
  checkoutId: Scalars['String']
  destinationId: Scalars['String']
}

export type QueryCheckoutDestinationsArgs = {
  checkoutId: Scalars['String']
}

export type QueryOrderPackageActionsArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type QueryOrderPaymentActionsArgs = {
  orderId: Scalars['String']
  paymentId: Scalars['String']
}

export type QueryOrderPaymentArgs = {
  orderId: Scalars['String']
  paymentId: Scalars['String']
}

export type QueryOrderPaymentsArgs = {
  orderId: Scalars['String']
}

export type QueryOrderPickupArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
}

export type QueryOrderPickupActionsArgs = {
  orderId: Scalars['String']
  pickupId: Scalars['String']
}

export type QueryOrderReturnableItemsArgs = {
  orderId: Scalars['String']
}

export type QueryOrderShipmentArgs = {
  orderId: Scalars['String']
  shipmentId: Scalars['String']
}

export type QueryOrderShipmentMethodsArgs = {
  orderId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryOrderValidationResultsArgs = {
  orderId: Scalars['String']
}

export type QueryOrderAttributesArgs = {
  orderId: Scalars['String']
}

export type QueryOrderBillingInfoArgs = {
  orderId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryOrderCancelReasonsArgs = {
  category?: Maybe<Scalars['String']>
}

export type QueryOrdersArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
  qLimit?: Maybe<Scalars['Int']>
  includeBin?: Maybe<Scalars['Boolean']>
  mode?: Maybe<Scalars['String']>
}

export type QueryOrderArgs = {
  orderId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
  includeBin?: Maybe<Scalars['Boolean']>
  mode?: Maybe<Scalars['String']>
}

export type QueryOrderActionsArgs = {
  orderId: Scalars['String']
}

export type QueryOrderTaxableOrdersArgs = {
  orderId: Scalars['String']
}

export type QueryOrderDigitalPackageArgs = {
  orderId: Scalars['String']
  digitalPackageId: Scalars['String']
}

export type QueryOrderDigitalPackageActionsArgs = {
  orderId: Scalars['String']
  digitalPackageId: Scalars['String']
}

export type QueryOrderExtendedPropertiesArgs = {
  orderId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryOrderFulfillmentInfoArgs = {
  orderId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryOrderItemsArgs = {
  orderId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryOrderNotesArgs = {
  orderId: Scalars['String']
}

export type QueryOrderNoteArgs = {
  orderId: Scalars['String']
  noteId: Scalars['String']
}

export type QueryOrderPackageArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type QueryOrderPackageLabelArgs = {
  orderId: Scalars['String']
  packageId: Scalars['String']
}

export type QueryQuoteArgs = {
  quoteId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryQuotesArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
  qLimit?: Maybe<Scalars['Int']>
}

export type QueryCustomerAccountQuoteArgs = {
  customerAccountId: Scalars['Int']
  quoteName: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryQuoteItemsArgs = {
  quoteId: Scalars['String']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerAccountQuoteItemsArgs = {
  customerAccountId: Scalars['Int']
  quoteName: Scalars['String']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryQuoteItemArgs = {
  quoteId: Scalars['String']
  quoteItemId: Scalars['String']
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryReturnsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
}

export type QueryReturnReasonArgs = {
  returnId: Scalars['String']
}

export type QueryReturnActionsArgs = {
  returnId: Scalars['String']
}

export type QueryReturnPaymentsArgs = {
  returnId: Scalars['String']
}

export type QueryReturnPaymentArgs = {
  returnId: Scalars['String']
  paymentId: Scalars['String']
}

export type QueryReturnPaymentActionsArgs = {
  returnId: Scalars['String']
  paymentId: Scalars['String']
}

export type QueryReturnShippingLabelArgs = {
  returnId: Scalars['String']
}

export type QueryReturnItemsArgs = {
  returnId: Scalars['String']
}

export type QueryReturnItemArgs = {
  returnId: Scalars['String']
  returnItemId: Scalars['String']
}

export type QueryReturnNotesArgs = {
  returnId: Scalars['String']
}

export type QueryReturnNoteArgs = {
  returnId: Scalars['String']
  noteId: Scalars['String']
}

export type QueryReturnPackageArgs = {
  returnId: Scalars['String']
  packageId: Scalars['String']
}

export type QueryReturnPackageLabelArgs = {
  returnId: Scalars['String']
  packageId: Scalars['String']
  returnAsBase64Png?: Maybe<Scalars['Boolean']>
}

export type QueryReturnShipmentArgs = {
  returnId: Scalars['String']
  shipmentId: Scalars['String']
}

export type QueryWishlistsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  q?: Maybe<Scalars['String']>
  qLimit?: Maybe<Scalars['Int']>
}

export type QueryWishlistArgs = {
  wishlistId: Scalars['String']
}

export type QueryCustomerWishlistArgs = {
  customerAccountId: Scalars['Int']
  wishlistName: Scalars['String']
}

export type QueryWishlistItemsArgs = {
  wishlistId: Scalars['String']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryCustomerWishlistItemsArgs = {
  customerAccountId: Scalars['Int']
  wishlistName: Scalars['String']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryWishlistItemArgs = {
  wishlistId: Scalars['String']
  wishlistItemId: Scalars['String']
}

export type QueryOrderItemArgs = {
  orderId?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  orderItemId?: Maybe<Scalars['String']>
  draft?: Maybe<Scalars['Boolean']>
}

export type QueryDocumentListDocumentContentArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
}

export type QueryDocumentListDocumentTransformArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  max?: Maybe<Scalars['Int']>
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  crop?: Maybe<Scalars['String']>
  quality?: Maybe<Scalars['Int']>
}

export type QueryDocumentListTreeDocumentContentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
}

export type QueryDocumentListTreeDocumentTransformArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  max?: Maybe<Scalars['Int']>
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  crop?: Maybe<Scalars['String']>
  quality?: Maybe<Scalars['Int']>
}

export type QueryDocumentListDocumentsArgs = {
  documentListName: Scalars['String']
  filter?: Maybe<Scalars['String']>
  sortBy?: Maybe<Scalars['String']>
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  includeInactive?: Maybe<Scalars['Boolean']>
  path?: Maybe<Scalars['String']>
  includeSubPaths?: Maybe<Scalars['Boolean']>
  queryScope?: Maybe<Scalars['String']>
}

export type QueryDocumentListDocumentArgs = {
  documentListName: Scalars['String']
  documentId: Scalars['String']
  includeInactive?: Maybe<Scalars['Boolean']>
}

export type QueryDocumentListTreeDocumentArgs = {
  documentListName: Scalars['String']
  documentName: Scalars['String']
  includeInactive?: Maybe<Scalars['Boolean']>
}

export type QueryDocumentListsArgs = {
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
}

export type QueryDocumentListArgs = {
  documentListName: Scalars['String']
}

export type QueryDocumentListViewDocumentsArgs = {
  documentListName: Scalars['String']
  viewName: Scalars['String']
  filter?: Maybe<Scalars['String']>
  sortBy?: Maybe<Scalars['String']>
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  includeInactive?: Maybe<Scalars['Boolean']>
}

export type QueryDocumentListTypesArgs = {
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
}

export type QueryDocumentListTypeArgs = {
  documentListTypeFQN: Scalars['String']
}

export type QueryDocumentDraftsArgs = {
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  documentLists?: Maybe<Scalars['String']>
}

export type QueryDocumentTypesArgs = {
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
}

export type QueryDocumentTypeArgs = {
  documentTypeName: Scalars['String']
}

export type QueryPropertyTypesArgs = {
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
}

export type QueryPropertyTypeArgs = {
  propertyTypeName: Scalars['String']
}

export type QueryAdminLocationsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryAdminLocationArgs = {
  locationCode: Scalars['String']
}

export type QueryAdminLocationAttributesArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryAdminLocationAttributeVocabularyValuesArgs = {
  attributeFQN: Scalars['String']
}

export type QueryAdminLocationAttributeArgs = {
  attributeFQN: Scalars['String']
}

export type QueryAdminLocationGroupsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryDslLocationArgs = {
  includeAttributeDefinition?: Maybe<Scalars['Boolean']>
}

export type QuerySpLocationsArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  includeAttributeDefinition?: Maybe<Scalars['Boolean']>
}

export type QuerySpLocationArgs = {
  locationCode: Scalars['String']
  includeAttributeDefinition?: Maybe<Scalars['Boolean']>
}

export type QueryUsageTypeLocationsArgs = {
  locationUsageType: Scalars['String']
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
  includeAttributeDefinition?: Maybe<Scalars['Boolean']>
}

export type QueryLocationArgs = {
  locationCode: Scalars['String']
  includeAttributeDefinition?: Maybe<Scalars['Boolean']>
}

export type QueryLocationUsageArgs = {
  code: Scalars['String']
}

export type QueryAdminLocationTypeArgs = {
  locationTypeCode: Scalars['String']
}

export type QueryLocationGroupConfigArgs = {
  locationGroupId?: Maybe<Scalars['Int']>
  locationGroupCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
}

export type QueryLocationGroupArgs = {
  groupId?: Maybe<Scalars['Int']>
  locationGroupCode?: Maybe<Scalars['String']>
}

export type QueryEntityListEntityArgs = {
  entityListFullName: Scalars['String']
  id: Scalars['String']
}

export type QueryEntityListEntitiesArgs = {
  entityListFullName: Scalars['String']
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  filter?: Maybe<Scalars['String']>
  sortBy?: Maybe<Scalars['String']>
}

export type QueryEntityListEntityContainerArgs = {
  entityListFullName: Scalars['String']
  id: Scalars['String']
}

export type QueryEntityListEntityContainersArgs = {
  entityListFullName: Scalars['String']
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  filter?: Maybe<Scalars['String']>
  sortBy?: Maybe<Scalars['String']>
}

export type QueryEntityListArgs = {
  entityListFullName: Scalars['String']
}

export type QueryEntityListsArgs = {
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  filter?: Maybe<Scalars['String']>
  sortBy?: Maybe<Scalars['String']>
}

export type QueryEntityListViewsArgs = {
  entityListFullName: Scalars['String']
}

export type QueryEntityListViewArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
}

export type QueryEntityListViewEntityContainersArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  filter?: Maybe<Scalars['String']>
}

export type QueryEntityListViewEntitiesArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
  pageSize?: Maybe<Scalars['Int']>
  startIndex?: Maybe<Scalars['Int']>
  filter?: Maybe<Scalars['String']>
}

export type QueryEntityListViewEntityContainerArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
  entityId: Scalars['String']
}

export type QueryEntityListViewEntityArgs = {
  entityListFullName: Scalars['String']
  viewName: Scalars['String']
  entityId: Scalars['String']
}

export type QueryCarrierLocaleServiceTypesArgs = {
  carrierId: Scalars['String']
  localeCode: Scalars['String']
}

export type QueryLocaleServiceTypesArgs = {
  localeCode: Scalars['String']
}

export type QueryTargetRulesArgs = {
  startIndex?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  sortBy?: Maybe<Scalars['String']>
  filter?: Maybe<Scalars['String']>
}

export type QueryTargetRuleArgs = {
  code: Scalars['String']
}

export type QueryOrderRoutingRoutingSuggestionLogArgs = {
  externalResponseID?: Maybe<Scalars['String']>
  orderID?: Maybe<Scalars['Int']>
  responseID?: Maybe<Scalars['Int']>
  suggestionID?: Maybe<Scalars['Int']>
}

export type Quote = {
  __typename?: 'Quote'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Quote>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  number?: Maybe<Scalars['Int']>
  submittedDate?: Maybe<Scalars['DateTime']>
  items?: Maybe<Array<Maybe<CrOrderItem>>>
  auditHistory?: Maybe<Array<Maybe<AuditRecord>>>
  auditInfo?: Maybe<CrAuditInfo>
  comments?: Maybe<Array<Maybe<QuoteComment>>>
  expirationDate?: Maybe<Scalars['DateTime']>
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  userId?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  currencyCode?: Maybe<Scalars['String']>
  priceListCode?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  channelCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
  ipAddress?: Maybe<Scalars['String']>
  sourceDevice?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  subTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  adjustment?: Maybe<Adjustment>
  itemTotal: Scalars['Float']
  total: Scalars['Float']
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscount>>>
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingAmount: Scalars['Float']
  shippingAdjustment?: Maybe<Adjustment>
  shippingSubTotal: Scalars['Float']
  shippingTax?: Maybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelHandlingDiscountTotal: Scalars['Float']
  handlingAmount?: Maybe<Scalars['Float']>
  handlingAdjustment?: Maybe<Adjustment>
  handlingSubTotal: Scalars['Float']
  handlingTax?: Maybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  feeTotal: Scalars['Float']
  isDraft?: Maybe<Scalars['Boolean']>
  hasDraft?: Maybe<Scalars['Boolean']>
  status?: Maybe<Scalars['String']>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCoupon>>>
}

export type Quote_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type QuoteCollection = {
  __typename?: 'QuoteCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<QuoteCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Quote>>>
}

export type QuoteCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type QuoteComment = {
  __typename?: 'QuoteComment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<QuoteComment>
  id?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
}

export type QuoteComment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type QuoteCommentInput = {
  id?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type QuoteInput = {
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  siteId: Scalars['Int']
  tenantId: Scalars['Int']
  number?: Maybe<Scalars['Int']>
  submittedDate?: Maybe<Scalars['DateTime']>
  items?: Maybe<Array<Maybe<CrOrderItemInput>>>
  auditHistory?: Maybe<Array<Maybe<AuditRecordInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
  comments?: Maybe<Array<Maybe<QuoteCommentInput>>>
  expirationDate?: Maybe<Scalars['DateTime']>
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  userId?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  customerTaxId?: Maybe<Scalars['String']>
  isTaxExempt?: Maybe<Scalars['Boolean']>
  currencyCode?: Maybe<Scalars['String']>
  priceListCode?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  channelCode?: Maybe<Scalars['String']>
  locationCode?: Maybe<Scalars['String']>
  ipAddress?: Maybe<Scalars['String']>
  sourceDevice?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  subTotal: Scalars['Float']
  itemLevelProductDiscountTotal: Scalars['Float']
  orderLevelProductDiscountTotal: Scalars['Float']
  itemTaxTotal: Scalars['Float']
  adjustment?: Maybe<AdjustmentInput>
  itemTotal: Scalars['Float']
  total: Scalars['Float']
  shippingDiscounts?: Maybe<Array<Maybe<ShippingDiscountInput>>>
  itemLevelShippingDiscountTotal: Scalars['Float']
  orderLevelShippingDiscountTotal: Scalars['Float']
  shippingAmount: Scalars['Float']
  shippingAdjustment?: Maybe<AdjustmentInput>
  shippingSubTotal: Scalars['Float']
  shippingTax?: Maybe<Scalars['Float']>
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  itemLevelHandlingDiscountTotal: Scalars['Float']
  orderLevelHandlingDiscountTotal: Scalars['Float']
  handlingAmount?: Maybe<Scalars['Float']>
  handlingAdjustment?: Maybe<AdjustmentInput>
  handlingSubTotal: Scalars['Float']
  handlingTax?: Maybe<Scalars['Float']>
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  dutyAmount?: Maybe<Scalars['Float']>
  dutyTotal: Scalars['Float']
  feeTotal: Scalars['Float']
  isDraft?: Maybe<Scalars['Boolean']>
  hasDraft?: Maybe<Scalars['Boolean']>
  status?: Maybe<Scalars['String']>
  couponCodes?: Maybe<Array<Scalars['String']>>
  invalidCoupons?: Maybe<Array<Maybe<InvalidCouponInput>>>
}

export type ReasonCollection = {
  __typename?: 'ReasonCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReasonCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Scalars['String']>>
}

export type ReasonCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Refund = {
  __typename?: 'Refund'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Refund>
  id?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  reason?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
  payment?: Maybe<Payment>
  amount: Scalars['Float']
  refundMethod?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
}

export type Refund_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type RefundInput = {
  id?: Maybe<Scalars['String']>
  orderId?: Maybe<Scalars['String']>
  reason?: Maybe<Scalars['String']>
  reasonCode?: Maybe<Scalars['String']>
  payment?: Maybe<PaymentInput>
  amount: Scalars['Float']
  refundMethod?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type RegularHours = {
  __typename?: 'RegularHours'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<RegularHours>
  sunday?: Maybe<Hours>
  monday?: Maybe<Hours>
  tuesday?: Maybe<Hours>
  wednesday?: Maybe<Hours>
  thursday?: Maybe<Hours>
  friday?: Maybe<Hours>
  saturday?: Maybe<Hours>
  timeZone?: Maybe<Scalars['String']>
}

export type RegularHours_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type RegularHoursInput = {
  sunday?: Maybe<HoursInput>
  monday?: Maybe<HoursInput>
  tuesday?: Maybe<HoursInput>
  wednesday?: Maybe<HoursInput>
  thursday?: Maybe<HoursInput>
  friday?: Maybe<HoursInput>
  saturday?: Maybe<HoursInput>
  timeZone?: Maybe<Scalars['String']>
}

export type RepriceShipmentObjectInput = {
  originalShipment?: Maybe<ShipmentInput>
  newShipment?: Maybe<ShipmentInput>
}

export type ResetPasswordInfoInput = {
  emailAddress?: Maybe<Scalars['String']>
  userName?: Maybe<Scalars['String']>
  customerSetCode?: Maybe<Scalars['String']>
}

export type ResolvedPriceList = {
  __typename?: 'ResolvedPriceList'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ResolvedPriceList>
  priceListCode?: Maybe<Scalars['String']>
  priceListId: Scalars['Int']
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
}

export type ResolvedPriceList_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type RestockableReturnItemInput = {
  returnItemId?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
  locationCode?: Maybe<Scalars['String']>
}

export type ReturnActionInput = {
  actionName?: Maybe<Scalars['String']>
  returnIds?: Maybe<Array<Scalars['String']>>
}

export type ReturnBundle = {
  __typename?: 'ReturnBundle'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnBundle>
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type ReturnBundle_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ReturnBundleInput = {
  productCode?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type ReturnCollection = {
  __typename?: 'ReturnCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<ReturnObj>>>
}

export type ReturnCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ReturnItem = {
  __typename?: 'ReturnItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnItem>
  id?: Maybe<Scalars['String']>
  orderItemId?: Maybe<Scalars['String']>
  orderLineId?: Maybe<Scalars['Int']>
  orderItemOptionAttributeFQN?: Maybe<Scalars['String']>
  product?: Maybe<CrProduct>
  reasons?: Maybe<Array<Maybe<ReturnReason>>>
  excludeProductExtras?: Maybe<Scalars['Boolean']>
  returnType?: Maybe<Scalars['String']>
  returnNotRequired?: Maybe<Scalars['Boolean']>
  quantityReceived: Scalars['Int']
  receiveStatus?: Maybe<Scalars['String']>
  quantityShipped: Scalars['Int']
  replaceStatus?: Maybe<Scalars['String']>
  quantityRestockable: Scalars['Int']
  quantityRestocked: Scalars['Int']
  refundAmount?: Maybe<Scalars['Float']>
  refundStatus?: Maybe<Scalars['String']>
  quantityReplaced?: Maybe<Scalars['Int']>
  notes?: Maybe<Array<Maybe<OrderNote>>>
  productLossAmount?: Maybe<Scalars['Float']>
  productLossTaxAmount?: Maybe<Scalars['Float']>
  shippingLossAmount?: Maybe<Scalars['Float']>
  shippingLossTaxAmount?: Maybe<Scalars['Float']>
  bundledProducts?: Maybe<Array<Maybe<ReturnBundle>>>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  shipmentItemId?: Maybe<Scalars['Int']>
  shipmentNumber?: Maybe<Scalars['Int']>
}

export type ReturnItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ReturnItemCollection = {
  __typename?: 'ReturnItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnItemCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<ReturnItem>>>
}

export type ReturnItemCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ReturnItemInput = {
  id?: Maybe<Scalars['String']>
  orderItemId?: Maybe<Scalars['String']>
  orderLineId?: Maybe<Scalars['Int']>
  orderItemOptionAttributeFQN?: Maybe<Scalars['String']>
  product?: Maybe<CrProductInput>
  reasons?: Maybe<Array<Maybe<ReturnReasonInput>>>
  excludeProductExtras?: Maybe<Scalars['Boolean']>
  returnType?: Maybe<Scalars['String']>
  returnNotRequired?: Maybe<Scalars['Boolean']>
  quantityReceived: Scalars['Int']
  receiveStatus?: Maybe<Scalars['String']>
  quantityShipped: Scalars['Int']
  replaceStatus?: Maybe<Scalars['String']>
  quantityRestockable: Scalars['Int']
  quantityRestocked: Scalars['Int']
  refundAmount?: Maybe<Scalars['Float']>
  refundStatus?: Maybe<Scalars['String']>
  quantityReplaced?: Maybe<Scalars['Int']>
  notes?: Maybe<Array<Maybe<OrderNoteInput>>>
  productLossAmount?: Maybe<Scalars['Float']>
  productLossTaxAmount?: Maybe<Scalars['Float']>
  shippingLossAmount?: Maybe<Scalars['Float']>
  shippingLossTaxAmount?: Maybe<Scalars['Float']>
  bundledProducts?: Maybe<Array<Maybe<ReturnBundleInput>>>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  shipmentItemId?: Maybe<Scalars['Int']>
  shipmentNumber?: Maybe<Scalars['Int']>
}

export type ReturnItemSpecifierInput = {
  returnItemId?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type ReturnObj = {
  __typename?: 'ReturnObj'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnObj>
  id?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  availableActions?: Maybe<Array<Scalars['String']>>
  returnNumber?: Maybe<Scalars['Int']>
  contact?: Maybe<Contact>
  locationCode?: Maybe<Scalars['String']>
  originalOrderId?: Maybe<Scalars['String']>
  originalOrderNumber?: Maybe<Scalars['Int']>
  returnOrderId?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  receiveStatus?: Maybe<Scalars['String']>
  refundStatus?: Maybe<Scalars['String']>
  replaceStatus?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<ReturnItem>>>
  notes?: Maybe<Array<Maybe<OrderNote>>>
  rmaDeadline?: Maybe<Scalars['DateTime']>
  returnType?: Maybe<Scalars['String']>
  refundAmount?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CrAuditInfo>
  payments?: Maybe<Array<Maybe<Payment>>>
  packages?: Maybe<Array<Maybe<PackageObj>>>
  productLossTotal?: Maybe<Scalars['Float']>
  shippingLossTotal?: Maybe<Scalars['Float']>
  lossTotal?: Maybe<Scalars['Float']>
  productLossTaxTotal?: Maybe<Scalars['Float']>
  shippingLossTaxTotal?: Maybe<Scalars['Float']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  userId?: Maybe<Scalars['String']>
  channelCode?: Maybe<Scalars['String']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  actionRequired?: Maybe<Scalars['Boolean']>
  isUnified?: Maybe<Scalars['Boolean']>
}

export type ReturnObj_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ReturnObjInput = {
  id?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  availableActions?: Maybe<Array<Scalars['String']>>
  returnNumber?: Maybe<Scalars['Int']>
  contact?: Maybe<ContactInput>
  locationCode?: Maybe<Scalars['String']>
  originalOrderId?: Maybe<Scalars['String']>
  originalOrderNumber?: Maybe<Scalars['Int']>
  returnOrderId?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  receiveStatus?: Maybe<Scalars['String']>
  refundStatus?: Maybe<Scalars['String']>
  replaceStatus?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<ReturnItemInput>>>
  notes?: Maybe<Array<Maybe<OrderNoteInput>>>
  rmaDeadline?: Maybe<Scalars['DateTime']>
  returnType?: Maybe<Scalars['String']>
  refundAmount?: Maybe<Scalars['Float']>
  auditInfo?: Maybe<CrAuditInfoInput>
  payments?: Maybe<Array<Maybe<PaymentInput>>>
  packages?: Maybe<Array<Maybe<PackageObjInput>>>
  productLossTotal?: Maybe<Scalars['Float']>
  shippingLossTotal?: Maybe<Scalars['Float']>
  lossTotal?: Maybe<Scalars['Float']>
  productLossTaxTotal?: Maybe<Scalars['Float']>
  shippingLossTaxTotal?: Maybe<Scalars['Float']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  userId?: Maybe<Scalars['String']>
  channelCode?: Maybe<Scalars['String']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  actionRequired?: Maybe<Scalars['Boolean']>
  isUnified?: Maybe<Scalars['Boolean']>
}

export type ReturnReason = {
  __typename?: 'ReturnReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ReturnReason>
  reason?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type ReturnReason_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ReturnReasonInput = {
  reason?: Maybe<Scalars['String']>
  quantity: Scalars['Int']
}

export type SearchSuggestion = {
  __typename?: 'SearchSuggestion'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SearchSuggestion>
  suggestionType?: Maybe<Scalars['String']>
  suggestion?: Maybe<Scalars['Object']>
}

export type SearchSuggestion_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type SearchSuggestionGroup = {
  __typename?: 'SearchSuggestionGroup'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SearchSuggestionGroup>
  name?: Maybe<Scalars['String']>
  suggestions?: Maybe<Array<Maybe<SearchSuggestion>>>
}

export type SearchSuggestionGroup_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type SearchSuggestionResult = {
  __typename?: 'SearchSuggestionResult'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SearchSuggestionResult>
  query?: Maybe<Scalars['String']>
  suggestionGroups?: Maybe<Array<Maybe<SearchSuggestionGroup>>>
}

export type SearchSuggestionResult_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ServiceType = {
  __typename?: 'ServiceType'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ServiceType>
  code?: Maybe<Scalars['String']>
  deliveryDuration?: Maybe<Scalars['String']>
  content?: Maybe<ServiceTypeLocalizedContent>
}

export type ServiceType_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ServiceTypeLocalizedContent = {
  __typename?: 'ServiceTypeLocalizedContent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ServiceTypeLocalizedContent>
  localeCode?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type ServiceTypeLocalizedContent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type Shipment = {
  __typename?: 'Shipment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Shipment>
  id?: Maybe<Scalars['String']>
  externalShipmentId?: Maybe<Scalars['String']>
  number?: Maybe<Scalars['Int']>
  orderId?: Maybe<Scalars['String']>
  orderNumber: Scalars['Int']
  email?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerTaxId?: Maybe<Scalars['String']>
  shipmentType?: Maybe<Scalars['String']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  origin?: Maybe<Contact>
  destination?: Maybe<Destination>
  shipmentStatus?: Maybe<Scalars['String']>
  shipmentStatusReason?: Maybe<ShipmentStatusReason>
  transferShipmentNumbers?: Maybe<Array<Scalars['Int']>>
  isTransfer?: Maybe<Scalars['Boolean']>
  originalShipmentNumber?: Maybe<Scalars['Int']>
  parentShipmentNumber?: Maybe<Scalars['Int']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  workflowProcessId?: Maybe<Scalars['String']>
  workflowProcessContainerId?: Maybe<Scalars['String']>
  workflowState?: Maybe<WorkflowState>
  backorderCreatedDate?: Maybe<Scalars['Int']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  orderSubmitDate?: Maybe<Scalars['DateTime']>
  pickStatus?: Maybe<Scalars['String']>
  pickType?: Maybe<Scalars['String']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  packages?: Maybe<Array<Maybe<PackageObj>>>
  items?: Maybe<Array<Maybe<ShipmentItem>>>
  canceledItems?: Maybe<Array<Maybe<CanceledItem>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  shipmentAdjustment: Scalars['Float']
  lineItemSubtotal: Scalars['Float']
  lineItemTaxAdjustment: Scalars['Float']
  lineItemTaxTotal: Scalars['Float']
  lineItemTotal: Scalars['Float']
  shippingAdjustment: Scalars['Float']
  shippingSubtotal: Scalars['Float']
  shippingTaxAdjustment: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingAdjustment: Scalars['Float']
  handlingSubtotal: Scalars['Float']
  handlingTaxAdjustment: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  dutyAdjustment: Scalars['Float']
  dutyTotal: Scalars['Float']
  total: Scalars['Float']
  cost?: Maybe<Scalars['Float']>
  externalOrderId?: Maybe<Scalars['String']>
  isExpress?: Maybe<Scalars['Boolean']>
  readyToCapture?: Maybe<Scalars['Boolean']>
  pickupInfo?: Maybe<Scalars['Object']>
  shopperNotes?: Maybe<FulfillmentShopperNotes>
  customer?: Maybe<Customer>
}

export type Shipment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShipmentAdjustmentInput = {
  itemAdjustment?: Maybe<Scalars['Float']>
  itemTaxAdjustment?: Maybe<Scalars['Float']>
  shippingAdjustment?: Maybe<Scalars['Float']>
  shippingTaxAdjustment?: Maybe<Scalars['Float']>
  handlingAdjustment?: Maybe<Scalars['Float']>
  handlingTaxAdjustment?: Maybe<Scalars['Float']>
}

export type ShipmentInput = {
  id?: Maybe<Scalars['String']>
  externalShipmentId?: Maybe<Scalars['String']>
  number?: Maybe<Scalars['Int']>
  orderId?: Maybe<Scalars['String']>
  orderNumber: Scalars['Int']
  email?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  customerAccountId?: Maybe<Scalars['Int']>
  customerTaxId?: Maybe<Scalars['String']>
  shipmentType?: Maybe<Scalars['String']>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  origin?: Maybe<ContactInput>
  destination?: Maybe<DestinationInput>
  shipmentStatus?: Maybe<Scalars['String']>
  shipmentStatusReason?: Maybe<ShipmentStatusReasonInput>
  transferShipmentNumbers?: Maybe<Array<Scalars['Int']>>
  isTransfer?: Maybe<Scalars['Boolean']>
  originalShipmentNumber?: Maybe<Scalars['Int']>
  parentShipmentNumber?: Maybe<Scalars['Int']>
  fulfillmentStatus?: Maybe<Scalars['String']>
  workflowProcessId?: Maybe<Scalars['String']>
  workflowProcessContainerId?: Maybe<Scalars['String']>
  workflowState?: Maybe<WorkflowStateInput>
  backorderCreatedDate?: Maybe<Scalars['Int']>
  fulfillmentDate?: Maybe<Scalars['DateTime']>
  orderSubmitDate?: Maybe<Scalars['DateTime']>
  pickStatus?: Maybe<Scalars['String']>
  pickType?: Maybe<Scalars['String']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  packages?: Maybe<Array<Maybe<PackageObjInput>>>
  items?: Maybe<Array<Maybe<ShipmentItemInput>>>
  canceledItems?: Maybe<Array<Maybe<CanceledItemInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfoInput>
  shipmentAdjustment: Scalars['Float']
  lineItemSubtotal: Scalars['Float']
  lineItemTaxAdjustment: Scalars['Float']
  lineItemTaxTotal: Scalars['Float']
  lineItemTotal: Scalars['Float']
  shippingAdjustment: Scalars['Float']
  shippingSubtotal: Scalars['Float']
  shippingTaxAdjustment: Scalars['Float']
  shippingTaxTotal: Scalars['Float']
  shippingTotal: Scalars['Float']
  handlingAdjustment: Scalars['Float']
  handlingSubtotal: Scalars['Float']
  handlingTaxAdjustment: Scalars['Float']
  handlingTaxTotal: Scalars['Float']
  handlingTotal: Scalars['Float']
  dutyAdjustment: Scalars['Float']
  dutyTotal: Scalars['Float']
  total: Scalars['Float']
  cost?: Maybe<Scalars['Float']>
  externalOrderId?: Maybe<Scalars['String']>
  isExpress?: Maybe<Scalars['Boolean']>
  readyToCapture?: Maybe<Scalars['Boolean']>
  pickupInfo?: Maybe<Scalars['Object']>
  shopperNotes?: Maybe<FulfillmentShopperNotesInput>
  customer?: Maybe<CustomerInput>
}

export type ShipmentItem = {
  __typename?: 'ShipmentItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShipmentItem>
  lineId: Scalars['Int']
  originalOrderItemId?: Maybe<Scalars['String']>
  parentId?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfo>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isTaxable?: Maybe<Scalars['Boolean']>
  quantity: Scalars['Int']
  unitPrice: Scalars['Float']
  actualPrice: Scalars['Float']
  overridePrice?: Maybe<Scalars['Float']>
  itemDiscount: Scalars['Float']
  lineItemCost: Scalars['Float']
  itemTax: Scalars['Float']
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  duty: Scalars['Float']
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurements>
  options?: Maybe<Array<Maybe<CrProductOption>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  weightedShipmentAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedDutyAdjustment: Scalars['Float']
  taxableShipping: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableHandling: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentField>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  parentItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  giftCards?: Maybe<Array<Maybe<GiftCard>>>
}

export type ShipmentItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShipmentItemAdjustmentInput = {
  overridePrice?: Maybe<Scalars['Float']>
}

export type ShipmentItemInput = {
  lineId: Scalars['Int']
  originalOrderItemId?: Maybe<Scalars['String']>
  parentId?: Maybe<Scalars['String']>
  productCode?: Maybe<Scalars['String']>
  variationProductCode?: Maybe<Scalars['String']>
  optionAttributeFQN?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  auditInfo?: Maybe<CrAuditInfoInput>
  fulfillmentLocationCode?: Maybe<Scalars['String']>
  imageUrl?: Maybe<Scalars['String']>
  isTaxable?: Maybe<Scalars['Boolean']>
  quantity: Scalars['Int']
  unitPrice: Scalars['Float']
  actualPrice: Scalars['Float']
  overridePrice?: Maybe<Scalars['Float']>
  itemDiscount: Scalars['Float']
  lineItemCost: Scalars['Float']
  itemTax: Scalars['Float']
  shipping: Scalars['Float']
  shippingDiscount: Scalars['Float']
  shippingTax: Scalars['Float']
  handling: Scalars['Float']
  handlingDiscount: Scalars['Float']
  handlingTax: Scalars['Float']
  duty: Scalars['Float']
  isPackagedStandAlone?: Maybe<Scalars['Boolean']>
  readyForPickupQuantity?: Maybe<Scalars['Int']>
  backorderReleaseDate?: Maybe<Scalars['DateTime']>
  measurements?: Maybe<CrPackageMeasurementsInput>
  options?: Maybe<Array<Maybe<CrProductOptionInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  weightedShipmentAdjustment: Scalars['Float']
  weightedLineItemTaxAdjustment: Scalars['Float']
  weightedShippingAdjustment: Scalars['Float']
  weightedShippingTaxAdjustment: Scalars['Float']
  weightedHandlingAdjustment: Scalars['Float']
  weightedHandlingTaxAdjustment: Scalars['Float']
  weightedDutyAdjustment: Scalars['Float']
  taxableShipping: Scalars['Float']
  taxableLineItemCost: Scalars['Float']
  taxableHandling: Scalars['Float']
  fulfillmentFields?: Maybe<Array<Maybe<FulfillmentFieldInput>>>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  parentItemId?: Maybe<Scalars['String']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  giftCards?: Maybe<Array<Maybe<GiftCardInput>>>
}

export type ShipmentStatusReason = {
  __typename?: 'ShipmentStatusReason'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShipmentStatusReason>
  reasonCode?: Maybe<Scalars['String']>
  moreInfo?: Maybe<Scalars['String']>
}

export type ShipmentStatusReason_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShipmentStatusReasonInput = {
  reasonCode?: Maybe<Scalars['String']>
  moreInfo?: Maybe<Scalars['String']>
}

export type ShippingAddressInput = {
  addressID: Scalars['Int']
  addressLine1: Scalars['String']
  city: Scalars['String']
  countryCode: Scalars['String']
  customerID: Scalars['Int']
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  phone: Scalars['String']
  postalCode: Scalars['String']
  state: Scalars['String']
}

export type ShippingDiscount = {
  __typename?: 'ShippingDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingDiscount>
  methodCode?: Maybe<Scalars['String']>
  discount?: Maybe<CrAppliedDiscount>
}

export type ShippingDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShippingDiscountInput = {
  methodCode?: Maybe<Scalars['String']>
  discount?: Maybe<CrAppliedDiscountInput>
}

export type ShippingMethodMappings = {
  __typename?: 'ShippingMethodMappings'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingMethodMappings>
  shippingMethods?: Maybe<Array<Scalars['String']>>
  returnLabelShippingMethod?: Maybe<Scalars['String']>
  standardDefault?: Maybe<Scalars['String']>
  express1DayDefault?: Maybe<Scalars['String']>
  express2DayDefault?: Maybe<Scalars['String']>
  express3DayDefault?: Maybe<Scalars['String']>
  enableSmartPost?: Maybe<Scalars['Boolean']>
  internationalUsReturnLabelShippingMethod?: Maybe<Scalars['String']>
}

export type ShippingMethodMappings_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShippingOriginContact = {
  __typename?: 'ShippingOriginContact'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingOriginContact>
  firstName?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  companyOrOrganization?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type ShippingOriginContact_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShippingOriginContactInput = {
  firstName?: Maybe<Scalars['String']>
  middleNameOrInitial?: Maybe<Scalars['String']>
  lastNameOrSurname?: Maybe<Scalars['String']>
  companyOrOrganization?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type ShippingRate = {
  __typename?: 'ShippingRate'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShippingRate>
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shippingZoneCode?: Maybe<Scalars['String']>
  isValid?: Maybe<Scalars['Boolean']>
  messages?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  currencyCode?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['Float']>
}

export type ShippingRate_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShippingRateInput = {
  shippingMethodCode?: Maybe<Scalars['String']>
  shippingMethodName?: Maybe<Scalars['String']>
  shippingZoneCode?: Maybe<Scalars['String']>
  isValid?: Maybe<Scalars['Boolean']>
  messages?: Maybe<Array<Scalars['String']>>
  data?: Maybe<Scalars['Object']>
  currencyCode?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['Float']>
}

export type ShopperNotes = {
  __typename?: 'ShopperNotes'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ShopperNotes>
  giftMessage?: Maybe<Scalars['String']>
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
}

export type ShopperNotes_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ShopperNotesInput = {
  giftMessage?: Maybe<Scalars['String']>
  comments?: Maybe<Scalars['String']>
  deliveryInstructions?: Maybe<Scalars['String']>
}

export type SolrDebugInfo = {
  __typename?: 'SolrDebugInfo'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SolrDebugInfo>
  searchTuningRuleCode?: Maybe<Scalars['String']>
  boostedProductCodes?: Maybe<Array<Scalars['String']>>
  blockedProductCodes?: Maybe<Array<Scalars['String']>>
  boostQueries?: Maybe<Array<Scalars['String']>>
  boostFunctions?: Maybe<Array<Scalars['String']>>
}

export type SolrDebugInfo_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type SplitShipmentsObjectInput = {
  originalShipment?: Maybe<ShipmentInput>
  newShipments?: Maybe<Array<Maybe<ShipmentInput>>>
}

export type SubPayment = {
  __typename?: 'SubPayment'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SubPayment>
  status?: Maybe<Scalars['String']>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  amountRefunded: Scalars['Float']
  target?: Maybe<PaymentActionTarget>
}

export type SubPayment_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type SubPaymentInput = {
  status?: Maybe<Scalars['String']>
  amountCollected: Scalars['Float']
  amountCredited: Scalars['Float']
  amountRequested: Scalars['Float']
  amountRefunded: Scalars['Float']
  target?: Maybe<PaymentActionTargetInput>
}

export type SuggestedDiscount = {
  __typename?: 'SuggestedDiscount'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SuggestedDiscount>
  productCode?: Maybe<Scalars['String']>
  autoAdd?: Maybe<Scalars['Boolean']>
  discountId: Scalars['Int']
  hasMultipleProducts?: Maybe<Scalars['Boolean']>
  hasOptions?: Maybe<Scalars['Boolean']>
}

export type SuggestedDiscount_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type SuggestedDiscountInput = {
  productCode?: Maybe<Scalars['String']>
  autoAdd?: Maybe<Scalars['Boolean']>
  discountId: Scalars['Int']
  hasMultipleProducts?: Maybe<Scalars['Boolean']>
  hasOptions?: Maybe<Scalars['Boolean']>
}

export type SuggestionEvent = {
  __typename?: 'SuggestionEvent'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SuggestionEvent>
  causeID: Scalars['Int']
  errors: Array<Scalars['String']>
  name: Scalars['String']
  type?: Maybe<TypeEnum>
}

export type SuggestionEvent_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type SuggestionLog = {
  __typename?: 'SuggestionLog'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SuggestionLog>
  created: Scalars['DateTime']
  creatorUsername: Scalars['String']
  environmentID: Scalars['Int']
  events: Array<Maybe<SuggestionEvent>>
  externalResponseID: Scalars['String']
  orderID: Scalars['Int']
  pathString: Scalars['String']
  persisted?: Maybe<Scalars['Boolean']>
  siteID: Scalars['Int']
  suggestionID: Scalars['Int']
  tenantID: Scalars['Int']
  updated: Scalars['DateTime']
  updaterUsername: Scalars['String']
}

export type SuggestionLog_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type SuggestionRequestInput = {
  bundlingStrategy?: Maybe<BundlingStrategyEnum>
  customData: Scalars['Object']
  environmentID: Scalars['Int']
  exclusionListLocationCode: Array<Maybe<ExclusionListEntryLocationCodeInput>>
  externalResponseID: Scalars['String']
  fraud: Scalars['Int']
  inventoryRequestType?: Maybe<InventoryRequestTypeEnum>
  isExpress?: Maybe<Scalars['Boolean']>
  items: Array<Maybe<OrderItemInput>>
  locationCodeWhiteList: Array<Scalars['String']>
  numShipmentsNotInRequest: Scalars['Int']
  orderID: Scalars['Int']
  orderType?: Maybe<OrderTypeEnum>
  pickupLocationCode: Scalars['String']
  shippingAddress?: Maybe<ShippingAddressInput>
  total: Scalars['Float']
}

export type SuggestionResponse = {
  __typename?: 'SuggestionResponse'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<SuggestionResponse>
  assignmentSuggestions: Scalars['Object']
  availableLocations: Array<Scalars['Int']>
  externalResponseID: Scalars['String']
  responseID: Scalars['Int']
  stateChangeSuggestions: Scalars['Object']
  suggestionLog?: Maybe<SuggestionLog>
}

export type SuggestionResponse_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type TargetRule = {
  __typename?: 'TargetRule'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TargetRule>
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  domain?: Maybe<Scalars['String']>
  expression?: Maybe<Scalars['String']>
}

export type TargetRule_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type TargetRuleCollection = {
  __typename?: 'TargetRuleCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TargetRuleCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<TargetRule>>>
}

export type TargetRuleCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type TargetRuleInput = {
  code?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  domain?: Maybe<Scalars['String']>
  expression?: Maybe<Scalars['String']>
}

export type TaskInput = {
  __typename?: 'TaskInput'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<TaskInput>
  helpMessage?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  maxLength?: Maybe<Scalars['Int']>
  maximum: Scalars['Float']
  minLength?: Maybe<Scalars['Int']>
  minimum: Scalars['Float']
  name?: Maybe<Scalars['String']>
  options?: Maybe<Array<Scalars['Object']>>
  pattern?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  type?: Maybe<Scalars['String']>
}

export type TaskInput_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type TaskInputInput = {
  helpMessage?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  maxLength?: Maybe<Scalars['Int']>
  maximum: Scalars['Float']
  minLength?: Maybe<Scalars['Int']>
  minimum: Scalars['Float']
  name?: Maybe<Scalars['String']>
  options?: Maybe<Array<Scalars['Object']>>
  pattern?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  type?: Maybe<Scalars['String']>
}

export type ThresholdMessage = {
  __typename?: 'ThresholdMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ThresholdMessage>
  discountId: Scalars['Int']
  message?: Maybe<Scalars['String']>
  thresholdValue: Scalars['Float']
  showOnCheckout?: Maybe<Scalars['Boolean']>
  showInCart?: Maybe<Scalars['Boolean']>
  requiresCouponCode?: Maybe<Scalars['Boolean']>
}

export type ThresholdMessage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ThresholdMessageInput = {
  discountId: Scalars['Int']
  message?: Maybe<Scalars['String']>
  thresholdValue: Scalars['Float']
  showOnCheckout?: Maybe<Scalars['Boolean']>
  showInCart?: Maybe<Scalars['Boolean']>
  requiresCouponCode?: Maybe<Scalars['Boolean']>
}

export type Tracking = {
  __typename?: 'Tracking'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Tracking>
  attributes?: Maybe<Scalars['Object']>
  number?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type Tracking_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type TrackingInput = {
  attributes?: Maybe<Scalars['Object']>
  number?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type Transaction = {
  __typename?: 'Transaction'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Transaction>
  transactionId?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  transactionType?: Maybe<Scalars['String']>
  interactionType?: Maybe<Scalars['String']>
  amount: Scalars['Float']
  date: Scalars['DateTime']
  currencyCode?: Maybe<Scalars['String']>
}

export type Transaction_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type TransactionInput = {
  transactionId?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  transactionType?: Maybe<Scalars['String']>
  interactionType?: Maybe<Scalars['String']>
  amount: Scalars['Float']
  date: Scalars['DateTime']
  currencyCode?: Maybe<Scalars['String']>
}

export enum TypeEnum {
  NewRequest = 'NEW_REQUEST',
  RouteSelected = 'ROUTE_SELECTED',
  MakeLocationsAvailable = 'MAKE_LOCATIONS_AVAILABLE',
  NoRouteFound = 'NO_ROUTE_FOUND',
  RemovedInactiveLocations = 'REMOVED_INACTIVE_LOCATIONS',
  RemovedOnHoldLocations = 'REMOVED_ON_HOLD_LOCATIONS',
  RemovedOverfulfilledLocations = 'REMOVED_OVERFULFILLED_LOCATIONS',
  Group = 'GROUP',
  GroupFilter = 'GROUP_FILTER',
  GroupSort = 'GROUP_SORT',
  Filter = 'FILTER',
  Sort = 'SORT',
  AfterAction = 'AFTER_ACTION',
  FoundFullOrderLocation = 'FOUND_FULL_ORDER_LOCATION',
  Response = 'RESPONSE',
  AfterActionSort = 'AFTER_ACTION_SORT',
  DefaultResponse = 'DEFAULT_RESPONSE',
  MaxSplitsExceeded = 'MAX_SPLITS_EXCEEDED',
  AutoAssignLimitExceeded = 'AUTO_ASSIGN_LIMIT_EXCEEDED',
  InventoryRequest = 'INVENTORY_REQUEST',
  RemovedInternationalLocations = 'REMOVED_INTERNATIONAL_LOCATIONS',
}

export type UserRole = {
  __typename?: 'UserRole'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<UserRole>
  userId?: Maybe<Scalars['String']>
  assignedInScope?: Maybe<UserScope>
  roleId: Scalars['Int']
  roleName?: Maybe<Scalars['String']>
  roleTags?: Maybe<Array<Scalars['String']>>
  auditInfo?: Maybe<CuAuditInfo>
}

export type UserRole_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type UserRoleCollection = {
  __typename?: 'UserRoleCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<UserRoleCollection>
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<UserRole>>>
}

export type UserRoleCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type UserRoleInput = {
  userId?: Maybe<Scalars['String']>
  assignedInScope?: Maybe<UserScopeInput>
  roleId: Scalars['Int']
  roleName?: Maybe<Scalars['String']>
  roleTags?: Maybe<Array<Scalars['String']>>
  auditInfo?: Maybe<CuAuditInfoInput>
}

export type UserScope = {
  __typename?: 'UserScope'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<UserScope>
  type?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

export type UserScope_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type UserScopeInput = {
  type?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

export type ValidationMessage = {
  __typename?: 'ValidationMessage'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ValidationMessage>
  severity?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  validationType?: Maybe<Scalars['String']>
  sourceId?: Maybe<Scalars['String']>
}

export type ValidationMessage_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type VariationOption = {
  __typename?: 'VariationOption'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<VariationOption>
  valueSequence: Scalars['Int']
  attributeFQN?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Object']>
}

export type VariationOption_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type VariationSummary = {
  __typename?: 'VariationSummary'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<VariationSummary>
  productCode?: Maybe<Scalars['String']>
  options?: Maybe<Array<Maybe<VariationOption>>>
  inventoryInfo?: Maybe<ProductInventoryInfo>
}

export type VariationSummary_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type View = {
  __typename?: 'View'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<View>
  name?: Maybe<Scalars['String']>
  usages?: Maybe<Array<Scalars['String']>>
  metadata?: Maybe<Scalars['Object']>
  isVisibleInStorefront?: Maybe<Scalars['Boolean']>
  filter?: Maybe<Scalars['String']>
  includeInactiveMode?: Maybe<Scalars['String']>
  isAdminDefault?: Maybe<Scalars['Boolean']>
  fields?: Maybe<Array<Maybe<ViewField>>>
}

export type View_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ViewField = {
  __typename?: 'ViewField'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<ViewField>
  name?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
}

export type ViewField_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type ViewFieldInput = {
  name?: Maybe<Scalars['String']>
  target?: Maybe<Scalars['String']>
}

export type ViewInput = {
  name?: Maybe<Scalars['String']>
  usages?: Maybe<Array<Scalars['String']>>
  metadata?: Maybe<Scalars['Object']>
  isVisibleInStorefront?: Maybe<Scalars['Boolean']>
  filter?: Maybe<Scalars['String']>
  includeInactiveMode?: Maybe<Scalars['String']>
  isAdminDefault?: Maybe<Scalars['Boolean']>
  fields?: Maybe<Array<Maybe<ViewFieldInput>>>
}

export type Wishlist = {
  __typename?: 'Wishlist'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<Wishlist>
  customerAccountId?: Maybe<Scalars['Int']>
  typeTag?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<WishlistItem>>>
  privacyType?: Maybe<Scalars['String']>
  sortOrder?: Maybe<Scalars['Int']>
  version?: Maybe<Scalars['String']>
  isImport?: Maybe<Scalars['Boolean']>
  importDate?: Maybe<Scalars['DateTime']>
  externalId?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  channelCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  fulfillmentInfo?: Maybe<FulfillmentInfo>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscount>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscount>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  subtotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  taxTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessage>>>
  extendedProperties?: Maybe<Array<Maybe<ExtendedProperty>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessage>>>
  auditInfo?: Maybe<CrAuditInfo>
}

export type Wishlist_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type WishlistCollection = {
  __typename?: 'WishlistCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<WishlistCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<Wishlist>>>
}

export type WishlistCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type WishlistInput = {
  customerAccountId?: Maybe<Scalars['Int']>
  typeTag?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<WishlistItemInput>>>
  privacyType?: Maybe<Scalars['String']>
  sortOrder?: Maybe<Scalars['Int']>
  version?: Maybe<Scalars['String']>
  isImport?: Maybe<Scalars['Boolean']>
  importDate?: Maybe<Scalars['DateTime']>
  externalId?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  tenantId?: Maybe<Scalars['Int']>
  siteId?: Maybe<Scalars['Int']>
  channelCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  visitId?: Maybe<Scalars['String']>
  webSessionId?: Maybe<Scalars['String']>
  customerInteractionType?: Maybe<Scalars['String']>
  fulfillmentInfo?: Maybe<FulfillmentInfoInput>
  orderDiscounts?: Maybe<Array<Maybe<CrAppliedDiscountInput>>>
  suggestedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  rejectedDiscounts?: Maybe<Array<Maybe<SuggestedDiscountInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  subtotal?: Maybe<Scalars['Float']>
  discountedSubtotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  shippingSubTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  handlingTaxTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  taxTotal?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  lineItemSubtotalWithOrderAdjustments?: Maybe<Scalars['Float']>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  lastValidationDate?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  changeMessages?: Maybe<Array<Maybe<ChangeMessageInput>>>
  extendedProperties?: Maybe<Array<Maybe<ExtendedPropertyInput>>>
  discountThresholdMessages?: Maybe<Array<Maybe<ThresholdMessageInput>>>
  auditInfo?: Maybe<CrAuditInfoInput>
}

export type WishlistItem = {
  __typename?: 'WishlistItem'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<WishlistItem>
  id?: Maybe<Scalars['String']>
  comments?: Maybe<Scalars['String']>
  priorityType?: Maybe<Scalars['String']>
  purchasableStatusType?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  product?: Maybe<CrProduct>
  quantity: Scalars['Int']
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  subtotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  taxableTotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CommerceUnitPrice>
  productDiscount?: Maybe<AppliedLineItemProductDiscount>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscount>>>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscount>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  parentItemId?: Maybe<Scalars['String']>
}

export type WishlistItem_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type WishlistItemCollection = {
  __typename?: 'WishlistItemCollection'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<WishlistItemCollection>
  startIndex: Scalars['Int']
  pageSize: Scalars['Int']
  pageCount: Scalars['Int']
  totalCount: Scalars['Int']
  items?: Maybe<Array<Maybe<WishlistItem>>>
}

export type WishlistItemCollection_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type WishlistItemInput = {
  id?: Maybe<Scalars['String']>
  comments?: Maybe<Scalars['String']>
  priorityType?: Maybe<Scalars['String']>
  purchasableStatusType?: Maybe<Scalars['String']>
  localeCode?: Maybe<Scalars['String']>
  purchaseLocation?: Maybe<Scalars['String']>
  lineId?: Maybe<Scalars['Int']>
  product?: Maybe<CrProductInput>
  quantity: Scalars['Int']
  isRecurring?: Maybe<Scalars['Boolean']>
  isTaxable?: Maybe<Scalars['Boolean']>
  subtotal?: Maybe<Scalars['Float']>
  extendedTotal?: Maybe<Scalars['Float']>
  taxableTotal?: Maybe<Scalars['Float']>
  discountTotal?: Maybe<Scalars['Float']>
  discountedTotal?: Maybe<Scalars['Float']>
  itemTaxTotal?: Maybe<Scalars['Float']>
  shippingTaxTotal?: Maybe<Scalars['Float']>
  shippingTotal?: Maybe<Scalars['Float']>
  handlingAmount?: Maybe<Scalars['Float']>
  feeTotal?: Maybe<Scalars['Float']>
  total?: Maybe<Scalars['Float']>
  unitPrice?: Maybe<CommerceUnitPriceInput>
  productDiscount?: Maybe<AppliedLineItemProductDiscountInput>
  productDiscounts?: Maybe<Array<Maybe<AppliedLineItemProductDiscountInput>>>
  shippingDiscounts?: Maybe<Array<Maybe<AppliedLineItemShippingDiscountInput>>>
  data?: Maybe<Scalars['Object']>
  taxData?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfoInput>
  shippingAmountBeforeDiscountsAndAdjustments?: Maybe<Scalars['Float']>
  weightedOrderAdjustment?: Maybe<Scalars['Float']>
  weightedOrderDiscount?: Maybe<Scalars['Float']>
  adjustedLineItemSubtotal?: Maybe<Scalars['Float']>
  totalWithoutWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderTax?: Maybe<Scalars['Float']>
  weightedOrderShipping?: Maybe<Scalars['Float']>
  weightedOrderShippingDiscount?: Maybe<Scalars['Float']>
  weightedOrderShippingManualAdjustment?: Maybe<Scalars['Float']>
  weightedOrderShippingTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFee?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeTax?: Maybe<Scalars['Float']>
  weightedOrderHandlingFeeDiscount?: Maybe<Scalars['Float']>
  weightedOrderDuty?: Maybe<Scalars['Float']>
  totalWithWeightedShippingAndHandling?: Maybe<Scalars['Float']>
  weightedOrderHandlingAdjustment?: Maybe<Scalars['Float']>
  autoAddDiscountId?: Maybe<Scalars['Int']>
  isAssemblyRequired?: Maybe<Scalars['Boolean']>
  childItemIds?: Maybe<Array<Scalars['String']>>
  parentItemId?: Maybe<Scalars['String']>
}

export type WorkflowState = {
  __typename?: 'WorkflowState'
  _get?: Maybe<Scalars['AnyScalar']>
  _root?: Maybe<WorkflowState>
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfo>
  completedDate?: Maybe<Scalars['DateTime']>
  processInstanceId?: Maybe<Scalars['String']>
  shipmentState?: Maybe<Scalars['String']>
  taskList?: Maybe<Array<Maybe<FulfillmentTask>>>
}

export type WorkflowState_GetArgs = {
  path: Scalars['String']
  defaultValue?: Maybe<Scalars['AnyScalar']>
  allowUndefined?: Maybe<Scalars['Boolean']>
}

export type WorkflowStateInput = {
  attributes?: Maybe<Scalars['Object']>
  auditInfo?: Maybe<CrAuditInfoInput>
  completedDate?: Maybe<Scalars['DateTime']>
  processInstanceId?: Maybe<Scalars['String']>
  shipmentState?: Maybe<Scalars['String']>
  taskList?: Maybe<Array<Maybe<FulfillmentTaskInput>>>
}
