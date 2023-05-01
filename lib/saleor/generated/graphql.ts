/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: string;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: string;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: unknown;
  JSONString: string;
  /**
   * Metadata is a map of key-value pairs, both keys and values are `String`.
   *
   * Example:
   * ```
   * {
   *     "key1": "value1",
   *     "key2": "value2"
   * }
   * ```
   */
  Metadata: Record<string, string>;
  /**
   * Nonnegative Decimal scalar implementation.
   *
   * Should be used in places where value must be nonnegative (0 or greater).
   */
  PositiveDecimal: number;
  UUID: string;
  /** Variables of this type must be set to null in mutations. They will be replaced with a filename from a following multipart part containing a binary file. See: https://github.com/jaydenseric/graphql-multipart-request-spec. */
  Upload: unknown;
  WeightScalar: number;
  /** _Any value scalar as defined by Federation spec. */
  _Any: unknown;
};

/**
 * Create a new address for the customer.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type AccountAddressCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  errors: Array<AccountError>;
  /** A user instance for which the address was created. */
  user?: Maybe<User>;
};

/** Delete an address of the logged-in user. Requires one of the following permissions: MANAGE_USERS, IS_OWNER. */
export type AccountAddressDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  errors: Array<AccountError>;
  /** A user instance for which the address was deleted. */
  user?: Maybe<User>;
};

/** Updates an address of the logged-in user. Requires one of the following permissions: MANAGE_USERS, IS_OWNER. */
export type AccountAddressUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  errors: Array<AccountError>;
  /** A user object for which the address was edited. */
  user?: Maybe<User>;
};

/**
 * Remove user account.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type AccountDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  user?: Maybe<User>;
};

export type AccountError = {
  /** A type of address that causes the error. */
  addressType?: Maybe<AddressTypeEnum>;
  /** The error code. */
  code: AccountErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum AccountErrorCode {
  AccountNotConfirmed = 'ACCOUNT_NOT_CONFIRMED',
  ActivateOwnAccount = 'ACTIVATE_OWN_ACCOUNT',
  ActivateSuperuserAccount = 'ACTIVATE_SUPERUSER_ACCOUNT',
  ChannelInactive = 'CHANNEL_INACTIVE',
  DeactivateOwnAccount = 'DEACTIVATE_OWN_ACCOUNT',
  DeactivateSuperuserAccount = 'DEACTIVATE_SUPERUSER_ACCOUNT',
  DeleteNonStaffUser = 'DELETE_NON_STAFF_USER',
  DeleteOwnAccount = 'DELETE_OWN_ACCOUNT',
  DeleteStaffAccount = 'DELETE_STAFF_ACCOUNT',
  DeleteSuperuserAccount = 'DELETE_SUPERUSER_ACCOUNT',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Inactive = 'INACTIVE',
  Invalid = 'INVALID',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidPassword = 'INVALID_PASSWORD',
  JwtDecodeError = 'JWT_DECODE_ERROR',
  JwtInvalidCsrfToken = 'JWT_INVALID_CSRF_TOKEN',
  JwtInvalidToken = 'JWT_INVALID_TOKEN',
  JwtMissingToken = 'JWT_MISSING_TOKEN',
  JwtSignatureExpired = 'JWT_SIGNATURE_EXPIRED',
  LeftNotManageablePermission = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  MissingChannelSlug = 'MISSING_CHANNEL_SLUG',
  NotFound = 'NOT_FOUND',
  OutOfScopeGroup = 'OUT_OF_SCOPE_GROUP',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  OutOfScopeUser = 'OUT_OF_SCOPE_USER',
  PasswordEntirelyNumeric = 'PASSWORD_ENTIRELY_NUMERIC',
  PasswordResetAlreadyRequested = 'PASSWORD_RESET_ALREADY_REQUESTED',
  PasswordTooCommon = 'PASSWORD_TOO_COMMON',
  PasswordTooShort = 'PASSWORD_TOO_SHORT',
  PasswordTooSimilar = 'PASSWORD_TOO_SIMILAR',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type AccountInput = {
  /** Billing address of the customer. */
  defaultBillingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: InputMaybe<AddressInput>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
};

/** Register a new user. */
export type AccountRegister = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** Informs whether users need to confirm their email address. */
  requiresConfirmation?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type AccountRegisterInput = {
  /** Slug of a channel which will be used to notify users. Optional when only one channel exists. */
  channel?: InputMaybe<Scalars['String']>;
  /** The email address of the user. */
  email: Scalars['String'];
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** User public metadata. */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Password. */
  password: Scalars['String'];
  /** Base of frontend URL that will be needed to create confirmation URL. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

/**
 * Sends an email with the account removal link for the logged-in user.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type AccountRequestDeletion = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
};

/**
 * Sets a default address for the authenticated user.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type AccountSetDefaultAddress = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/**
 * Updates the account of the logged-in user.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type AccountUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Represents user address data. */
export type Address = Node &
  ObjectWithMetadata & {
    city: Scalars['String'];
    cityArea: Scalars['String'];
    companyName: Scalars['String'];
    /** Shop's default country. */
    country: CountryDisplay;
    countryArea: Scalars['String'];
    firstName: Scalars['String'];
    id: Scalars['ID'];
    /** Address is user's default billing address. */
    isDefaultBillingAddress?: Maybe<Scalars['Boolean']>;
    /** Address is user's default shipping address. */
    isDefaultShippingAddress?: Maybe<Scalars['Boolean']>;
    lastName: Scalars['String'];
    /**
     * List of public metadata items. Can be accessed without permissions.
     *
     * Added in Saleor 3.10.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.10.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.10.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    phone?: Maybe<Scalars['String']>;
    postalCode: Scalars['String'];
    /**
     * List of private metadata items. Requires staff permissions to access.
     *
     * Added in Saleor 3.10.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.10.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.10.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    streetAddress1: Scalars['String'];
    streetAddress2: Scalars['String'];
  };

/** Represents user address data. */
export type AddressMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents user address data. */
export type AddressMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents user address data. */
export type AddressPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents user address data. */
export type AddressPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Creates user address.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type AddressCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  errors: Array<AccountError>;
  /** A user instance for which the address was created. */
  user?: Maybe<User>;
};

/**
 * Event sent when new address is created.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AddressCreated = Event & {
  /** The address the event relates to. */
  address?: Maybe<Address>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes an address.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type AddressDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  errors: Array<AccountError>;
  /** A user instance for which the address was deleted. */
  user?: Maybe<User>;
};

/**
 * Event sent when address is deleted.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AddressDeleted = Event & {
  /** The address the event relates to. */
  address?: Maybe<Address>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  /** City. */
  city?: InputMaybe<Scalars['String']>;
  /** District. */
  cityArea?: InputMaybe<Scalars['String']>;
  /** Company or organization. */
  companyName?: InputMaybe<Scalars['String']>;
  /** Country. */
  country?: InputMaybe<CountryCode>;
  /** State or province. */
  countryArea?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** Phone number. */
  phone?: InputMaybe<Scalars['String']>;
  /** Postal code. */
  postalCode?: InputMaybe<Scalars['String']>;
  /** Address. */
  streetAddress1?: InputMaybe<Scalars['String']>;
  /** Address. */
  streetAddress2?: InputMaybe<Scalars['String']>;
};

/**
 * Sets a default address for the given user.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type AddressSetDefault = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum AddressTypeEnum {
  Billing = 'BILLING',
  Shipping = 'SHIPPING'
}

/**
 * Updates an address.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type AddressUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
  errors: Array<AccountError>;
  /** A user object for which the address was edited. */
  user?: Maybe<User>;
};

/**
 * Event sent when address is updated.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AddressUpdated = Event & {
  /** The address the event relates to. */
  address?: Maybe<Address>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type AddressValidationData = {
  addressFormat: Scalars['String'];
  addressLatinFormat: Scalars['String'];
  allowedFields: Array<Scalars['String']>;
  cityAreaChoices: Array<ChoiceValue>;
  cityAreaType: Scalars['String'];
  cityChoices: Array<ChoiceValue>;
  cityType: Scalars['String'];
  countryAreaChoices: Array<ChoiceValue>;
  countryAreaType: Scalars['String'];
  countryCode: Scalars['String'];
  countryName: Scalars['String'];
  postalCodeExamples: Array<Scalars['String']>;
  postalCodeMatchers: Array<Scalars['String']>;
  postalCodePrefix: Scalars['String'];
  postalCodeType: Scalars['String'];
  requiredFields: Array<Scalars['String']>;
  upperFields: Array<Scalars['String']>;
};

/** Represents allocation. */
export type Allocation = Node & {
  id: Scalars['ID'];
  /**
   * Quantity allocated for orders.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS.
   */
  quantity: Scalars['Int'];
  /**
   * The warehouse were items were allocated.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS.
   */
  warehouse: Warehouse;
};

/**
 * Determine the allocation strategy for the channel.
 *
 *     PRIORITIZE_SORTING_ORDER - allocate stocks according to the warehouses' order
 *     within the channel
 *
 *     PRIORITIZE_HIGH_STOCK - allocate stock in a warehouse with the most stock
 *
 */
export enum AllocationStrategyEnum {
  PrioritizeHighStock = 'PRIORITIZE_HIGH_STOCK',
  PrioritizeSortingOrder = 'PRIORITIZE_SORTING_ORDER'
}

/** Represents app data. */
export type App = Node &
  ObjectWithMetadata & {
    /** Description of this app. */
    aboutApp?: Maybe<Scalars['String']>;
    /** JWT token used to authenticate by thridparty app. */
    accessToken?: Maybe<Scalars['String']>;
    /** URL to iframe with the app. */
    appUrl?: Maybe<Scalars['String']>;
    /**
     * URL to iframe with the configuration for the app.
     * @deprecated This field will be removed in Saleor 4.0. Use `appUrl` instead.
     */
    configurationUrl?: Maybe<Scalars['String']>;
    /** The date and time when the app was created. */
    created?: Maybe<Scalars['DateTime']>;
    /**
     * Description of the data privacy defined for this app.
     * @deprecated This field will be removed in Saleor 4.0. Use `dataPrivacyUrl` instead.
     */
    dataPrivacy?: Maybe<Scalars['String']>;
    /** URL to details about the privacy policy on the app owner page. */
    dataPrivacyUrl?: Maybe<Scalars['String']>;
    /**
     * App's dashboard extensions.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    extensions: Array<AppExtension>;
    /** Homepage of the app. */
    homepageUrl?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    /** Determine if app will be set active or not. */
    isActive?: Maybe<Scalars['Boolean']>;
    /**
     * URL to manifest used during app's installation.
     *
     * Added in Saleor 3.5.
     */
    manifestUrl?: Maybe<Scalars['String']>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** Name of the app. */
    name?: Maybe<Scalars['String']>;
    /** List of the app's permissions. */
    permissions?: Maybe<Array<Permission>>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** Support page for the app. */
    supportUrl?: Maybe<Scalars['String']>;
    /**
     * Last 4 characters of the tokens.
     *
     * Requires one of the following permissions: MANAGE_APPS, OWNER.
     */
    tokens?: Maybe<Array<AppToken>>;
    /** Type of the app. */
    type?: Maybe<AppTypeEnum>;
    /** Version number of the app. */
    version?: Maybe<Scalars['String']>;
    /**
     * List of webhooks assigned to this app.
     *
     * Requires one of the following permissions: MANAGE_APPS, OWNER.
     */
    webhooks?: Maybe<Array<Webhook>>;
  };

/** Represents app data. */
export type AppMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents app data. */
export type AppMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents app data. */
export type AppPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents app data. */
export type AppPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Activate the app.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppActivate = {
  app?: Maybe<App>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  errors: Array<AppError>;
};

export type AppCountableConnection = {
  edges: Array<AppCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AppCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: App;
};

/** Creates a new app. Requires the following permissions: AUTHENTICATED_STAFF_USER and MANAGE_APPS. */
export type AppCreate = {
  app?: Maybe<App>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  errors: Array<AppError>;
};

/**
 * Deactivate the app.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppDeactivate = {
  app?: Maybe<App>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  errors: Array<AppError>;
};

/**
 * Deletes an app.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppDelete = {
  app?: Maybe<App>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  errors: Array<AppError>;
};

/**
 * Delete failed installation.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppDeleteFailedInstallation = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
  errors: Array<AppError>;
};

/**
 * Event sent when app is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AppDeleted = Event & {
  /** The application the event relates to. */
  app?: Maybe<App>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type AppError = {
  /** The error code. */
  code: AppErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
};

/** An enumeration. */
export enum AppErrorCode {
  Forbidden = 'FORBIDDEN',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidCustomHeaders = 'INVALID_CUSTOM_HEADERS',
  InvalidManifestFormat = 'INVALID_MANIFEST_FORMAT',
  InvalidPermission = 'INVALID_PERMISSION',
  InvalidStatus = 'INVALID_STATUS',
  InvalidUrlFormat = 'INVALID_URL_FORMAT',
  ManifestUrlCantConnect = 'MANIFEST_URL_CANT_CONNECT',
  NotFound = 'NOT_FOUND',
  OutOfScopeApp = 'OUT_OF_SCOPE_APP',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Represents app data. */
export type AppExtension = Node & {
  /** JWT token used to authenticate by thridparty app extension. */
  accessToken?: Maybe<Scalars['String']>;
  app: App;
  id: Scalars['ID'];
  /** Label of the extension to show in the dashboard. */
  label: Scalars['String'];
  /** Place where given extension will be mounted. */
  mount: AppExtensionMountEnum;
  /** List of the app extension's permissions. */
  permissions: Array<Permission>;
  /** Type of way how app extension will be opened. */
  target: AppExtensionTargetEnum;
  /** URL of a view where extension's iframe is placed. */
  url: Scalars['String'];
};

export type AppExtensionCountableConnection = {
  edges: Array<AppExtensionCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AppExtensionCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AppExtension;
};

export type AppExtensionFilterInput = {
  mount?: InputMaybe<Array<AppExtensionMountEnum>>;
  target?: InputMaybe<AppExtensionTargetEnum>;
};

/** All places where app extension can be mounted. */
export enum AppExtensionMountEnum {
  CustomerDetailsMoreActions = 'CUSTOMER_DETAILS_MORE_ACTIONS',
  CustomerOverviewCreate = 'CUSTOMER_OVERVIEW_CREATE',
  CustomerOverviewMoreActions = 'CUSTOMER_OVERVIEW_MORE_ACTIONS',
  NavigationCatalog = 'NAVIGATION_CATALOG',
  NavigationCustomers = 'NAVIGATION_CUSTOMERS',
  NavigationDiscounts = 'NAVIGATION_DISCOUNTS',
  NavigationOrders = 'NAVIGATION_ORDERS',
  NavigationPages = 'NAVIGATION_PAGES',
  NavigationTranslations = 'NAVIGATION_TRANSLATIONS',
  OrderDetailsMoreActions = 'ORDER_DETAILS_MORE_ACTIONS',
  OrderOverviewCreate = 'ORDER_OVERVIEW_CREATE',
  OrderOverviewMoreActions = 'ORDER_OVERVIEW_MORE_ACTIONS',
  ProductDetailsMoreActions = 'PRODUCT_DETAILS_MORE_ACTIONS',
  ProductOverviewCreate = 'PRODUCT_OVERVIEW_CREATE',
  ProductOverviewMoreActions = 'PRODUCT_OVERVIEW_MORE_ACTIONS'
}

/**
 * All available ways of opening an app extension.
 *
 *     POPUP - app's extension will be mounted as a popup window
 *     APP_PAGE - redirect to app's page
 *
 */
export enum AppExtensionTargetEnum {
  AppPage = 'APP_PAGE',
  Popup = 'POPUP'
}

/**
 * Fetch and validate manifest.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppFetchManifest = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  errors: Array<AppError>;
  manifest?: Maybe<Manifest>;
};

export type AppFilterInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AppTypeEnum>;
};

export type AppInput = {
  /** Name of the app. */
  name?: InputMaybe<Scalars['String']>;
  /** List of permission code names to assign to this app. */
  permissions?: InputMaybe<Array<PermissionEnum>>;
};

/** Install new app by using app manifest. Requires the following permissions: AUTHENTICATED_STAFF_USER and MANAGE_APPS. */
export type AppInstall = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
  errors: Array<AppError>;
};

export type AppInstallInput = {
  /** Determine if app will be set active or not. */
  activateAfterInstallation?: InputMaybe<Scalars['Boolean']>;
  /** Name of the app to install. */
  appName?: InputMaybe<Scalars['String']>;
  /** Url to app's manifest in JSON format. */
  manifestUrl?: InputMaybe<Scalars['String']>;
  /** List of permission code names to assign to this app. */
  permissions?: InputMaybe<Array<PermissionEnum>>;
};

/** Represents ongoing installation of app. */
export type AppInstallation = Job &
  Node & {
    appName: Scalars['String'];
    /** Created date time of job in ISO 8601 format. */
    createdAt: Scalars['DateTime'];
    id: Scalars['ID'];
    manifestUrl: Scalars['String'];
    /** Job message. */
    message?: Maybe<Scalars['String']>;
    /** Job status. */
    status: JobStatusEnum;
    /** Date time of job last update in ISO 8601 format. */
    updatedAt: Scalars['DateTime'];
  };

/**
 * Event sent when new app is installed.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AppInstalled = Event & {
  /** The application the event relates to. */
  app?: Maybe<App>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type AppManifestExtension = {
  /** Label of the extension to show in the dashboard. */
  label: Scalars['String'];
  /** Place where given extension will be mounted. */
  mount: AppExtensionMountEnum;
  /** List of the app extension's permissions. */
  permissions: Array<Permission>;
  /** Type of way how app extension will be opened. */
  target: AppExtensionTargetEnum;
  /** URL of a view where extension's iframe is placed. */
  url: Scalars['String'];
};

export type AppManifestWebhook = {
  /** The asynchronous events that webhook wants to subscribe. */
  asyncEvents?: Maybe<Array<WebhookEventTypeAsyncEnum>>;
  /** The name of the webhook. */
  name: Scalars['String'];
  /** Subscription query of a webhook */
  query: Scalars['String'];
  /** The synchronous events that webhook wants to subscribe. */
  syncEvents?: Maybe<Array<WebhookEventTypeSyncEnum>>;
  /** The url to receive the payload. */
  targetUrl: Scalars['String'];
};

/**
 * Retry failed installation of new app.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppRetryInstall = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
  errors: Array<AppError>;
};

export enum AppSortField {
  /** Sort apps by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort apps by name. */
  Name = 'NAME'
}

export type AppSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort apps by the selected field. */
  field: AppSortField;
};

/**
 * Event sent when app status has changed.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AppStatusChanged = Event & {
  /** The application the event relates to. */
  app?: Maybe<App>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents token data. */
export type AppToken = Node & {
  /** Last 4 characters of the token. */
  authToken?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Name of the authenticated token. */
  name?: Maybe<Scalars['String']>;
};

/**
 * Creates a new token.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppTokenCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  appToken?: Maybe<AppToken>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  errors: Array<AppError>;
};

/**
 * Deletes an authentication token assigned to app.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppTokenDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  appToken?: Maybe<AppToken>;
  errors: Array<AppError>;
};

export type AppTokenInput = {
  /** ID of app. */
  app: Scalars['ID'];
  /** Name of the token. */
  name?: InputMaybe<Scalars['String']>;
};

/** Verify provided app token. */
export type AppTokenVerify = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  errors: Array<AppError>;
  /** Determine if token is valid or not. */
  valid: Scalars['Boolean'];
};

/** Enum determining type of your App. */
export enum AppTypeEnum {
  /** Local Saleor App. The app is fully manageable from dashboard. You can change assigned permissions, add webhooks, or authentication token */
  Local = 'LOCAL',
  /** Third party external App. Installation is fully automated. Saleor uses a defined App manifest to gather all required information. */
  Thirdparty = 'THIRDPARTY'
}

/**
 * Updates an existing app.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type AppUpdate = {
  app?: Maybe<App>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  appErrors: Array<AppError>;
  errors: Array<AppError>;
};

/**
 * Event sent when app is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AppUpdated = Event & {
  /** The application the event relates to. */
  app?: Maybe<App>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum AreaUnitsEnum {
  SqCm = 'SQ_CM',
  SqFt = 'SQ_FT',
  SqInch = 'SQ_INCH',
  SqKm = 'SQ_KM',
  SqM = 'SQ_M',
  SqYd = 'SQ_YD'
}

/**
 * Assigns storefront's navigation menus.
 *
 * Requires one of the following permissions: MANAGE_MENUS, MANAGE_SETTINGS.
 */
export type AssignNavigation = {
  errors: Array<MenuError>;
  /** Assigned navigation menu. */
  menu?: Maybe<Menu>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
};

/**
 * Represents assigned attribute to variant with variant selection attached.
 *
 * Added in Saleor 3.1.
 */
export type AssignedVariantAttribute = {
  /** Attribute assigned to variant. */
  attribute: Attribute;
  /** Determines, whether assigned attribute is allowed for variant selection. Supported variant types for variant selection are: ['dropdown', 'boolean', 'swatch', 'numeric'] */
  variantSelection: Scalars['Boolean'];
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type Attribute = Node &
  ObjectWithMetadata & {
    /**
     * Whether the attribute can be displayed in the admin product list. Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES, MANAGE_PRODUCTS, MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
     * @deprecated This field will be removed in Saleor 4.0.
     */
    availableInGrid: Scalars['Boolean'];
    /** List of attribute's values. */
    choices?: Maybe<AttributeValueCountableConnection>;
    /** The entity type which can be used as a reference. */
    entityType?: Maybe<AttributeEntityTypeEnum>;
    /**
     * External ID of this attribute.
     *
     * Added in Saleor 3.10.
     */
    externalReference?: Maybe<Scalars['String']>;
    /** Whether the attribute can be filtered in dashboard. Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES, MANAGE_PRODUCTS, MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES. */
    filterableInDashboard: Scalars['Boolean'];
    /**
     * Whether the attribute can be filtered in storefront. Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES, MANAGE_PRODUCTS, MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
     * @deprecated This field will be removed in Saleor 4.0.
     */
    filterableInStorefront: Scalars['Boolean'];
    id: Scalars['ID'];
    /** The input type to use for entering attribute values in the dashboard. */
    inputType?: Maybe<AttributeInputTypeEnum>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** Name of an attribute displayed in the interface. */
    name?: Maybe<Scalars['String']>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    productTypes: ProductTypeCountableConnection;
    productVariantTypes: ProductTypeCountableConnection;
    /** Internal representation of an attribute name. */
    slug?: Maybe<Scalars['String']>;
    /**
     * The position of the attribute in the storefront navigation (0 by default). Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES, MANAGE_PRODUCTS, MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
     * @deprecated This field will be removed in Saleor 4.0.
     */
    storefrontSearchPosition: Scalars['Int'];
    /** Returns translated attribute fields for the given language code. */
    translation?: Maybe<AttributeTranslation>;
    /** The attribute type. */
    type?: Maybe<AttributeTypeEnum>;
    /** The unit of attribute values. */
    unit?: Maybe<MeasurementUnitsEnum>;
    /** Whether the attribute requires values to be passed or not. Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES, MANAGE_PRODUCTS, MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES. */
    valueRequired: Scalars['Boolean'];
    /** Whether the attribute should be visible or not in storefront. Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES, MANAGE_PRODUCTS, MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES. */
    visibleInStorefront: Scalars['Boolean'];
    /** Flag indicating that attribute has predefined choices. */
    withChoices: Scalars['Boolean'];
  };

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeChoicesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AttributeValueFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<AttributeChoicesSortingInput>;
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeMetafieldArgs = {
  key: Scalars['String'];
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeProductTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeProductVariantTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Deletes attributes.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type AttributeBulkDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<AttributeError>;
};

export enum AttributeChoicesSortField {
  /** Sort attribute choice by name. */
  Name = 'NAME',
  /** Sort attribute choice by slug. */
  Slug = 'SLUG'
}

export type AttributeChoicesSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort attribute choices by the selected field. */
  field: AttributeChoicesSortField;
};

export type AttributeCountableConnection = {
  edges: Array<AttributeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Attribute;
};

/** Creates an attribute. */
export type AttributeCreate = {
  attribute?: Maybe<Attribute>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  errors: Array<AttributeError>;
};

export type AttributeCreateInput = {
  /**
   * Whether the attribute can be displayed in the admin product list.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  availableInGrid?: InputMaybe<Scalars['Boolean']>;
  /** The entity type which can be used as a reference. */
  entityType?: InputMaybe<AttributeEntityTypeEnum>;
  /**
   * External ID of this attribute.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  /**
   * Whether the attribute can be filtered in storefront.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  filterableInStorefront?: InputMaybe<Scalars['Boolean']>;
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: InputMaybe<AttributeInputTypeEnum>;
  /** Whether the attribute is for variants only. */
  isVariantOnly?: InputMaybe<Scalars['Boolean']>;
  /** Name of an attribute displayed in the interface. */
  name: Scalars['String'];
  /** Internal representation of an attribute name. */
  slug?: InputMaybe<Scalars['String']>;
  /**
   * The position of the attribute in the storefront navigation (0 by default).
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  storefrontSearchPosition?: InputMaybe<Scalars['Int']>;
  /** The attribute type. */
  type: AttributeTypeEnum;
  /** The unit of attribute values. */
  unit?: InputMaybe<MeasurementUnitsEnum>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  /** List of attribute's values. */
  values?: InputMaybe<Array<AttributeValueCreateInput>>;
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Event sent when new attribute is created.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AttributeCreated = Event & {
  /** The attribute the event relates to. */
  attribute?: Maybe<Attribute>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes an attribute.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type AttributeDelete = {
  attribute?: Maybe<Attribute>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  errors: Array<AttributeError>;
};

/**
 * Event sent when attribute is deleted.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AttributeDeleted = Event & {
  /** The attribute the event relates to. */
  attribute?: Maybe<Attribute>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum AttributeEntityTypeEnum {
  Page = 'PAGE',
  Product = 'PRODUCT',
  ProductVariant = 'PRODUCT_VARIANT'
}

export type AttributeEntityTypeEnumFilterInput = {
  /** The value equal to. */
  eq?: InputMaybe<AttributeEntityTypeEnum>;
  /** The value included in. */
  oneOf?: InputMaybe<Array<AttributeEntityTypeEnum>>;
};

export type AttributeError = {
  /** The error code. */
  code: AttributeErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum AttributeErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type AttributeFilterInput = {
  availableInGrid?: InputMaybe<Scalars['Boolean']>;
  /**
   * Specifies the channel by which the data should be filtered.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  filterableInStorefront?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  inCategory?: InputMaybe<Scalars['ID']>;
  inCollection?: InputMaybe<Scalars['ID']>;
  isVariantOnly?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<AttributeTypeEnum>;
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  visibleInStorefront?: InputMaybe<Scalars['Boolean']>;
};

export type AttributeInput = {
  /** The boolean value of the attribute. */
  boolean?: InputMaybe<Scalars['Boolean']>;
  /** The date range that the returned values should be in. In case of date/time attributes, the UTC midnight of the given date is used. */
  date?: InputMaybe<DateRangeInput>;
  /** The date/time range that the returned values should be in. */
  dateTime?: InputMaybe<DateTimeRangeInput>;
  /** Internal representation of an attribute name. */
  slug: Scalars['String'];
  /** Internal representation of a value (unique per attribute). */
  values?: InputMaybe<Array<Scalars['String']>>;
  /** The range that the returned values should be in. */
  valuesRange?: InputMaybe<IntRangeInput>;
};

/** An enumeration. */
export enum AttributeInputTypeEnum {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Dropdown = 'DROPDOWN',
  File = 'FILE',
  Multiselect = 'MULTISELECT',
  Numeric = 'NUMERIC',
  PlainText = 'PLAIN_TEXT',
  Reference = 'REFERENCE',
  RichText = 'RICH_TEXT',
  Swatch = 'SWATCH'
}

export type AttributeInputTypeEnumFilterInput = {
  /** The value equal to. */
  eq?: InputMaybe<AttributeInputTypeEnum>;
  /** The value included in. */
  oneOf?: InputMaybe<Array<AttributeInputTypeEnum>>;
};

/**
 * Reorder the values of an attribute.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type AttributeReorderValues = {
  /** Attribute from which values are reordered. */
  attribute?: Maybe<Attribute>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  errors: Array<AttributeError>;
};

export enum AttributeSortField {
  /** Sort attributes based on whether they can be displayed or not in a product grid. */
  AvailableInGrid = 'AVAILABLE_IN_GRID',
  /** Sort attributes by the filterable in dashboard flag */
  FilterableInDashboard = 'FILTERABLE_IN_DASHBOARD',
  /** Sort attributes by the filterable in storefront flag */
  FilterableInStorefront = 'FILTERABLE_IN_STOREFRONT',
  /** Sort attributes by the variant only flag */
  IsVariantOnly = 'IS_VARIANT_ONLY',
  /** Sort attributes by name */
  Name = 'NAME',
  /** Sort attributes by slug */
  Slug = 'SLUG',
  /** Sort attributes by their position in storefront */
  StorefrontSearchPosition = 'STOREFRONT_SEARCH_POSITION',
  /** Sort attributes by the value required flag */
  ValueRequired = 'VALUE_REQUIRED',
  /** Sort attributes by visibility in the storefront */
  VisibleInStorefront = 'VISIBLE_IN_STOREFRONT'
}

export type AttributeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort attributes by the selected field. */
  field: AttributeSortField;
};

export type AttributeTranslatableContent = Node & {
  /**
   * Custom attribute of a product.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  attribute?: Maybe<Attribute>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated attribute fields for the given language code. */
  translation?: Maybe<AttributeTranslation>;
};

export type AttributeTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for an attribute.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type AttributeTranslate = {
  attribute?: Maybe<Attribute>;
  errors: Array<TranslationError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type AttributeTranslation = Node & {
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
};

/** An enumeration. */
export enum AttributeTypeEnum {
  PageType = 'PAGE_TYPE',
  ProductType = 'PRODUCT_TYPE'
}

export type AttributeTypeEnumFilterInput = {
  /** The value equal to. */
  eq?: InputMaybe<AttributeTypeEnum>;
  /** The value included in. */
  oneOf?: InputMaybe<Array<AttributeTypeEnum>>;
};

/**
 * Updates attribute.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type AttributeUpdate = {
  attribute?: Maybe<Attribute>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  errors: Array<AttributeError>;
};

export type AttributeUpdateInput = {
  /** New values to be created for this attribute. */
  addValues?: InputMaybe<Array<AttributeValueUpdateInput>>;
  /**
   * Whether the attribute can be displayed in the admin product list.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  availableInGrid?: InputMaybe<Scalars['Boolean']>;
  /**
   * External ID of this product.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  /**
   * Whether the attribute can be filtered in storefront.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  filterableInStorefront?: InputMaybe<Scalars['Boolean']>;
  /** Whether the attribute is for variants only. */
  isVariantOnly?: InputMaybe<Scalars['Boolean']>;
  /** Name of an attribute displayed in the interface. */
  name?: InputMaybe<Scalars['String']>;
  /** IDs of values to be removed from this attribute. */
  removeValues?: InputMaybe<Array<Scalars['ID']>>;
  /** Internal representation of an attribute name. */
  slug?: InputMaybe<Scalars['String']>;
  /**
   * The position of the attribute in the storefront navigation (0 by default).
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  storefrontSearchPosition?: InputMaybe<Scalars['Int']>;
  /** The unit of attribute values. */
  unit?: InputMaybe<MeasurementUnitsEnum>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Event sent when attribute is updated.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AttributeUpdated = Event & {
  /** The attribute the event relates to. */
  attribute?: Maybe<Attribute>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents a value of an attribute. */
export type AttributeValue = Node & {
  /** Represents the boolean value of the attribute value. */
  boolean?: Maybe<Scalars['Boolean']>;
  /** Represents the date value of the attribute value. */
  date?: Maybe<Scalars['Date']>;
  /** Represents the date/time value of the attribute value. */
  dateTime?: Maybe<Scalars['DateTime']>;
  /**
   * External ID of this attribute value.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: Maybe<Scalars['String']>;
  /** Represents file URL and content type (if attribute value is a file). */
  file?: Maybe<File>;
  id: Scalars['ID'];
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: Maybe<AttributeInputTypeEnum>;
  /** Name of a value displayed in the interface. */
  name?: Maybe<Scalars['String']>;
  /** Represents the text of the attribute value, plain text without formating. */
  plainText?: Maybe<Scalars['String']>;
  /** The ID of the attribute reference. */
  reference?: Maybe<Scalars['ID']>;
  /**
   * Represents the text of the attribute value, includes formatting.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  richText?: Maybe<Scalars['JSONString']>;
  /** Internal representation of a value (unique per attribute). */
  slug?: Maybe<Scalars['String']>;
  /** Returns translated attribute value fields for the given language code. */
  translation?: Maybe<AttributeValueTranslation>;
  /** Represent value of the attribute value (e.g. color values for swatch attributes). */
  value?: Maybe<Scalars['String']>;
};

/** Represents a value of an attribute. */
export type AttributeValueTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Deletes values of attributes.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type AttributeValueBulkDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<AttributeError>;
};

export type AttributeValueCountableConnection = {
  edges: Array<AttributeValueCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeValueCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AttributeValue;
};

/**
 * Creates a value for an attribute.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type AttributeValueCreate = {
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  attributeValue?: Maybe<AttributeValue>;
  errors: Array<AttributeError>;
};

export type AttributeValueCreateInput = {
  /** File content type. */
  contentType?: InputMaybe<Scalars['String']>;
  /**
   * External ID of this attribute value.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** URL of the file attribute. Every time, a new value is created. */
  fileUrl?: InputMaybe<Scalars['String']>;
  /** Name of a value displayed in the interface. */
  name: Scalars['String'];
  /**
   * Represents the text of the attribute value, plain text without formating.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.The plain text attribute hasn't got predefined value, so can be specified only from instance that supports the given attribute.
   */
  plainText?: InputMaybe<Scalars['String']>;
  /**
   * Represents the text of the attribute value, includes formatting.
   *
   * Rich text format. For reference see https://editorjs.io/
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.The rich text attribute hasn't got predefined value, so can be specified only from instance that supports the given attribute.
   */
  richText?: InputMaybe<Scalars['JSONString']>;
  /** Represent value of the attribute value (e.g. color values for swatch attributes). */
  value?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new attribute value is created.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AttributeValueCreated = Event & {
  /** The attribute value the event relates to. */
  attributeValue?: Maybe<AttributeValue>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes a value of an attribute.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type AttributeValueDelete = {
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  attributeValue?: Maybe<AttributeValue>;
  errors: Array<AttributeError>;
};

/**
 * Event sent when attribute value is deleted.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AttributeValueDeleted = Event & {
  /** The attribute value the event relates to. */
  attributeValue?: Maybe<AttributeValue>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type AttributeValueFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
};

export type AttributeValueInput = {
  /** Represents the boolean value of the attribute value. */
  boolean?: InputMaybe<Scalars['Boolean']>;
  /** File content type. */
  contentType?: InputMaybe<Scalars['String']>;
  /** Represents the date value of the attribute value. */
  date?: InputMaybe<Scalars['Date']>;
  /** Represents the date/time value of the attribute value. */
  dateTime?: InputMaybe<Scalars['DateTime']>;
  /**
   * Attribute value ID.
   *
   * Added in Saleor 3.9.
   */
  dropdown?: InputMaybe<AttributeValueSelectableTypeInput>;
  /** URL of the file attribute. Every time, a new value is created. */
  file?: InputMaybe<Scalars['String']>;
  /** ID of the selected attribute. */
  id?: InputMaybe<Scalars['ID']>;
  /**
   * List of attribute value IDs.
   *
   * Added in Saleor 3.9.
   */
  multiselect?: InputMaybe<Array<AttributeValueSelectableTypeInput>>;
  /**
   * Numeric value of an attribute.
   *
   * Added in Saleor 3.9.
   */
  numeric?: InputMaybe<Scalars['String']>;
  /** Plain text content. */
  plainText?: InputMaybe<Scalars['String']>;
  /** List of entity IDs that will be used as references. */
  references?: InputMaybe<Array<Scalars['ID']>>;
  /** Text content in JSON format. */
  richText?: InputMaybe<Scalars['JSONString']>;
  /**
   * Attribute value ID.
   *
   * Added in Saleor 3.9.
   */
  swatch?: InputMaybe<AttributeValueSelectableTypeInput>;
  /** The value or slug of an attribute to resolve. If the passed value is non-existent, it will be created. This field will be removed in Saleor 4.0. */
  values?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Represents attribute value. If no ID provided, value will be resolved.
 *
 * Added in Saleor 3.9.
 */
export type AttributeValueSelectableTypeInput = {
  /** ID of an attribute value. */
  id?: InputMaybe<Scalars['ID']>;
  /** The value or slug of an attribute to resolve. If the passed value is non-existent, it will be created. */
  value?: InputMaybe<Scalars['String']>;
};

export type AttributeValueTranslatableContent = Node & {
  /**
   * Associated attribute that can be translated.
   *
   * Added in Saleor 3.9.
   */
  attribute?: Maybe<AttributeTranslatableContent>;
  /**
   * Represents a value of an attribute.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  attributeValue?: Maybe<AttributeValue>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Attribute plain text value. */
  plainText?: Maybe<Scalars['String']>;
  /**
   * Attribute value.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  richText?: Maybe<Scalars['JSONString']>;
  /** Returns translated attribute value fields for the given language code. */
  translation?: Maybe<AttributeValueTranslation>;
};

export type AttributeValueTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for an attribute value.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type AttributeValueTranslate = {
  attributeValue?: Maybe<AttributeValue>;
  errors: Array<TranslationError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type AttributeValueTranslation = Node & {
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
  /** Attribute plain text value. */
  plainText?: Maybe<Scalars['String']>;
  /**
   * Attribute value.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  richText?: Maybe<Scalars['JSONString']>;
};

export type AttributeValueTranslationInput = {
  name?: InputMaybe<Scalars['String']>;
  /** Translated text. */
  plainText?: InputMaybe<Scalars['String']>;
  /**
   * Translated text.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  richText?: InputMaybe<Scalars['JSONString']>;
};

/**
 * Updates value of an attribute.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type AttributeValueUpdate = {
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  attributeErrors: Array<AttributeError>;
  attributeValue?: Maybe<AttributeValue>;
  errors: Array<AttributeError>;
};

export type AttributeValueUpdateInput = {
  /** File content type. */
  contentType?: InputMaybe<Scalars['String']>;
  /**
   * External ID of this attribute value.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** URL of the file attribute. Every time, a new value is created. */
  fileUrl?: InputMaybe<Scalars['String']>;
  /** Name of a value displayed in the interface. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Represents the text of the attribute value, plain text without formating.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.The plain text attribute hasn't got predefined value, so can be specified only from instance that supports the given attribute.
   */
  plainText?: InputMaybe<Scalars['String']>;
  /**
   * Represents the text of the attribute value, includes formatting.
   *
   * Rich text format. For reference see https://editorjs.io/
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.The rich text attribute hasn't got predefined value, so can be specified only from instance that supports the given attribute.
   */
  richText?: InputMaybe<Scalars['JSONString']>;
  /** Represent value of the attribute value (e.g. color values for swatch attributes). */
  value?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when attribute value is updated.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AttributeValueUpdated = Event & {
  /** The attribute value the event relates to. */
  attributeValue?: Maybe<AttributeValue>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Where filtering options.
 *
 * Added in Saleor 3.11.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type AttributeWhereInput = {
  /** List of conditions that must be met. */
  AND?: InputMaybe<Array<AttributeWhereInput>>;
  /** A list of conditions of which at least one must be met. */
  OR?: InputMaybe<Array<AttributeWhereInput>>;
  entityType?: InputMaybe<AttributeEntityTypeEnumFilterInput>;
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  inCategory?: InputMaybe<Scalars['ID']>;
  inCollection?: InputMaybe<Scalars['ID']>;
  inputType?: InputMaybe<AttributeInputTypeEnumFilterInput>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  name?: InputMaybe<StringFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<AttributeTypeEnumFilterInput>;
  unit?: InputMaybe<MeasurementUnitsEnumFilterInput>;
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  visibleInStorefront?: InputMaybe<Scalars['Boolean']>;
  withChoices?: InputMaybe<Scalars['Boolean']>;
};

export type BulkAttributeValueInput = {
  /** The boolean value of an attribute to resolve. If the passed value is non-existent, it will be created. */
  boolean?: InputMaybe<Scalars['Boolean']>;
  /**
   * File content type.
   *
   * Added in Saleor 3.12.
   */
  contentType?: InputMaybe<Scalars['String']>;
  /**
   * Represents the date value of the attribute value.
   *
   * Added in Saleor 3.12.
   */
  date?: InputMaybe<Scalars['Date']>;
  /**
   * Represents the date/time value of the attribute value.
   *
   * Added in Saleor 3.12.
   */
  dateTime?: InputMaybe<Scalars['DateTime']>;
  /**
   * Attribute value ID.
   *
   * Added in Saleor 3.12.
   */
  dropdown?: InputMaybe<AttributeValueSelectableTypeInput>;
  /**
   * URL of the file attribute. Every time, a new value is created.
   *
   * Added in Saleor 3.12.
   */
  file?: InputMaybe<Scalars['String']>;
  /** ID of the selected attribute. */
  id?: InputMaybe<Scalars['ID']>;
  /**
   * List of attribute value IDs.
   *
   * Added in Saleor 3.12.
   */
  multiselect?: InputMaybe<Array<AttributeValueSelectableTypeInput>>;
  /**
   * Numeric value of an attribute.
   *
   * Added in Saleor 3.12.
   */
  numeric?: InputMaybe<Scalars['String']>;
  /**
   * Plain text content.
   *
   * Added in Saleor 3.12.
   */
  plainText?: InputMaybe<Scalars['String']>;
  /**
   * List of entity IDs that will be used as references.
   *
   * Added in Saleor 3.12.
   */
  references?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Text content in JSON format.
   *
   * Added in Saleor 3.12.
   */
  richText?: InputMaybe<Scalars['JSONString']>;
  /**
   * Attribute value ID.
   *
   * Added in Saleor 3.12.
   */
  swatch?: InputMaybe<AttributeValueSelectableTypeInput>;
  /** The value or slug of an attribute to resolve. If the passed value is non-existent, it will be created.This field will be removed in Saleor 4.0. */
  values?: InputMaybe<Array<Scalars['String']>>;
};

export type BulkProductError = {
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** List of channel IDs which causes the error. */
  channels?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** Index of an input list item that caused the error. */
  index?: Maybe<Scalars['Int']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of attribute values IDs which causes the error. */
  values?: Maybe<Array<Scalars['ID']>>;
  /** List of warehouse IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

export type BulkStockError = {
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** Index of an input list item that caused the error. */
  index?: Maybe<Scalars['Int']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of attribute values IDs which causes the error. */
  values?: Maybe<Array<Scalars['ID']>>;
};

/**
 * Synchronous webhook for calculating checkout/order taxes.
 *
 * Added in Saleor 3.7.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CalculateTaxes = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  taxBase: TaxableObject;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type CardInput = {
  /** Payment method nonce, a token returned by the appropriate provider's SDK. */
  code: Scalars['String'];
  /** Card security code. */
  cvc?: InputMaybe<Scalars['String']>;
  /** Information about currency and amount. */
  money: MoneyInput;
};

export type CatalogueInput = {
  /** Categories related to the discount. */
  categories?: InputMaybe<Array<Scalars['ID']>>;
  /** Collections related to the discount. */
  collections?: InputMaybe<Array<Scalars['ID']>>;
  /** Products related to the discount. */
  products?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Product variant related to the discount.
   *
   * Added in Saleor 3.1.
   */
  variants?: InputMaybe<Array<Scalars['ID']>>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type Category = Node &
  ObjectWithMetadata & {
    /** List of ancestors of the category. */
    ancestors?: Maybe<CategoryCountableConnection>;
    backgroundImage?: Maybe<Image>;
    /** List of children of the category. */
    children?: Maybe<CategoryCountableConnection>;
    /**
     * Description of the category.
     *
     * Rich text format. For reference see https://editorjs.io/
     */
    description?: Maybe<Scalars['JSONString']>;
    /**
     * Description of the category.
     *
     * Rich text format. For reference see https://editorjs.io/
     * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
     */
    descriptionJson?: Maybe<Scalars['JSONString']>;
    id: Scalars['ID'];
    level: Scalars['Int'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    parent?: Maybe<Category>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** List of products in the category. Requires the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
    products?: Maybe<ProductCountableConnection>;
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    slug: Scalars['String'];
    /** Returns translated category fields for the given language code. */
    translation?: Maybe<CategoryTranslation>;
  };

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryAncestorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryBackgroundImageArgs = {
  format?: InputMaybe<ThumbnailFormatEnum>;
  size?: InputMaybe<Scalars['Int']>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryChildrenArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductOrder>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Deletes categories.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CategoryBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export type CategoryCountableConnection = {
  edges: Array<CategoryCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Category;
};

/**
 * Creates a new category.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CategoryCreate = {
  category?: Maybe<Category>;
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Event sent when new category is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CategoryCreated = Event & {
  /** The category the event relates to. */
  category?: Maybe<Category>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes a category.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CategoryDelete = {
  category?: Maybe<Category>;
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Event sent when category is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CategoryDeleted = Event & {
  /** The category the event relates to. */
  category?: Maybe<Category>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type CategoryFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};

export type CategoryInput = {
  /** Background image file. */
  backgroundImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for a product media. */
  backgroundImageAlt?: InputMaybe<Scalars['String']>;
  /**
   * Category description.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
  /**
   * Fields required to update the category metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Category name. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the category private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Category slug. */
  slug?: InputMaybe<Scalars['String']>;
};

export enum CategorySortField {
  /** Sort categories by name. */
  Name = 'NAME',
  /** Sort categories by product count. */
  ProductCount = 'PRODUCT_COUNT',
  /** Sort categories by subcategory count. */
  SubcategoryCount = 'SUBCATEGORY_COUNT'
}

export type CategorySortingInput = {
  /**
   * Specifies the channel in which to sort the data.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort categories by the selected field. */
  field: CategorySortField;
};

export type CategoryTranslatableContent = Node & {
  /**
   * Represents a single category of products.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  category?: Maybe<Category>;
  /**
   * Description of the category.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  /**
   * Description of the category.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
   */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  /** Returns translated category fields for the given language code. */
  translation?: Maybe<CategoryTranslation>;
};

export type CategoryTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a category.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type CategoryTranslate = {
  category?: Maybe<Category>;
  errors: Array<TranslationError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type CategoryTranslation = Node & {
  /**
   * Translated description of the category.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  /**
   * Translated description of the category.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
   */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

/**
 * Updates a category.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CategoryUpdate = {
  category?: Maybe<Category>;
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Event sent when category is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CategoryUpdated = Event & {
  /** The category the event relates to. */
  category?: Maybe<Category>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents channel. */
export type Channel = Node & {
  /**
   * Shipping methods that are available for the channel.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  availableShippingMethodsPerCountry?: Maybe<Array<ShippingMethodsPerCountry>>;
  /**
   * List of shippable countries for the channel.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  countries?: Maybe<Array<CountryDisplay>>;
  /**
   * A currency that is assigned to the channel.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  currencyCode: Scalars['String'];
  /**
   * Default country for the channel. Default country can be used in checkout to determine the stock quantities or calculate taxes when the country was not explicitly provided.
   *
   * Added in Saleor 3.1.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  defaultCountry: CountryDisplay;
  /**
   * Whether a channel has associated orders.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS.
   */
  hasOrders: Scalars['Boolean'];
  id: Scalars['ID'];
  /**
   * Whether the channel is active.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  isActive: Scalars['Boolean'];
  /**
   * Name of the channel.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  name: Scalars['String'];
  /**
   * Channel-specific order settings.
   *
   * Added in Saleor 3.12.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS, MANAGE_ORDERS.
   */
  orderSettings: OrderSettings;
  /** Slug of the channel. */
  slug: Scalars['String'];
  /**
   * Define the stock setting for this channel.
   *
   * Added in Saleor 3.7.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  stockSettings: StockSettings;
  /**
   * List of warehouses assigned to this channel.
   *
   * Added in Saleor 3.5.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  warehouses: Array<Warehouse>;
};

/** Represents channel. */
export type ChannelAvailableShippingMethodsPerCountryArgs = {
  countries?: InputMaybe<Array<CountryCode>>;
};

/**
 * Activate a channel.
 *
 * Requires one of the following permissions: MANAGE_CHANNELS.
 */
export type ChannelActivate = {
  /** Activated channel. */
  channel?: Maybe<Channel>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  channelErrors: Array<ChannelError>;
  errors: Array<ChannelError>;
};

/**
 * Creates new channel.
 *
 * Requires one of the following permissions: MANAGE_CHANNELS.
 */
export type ChannelCreate = {
  channel?: Maybe<Channel>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  channelErrors: Array<ChannelError>;
  errors: Array<ChannelError>;
};

export type ChannelCreateInput = {
  /** List of shipping zones to assign to the channel. */
  addShippingZones?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * List of warehouses to assign to the channel.
   *
   * Added in Saleor 3.5.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  addWarehouses?: InputMaybe<Array<Scalars['ID']>>;
  /** Currency of the channel. */
  currencyCode: Scalars['String'];
  /**
   * Default country for the channel. Default country can be used in checkout to determine the stock quantities or calculate taxes when the country was not explicitly provided.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  defaultCountry: CountryCode;
  /** isActive flag. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Name of the channel. */
  name: Scalars['String'];
  /**
   * The channel order settings
   *
   * Added in Saleor 3.12.
   */
  orderSettings?: InputMaybe<OrderSettingsInput>;
  /** Slug of the channel. */
  slug: Scalars['String'];
  /**
   * The channel stock settings.
   *
   * Added in Saleor 3.7.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  stockSettings?: InputMaybe<StockSettingsInput>;
};

/**
 * Event sent when new channel is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ChannelCreated = Event & {
  /** The channel the event relates to. */
  channel?: Maybe<Channel>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deactivate a channel.
 *
 * Requires one of the following permissions: MANAGE_CHANNELS.
 */
export type ChannelDeactivate = {
  /** Deactivated channel. */
  channel?: Maybe<Channel>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  channelErrors: Array<ChannelError>;
  errors: Array<ChannelError>;
};

/**
 * Delete a channel. Orders associated with the deleted channel will be moved to the target channel. Checkouts, product availability, and pricing will be removed.
 *
 * Requires one of the following permissions: MANAGE_CHANNELS.
 */
export type ChannelDelete = {
  channel?: Maybe<Channel>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  channelErrors: Array<ChannelError>;
  errors: Array<ChannelError>;
};

export type ChannelDeleteInput = {
  /** ID of channel to migrate orders from origin channel. */
  channelId: Scalars['ID'];
};

/**
 * Event sent when channel is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ChannelDeleted = Event & {
  /** The channel the event relates to. */
  channel?: Maybe<Channel>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type ChannelError = {
  /** The error code. */
  code: ChannelErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of shipping zone IDs which causes the error. */
  shippingZones?: Maybe<Array<Scalars['ID']>>;
  /** List of warehouses IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ChannelErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  ChannelsCurrencyMustBeTheSame = 'CHANNELS_CURRENCY_MUST_BE_THE_SAME',
  ChannelWithOrders = 'CHANNEL_WITH_ORDERS',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type ChannelListingUpdateInput = {
  /** ID of a channel listing. */
  channelListing: Scalars['ID'];
  /** Cost price of the variant in channel. */
  costPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** The threshold for preorder variant in channel. */
  preorderThreshold?: InputMaybe<Scalars['Int']>;
  /** Price of the particular variant in channel. */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
};

/**
 * Reorder the warehouses of a channel.
 *
 * Added in Saleor 3.7.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_CHANNELS.
 */
export type ChannelReorderWarehouses = {
  /** Channel within the warehouses are reordered. */
  channel?: Maybe<Channel>;
  errors: Array<ChannelError>;
};

/**
 * Event sent when channel status has changed.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ChannelStatusChanged = Event & {
  /** The channel the event relates to. */
  channel?: Maybe<Channel>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Update a channel.
 *
 * Requires one of the following permissions: MANAGE_CHANNELS.
 * Requires one of the following permissions when updating only orderSettings field: MANAGE_CHANNELS, MANAGE_ORDERS.
 */
export type ChannelUpdate = {
  channel?: Maybe<Channel>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  channelErrors: Array<ChannelError>;
  errors: Array<ChannelError>;
};

export type ChannelUpdateInput = {
  /** List of shipping zones to assign to the channel. */
  addShippingZones?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * List of warehouses to assign to the channel.
   *
   * Added in Saleor 3.5.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  addWarehouses?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Default country for the channel. Default country can be used in checkout to determine the stock quantities or calculate taxes when the country was not explicitly provided.
   *
   * Added in Saleor 3.1.
   */
  defaultCountry?: InputMaybe<CountryCode>;
  /** isActive flag. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Name of the channel. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * The channel order settings
   *
   * Added in Saleor 3.12.
   */
  orderSettings?: InputMaybe<OrderSettingsInput>;
  /** List of shipping zones to unassign from the channel. */
  removeShippingZones?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * List of warehouses to unassign from the channel.
   *
   * Added in Saleor 3.5.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  removeWarehouses?: InputMaybe<Array<Scalars['ID']>>;
  /** Slug of the channel. */
  slug?: InputMaybe<Scalars['String']>;
  /**
   * The channel stock settings.
   *
   * Added in Saleor 3.7.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  stockSettings?: InputMaybe<StockSettingsInput>;
};

/**
 * Event sent when channel is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ChannelUpdated = Event & {
  /** The channel the event relates to. */
  channel?: Maybe<Channel>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Checkout object. */
export type Checkout = Node &
  ObjectWithMetadata & {
    /**
     * Collection points that can be used for this order.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    availableCollectionPoints: Array<Warehouse>;
    /** List of available payment gateways. */
    availablePaymentGateways: Array<PaymentGateway>;
    /**
     * Shipping methods that can be used with this checkout.
     * @deprecated This field will be removed in Saleor 4.0. Use `shippingMethods` instead.
     */
    availableShippingMethods: Array<ShippingMethod>;
    billingAddress?: Maybe<Address>;
    channel: Channel;
    created: Scalars['DateTime'];
    /**
     * The delivery method selected for this checkout.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    deliveryMethod?: Maybe<DeliveryMethod>;
    discount?: Maybe<Money>;
    discountName?: Maybe<Scalars['String']>;
    /**
     * Determines whether checkout prices should include taxes when displayed in a storefront.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    displayGrossPrices: Scalars['Boolean'];
    /** Email of a customer. */
    email?: Maybe<Scalars['String']>;
    /** List of gift cards associated with this checkout. */
    giftCards: Array<GiftCard>;
    id: Scalars['ID'];
    /** Returns True, if checkout requires shipping. */
    isShippingRequired: Scalars['Boolean'];
    /** Checkout language code. */
    languageCode: LanguageCodeEnum;
    lastChange: Scalars['DateTime'];
    /** A list of checkout lines, each containing information about an item in the checkout. */
    lines: Array<CheckoutLine>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    note: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** The number of items purchased. */
    quantity: Scalars['Int'];
    shippingAddress?: Maybe<Address>;
    /**
     * The shipping method related with checkout.
     * @deprecated This field will be removed in Saleor 4.0. Use `deliveryMethod` instead.
     */
    shippingMethod?: Maybe<ShippingMethod>;
    /** Shipping methods that can be used with this checkout. */
    shippingMethods: Array<ShippingMethod>;
    /** The price of the shipping, with all the taxes included. */
    shippingPrice: TaxedMoney;
    /**
     * Date when oldest stock reservation for this checkout expires or null if no stock is reserved.
     *
     * Added in Saleor 3.1.
     */
    stockReservationExpires?: Maybe<Scalars['DateTime']>;
    /** The price of the checkout before shipping, with taxes included. */
    subtotalPrice: TaxedMoney;
    /**
     * Returns True if checkout has to be exempt from taxes.
     *
     * Added in Saleor 3.8.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    taxExemption: Scalars['Boolean'];
    /** The checkout's token. */
    token: Scalars['UUID'];
    /** The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included. */
    totalPrice: TaxedMoney;
    /**
     * List of transactions for the checkout. Requires one of the following permissions: MANAGE_CHECKOUTS, HANDLE_PAYMENTS.
     *
     * Added in Saleor 3.4.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    transactions?: Maybe<Array<TransactionItem>>;
    translatedDiscountName?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
    voucherCode?: Maybe<Scalars['String']>;
  };

/** Checkout object. */
export type CheckoutMetafieldArgs = {
  key: Scalars['String'];
};

/** Checkout object. */
export type CheckoutMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Checkout object. */
export type CheckoutPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Checkout object. */
export type CheckoutPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Adds a gift card or a voucher to a checkout. */
export type CheckoutAddPromoCode = {
  /** The checkout with the added gift card or voucher. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

export type CheckoutAddressValidationRules = {
  /** Determines if an error should be raised when the provided address doesn't match the expected format. Example: using letters for postal code when the numbers are expected. */
  checkFieldsFormat?: InputMaybe<Scalars['Boolean']>;
  /** Determines if an error should be raised when the provided address doesn't have all the required fields. The list of required fields is dynamic and depends on the country code (use the `addressValidationRules` query to fetch them). Note: country code is mandatory for all addresses regardless of the rules provided in this input. */
  checkRequiredFields?: InputMaybe<Scalars['Boolean']>;
  /** Determines if Saleor should apply normalization on address fields. Example: converting city field to uppercase letters. */
  enableFieldsNormalization?: InputMaybe<Scalars['Boolean']>;
};

/** Update billing address in the existing checkout. */
export type CheckoutBillingAddressUpdate = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/** Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation. */
export type CheckoutComplete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  /** Confirmation data used to process additional authorization steps. */
  confirmationData?: Maybe<Scalars['JSONString']>;
  /** Set to true if payment needs to be confirmed before checkout is complete. */
  confirmationNeeded: Scalars['Boolean'];
  errors: Array<CheckoutError>;
  /** Placed order. */
  order?: Maybe<Order>;
};

export type CheckoutCountableConnection = {
  edges: Array<CheckoutCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CheckoutCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Checkout;
};

/** Create a new checkout. */
export type CheckoutCreate = {
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  /**
   * Whether the checkout was created or the current active one was returned. Refer to checkoutLinesAdd and checkoutLinesUpdate to merge a cart with an active checkout.
   * @deprecated This field will be removed in Saleor 4.0. Always returns `true`.
   */
  created?: Maybe<Scalars['Boolean']>;
  errors: Array<CheckoutError>;
};

export type CheckoutCreateInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /** Slug of a channel in which to create a checkout. */
  channel?: InputMaybe<Scalars['String']>;
  /** The customer's email address. */
  email?: InputMaybe<Scalars['String']>;
  /** Checkout language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
  /** A list of checkout lines, each containing information about an item in the checkout. */
  lines: Array<CheckoutLineInput>;
  /** The mailing address to where the checkout will be shipped. Note: the address will be ignored if the checkout doesn't contain shippable items. */
  shippingAddress?: InputMaybe<AddressInput>;
  /**
   * The checkout validation rules that can be changed.
   *
   * Added in Saleor 3.5.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  validationRules?: InputMaybe<CheckoutValidationRules>;
};

/**
 * Event sent when new checkout is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CheckoutCreated = Event & {
  /** The checkout the event relates to. */
  checkout?: Maybe<Checkout>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Sets the customer as the owner of the checkout.
 *
 * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_USER.
 */
export type CheckoutCustomerAttach = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/**
 * Removes the user assigned as the owner of the checkout.
 *
 * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_USER.
 */
export type CheckoutCustomerDetach = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/**
 * Updates the delivery method (shipping method or pick up point) of the checkout.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CheckoutDeliveryMethodUpdate = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  errors: Array<CheckoutError>;
};

/** Updates email address in the existing checkout object. */
export type CheckoutEmailUpdate = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

export type CheckoutError = {
  /** A type of address that causes the error. */
  addressType?: Maybe<AddressTypeEnum>;
  /** The error code. */
  code: CheckoutErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** List of line Ids which cause the error. */
  lines?: Maybe<Array<Scalars['ID']>>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of varint IDs which causes the error. */
  variants?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum CheckoutErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  ChannelInactive = 'CHANNEL_INACTIVE',
  CheckoutNotFullyPaid = 'CHECKOUT_NOT_FULLY_PAID',
  DeliveryMethodNotApplicable = 'DELIVERY_METHOD_NOT_APPLICABLE',
  EmailNotSet = 'EMAIL_NOT_SET',
  GiftCardNotApplicable = 'GIFT_CARD_NOT_APPLICABLE',
  GraphqlError = 'GRAPHQL_ERROR',
  InactivePayment = 'INACTIVE_PAYMENT',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Invalid = 'INVALID',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
  MissingChannelSlug = 'MISSING_CHANNEL_SLUG',
  NotFound = 'NOT_FOUND',
  NoLines = 'NO_LINES',
  PaymentError = 'PAYMENT_ERROR',
  ProductNotPublished = 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase = 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  QuantityGreaterThanLimit = 'QUANTITY_GREATER_THAN_LIMIT',
  Required = 'REQUIRED',
  ShippingAddressNotSet = 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotApplicable = 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodNotSet = 'SHIPPING_METHOD_NOT_SET',
  ShippingNotRequired = 'SHIPPING_NOT_REQUIRED',
  TaxError = 'TAX_ERROR',
  UnavailableVariantInChannel = 'UNAVAILABLE_VARIANT_IN_CHANNEL',
  Unique = 'UNIQUE',
  VoucherNotApplicable = 'VOUCHER_NOT_APPLICABLE',
  ZeroQuantity = 'ZERO_QUANTITY'
}

export type CheckoutFilterInput = {
  channels?: InputMaybe<Array<Scalars['ID']>>;
  created?: InputMaybe<DateRangeInput>;
  customer?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
};

/**
 * Filter shipping methods for checkout.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CheckoutFilterShippingMethods = Event & {
  /** The checkout the event relates to. */
  checkout?: Maybe<Checkout>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /**
   * Shipping methods that can be used with this checkout.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  shippingMethods?: Maybe<Array<ShippingMethod>>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Update language code in the existing checkout. */
export type CheckoutLanguageCodeUpdate = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/** Represents an item in the checkout. */
export type CheckoutLine = Node &
  ObjectWithMetadata & {
    id: Scalars['ID'];
    /**
     * List of public metadata items. Can be accessed without permissions.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /**
     * List of private metadata items. Requires staff permissions to access.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    quantity: Scalars['Int'];
    /** Indicates whether the item need to be delivered. */
    requiresShipping: Scalars['Boolean'];
    /** The sum of the checkout line price, taxes and discounts. */
    totalPrice: TaxedMoney;
    /** The sum of the checkout line price, without discounts. */
    undiscountedTotalPrice: Money;
    /** The unit price of the checkout line, without discounts. */
    undiscountedUnitPrice: Money;
    /** The unit price of the checkout line, with taxes and discounts. */
    unitPrice: TaxedMoney;
    variant: ProductVariant;
  };

/** Represents an item in the checkout. */
export type CheckoutLineMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an item in the checkout. */
export type CheckoutLineMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents an item in the checkout. */
export type CheckoutLinePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an item in the checkout. */
export type CheckoutLinePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type CheckoutLineCountableConnection = {
  edges: Array<CheckoutLineCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CheckoutLineCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: CheckoutLine;
};

/** Deletes a CheckoutLine. */
export type CheckoutLineDelete = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

export type CheckoutLineInput = {
  /**
   * Flag that allow force splitting the same variant into multiple lines by skipping the matching logic.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  forceNewLine?: InputMaybe<Scalars['Boolean']>;
  /**
   * Fields required to update the object's metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /**
   * Custom price of the item. Can be set only by apps with `HANDLE_CHECKOUTS` permission. When the line with the same variant will be provided multiple times, the last price will be used.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
  /** The number of items purchased. */
  quantity: Scalars['Int'];
  /** ID of the product variant. */
  variantId: Scalars['ID'];
};

export type CheckoutLineUpdateInput = {
  /**
   * ID of the line.
   *
   * Added in Saleor 3.6.
   */
  lineId?: InputMaybe<Scalars['ID']>;
  /**
   * Custom price of the item. Can be set only by apps with `HANDLE_CHECKOUTS` permission. When the line with the same variant will be provided multiple times, the last price will be used.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
  /** The number of items purchased. Optional for apps, required for any other users. */
  quantity?: InputMaybe<Scalars['Int']>;
  /**
   * ID of the product variant.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `lineId` instead.
   */
  variantId?: InputMaybe<Scalars['ID']>;
};

/** Adds a checkout line to the existing checkout.If line was already in checkout, its quantity will be increased. */
export type CheckoutLinesAdd = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/** Deletes checkout lines. */
export type CheckoutLinesDelete = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  errors: Array<CheckoutError>;
};

/** Updates checkout line in the existing checkout. */
export type CheckoutLinesUpdate = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/**
 * Event sent when checkout metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CheckoutMetadataUpdated = Event & {
  /** The checkout the event relates to. */
  checkout?: Maybe<Checkout>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Create a new payment for given checkout. */
export type CheckoutPaymentCreate = {
  /** Related checkout object. */
  checkout?: Maybe<Checkout>;
  errors: Array<PaymentError>;
  /** A newly created payment. */
  payment?: Maybe<Payment>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  paymentErrors: Array<PaymentError>;
};

/** Remove a gift card or a voucher from a checkout. */
export type CheckoutRemovePromoCode = {
  /** The checkout with the removed gift card or voucher. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/** Update shipping address in the existing checkout. */
export type CheckoutShippingAddressUpdate = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

/** Updates the shipping method of the checkout. */
export type CheckoutShippingMethodUpdate = {
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  checkoutErrors: Array<CheckoutError>;
  errors: Array<CheckoutError>;
};

export enum CheckoutSortField {
  /** Sort checkouts by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort checkouts by customer. */
  Customer = 'CUSTOMER',
  /** Sort checkouts by payment. */
  Payment = 'PAYMENT'
}

export type CheckoutSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort checkouts by the selected field. */
  field: CheckoutSortField;
};

/**
 * Event sent when checkout is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CheckoutUpdated = Event & {
  /** The checkout the event relates to. */
  checkout?: Maybe<Checkout>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type CheckoutValidationRules = {
  /** The validation rules that can be applied to provided billing address data. */
  billingAddress?: InputMaybe<CheckoutAddressValidationRules>;
  /** The validation rules that can be applied to provided shipping address data. */
  shippingAddress?: InputMaybe<CheckoutAddressValidationRules>;
};

export type ChoiceValue = {
  raw?: Maybe<Scalars['String']>;
  verbose?: Maybe<Scalars['String']>;
};

/** Represents a collection of products. */
export type Collection = Node &
  ObjectWithMetadata & {
    backgroundImage?: Maybe<Image>;
    /** Channel given to retrieve this collection. Also used by federation gateway to resolve this object in a federated query. */
    channel?: Maybe<Scalars['String']>;
    /**
     * List of channels in which the collection is available.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS.
     */
    channelListings?: Maybe<Array<CollectionChannelListing>>;
    /**
     * Description of the collection.
     *
     * Rich text format. For reference see https://editorjs.io/
     */
    description?: Maybe<Scalars['JSONString']>;
    /**
     * Description of the collection.
     *
     * Rich text format. For reference see https://editorjs.io/
     * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
     */
    descriptionJson?: Maybe<Scalars['JSONString']>;
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** List of products in this collection. */
    products?: Maybe<ProductCountableConnection>;
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    slug: Scalars['String'];
    /** Returns translated collection fields for the given language code. */
    translation?: Maybe<CollectionTranslation>;
  };

/** Represents a collection of products. */
export type CollectionBackgroundImageArgs = {
  format?: InputMaybe<ThumbnailFormatEnum>;
  size?: InputMaybe<Scalars['Int']>;
};

/** Represents a collection of products. */
export type CollectionMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a collection of products. */
export type CollectionMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a collection of products. */
export type CollectionPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a collection of products. */
export type CollectionPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a collection of products. */
export type CollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductOrder>;
};

/** Represents a collection of products. */
export type CollectionTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Adds products to a collection.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionAddProducts = {
  /** Collection to which products will be added. */
  collection?: Maybe<Collection>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionErrors: Array<CollectionError>;
  errors: Array<CollectionError>;
};

/**
 * Deletes collections.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionBulkDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionErrors: Array<CollectionError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<CollectionError>;
};

/** Represents collection channel listing. */
export type CollectionChannelListing = Node & {
  channel: Channel;
  id: Scalars['ID'];
  isPublished: Scalars['Boolean'];
  /** @deprecated This field will be removed in Saleor 4.0. Use the `publishedAt` field to fetch the publication date. */
  publicationDate?: Maybe<Scalars['Date']>;
  /**
   * The collection publication date.
   *
   * Added in Saleor 3.3.
   */
  publishedAt?: Maybe<Scalars['DateTime']>;
};

export type CollectionChannelListingError = {
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** List of channels IDs which causes the error. */
  channels?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of attribute values IDs which causes the error. */
  values?: Maybe<Array<Scalars['ID']>>;
};

/**
 * Manage collection's availability in channels.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionChannelListingUpdate = {
  /** An updated collection instance. */
  collection?: Maybe<Collection>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionChannelListingErrors: Array<CollectionChannelListingError>;
  errors: Array<CollectionChannelListingError>;
};

export type CollectionChannelListingUpdateInput = {
  /** List of channels to which the collection should be assigned. */
  addChannels?: InputMaybe<Array<PublishableChannelListingInput>>;
  /** List of channels from which the collection should be unassigned. */
  removeChannels?: InputMaybe<Array<Scalars['ID']>>;
};

export type CollectionCountableConnection = {
  edges: Array<CollectionCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CollectionCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Collection;
};

/**
 * Creates a new collection.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionCreate = {
  collection?: Maybe<Collection>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionErrors: Array<CollectionError>;
  errors: Array<CollectionError>;
};

export type CollectionCreateInput = {
  /** Background image file. */
  backgroundImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: InputMaybe<Scalars['String']>;
  /**
   * Description of the collection.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
  /** Informs whether a collection is published. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /**
   * Fields required to update the collection metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Name of the collection. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the collection private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** List of products to be added to the collection. */
  products?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Publication date. ISO 8601 standard.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Slug of the collection. */
  slug?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new collection is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionCreated = Event & {
  /** The collection the event relates to. */
  collection?: Maybe<Collection>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new collection is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionCreatedCollectionArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a collection.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionDelete = {
  collection?: Maybe<Collection>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionErrors: Array<CollectionError>;
  errors: Array<CollectionError>;
};

/**
 * Event sent when collection is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionDeleted = Event & {
  /** The collection the event relates to. */
  collection?: Maybe<Collection>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when collection is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionDeletedCollectionArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type CollectionError = {
  /** The error code. */
  code: CollectionErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of products IDs which causes the error. */
  products?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum CollectionErrorCode {
  CannotManageProductWithoutVariant = 'CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type CollectionFilterInput = {
  /**
   * Specifies the channel by which the data should be filtered.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  published?: InputMaybe<CollectionPublished>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};

export type CollectionInput = {
  /** Background image file. */
  backgroundImage?: InputMaybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: InputMaybe<Scalars['String']>;
  /**
   * Description of the collection.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
  /** Informs whether a collection is published. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /**
   * Fields required to update the collection metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Name of the collection. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the collection private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /**
   * Publication date. ISO 8601 standard.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Slug of the collection. */
  slug?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when collection metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionMetadataUpdated = Event & {
  /** The collection the event relates to. */
  collection?: Maybe<Collection>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when collection metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionMetadataUpdatedCollectionArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export enum CollectionPublished {
  Hidden = 'HIDDEN',
  Published = 'PUBLISHED'
}

/**
 * Remove products from a collection.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionRemoveProducts = {
  /** Collection from which products will be removed. */
  collection?: Maybe<Collection>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionErrors: Array<CollectionError>;
  errors: Array<CollectionError>;
};

/**
 * Reorder the products of a collection.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionReorderProducts = {
  /** Collection from which products are reordered. */
  collection?: Maybe<Collection>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionErrors: Array<CollectionError>;
  errors: Array<CollectionError>;
};

export enum CollectionSortField {
  /**
   * Sort collections by availability.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  Availability = 'AVAILABILITY',
  /** Sort collections by name. */
  Name = 'NAME',
  /** Sort collections by product count. */
  ProductCount = 'PRODUCT_COUNT',
  /**
   * Sort collections by publication date.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  PublicationDate = 'PUBLICATION_DATE',
  /**
   * Sort collections by publication date.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  PublishedAt = 'PUBLISHED_AT'
}

export type CollectionSortingInput = {
  /**
   * Specifies the channel in which to sort the data.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort collections by the selected field. */
  field: CollectionSortField;
};

export type CollectionTranslatableContent = Node & {
  /**
   * Represents a collection of products.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  collection?: Maybe<Collection>;
  /**
   * Description of the collection.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  /**
   * Description of the collection.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
   */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  /** Returns translated collection fields for the given language code. */
  translation?: Maybe<CollectionTranslation>;
};

export type CollectionTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a collection.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type CollectionTranslate = {
  collection?: Maybe<Collection>;
  errors: Array<TranslationError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type CollectionTranslation = Node & {
  /**
   * Translated description of the collection.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  /**
   * Translated description of the collection.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
   */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

/**
 * Updates a collection.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type CollectionUpdate = {
  collection?: Maybe<Collection>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  collectionErrors: Array<CollectionError>;
  errors: Array<CollectionError>;
};

/**
 * Event sent when collection is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionUpdated = Event & {
  /** The collection the event relates to. */
  collection?: Maybe<Collection>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when collection is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CollectionUpdatedCollectionArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Stores information about a single configuration field. */
export type ConfigurationItem = {
  /** Help text for the field. */
  helpText?: Maybe<Scalars['String']>;
  /** Label for the field. */
  label?: Maybe<Scalars['String']>;
  /** Name of the field. */
  name: Scalars['String'];
  /** Type of the field. */
  type?: Maybe<ConfigurationTypeFieldEnum>;
  /** Current value of the field. */
  value?: Maybe<Scalars['String']>;
};

export type ConfigurationItemInput = {
  /** Name of the field to update. */
  name: Scalars['String'];
  /** Value of the given field to update. */
  value?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum ConfigurationTypeFieldEnum {
  Boolean = 'BOOLEAN',
  Multiline = 'MULTILINE',
  Output = 'OUTPUT',
  Password = 'PASSWORD',
  Secret = 'SECRET',
  Secretmultiline = 'SECRETMULTILINE',
  String = 'STRING'
}

/** Confirm user account with token sent by email during registration. */
export type ConfirmAccount = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** An activated user account. */
  user?: Maybe<User>;
};

/**
 * Confirm the email change of the logged-in user.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type ConfirmEmailChange = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** A user instance with a new email. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum CountryCode {
  Ad = 'AD',
  Ae = 'AE',
  Af = 'AF',
  Ag = 'AG',
  Ai = 'AI',
  Al = 'AL',
  Am = 'AM',
  Ao = 'AO',
  Aq = 'AQ',
  Ar = 'AR',
  As = 'AS',
  At = 'AT',
  Au = 'AU',
  Aw = 'AW',
  Ax = 'AX',
  Az = 'AZ',
  Ba = 'BA',
  Bb = 'BB',
  Bd = 'BD',
  Be = 'BE',
  Bf = 'BF',
  Bg = 'BG',
  Bh = 'BH',
  Bi = 'BI',
  Bj = 'BJ',
  Bl = 'BL',
  Bm = 'BM',
  Bn = 'BN',
  Bo = 'BO',
  Bq = 'BQ',
  Br = 'BR',
  Bs = 'BS',
  Bt = 'BT',
  Bv = 'BV',
  Bw = 'BW',
  By = 'BY',
  Bz = 'BZ',
  Ca = 'CA',
  Cc = 'CC',
  Cd = 'CD',
  Cf = 'CF',
  Cg = 'CG',
  Ch = 'CH',
  Ci = 'CI',
  Ck = 'CK',
  Cl = 'CL',
  Cm = 'CM',
  Cn = 'CN',
  Co = 'CO',
  Cr = 'CR',
  Cu = 'CU',
  Cv = 'CV',
  Cw = 'CW',
  Cx = 'CX',
  Cy = 'CY',
  Cz = 'CZ',
  De = 'DE',
  Dj = 'DJ',
  Dk = 'DK',
  Dm = 'DM',
  Do = 'DO',
  Dz = 'DZ',
  Ec = 'EC',
  Ee = 'EE',
  Eg = 'EG',
  Eh = 'EH',
  Er = 'ER',
  Es = 'ES',
  Et = 'ET',
  Eu = 'EU',
  Fi = 'FI',
  Fj = 'FJ',
  Fk = 'FK',
  Fm = 'FM',
  Fo = 'FO',
  Fr = 'FR',
  Ga = 'GA',
  Gb = 'GB',
  Gd = 'GD',
  Ge = 'GE',
  Gf = 'GF',
  Gg = 'GG',
  Gh = 'GH',
  Gi = 'GI',
  Gl = 'GL',
  Gm = 'GM',
  Gn = 'GN',
  Gp = 'GP',
  Gq = 'GQ',
  Gr = 'GR',
  Gs = 'GS',
  Gt = 'GT',
  Gu = 'GU',
  Gw = 'GW',
  Gy = 'GY',
  Hk = 'HK',
  Hm = 'HM',
  Hn = 'HN',
  Hr = 'HR',
  Ht = 'HT',
  Hu = 'HU',
  Id = 'ID',
  Ie = 'IE',
  Il = 'IL',
  Im = 'IM',
  In = 'IN',
  Io = 'IO',
  Iq = 'IQ',
  Ir = 'IR',
  Is = 'IS',
  It = 'IT',
  Je = 'JE',
  Jm = 'JM',
  Jo = 'JO',
  Jp = 'JP',
  Ke = 'KE',
  Kg = 'KG',
  Kh = 'KH',
  Ki = 'KI',
  Km = 'KM',
  Kn = 'KN',
  Kp = 'KP',
  Kr = 'KR',
  Kw = 'KW',
  Ky = 'KY',
  Kz = 'KZ',
  La = 'LA',
  Lb = 'LB',
  Lc = 'LC',
  Li = 'LI',
  Lk = 'LK',
  Lr = 'LR',
  Ls = 'LS',
  Lt = 'LT',
  Lu = 'LU',
  Lv = 'LV',
  Ly = 'LY',
  Ma = 'MA',
  Mc = 'MC',
  Md = 'MD',
  Me = 'ME',
  Mf = 'MF',
  Mg = 'MG',
  Mh = 'MH',
  Mk = 'MK',
  Ml = 'ML',
  Mm = 'MM',
  Mn = 'MN',
  Mo = 'MO',
  Mp = 'MP',
  Mq = 'MQ',
  Mr = 'MR',
  Ms = 'MS',
  Mt = 'MT',
  Mu = 'MU',
  Mv = 'MV',
  Mw = 'MW',
  Mx = 'MX',
  My = 'MY',
  Mz = 'MZ',
  Na = 'NA',
  Nc = 'NC',
  Ne = 'NE',
  Nf = 'NF',
  Ng = 'NG',
  Ni = 'NI',
  Nl = 'NL',
  No = 'NO',
  Np = 'NP',
  Nr = 'NR',
  Nu = 'NU',
  Nz = 'NZ',
  Om = 'OM',
  Pa = 'PA',
  Pe = 'PE',
  Pf = 'PF',
  Pg = 'PG',
  Ph = 'PH',
  Pk = 'PK',
  Pl = 'PL',
  Pm = 'PM',
  Pn = 'PN',
  Pr = 'PR',
  Ps = 'PS',
  Pt = 'PT',
  Pw = 'PW',
  Py = 'PY',
  Qa = 'QA',
  Re = 'RE',
  Ro = 'RO',
  Rs = 'RS',
  Ru = 'RU',
  Rw = 'RW',
  Sa = 'SA',
  Sb = 'SB',
  Sc = 'SC',
  Sd = 'SD',
  Se = 'SE',
  Sg = 'SG',
  Sh = 'SH',
  Si = 'SI',
  Sj = 'SJ',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sr = 'SR',
  Ss = 'SS',
  St = 'ST',
  Sv = 'SV',
  Sx = 'SX',
  Sy = 'SY',
  Sz = 'SZ',
  Tc = 'TC',
  Td = 'TD',
  Tf = 'TF',
  Tg = 'TG',
  Th = 'TH',
  Tj = 'TJ',
  Tk = 'TK',
  Tl = 'TL',
  Tm = 'TM',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Tt = 'TT',
  Tv = 'TV',
  Tw = 'TW',
  Tz = 'TZ',
  Ua = 'UA',
  Ug = 'UG',
  Um = 'UM',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Va = 'VA',
  Vc = 'VC',
  Ve = 'VE',
  Vg = 'VG',
  Vi = 'VI',
  Vn = 'VN',
  Vu = 'VU',
  Wf = 'WF',
  Ws = 'WS',
  Ye = 'YE',
  Yt = 'YT',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW'
}

export type CountryDisplay = {
  /** Country code. */
  code: Scalars['String'];
  /** Country name. */
  country: Scalars['String'];
  /**
   * Country tax.
   * @deprecated This field will be removed in Saleor 4.0. Use `TaxClassCountryRate` type to manage tax rates per country.
   */
  vat?: Maybe<Vat>;
};

export type CountryFilterInput = {
  /** Boolean for filtering countries by having shipping zone assigned.If 'true', return countries with shipping zone assigned.If 'false', return countries without any shipping zone assigned.If the argument is not provided (null), return all countries. */
  attachedToShippingZones?: InputMaybe<Scalars['Boolean']>;
};

export type CountryRateInput = {
  /** Country in which this rate applies. */
  countryCode: CountryCode;
  /** Tax rate value provided as percentage. Example: provide `23` to represent `23%` tax rate. */
  rate: Scalars['Float'];
};

export type CountryRateUpdateInput = {
  /** Country in which this rate applies. */
  countryCode: CountryCode;
  /** Tax rate value provided as percentage. Example: provide `23` to represent `23%` tax rate. Provide `null` to remove the particular rate. */
  rate?: InputMaybe<Scalars['Float']>;
};

/** Create JWT token. */
export type CreateToken = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  /** CSRF token required to re-generate access token. */
  csrfToken?: Maybe<Scalars['String']>;
  errors: Array<AccountError>;
  /** JWT refresh token, required to re-generate access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

export type CreditCard = {
  /** Card brand. */
  brand: Scalars['String'];
  /** Two-digit number representing the card’s expiration month. */
  expMonth?: Maybe<Scalars['Int']>;
  /** Four-digit number representing the card’s expiration year. */
  expYear?: Maybe<Scalars['Int']>;
  /** First 4 digits of the card number. */
  firstDigits?: Maybe<Scalars['String']>;
  /** Last 4 digits of the card number. */
  lastDigits: Scalars['String'];
};

/**
 * Deletes customers.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type CustomerBulkDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<AccountError>;
};

/**
 * Creates a new customer.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type CustomerCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  user?: Maybe<User>;
};

/**
 * Event sent when new customer user is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CustomerCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The user the event relates to. */
  user?: Maybe<User>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes a customer.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type CustomerDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  user?: Maybe<User>;
};

/** History log of the customer. */
export type CustomerEvent = Node & {
  /** App that performed the action. */
  app?: Maybe<App>;
  /** Number of objects concerned by the event. */
  count?: Maybe<Scalars['Int']>;
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** The concerned order. */
  order?: Maybe<Order>;
  /** The concerned order line. */
  orderLine?: Maybe<OrderLine>;
  /** Customer event type. */
  type?: Maybe<CustomerEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum CustomerEventsEnum {
  AccountActivated = 'ACCOUNT_ACTIVATED',
  AccountCreated = 'ACCOUNT_CREATED',
  AccountDeactivated = 'ACCOUNT_DEACTIVATED',
  CustomerDeleted = 'CUSTOMER_DELETED',
  DigitalLinkDownloaded = 'DIGITAL_LINK_DOWNLOADED',
  EmailAssigned = 'EMAIL_ASSIGNED',
  EmailChanged = 'EMAIL_CHANGED',
  EmailChangedRequest = 'EMAIL_CHANGED_REQUEST',
  NameAssigned = 'NAME_ASSIGNED',
  NoteAdded = 'NOTE_ADDED',
  NoteAddedToOrder = 'NOTE_ADDED_TO_ORDER',
  PasswordChanged = 'PASSWORD_CHANGED',
  PasswordReset = 'PASSWORD_RESET',
  PasswordResetLinkSent = 'PASSWORD_RESET_LINK_SENT',
  PlacedOrder = 'PLACED_ORDER'
}

export type CustomerFilterInput = {
  dateJoined?: InputMaybe<DateRangeInput>;
  /**
   * Filter by ids.
   *
   * Added in Saleor 3.8.
   */
  ids?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  numberOfOrders?: InputMaybe<IntRangeInput>;
  placedOrders?: InputMaybe<DateRangeInput>;
  search?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
};

export type CustomerInput = {
  /** Billing address of the customer. */
  defaultBillingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: InputMaybe<AddressInput>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /**
   * External ID of the customer.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when customer user metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CustomerMetadataUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The user the event relates to. */
  user?: Maybe<User>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Updates an existing customer.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type CustomerUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  user?: Maybe<User>;
};

/**
 * Event sent when customer user is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type CustomerUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The user the event relates to. */
  user?: Maybe<User>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type DateRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['Date']>;
  /** End date. */
  lte?: InputMaybe<Scalars['Date']>;
};

export type DateTimeRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** End date. */
  lte?: InputMaybe<Scalars['DateTime']>;
};

/**
 * Deactivate all JWT tokens of the currently authenticated user.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type DeactivateAllUserTokens = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
};

/** Delete metadata of an object. To use it, you need to have access to the modified object. */
export type DeleteMetadata = {
  errors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  metadataErrors: Array<MetadataError>;
};

/** Delete object's private metadata. To use it, you need to be an authenticated staff user or an app and have access to the modified object. */
export type DeletePrivateMetadata = {
  errors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  metadataErrors: Array<MetadataError>;
};

/**
 * Represents a delivery method chosen for the checkout. `Warehouse` type is used when checkout is marked as "click and collect" and `ShippingMethod` otherwise.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type DeliveryMethod = ShippingMethod | Warehouse;

export type DigitalContent = Node &
  ObjectWithMetadata & {
    automaticFulfillment: Scalars['Boolean'];
    contentFile: Scalars['String'];
    id: Scalars['ID'];
    maxDownloads?: Maybe<Scalars['Int']>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** Product variant assigned to digital content. */
    productVariant: ProductVariant;
    urlValidDays?: Maybe<Scalars['Int']>;
    /** List of URLs for the digital variant. */
    urls?: Maybe<Array<DigitalContentUrl>>;
    useDefaultSettings: Scalars['Boolean'];
  };

export type DigitalContentMetafieldArgs = {
  key: Scalars['String'];
};

export type DigitalContentMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type DigitalContentPrivateMetafieldArgs = {
  key: Scalars['String'];
};

export type DigitalContentPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type DigitalContentCountableConnection = {
  edges: Array<DigitalContentCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type DigitalContentCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: DigitalContent;
};

/**
 * Create new digital content. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type DigitalContentCreate = {
  content?: Maybe<DigitalContent>;
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  variant?: Maybe<ProductVariant>;
};

/**
 * Remove digital content assigned to given variant.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type DigitalContentDelete = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  variant?: Maybe<ProductVariant>;
};

export type DigitalContentInput = {
  /** Overwrite default automatic_fulfillment setting for variant. */
  automaticFulfillment?: InputMaybe<Scalars['Boolean']>;
  /** Determines how many times a download link can be accessed by a customer. */
  maxDownloads?: InputMaybe<Scalars['Int']>;
  /**
   * Fields required to update the digital content metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /**
   * Fields required to update the digital content private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** Determines for how many days a download link is active since it was generated. */
  urlValidDays?: InputMaybe<Scalars['Int']>;
  /** Use default digital content settings for this product. */
  useDefaultSettings: Scalars['Boolean'];
};

/**
 * Update digital content.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type DigitalContentUpdate = {
  content?: Maybe<DigitalContent>;
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  variant?: Maybe<ProductVariant>;
};

export type DigitalContentUploadInput = {
  /** Overwrite default automatic_fulfillment setting for variant. */
  automaticFulfillment?: InputMaybe<Scalars['Boolean']>;
  /** Represents an file in a multipart request. */
  contentFile: Scalars['Upload'];
  /** Determines how many times a download link can be accessed by a customer. */
  maxDownloads?: InputMaybe<Scalars['Int']>;
  /**
   * Fields required to update the digital content metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /**
   * Fields required to update the digital content private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** Determines for how many days a download link is active since it was generated. */
  urlValidDays?: InputMaybe<Scalars['Int']>;
  /** Use default digital content settings for this product. */
  useDefaultSettings: Scalars['Boolean'];
};

export type DigitalContentUrl = Node & {
  content: DigitalContent;
  created: Scalars['DateTime'];
  downloadNum: Scalars['Int'];
  id: Scalars['ID'];
  /** UUID of digital content. */
  token: Scalars['UUID'];
  /** URL for digital content. */
  url?: Maybe<Scalars['String']>;
};

/**
 * Generate new URL to digital content.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type DigitalContentUrlCreate = {
  digitalContentUrl?: Maybe<DigitalContentUrl>;
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export type DigitalContentUrlCreateInput = {
  /** Digital content ID which URL will belong to. */
  content: Scalars['ID'];
};

export type DiscountError = {
  /** List of channels IDs which causes the error. */
  channels?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: DiscountErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of products IDs which causes the error. */
  products?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum DiscountErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  CannotManageProductWithoutVariant = 'CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export enum DiscountStatusEnum {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Scheduled = 'SCHEDULED'
}

export enum DiscountValueTypeEnum {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

/** An enumeration. */
export enum DistanceUnitsEnum {
  Cm = 'CM',
  Ft = 'FT',
  Inch = 'INCH',
  Km = 'KM',
  M = 'M',
  Yd = 'YD'
}

/** Represents shop's domain. */
export type Domain = {
  /** The host name of the domain. */
  host: Scalars['String'];
  /** Inform if SSL is enabled. */
  sslEnabled: Scalars['Boolean'];
  /** Shop's absolute URL. */
  url: Scalars['String'];
};

/**
 * Deletes draft orders.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type DraftOrderBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<OrderError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Completes creating an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type DraftOrderComplete = {
  errors: Array<OrderError>;
  /** Completed order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Creates a new draft order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type DraftOrderCreate = {
  errors: Array<OrderError>;
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type DraftOrderCreateInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /** ID of the channel associated with the order. */
  channelId?: InputMaybe<Scalars['ID']>;
  /** A note from a customer. Visible by customers in the order summary. */
  customerNote?: InputMaybe<Scalars['String']>;
  /** Discount amount for the order. */
  discount?: InputMaybe<Scalars['PositiveDecimal']>;
  /**
   * External ID of this order.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** Variant line input consisting of variant ID and quantity of products. */
  lines?: InputMaybe<Array<OrderLineCreateInput>>;
  /** URL of a view where users should be redirected to see the order details. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
  /** Shipping address of the customer. */
  shippingAddress?: InputMaybe<AddressInput>;
  /** ID of a selected shipping method. */
  shippingMethod?: InputMaybe<Scalars['ID']>;
  /** Customer associated with the draft order. */
  user?: InputMaybe<Scalars['ID']>;
  /** Email address of the customer. */
  userEmail?: InputMaybe<Scalars['String']>;
  /** ID of the voucher associated with the order. */
  voucher?: InputMaybe<Scalars['ID']>;
};

/**
 * Event sent when new draft order is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type DraftOrderCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes a draft order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type DraftOrderDelete = {
  errors: Array<OrderError>;
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Event sent when draft order is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type DraftOrderDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type DraftOrderInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /** ID of the channel associated with the order. */
  channelId?: InputMaybe<Scalars['ID']>;
  /** A note from a customer. Visible by customers in the order summary. */
  customerNote?: InputMaybe<Scalars['String']>;
  /** Discount amount for the order. */
  discount?: InputMaybe<Scalars['PositiveDecimal']>;
  /**
   * External ID of this order.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** URL of a view where users should be redirected to see the order details. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
  /** Shipping address of the customer. */
  shippingAddress?: InputMaybe<AddressInput>;
  /** ID of a selected shipping method. */
  shippingMethod?: InputMaybe<Scalars['ID']>;
  /** Customer associated with the draft order. */
  user?: InputMaybe<Scalars['ID']>;
  /** Email address of the customer. */
  userEmail?: InputMaybe<Scalars['String']>;
  /** ID of the voucher associated with the order. */
  voucher?: InputMaybe<Scalars['ID']>;
};

/**
 * Deletes order lines.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type DraftOrderLinesBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<OrderError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Updates a draft order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type DraftOrderUpdate = {
  errors: Array<OrderError>;
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Event sent when draft order is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type DraftOrderUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export enum ErrorPolicyEnum {
  /** Save what is possible within a single row. If there are errors in an input data row, try to save it partially and skip the invalid part. */
  IgnoreFailed = 'IGNORE_FAILED',
  /** Reject all rows if there is at least one error in any of them. */
  RejectEverything = 'REJECT_EVERYTHING',
  /** Reject rows with errors. */
  RejectFailedRows = 'REJECT_FAILED_ROWS'
}

export type Event = {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Event delivery. */
export type EventDelivery = Node & {
  /** Event delivery attempts. */
  attempts?: Maybe<EventDeliveryAttemptCountableConnection>;
  createdAt: Scalars['DateTime'];
  /** Webhook event type. */
  eventType: WebhookEventTypeEnum;
  id: Scalars['ID'];
  /** Event payload. */
  payload?: Maybe<Scalars['String']>;
  /** Event delivery status. */
  status: EventDeliveryStatusEnum;
};

/** Event delivery. */
export type EventDeliveryAttemptsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<EventDeliveryAttemptSortingInput>;
};

/** Event delivery attempts. */
export type EventDeliveryAttempt = Node & {
  /** Event delivery creation date and time. */
  createdAt: Scalars['DateTime'];
  /** Delivery attempt duration. */
  duration?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  /** Request headers for delivery attempt. */
  requestHeaders?: Maybe<Scalars['String']>;
  /** Delivery attempt response content. */
  response?: Maybe<Scalars['String']>;
  /** Response headers for delivery attempt. */
  responseHeaders?: Maybe<Scalars['String']>;
  /** Delivery attempt response status code. */
  responseStatusCode?: Maybe<Scalars['Int']>;
  /** Event delivery status. */
  status: EventDeliveryStatusEnum;
  /** Task id for delivery attempt. */
  taskId?: Maybe<Scalars['String']>;
};

export type EventDeliveryAttemptCountableConnection = {
  edges: Array<EventDeliveryAttemptCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type EventDeliveryAttemptCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: EventDeliveryAttempt;
};

export enum EventDeliveryAttemptSortField {
  /** Sort event delivery attempts by created at. */
  CreatedAt = 'CREATED_AT'
}

export type EventDeliveryAttemptSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort attempts by the selected field. */
  field: EventDeliveryAttemptSortField;
};

export type EventDeliveryCountableConnection = {
  edges: Array<EventDeliveryCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type EventDeliveryCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: EventDelivery;
};

export type EventDeliveryFilterInput = {
  eventType?: InputMaybe<WebhookEventTypeEnum>;
  status?: InputMaybe<EventDeliveryStatusEnum>;
};

/**
 * Retries event delivery.
 *
 * Requires one of the following permissions: MANAGE_APPS.
 */
export type EventDeliveryRetry = {
  /** Event delivery. */
  delivery?: Maybe<EventDelivery>;
  errors: Array<WebhookError>;
};

export enum EventDeliverySortField {
  /** Sort event deliveries by created at. */
  CreatedAt = 'CREATED_AT'
}

export type EventDeliverySortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort deliveries by the selected field. */
  field: EventDeliverySortField;
};

export enum EventDeliveryStatusEnum {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type ExportError = {
  /** The error code. */
  code: ExportErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ExportErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

/** History log of export file. */
export type ExportEvent = Node & {
  /** App which performed the action. Requires one of the following permissions: OWNER, MANAGE_APPS. */
  app?: Maybe<App>;
  /** Date when event happened at in ISO 8601 format. */
  date: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Content of the event. */
  message: Scalars['String'];
  /** Export event type. */
  type: ExportEventsEnum;
  /** User who performed the action. Requires one of the following permissions: OWNER, MANAGE_STAFF. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum ExportEventsEnum {
  ExportedFileSent = 'EXPORTED_FILE_SENT',
  ExportDeleted = 'EXPORT_DELETED',
  ExportFailed = 'EXPORT_FAILED',
  ExportFailedInfoSent = 'EXPORT_FAILED_INFO_SENT',
  ExportPending = 'EXPORT_PENDING',
  ExportSuccess = 'EXPORT_SUCCESS'
}

/** Represents a job data of exported file. */
export type ExportFile = Job &
  Node & {
    app?: Maybe<App>;
    /** Created date time of job in ISO 8601 format. */
    createdAt: Scalars['DateTime'];
    /** List of events associated with the export. */
    events?: Maybe<Array<ExportEvent>>;
    id: Scalars['ID'];
    /** Job message. */
    message?: Maybe<Scalars['String']>;
    /** Job status. */
    status: JobStatusEnum;
    /** Date time of job last update in ISO 8601 format. */
    updatedAt: Scalars['DateTime'];
    /** The URL of field to download. */
    url?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
  };

export type ExportFileCountableConnection = {
  edges: Array<ExportFileCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ExportFileCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ExportFile;
};

export type ExportFileFilterInput = {
  app?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<DateTimeRangeInput>;
  status?: InputMaybe<JobStatusEnum>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
  user?: InputMaybe<Scalars['String']>;
};

export enum ExportFileSortField {
  CreatedAt = 'CREATED_AT',
  LastModifiedAt = 'LAST_MODIFIED_AT',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT'
}

export type ExportFileSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort export file by the selected field. */
  field: ExportFileSortField;
};

/**
 * Export gift cards to csv file.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type ExportGiftCards = {
  errors: Array<ExportError>;
  /** The newly created export file job which is responsible for export data. */
  exportFile?: Maybe<ExportFile>;
};

export type ExportGiftCardsInput = {
  /** Type of exported file. */
  fileType: FileTypesEnum;
  /** Filtering options for gift cards. */
  filter?: InputMaybe<GiftCardFilterInput>;
  /** List of gift cards IDs to export. */
  ids?: InputMaybe<Array<Scalars['ID']>>;
  /** Determine which gift cards should be exported. */
  scope: ExportScope;
};

export type ExportInfoInput = {
  /** List of attribute ids witch should be exported. */
  attributes?: InputMaybe<Array<Scalars['ID']>>;
  /** List of channels ids which should be exported. */
  channels?: InputMaybe<Array<Scalars['ID']>>;
  /** List of product fields witch should be exported. */
  fields?: InputMaybe<Array<ProductFieldEnum>>;
  /** List of warehouse ids witch should be exported. */
  warehouses?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Export products to csv file.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ExportProducts = {
  errors: Array<ExportError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  exportErrors: Array<ExportError>;
  /** The newly created export file job which is responsible for export data. */
  exportFile?: Maybe<ExportFile>;
};

export type ExportProductsInput = {
  /** Input with info about fields which should be exported. */
  exportInfo?: InputMaybe<ExportInfoInput>;
  /** Type of exported file. */
  fileType: FileTypesEnum;
  /** Filtering options for products. */
  filter?: InputMaybe<ProductFilterInput>;
  /** List of products IDs to export. */
  ids?: InputMaybe<Array<Scalars['ID']>>;
  /** Determine which products should be exported. */
  scope: ExportScope;
};

export enum ExportScope {
  /** Export all products. */
  All = 'ALL',
  /** Export the filtered products. */
  Filter = 'FILTER',
  /** Export products with given ids. */
  Ids = 'IDS'
}

export type ExternalAuthentication = {
  /** ID of external authentication plugin. */
  id: Scalars['String'];
  /** Name of external authentication plugin. */
  name?: Maybe<Scalars['String']>;
};

/** Prepare external authentication url for user by custom plugin. */
export type ExternalAuthenticationUrl = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  /** The data returned by authentication plugin. */
  authenticationData?: Maybe<Scalars['JSONString']>;
  errors: Array<AccountError>;
};

/** Logout user by custom plugin. */
export type ExternalLogout = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** The data returned by authentication plugin. */
  logoutData?: Maybe<Scalars['JSONString']>;
};

export type ExternalNotificationError = {
  /** The error code. */
  code: ExternalNotificationErrorCodes;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ExternalNotificationErrorCodes {
  ChannelInactive = 'CHANNEL_INACTIVE',
  InvalidModelType = 'INVALID_MODEL_TYPE',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

/**
 * Trigger sending a notification with the notify plugin method. Serializes nodes provided as ids parameter and includes this data in the notification payload.
 *
 * Added in Saleor 3.1.
 */
export type ExternalNotificationTrigger = {
  errors: Array<ExternalNotificationError>;
};

export type ExternalNotificationTriggerInput = {
  /** External event type. This field is passed to a plugin as an event type. */
  externalEventType: Scalars['String'];
  /** Additional payload that will be merged with the one based on the bussines object ID. */
  extraPayload?: InputMaybe<Scalars['JSONString']>;
  /** The list of customers or orders node IDs that will be serialized and included in the notification payload. */
  ids: Array<Scalars['ID']>;
};

/** Obtain external access tokens for user by custom plugin. */
export type ExternalObtainAccessTokens = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  /** CSRF token required to re-generate external access token. */
  csrfToken?: Maybe<Scalars['String']>;
  errors: Array<AccountError>;
  /** The refresh token, required to re-generate external access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** The token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

/** Refresh user's access by custom plugin. */
export type ExternalRefresh = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  /** CSRF token required to re-generate external access token. */
  csrfToken?: Maybe<Scalars['String']>;
  errors: Array<AccountError>;
  /** The refresh token, required to re-generate external access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** The token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

/** Verify external authentication data by plugin. */
export type ExternalVerify = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** Determine if authentication data is valid or not. */
  isValid: Scalars['Boolean'];
  /** User assigned to data. */
  user?: Maybe<User>;
  /** External data. */
  verifyData?: Maybe<Scalars['JSONString']>;
};

export type File = {
  /** Content type of the file. */
  contentType?: Maybe<Scalars['String']>;
  /** The URL of the file. */
  url: Scalars['String'];
};

/** An enumeration. */
export enum FileTypesEnum {
  Csv = 'CSV',
  Xlsx = 'XLSX'
}

/**
 * Upload a file. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
 *
 * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
 */
export type FileUpload = {
  errors: Array<UploadError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  uploadErrors: Array<UploadError>;
  uploadedFile?: Maybe<File>;
};

/** Represents order fulfillment. */
export type Fulfillment = Node &
  ObjectWithMetadata & {
    created: Scalars['DateTime'];
    fulfillmentOrder: Scalars['Int'];
    id: Scalars['ID'];
    /** List of lines for the fulfillment. */
    lines?: Maybe<Array<FulfillmentLine>>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    status: FulfillmentStatus;
    /** User-friendly fulfillment status. */
    statusDisplay?: Maybe<Scalars['String']>;
    trackingNumber: Scalars['String'];
    /** Warehouse from fulfillment was fulfilled. */
    warehouse?: Maybe<Warehouse>;
  };

/** Represents order fulfillment. */
export type FulfillmentMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents order fulfillment. */
export type FulfillmentMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents order fulfillment. */
export type FulfillmentPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents order fulfillment. */
export type FulfillmentPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Approve existing fulfillment.
 *
 * Added in Saleor 3.1.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type FulfillmentApprove = {
  errors: Array<OrderError>;
  /** An approved fulfillment. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order which fulfillment was approved. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Event sent when fulfillment is approved.
 *
 * Added in Saleor 3.7.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type FulfillmentApproved = Event & {
  /** The fulfillment the event relates to. */
  fulfillment?: Maybe<Fulfillment>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the fulfillment belongs to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Cancels existing fulfillment and optionally restocks items.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type FulfillmentCancel = {
  errors: Array<OrderError>;
  /** A canceled fulfillment. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order which fulfillment was cancelled. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type FulfillmentCancelInput = {
  /** ID of a warehouse where items will be restocked. Optional when fulfillment is in WAITING_FOR_APPROVAL state. */
  warehouseId?: InputMaybe<Scalars['ID']>;
};

/**
 * Event sent when fulfillment is canceled.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type FulfillmentCanceled = Event & {
  /** The fulfillment the event relates to. */
  fulfillment?: Maybe<Fulfillment>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the fulfillment belongs to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new fulfillment is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type FulfillmentCreated = Event & {
  /** The fulfillment the event relates to. */
  fulfillment?: Maybe<Fulfillment>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the fulfillment belongs to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents line of the fulfillment. */
export type FulfillmentLine = Node & {
  id: Scalars['ID'];
  orderLine?: Maybe<OrderLine>;
  quantity: Scalars['Int'];
};

/**
 * Event sent when fulfillment metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type FulfillmentMetadataUpdated = Event & {
  /** The fulfillment the event relates to. */
  fulfillment?: Maybe<Fulfillment>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the fulfillment belongs to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Refund products.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type FulfillmentRefundProducts = {
  errors: Array<OrderError>;
  /** A refunded fulfillment. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order which fulfillment was refunded. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Return products.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type FulfillmentReturnProducts = {
  errors: Array<OrderError>;
  /** Order which fulfillment was returned. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
  /** A replace fulfillment. */
  replaceFulfillment?: Maybe<Fulfillment>;
  /** A draft order which was created for products with replace flag. */
  replaceOrder?: Maybe<Order>;
  /** A return fulfillment. */
  returnFulfillment?: Maybe<Fulfillment>;
};

/** An enumeration. */
export enum FulfillmentStatus {
  Canceled = 'CANCELED',
  Fulfilled = 'FULFILLED',
  Refunded = 'REFUNDED',
  RefundedAndReturned = 'REFUNDED_AND_RETURNED',
  Replaced = 'REPLACED',
  Returned = 'RETURNED',
  WaitingForApproval = 'WAITING_FOR_APPROVAL'
}

/**
 * Updates a fulfillment for an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type FulfillmentUpdateTracking = {
  errors: Array<OrderError>;
  /** A fulfillment with updated tracking. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order for which fulfillment was updated. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type FulfillmentUpdateTrackingInput = {
  /** If true, send an email notification to the customer. */
  notifyCustomer?: InputMaybe<Scalars['Boolean']>;
  /** Fulfillment tracking number. */
  trackingNumber?: InputMaybe<Scalars['String']>;
};

/** Payment gateway client configuration key and value pair. */
export type GatewayConfigLine = {
  /** Gateway config key. */
  field: Scalars['String'];
  /** Gateway config value for key. */
  value?: Maybe<Scalars['String']>;
};

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCard = Node &
  ObjectWithMetadata & {
    /**
     * App which created the gift card.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     *
     * Requires one of the following permissions: MANAGE_APPS, OWNER.
     */
    app?: Maybe<App>;
    /**
     * Slug of the channel where the gift card was bought.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    boughtInChannel?: Maybe<Scalars['String']>;
    /** Gift card code. Can be fetched by a staff member with MANAGE_GIFT_CARD when gift card wasn't yet used and by the gift card owner. */
    code: Scalars['String'];
    created: Scalars['DateTime'];
    /**
     * The user who bought or issued a gift card.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    createdBy?: Maybe<User>;
    /**
     * Email address of the user who bought or issued gift card.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     *
     * Requires one of the following permissions: MANAGE_USERS, OWNER.
     */
    createdByEmail?: Maybe<Scalars['String']>;
    currentBalance: Money;
    /** Code in format which allows displaying in a user interface. */
    displayCode: Scalars['String'];
    /**
     * End date of gift card.
     * @deprecated This field will be removed in Saleor 4.0. Use `expiryDate` field instead.
     */
    endDate?: Maybe<Scalars['DateTime']>;
    /**
     * List of events associated with the gift card.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     *
     * Requires one of the following permissions: MANAGE_GIFT_CARD.
     */
    events: Array<GiftCardEvent>;
    expiryDate?: Maybe<Scalars['Date']>;
    id: Scalars['ID'];
    initialBalance: Money;
    isActive: Scalars['Boolean'];
    /** Last 4 characters of gift card code. */
    last4CodeChars: Scalars['String'];
    lastUsedOn?: Maybe<Scalars['DateTime']>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /**
     * Related gift card product.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    product?: Maybe<Product>;
    /**
     * Start date of gift card.
     * @deprecated This field will be removed in Saleor 4.0.
     */
    startDate?: Maybe<Scalars['DateTime']>;
    /**
     * The gift card tag.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     *
     * Requires one of the following permissions: MANAGE_GIFT_CARD.
     */
    tags: Array<GiftCardTag>;
    /**
     * The customer who used a gift card.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    usedBy?: Maybe<User>;
    /**
     * Email address of the customer who used a gift card.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    usedByEmail?: Maybe<Scalars['String']>;
    /**
     * The customer who bought a gift card.
     * @deprecated This field will be removed in Saleor 4.0. Use `createdBy` field instead.
     */
    user?: Maybe<User>;
  };

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCardEventsArgs = {
  filter?: InputMaybe<GiftCardEventFilterInput>;
};

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCardMetafieldArgs = {
  key: Scalars['String'];
};

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCardMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCardPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCardPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Activate a gift card.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardActivate = {
  errors: Array<GiftCardError>;
  /** Activated gift card. */
  giftCard?: Maybe<GiftCard>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  giftCardErrors: Array<GiftCardError>;
};

/**
 * Adds note to the gift card.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardAddNote = {
  errors: Array<GiftCardError>;
  /** Gift card note created. */
  event?: Maybe<GiftCardEvent>;
  /** Gift card with the note added. */
  giftCard?: Maybe<GiftCard>;
};

export type GiftCardAddNoteInput = {
  /** Note message. */
  message: Scalars['String'];
};

/**
 * Activate gift cards.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardBulkActivate = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<GiftCardError>;
};

/**
 * Create gift cards.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardBulkCreate = {
  /** Returns how many objects were created. */
  count: Scalars['Int'];
  errors: Array<GiftCardError>;
  /** List of created gift cards. */
  giftCards: Array<GiftCard>;
};

export type GiftCardBulkCreateInput = {
  /** Balance of the gift card. */
  balance: PriceInput;
  /** The number of cards to issue. */
  count: Scalars['Int'];
  /** The gift card expiry date. */
  expiryDate?: InputMaybe<Scalars['Date']>;
  /** Determine if gift card is active. */
  isActive: Scalars['Boolean'];
  /** The gift card tags. */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Deactivate gift cards.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardBulkDeactivate = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<GiftCardError>;
};

/**
 * Delete gift cards.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<GiftCardError>;
};

export type GiftCardCountableConnection = {
  edges: Array<GiftCardCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type GiftCardCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: GiftCard;
};

/**
 * Creates a new gift card.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardCreate = {
  errors: Array<GiftCardError>;
  giftCard?: Maybe<GiftCard>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  giftCardErrors: Array<GiftCardError>;
};

export type GiftCardCreateInput = {
  /**
   * The gift card tags to add.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  addTags?: InputMaybe<Array<Scalars['String']>>;
  /** Balance of the gift card. */
  balance: PriceInput;
  /**
   * Slug of a channel from which the email should be sent.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  channel?: InputMaybe<Scalars['String']>;
  /**
   * Code to use the gift card.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. The code is now auto generated.
   */
  code?: InputMaybe<Scalars['String']>;
  /**
   * End date of the gift card in ISO 8601 format.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `expiryDate` from `expirySettings` instead.
   */
  endDate?: InputMaybe<Scalars['Date']>;
  /**
   * The gift card expiry date.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  expiryDate?: InputMaybe<Scalars['Date']>;
  /**
   * Determine if gift card is active.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  isActive: Scalars['Boolean'];
  /**
   * The gift card note from the staff member.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  note?: InputMaybe<Scalars['String']>;
  /**
   * Start date of the gift card in ISO 8601 format.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  startDate?: InputMaybe<Scalars['Date']>;
  /** Email of the customer to whom gift card will be sent. */
  userEmail?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new gift card is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type GiftCardCreated = Event & {
  /** The gift card the event relates to. */
  giftCard?: Maybe<GiftCard>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deactivate a gift card.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardDeactivate = {
  errors: Array<GiftCardError>;
  /** Deactivated gift card. */
  giftCard?: Maybe<GiftCard>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  giftCardErrors: Array<GiftCardError>;
};

/**
 * Delete gift card.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardDelete = {
  errors: Array<GiftCardError>;
  giftCard?: Maybe<GiftCard>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  giftCardErrors: Array<GiftCardError>;
};

/**
 * Event sent when gift card is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type GiftCardDeleted = Event & {
  /** The gift card the event relates to. */
  giftCard?: Maybe<GiftCard>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type GiftCardError = {
  /** The error code. */
  code: GiftCardErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of tag values that cause the error. */
  tags?: Maybe<Array<Scalars['String']>>;
};

/** An enumeration. */
export enum GiftCardErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  ExpiredGiftCard = 'EXPIRED_GIFT_CARD',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/**
 * History log of the gift card.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type GiftCardEvent = Node & {
  /** App that performed the action. Requires one of the following permissions: MANAGE_APPS, OWNER. */
  app?: Maybe<App>;
  /** The gift card balance. */
  balance?: Maybe<GiftCardEventBalance>;
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** Email of the customer. */
  email?: Maybe<Scalars['String']>;
  /** The gift card expiry date. */
  expiryDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** Previous gift card expiry date. */
  oldExpiryDate?: Maybe<Scalars['Date']>;
  /** The list of old gift card tags. */
  oldTags?: Maybe<Array<Scalars['String']>>;
  /** The order ID where gift card was used or bought. */
  orderId?: Maybe<Scalars['ID']>;
  /** User-friendly number of an order where gift card was used or bought. */
  orderNumber?: Maybe<Scalars['String']>;
  /** The list of gift card tags. */
  tags?: Maybe<Array<Scalars['String']>>;
  /** Gift card event type. */
  type?: Maybe<GiftCardEventsEnum>;
  /** User who performed the action. Requires one of the following permissions: MANAGE_USERS, MANAGE_STAFF, OWNER. */
  user?: Maybe<User>;
};

export type GiftCardEventBalance = {
  /** Current balance of the gift card. */
  currentBalance: Money;
  /** Initial balance of the gift card. */
  initialBalance?: Maybe<Money>;
  /** Previous current balance of the gift card. */
  oldCurrentBalance?: Maybe<Money>;
  /** Previous initial balance of the gift card. */
  oldInitialBalance?: Maybe<Money>;
};

export type GiftCardEventFilterInput = {
  orders?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<GiftCardEventsEnum>;
};

/** An enumeration. */
export enum GiftCardEventsEnum {
  Activated = 'ACTIVATED',
  BalanceReset = 'BALANCE_RESET',
  Bought = 'BOUGHT',
  Deactivated = 'DEACTIVATED',
  ExpiryDateUpdated = 'EXPIRY_DATE_UPDATED',
  Issued = 'ISSUED',
  NoteAdded = 'NOTE_ADDED',
  Resent = 'RESENT',
  SentToCustomer = 'SENT_TO_CUSTOMER',
  TagsUpdated = 'TAGS_UPDATED',
  Updated = 'UPDATED',
  UsedInOrder = 'USED_IN_ORDER'
}

export type GiftCardFilterInput = {
  code?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  currentBalance?: InputMaybe<PriceRangeInput>;
  initialBalance?: InputMaybe<PriceRangeInput>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  products?: InputMaybe<Array<Scalars['ID']>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  used?: InputMaybe<Scalars['Boolean']>;
  usedBy?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Event sent when gift card metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type GiftCardMetadataUpdated = Event & {
  /** The gift card the event relates to. */
  giftCard?: Maybe<GiftCard>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Resend a gift card.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardResend = {
  errors: Array<GiftCardError>;
  /** Gift card which has been sent. */
  giftCard?: Maybe<GiftCard>;
};

export type GiftCardResendInput = {
  /** Slug of a channel from which the email should be sent. */
  channel: Scalars['String'];
  /** Email to which gift card should be send. */
  email?: InputMaybe<Scalars['String']>;
  /** ID of a gift card to resend. */
  id: Scalars['ID'];
};

/** Gift card related settings from site settings. */
export type GiftCardSettings = {
  /** The gift card expiry period settings. */
  expiryPeriod?: Maybe<TimePeriod>;
  /** The gift card expiry type settings. */
  expiryType: GiftCardSettingsExpiryTypeEnum;
};

export type GiftCardSettingsError = {
  /** The error code. */
  code: GiftCardSettingsErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum GiftCardSettingsErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  Required = 'REQUIRED'
}

/** An enumeration. */
export enum GiftCardSettingsExpiryTypeEnum {
  ExpiryPeriod = 'EXPIRY_PERIOD',
  NeverExpire = 'NEVER_EXPIRE'
}

/**
 * Update gift card settings.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardSettingsUpdate = {
  errors: Array<GiftCardSettingsError>;
  /** Gift card settings. */
  giftCardSettings?: Maybe<GiftCardSettings>;
};

export type GiftCardSettingsUpdateInput = {
  /** Defines gift card expiry period. */
  expiryPeriod?: InputMaybe<TimePeriodInputType>;
  /** Defines gift card default expiry settings. */
  expiryType?: InputMaybe<GiftCardSettingsExpiryTypeEnum>;
};

export enum GiftCardSortField {
  /**
   * Sort gift cards by created at.
   *
   * Added in Saleor 3.8.
   */
  CreatedAt = 'CREATED_AT',
  /** Sort gift cards by current balance. */
  CurrentBalance = 'CURRENT_BALANCE',
  /** Sort gift cards by product. */
  Product = 'PRODUCT',
  /** Sort gift cards by used by. */
  UsedBy = 'USED_BY'
}

export type GiftCardSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort gift cards by the selected field. */
  field: GiftCardSortField;
};

/**
 * Event sent when gift card status has changed.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type GiftCardStatusChanged = Event & {
  /** The gift card the event relates to. */
  giftCard?: Maybe<GiftCard>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * The gift card tag.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type GiftCardTag = Node & {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GiftCardTagCountableConnection = {
  edges: Array<GiftCardTagCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type GiftCardTagCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: GiftCardTag;
};

export type GiftCardTagFilterInput = {
  search?: InputMaybe<Scalars['String']>;
};

/**
 * Update a gift card.
 *
 * Requires one of the following permissions: MANAGE_GIFT_CARD.
 */
export type GiftCardUpdate = {
  errors: Array<GiftCardError>;
  giftCard?: Maybe<GiftCard>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  giftCardErrors: Array<GiftCardError>;
};

export type GiftCardUpdateInput = {
  /**
   * The gift card tags to add.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  addTags?: InputMaybe<Array<Scalars['String']>>;
  /**
   * The gift card balance amount.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  balanceAmount?: InputMaybe<Scalars['PositiveDecimal']>;
  /**
   * End date of the gift card in ISO 8601 format.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `expiryDate` from `expirySettings` instead.
   */
  endDate?: InputMaybe<Scalars['Date']>;
  /**
   * The gift card expiry date.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  expiryDate?: InputMaybe<Scalars['Date']>;
  /**
   * The gift card tags to remove.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  removeTags?: InputMaybe<Array<Scalars['String']>>;
  /**
   * Start date of the gift card in ISO 8601 format.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  startDate?: InputMaybe<Scalars['Date']>;
};

/**
 * Event sent when gift card is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type GiftCardUpdated = Event & {
  /** The gift card the event relates to. */
  giftCard?: Maybe<GiftCard>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents permission group data. */
export type Group = Node & {
  id: Scalars['ID'];
  name: Scalars['String'];
  /** List of group permissions */
  permissions?: Maybe<Array<Permission>>;
  /** True, if the currently authenticated user has rights to manage a group. */
  userCanManage: Scalars['Boolean'];
  /**
   * List of group users
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  users?: Maybe<Array<User>>;
};

export type GroupCountableConnection = {
  edges: Array<GroupCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type GroupCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Group;
};

/** Represents an image. */
export type Image = {
  /** Alt text for an image. */
  alt?: Maybe<Scalars['String']>;
  /** The URL of the image. */
  url: Scalars['String'];
};

export type IntRangeInput = {
  /** Value greater than or equal to. */
  gte?: InputMaybe<Scalars['Int']>;
  /** Value less than or equal to. */
  lte?: InputMaybe<Scalars['Int']>;
};

/** Represents an Invoice. */
export type Invoice = Job &
  Node &
  ObjectWithMetadata & {
    createdAt: Scalars['DateTime'];
    externalUrl?: Maybe<Scalars['String']>;
    /** The ID of the object. */
    id: Scalars['ID'];
    message?: Maybe<Scalars['String']>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    number?: Maybe<Scalars['String']>;
    /**
     * Order related to the invoice.
     *
     * Added in Saleor 3.10.
     */
    order?: Maybe<Order>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** Job status. */
    status: JobStatusEnum;
    updatedAt: Scalars['DateTime'];
    /** URL to download an invoice. */
    url?: Maybe<Scalars['String']>;
  };

/** Represents an Invoice. */
export type InvoiceMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an Invoice. */
export type InvoiceMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents an Invoice. */
export type InvoicePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an Invoice. */
export type InvoicePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Creates a ready to send invoice.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type InvoiceCreate = {
  errors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  invoiceErrors: Array<InvoiceError>;
};

export type InvoiceCreateInput = {
  /** Invoice number. */
  number: Scalars['String'];
  /** URL of an invoice to download. */
  url: Scalars['String'];
};

/**
 * Deletes an invoice.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type InvoiceDelete = {
  errors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  invoiceErrors: Array<InvoiceError>;
};

/**
 * Event sent when invoice is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type InvoiceDeleted = Event & {
  /** The invoice the event relates to. */
  invoice?: Maybe<Invoice>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /**
   * Order related to the invoice.
   *
   * Added in Saleor 3.10.
   */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type InvoiceError = {
  /** The error code. */
  code: InvoiceErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum InvoiceErrorCode {
  EmailNotSet = 'EMAIL_NOT_SET',
  InvalidStatus = 'INVALID_STATUS',
  NotFound = 'NOT_FOUND',
  NotReady = 'NOT_READY',
  NoInvoicePlugin = 'NO_INVOICE_PLUGIN',
  NumberNotSet = 'NUMBER_NOT_SET',
  Required = 'REQUIRED',
  UrlNotSet = 'URL_NOT_SET'
}

/**
 * Request an invoice for the order using plugin.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type InvoiceRequest = {
  errors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  invoiceErrors: Array<InvoiceError>;
  /** Order related to an invoice. */
  order?: Maybe<Order>;
};

/**
 * Requests deletion of an invoice.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type InvoiceRequestDelete = {
  errors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  invoiceErrors: Array<InvoiceError>;
};

/**
 * Event sent when invoice is requested.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type InvoiceRequested = Event & {
  /** The invoice the event relates to. */
  invoice?: Maybe<Invoice>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /**
   * Order related to the invoice.
   *
   * Added in Saleor 3.10.
   */
  order: Order;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Send an invoice notification to the customer.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type InvoiceSendNotification = {
  errors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  invoiceErrors: Array<InvoiceError>;
};

/**
 * Event sent when invoice is sent.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type InvoiceSent = Event & {
  /** The invoice the event relates to. */
  invoice?: Maybe<Invoice>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /**
   * Order related to the invoice.
   *
   * Added in Saleor 3.10.
   */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Updates an invoice.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type InvoiceUpdate = {
  errors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  invoiceErrors: Array<InvoiceError>;
};

export type IssuingPrincipal = App | User;

export type Job = {
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /** Job status. */
  status: JobStatusEnum;
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
};

/** An enumeration. */
export enum JobStatusEnum {
  Deleted = 'DELETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

/** An enumeration. */
export enum LanguageCodeEnum {
  Af = 'AF',
  AfNa = 'AF_NA',
  AfZa = 'AF_ZA',
  Agq = 'AGQ',
  AgqCm = 'AGQ_CM',
  Ak = 'AK',
  AkGh = 'AK_GH',
  Am = 'AM',
  AmEt = 'AM_ET',
  Ar = 'AR',
  ArAe = 'AR_AE',
  ArBh = 'AR_BH',
  ArDj = 'AR_DJ',
  ArDz = 'AR_DZ',
  ArEg = 'AR_EG',
  ArEh = 'AR_EH',
  ArEr = 'AR_ER',
  ArIl = 'AR_IL',
  ArIq = 'AR_IQ',
  ArJo = 'AR_JO',
  ArKm = 'AR_KM',
  ArKw = 'AR_KW',
  ArLb = 'AR_LB',
  ArLy = 'AR_LY',
  ArMa = 'AR_MA',
  ArMr = 'AR_MR',
  ArOm = 'AR_OM',
  ArPs = 'AR_PS',
  ArQa = 'AR_QA',
  ArSa = 'AR_SA',
  ArSd = 'AR_SD',
  ArSo = 'AR_SO',
  ArSs = 'AR_SS',
  ArSy = 'AR_SY',
  ArTd = 'AR_TD',
  ArTn = 'AR_TN',
  ArYe = 'AR_YE',
  As = 'AS',
  Asa = 'ASA',
  AsaTz = 'ASA_TZ',
  Ast = 'AST',
  AstEs = 'AST_ES',
  AsIn = 'AS_IN',
  Az = 'AZ',
  AzCyrl = 'AZ_CYRL',
  AzCyrlAz = 'AZ_CYRL_AZ',
  AzLatn = 'AZ_LATN',
  AzLatnAz = 'AZ_LATN_AZ',
  Bas = 'BAS',
  BasCm = 'BAS_CM',
  Be = 'BE',
  Bem = 'BEM',
  BemZm = 'BEM_ZM',
  Bez = 'BEZ',
  BezTz = 'BEZ_TZ',
  BeBy = 'BE_BY',
  Bg = 'BG',
  BgBg = 'BG_BG',
  Bm = 'BM',
  BmMl = 'BM_ML',
  Bn = 'BN',
  BnBd = 'BN_BD',
  BnIn = 'BN_IN',
  Bo = 'BO',
  BoCn = 'BO_CN',
  BoIn = 'BO_IN',
  Br = 'BR',
  Brx = 'BRX',
  BrxIn = 'BRX_IN',
  BrFr = 'BR_FR',
  Bs = 'BS',
  BsCyrl = 'BS_CYRL',
  BsCyrlBa = 'BS_CYRL_BA',
  BsLatn = 'BS_LATN',
  BsLatnBa = 'BS_LATN_BA',
  Ca = 'CA',
  CaAd = 'CA_AD',
  CaEs = 'CA_ES',
  CaEsValencia = 'CA_ES_VALENCIA',
  CaFr = 'CA_FR',
  CaIt = 'CA_IT',
  Ccp = 'CCP',
  CcpBd = 'CCP_BD',
  CcpIn = 'CCP_IN',
  Ce = 'CE',
  Ceb = 'CEB',
  CebPh = 'CEB_PH',
  CeRu = 'CE_RU',
  Cgg = 'CGG',
  CggUg = 'CGG_UG',
  Chr = 'CHR',
  ChrUs = 'CHR_US',
  Ckb = 'CKB',
  CkbIq = 'CKB_IQ',
  CkbIr = 'CKB_IR',
  Cs = 'CS',
  CsCz = 'CS_CZ',
  Cu = 'CU',
  CuRu = 'CU_RU',
  Cy = 'CY',
  CyGb = 'CY_GB',
  Da = 'DA',
  Dav = 'DAV',
  DavKe = 'DAV_KE',
  DaDk = 'DA_DK',
  DaGl = 'DA_GL',
  De = 'DE',
  DeAt = 'DE_AT',
  DeBe = 'DE_BE',
  DeCh = 'DE_CH',
  DeDe = 'DE_DE',
  DeIt = 'DE_IT',
  DeLi = 'DE_LI',
  DeLu = 'DE_LU',
  Dje = 'DJE',
  DjeNe = 'DJE_NE',
  Dsb = 'DSB',
  DsbDe = 'DSB_DE',
  Dua = 'DUA',
  DuaCm = 'DUA_CM',
  Dyo = 'DYO',
  DyoSn = 'DYO_SN',
  Dz = 'DZ',
  DzBt = 'DZ_BT',
  Ebu = 'EBU',
  EbuKe = 'EBU_KE',
  Ee = 'EE',
  EeGh = 'EE_GH',
  EeTg = 'EE_TG',
  El = 'EL',
  ElCy = 'EL_CY',
  ElGr = 'EL_GR',
  En = 'EN',
  EnAe = 'EN_AE',
  EnAg = 'EN_AG',
  EnAi = 'EN_AI',
  EnAs = 'EN_AS',
  EnAt = 'EN_AT',
  EnAu = 'EN_AU',
  EnBb = 'EN_BB',
  EnBe = 'EN_BE',
  EnBi = 'EN_BI',
  EnBm = 'EN_BM',
  EnBs = 'EN_BS',
  EnBw = 'EN_BW',
  EnBz = 'EN_BZ',
  EnCa = 'EN_CA',
  EnCc = 'EN_CC',
  EnCh = 'EN_CH',
  EnCk = 'EN_CK',
  EnCm = 'EN_CM',
  EnCx = 'EN_CX',
  EnCy = 'EN_CY',
  EnDe = 'EN_DE',
  EnDg = 'EN_DG',
  EnDk = 'EN_DK',
  EnDm = 'EN_DM',
  EnEr = 'EN_ER',
  EnFi = 'EN_FI',
  EnFj = 'EN_FJ',
  EnFk = 'EN_FK',
  EnFm = 'EN_FM',
  EnGb = 'EN_GB',
  EnGd = 'EN_GD',
  EnGg = 'EN_GG',
  EnGh = 'EN_GH',
  EnGi = 'EN_GI',
  EnGm = 'EN_GM',
  EnGu = 'EN_GU',
  EnGy = 'EN_GY',
  EnHk = 'EN_HK',
  EnIe = 'EN_IE',
  EnIl = 'EN_IL',
  EnIm = 'EN_IM',
  EnIn = 'EN_IN',
  EnIo = 'EN_IO',
  EnJe = 'EN_JE',
  EnJm = 'EN_JM',
  EnKe = 'EN_KE',
  EnKi = 'EN_KI',
  EnKn = 'EN_KN',
  EnKy = 'EN_KY',
  EnLc = 'EN_LC',
  EnLr = 'EN_LR',
  EnLs = 'EN_LS',
  EnMg = 'EN_MG',
  EnMh = 'EN_MH',
  EnMo = 'EN_MO',
  EnMp = 'EN_MP',
  EnMs = 'EN_MS',
  EnMt = 'EN_MT',
  EnMu = 'EN_MU',
  EnMw = 'EN_MW',
  EnMy = 'EN_MY',
  EnNa = 'EN_NA',
  EnNf = 'EN_NF',
  EnNg = 'EN_NG',
  EnNl = 'EN_NL',
  EnNr = 'EN_NR',
  EnNu = 'EN_NU',
  EnNz = 'EN_NZ',
  EnPg = 'EN_PG',
  EnPh = 'EN_PH',
  EnPk = 'EN_PK',
  EnPn = 'EN_PN',
  EnPr = 'EN_PR',
  EnPw = 'EN_PW',
  EnRw = 'EN_RW',
  EnSb = 'EN_SB',
  EnSc = 'EN_SC',
  EnSd = 'EN_SD',
  EnSe = 'EN_SE',
  EnSg = 'EN_SG',
  EnSh = 'EN_SH',
  EnSi = 'EN_SI',
  EnSl = 'EN_SL',
  EnSs = 'EN_SS',
  EnSx = 'EN_SX',
  EnSz = 'EN_SZ',
  EnTc = 'EN_TC',
  EnTk = 'EN_TK',
  EnTo = 'EN_TO',
  EnTt = 'EN_TT',
  EnTv = 'EN_TV',
  EnTz = 'EN_TZ',
  EnUg = 'EN_UG',
  EnUm = 'EN_UM',
  EnUs = 'EN_US',
  EnVc = 'EN_VC',
  EnVg = 'EN_VG',
  EnVi = 'EN_VI',
  EnVu = 'EN_VU',
  EnWs = 'EN_WS',
  EnZa = 'EN_ZA',
  EnZm = 'EN_ZM',
  EnZw = 'EN_ZW',
  Eo = 'EO',
  Es = 'ES',
  EsAr = 'ES_AR',
  EsBo = 'ES_BO',
  EsBr = 'ES_BR',
  EsBz = 'ES_BZ',
  EsCl = 'ES_CL',
  EsCo = 'ES_CO',
  EsCr = 'ES_CR',
  EsCu = 'ES_CU',
  EsDo = 'ES_DO',
  EsEa = 'ES_EA',
  EsEc = 'ES_EC',
  EsEs = 'ES_ES',
  EsGq = 'ES_GQ',
  EsGt = 'ES_GT',
  EsHn = 'ES_HN',
  EsIc = 'ES_IC',
  EsMx = 'ES_MX',
  EsNi = 'ES_NI',
  EsPa = 'ES_PA',
  EsPe = 'ES_PE',
  EsPh = 'ES_PH',
  EsPr = 'ES_PR',
  EsPy = 'ES_PY',
  EsSv = 'ES_SV',
  EsUs = 'ES_US',
  EsUy = 'ES_UY',
  EsVe = 'ES_VE',
  Et = 'ET',
  EtEe = 'ET_EE',
  Eu = 'EU',
  EuEs = 'EU_ES',
  Ewo = 'EWO',
  EwoCm = 'EWO_CM',
  Fa = 'FA',
  FaAf = 'FA_AF',
  FaIr = 'FA_IR',
  Ff = 'FF',
  FfAdlm = 'FF_ADLM',
  FfAdlmBf = 'FF_ADLM_BF',
  FfAdlmCm = 'FF_ADLM_CM',
  FfAdlmGh = 'FF_ADLM_GH',
  FfAdlmGm = 'FF_ADLM_GM',
  FfAdlmGn = 'FF_ADLM_GN',
  FfAdlmGw = 'FF_ADLM_GW',
  FfAdlmLr = 'FF_ADLM_LR',
  FfAdlmMr = 'FF_ADLM_MR',
  FfAdlmNe = 'FF_ADLM_NE',
  FfAdlmNg = 'FF_ADLM_NG',
  FfAdlmSl = 'FF_ADLM_SL',
  FfAdlmSn = 'FF_ADLM_SN',
  FfLatn = 'FF_LATN',
  FfLatnBf = 'FF_LATN_BF',
  FfLatnCm = 'FF_LATN_CM',
  FfLatnGh = 'FF_LATN_GH',
  FfLatnGm = 'FF_LATN_GM',
  FfLatnGn = 'FF_LATN_GN',
  FfLatnGw = 'FF_LATN_GW',
  FfLatnLr = 'FF_LATN_LR',
  FfLatnMr = 'FF_LATN_MR',
  FfLatnNe = 'FF_LATN_NE',
  FfLatnNg = 'FF_LATN_NG',
  FfLatnSl = 'FF_LATN_SL',
  FfLatnSn = 'FF_LATN_SN',
  Fi = 'FI',
  Fil = 'FIL',
  FilPh = 'FIL_PH',
  FiFi = 'FI_FI',
  Fo = 'FO',
  FoDk = 'FO_DK',
  FoFo = 'FO_FO',
  Fr = 'FR',
  FrBe = 'FR_BE',
  FrBf = 'FR_BF',
  FrBi = 'FR_BI',
  FrBj = 'FR_BJ',
  FrBl = 'FR_BL',
  FrCa = 'FR_CA',
  FrCd = 'FR_CD',
  FrCf = 'FR_CF',
  FrCg = 'FR_CG',
  FrCh = 'FR_CH',
  FrCi = 'FR_CI',
  FrCm = 'FR_CM',
  FrDj = 'FR_DJ',
  FrDz = 'FR_DZ',
  FrFr = 'FR_FR',
  FrGa = 'FR_GA',
  FrGf = 'FR_GF',
  FrGn = 'FR_GN',
  FrGp = 'FR_GP',
  FrGq = 'FR_GQ',
  FrHt = 'FR_HT',
  FrKm = 'FR_KM',
  FrLu = 'FR_LU',
  FrMa = 'FR_MA',
  FrMc = 'FR_MC',
  FrMf = 'FR_MF',
  FrMg = 'FR_MG',
  FrMl = 'FR_ML',
  FrMq = 'FR_MQ',
  FrMr = 'FR_MR',
  FrMu = 'FR_MU',
  FrNc = 'FR_NC',
  FrNe = 'FR_NE',
  FrPf = 'FR_PF',
  FrPm = 'FR_PM',
  FrRe = 'FR_RE',
  FrRw = 'FR_RW',
  FrSc = 'FR_SC',
  FrSn = 'FR_SN',
  FrSy = 'FR_SY',
  FrTd = 'FR_TD',
  FrTg = 'FR_TG',
  FrTn = 'FR_TN',
  FrVu = 'FR_VU',
  FrWf = 'FR_WF',
  FrYt = 'FR_YT',
  Fur = 'FUR',
  FurIt = 'FUR_IT',
  Fy = 'FY',
  FyNl = 'FY_NL',
  Ga = 'GA',
  GaGb = 'GA_GB',
  GaIe = 'GA_IE',
  Gd = 'GD',
  GdGb = 'GD_GB',
  Gl = 'GL',
  GlEs = 'GL_ES',
  Gsw = 'GSW',
  GswCh = 'GSW_CH',
  GswFr = 'GSW_FR',
  GswLi = 'GSW_LI',
  Gu = 'GU',
  Guz = 'GUZ',
  GuzKe = 'GUZ_KE',
  GuIn = 'GU_IN',
  Gv = 'GV',
  GvIm = 'GV_IM',
  Ha = 'HA',
  Haw = 'HAW',
  HawUs = 'HAW_US',
  HaGh = 'HA_GH',
  HaNe = 'HA_NE',
  HaNg = 'HA_NG',
  He = 'HE',
  HeIl = 'HE_IL',
  Hi = 'HI',
  HiIn = 'HI_IN',
  Hr = 'HR',
  HrBa = 'HR_BA',
  HrHr = 'HR_HR',
  Hsb = 'HSB',
  HsbDe = 'HSB_DE',
  Hu = 'HU',
  HuHu = 'HU_HU',
  Hy = 'HY',
  HyAm = 'HY_AM',
  Ia = 'IA',
  Id = 'ID',
  IdId = 'ID_ID',
  Ig = 'IG',
  IgNg = 'IG_NG',
  Ii = 'II',
  IiCn = 'II_CN',
  Is = 'IS',
  IsIs = 'IS_IS',
  It = 'IT',
  ItCh = 'IT_CH',
  ItIt = 'IT_IT',
  ItSm = 'IT_SM',
  ItVa = 'IT_VA',
  Ja = 'JA',
  JaJp = 'JA_JP',
  Jgo = 'JGO',
  JgoCm = 'JGO_CM',
  Jmc = 'JMC',
  JmcTz = 'JMC_TZ',
  Jv = 'JV',
  JvId = 'JV_ID',
  Ka = 'KA',
  Kab = 'KAB',
  KabDz = 'KAB_DZ',
  Kam = 'KAM',
  KamKe = 'KAM_KE',
  KaGe = 'KA_GE',
  Kde = 'KDE',
  KdeTz = 'KDE_TZ',
  Kea = 'KEA',
  KeaCv = 'KEA_CV',
  Khq = 'KHQ',
  KhqMl = 'KHQ_ML',
  Ki = 'KI',
  KiKe = 'KI_KE',
  Kk = 'KK',
  Kkj = 'KKJ',
  KkjCm = 'KKJ_CM',
  KkKz = 'KK_KZ',
  Kl = 'KL',
  Kln = 'KLN',
  KlnKe = 'KLN_KE',
  KlGl = 'KL_GL',
  Km = 'KM',
  KmKh = 'KM_KH',
  Kn = 'KN',
  KnIn = 'KN_IN',
  Ko = 'KO',
  Kok = 'KOK',
  KokIn = 'KOK_IN',
  KoKp = 'KO_KP',
  KoKr = 'KO_KR',
  Ks = 'KS',
  Ksb = 'KSB',
  KsbTz = 'KSB_TZ',
  Ksf = 'KSF',
  KsfCm = 'KSF_CM',
  Ksh = 'KSH',
  KshDe = 'KSH_DE',
  KsArab = 'KS_ARAB',
  KsArabIn = 'KS_ARAB_IN',
  Ku = 'KU',
  KuTr = 'KU_TR',
  Kw = 'KW',
  KwGb = 'KW_GB',
  Ky = 'KY',
  KyKg = 'KY_KG',
  Lag = 'LAG',
  LagTz = 'LAG_TZ',
  Lb = 'LB',
  LbLu = 'LB_LU',
  Lg = 'LG',
  LgUg = 'LG_UG',
  Lkt = 'LKT',
  LktUs = 'LKT_US',
  Ln = 'LN',
  LnAo = 'LN_AO',
  LnCd = 'LN_CD',
  LnCf = 'LN_CF',
  LnCg = 'LN_CG',
  Lo = 'LO',
  LoLa = 'LO_LA',
  Lrc = 'LRC',
  LrcIq = 'LRC_IQ',
  LrcIr = 'LRC_IR',
  Lt = 'LT',
  LtLt = 'LT_LT',
  Lu = 'LU',
  Luo = 'LUO',
  LuoKe = 'LUO_KE',
  Luy = 'LUY',
  LuyKe = 'LUY_KE',
  LuCd = 'LU_CD',
  Lv = 'LV',
  LvLv = 'LV_LV',
  Mai = 'MAI',
  MaiIn = 'MAI_IN',
  Mas = 'MAS',
  MasKe = 'MAS_KE',
  MasTz = 'MAS_TZ',
  Mer = 'MER',
  MerKe = 'MER_KE',
  Mfe = 'MFE',
  MfeMu = 'MFE_MU',
  Mg = 'MG',
  Mgh = 'MGH',
  MghMz = 'MGH_MZ',
  Mgo = 'MGO',
  MgoCm = 'MGO_CM',
  MgMg = 'MG_MG',
  Mi = 'MI',
  MiNz = 'MI_NZ',
  Mk = 'MK',
  MkMk = 'MK_MK',
  Ml = 'ML',
  MlIn = 'ML_IN',
  Mn = 'MN',
  Mni = 'MNI',
  MniBeng = 'MNI_BENG',
  MniBengIn = 'MNI_BENG_IN',
  MnMn = 'MN_MN',
  Mr = 'MR',
  MrIn = 'MR_IN',
  Ms = 'MS',
  MsBn = 'MS_BN',
  MsId = 'MS_ID',
  MsMy = 'MS_MY',
  MsSg = 'MS_SG',
  Mt = 'MT',
  MtMt = 'MT_MT',
  Mua = 'MUA',
  MuaCm = 'MUA_CM',
  My = 'MY',
  MyMm = 'MY_MM',
  Mzn = 'MZN',
  MznIr = 'MZN_IR',
  Naq = 'NAQ',
  NaqNa = 'NAQ_NA',
  Nb = 'NB',
  NbNo = 'NB_NO',
  NbSj = 'NB_SJ',
  Nd = 'ND',
  Nds = 'NDS',
  NdsDe = 'NDS_DE',
  NdsNl = 'NDS_NL',
  NdZw = 'ND_ZW',
  Ne = 'NE',
  NeIn = 'NE_IN',
  NeNp = 'NE_NP',
  Nl = 'NL',
  NlAw = 'NL_AW',
  NlBe = 'NL_BE',
  NlBq = 'NL_BQ',
  NlCw = 'NL_CW',
  NlNl = 'NL_NL',
  NlSr = 'NL_SR',
  NlSx = 'NL_SX',
  Nmg = 'NMG',
  NmgCm = 'NMG_CM',
  Nn = 'NN',
  Nnh = 'NNH',
  NnhCm = 'NNH_CM',
  NnNo = 'NN_NO',
  Nus = 'NUS',
  NusSs = 'NUS_SS',
  Nyn = 'NYN',
  NynUg = 'NYN_UG',
  Om = 'OM',
  OmEt = 'OM_ET',
  OmKe = 'OM_KE',
  Or = 'OR',
  OrIn = 'OR_IN',
  Os = 'OS',
  OsGe = 'OS_GE',
  OsRu = 'OS_RU',
  Pa = 'PA',
  PaArab = 'PA_ARAB',
  PaArabPk = 'PA_ARAB_PK',
  PaGuru = 'PA_GURU',
  PaGuruIn = 'PA_GURU_IN',
  Pcm = 'PCM',
  PcmNg = 'PCM_NG',
  Pl = 'PL',
  PlPl = 'PL_PL',
  Prg = 'PRG',
  Ps = 'PS',
  PsAf = 'PS_AF',
  PsPk = 'PS_PK',
  Pt = 'PT',
  PtAo = 'PT_AO',
  PtBr = 'PT_BR',
  PtCh = 'PT_CH',
  PtCv = 'PT_CV',
  PtGq = 'PT_GQ',
  PtGw = 'PT_GW',
  PtLu = 'PT_LU',
  PtMo = 'PT_MO',
  PtMz = 'PT_MZ',
  PtPt = 'PT_PT',
  PtSt = 'PT_ST',
  PtTl = 'PT_TL',
  Qu = 'QU',
  QuBo = 'QU_BO',
  QuEc = 'QU_EC',
  QuPe = 'QU_PE',
  Rm = 'RM',
  RmCh = 'RM_CH',
  Rn = 'RN',
  RnBi = 'RN_BI',
  Ro = 'RO',
  Rof = 'ROF',
  RofTz = 'ROF_TZ',
  RoMd = 'RO_MD',
  RoRo = 'RO_RO',
  Ru = 'RU',
  RuBy = 'RU_BY',
  RuKg = 'RU_KG',
  RuKz = 'RU_KZ',
  RuMd = 'RU_MD',
  RuRu = 'RU_RU',
  RuUa = 'RU_UA',
  Rw = 'RW',
  Rwk = 'RWK',
  RwkTz = 'RWK_TZ',
  RwRw = 'RW_RW',
  Sah = 'SAH',
  SahRu = 'SAH_RU',
  Saq = 'SAQ',
  SaqKe = 'SAQ_KE',
  Sat = 'SAT',
  SatOlck = 'SAT_OLCK',
  SatOlckIn = 'SAT_OLCK_IN',
  Sbp = 'SBP',
  SbpTz = 'SBP_TZ',
  Sd = 'SD',
  SdArab = 'SD_ARAB',
  SdArabPk = 'SD_ARAB_PK',
  SdDeva = 'SD_DEVA',
  SdDevaIn = 'SD_DEVA_IN',
  Se = 'SE',
  Seh = 'SEH',
  SehMz = 'SEH_MZ',
  Ses = 'SES',
  SesMl = 'SES_ML',
  SeFi = 'SE_FI',
  SeNo = 'SE_NO',
  SeSe = 'SE_SE',
  Sg = 'SG',
  SgCf = 'SG_CF',
  Shi = 'SHI',
  ShiLatn = 'SHI_LATN',
  ShiLatnMa = 'SHI_LATN_MA',
  ShiTfng = 'SHI_TFNG',
  ShiTfngMa = 'SHI_TFNG_MA',
  Si = 'SI',
  SiLk = 'SI_LK',
  Sk = 'SK',
  SkSk = 'SK_SK',
  Sl = 'SL',
  SlSi = 'SL_SI',
  Smn = 'SMN',
  SmnFi = 'SMN_FI',
  Sn = 'SN',
  SnZw = 'SN_ZW',
  So = 'SO',
  SoDj = 'SO_DJ',
  SoEt = 'SO_ET',
  SoKe = 'SO_KE',
  SoSo = 'SO_SO',
  Sq = 'SQ',
  SqAl = 'SQ_AL',
  SqMk = 'SQ_MK',
  SqXk = 'SQ_XK',
  Sr = 'SR',
  SrCyrl = 'SR_CYRL',
  SrCyrlBa = 'SR_CYRL_BA',
  SrCyrlMe = 'SR_CYRL_ME',
  SrCyrlRs = 'SR_CYRL_RS',
  SrCyrlXk = 'SR_CYRL_XK',
  SrLatn = 'SR_LATN',
  SrLatnBa = 'SR_LATN_BA',
  SrLatnMe = 'SR_LATN_ME',
  SrLatnRs = 'SR_LATN_RS',
  SrLatnXk = 'SR_LATN_XK',
  Su = 'SU',
  SuLatn = 'SU_LATN',
  SuLatnId = 'SU_LATN_ID',
  Sv = 'SV',
  SvAx = 'SV_AX',
  SvFi = 'SV_FI',
  SvSe = 'SV_SE',
  Sw = 'SW',
  SwCd = 'SW_CD',
  SwKe = 'SW_KE',
  SwTz = 'SW_TZ',
  SwUg = 'SW_UG',
  Ta = 'TA',
  TaIn = 'TA_IN',
  TaLk = 'TA_LK',
  TaMy = 'TA_MY',
  TaSg = 'TA_SG',
  Te = 'TE',
  Teo = 'TEO',
  TeoKe = 'TEO_KE',
  TeoUg = 'TEO_UG',
  TeIn = 'TE_IN',
  Tg = 'TG',
  TgTj = 'TG_TJ',
  Th = 'TH',
  ThTh = 'TH_TH',
  Ti = 'TI',
  TiEr = 'TI_ER',
  TiEt = 'TI_ET',
  Tk = 'TK',
  TkTm = 'TK_TM',
  To = 'TO',
  ToTo = 'TO_TO',
  Tr = 'TR',
  TrCy = 'TR_CY',
  TrTr = 'TR_TR',
  Tt = 'TT',
  TtRu = 'TT_RU',
  Twq = 'TWQ',
  TwqNe = 'TWQ_NE',
  Tzm = 'TZM',
  TzmMa = 'TZM_MA',
  Ug = 'UG',
  UgCn = 'UG_CN',
  Uk = 'UK',
  UkUa = 'UK_UA',
  Ur = 'UR',
  UrIn = 'UR_IN',
  UrPk = 'UR_PK',
  Uz = 'UZ',
  UzArab = 'UZ_ARAB',
  UzArabAf = 'UZ_ARAB_AF',
  UzCyrl = 'UZ_CYRL',
  UzCyrlUz = 'UZ_CYRL_UZ',
  UzLatn = 'UZ_LATN',
  UzLatnUz = 'UZ_LATN_UZ',
  Vai = 'VAI',
  VaiLatn = 'VAI_LATN',
  VaiLatnLr = 'VAI_LATN_LR',
  VaiVaii = 'VAI_VAII',
  VaiVaiiLr = 'VAI_VAII_LR',
  Vi = 'VI',
  ViVn = 'VI_VN',
  Vo = 'VO',
  Vun = 'VUN',
  VunTz = 'VUN_TZ',
  Wae = 'WAE',
  WaeCh = 'WAE_CH',
  Wo = 'WO',
  WoSn = 'WO_SN',
  Xh = 'XH',
  XhZa = 'XH_ZA',
  Xog = 'XOG',
  XogUg = 'XOG_UG',
  Yav = 'YAV',
  YavCm = 'YAV_CM',
  Yi = 'YI',
  Yo = 'YO',
  YoBj = 'YO_BJ',
  YoNg = 'YO_NG',
  Yue = 'YUE',
  YueHans = 'YUE_HANS',
  YueHansCn = 'YUE_HANS_CN',
  YueHant = 'YUE_HANT',
  YueHantHk = 'YUE_HANT_HK',
  Zgh = 'ZGH',
  ZghMa = 'ZGH_MA',
  Zh = 'ZH',
  ZhHans = 'ZH_HANS',
  ZhHansCn = 'ZH_HANS_CN',
  ZhHansHk = 'ZH_HANS_HK',
  ZhHansMo = 'ZH_HANS_MO',
  ZhHansSg = 'ZH_HANS_SG',
  ZhHant = 'ZH_HANT',
  ZhHantHk = 'ZH_HANT_HK',
  ZhHantMo = 'ZH_HANT_MO',
  ZhHantTw = 'ZH_HANT_TW',
  Zu = 'ZU',
  ZuZa = 'ZU_ZA'
}

export type LanguageDisplay = {
  /** ISO 639 representation of the language name. */
  code: LanguageCodeEnum;
  /** Full name of the language. */
  language: Scalars['String'];
};

export type LimitInfo = {
  /** Defines the allowed maximum resource usage, null means unlimited. */
  allowedUsage: Limits;
  /** Defines the current resource usage. */
  currentUsage: Limits;
};

export type Limits = {
  channels?: Maybe<Scalars['Int']>;
  orders?: Maybe<Scalars['Int']>;
  productVariants?: Maybe<Scalars['Int']>;
  staffUsers?: Maybe<Scalars['Int']>;
  warehouses?: Maybe<Scalars['Int']>;
};

/** The manifest definition. */
export type Manifest = {
  about?: Maybe<Scalars['String']>;
  appUrl?: Maybe<Scalars['String']>;
  /**
   * The audience that will be included in all JWT tokens for the app.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  audience?: Maybe<Scalars['String']>;
  /**
   * URL to iframe with the configuration for the app.
   * @deprecated This field will be removed in Saleor 4.0. Use `appUrl` instead.
   */
  configurationUrl?: Maybe<Scalars['String']>;
  /**
   * Description of the data privacy defined for this app.
   * @deprecated This field will be removed in Saleor 4.0. Use `dataPrivacyUrl` instead.
   */
  dataPrivacy?: Maybe<Scalars['String']>;
  dataPrivacyUrl?: Maybe<Scalars['String']>;
  extensions: Array<AppManifestExtension>;
  homepageUrl?: Maybe<Scalars['String']>;
  identifier: Scalars['String'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
  supportUrl?: Maybe<Scalars['String']>;
  tokenTargetUrl?: Maybe<Scalars['String']>;
  version: Scalars['String'];
  /**
   * List of the app's webhooks.
   *
   * Added in Saleor 3.5.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  webhooks: Array<AppManifestWebhook>;
};

export type Margin = {
  start?: Maybe<Scalars['Int']>;
  stop?: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum MeasurementUnitsEnum {
  AcreFt = 'ACRE_FT',
  AcreIn = 'ACRE_IN',
  Cm = 'CM',
  CubicCentimeter = 'CUBIC_CENTIMETER',
  CubicDecimeter = 'CUBIC_DECIMETER',
  CubicFoot = 'CUBIC_FOOT',
  CubicInch = 'CUBIC_INCH',
  CubicMeter = 'CUBIC_METER',
  CubicMillimeter = 'CUBIC_MILLIMETER',
  CubicYard = 'CUBIC_YARD',
  FlOz = 'FL_OZ',
  Ft = 'FT',
  G = 'G',
  Inch = 'INCH',
  Kg = 'KG',
  Km = 'KM',
  Lb = 'LB',
  Liter = 'LITER',
  M = 'M',
  Oz = 'OZ',
  Pint = 'PINT',
  Qt = 'QT',
  SqCm = 'SQ_CM',
  SqFt = 'SQ_FT',
  SqInch = 'SQ_INCH',
  SqKm = 'SQ_KM',
  SqM = 'SQ_M',
  SqYd = 'SQ_YD',
  Tonne = 'TONNE',
  Yd = 'YD'
}

export type MeasurementUnitsEnumFilterInput = {
  /** The value equal to. */
  eq?: InputMaybe<MeasurementUnitsEnum>;
  /** The value included in. */
  oneOf?: InputMaybe<Array<MeasurementUnitsEnum>>;
};

export enum MediaChoicesSortField {
  /** Sort media by ID. */
  Id = 'ID'
}

export type MediaSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort media by the selected field. */
  field: MediaChoicesSortField;
};

/** Represents a single menu - an object that is used to help navigate through the store. */
export type Menu = Node &
  ObjectWithMetadata & {
    id: Scalars['ID'];
    items?: Maybe<Array<MenuItem>>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    slug: Scalars['String'];
  };

/** Represents a single menu - an object that is used to help navigate through the store. */
export type MenuMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a single menu - an object that is used to help navigate through the store. */
export type MenuMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a single menu - an object that is used to help navigate through the store. */
export type MenuPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a single menu - an object that is used to help navigate through the store. */
export type MenuPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Deletes menus.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<MenuError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
};

export type MenuCountableConnection = {
  edges: Array<MenuCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Menu;
};

/**
 * Creates a new Menu.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuCreate = {
  errors: Array<MenuError>;
  menu?: Maybe<Menu>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
};

export type MenuCreateInput = {
  /** List of menu items. */
  items?: InputMaybe<Array<MenuItemInput>>;
  /** Name of the menu. */
  name: Scalars['String'];
  /** Slug of the menu. Will be generated if not provided. */
  slug?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new menu is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The menu the event relates to. */
  menu?: Maybe<Menu>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new menu is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuCreatedMenuArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a menu.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuDelete = {
  errors: Array<MenuError>;
  menu?: Maybe<Menu>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
};

/**
 * Event sent when menu is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The menu the event relates to. */
  menu?: Maybe<Menu>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when menu is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuDeletedMenuArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type MenuError = {
  /** The error code. */
  code: MenuErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum MenuErrorCode {
  CannotAssignNode = 'CANNOT_ASSIGN_NODE',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidMenuItem = 'INVALID_MENU_ITEM',
  NotFound = 'NOT_FOUND',
  NoMenuItemProvided = 'NO_MENU_ITEM_PROVIDED',
  Required = 'REQUIRED',
  TooManyMenuItems = 'TOO_MANY_MENU_ITEMS',
  Unique = 'UNIQUE'
}

export type MenuFilterInput = {
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Array<Scalars['String']>>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};

export type MenuInput = {
  /** Name of the menu. */
  name?: InputMaybe<Scalars['String']>;
  /** Slug of the menu. */
  slug?: InputMaybe<Scalars['String']>;
};

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItem = Node &
  ObjectWithMetadata & {
    category?: Maybe<Category>;
    children?: Maybe<Array<MenuItem>>;
    /** A collection associated with this menu item. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
    collection?: Maybe<Collection>;
    id: Scalars['ID'];
    level: Scalars['Int'];
    menu: Menu;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** A page associated with this menu item. Requires one of the following permissions to include unpublished items: MANAGE_PAGES. */
    page?: Maybe<Page>;
    parent?: Maybe<MenuItem>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** Returns translated menu item fields for the given language code. */
    translation?: Maybe<MenuItemTranslation>;
    /** URL to the menu item. */
    url?: Maybe<Scalars['String']>;
  };

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItemMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItemMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItemPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItemPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItemTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Deletes menu items.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuItemBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<MenuError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
};

export type MenuItemCountableConnection = {
  edges: Array<MenuItemCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuItemCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: MenuItem;
};

/**
 * Creates a new menu item.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuItemCreate = {
  errors: Array<MenuError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

export type MenuItemCreateInput = {
  /** Category to which item points. */
  category?: InputMaybe<Scalars['ID']>;
  /** Collection to which item points. */
  collection?: InputMaybe<Scalars['ID']>;
  /** Menu to which item belongs. */
  menu: Scalars['ID'];
  /** Name of the menu item. */
  name: Scalars['String'];
  /** Page to which item points. */
  page?: InputMaybe<Scalars['ID']>;
  /** ID of the parent menu. If empty, menu will be top level menu. */
  parent?: InputMaybe<Scalars['ID']>;
  /** URL of the pointed item. */
  url?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new menu item is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuItemCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The menu item the event relates to. */
  menuItem?: Maybe<MenuItem>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new menu item is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuItemCreatedMenuItemArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a menu item.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuItemDelete = {
  errors: Array<MenuError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

/**
 * Event sent when menu item is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuItemDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The menu item the event relates to. */
  menuItem?: Maybe<MenuItem>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when menu item is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuItemDeletedMenuItemArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type MenuItemFilterInput = {
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
};

export type MenuItemInput = {
  /** Category to which item points. */
  category?: InputMaybe<Scalars['ID']>;
  /** Collection to which item points. */
  collection?: InputMaybe<Scalars['ID']>;
  /** Name of the menu item. */
  name?: InputMaybe<Scalars['String']>;
  /** Page to which item points. */
  page?: InputMaybe<Scalars['ID']>;
  /** URL of the pointed item. */
  url?: InputMaybe<Scalars['String']>;
};

/**
 * Moves items of menus.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuItemMove = {
  errors: Array<MenuError>;
  /** Assigned menu to move within. */
  menu?: Maybe<Menu>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
};

export type MenuItemMoveInput = {
  /** The menu item ID to move. */
  itemId: Scalars['ID'];
  /** ID of the parent menu. If empty, menu will be top level menu. */
  parentId?: InputMaybe<Scalars['ID']>;
  /** The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export type MenuItemSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort menu items by the selected field. */
  field: MenuItemsSortField;
};

export type MenuItemTranslatableContent = Node & {
  id: Scalars['ID'];
  /**
   * Represents a single item of the related menu. Can store categories, collection or pages.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  menuItem?: Maybe<MenuItem>;
  name: Scalars['String'];
  /** Returns translated menu item fields for the given language code. */
  translation?: Maybe<MenuItemTranslation>;
};

export type MenuItemTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a menu item.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type MenuItemTranslate = {
  errors: Array<TranslationError>;
  menuItem?: Maybe<MenuItem>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type MenuItemTranslation = Node & {
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
};

/**
 * Updates a menu item.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuItemUpdate = {
  errors: Array<MenuError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

/**
 * Event sent when menu item is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuItemUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The menu item the event relates to. */
  menuItem?: Maybe<MenuItem>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when menu item is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuItemUpdatedMenuItemArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export enum MenuItemsSortField {
  /** Sort menu items by name. */
  Name = 'NAME'
}

export enum MenuSortField {
  /** Sort menus by items count. */
  ItemsCount = 'ITEMS_COUNT',
  /** Sort menus by name. */
  Name = 'NAME'
}

export type MenuSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort menus by the selected field. */
  field: MenuSortField;
};

/**
 * Updates a menu.
 *
 * Requires one of the following permissions: MANAGE_MENUS.
 */
export type MenuUpdate = {
  errors: Array<MenuError>;
  menu?: Maybe<Menu>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  menuErrors: Array<MenuError>;
};

/**
 * Event sent when menu is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The menu the event relates to. */
  menu?: Maybe<Menu>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when menu is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type MenuUpdatedMenuArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type MetadataError = {
  /** The error code. */
  code: MetadataErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum MetadataErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  NotUpdated = 'NOT_UPDATED',
  Required = 'REQUIRED'
}

export type MetadataFilter = {
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value?: InputMaybe<Scalars['String']>;
};

export type MetadataInput = {
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

export type MetadataItem = {
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

/** Represents amount of money in specific currency. */
export type Money = {
  /** Amount of money. */
  amount: Scalars['Float'];
  /** Currency code. */
  currency: Scalars['String'];
};

export type MoneyInput = {
  /** Amount of money. */
  amount: Scalars['PositiveDecimal'];
  /** Currency code. */
  currency: Scalars['String'];
};

/** Represents a range of amounts of money. */
export type MoneyRange = {
  /** Lower bound of a price range. */
  start?: Maybe<Money>;
  /** Upper bound of a price range. */
  stop?: Maybe<Money>;
};

export type MoveProductInput = {
  /** The ID of the product to move. */
  productId: Scalars['ID'];
  /** The relative sorting position of the product (from -inf to +inf) starting from the first given product's actual position.1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  /**
   * Create a new address for the customer.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  accountAddressCreate?: Maybe<AccountAddressCreate>;
  /** Delete an address of the logged-in user. Requires one of the following permissions: MANAGE_USERS, IS_OWNER. */
  accountAddressDelete?: Maybe<AccountAddressDelete>;
  /** Updates an address of the logged-in user. Requires one of the following permissions: MANAGE_USERS, IS_OWNER. */
  accountAddressUpdate?: Maybe<AccountAddressUpdate>;
  /**
   * Remove user account.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  accountDelete?: Maybe<AccountDelete>;
  /** Register a new user. */
  accountRegister?: Maybe<AccountRegister>;
  /**
   * Sends an email with the account removal link for the logged-in user.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  accountRequestDeletion?: Maybe<AccountRequestDeletion>;
  /**
   * Sets a default address for the authenticated user.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  accountSetDefaultAddress?: Maybe<AccountSetDefaultAddress>;
  /**
   * Updates the account of the logged-in user.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  accountUpdate?: Maybe<AccountUpdate>;
  /**
   * Creates user address.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  addressCreate?: Maybe<AddressCreate>;
  /**
   * Deletes an address.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  addressDelete?: Maybe<AddressDelete>;
  /**
   * Sets a default address for the given user.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  addressSetDefault?: Maybe<AddressSetDefault>;
  /**
   * Updates an address.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  addressUpdate?: Maybe<AddressUpdate>;
  /**
   * Activate the app.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appActivate?: Maybe<AppActivate>;
  /** Creates a new app. Requires the following permissions: AUTHENTICATED_STAFF_USER and MANAGE_APPS. */
  appCreate?: Maybe<AppCreate>;
  /**
   * Deactivate the app.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appDeactivate?: Maybe<AppDeactivate>;
  /**
   * Deletes an app.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appDelete?: Maybe<AppDelete>;
  /**
   * Delete failed installation.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appDeleteFailedInstallation?: Maybe<AppDeleteFailedInstallation>;
  /**
   * Fetch and validate manifest.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appFetchManifest?: Maybe<AppFetchManifest>;
  /** Install new app by using app manifest. Requires the following permissions: AUTHENTICATED_STAFF_USER and MANAGE_APPS. */
  appInstall?: Maybe<AppInstall>;
  /**
   * Retry failed installation of new app.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appRetryInstall?: Maybe<AppRetryInstall>;
  /**
   * Creates a new token.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appTokenCreate?: Maybe<AppTokenCreate>;
  /**
   * Deletes an authentication token assigned to app.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appTokenDelete?: Maybe<AppTokenDelete>;
  /** Verify provided app token. */
  appTokenVerify?: Maybe<AppTokenVerify>;
  /**
   * Updates an existing app.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appUpdate?: Maybe<AppUpdate>;
  /**
   * Assigns storefront's navigation menus.
   *
   * Requires one of the following permissions: MANAGE_MENUS, MANAGE_SETTINGS.
   */
  assignNavigation?: Maybe<AssignNavigation>;
  /**
   * Add shipping zone to given warehouse.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  assignWarehouseShippingZone?: Maybe<WarehouseShippingZoneAssign>;
  /**
   * Deletes attributes.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  attributeBulkDelete?: Maybe<AttributeBulkDelete>;
  /** Creates an attribute. */
  attributeCreate?: Maybe<AttributeCreate>;
  /**
   * Deletes an attribute.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  attributeDelete?: Maybe<AttributeDelete>;
  /**
   * Reorder the values of an attribute.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  attributeReorderValues?: Maybe<AttributeReorderValues>;
  /**
   * Creates/updates translations for an attribute.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  attributeTranslate?: Maybe<AttributeTranslate>;
  /**
   * Updates attribute.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  attributeUpdate?: Maybe<AttributeUpdate>;
  /**
   * Deletes values of attributes.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  attributeValueBulkDelete?: Maybe<AttributeValueBulkDelete>;
  /**
   * Creates a value for an attribute.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  attributeValueCreate?: Maybe<AttributeValueCreate>;
  /**
   * Deletes a value of an attribute.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  attributeValueDelete?: Maybe<AttributeValueDelete>;
  /**
   * Creates/updates translations for an attribute value.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  attributeValueTranslate?: Maybe<AttributeValueTranslate>;
  /**
   * Updates value of an attribute.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  attributeValueUpdate?: Maybe<AttributeValueUpdate>;
  /**
   * Deletes categories.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  categoryBulkDelete?: Maybe<CategoryBulkDelete>;
  /**
   * Creates a new category.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  categoryCreate?: Maybe<CategoryCreate>;
  /**
   * Deletes a category.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  categoryDelete?: Maybe<CategoryDelete>;
  /**
   * Creates/updates translations for a category.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  categoryTranslate?: Maybe<CategoryTranslate>;
  /**
   * Updates a category.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  categoryUpdate?: Maybe<CategoryUpdate>;
  /**
   * Activate a channel.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS.
   */
  channelActivate?: Maybe<ChannelActivate>;
  /**
   * Creates new channel.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS.
   */
  channelCreate?: Maybe<ChannelCreate>;
  /**
   * Deactivate a channel.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS.
   */
  channelDeactivate?: Maybe<ChannelDeactivate>;
  /**
   * Delete a channel. Orders associated with the deleted channel will be moved to the target channel. Checkouts, product availability, and pricing will be removed.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS.
   */
  channelDelete?: Maybe<ChannelDelete>;
  /**
   * Reorder the warehouses of a channel.
   *
   * Added in Saleor 3.7.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS.
   */
  channelReorderWarehouses?: Maybe<ChannelReorderWarehouses>;
  /**
   * Update a channel.
   *
   * Requires one of the following permissions: MANAGE_CHANNELS.
   * Requires one of the following permissions when updating only orderSettings field: MANAGE_CHANNELS, MANAGE_ORDERS.
   */
  channelUpdate?: Maybe<ChannelUpdate>;
  /** Adds a gift card or a voucher to a checkout. */
  checkoutAddPromoCode?: Maybe<CheckoutAddPromoCode>;
  /** Update billing address in the existing checkout. */
  checkoutBillingAddressUpdate?: Maybe<CheckoutBillingAddressUpdate>;
  /** Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation. */
  checkoutComplete?: Maybe<CheckoutComplete>;
  /** Create a new checkout. */
  checkoutCreate?: Maybe<CheckoutCreate>;
  /**
   * Sets the customer as the owner of the checkout.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_USER.
   */
  checkoutCustomerAttach?: Maybe<CheckoutCustomerAttach>;
  /**
   * Removes the user assigned as the owner of the checkout.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_USER.
   */
  checkoutCustomerDetach?: Maybe<CheckoutCustomerDetach>;
  /**
   * Updates the delivery method (shipping method or pick up point) of the checkout.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  checkoutDeliveryMethodUpdate?: Maybe<CheckoutDeliveryMethodUpdate>;
  /** Updates email address in the existing checkout object. */
  checkoutEmailUpdate?: Maybe<CheckoutEmailUpdate>;
  /** Update language code in the existing checkout. */
  checkoutLanguageCodeUpdate?: Maybe<CheckoutLanguageCodeUpdate>;
  /**
   * Deletes a CheckoutLine.
   * @deprecated This field will be removed in Saleor 4.0. Use `checkoutLinesDelete` instead.
   */
  checkoutLineDelete?: Maybe<CheckoutLineDelete>;
  /** Adds a checkout line to the existing checkout.If line was already in checkout, its quantity will be increased. */
  checkoutLinesAdd?: Maybe<CheckoutLinesAdd>;
  /** Deletes checkout lines. */
  checkoutLinesDelete?: Maybe<CheckoutLinesDelete>;
  /** Updates checkout line in the existing checkout. */
  checkoutLinesUpdate?: Maybe<CheckoutLinesUpdate>;
  /** Create a new payment for given checkout. */
  checkoutPaymentCreate?: Maybe<CheckoutPaymentCreate>;
  /** Remove a gift card or a voucher from a checkout. */
  checkoutRemovePromoCode?: Maybe<CheckoutRemovePromoCode>;
  /** Update shipping address in the existing checkout. */
  checkoutShippingAddressUpdate?: Maybe<CheckoutShippingAddressUpdate>;
  /**
   * Updates the shipping method of the checkout.
   * @deprecated This field will be removed in Saleor 4.0. Use `checkoutDeliveryMethodUpdate` instead.
   */
  checkoutShippingMethodUpdate?: Maybe<CheckoutShippingMethodUpdate>;
  /**
   * Adds products to a collection.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionAddProducts?: Maybe<CollectionAddProducts>;
  /**
   * Deletes collections.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionBulkDelete?: Maybe<CollectionBulkDelete>;
  /**
   * Manage collection's availability in channels.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionChannelListingUpdate?: Maybe<CollectionChannelListingUpdate>;
  /**
   * Creates a new collection.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionCreate?: Maybe<CollectionCreate>;
  /**
   * Deletes a collection.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionDelete?: Maybe<CollectionDelete>;
  /**
   * Remove products from a collection.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionRemoveProducts?: Maybe<CollectionRemoveProducts>;
  /**
   * Reorder the products of a collection.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionReorderProducts?: Maybe<CollectionReorderProducts>;
  /**
   * Creates/updates translations for a collection.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  collectionTranslate?: Maybe<CollectionTranslate>;
  /**
   * Updates a collection.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  collectionUpdate?: Maybe<CollectionUpdate>;
  /** Confirm user account with token sent by email during registration. */
  confirmAccount?: Maybe<ConfirmAccount>;
  /**
   * Confirm the email change of the logged-in user.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  confirmEmailChange?: Maybe<ConfirmEmailChange>;
  /**
   * Creates new warehouse.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  createWarehouse?: Maybe<WarehouseCreate>;
  /**
   * Deletes customers.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  customerBulkDelete?: Maybe<CustomerBulkDelete>;
  /**
   * Creates a new customer.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  customerCreate?: Maybe<CustomerCreate>;
  /**
   * Deletes a customer.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  customerDelete?: Maybe<CustomerDelete>;
  /**
   * Updates an existing customer.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  customerUpdate?: Maybe<CustomerUpdate>;
  /** Delete metadata of an object. To use it, you need to have access to the modified object. */
  deleteMetadata?: Maybe<DeleteMetadata>;
  /** Delete object's private metadata. To use it, you need to be an authenticated staff user or an app and have access to the modified object. */
  deletePrivateMetadata?: Maybe<DeletePrivateMetadata>;
  /**
   * Deletes selected warehouse.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  deleteWarehouse?: Maybe<WarehouseDelete>;
  /**
   * Create new digital content. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  digitalContentCreate?: Maybe<DigitalContentCreate>;
  /**
   * Remove digital content assigned to given variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  digitalContentDelete?: Maybe<DigitalContentDelete>;
  /**
   * Update digital content.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  digitalContentUpdate?: Maybe<DigitalContentUpdate>;
  /**
   * Generate new URL to digital content.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  digitalContentUrlCreate?: Maybe<DigitalContentUrlCreate>;
  /**
   * Deletes draft orders.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  draftOrderBulkDelete?: Maybe<DraftOrderBulkDelete>;
  /**
   * Completes creating an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  draftOrderComplete?: Maybe<DraftOrderComplete>;
  /**
   * Creates a new draft order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  draftOrderCreate?: Maybe<DraftOrderCreate>;
  /**
   * Deletes a draft order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  draftOrderDelete?: Maybe<DraftOrderDelete>;
  /**
   * Deletes order lines.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   * @deprecated This field will be removed in Saleor 4.0.
   */
  draftOrderLinesBulkDelete?: Maybe<DraftOrderLinesBulkDelete>;
  /**
   * Updates a draft order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  draftOrderUpdate?: Maybe<DraftOrderUpdate>;
  /**
   * Retries event delivery.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  eventDeliveryRetry?: Maybe<EventDeliveryRetry>;
  /**
   * Export gift cards to csv file.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  exportGiftCards?: Maybe<ExportGiftCards>;
  /**
   * Export products to csv file.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  exportProducts?: Maybe<ExportProducts>;
  /** Prepare external authentication url for user by custom plugin. */
  externalAuthenticationUrl?: Maybe<ExternalAuthenticationUrl>;
  /** Logout user by custom plugin. */
  externalLogout?: Maybe<ExternalLogout>;
  /**
   * Trigger sending a notification with the notify plugin method. Serializes nodes provided as ids parameter and includes this data in the notification payload.
   *
   * Added in Saleor 3.1.
   */
  externalNotificationTrigger?: Maybe<ExternalNotificationTrigger>;
  /** Obtain external access tokens for user by custom plugin. */
  externalObtainAccessTokens?: Maybe<ExternalObtainAccessTokens>;
  /** Refresh user's access by custom plugin. */
  externalRefresh?: Maybe<ExternalRefresh>;
  /** Verify external authentication data by plugin. */
  externalVerify?: Maybe<ExternalVerify>;
  /**
   * Upload a file. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  fileUpload?: Maybe<FileUpload>;
  /**
   * Activate a gift card.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardActivate?: Maybe<GiftCardActivate>;
  /**
   * Adds note to the gift card.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardAddNote?: Maybe<GiftCardAddNote>;
  /**
   * Activate gift cards.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardBulkActivate?: Maybe<GiftCardBulkActivate>;
  /**
   * Create gift cards.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardBulkCreate?: Maybe<GiftCardBulkCreate>;
  /**
   * Deactivate gift cards.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardBulkDeactivate?: Maybe<GiftCardBulkDeactivate>;
  /**
   * Delete gift cards.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardBulkDelete?: Maybe<GiftCardBulkDelete>;
  /**
   * Creates a new gift card.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardCreate?: Maybe<GiftCardCreate>;
  /**
   * Deactivate a gift card.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardDeactivate?: Maybe<GiftCardDeactivate>;
  /**
   * Delete gift card.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardDelete?: Maybe<GiftCardDelete>;
  /**
   * Resend a gift card.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardResend?: Maybe<GiftCardResend>;
  /**
   * Update gift card settings.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardSettingsUpdate?: Maybe<GiftCardSettingsUpdate>;
  /**
   * Update a gift card.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardUpdate?: Maybe<GiftCardUpdate>;
  /**
   * Creates a ready to send invoice.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  invoiceCreate?: Maybe<InvoiceCreate>;
  /**
   * Deletes an invoice.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  invoiceDelete?: Maybe<InvoiceDelete>;
  /**
   * Request an invoice for the order using plugin.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  invoiceRequest?: Maybe<InvoiceRequest>;
  /**
   * Requests deletion of an invoice.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  invoiceRequestDelete?: Maybe<InvoiceRequestDelete>;
  /**
   * Send an invoice notification to the customer.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  invoiceSendNotification?: Maybe<InvoiceSendNotification>;
  /**
   * Updates an invoice.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  invoiceUpdate?: Maybe<InvoiceUpdate>;
  /**
   * Deletes menus.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuBulkDelete?: Maybe<MenuBulkDelete>;
  /**
   * Creates a new Menu.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuCreate?: Maybe<MenuCreate>;
  /**
   * Deletes a menu.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuDelete?: Maybe<MenuDelete>;
  /**
   * Deletes menu items.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuItemBulkDelete?: Maybe<MenuItemBulkDelete>;
  /**
   * Creates a new menu item.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuItemCreate?: Maybe<MenuItemCreate>;
  /**
   * Deletes a menu item.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuItemDelete?: Maybe<MenuItemDelete>;
  /**
   * Moves items of menus.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuItemMove?: Maybe<MenuItemMove>;
  /**
   * Creates/updates translations for a menu item.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  menuItemTranslate?: Maybe<MenuItemTranslate>;
  /**
   * Updates a menu item.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuItemUpdate?: Maybe<MenuItemUpdate>;
  /**
   * Updates a menu.
   *
   * Requires one of the following permissions: MANAGE_MENUS.
   */
  menuUpdate?: Maybe<MenuUpdate>;
  /**
   * Adds note to the order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderAddNote?: Maybe<OrderAddNote>;
  /**
   * Cancels orders.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderBulkCancel?: Maybe<OrderBulkCancel>;
  /**
   * Cancel an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderCancel?: Maybe<OrderCancel>;
  /**
   * Capture an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderCapture?: Maybe<OrderCapture>;
  /**
   * Confirms an unconfirmed order by changing status to unfulfilled.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderConfirm?: Maybe<OrderConfirm>;
  /**
   * Create new order from existing checkout. Requires the following permissions: AUTHENTICATED_APP and HANDLE_CHECKOUTS.
   *
   * Added in Saleor 3.2.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  orderCreateFromCheckout?: Maybe<OrderCreateFromCheckout>;
  /**
   * Adds discount to the order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderDiscountAdd?: Maybe<OrderDiscountAdd>;
  /**
   * Remove discount from the order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderDiscountDelete?: Maybe<OrderDiscountDelete>;
  /**
   * Update discount for the order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderDiscountUpdate?: Maybe<OrderDiscountUpdate>;
  /**
   * Creates new fulfillments for an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderFulfill?: Maybe<OrderFulfill>;
  /**
   * Approve existing fulfillment.
   *
   * Added in Saleor 3.1.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderFulfillmentApprove?: Maybe<FulfillmentApprove>;
  /**
   * Cancels existing fulfillment and optionally restocks items.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderFulfillmentCancel?: Maybe<FulfillmentCancel>;
  /**
   * Refund products.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderFulfillmentRefundProducts?: Maybe<FulfillmentRefundProducts>;
  /**
   * Return products.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderFulfillmentReturnProducts?: Maybe<FulfillmentReturnProducts>;
  /**
   * Updates a fulfillment for an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderFulfillmentUpdateTracking?: Maybe<FulfillmentUpdateTracking>;
  /**
   * Deletes an order line from an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderLineDelete?: Maybe<OrderLineDelete>;
  /**
   * Remove discount applied to the order line.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderLineDiscountRemove?: Maybe<OrderLineDiscountRemove>;
  /**
   * Update discount for the order line.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderLineDiscountUpdate?: Maybe<OrderLineDiscountUpdate>;
  /**
   * Updates an order line of an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderLineUpdate?: Maybe<OrderLineUpdate>;
  /**
   * Create order lines for an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderLinesCreate?: Maybe<OrderLinesCreate>;
  /**
   * Mark order as manually paid.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderMarkAsPaid?: Maybe<OrderMarkAsPaid>;
  /**
   * Refund an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderRefund?: Maybe<OrderRefund>;
  /**
   * Update shop order settings across all channels. Returns `orderSettings` for the first `channel` in alphabetical order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   * @deprecated
   *
   * DEPRECATED: this mutation will be removed in Saleor 4.0. Use `channelUpdate` mutation instead.
   */
  orderSettingsUpdate?: Maybe<OrderSettingsUpdate>;
  /**
   * Updates an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderUpdate?: Maybe<OrderUpdate>;
  /**
   * Updates a shipping method of the order. Requires shipping method ID to update, when null is passed then currently assigned shipping method is removed.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderUpdateShipping?: Maybe<OrderUpdateShipping>;
  /**
   * Void an order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orderVoid?: Maybe<OrderVoid>;
  /**
   * Assign attributes to a given page type.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  pageAttributeAssign?: Maybe<PageAttributeAssign>;
  /**
   * Unassign attributes from a given page type.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  pageAttributeUnassign?: Maybe<PageAttributeUnassign>;
  /**
   * Deletes pages.
   *
   * Requires one of the following permissions: MANAGE_PAGES.
   */
  pageBulkDelete?: Maybe<PageBulkDelete>;
  /**
   * Publish pages.
   *
   * Requires one of the following permissions: MANAGE_PAGES.
   */
  pageBulkPublish?: Maybe<PageBulkPublish>;
  /**
   * Creates a new page.
   *
   * Requires one of the following permissions: MANAGE_PAGES.
   */
  pageCreate?: Maybe<PageCreate>;
  /**
   * Deletes a page.
   *
   * Requires one of the following permissions: MANAGE_PAGES.
   */
  pageDelete?: Maybe<PageDelete>;
  /**
   * Reorder page attribute values.
   *
   * Requires one of the following permissions: MANAGE_PAGES.
   */
  pageReorderAttributeValues?: Maybe<PageReorderAttributeValues>;
  /**
   * Creates/updates translations for a page.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  pageTranslate?: Maybe<PageTranslate>;
  /**
   * Delete page types.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  pageTypeBulkDelete?: Maybe<PageTypeBulkDelete>;
  /**
   * Create a new page type.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  pageTypeCreate?: Maybe<PageTypeCreate>;
  /**
   * Delete a page type.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  pageTypeDelete?: Maybe<PageTypeDelete>;
  /**
   * Reorder the attributes of a page type.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  pageTypeReorderAttributes?: Maybe<PageTypeReorderAttributes>;
  /**
   * Update page type.
   *
   * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
   */
  pageTypeUpdate?: Maybe<PageTypeUpdate>;
  /**
   * Updates an existing page.
   *
   * Requires one of the following permissions: MANAGE_PAGES.
   */
  pageUpdate?: Maybe<PageUpdate>;
  /**
   * Change the password of the logged in user.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  passwordChange?: Maybe<PasswordChange>;
  /**
   * Captures the authorized payment amount.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  paymentCapture?: Maybe<PaymentCapture>;
  /** Check payment balance. */
  paymentCheckBalance?: Maybe<PaymentCheckBalance>;
  /** Initializes payment process when it is required by gateway. */
  paymentInitialize?: Maybe<PaymentInitialize>;
  /**
   * Refunds the captured payment amount.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  paymentRefund?: Maybe<PaymentRefund>;
  /**
   * Voids the authorized payment.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  paymentVoid?: Maybe<PaymentVoid>;
  /**
   * Create new permission group. Apps are not allowed to perform this mutation.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  permissionGroupCreate?: Maybe<PermissionGroupCreate>;
  /**
   * Delete permission group. Apps are not allowed to perform this mutation.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  permissionGroupDelete?: Maybe<PermissionGroupDelete>;
  /**
   * Update permission group. Apps are not allowed to perform this mutation.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  permissionGroupUpdate?: Maybe<PermissionGroupUpdate>;
  /**
   * Update plugin configuration.
   *
   * Requires one of the following permissions: MANAGE_PLUGINS.
   */
  pluginUpdate?: Maybe<PluginUpdate>;
  /**
   * Assign attributes to a given product type.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productAttributeAssign?: Maybe<ProductAttributeAssign>;
  /**
   * Update attributes assigned to product variant for given product type.
   *
   * Added in Saleor 3.1.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productAttributeAssignmentUpdate?: Maybe<ProductAttributeAssignmentUpdate>;
  /**
   * Un-assign attributes from a given product type.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productAttributeUnassign?: Maybe<ProductAttributeUnassign>;
  /**
   * Deletes products.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productBulkDelete?: Maybe<ProductBulkDelete>;
  /**
   * Manage product's availability in channels.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productChannelListingUpdate?: Maybe<ProductChannelListingUpdate>;
  /**
   * Creates a new product.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productCreate?: Maybe<ProductCreate>;
  /**
   * Deletes a product.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productDelete?: Maybe<ProductDelete>;
  /**
   * Deletes product media.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productMediaBulkDelete?: Maybe<ProductMediaBulkDelete>;
  /**
   * Create a media object (image or video URL) associated with product. For image, this mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productMediaCreate?: Maybe<ProductMediaCreate>;
  /**
   * Deletes a product media.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productMediaDelete?: Maybe<ProductMediaDelete>;
  /**
   * Changes ordering of the product media.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productMediaReorder?: Maybe<ProductMediaReorder>;
  /**
   * Updates a product media.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productMediaUpdate?: Maybe<ProductMediaUpdate>;
  /**
   * Reorder product attribute values.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productReorderAttributeValues?: Maybe<ProductReorderAttributeValues>;
  /**
   * Creates/updates translations for a product.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  productTranslate?: Maybe<ProductTranslate>;
  /**
   * Deletes product types.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productTypeBulkDelete?: Maybe<ProductTypeBulkDelete>;
  /**
   * Creates a new product type.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productTypeCreate?: Maybe<ProductTypeCreate>;
  /**
   * Deletes a product type.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productTypeDelete?: Maybe<ProductTypeDelete>;
  /**
   * Reorder the attributes of a product type.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productTypeReorderAttributes?: Maybe<ProductTypeReorderAttributes>;
  /**
   * Updates an existing product type.
   *
   * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
   */
  productTypeUpdate?: Maybe<ProductTypeUpdate>;
  /**
   * Updates an existing product.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productUpdate?: Maybe<ProductUpdate>;
  /**
   * Creates product variants for a given product.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantBulkCreate?: Maybe<ProductVariantBulkCreate>;
  /**
   * Deletes product variants.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantBulkDelete?: Maybe<ProductVariantBulkDelete>;
  /**
   * Update multiple product variants.
   *
   * Added in Saleor 3.11.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantBulkUpdate?: Maybe<ProductVariantBulkUpdate>;
  /**
   * Manage product variant prices in channels.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantChannelListingUpdate?: Maybe<ProductVariantChannelListingUpdate>;
  /**
   * Creates a new variant for a product.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantCreate?: Maybe<ProductVariantCreate>;
  /**
   * Deletes a product variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantDelete?: Maybe<ProductVariantDelete>;
  /**
   * Deactivates product variant preorder. It changes all preorder allocation into regular allocation.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantPreorderDeactivate?: Maybe<ProductVariantPreorderDeactivate>;
  /**
   * Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantReorder?: Maybe<ProductVariantReorder>;
  /**
   * Reorder product variant attribute values.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantReorderAttributeValues?: Maybe<ProductVariantReorderAttributeValues>;
  /**
   * Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantSetDefault?: Maybe<ProductVariantSetDefault>;
  /**
   * Creates stocks for product variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantStocksCreate?: Maybe<ProductVariantStocksCreate>;
  /**
   * Delete stocks from product variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantStocksDelete?: Maybe<ProductVariantStocksDelete>;
  /**
   * Update stocks for product variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantStocksUpdate?: Maybe<ProductVariantStocksUpdate>;
  /**
   * Creates/updates translations for a product variant.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  productVariantTranslate?: Maybe<ProductVariantTranslate>;
  /**
   * Updates an existing variant for product.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  productVariantUpdate?: Maybe<ProductVariantUpdate>;
  /**
   * Request email change of the logged in user.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  requestEmailChange?: Maybe<RequestEmailChange>;
  /** Sends an email with the account password modification link. */
  requestPasswordReset?: Maybe<RequestPasswordReset>;
  /**
   * Deletes sales.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  saleBulkDelete?: Maybe<SaleBulkDelete>;
  /**
   * Adds products, categories, collections to a voucher.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  saleCataloguesAdd?: Maybe<SaleAddCatalogues>;
  /**
   * Removes products, categories, collections from a sale.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  saleCataloguesRemove?: Maybe<SaleRemoveCatalogues>;
  /**
   * Manage sale's availability in channels.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  saleChannelListingUpdate?: Maybe<SaleChannelListingUpdate>;
  /**
   * Creates a new sale.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  saleCreate?: Maybe<SaleCreate>;
  /**
   * Deletes a sale.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  saleDelete?: Maybe<SaleDelete>;
  /**
   * Creates/updates translations for a sale.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  saleTranslate?: Maybe<SaleTranslate>;
  /**
   * Updates a sale.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  saleUpdate?: Maybe<SaleUpdate>;
  /** Sets the user's password from the token sent by email using the RequestPasswordReset mutation. */
  setPassword?: Maybe<SetPassword>;
  /**
   * Manage shipping method's availability in channels.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingMethodChannelListingUpdate?: Maybe<ShippingMethodChannelListingUpdate>;
  /**
   * Deletes shipping prices.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingPriceBulkDelete?: Maybe<ShippingPriceBulkDelete>;
  /**
   * Creates a new shipping price.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingPriceCreate?: Maybe<ShippingPriceCreate>;
  /**
   * Deletes a shipping price.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingPriceDelete?: Maybe<ShippingPriceDelete>;
  /**
   * Exclude products from shipping price.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingPriceExcludeProducts?: Maybe<ShippingPriceExcludeProducts>;
  /**
   * Remove product from excluded list for shipping price.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingPriceRemoveProductFromExclude?: Maybe<ShippingPriceRemoveProductFromExclude>;
  /**
   * Creates/updates translations for a shipping method.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  shippingPriceTranslate?: Maybe<ShippingPriceTranslate>;
  /**
   * Updates a new shipping price.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingPriceUpdate?: Maybe<ShippingPriceUpdate>;
  /**
   * Deletes shipping zones.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingZoneBulkDelete?: Maybe<ShippingZoneBulkDelete>;
  /**
   * Creates a new shipping zone.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingZoneCreate?: Maybe<ShippingZoneCreate>;
  /**
   * Deletes a shipping zone.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingZoneDelete?: Maybe<ShippingZoneDelete>;
  /**
   * Updates a new shipping zone.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingZoneUpdate?: Maybe<ShippingZoneUpdate>;
  /**
   * Update the shop's address. If the `null` value is passed, the currently selected address will be deleted.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  shopAddressUpdate?: Maybe<ShopAddressUpdate>;
  /**
   * Updates site domain of the shop.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  shopDomainUpdate?: Maybe<ShopDomainUpdate>;
  /**
   * Fetch tax rates.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   * @deprecated
   *
   * DEPRECATED: this mutation will be removed in Saleor 4.0.
   */
  shopFetchTaxRates?: Maybe<ShopFetchTaxRates>;
  /**
   * Creates/updates translations for shop settings.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  shopSettingsTranslate?: Maybe<ShopSettingsTranslate>;
  /**
   * Updates shop settings.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  shopSettingsUpdate?: Maybe<ShopSettingsUpdate>;
  /**
   * Deletes staff users. Apps are not allowed to perform this mutation.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  staffBulkDelete?: Maybe<StaffBulkDelete>;
  /**
   * Creates a new staff user. Apps are not allowed to perform this mutation.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  staffCreate?: Maybe<StaffCreate>;
  /**
   * Deletes a staff user. Apps are not allowed to perform this mutation.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  staffDelete?: Maybe<StaffDelete>;
  /**
   * Creates a new staff notification recipient.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  staffNotificationRecipientCreate?: Maybe<StaffNotificationRecipientCreate>;
  /**
   * Delete staff notification recipient.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  staffNotificationRecipientDelete?: Maybe<StaffNotificationRecipientDelete>;
  /**
   * Updates a staff notification recipient.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  staffNotificationRecipientUpdate?: Maybe<StaffNotificationRecipientUpdate>;
  /**
   * Updates an existing staff user. Apps are not allowed to perform this mutation.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  staffUpdate?: Maybe<StaffUpdate>;
  /**
   * Create a tax class.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_TAXES.
   */
  taxClassCreate?: Maybe<TaxClassCreate>;
  /**
   * Delete a tax class. After deleting the tax class any products, product types or shipping methods using it are updated to use the default tax class.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_TAXES.
   */
  taxClassDelete?: Maybe<TaxClassDelete>;
  /**
   * Update a tax class.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_TAXES.
   */
  taxClassUpdate?: Maybe<TaxClassUpdate>;
  /**
   * Update tax configuration for a channel.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_TAXES.
   */
  taxConfigurationUpdate?: Maybe<TaxConfigurationUpdate>;
  /**
   * Remove all tax class rates for a specific country.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_TAXES.
   */
  taxCountryConfigurationDelete?: Maybe<TaxCountryConfigurationDelete>;
  /**
   * Update tax class rates for a specific country.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_TAXES.
   */
  taxCountryConfigurationUpdate?: Maybe<TaxCountryConfigurationUpdate>;
  /**
   * Exempt checkout or order from charging the taxes. When tax exemption is enabled, taxes won't be charged for the checkout or order. Taxes may still be calculated in cases when product prices are entered with the tax included and the net price needs to be known.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_TAXES.
   */
  taxExemptionManage?: Maybe<TaxExemptionManage>;
  /** Create JWT token. */
  tokenCreate?: Maybe<CreateToken>;
  /** Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie. */
  tokenRefresh?: Maybe<RefreshToken>;
  /** Verify JWT token. */
  tokenVerify?: Maybe<VerifyToken>;
  /**
   * Deactivate all JWT tokens of the currently authenticated user.
   *
   * Requires one of the following permissions: AUTHENTICATED_USER.
   */
  tokensDeactivateAll?: Maybe<DeactivateAllUserTokens>;
  /**
   * Create transaction for checkout or order. Requires the following permissions: AUTHENTICATED_APP and HANDLE_PAYMENTS.
   *
   * Added in Saleor 3.4.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  transactionCreate?: Maybe<TransactionCreate>;
  /**
   * Request an action for payment transaction.
   *
   * Added in Saleor 3.4.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: HANDLE_PAYMENTS, MANAGE_ORDERS.
   */
  transactionRequestAction?: Maybe<TransactionRequestAction>;
  /**
   * Create transaction for checkout or order. Requires the following permissions: AUTHENTICATED_APP and HANDLE_PAYMENTS.
   *
   * Added in Saleor 3.4.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  transactionUpdate?: Maybe<TransactionUpdate>;
  /**
   * Remove shipping zone from given warehouse.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  unassignWarehouseShippingZone?: Maybe<WarehouseShippingZoneUnassign>;
  /** Updates metadata of an object. To use it, you need to have access to the modified object. */
  updateMetadata?: Maybe<UpdateMetadata>;
  /** Updates private metadata of an object. To use it, you need to be an authenticated staff user or an app and have access to the modified object. */
  updatePrivateMetadata?: Maybe<UpdatePrivateMetadata>;
  /**
   * Updates given warehouse.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  updateWarehouse?: Maybe<WarehouseUpdate>;
  /**
   * Deletes a user avatar. Only for staff members.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
   */
  userAvatarDelete?: Maybe<UserAvatarDelete>;
  /**
   * Create a user avatar. Only for staff members. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
   */
  userAvatarUpdate?: Maybe<UserAvatarUpdate>;
  /**
   * Activate or deactivate users.
   *
   * Requires one of the following permissions: MANAGE_USERS.
   */
  userBulkSetActive?: Maybe<UserBulkSetActive>;
  /**
   * Assign an media to a product variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  variantMediaAssign?: Maybe<VariantMediaAssign>;
  /**
   * Unassign an media from a product variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  variantMediaUnassign?: Maybe<VariantMediaUnassign>;
  /**
   * Deletes vouchers.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucherBulkDelete?: Maybe<VoucherBulkDelete>;
  /**
   * Adds products, categories, collections to a voucher.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucherCataloguesAdd?: Maybe<VoucherAddCatalogues>;
  /**
   * Removes products, categories, collections from a voucher.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucherCataloguesRemove?: Maybe<VoucherRemoveCatalogues>;
  /**
   * Manage voucher's availability in channels.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucherChannelListingUpdate?: Maybe<VoucherChannelListingUpdate>;
  /**
   * Creates a new voucher.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucherCreate?: Maybe<VoucherCreate>;
  /**
   * Deletes a voucher.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucherDelete?: Maybe<VoucherDelete>;
  /**
   * Creates/updates translations for a voucher.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  voucherTranslate?: Maybe<VoucherTranslate>;
  /**
   * Updates a voucher.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucherUpdate?: Maybe<VoucherUpdate>;
  /**
   * Creates a new webhook subscription.
   *
   * Requires one of the following permissions: MANAGE_APPS, AUTHENTICATED_APP.
   */
  webhookCreate?: Maybe<WebhookCreate>;
  /**
   * Delete a webhook. Before the deletion, the webhook is deactivated to pause any deliveries that are already scheduled. The deletion might fail if delivery is in progress. In such a case, the webhook is not deleted but remains deactivated.
   *
   * Requires one of the following permissions: MANAGE_APPS, AUTHENTICATED_APP.
   */
  webhookDelete?: Maybe<WebhookDelete>;
  /**
   * Performs a dry run of a webhook event. Supports a single event (the first, if multiple provided in the `query`). Requires permission relevant to processed event.
   *
   * Added in Saleor 3.11.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
   */
  webhookDryRun?: Maybe<WebhookDryRun>;
  /**
   * Trigger a webhook event. Supports a single event (the first, if multiple provided in the `webhook.subscription_query`). Requires permission relevant to processed event. Successfully delivered webhook returns `delivery` with status='PENDING' and empty payload.
   *
   * Added in Saleor 3.11.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
   */
  webhookTrigger?: Maybe<WebhookTrigger>;
  /**
   * Updates a webhook subscription.
   *
   * Requires one of the following permissions: MANAGE_APPS, AUTHENTICATED_APP.
   */
  webhookUpdate?: Maybe<WebhookUpdate>;
};

export type MutationAccountAddressCreateArgs = {
  input: AddressInput;
  type?: InputMaybe<AddressTypeEnum>;
};

export type MutationAccountAddressDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationAccountAddressUpdateArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};

export type MutationAccountDeleteArgs = {
  token: Scalars['String'];
};

export type MutationAccountRegisterArgs = {
  input: AccountRegisterInput;
};

export type MutationAccountRequestDeletionArgs = {
  channel?: InputMaybe<Scalars['String']>;
  redirectUrl: Scalars['String'];
};

export type MutationAccountSetDefaultAddressArgs = {
  id: Scalars['ID'];
  type: AddressTypeEnum;
};

export type MutationAccountUpdateArgs = {
  input: AccountInput;
};

export type MutationAddressCreateArgs = {
  input: AddressInput;
  userId: Scalars['ID'];
};

export type MutationAddressDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationAddressSetDefaultArgs = {
  addressId: Scalars['ID'];
  type: AddressTypeEnum;
  userId: Scalars['ID'];
};

export type MutationAddressUpdateArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};

export type MutationAppActivateArgs = {
  id: Scalars['ID'];
};

export type MutationAppCreateArgs = {
  input: AppInput;
};

export type MutationAppDeactivateArgs = {
  id: Scalars['ID'];
};

export type MutationAppDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationAppDeleteFailedInstallationArgs = {
  id: Scalars['ID'];
};

export type MutationAppFetchManifestArgs = {
  manifestUrl: Scalars['String'];
};

export type MutationAppInstallArgs = {
  input: AppInstallInput;
};

export type MutationAppRetryInstallArgs = {
  activateAfterInstallation?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type MutationAppTokenCreateArgs = {
  input: AppTokenInput;
};

export type MutationAppTokenDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationAppTokenVerifyArgs = {
  token: Scalars['String'];
};

export type MutationAppUpdateArgs = {
  id: Scalars['ID'];
  input: AppInput;
};

export type MutationAssignNavigationArgs = {
  menu?: InputMaybe<Scalars['ID']>;
  navigationType: NavigationType;
};

export type MutationAssignWarehouseShippingZoneArgs = {
  id: Scalars['ID'];
  shippingZoneIds: Array<Scalars['ID']>;
};

export type MutationAttributeBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationAttributeCreateArgs = {
  input: AttributeCreateInput;
};

export type MutationAttributeDeleteArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationAttributeReorderValuesArgs = {
  attributeId: Scalars['ID'];
  moves: Array<ReorderInput>;
};

export type MutationAttributeTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationAttributeUpdateArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: AttributeUpdateInput;
};

export type MutationAttributeValueBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationAttributeValueCreateArgs = {
  attribute: Scalars['ID'];
  input: AttributeValueCreateInput;
};

export type MutationAttributeValueDeleteArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationAttributeValueTranslateArgs = {
  id: Scalars['ID'];
  input: AttributeValueTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationAttributeValueUpdateArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: AttributeValueUpdateInput;
};

export type MutationCategoryBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationCategoryCreateArgs = {
  input: CategoryInput;
  parent?: InputMaybe<Scalars['ID']>;
};

export type MutationCategoryDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationCategoryTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationCategoryUpdateArgs = {
  id: Scalars['ID'];
  input: CategoryInput;
};

export type MutationChannelActivateArgs = {
  id: Scalars['ID'];
};

export type MutationChannelCreateArgs = {
  input: ChannelCreateInput;
};

export type MutationChannelDeactivateArgs = {
  id: Scalars['ID'];
};

export type MutationChannelDeleteArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<ChannelDeleteInput>;
};

export type MutationChannelReorderWarehousesArgs = {
  channelId: Scalars['ID'];
  moves: Array<ReorderInput>;
};

export type MutationChannelUpdateArgs = {
  id: Scalars['ID'];
  input: ChannelUpdateInput;
};

export type MutationCheckoutAddPromoCodeArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  promoCode: Scalars['String'];
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutBillingAddressUpdateArgs = {
  billingAddress: AddressInput;
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
  validationRules?: InputMaybe<CheckoutAddressValidationRules>;
};

export type MutationCheckoutCompleteArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  metadata?: InputMaybe<Array<MetadataInput>>;
  paymentData?: InputMaybe<Scalars['JSONString']>;
  redirectUrl?: InputMaybe<Scalars['String']>;
  storeSource?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutCreateArgs = {
  input: CheckoutCreateInput;
};

export type MutationCheckoutCustomerAttachArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  customerId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutCustomerDetachArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutDeliveryMethodUpdateArgs = {
  deliveryMethodId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutEmailUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutLanguageCodeUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  languageCode: LanguageCodeEnum;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutLineDeleteArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  lineId?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutLinesAddArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  lines: Array<CheckoutLineInput>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutLinesDeleteArgs = {
  id?: InputMaybe<Scalars['ID']>;
  linesIds: Array<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutLinesUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  lines: Array<CheckoutLineUpdateInput>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutPaymentCreateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  input: PaymentInput;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutRemovePromoCodeArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  promoCode?: InputMaybe<Scalars['String']>;
  promoCodeId?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCheckoutShippingAddressUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  shippingAddress: AddressInput;
  token?: InputMaybe<Scalars['UUID']>;
  validationRules?: InputMaybe<CheckoutAddressValidationRules>;
};

export type MutationCheckoutShippingMethodUpdateArgs = {
  checkoutId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  shippingMethodId: Scalars['ID'];
  token?: InputMaybe<Scalars['UUID']>;
};

export type MutationCollectionAddProductsArgs = {
  collectionId: Scalars['ID'];
  products: Array<Scalars['ID']>;
};

export type MutationCollectionBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationCollectionChannelListingUpdateArgs = {
  id: Scalars['ID'];
  input: CollectionChannelListingUpdateInput;
};

export type MutationCollectionCreateArgs = {
  input: CollectionCreateInput;
};

export type MutationCollectionDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationCollectionRemoveProductsArgs = {
  collectionId: Scalars['ID'];
  products: Array<Scalars['ID']>;
};

export type MutationCollectionReorderProductsArgs = {
  collectionId: Scalars['ID'];
  moves: Array<MoveProductInput>;
};

export type MutationCollectionTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationCollectionUpdateArgs = {
  id: Scalars['ID'];
  input: CollectionInput;
};

export type MutationConfirmAccountArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export type MutationConfirmEmailChangeArgs = {
  channel?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type MutationCreateWarehouseArgs = {
  input: WarehouseCreateInput;
};

export type MutationCustomerBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationCustomerCreateArgs = {
  input: UserCreateInput;
};

export type MutationCustomerDeleteArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationCustomerUpdateArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: CustomerInput;
};

export type MutationDeleteMetadataArgs = {
  id: Scalars['ID'];
  keys: Array<Scalars['String']>;
};

export type MutationDeletePrivateMetadataArgs = {
  id: Scalars['ID'];
  keys: Array<Scalars['String']>;
};

export type MutationDeleteWarehouseArgs = {
  id: Scalars['ID'];
};

export type MutationDigitalContentCreateArgs = {
  input: DigitalContentUploadInput;
  variantId: Scalars['ID'];
};

export type MutationDigitalContentDeleteArgs = {
  variantId: Scalars['ID'];
};

export type MutationDigitalContentUpdateArgs = {
  input: DigitalContentInput;
  variantId: Scalars['ID'];
};

export type MutationDigitalContentUrlCreateArgs = {
  input: DigitalContentUrlCreateInput;
};

export type MutationDraftOrderBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationDraftOrderCompleteArgs = {
  id: Scalars['ID'];
};

export type MutationDraftOrderCreateArgs = {
  input: DraftOrderCreateInput;
};

export type MutationDraftOrderDeleteArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationDraftOrderLinesBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationDraftOrderUpdateArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: DraftOrderInput;
};

export type MutationEventDeliveryRetryArgs = {
  id: Scalars['ID'];
};

export type MutationExportGiftCardsArgs = {
  input: ExportGiftCardsInput;
};

export type MutationExportProductsArgs = {
  input: ExportProductsInput;
};

export type MutationExternalAuthenticationUrlArgs = {
  input: Scalars['JSONString'];
  pluginId: Scalars['String'];
};

export type MutationExternalLogoutArgs = {
  input: Scalars['JSONString'];
  pluginId: Scalars['String'];
};

export type MutationExternalNotificationTriggerArgs = {
  channel: Scalars['String'];
  input: ExternalNotificationTriggerInput;
  pluginId?: InputMaybe<Scalars['String']>;
};

export type MutationExternalObtainAccessTokensArgs = {
  input: Scalars['JSONString'];
  pluginId: Scalars['String'];
};

export type MutationExternalRefreshArgs = {
  input: Scalars['JSONString'];
  pluginId: Scalars['String'];
};

export type MutationExternalVerifyArgs = {
  input: Scalars['JSONString'];
  pluginId: Scalars['String'];
};

export type MutationFileUploadArgs = {
  file: Scalars['Upload'];
};

export type MutationGiftCardActivateArgs = {
  id: Scalars['ID'];
};

export type MutationGiftCardAddNoteArgs = {
  id: Scalars['ID'];
  input: GiftCardAddNoteInput;
};

export type MutationGiftCardBulkActivateArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationGiftCardBulkCreateArgs = {
  input: GiftCardBulkCreateInput;
};

export type MutationGiftCardBulkDeactivateArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationGiftCardBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationGiftCardCreateArgs = {
  input: GiftCardCreateInput;
};

export type MutationGiftCardDeactivateArgs = {
  id: Scalars['ID'];
};

export type MutationGiftCardDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationGiftCardResendArgs = {
  input: GiftCardResendInput;
};

export type MutationGiftCardSettingsUpdateArgs = {
  input: GiftCardSettingsUpdateInput;
};

export type MutationGiftCardUpdateArgs = {
  id: Scalars['ID'];
  input: GiftCardUpdateInput;
};

export type MutationInvoiceCreateArgs = {
  input: InvoiceCreateInput;
  orderId: Scalars['ID'];
};

export type MutationInvoiceDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationInvoiceRequestArgs = {
  number?: InputMaybe<Scalars['String']>;
  orderId: Scalars['ID'];
};

export type MutationInvoiceRequestDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationInvoiceSendNotificationArgs = {
  id: Scalars['ID'];
};

export type MutationInvoiceUpdateArgs = {
  id: Scalars['ID'];
  input: UpdateInvoiceInput;
};

export type MutationMenuBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationMenuCreateArgs = {
  input: MenuCreateInput;
};

export type MutationMenuDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationMenuItemBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationMenuItemCreateArgs = {
  input: MenuItemCreateInput;
};

export type MutationMenuItemDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationMenuItemMoveArgs = {
  menu: Scalars['ID'];
  moves: Array<MenuItemMoveInput>;
};

export type MutationMenuItemTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationMenuItemUpdateArgs = {
  id: Scalars['ID'];
  input: MenuItemInput;
};

export type MutationMenuUpdateArgs = {
  id: Scalars['ID'];
  input: MenuInput;
};

export type MutationOrderAddNoteArgs = {
  input: OrderAddNoteInput;
  order: Scalars['ID'];
};

export type MutationOrderBulkCancelArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationOrderCancelArgs = {
  id: Scalars['ID'];
};

export type MutationOrderCaptureArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};

export type MutationOrderConfirmArgs = {
  id: Scalars['ID'];
};

export type MutationOrderCreateFromCheckoutArgs = {
  id: Scalars['ID'];
  metadata?: InputMaybe<Array<MetadataInput>>;
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  removeCheckout?: InputMaybe<Scalars['Boolean']>;
};

export type MutationOrderDiscountAddArgs = {
  input: OrderDiscountCommonInput;
  orderId: Scalars['ID'];
};

export type MutationOrderDiscountDeleteArgs = {
  discountId: Scalars['ID'];
};

export type MutationOrderDiscountUpdateArgs = {
  discountId: Scalars['ID'];
  input: OrderDiscountCommonInput;
};

export type MutationOrderFulfillArgs = {
  input: OrderFulfillInput;
  order?: InputMaybe<Scalars['ID']>;
};

export type MutationOrderFulfillmentApproveArgs = {
  allowStockToBeExceeded?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  notifyCustomer: Scalars['Boolean'];
};

export type MutationOrderFulfillmentCancelArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<FulfillmentCancelInput>;
};

export type MutationOrderFulfillmentRefundProductsArgs = {
  input: OrderRefundProductsInput;
  order: Scalars['ID'];
};

export type MutationOrderFulfillmentReturnProductsArgs = {
  input: OrderReturnProductsInput;
  order: Scalars['ID'];
};

export type MutationOrderFulfillmentUpdateTrackingArgs = {
  id: Scalars['ID'];
  input: FulfillmentUpdateTrackingInput;
};

export type MutationOrderLineDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationOrderLineDiscountRemoveArgs = {
  orderLineId: Scalars['ID'];
};

export type MutationOrderLineDiscountUpdateArgs = {
  input: OrderDiscountCommonInput;
  orderLineId: Scalars['ID'];
};

export type MutationOrderLineUpdateArgs = {
  id: Scalars['ID'];
  input: OrderLineInput;
};

export type MutationOrderLinesCreateArgs = {
  id: Scalars['ID'];
  input: Array<OrderLineCreateInput>;
};

export type MutationOrderMarkAsPaidArgs = {
  id: Scalars['ID'];
  transactionReference?: InputMaybe<Scalars['String']>;
};

export type MutationOrderRefundArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};

export type MutationOrderSettingsUpdateArgs = {
  input: OrderSettingsUpdateInput;
};

export type MutationOrderUpdateArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: OrderUpdateInput;
};

export type MutationOrderUpdateShippingArgs = {
  input: OrderUpdateShippingInput;
  order: Scalars['ID'];
};

export type MutationOrderVoidArgs = {
  id: Scalars['ID'];
};

export type MutationPageAttributeAssignArgs = {
  attributeIds: Array<Scalars['ID']>;
  pageTypeId: Scalars['ID'];
};

export type MutationPageAttributeUnassignArgs = {
  attributeIds: Array<Scalars['ID']>;
  pageTypeId: Scalars['ID'];
};

export type MutationPageBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationPageBulkPublishArgs = {
  ids: Array<Scalars['ID']>;
  isPublished: Scalars['Boolean'];
};

export type MutationPageCreateArgs = {
  input: PageCreateInput;
};

export type MutationPageDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationPageReorderAttributeValuesArgs = {
  attributeId: Scalars['ID'];
  moves: Array<ReorderInput>;
  pageId: Scalars['ID'];
};

export type MutationPageTranslateArgs = {
  id: Scalars['ID'];
  input: PageTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationPageTypeBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationPageTypeCreateArgs = {
  input: PageTypeCreateInput;
};

export type MutationPageTypeDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationPageTypeReorderAttributesArgs = {
  moves: Array<ReorderInput>;
  pageTypeId: Scalars['ID'];
};

export type MutationPageTypeUpdateArgs = {
  id?: InputMaybe<Scalars['ID']>;
  input: PageTypeUpdateInput;
};

export type MutationPageUpdateArgs = {
  id: Scalars['ID'];
  input: PageInput;
};

export type MutationPasswordChangeArgs = {
  newPassword: Scalars['String'];
  oldPassword?: InputMaybe<Scalars['String']>;
};

export type MutationPaymentCaptureArgs = {
  amount?: InputMaybe<Scalars['PositiveDecimal']>;
  paymentId: Scalars['ID'];
};

export type MutationPaymentCheckBalanceArgs = {
  input: PaymentCheckBalanceInput;
};

export type MutationPaymentInitializeArgs = {
  channel?: InputMaybe<Scalars['String']>;
  gateway: Scalars['String'];
  paymentData?: InputMaybe<Scalars['JSONString']>;
};

export type MutationPaymentRefundArgs = {
  amount?: InputMaybe<Scalars['PositiveDecimal']>;
  paymentId: Scalars['ID'];
};

export type MutationPaymentVoidArgs = {
  paymentId: Scalars['ID'];
};

export type MutationPermissionGroupCreateArgs = {
  input: PermissionGroupCreateInput;
};

export type MutationPermissionGroupDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationPermissionGroupUpdateArgs = {
  id: Scalars['ID'];
  input: PermissionGroupUpdateInput;
};

export type MutationPluginUpdateArgs = {
  channelId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  input: PluginUpdateInput;
};

export type MutationProductAttributeAssignArgs = {
  operations: Array<ProductAttributeAssignInput>;
  productTypeId: Scalars['ID'];
};

export type MutationProductAttributeAssignmentUpdateArgs = {
  operations: Array<ProductAttributeAssignmentUpdateInput>;
  productTypeId: Scalars['ID'];
};

export type MutationProductAttributeUnassignArgs = {
  attributeIds: Array<Scalars['ID']>;
  productTypeId: Scalars['ID'];
};

export type MutationProductBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationProductChannelListingUpdateArgs = {
  id: Scalars['ID'];
  input: ProductChannelListingUpdateInput;
};

export type MutationProductCreateArgs = {
  input: ProductCreateInput;
};

export type MutationProductDeleteArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationProductMediaBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationProductMediaCreateArgs = {
  input: ProductMediaCreateInput;
};

export type MutationProductMediaDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationProductMediaReorderArgs = {
  mediaIds: Array<Scalars['ID']>;
  productId: Scalars['ID'];
};

export type MutationProductMediaUpdateArgs = {
  id: Scalars['ID'];
  input: ProductMediaUpdateInput;
};

export type MutationProductReorderAttributeValuesArgs = {
  attributeId: Scalars['ID'];
  moves: Array<ReorderInput>;
  productId: Scalars['ID'];
};

export type MutationProductTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationProductTypeBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationProductTypeCreateArgs = {
  input: ProductTypeInput;
};

export type MutationProductTypeDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationProductTypeReorderAttributesArgs = {
  moves: Array<ReorderInput>;
  productTypeId: Scalars['ID'];
  type: ProductAttributeType;
};

export type MutationProductTypeUpdateArgs = {
  id: Scalars['ID'];
  input: ProductTypeInput;
};

export type MutationProductUpdateArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: ProductInput;
};

export type MutationProductVariantBulkCreateArgs = {
  errorPolicy?: InputMaybe<ErrorPolicyEnum>;
  product: Scalars['ID'];
  variants: Array<ProductVariantBulkCreateInput>;
};

export type MutationProductVariantBulkDeleteArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  skus?: InputMaybe<Array<Scalars['String']>>;
};

export type MutationProductVariantBulkUpdateArgs = {
  errorPolicy?: InputMaybe<ErrorPolicyEnum>;
  product: Scalars['ID'];
  variants: Array<ProductVariantBulkUpdateInput>;
};

export type MutationProductVariantChannelListingUpdateArgs = {
  id?: InputMaybe<Scalars['ID']>;
  input: Array<ProductVariantChannelListingAddInput>;
  sku?: InputMaybe<Scalars['String']>;
};

export type MutationProductVariantCreateArgs = {
  input: ProductVariantCreateInput;
};

export type MutationProductVariantDeleteArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type MutationProductVariantPreorderDeactivateArgs = {
  id: Scalars['ID'];
};

export type MutationProductVariantReorderArgs = {
  moves: Array<ReorderInput>;
  productId: Scalars['ID'];
};

export type MutationProductVariantReorderAttributeValuesArgs = {
  attributeId: Scalars['ID'];
  moves: Array<ReorderInput>;
  variantId: Scalars['ID'];
};

export type MutationProductVariantSetDefaultArgs = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
};

export type MutationProductVariantStocksCreateArgs = {
  stocks: Array<StockInput>;
  variantId: Scalars['ID'];
};

export type MutationProductVariantStocksDeleteArgs = {
  sku?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['ID']>;
  warehouseIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type MutationProductVariantStocksUpdateArgs = {
  sku?: InputMaybe<Scalars['String']>;
  stocks: Array<StockInput>;
  variantId?: InputMaybe<Scalars['ID']>;
};

export type MutationProductVariantTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationProductVariantUpdateArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: ProductVariantInput;
  sku?: InputMaybe<Scalars['String']>;
};

export type MutationRequestEmailChangeArgs = {
  channel?: InputMaybe<Scalars['String']>;
  newEmail: Scalars['String'];
  password: Scalars['String'];
  redirectUrl: Scalars['String'];
};

export type MutationRequestPasswordResetArgs = {
  channel?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  redirectUrl: Scalars['String'];
};

export type MutationSaleBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationSaleCataloguesAddArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};

export type MutationSaleCataloguesRemoveArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};

export type MutationSaleChannelListingUpdateArgs = {
  id: Scalars['ID'];
  input: SaleChannelListingInput;
};

export type MutationSaleCreateArgs = {
  input: SaleInput;
};

export type MutationSaleDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationSaleTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationSaleUpdateArgs = {
  id: Scalars['ID'];
  input: SaleInput;
};

export type MutationSetPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationShippingMethodChannelListingUpdateArgs = {
  id: Scalars['ID'];
  input: ShippingMethodChannelListingInput;
};

export type MutationShippingPriceBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationShippingPriceCreateArgs = {
  input: ShippingPriceInput;
};

export type MutationShippingPriceDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationShippingPriceExcludeProductsArgs = {
  id: Scalars['ID'];
  input: ShippingPriceExcludeProductsInput;
};

export type MutationShippingPriceRemoveProductFromExcludeArgs = {
  id: Scalars['ID'];
  products: Array<Scalars['ID']>;
};

export type MutationShippingPriceTranslateArgs = {
  id: Scalars['ID'];
  input: ShippingPriceTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationShippingPriceUpdateArgs = {
  id: Scalars['ID'];
  input: ShippingPriceInput;
};

export type MutationShippingZoneBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationShippingZoneCreateArgs = {
  input: ShippingZoneCreateInput;
};

export type MutationShippingZoneDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationShippingZoneUpdateArgs = {
  id: Scalars['ID'];
  input: ShippingZoneUpdateInput;
};

export type MutationShopAddressUpdateArgs = {
  input?: InputMaybe<AddressInput>;
};

export type MutationShopDomainUpdateArgs = {
  input?: InputMaybe<SiteDomainInput>;
};

export type MutationShopSettingsTranslateArgs = {
  input: ShopSettingsTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationShopSettingsUpdateArgs = {
  input: ShopSettingsInput;
};

export type MutationStaffBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationStaffCreateArgs = {
  input: StaffCreateInput;
};

export type MutationStaffDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationStaffNotificationRecipientCreateArgs = {
  input: StaffNotificationRecipientInput;
};

export type MutationStaffNotificationRecipientDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationStaffNotificationRecipientUpdateArgs = {
  id: Scalars['ID'];
  input: StaffNotificationRecipientInput;
};

export type MutationStaffUpdateArgs = {
  id: Scalars['ID'];
  input: StaffUpdateInput;
};

export type MutationTaxClassCreateArgs = {
  input: TaxClassCreateInput;
};

export type MutationTaxClassDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationTaxClassUpdateArgs = {
  id: Scalars['ID'];
  input: TaxClassUpdateInput;
};

export type MutationTaxConfigurationUpdateArgs = {
  id: Scalars['ID'];
  input: TaxConfigurationUpdateInput;
};

export type MutationTaxCountryConfigurationDeleteArgs = {
  countryCode: CountryCode;
};

export type MutationTaxCountryConfigurationUpdateArgs = {
  countryCode: CountryCode;
  updateTaxClassRates: Array<TaxClassRateInput>;
};

export type MutationTaxExemptionManageArgs = {
  id: Scalars['ID'];
  taxExemption: Scalars['Boolean'];
};

export type MutationTokenCreateArgs = {
  audience?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationTokenRefreshArgs = {
  csrfToken?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
};

export type MutationTokenVerifyArgs = {
  token: Scalars['String'];
};

export type MutationTransactionCreateArgs = {
  id: Scalars['ID'];
  transaction: TransactionCreateInput;
  transactionEvent?: InputMaybe<TransactionEventInput>;
};

export type MutationTransactionRequestActionArgs = {
  actionType: TransactionActionEnum;
  amount?: InputMaybe<Scalars['PositiveDecimal']>;
  id: Scalars['ID'];
};

export type MutationTransactionUpdateArgs = {
  id: Scalars['ID'];
  transaction?: InputMaybe<TransactionUpdateInput>;
  transactionEvent?: InputMaybe<TransactionEventInput>;
};

export type MutationUnassignWarehouseShippingZoneArgs = {
  id: Scalars['ID'];
  shippingZoneIds: Array<Scalars['ID']>;
};

export type MutationUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: Array<MetadataInput>;
};

export type MutationUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: Array<MetadataInput>;
};

export type MutationUpdateWarehouseArgs = {
  id: Scalars['ID'];
  input: WarehouseUpdateInput;
};

export type MutationUserAvatarUpdateArgs = {
  image: Scalars['Upload'];
};

export type MutationUserBulkSetActiveArgs = {
  ids: Array<Scalars['ID']>;
  isActive: Scalars['Boolean'];
};

export type MutationVariantMediaAssignArgs = {
  mediaId: Scalars['ID'];
  variantId: Scalars['ID'];
};

export type MutationVariantMediaUnassignArgs = {
  mediaId: Scalars['ID'];
  variantId: Scalars['ID'];
};

export type MutationVoucherBulkDeleteArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationVoucherCataloguesAddArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};

export type MutationVoucherCataloguesRemoveArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};

export type MutationVoucherChannelListingUpdateArgs = {
  id: Scalars['ID'];
  input: VoucherChannelListingInput;
};

export type MutationVoucherCreateArgs = {
  input: VoucherInput;
};

export type MutationVoucherDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationVoucherTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};

export type MutationVoucherUpdateArgs = {
  id: Scalars['ID'];
  input: VoucherInput;
};

export type MutationWebhookCreateArgs = {
  input: WebhookCreateInput;
};

export type MutationWebhookDeleteArgs = {
  id: Scalars['ID'];
};

export type MutationWebhookDryRunArgs = {
  objectId: Scalars['ID'];
  query: Scalars['String'];
};

export type MutationWebhookTriggerArgs = {
  objectId: Scalars['ID'];
  webhookId: Scalars['ID'];
};

export type MutationWebhookUpdateArgs = {
  id: Scalars['ID'];
  input: WebhookUpdateInput;
};

export type NameTranslationInput = {
  name?: InputMaybe<Scalars['String']>;
};

export enum NavigationType {
  /** Main storefront navigation. */
  Main = 'MAIN',
  /** Secondary storefront navigation. */
  Secondary = 'SECONDARY'
}

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type ObjectWithMetadata = {
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<MetadataItem>;
  /**
   * A single key from public metadata.
   *
   * Tip: Use GraphQL aliases to fetch multiple keys.
   */
  metafield?: Maybe<Scalars['String']>;
  /** Public metadata. Use `keys` to control which fields you want to include. The default is to include everything. */
  metafields?: Maybe<Scalars['Metadata']>;
  /** List of private metadata items. Requires staff permissions to access. */
  privateMetadata: Array<MetadataItem>;
  /**
   * A single key from private metadata. Requires staff permissions to access.
   *
   * Tip: Use GraphQL aliases to fetch multiple keys.
   */
  privateMetafield?: Maybe<Scalars['String']>;
  /** Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything. */
  privateMetafields?: Maybe<Scalars['Metadata']>;
};

export type ObjectWithMetadataMetafieldArgs = {
  key: Scalars['String'];
};

export type ObjectWithMetadataMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type ObjectWithMetadataPrivateMetafieldArgs = {
  key: Scalars['String'];
};

export type ObjectWithMetadataPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents an order in the shop. */
export type Order = Node &
  ObjectWithMetadata & {
    /** List of actions that can be performed in the current state of an order. */
    actions: Array<OrderAction>;
    /**
     * The authorize status of the order.
     *
     * Added in Saleor 3.4.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    authorizeStatus: OrderAuthorizeStatusEnum;
    /**
     * Collection points that can be used for this order.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    availableCollectionPoints: Array<Warehouse>;
    /**
     * Shipping methods that can be used with this order.
     * @deprecated Use `shippingMethods`, this field will be removed in 4.0
     */
    availableShippingMethods?: Maybe<Array<ShippingMethod>>;
    /** Billing address. The full data can be access for orders created in Saleor 3.2 and later, for other orders requires one of the following permissions: MANAGE_ORDERS, OWNER. */
    billingAddress?: Maybe<Address>;
    /** Informs whether a draft order can be finalized(turned into a regular order). */
    canFinalize: Scalars['Boolean'];
    channel: Channel;
    /**
     * The charge status of the order.
     *
     * Added in Saleor 3.4.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    chargeStatus: OrderChargeStatusEnum;
    /**
     * ID of the checkout that the order was created from.
     *
     * Added in Saleor 3.11.
     */
    checkoutId?: Maybe<Scalars['ID']>;
    collectionPointName?: Maybe<Scalars['String']>;
    created: Scalars['DateTime'];
    customerNote: Scalars['String'];
    /**
     * The delivery method selected for this order.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    deliveryMethod?: Maybe<DeliveryMethod>;
    /**
     * Returns applied discount.
     * @deprecated This field will be removed in Saleor 4.0. Use the `discounts` field instead.
     */
    discount?: Maybe<Money>;
    /**
     * Discount name.
     * @deprecated This field will be removed in Saleor 4.0. Use the `discounts` field instead.
     */
    discountName?: Maybe<Scalars['String']>;
    /** List of all discounts assigned to the order. */
    discounts: Array<OrderDiscount>;
    /**
     * Determines whether checkout prices should include taxes when displayed in a storefront.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    displayGrossPrices: Scalars['Boolean'];
    /** List of errors that occurred during order validation. */
    errors: Array<OrderError>;
    /**
     * List of events associated with the order.
     *
     * Requires one of the following permissions: MANAGE_ORDERS.
     */
    events: Array<OrderEvent>;
    /**
     * External ID of this order.
     *
     * Added in Saleor 3.10.
     */
    externalReference?: Maybe<Scalars['String']>;
    /** List of shipments for the order. */
    fulfillments: Array<Fulfillment>;
    /** List of user gift cards. */
    giftCards: Array<GiftCard>;
    id: Scalars['ID'];
    /** List of order invoices. Can be fetched for orders created in Saleor 3.2 and later, for other orders requires one of the following permissions: MANAGE_ORDERS, OWNER. */
    invoices: Array<Invoice>;
    /** Informs if an order is fully paid. */
    isPaid: Scalars['Boolean'];
    /** Returns True, if order requires shipping. */
    isShippingRequired: Scalars['Boolean'];
    /** @deprecated This field will be removed in Saleor 4.0. Use the `languageCodeEnum` field to fetch the language code.  */
    languageCode: Scalars['String'];
    /** Order language code. */
    languageCodeEnum: LanguageCodeEnum;
    /** List of order lines. */
    lines: Array<OrderLine>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** User-friendly number of an order. */
    number: Scalars['String'];
    /** The order origin. */
    origin: OrderOriginEnum;
    /** The ID of the order that was the base for this order. */
    original?: Maybe<Scalars['ID']>;
    /** Internal payment status. */
    paymentStatus: PaymentChargeStatusEnum;
    /** User-friendly payment status. */
    paymentStatusDisplay: Scalars['String'];
    /** List of payments for the order. */
    payments: Array<Payment>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    redirectUrl?: Maybe<Scalars['String']>;
    /** Shipping address. The full data can be access for orders created in Saleor 3.2 and later, for other orders requires one of the following permissions: MANAGE_ORDERS, OWNER. */
    shippingAddress?: Maybe<Address>;
    /**
     * Shipping method for this order.
     * @deprecated This field will be removed in Saleor 4.0. Use `deliveryMethod` instead.
     */
    shippingMethod?: Maybe<ShippingMethod>;
    shippingMethodName?: Maybe<Scalars['String']>;
    /** Shipping methods related to this order. */
    shippingMethods: Array<ShippingMethod>;
    /** Total price of shipping. */
    shippingPrice: TaxedMoney;
    /**
     * Denormalized tax class assigned to the shipping method.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     *
     * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
     */
    shippingTaxClass?: Maybe<TaxClass>;
    /**
     * Denormalized public metadata of the shipping method's tax class.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    shippingTaxClassMetadata: Array<MetadataItem>;
    /**
     * Denormalized name of the tax class assigned to the shipping method.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    shippingTaxClassName?: Maybe<Scalars['String']>;
    /**
     * Denormalized private metadata of the shipping method's tax class. Requires staff permissions to access.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    shippingTaxClassPrivateMetadata: Array<MetadataItem>;
    /** The shipping tax rate value. */
    shippingTaxRate: Scalars['Float'];
    status: OrderStatus;
    /** User-friendly order status. */
    statusDisplay: Scalars['String'];
    /** The sum of line prices not including shipping. */
    subtotal: TaxedMoney;
    /**
     * Returns True if order has to be exempt from taxes.
     *
     * Added in Saleor 3.8.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    taxExemption: Scalars['Boolean'];
    /** @deprecated This field will be removed in Saleor 4.0. Use `id` instead. */
    token: Scalars['String'];
    /** Total amount of the order. */
    total: TaxedMoney;
    /** Amount authorized for the order. */
    totalAuthorized: Money;
    /** The difference between the paid and the order total amount. */
    totalBalance: Money;
    /** Amount captured by payment. */
    totalCaptured: Money;
    trackingClientId: Scalars['String'];
    /**
     * List of transactions for the order. Requires one of the following permissions: MANAGE_ORDERS, HANDLE_PAYMENTS.
     *
     * Added in Saleor 3.4.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    transactions: Array<TransactionItem>;
    /**
     * Translated discount name.
     * @deprecated This field will be removed in Saleor 4.0. Use the `discounts` field instead.
     */
    translatedDiscountName?: Maybe<Scalars['String']>;
    /** Undiscounted total amount of the order. */
    undiscountedTotal: TaxedMoney;
    updatedAt: Scalars['DateTime'];
    /** User who placed the order. This field is set only for orders placed by authenticated users. Can be fetched for orders created in Saleor 3.2 and later, for other orders requires one of the following permissions: MANAGE_USERS, MANAGE_ORDERS, OWNER. */
    user?: Maybe<User>;
    /** Email address of the customer. The full data can be access for orders created in Saleor 3.2 and later, for other orders requires one of the following permissions: MANAGE_ORDERS, OWNER. */
    userEmail?: Maybe<Scalars['String']>;
    voucher?: Maybe<Voucher>;
    weight: Weight;
  };

/** Represents an order in the shop. */
export type OrderMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an order in the shop. */
export type OrderMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents an order in the shop. */
export type OrderPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an order in the shop. */
export type OrderPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export enum OrderAction {
  /** Represents the capture action. */
  Capture = 'CAPTURE',
  /** Represents a mark-as-paid action. */
  MarkAsPaid = 'MARK_AS_PAID',
  /** Represents a refund action. */
  Refund = 'REFUND',
  /** Represents a void action. */
  Void = 'VOID'
}

/**
 * Adds note to the order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderAddNote = {
  errors: Array<OrderError>;
  /** Order note created. */
  event?: Maybe<OrderEvent>;
  /** Order with the note added. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type OrderAddNoteInput = {
  /** Note message. */
  message: Scalars['String'];
};

/**
 * Determine a current authorize status for order.
 *
 *     We treat the order as fully authorized when the sum of authorized and charged funds
 *     cover the order.total.
 *     We treat the order as partially authorized when the sum of authorized and charged
 *     funds covers only part of the order.total
 *     We treat the order as not authorized when the sum of authorized and charged funds is
 *     0.
 *
 *     NONE - the funds are not authorized
 *     PARTIAL - the funds that are authorized or charged don't cover fully the order's
 *     total
 *     FULL - the funds that are authorized or charged fully cover the order's total
 *
 */
export enum OrderAuthorizeStatusEnum {
  Full = 'FULL',
  None = 'NONE',
  Partial = 'PARTIAL'
}

/**
 * Cancels orders.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderBulkCancel = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<OrderError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Cancel an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderCancel = {
  errors: Array<OrderError>;
  /** Canceled order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Event sent when order is canceled.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderCancelled = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Capture an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderCapture = {
  errors: Array<OrderError>;
  /** Captured order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Determine the current charge status for the order.
 *
 *     We treat the order as overcharged when the charged amount is bigger that order.total
 *     We treat the order as fully charged when the charged amount is equal to order.total.
 *     We treat the order as partially charged when the charged amount covers only part of
 *     the order.total
 *
 *     NONE - the funds are not charged.
 *     PARTIAL - the funds that are charged don't cover the order's total
 *     FULL - the funds that are charged fully cover the order's total
 *     OVERCHARGED - the charged funds are bigger than order's total
 *
 */
export enum OrderChargeStatusEnum {
  Full = 'FULL',
  None = 'NONE',
  Overcharged = 'OVERCHARGED',
  Partial = 'PARTIAL'
}

/**
 * Confirms an unconfirmed order by changing status to unfulfilled.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderConfirm = {
  errors: Array<OrderError>;
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Event sent when order is confirmed.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderConfirmed = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type OrderCountableConnection = {
  edges: Array<OrderCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrderCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Order;
};

/**
 * Create new order from existing checkout. Requires the following permissions: AUTHENTICATED_APP and HANDLE_CHECKOUTS.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderCreateFromCheckout = {
  errors: Array<OrderCreateFromCheckoutError>;
  /** Placed order. */
  order?: Maybe<Order>;
};

export type OrderCreateFromCheckoutError = {
  /** The error code. */
  code: OrderCreateFromCheckoutErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** List of line Ids which cause the error. */
  lines?: Maybe<Array<Scalars['ID']>>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of variant IDs which causes the error. */
  variants?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum OrderCreateFromCheckoutErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  ChannelInactive = 'CHANNEL_INACTIVE',
  CheckoutNotFound = 'CHECKOUT_NOT_FOUND',
  EmailNotSet = 'EMAIL_NOT_SET',
  GiftCardNotApplicable = 'GIFT_CARD_NOT_APPLICABLE',
  GraphqlError = 'GRAPHQL_ERROR',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
  NoLines = 'NO_LINES',
  ShippingAddressNotSet = 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotSet = 'SHIPPING_METHOD_NOT_SET',
  TaxError = 'TAX_ERROR',
  UnavailableVariantInChannel = 'UNAVAILABLE_VARIANT_IN_CHANNEL',
  VoucherNotApplicable = 'VOUCHER_NOT_APPLICABLE'
}

/**
 * Event sent when new order is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export enum OrderDirection {
  /** Specifies an ascending sort order. */
  Asc = 'ASC',
  /** Specifies a descending sort order. */
  Desc = 'DESC'
}

/** Contains all details related to the applied discount to the order. */
export type OrderDiscount = Node & {
  /** Returns amount of discount. */
  amount: Money;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /**
   * Explanation for the applied discount.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  reason?: Maybe<Scalars['String']>;
  translatedName?: Maybe<Scalars['String']>;
  type: OrderDiscountType;
  /** Value of the discount. Can store fixed value or percent value */
  value: Scalars['PositiveDecimal'];
  /** Type of the discount: fixed or percent */
  valueType: DiscountValueTypeEnum;
};

/**
 * Adds discount to the order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderDiscountAdd = {
  errors: Array<OrderError>;
  /** Order which has been discounted. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type OrderDiscountCommonInput = {
  /** Explanation for the applied discount. */
  reason?: InputMaybe<Scalars['String']>;
  /** Value of the discount. Can store fixed value or percent value */
  value: Scalars['PositiveDecimal'];
  /** Type of the discount: fixed or percent */
  valueType: DiscountValueTypeEnum;
};

/**
 * Remove discount from the order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderDiscountDelete = {
  errors: Array<OrderError>;
  /** Order which has removed discount. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/** An enumeration. */
export enum OrderDiscountType {
  Manual = 'MANUAL',
  Voucher = 'VOUCHER'
}

/**
 * Update discount for the order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderDiscountUpdate = {
  errors: Array<OrderError>;
  /** Order which has been discounted. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type OrderDraftFilterInput = {
  channels?: InputMaybe<Array<Scalars['ID']>>;
  created?: InputMaybe<DateRangeInput>;
  customer?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
};

export type OrderError = {
  /** A type of address that causes the error. */
  addressType?: Maybe<AddressTypeEnum>;
  /** The error code. */
  code: OrderErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of order line IDs that cause the error. */
  orderLines?: Maybe<Array<Scalars['ID']>>;
  /** List of product variants that are associated with the error */
  variants?: Maybe<Array<Scalars['ID']>>;
  /** Warehouse ID which causes the error. */
  warehouse?: Maybe<Scalars['ID']>;
};

/** An enumeration. */
export enum OrderErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  CannotCancelFulfillment = 'CANNOT_CANCEL_FULFILLMENT',
  CannotCancelOrder = 'CANNOT_CANCEL_ORDER',
  CannotDelete = 'CANNOT_DELETE',
  CannotDiscount = 'CANNOT_DISCOUNT',
  CannotFulfillUnpaidOrder = 'CANNOT_FULFILL_UNPAID_ORDER',
  CannotRefund = 'CANNOT_REFUND',
  CaptureInactivePayment = 'CAPTURE_INACTIVE_PAYMENT',
  ChannelInactive = 'CHANNEL_INACTIVE',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  FulfillOrderLine = 'FULFILL_ORDER_LINE',
  GiftCardLine = 'GIFT_CARD_LINE',
  GraphqlError = 'GRAPHQL_ERROR',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Invalid = 'INVALID',
  InvalidQuantity = 'INVALID_QUANTITY',
  MissingTransactionActionRequestWebhook = 'MISSING_TRANSACTION_ACTION_REQUEST_WEBHOOK',
  NotAvailableInChannel = 'NOT_AVAILABLE_IN_CHANNEL',
  NotEditable = 'NOT_EDITABLE',
  NotFound = 'NOT_FOUND',
  OrderNoShippingAddress = 'ORDER_NO_SHIPPING_ADDRESS',
  PaymentError = 'PAYMENT_ERROR',
  PaymentMissing = 'PAYMENT_MISSING',
  ProductNotPublished = 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase = 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  Required = 'REQUIRED',
  ShippingMethodNotApplicable = 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodRequired = 'SHIPPING_METHOD_REQUIRED',
  TaxError = 'TAX_ERROR',
  Unique = 'UNIQUE',
  VoidInactivePayment = 'VOID_INACTIVE_PAYMENT',
  ZeroQuantity = 'ZERO_QUANTITY'
}

/** History log of the order. */
export type OrderEvent = Node & {
  /** Amount of money. */
  amount?: Maybe<Scalars['Float']>;
  /** App that performed the action. Requires of of the following permissions: MANAGE_APPS, MANAGE_ORDERS, OWNER. */
  app?: Maybe<App>;
  /** Composed ID of the Fulfillment. */
  composedId?: Maybe<Scalars['String']>;
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** The discount applied to the order. */
  discount?: Maybe<OrderEventDiscountObject>;
  /** Email of the customer. */
  email?: Maybe<Scalars['String']>;
  /** Type of an email sent to the customer. */
  emailType?: Maybe<OrderEventsEmailsEnum>;
  /** The lines fulfilled. */
  fulfilledItems?: Maybe<Array<FulfillmentLine>>;
  id: Scalars['ID'];
  /** Number of an invoice related to the order. */
  invoiceNumber?: Maybe<Scalars['String']>;
  /** The concerned lines. */
  lines?: Maybe<Array<OrderEventOrderLineObject>>;
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** User-friendly number of an order. */
  orderNumber?: Maybe<Scalars['String']>;
  /** List of oversold lines names. */
  oversoldItems?: Maybe<Array<Scalars['String']>>;
  /** The payment gateway of the payment. */
  paymentGateway?: Maybe<Scalars['String']>;
  /** The payment reference from the payment provider. */
  paymentId?: Maybe<Scalars['String']>;
  /** Number of items. */
  quantity?: Maybe<Scalars['Int']>;
  /** The reference of payment's transaction. */
  reference?: Maybe<Scalars['String']>;
  /** The order which is related to this order. */
  relatedOrder?: Maybe<Order>;
  /** Define if shipping costs were included to the refund. */
  shippingCostsIncluded?: Maybe<Scalars['Boolean']>;
  /** The status of payment's transaction. */
  status?: Maybe<TransactionStatus>;
  /** The transaction reference of captured payment. */
  transactionReference?: Maybe<Scalars['String']>;
  /** Order event type. */
  type?: Maybe<OrderEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
  /** The warehouse were items were restocked. */
  warehouse?: Maybe<Warehouse>;
};

export type OrderEventCountableConnection = {
  edges: Array<OrderEventCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrderEventCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: OrderEvent;
};

export type OrderEventDiscountObject = {
  /** Returns amount of discount. */
  amount?: Maybe<Money>;
  /** Returns amount of discount. */
  oldAmount?: Maybe<Money>;
  /** Value of the discount. Can store fixed value or percent value. */
  oldValue?: Maybe<Scalars['PositiveDecimal']>;
  /** Type of the discount: fixed or percent. */
  oldValueType?: Maybe<DiscountValueTypeEnum>;
  /** Explanation for the applied discount. */
  reason?: Maybe<Scalars['String']>;
  /** Value of the discount. Can store fixed value or percent value. */
  value: Scalars['PositiveDecimal'];
  /** Type of the discount: fixed or percent. */
  valueType: DiscountValueTypeEnum;
};

export type OrderEventOrderLineObject = {
  /** The discount applied to the order line. */
  discount?: Maybe<OrderEventDiscountObject>;
  /** The variant name. */
  itemName?: Maybe<Scalars['String']>;
  /** The order line. */
  orderLine?: Maybe<OrderLine>;
  /** The variant quantity. */
  quantity?: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum OrderEventsEmailsEnum {
  Confirmed = 'CONFIRMED',
  DigitalLinks = 'DIGITAL_LINKS',
  FulfillmentConfirmation = 'FULFILLMENT_CONFIRMATION',
  OrderCancel = 'ORDER_CANCEL',
  OrderConfirmation = 'ORDER_CONFIRMATION',
  OrderRefund = 'ORDER_REFUND',
  PaymentConfirmation = 'PAYMENT_CONFIRMATION',
  ShippingConfirmation = 'SHIPPING_CONFIRMATION',
  TrackingUpdated = 'TRACKING_UPDATED'
}

/** An enumeration. */
export enum OrderEventsEnum {
  AddedProducts = 'ADDED_PRODUCTS',
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  DraftCreated = 'DRAFT_CREATED',
  DraftCreatedFromReplace = 'DRAFT_CREATED_FROM_REPLACE',
  EmailSent = 'EMAIL_SENT',
  ExternalServiceNotification = 'EXTERNAL_SERVICE_NOTIFICATION',
  FulfillmentAwaitsApproval = 'FULFILLMENT_AWAITS_APPROVAL',
  FulfillmentCanceled = 'FULFILLMENT_CANCELED',
  FulfillmentFulfilledItems = 'FULFILLMENT_FULFILLED_ITEMS',
  FulfillmentRefunded = 'FULFILLMENT_REFUNDED',
  FulfillmentReplaced = 'FULFILLMENT_REPLACED',
  FulfillmentRestockedItems = 'FULFILLMENT_RESTOCKED_ITEMS',
  FulfillmentReturned = 'FULFILLMENT_RETURNED',
  InvoiceGenerated = 'INVOICE_GENERATED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceSent = 'INVOICE_SENT',
  InvoiceUpdated = 'INVOICE_UPDATED',
  NoteAdded = 'NOTE_ADDED',
  OrderDiscountAdded = 'ORDER_DISCOUNT_ADDED',
  OrderDiscountAutomaticallyUpdated = 'ORDER_DISCOUNT_AUTOMATICALLY_UPDATED',
  OrderDiscountDeleted = 'ORDER_DISCOUNT_DELETED',
  OrderDiscountUpdated = 'ORDER_DISCOUNT_UPDATED',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  OrderLineDiscountRemoved = 'ORDER_LINE_DISCOUNT_REMOVED',
  OrderLineDiscountUpdated = 'ORDER_LINE_DISCOUNT_UPDATED',
  OrderLineProductDeleted = 'ORDER_LINE_PRODUCT_DELETED',
  OrderLineVariantDeleted = 'ORDER_LINE_VARIANT_DELETED',
  OrderMarkedAsPaid = 'ORDER_MARKED_AS_PAID',
  OrderReplacementCreated = 'ORDER_REPLACEMENT_CREATED',
  Other = 'OTHER',
  OversoldItems = 'OVERSOLD_ITEMS',
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  PaymentCaptured = 'PAYMENT_CAPTURED',
  PaymentFailed = 'PAYMENT_FAILED',
  PaymentRefunded = 'PAYMENT_REFUNDED',
  PaymentVoided = 'PAYMENT_VOIDED',
  Placed = 'PLACED',
  PlacedFromDraft = 'PLACED_FROM_DRAFT',
  RemovedProducts = 'REMOVED_PRODUCTS',
  TrackingUpdated = 'TRACKING_UPDATED',
  TransactionCaptureRequested = 'TRANSACTION_CAPTURE_REQUESTED',
  TransactionEvent = 'TRANSACTION_EVENT',
  TransactionRefundRequested = 'TRANSACTION_REFUND_REQUESTED',
  TransactionVoidRequested = 'TRANSACTION_VOID_REQUESTED',
  UpdatedAddress = 'UPDATED_ADDRESS'
}

export type OrderFilterInput = {
  authorizeStatus?: InputMaybe<Array<OrderAuthorizeStatusEnum>>;
  channels?: InputMaybe<Array<Scalars['ID']>>;
  chargeStatus?: InputMaybe<Array<OrderChargeStatusEnum>>;
  checkoutIds?: InputMaybe<Array<Scalars['ID']>>;
  created?: InputMaybe<DateRangeInput>;
  customer?: InputMaybe<Scalars['String']>;
  giftCardBought?: InputMaybe<Scalars['Boolean']>;
  giftCardUsed?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  isClickAndCollect?: InputMaybe<Scalars['Boolean']>;
  isPreorder?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  numbers?: InputMaybe<Array<Scalars['String']>>;
  paymentStatus?: InputMaybe<Array<PaymentChargeStatusEnum>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<OrderStatusFilter>>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
};

/**
 * Filter shipping methods for order.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderFilterShippingMethods = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /**
   * Shipping methods that can be used with this checkout.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  shippingMethods?: Maybe<Array<ShippingMethod>>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Creates new fulfillments for an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderFulfill = {
  errors: Array<OrderError>;
  /** List of created fulfillments. */
  fulfillments?: Maybe<Array<Fulfillment>>;
  /** Fulfilled order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type OrderFulfillInput = {
  /** If true, then allow proceed fulfillment when stock is exceeded. */
  allowStockToBeExceeded?: InputMaybe<Scalars['Boolean']>;
  /** List of items informing how to fulfill the order. */
  lines: Array<OrderFulfillLineInput>;
  /** If true, send an email notification to the customer. */
  notifyCustomer?: InputMaybe<Scalars['Boolean']>;
  /**
   * Fulfillment tracking number.
   *
   * Added in Saleor 3.6.
   */
  trackingNumber?: InputMaybe<Scalars['String']>;
};

export type OrderFulfillLineInput = {
  /** The ID of the order line. */
  orderLineId?: InputMaybe<Scalars['ID']>;
  /** List of stock items to create. */
  stocks: Array<OrderFulfillStockInput>;
};

export type OrderFulfillStockInput = {
  /** The number of line items to be fulfilled from given warehouse. */
  quantity: Scalars['Int'];
  /** ID of the warehouse from which the item will be fulfilled. */
  warehouse: Scalars['ID'];
};

/**
 * Event sent when order is fulfilled.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderFulfilled = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when order is fully paid.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderFullyPaid = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents order line of particular order. */
export type OrderLine = Node &
  ObjectWithMetadata & {
    /**
     * List of allocations across warehouses.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS.
     */
    allocations?: Maybe<Array<Allocation>>;
    digitalContentUrl?: Maybe<DigitalContentUrl>;
    id: Scalars['ID'];
    isShippingRequired: Scalars['Boolean'];
    /**
     * List of public metadata items. Can be accessed without permissions.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /**
     * List of private metadata items. Requires staff permissions to access.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.5.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    productName: Scalars['String'];
    productSku?: Maybe<Scalars['String']>;
    productVariantId?: Maybe<Scalars['String']>;
    quantity: Scalars['Int'];
    quantityFulfilled: Scalars['Int'];
    /**
     * A quantity of items remaining to be fulfilled.
     *
     * Added in Saleor 3.1.
     */
    quantityToFulfill: Scalars['Int'];
    /**
     * Denormalized tax class of the product in this order line.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     *
     * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
     */
    taxClass?: Maybe<TaxClass>;
    /**
     * Denormalized public metadata of the tax class.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    taxClassMetadata: Array<MetadataItem>;
    /**
     * Denormalized name of the tax class.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    taxClassName?: Maybe<Scalars['String']>;
    /**
     * Denormalized private metadata of the tax class. Requires staff permissions to access.
     *
     * Added in Saleor 3.9.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    taxClassPrivateMetadata: Array<MetadataItem>;
    taxRate: Scalars['Float'];
    thumbnail?: Maybe<Image>;
    /** Price of the order line. */
    totalPrice: TaxedMoney;
    /** Product name in the customer's language */
    translatedProductName: Scalars['String'];
    /** Variant name in the customer's language */
    translatedVariantName: Scalars['String'];
    /** Price of the single item in the order line without applied an order line discount. */
    undiscountedUnitPrice: TaxedMoney;
    /** The discount applied to the single order line. */
    unitDiscount: Money;
    unitDiscountReason?: Maybe<Scalars['String']>;
    /** Type of the discount: fixed or percent */
    unitDiscountType?: Maybe<DiscountValueTypeEnum>;
    /** Value of the discount. Can store fixed value or percent value */
    unitDiscountValue: Scalars['PositiveDecimal'];
    /** Price of the single item in the order line. */
    unitPrice: TaxedMoney;
    /** A purchased product variant. Note: this field may be null if the variant has been removed from stock at all. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
    variant?: Maybe<ProductVariant>;
    variantName: Scalars['String'];
  };

/** Represents order line of particular order. */
export type OrderLineMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents order line of particular order. */
export type OrderLineMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents order line of particular order. */
export type OrderLinePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents order line of particular order. */
export type OrderLinePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents order line of particular order. */
export type OrderLineThumbnailArgs = {
  format?: InputMaybe<ThumbnailFormatEnum>;
  size?: InputMaybe<Scalars['Int']>;
};

export type OrderLineCreateInput = {
  /**
   * Flag that allow force splitting the same variant into multiple lines by skipping the matching logic.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  forceNewLine?: InputMaybe<Scalars['Boolean']>;
  /** Number of variant items ordered. */
  quantity: Scalars['Int'];
  /** Product variant ID. */
  variantId: Scalars['ID'];
};

/**
 * Deletes an order line from an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderLineDelete = {
  errors: Array<OrderError>;
  /** A related order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
  /** An order line that was deleted. */
  orderLine?: Maybe<OrderLine>;
};

/**
 * Remove discount applied to the order line.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderLineDiscountRemove = {
  errors: Array<OrderError>;
  /** Order which is related to line which has removed discount. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
  /** Order line which has removed discount. */
  orderLine?: Maybe<OrderLine>;
};

/**
 * Update discount for the order line.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderLineDiscountUpdate = {
  errors: Array<OrderError>;
  /** Order which is related to the discounted line. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
  /** Order line which has been discounted. */
  orderLine?: Maybe<OrderLine>;
};

export type OrderLineInput = {
  /** Number of variant items ordered. */
  quantity: Scalars['Int'];
};

/**
 * Updates an order line of an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderLineUpdate = {
  errors: Array<OrderError>;
  /** Related order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
  orderLine?: Maybe<OrderLine>;
};

/**
 * Create order lines for an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderLinesCreate = {
  errors: Array<OrderError>;
  /** Related order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
  /** List of added order lines. */
  orderLines?: Maybe<Array<OrderLine>>;
};

/**
 * Mark order as manually paid.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderMarkAsPaid = {
  errors: Array<OrderError>;
  /** Order marked as paid. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/**
 * Event sent when order metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderMetadataUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum OrderOriginEnum {
  Checkout = 'CHECKOUT',
  Draft = 'DRAFT',
  Reissue = 'REISSUE'
}

/**
 * Refund an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderRefund = {
  errors: Array<OrderError>;
  /** A refunded order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type OrderRefundFulfillmentLineInput = {
  /** The ID of the fulfillment line to refund. */
  fulfillmentLineId: Scalars['ID'];
  /** The number of items to be refunded. */
  quantity: Scalars['Int'];
};

export type OrderRefundLineInput = {
  /** The ID of the order line to refund. */
  orderLineId: Scalars['ID'];
  /** The number of items to be refunded. */
  quantity: Scalars['Int'];
};

export type OrderRefundProductsInput = {
  /** The total amount of refund when the value is provided manually. */
  amountToRefund?: InputMaybe<Scalars['PositiveDecimal']>;
  /** List of fulfilled lines to refund. */
  fulfillmentLines?: InputMaybe<Array<OrderRefundFulfillmentLineInput>>;
  /** If true, Saleor will refund shipping costs. If amountToRefund is providedincludeShippingCosts will be ignored. */
  includeShippingCosts?: InputMaybe<Scalars['Boolean']>;
  /** List of unfulfilled lines to refund. */
  orderLines?: InputMaybe<Array<OrderRefundLineInput>>;
};

export type OrderReturnFulfillmentLineInput = {
  /** The ID of the fulfillment line to return. */
  fulfillmentLineId: Scalars['ID'];
  /** The number of items to be returned. */
  quantity: Scalars['Int'];
  /** Determines, if the line should be added to replace order. */
  replace?: InputMaybe<Scalars['Boolean']>;
};

export type OrderReturnLineInput = {
  /** The ID of the order line to return. */
  orderLineId: Scalars['ID'];
  /** The number of items to be returned. */
  quantity: Scalars['Int'];
  /** Determines, if the line should be added to replace order. */
  replace?: InputMaybe<Scalars['Boolean']>;
};

export type OrderReturnProductsInput = {
  /** The total amount of refund when the value is provided manually. */
  amountToRefund?: InputMaybe<Scalars['PositiveDecimal']>;
  /** List of fulfilled lines to return. */
  fulfillmentLines?: InputMaybe<Array<OrderReturnFulfillmentLineInput>>;
  /** If true, Saleor will refund shipping costs. If amountToRefund is providedincludeShippingCosts will be ignored. */
  includeShippingCosts?: InputMaybe<Scalars['Boolean']>;
  /** List of unfulfilled lines to return. */
  orderLines?: InputMaybe<Array<OrderReturnLineInput>>;
  /** If true, Saleor will call refund action for all lines. */
  refund?: InputMaybe<Scalars['Boolean']>;
};

/** Represents the channel-specific order settings. */
export type OrderSettings = {
  /** When disabled, all new orders from checkout will be marked as unconfirmed. When enabled orders from checkout will become unfulfilled immediately. */
  automaticallyConfirmAllNewOrders: Scalars['Boolean'];
  /** When enabled, all non-shippable gift card orders will be fulfilled automatically. */
  automaticallyFulfillNonShippableGiftCard: Scalars['Boolean'];
};

export type OrderSettingsError = {
  /** The error code. */
  code: OrderSettingsErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum OrderSettingsErrorCode {
  Invalid = 'INVALID'
}

export type OrderSettingsInput = {
  /** When disabled, all new orders from checkout will be marked as unconfirmed. When enabled orders from checkout will become unfulfilled immediately. By default set to True */
  automaticallyConfirmAllNewOrders?: InputMaybe<Scalars['Boolean']>;
  /** When enabled, all non-shippable gift card orders will be fulfilled automatically. By defualt set to True. */
  automaticallyFulfillNonShippableGiftCard?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Update shop order settings across all channels. Returns `orderSettings` for the first `channel` in alphabetical order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderSettingsUpdate = {
  errors: Array<OrderSettingsError>;
  /** Order settings. */
  orderSettings?: Maybe<OrderSettings>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderSettingsErrors: Array<OrderSettingsError>;
};

export type OrderSettingsUpdateInput = {
  /** When disabled, all new orders from checkout will be marked as unconfirmed. When enabled orders from checkout will become unfulfilled immediately. By default set to True */
  automaticallyConfirmAllNewOrders?: InputMaybe<Scalars['Boolean']>;
  /** When enabled, all non-shippable gift card orders will be fulfilled automatically. By defualt set to True. */
  automaticallyFulfillNonShippableGiftCard?: InputMaybe<Scalars['Boolean']>;
};

export enum OrderSortField {
  /**
   * Sort orders by creation date.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  CreatedAt = 'CREATED_AT',
  /**
   * Sort orders by creation date.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  CreationDate = 'CREATION_DATE',
  /** Sort orders by customer. */
  Customer = 'CUSTOMER',
  /** Sort orders by fulfillment status. */
  FulfillmentStatus = 'FULFILLMENT_STATUS',
  /** Sort orders by last modified at. */
  LastModifiedAt = 'LAST_MODIFIED_AT',
  /** Sort orders by number. */
  Number = 'NUMBER',
  /** Sort orders by payment. */
  Payment = 'PAYMENT',
  /** Sort orders by rank. Note: This option is available only with the `search` filter. */
  Rank = 'RANK'
}

export type OrderSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort orders by the selected field. */
  field: OrderSortField;
};

/** An enumeration. */
export enum OrderStatus {
  Canceled = 'CANCELED',
  Draft = 'DRAFT',
  Fulfilled = 'FULFILLED',
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  PartiallyReturned = 'PARTIALLY_RETURNED',
  Returned = 'RETURNED',
  Unconfirmed = 'UNCONFIRMED',
  Unfulfilled = 'UNFULFILLED'
}

export enum OrderStatusFilter {
  Canceled = 'CANCELED',
  Fulfilled = 'FULFILLED',
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  ReadyToCapture = 'READY_TO_CAPTURE',
  ReadyToFulfill = 'READY_TO_FULFILL',
  Unconfirmed = 'UNCONFIRMED',
  Unfulfilled = 'UNFULFILLED'
}

/**
 * Updates an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderUpdate = {
  errors: Array<OrderError>;
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type OrderUpdateInput = {
  /** Billing address of the customer. */
  billingAddress?: InputMaybe<AddressInput>;
  /**
   * External ID of this order.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** Shipping address of the customer. */
  shippingAddress?: InputMaybe<AddressInput>;
  /** Email address of the customer. */
  userEmail?: InputMaybe<Scalars['String']>;
};

/**
 * Updates a shipping method of the order. Requires shipping method ID to update, when null is passed then currently assigned shipping method is removed.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderUpdateShipping = {
  errors: Array<OrderError>;
  /** Order with updated shipping method. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

export type OrderUpdateShippingInput = {
  /** ID of the selected shipping method, pass null to remove currently assigned shipping method. */
  shippingMethod?: InputMaybe<Scalars['ID']>;
};

/**
 * Event sent when order is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type OrderUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The order the event relates to. */
  order?: Maybe<Order>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Void an order.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type OrderVoid = {
  errors: Array<OrderError>;
  /** A voided order. */
  order?: Maybe<Order>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  orderErrors: Array<OrderError>;
};

/** A static page that can be manually added by a shop operator through the dashboard. */
export type Page = Node &
  ObjectWithMetadata & {
    /** List of attributes assigned to this product. */
    attributes: Array<SelectedAttribute>;
    /**
     * Content of the page.
     *
     * Rich text format. For reference see https://editorjs.io/
     */
    content?: Maybe<Scalars['JSONString']>;
    /**
     * Content of the page.
     *
     * Rich text format. For reference see https://editorjs.io/
     * @deprecated This field will be removed in Saleor 4.0. Use the `content` field instead.
     */
    contentJson: Scalars['JSONString'];
    created: Scalars['DateTime'];
    id: Scalars['ID'];
    isPublished: Scalars['Boolean'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    pageType: PageType;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** @deprecated This field will be removed in Saleor 4.0. Use the `publishedAt` field to fetch the publication date. */
    publicationDate?: Maybe<Scalars['Date']>;
    /**
     * The page publication date.
     *
     * Added in Saleor 3.3.
     */
    publishedAt?: Maybe<Scalars['DateTime']>;
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    slug: Scalars['String'];
    title: Scalars['String'];
    /** Returns translated page fields for the given language code. */
    translation?: Maybe<PageTranslation>;
  };

/** A static page that can be manually added by a shop operator through the dashboard. */
export type PageMetafieldArgs = {
  key: Scalars['String'];
};

/** A static page that can be manually added by a shop operator through the dashboard. */
export type PageMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** A static page that can be manually added by a shop operator through the dashboard. */
export type PagePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** A static page that can be manually added by a shop operator through the dashboard. */
export type PagePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** A static page that can be manually added by a shop operator through the dashboard. */
export type PageTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Assign attributes to a given page type.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type PageAttributeAssign = {
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
  /** The updated page type. */
  pageType?: Maybe<PageType>;
};

/**
 * Unassign attributes from a given page type.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type PageAttributeUnassign = {
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
  /** The updated page type. */
  pageType?: Maybe<PageType>;
};

/**
 * Deletes pages.
 *
 * Requires one of the following permissions: MANAGE_PAGES.
 */
export type PageBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
};

/**
 * Publish pages.
 *
 * Requires one of the following permissions: MANAGE_PAGES.
 */
export type PageBulkPublish = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
};

export type PageCountableConnection = {
  edges: Array<PageCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Page;
};

/**
 * Creates a new page.
 *
 * Requires one of the following permissions: MANAGE_PAGES.
 */
export type PageCreate = {
  errors: Array<PageError>;
  page?: Maybe<Page>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
};

export type PageCreateInput = {
  /** List of attributes. */
  attributes?: InputMaybe<Array<AttributeValueInput>>;
  /**
   * Page content.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  content?: InputMaybe<Scalars['JSONString']>;
  /** Determines if page is visible in the storefront. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /** ID of the page type that page belongs to. */
  pageType: Scalars['ID'];
  /**
   * Publication date. ISO 8601 standard.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `publishedAt` field instead.
   */
  publicationDate?: InputMaybe<Scalars['String']>;
  /**
   * Publication date time. ISO 8601 standard.
   *
   * Added in Saleor 3.3.
   */
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Page internal name. */
  slug?: InputMaybe<Scalars['String']>;
  /** Page title. */
  title?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new page is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PageCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The page the event relates to. */
  page?: Maybe<Page>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes a page.
 *
 * Requires one of the following permissions: MANAGE_PAGES.
 */
export type PageDelete = {
  errors: Array<PageError>;
  page?: Maybe<Page>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
};

/**
 * Event sent when page is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PageDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The page the event relates to. */
  page?: Maybe<Page>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type PageError = {
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: PageErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of attribute values IDs which causes the error. */
  values?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum PageErrorCode {
  AttributeAlreadyAssigned = 'ATTRIBUTE_ALREADY_ASSIGNED',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PageFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  pageTypes?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PageInput = {
  /** List of attributes. */
  attributes?: InputMaybe<Array<AttributeValueInput>>;
  /**
   * Page content.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  content?: InputMaybe<Scalars['JSONString']>;
  /** Determines if page is visible in the storefront. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /**
   * Publication date. ISO 8601 standard.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `publishedAt` field instead.
   */
  publicationDate?: InputMaybe<Scalars['String']>;
  /**
   * Publication date time. ISO 8601 standard.
   *
   * Added in Saleor 3.3.
   */
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Page internal name. */
  slug?: InputMaybe<Scalars['String']>;
  /** Page title. */
  title?: InputMaybe<Scalars['String']>;
};

/**
 * Reorder page attribute values.
 *
 * Requires one of the following permissions: MANAGE_PAGES.
 */
export type PageReorderAttributeValues = {
  errors: Array<PageError>;
  /** Page from which attribute values are reordered. */
  page?: Maybe<Page>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
};

export enum PageSortField {
  /**
   * Sort pages by creation date.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  CreatedAt = 'CREATED_AT',
  /**
   * Sort pages by creation date.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  CreationDate = 'CREATION_DATE',
  /**
   * Sort pages by publication date.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  PublicationDate = 'PUBLICATION_DATE',
  /**
   * Sort pages by publication date.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.
   */
  PublishedAt = 'PUBLISHED_AT',
  /** Sort pages by slug. */
  Slug = 'SLUG',
  /** Sort pages by title. */
  Title = 'TITLE',
  /** Sort pages by visibility. */
  Visibility = 'VISIBILITY'
}

export type PageSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort pages by the selected field. */
  field: PageSortField;
};

export type PageTranslatableContent = Node & {
  /** List of page content attribute values that can be translated. */
  attributeValues: Array<AttributeValueTranslatableContent>;
  /**
   * Content of the page.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  content?: Maybe<Scalars['JSONString']>;
  /**
   * Content of the page.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `content` field instead.
   */
  contentJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  /**
   * A static page that can be manually added by a shop operator through the dashboard.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  page?: Maybe<Page>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** Returns translated page fields for the given language code. */
  translation?: Maybe<PageTranslation>;
};

export type PageTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a page.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type PageTranslate = {
  errors: Array<TranslationError>;
  page?: Maybe<PageTranslatableContent>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type PageTranslation = Node & {
  /**
   * Translated content of the page.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  content?: Maybe<Scalars['JSONString']>;
  /**
   * Translated description of the page.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `content` field instead.
   */
  contentJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PageTranslationInput = {
  /**
   * Translated page content.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  content?: InputMaybe<Scalars['JSONString']>;
  seoDescription?: InputMaybe<Scalars['String']>;
  seoTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** Represents a type of page. It defines what attributes are available to pages of this type. */
export type PageType = Node &
  ObjectWithMetadata & {
    /** Page attributes of that page type. */
    attributes?: Maybe<Array<Attribute>>;
    /**
     * Attributes that can be assigned to the page type.
     *
     * Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
     */
    availableAttributes?: Maybe<AttributeCountableConnection>;
    /**
     * Whether page type has pages assigned.
     *
     * Requires one of the following permissions: MANAGE_PAGES, MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
     */
    hasPages?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    slug: Scalars['String'];
  };

/** Represents a type of page. It defines what attributes are available to pages of this type. */
export type PageTypeAvailableAttributesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AttributeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AttributeWhereInput>;
};

/** Represents a type of page. It defines what attributes are available to pages of this type. */
export type PageTypeMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a type of page. It defines what attributes are available to pages of this type. */
export type PageTypeMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a type of page. It defines what attributes are available to pages of this type. */
export type PageTypePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a type of page. It defines what attributes are available to pages of this type. */
export type PageTypePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Delete page types.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type PageTypeBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
};

export type PageTypeCountableConnection = {
  edges: Array<PageTypeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageTypeCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: PageType;
};

/**
 * Create a new page type.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type PageTypeCreate = {
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
  pageType?: Maybe<PageType>;
};

export type PageTypeCreateInput = {
  /** List of attribute IDs to be assigned to the page type. */
  addAttributes?: InputMaybe<Array<Scalars['ID']>>;
  /** Name of the page type. */
  name?: InputMaybe<Scalars['String']>;
  /** Page type slug. */
  slug?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new page type is created.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PageTypeCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The page type the event relates to. */
  pageType?: Maybe<PageType>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Delete a page type.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type PageTypeDelete = {
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
  pageType?: Maybe<PageType>;
};

/**
 * Event sent when page type is deleted.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PageTypeDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The page type the event relates to. */
  pageType?: Maybe<PageType>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type PageTypeFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Reorder the attributes of a page type.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type PageTypeReorderAttributes = {
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
  /** Page type from which attributes are reordered. */
  pageType?: Maybe<PageType>;
};

export enum PageTypeSortField {
  /** Sort page types by name. */
  Name = 'NAME',
  /** Sort page types by slug. */
  Slug = 'SLUG'
}

export type PageTypeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort page types by the selected field. */
  field: PageTypeSortField;
};

/**
 * Update page type.
 *
 * Requires one of the following permissions: MANAGE_PAGE_TYPES_AND_ATTRIBUTES.
 */
export type PageTypeUpdate = {
  errors: Array<PageError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
  pageType?: Maybe<PageType>;
};

export type PageTypeUpdateInput = {
  /** List of attribute IDs to be assigned to the page type. */
  addAttributes?: InputMaybe<Array<Scalars['ID']>>;
  /** Name of the page type. */
  name?: InputMaybe<Scalars['String']>;
  /** List of attribute IDs to be assigned to the page type. */
  removeAttributes?: InputMaybe<Array<Scalars['ID']>>;
  /** Page type slug. */
  slug?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when page type is updated.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PageTypeUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The page type the event relates to. */
  pageType?: Maybe<PageType>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Updates an existing page.
 *
 * Requires one of the following permissions: MANAGE_PAGES.
 */
export type PageUpdate = {
  errors: Array<PageError>;
  page?: Maybe<Page>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pageErrors: Array<PageError>;
};

/**
 * Event sent when page is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PageUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The page the event relates to. */
  page?: Maybe<Page>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Change the password of the logged in user.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type PasswordChange = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** A user instance with a new password. */
  user?: Maybe<User>;
};

/** Represents a payment of a given type. */
export type Payment = Node &
  ObjectWithMetadata & {
    /**
     * List of actions that can be performed in the current state of a payment.
     *
     * Requires one of the following permissions: MANAGE_ORDERS.
     */
    actions: Array<OrderAction>;
    /**
     * Maximum amount of money that can be captured.
     *
     * Requires one of the following permissions: MANAGE_ORDERS.
     */
    availableCaptureAmount?: Maybe<Money>;
    /**
     * Maximum amount of money that can be refunded.
     *
     * Requires one of the following permissions: MANAGE_ORDERS.
     */
    availableRefundAmount?: Maybe<Money>;
    /** Total amount captured for this payment. */
    capturedAmount?: Maybe<Money>;
    /** Internal payment status. */
    chargeStatus: PaymentChargeStatusEnum;
    checkout?: Maybe<Checkout>;
    created: Scalars['DateTime'];
    /** The details of the card used for this payment. */
    creditCard?: Maybe<CreditCard>;
    /**
     * IP address of the user who created the payment.
     *
     * Requires one of the following permissions: MANAGE_ORDERS.
     */
    customerIpAddress?: Maybe<Scalars['String']>;
    gateway: Scalars['String'];
    id: Scalars['ID'];
    isActive: Scalars['Boolean'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    modified: Scalars['DateTime'];
    order?: Maybe<Order>;
    paymentMethodType: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    token: Scalars['String'];
    /** Total amount of the payment. */
    total?: Maybe<Money>;
    /**
     * List of all transactions within this payment.
     *
     * Requires one of the following permissions: MANAGE_ORDERS.
     */
    transactions?: Maybe<Array<Transaction>>;
  };

/** Represents a payment of a given type. */
export type PaymentMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a payment of a given type. */
export type PaymentMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a payment of a given type. */
export type PaymentPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a payment of a given type. */
export type PaymentPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Authorize payment.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PaymentAuthorize = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** Look up a payment. */
  payment?: Maybe<Payment>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Captures the authorized payment amount.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type PaymentCapture = {
  errors: Array<PaymentError>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  paymentErrors: Array<PaymentError>;
};

/**
 * Capture payment.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PaymentCaptureEvent = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** Look up a payment. */
  payment?: Maybe<Payment>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum PaymentChargeStatusEnum {
  Cancelled = 'CANCELLED',
  FullyCharged = 'FULLY_CHARGED',
  FullyRefunded = 'FULLY_REFUNDED',
  NotCharged = 'NOT_CHARGED',
  PartiallyCharged = 'PARTIALLY_CHARGED',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  Pending = 'PENDING',
  Refused = 'REFUSED'
}

/** Check payment balance. */
export type PaymentCheckBalance = {
  /** Response from the gateway. */
  data?: Maybe<Scalars['JSONString']>;
  errors: Array<PaymentError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  paymentErrors: Array<PaymentError>;
};

export type PaymentCheckBalanceInput = {
  /** Information about card. */
  card: CardInput;
  /** Slug of a channel for which the data should be returned. */
  channel: Scalars['String'];
  /** An ID of a payment gateway to check. */
  gatewayId: Scalars['String'];
  /** Payment method name. */
  method: Scalars['String'];
};

/**
 * Confirm payment.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PaymentConfirmEvent = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** Look up a payment. */
  payment?: Maybe<Payment>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type PaymentCountableConnection = {
  edges: Array<PaymentCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaymentCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Payment;
};

export type PaymentError = {
  /** The error code. */
  code: PaymentErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of variant IDs which causes the error. */
  variants?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum PaymentErrorCode {
  BalanceCheckError = 'BALANCE_CHECK_ERROR',
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  ChannelInactive = 'CHANNEL_INACTIVE',
  CheckoutEmailNotSet = 'CHECKOUT_EMAIL_NOT_SET',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
  NotFound = 'NOT_FOUND',
  NotSupportedGateway = 'NOT_SUPPORTED_GATEWAY',
  NoCheckoutLines = 'NO_CHECKOUT_LINES',
  PartialPaymentNotAllowed = 'PARTIAL_PAYMENT_NOT_ALLOWED',
  PaymentError = 'PAYMENT_ERROR',
  Required = 'REQUIRED',
  ShippingAddressNotSet = 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotSet = 'SHIPPING_METHOD_NOT_SET',
  UnavailableVariantInChannel = 'UNAVAILABLE_VARIANT_IN_CHANNEL',
  Unique = 'UNIQUE'
}

export type PaymentFilterInput = {
  checkouts?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Filter by ids.
   *
   * Added in Saleor 3.8.
   */
  ids?: InputMaybe<Array<Scalars['ID']>>;
};

/** Available payment gateway backend with configuration necessary to setup client. */
export type PaymentGateway = {
  /** Payment gateway client configuration. */
  config: Array<GatewayConfigLine>;
  /** Payment gateway supported currencies. */
  currencies: Array<Scalars['String']>;
  /** Payment gateway ID. */
  id: Scalars['ID'];
  /** Payment gateway name. */
  name: Scalars['String'];
};

/** Initializes payment process when it is required by gateway. */
export type PaymentInitialize = {
  errors: Array<PaymentError>;
  initializedPayment?: Maybe<PaymentInitialized>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  paymentErrors: Array<PaymentError>;
};

/** Server-side data generated by a payment gateway. Optional step when the payment provider requires an additional action to initialize payment session. */
export type PaymentInitialized = {
  /** Initialized data by gateway. */
  data?: Maybe<Scalars['JSONString']>;
  /** ID of a payment gateway. */
  gateway: Scalars['String'];
  /** Payment gateway name. */
  name: Scalars['String'];
};

export type PaymentInput = {
  /** Total amount of the transaction, including all taxes and discounts. If no amount is provided, the checkout total will be used. */
  amount?: InputMaybe<Scalars['PositiveDecimal']>;
  /** A gateway to use with that payment. */
  gateway: Scalars['String'];
  /**
   * User public metadata.
   *
   * Added in Saleor 3.1.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** URL of a storefront view where user should be redirected after requiring additional actions. Payment with additional actions will not be finished if this field is not provided. */
  returnUrl?: InputMaybe<Scalars['String']>;
  /**
   * Payment store type.
   *
   * Added in Saleor 3.1.
   */
  storePaymentMethod?: InputMaybe<StorePaymentMethodEnum>;
  /** Client-side generated payment token, representing customer's billing data in a secure manner. */
  token?: InputMaybe<Scalars['String']>;
};

/**
 * List payment gateways.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PaymentListGateways = Event & {
  /** The checkout the event relates to. */
  checkout?: Maybe<Checkout>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Process payment.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PaymentProcessEvent = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** Look up a payment. */
  payment?: Maybe<Payment>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Refunds the captured payment amount.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type PaymentRefund = {
  errors: Array<PaymentError>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  paymentErrors: Array<PaymentError>;
};

/**
 * Refund payment.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PaymentRefundEvent = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** Look up a payment. */
  payment?: Maybe<Payment>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents a payment source stored for user in payment gateway, such as credit card. */
export type PaymentSource = {
  /** Stored credit card details if available. */
  creditCardInfo?: Maybe<CreditCard>;
  /** Payment gateway name. */
  gateway: Scalars['String'];
  /**
   * List of public metadata items.
   *
   * Added in Saleor 3.1.
   *
   * Can be accessed without permissions.
   */
  metadata: Array<MetadataItem>;
  /** ID of stored payment method. */
  paymentMethodId?: Maybe<Scalars['String']>;
};

/**
 * Voids the authorized payment.
 *
 * Requires one of the following permissions: MANAGE_ORDERS.
 */
export type PaymentVoid = {
  errors: Array<PaymentError>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  paymentErrors: Array<PaymentError>;
};

/**
 * Void payment.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PaymentVoidEvent = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** Look up a payment. */
  payment?: Maybe<Payment>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Represents a permission object in a friendly form. */
export type Permission = {
  /** Internal code for permission. */
  code: PermissionEnum;
  /** Describe action(s) allowed to do by permission. */
  name: Scalars['String'];
};

/** An enumeration. */
export enum PermissionEnum {
  HandleCheckouts = 'HANDLE_CHECKOUTS',
  HandlePayments = 'HANDLE_PAYMENTS',
  HandleTaxes = 'HANDLE_TAXES',
  ImpersonateUser = 'IMPERSONATE_USER',
  ManageApps = 'MANAGE_APPS',
  ManageChannels = 'MANAGE_CHANNELS',
  ManageCheckouts = 'MANAGE_CHECKOUTS',
  ManageDiscounts = 'MANAGE_DISCOUNTS',
  ManageGiftCard = 'MANAGE_GIFT_CARD',
  ManageMenus = 'MANAGE_MENUS',
  ManageObservability = 'MANAGE_OBSERVABILITY',
  ManageOrders = 'MANAGE_ORDERS',
  ManagePages = 'MANAGE_PAGES',
  ManagePageTypesAndAttributes = 'MANAGE_PAGE_TYPES_AND_ATTRIBUTES',
  ManagePlugins = 'MANAGE_PLUGINS',
  ManageProducts = 'MANAGE_PRODUCTS',
  ManageProductTypesAndAttributes = 'MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES',
  ManageSettings = 'MANAGE_SETTINGS',
  ManageShipping = 'MANAGE_SHIPPING',
  ManageStaff = 'MANAGE_STAFF',
  ManageTaxes = 'MANAGE_TAXES',
  ManageTranslations = 'MANAGE_TRANSLATIONS',
  ManageUsers = 'MANAGE_USERS'
}

/**
 * Create new permission group. Apps are not allowed to perform this mutation.
 *
 * Requires one of the following permissions: MANAGE_STAFF.
 */
export type PermissionGroupCreate = {
  errors: Array<PermissionGroupError>;
  group?: Maybe<Group>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  permissionGroupErrors: Array<PermissionGroupError>;
};

export type PermissionGroupCreateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: InputMaybe<Array<Scalars['ID']>>;
  /** Group name. */
  name: Scalars['String'];
};

/**
 * Event sent when new permission group is created.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PermissionGroupCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The permission group the event relates to. */
  permissionGroup?: Maybe<Group>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Delete permission group. Apps are not allowed to perform this mutation.
 *
 * Requires one of the following permissions: MANAGE_STAFF.
 */
export type PermissionGroupDelete = {
  errors: Array<PermissionGroupError>;
  group?: Maybe<Group>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  permissionGroupErrors: Array<PermissionGroupError>;
};

/**
 * Event sent when permission group is deleted.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PermissionGroupDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The permission group the event relates to. */
  permissionGroup?: Maybe<Group>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type PermissionGroupError = {
  /** The error code. */
  code: PermissionGroupErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
  /** List of user IDs which causes the error. */
  users?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum PermissionGroupErrorCode {
  AssignNonStaffMember = 'ASSIGN_NON_STAFF_MEMBER',
  CannotRemoveFromLastGroup = 'CANNOT_REMOVE_FROM_LAST_GROUP',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  LeftNotManageablePermission = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  OutOfScopeUser = 'OUT_OF_SCOPE_USER',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PermissionGroupFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
};

export enum PermissionGroupSortField {
  /** Sort permission group accounts by name. */
  Name = 'NAME'
}

export type PermissionGroupSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort permission group by the selected field. */
  field: PermissionGroupSortField;
};

/**
 * Update permission group. Apps are not allowed to perform this mutation.
 *
 * Requires one of the following permissions: MANAGE_STAFF.
 */
export type PermissionGroupUpdate = {
  errors: Array<PermissionGroupError>;
  group?: Maybe<Group>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  permissionGroupErrors: Array<PermissionGroupError>;
};

export type PermissionGroupUpdateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: InputMaybe<Array<Scalars['ID']>>;
  /** Group name. */
  name?: InputMaybe<Scalars['String']>;
  /** List of permission code names to unassign from this group. */
  removePermissions?: InputMaybe<Array<PermissionEnum>>;
  /** List of users to unassign from this group. */
  removeUsers?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Event sent when permission group is updated.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type PermissionGroupUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The permission group the event relates to. */
  permissionGroup?: Maybe<Group>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Plugin. */
export type Plugin = {
  /** Channel-specific plugin configuration. */
  channelConfigurations: Array<PluginConfiguration>;
  /** Description of the plugin. */
  description: Scalars['String'];
  /** Global configuration of the plugin (not channel-specific). */
  globalConfiguration?: Maybe<PluginConfiguration>;
  /** Identifier of the plugin. */
  id: Scalars['ID'];
  /** Name of the plugin. */
  name: Scalars['String'];
};

/** Stores information about a configuration of plugin. */
export type PluginConfiguration = {
  /** Determines if plugin is active or not. */
  active: Scalars['Boolean'];
  /** The channel to which the plugin configuration is assigned to. */
  channel?: Maybe<Channel>;
  /** Configuration of the plugin. */
  configuration?: Maybe<Array<ConfigurationItem>>;
};

export enum PluginConfigurationType {
  Global = 'GLOBAL',
  PerChannel = 'PER_CHANNEL'
}

export type PluginCountableConnection = {
  edges: Array<PluginCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PluginCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Plugin;
};

export type PluginError = {
  /** The error code. */
  code: PluginErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum PluginErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  PluginMisconfigured = 'PLUGIN_MISCONFIGURED',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PluginFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  statusInChannels?: InputMaybe<PluginStatusInChannelsInput>;
  type?: InputMaybe<PluginConfigurationType>;
};

export enum PluginSortField {
  IsActive = 'IS_ACTIVE',
  Name = 'NAME'
}

export type PluginSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort plugins by the selected field. */
  field: PluginSortField;
};

export type PluginStatusInChannelsInput = {
  active: Scalars['Boolean'];
  channels: Array<Scalars['ID']>;
};

/**
 * Update plugin configuration.
 *
 * Requires one of the following permissions: MANAGE_PLUGINS.
 */
export type PluginUpdate = {
  errors: Array<PluginError>;
  plugin?: Maybe<Plugin>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  pluginsErrors: Array<PluginError>;
};

export type PluginUpdateInput = {
  /** Indicates whether the plugin should be enabled. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Configuration of the plugin. */
  configuration?: InputMaybe<Array<ConfigurationItemInput>>;
};

/** An enumeration. */
export enum PostalCodeRuleInclusionTypeEnum {
  Exclude = 'EXCLUDE',
  Include = 'INCLUDE'
}

/** Represents preorder settings for product variant. */
export type PreorderData = {
  /** Preorder end date. */
  endDate?: Maybe<Scalars['DateTime']>;
  /**
   * Total number of sold product variant during preorder.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  globalSoldUnits: Scalars['Int'];
  /**
   * The global preorder threshold for product variant.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  globalThreshold?: Maybe<Scalars['Int']>;
};

export type PreorderSettingsInput = {
  /** The end date for preorder. */
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** The global threshold for preorder variant. */
  globalThreshold?: InputMaybe<Scalars['Int']>;
};

/** Represents preorder variant data for channel. */
export type PreorderThreshold = {
  /** Preorder threshold for product variant in this channel. */
  quantity?: Maybe<Scalars['Int']>;
  /** Number of sold product variant in this channel. */
  soldUnits: Scalars['Int'];
};

export type PriceInput = {
  /** Amount of money. */
  amount: Scalars['PositiveDecimal'];
  /** Currency code. */
  currency: Scalars['String'];
};

export type PriceRangeInput = {
  /** Price greater than or equal to. */
  gte?: InputMaybe<Scalars['Float']>;
  /** Price less than or equal to. */
  lte?: InputMaybe<Scalars['Float']>;
};

/** Represents an individual item for sale in the storefront. */
export type Product = Node &
  ObjectWithMetadata & {
    /**
     * Get a single attribute attached to product by attribute slug.
     *
     * Added in Saleor 3.9.
     */
    attribute?: Maybe<SelectedAttribute>;
    /** List of attributes assigned to this product. */
    attributes: Array<SelectedAttribute>;
    /**
     * Date when product is available for purchase.
     * @deprecated This field will be removed in Saleor 4.0. Use the `availableForPurchaseAt` field to fetch the available for purchase date.
     */
    availableForPurchase?: Maybe<Scalars['Date']>;
    /** Date when product is available for purchase. */
    availableForPurchaseAt?: Maybe<Scalars['DateTime']>;
    category?: Maybe<Category>;
    /** Channel given to retrieve this product. Also used by federation gateway to resolve this object in a federated query. */
    channel?: Maybe<Scalars['String']>;
    /**
     * List of availability in channels for the product.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS.
     */
    channelListings?: Maybe<Array<ProductChannelListing>>;
    /** @deprecated This field will be removed in Saleor 4.0. Use `Channel.taxConfiguration` field to determine whether tax collection is enabled. */
    chargeTaxes: Scalars['Boolean'];
    /** List of collections for the product. Requires the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
    collections?: Maybe<Array<Collection>>;
    created: Scalars['DateTime'];
    defaultVariant?: Maybe<ProductVariant>;
    /**
     * Description of the product.
     *
     * Rich text format. For reference see https://editorjs.io/
     */
    description?: Maybe<Scalars['JSONString']>;
    /**
     * Description of the product.
     *
     * Rich text format. For reference see https://editorjs.io/
     * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
     */
    descriptionJson?: Maybe<Scalars['JSONString']>;
    /**
     * External ID of this product.
     *
     * Added in Saleor 3.10.
     */
    externalReference?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    /**
     * Get a single product image by ID.
     * @deprecated This field will be removed in Saleor 4.0. Use the `mediaById` field instead.
     */
    imageById?: Maybe<ProductImage>;
    /**
     * List of images for the product.
     * @deprecated This field will be removed in Saleor 4.0. Use the `media` field instead.
     */
    images?: Maybe<Array<ProductImage>>;
    /** Whether the product is in stock and visible or not. */
    isAvailable?: Maybe<Scalars['Boolean']>;
    /** Whether the product is available for purchase. */
    isAvailableForPurchase?: Maybe<Scalars['Boolean']>;
    /** List of media for the product. */
    media?: Maybe<Array<ProductMedia>>;
    /** Get a single product media by ID. */
    mediaById?: Maybe<ProductMedia>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** Lists the storefront product's pricing, the current price and discounts, only meant for displaying. */
    pricing?: Maybe<ProductPricingInfo>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    productType: ProductType;
    rating?: Maybe<Scalars['Float']>;
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    slug: Scalars['String'];
    /**
     * Tax class assigned to this product type. All products of this product type use this tax class, unless it's overridden in the `Product` type.
     *
     * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
     */
    taxClass?: Maybe<TaxClass>;
    /**
     * A type of tax. Assigned by enabled tax gateway
     * @deprecated This field will be removed in Saleor 4.0. Use `taxClass` field instead.
     */
    taxType?: Maybe<TaxType>;
    thumbnail?: Maybe<Image>;
    /** Returns translated product fields for the given language code. */
    translation?: Maybe<ProductTranslation>;
    updatedAt: Scalars['DateTime'];
    /**
     * Get a single variant by SKU or ID.
     *
     * Added in Saleor 3.9.
     * @deprecated This field will be removed in Saleor 4.0. Use top-level `variant` query.
     */
    variant?: Maybe<ProductVariant>;
    /** List of variants for the product. Requires the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
    variants?: Maybe<Array<ProductVariant>>;
    weight?: Maybe<Weight>;
  };

/** Represents an individual item for sale in the storefront. */
export type ProductAttributeArgs = {
  slug: Scalars['String'];
};

/** Represents an individual item for sale in the storefront. */
export type ProductImageByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductIsAvailableArgs = {
  address?: InputMaybe<AddressInput>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductMediaArgs = {
  sortBy?: InputMaybe<MediaSortingInput>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductMediaByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an individual item for sale in the storefront. */
export type ProductMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductPricingArgs = {
  address?: InputMaybe<AddressInput>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents an individual item for sale in the storefront. */
export type ProductPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductThumbnailArgs = {
  format?: InputMaybe<ThumbnailFormatEnum>;
  size?: InputMaybe<Scalars['Int']>;
};

/** Represents an individual item for sale in the storefront. */
export type ProductTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Represents an individual item for sale in the storefront. */
export type ProductVariantArgs = {
  id?: InputMaybe<Scalars['ID']>;
  sku?: InputMaybe<Scalars['String']>;
};

/**
 * Assign attributes to a given product type.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductAttributeAssign = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  /** The updated product type. */
  productType?: Maybe<ProductType>;
};

export type ProductAttributeAssignInput = {
  /** The ID of the attribute to assign. */
  id: Scalars['ID'];
  /** The attribute type to be assigned as. */
  type: ProductAttributeType;
  /**
   * Whether attribute is allowed in variant selection. Allowed types are: ['dropdown', 'boolean', 'swatch', 'numeric'].
   *
   * Added in Saleor 3.1.
   */
  variantSelection?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Update attributes assigned to product variant for given product type.
 *
 * Added in Saleor 3.1.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductAttributeAssignmentUpdate = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  /** The updated product type. */
  productType?: Maybe<ProductType>;
};

export type ProductAttributeAssignmentUpdateInput = {
  /** The ID of the attribute to assign. */
  id: Scalars['ID'];
  /**
   * Whether attribute is allowed in variant selection. Allowed types are: ['dropdown', 'boolean', 'swatch', 'numeric'].
   *
   * Added in Saleor 3.1.
   */
  variantSelection: Scalars['Boolean'];
};

export enum ProductAttributeType {
  Product = 'PRODUCT',
  Variant = 'VARIANT'
}

/**
 * Un-assign attributes from a given product type.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductAttributeUnassign = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  /** The updated product type. */
  productType?: Maybe<ProductType>;
};

/**
 * Deletes products.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/** Represents product channel listing. */
export type ProductChannelListing = Node & {
  /** @deprecated This field will be removed in Saleor 4.0. Use the `availableForPurchaseAt` field to fetch the available for purchase date. */
  availableForPurchase?: Maybe<Scalars['Date']>;
  /**
   * The product available for purchase date time.
   *
   * Added in Saleor 3.3.
   */
  availableForPurchaseAt?: Maybe<Scalars['DateTime']>;
  channel: Channel;
  /** The price of the cheapest variant (including discounts). */
  discountedPrice?: Maybe<Money>;
  id: Scalars['ID'];
  /** Whether the product is available for purchase. */
  isAvailableForPurchase?: Maybe<Scalars['Boolean']>;
  isPublished: Scalars['Boolean'];
  /**
   * Range of margin percentage value.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  margin?: Maybe<Margin>;
  /** Lists the storefront product's pricing, the current price and discounts, only meant for displaying. */
  pricing?: Maybe<ProductPricingInfo>;
  /** @deprecated This field will be removed in Saleor 4.0. Use the `publishedAt` field to fetch the publication date. */
  publicationDate?: Maybe<Scalars['Date']>;
  /**
   * The product publication date time.
   *
   * Added in Saleor 3.3.
   */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /**
   * Purchase cost of product.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  purchaseCost?: Maybe<MoneyRange>;
  visibleInListings: Scalars['Boolean'];
};

/** Represents product channel listing. */
export type ProductChannelListingPricingArgs = {
  address?: InputMaybe<AddressInput>;
};

export type ProductChannelListingAddInput = {
  /** List of variants to which the channel should be assigned. */
  addVariants?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * A start date time from which a product will be available for purchase. When not set and `isAvailable` is set to True, the current day is assumed.
   *
   * Added in Saleor 3.3.
   */
  availableForPurchaseAt?: InputMaybe<Scalars['DateTime']>;
  /**
   * A start date from which a product will be available for purchase. When not set and isAvailable is set to True, the current day is assumed.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `availableForPurchaseAt` field instead.
   */
  availableForPurchaseDate?: InputMaybe<Scalars['Date']>;
  /** ID of a channel. */
  channelId: Scalars['ID'];
  /** Determine if product should be available for purchase. */
  isAvailableForPurchase?: InputMaybe<Scalars['Boolean']>;
  /** Determines if object is visible to customers. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /**
   * Publication date. ISO 8601 standard.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `publishedAt` field instead.
   */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /**
   * Publication date time. ISO 8601 standard.
   *
   * Added in Saleor 3.3.
   */
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** List of variants from which the channel should be unassigned. */
  removeVariants?: InputMaybe<Array<Scalars['ID']>>;
  /** Determines if product is visible in product listings (doesn't apply to product collections). */
  visibleInListings?: InputMaybe<Scalars['Boolean']>;
};

export type ProductChannelListingError = {
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** List of channels IDs which causes the error. */
  channels?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of attribute values IDs which causes the error. */
  values?: Maybe<Array<Scalars['ID']>>;
  /** List of variants IDs which causes the error. */
  variants?: Maybe<Array<Scalars['ID']>>;
};

/**
 * Manage product's availability in channels.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductChannelListingUpdate = {
  errors: Array<ProductChannelListingError>;
  /** An updated product instance. */
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productChannelListingErrors: Array<ProductChannelListingError>;
};

export type ProductChannelListingUpdateInput = {
  /** List of channels from which the product should be unassigned. */
  removeChannels?: InputMaybe<Array<Scalars['ID']>>;
  /** List of channels to which the product should be assigned or updated. */
  updateChannels?: InputMaybe<Array<ProductChannelListingAddInput>>;
};

export type ProductCountableConnection = {
  edges: Array<ProductCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Product;
};

/**
 * Creates a new product.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductCreate = {
  errors: Array<ProductError>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export type ProductCreateInput = {
  /** List of attributes. */
  attributes?: InputMaybe<Array<AttributeValueInput>>;
  /** ID of the product's category. */
  category?: InputMaybe<Scalars['ID']>;
  /**
   * Determine if taxes are being charged for the product.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `Channel.taxConfiguration` to configure whether tax collection is enabled.
   */
  chargeTaxes?: InputMaybe<Scalars['Boolean']>;
  /** List of IDs of collections that the product belongs to. */
  collections?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Product description.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
  /**
   * External ID of this product.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the product metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Product name. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the product private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** ID of the type that product belongs to. */
  productType: Scalars['ID'];
  /** Defines the product rating value. */
  rating?: InputMaybe<Scalars['Float']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Product slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** ID of a tax class to assign to this product. If not provided, product will use the tax class which is assigned to the product type. */
  taxClass?: InputMaybe<Scalars['ID']>;
  /**
   * Tax rate for enabled tax gateway.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use tax classes to control the tax calculation for a product. If taxCode is provided, Saleor will try to find a tax class with given code (codes are stored in metadata) and assign it. If no tax class is found, it would be created and assigned.
   */
  taxCode?: InputMaybe<Scalars['String']>;
  /** Weight of the Product. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/**
 * Event sent when new product is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductCreated = Event & {
  /** The category of the product. */
  category?: Maybe<Category>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product the event relates to. */
  product?: Maybe<Product>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new product is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductCreatedProductArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a product.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductDelete = {
  errors: Array<ProductError>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Event sent when product is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductDeleted = Event & {
  /** The category of the product. */
  category?: Maybe<Category>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product the event relates to. */
  product?: Maybe<Product>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when product is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductDeletedProductArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type ProductError = {
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of attribute values IDs which causes the error. */
  values?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ProductErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  AttributeAlreadyAssigned = 'ATTRIBUTE_ALREADY_ASSIGNED',
  AttributeCannotBeAssigned = 'ATTRIBUTE_CANNOT_BE_ASSIGNED',
  AttributeVariantsDisabled = 'ATTRIBUTE_VARIANTS_DISABLED',
  CannotManageProductWithoutVariant = 'CANNOT_MANAGE_PRODUCT_WITHOUT_VARIANT',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidPrice = 'INVALID_PRICE',
  MediaAlreadyAssigned = 'MEDIA_ALREADY_ASSIGNED',
  NotFound = 'NOT_FOUND',
  NotProductsImage = 'NOT_PRODUCTS_IMAGE',
  NotProductsVariant = 'NOT_PRODUCTS_VARIANT',
  PreorderVariantCannotBeDeactivated = 'PREORDER_VARIANT_CANNOT_BE_DEACTIVATED',
  ProductNotAssignedToChannel = 'PRODUCT_NOT_ASSIGNED_TO_CHANNEL',
  ProductWithoutCategory = 'PRODUCT_WITHOUT_CATEGORY',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  UnsupportedMediaProvider = 'UNSUPPORTED_MEDIA_PROVIDER',
  VariantNoDigitalContent = 'VARIANT_NO_DIGITAL_CONTENT'
}

export enum ProductFieldEnum {
  Category = 'CATEGORY',
  ChargeTaxes = 'CHARGE_TAXES',
  Collections = 'COLLECTIONS',
  Description = 'DESCRIPTION',
  Name = 'NAME',
  ProductMedia = 'PRODUCT_MEDIA',
  ProductType = 'PRODUCT_TYPE',
  ProductWeight = 'PRODUCT_WEIGHT',
  VariantId = 'VARIANT_ID',
  VariantMedia = 'VARIANT_MEDIA',
  VariantSku = 'VARIANT_SKU',
  VariantWeight = 'VARIANT_WEIGHT'
}

export type ProductFilterInput = {
  attributes?: InputMaybe<Array<AttributeInput>>;
  /**
   * Filter by the date of availability for purchase.
   *
   * Added in Saleor 3.8.
   */
  availableFrom?: InputMaybe<Scalars['DateTime']>;
  categories?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Specifies the channel by which the data should be filtered.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['ID']>>;
  /** Filter on whether product is a gift card or not. */
  giftCard?: InputMaybe<Scalars['Boolean']>;
  hasCategory?: InputMaybe<Scalars['Boolean']>;
  hasPreorderedVariants?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Filter by availability for purchase.
   *
   * Added in Saleor 3.8.
   */
  isAvailable?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /**
   * Filter by visibility in product listings.
   *
   * Added in Saleor 3.8.
   */
  isVisibleInListing?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  /** Filter by the lowest variant price after discounts. */
  minimalPrice?: InputMaybe<PriceRangeInput>;
  price?: InputMaybe<PriceRangeInput>;
  productTypes?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Filter by the publication date.
   *
   * Added in Saleor 3.8.
   */
  publishedFrom?: InputMaybe<Scalars['DateTime']>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
  /** Filter by variants having specific stock status. */
  stockAvailability?: InputMaybe<StockAvailability>;
  stocks?: InputMaybe<ProductStockFilterInput>;
  /** Filter by when was the most recent update. */
  updatedAt?: InputMaybe<DateTimeRangeInput>;
};

/** Represents a product image. */
export type ProductImage = {
  /** The alt text of the image. */
  alt?: Maybe<Scalars['String']>;
  /** The ID of the image. */
  id: Scalars['ID'];
  /** The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
};

/** Represents a product image. */
export type ProductImageUrlArgs = {
  format?: InputMaybe<ThumbnailFormatEnum>;
  size?: InputMaybe<Scalars['Int']>;
};

export type ProductInput = {
  /** List of attributes. */
  attributes?: InputMaybe<Array<AttributeValueInput>>;
  /** ID of the product's category. */
  category?: InputMaybe<Scalars['ID']>;
  /**
   * Determine if taxes are being charged for the product.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `Channel.taxConfiguration` to configure whether tax collection is enabled.
   */
  chargeTaxes?: InputMaybe<Scalars['Boolean']>;
  /** List of IDs of collections that the product belongs to. */
  collections?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Product description.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
  /**
   * External ID of this product.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the product metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Product name. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the product private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** Defines the product rating value. */
  rating?: InputMaybe<Scalars['Float']>;
  /** Search engine optimization fields. */
  seo?: InputMaybe<SeoInput>;
  /** Product slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** ID of a tax class to assign to this product. If not provided, product will use the tax class which is assigned to the product type. */
  taxClass?: InputMaybe<Scalars['ID']>;
  /**
   * Tax rate for enabled tax gateway.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use tax classes to control the tax calculation for a product. If taxCode is provided, Saleor will try to find a tax class with given code (codes are stored in metadata) and assign it. If no tax class is found, it would be created and assigned.
   */
  taxCode?: InputMaybe<Scalars['String']>;
  /** Weight of the Product. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Represents a product media. */
export type ProductMedia = Node &
  ObjectWithMetadata & {
    alt: Scalars['String'];
    id: Scalars['ID'];
    /**
     * List of public metadata items. Can be accessed without permissions.
     *
     * Added in Saleor 3.12.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.12.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.12.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    oembedData: Scalars['JSONString'];
    /**
     * List of private metadata items. Requires staff permissions to access.
     *
     * Added in Saleor 3.12.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.12.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.12.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /**
     * Product id the media refers to.
     *
     * Added in Saleor 3.12.
     */
    productId?: Maybe<Scalars['ID']>;
    sortOrder?: Maybe<Scalars['Int']>;
    type: ProductMediaType;
    url: Scalars['String'];
  };

/** Represents a product media. */
export type ProductMediaMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a product media. */
export type ProductMediaMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a product media. */
export type ProductMediaPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a product media. */
export type ProductMediaPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a product media. */
export type ProductMediaUrlArgs = {
  format?: InputMaybe<ThumbnailFormatEnum>;
  size?: InputMaybe<Scalars['Int']>;
};

/**
 * Deletes product media.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductMediaBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Create a media object (image or video URL) associated with product. For image, this mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductMediaCreate = {
  errors: Array<ProductError>;
  media?: Maybe<ProductMedia>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export type ProductMediaCreateInput = {
  /** Alt text for a product media. */
  alt?: InputMaybe<Scalars['String']>;
  /** Represents an image file in a multipart request. */
  image?: InputMaybe<Scalars['Upload']>;
  /** Represents an URL to an external media. */
  mediaUrl?: InputMaybe<Scalars['String']>;
  /** ID of an product. */
  product: Scalars['ID'];
};

/**
 * Event sent when new product media is created.
 *
 * Added in Saleor 3.12.
 */
export type ProductMediaCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product media the event relates to. */
  productMedia?: Maybe<ProductMedia>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes a product media.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductMediaDelete = {
  errors: Array<ProductError>;
  media?: Maybe<ProductMedia>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Event sent when product media is deleted.
 *
 * Added in Saleor 3.12.
 */
export type ProductMediaDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product media the event relates to. */
  productMedia?: Maybe<ProductMedia>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Changes ordering of the product media.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductMediaReorder = {
  errors: Array<ProductError>;
  media?: Maybe<Array<ProductMedia>>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/** An enumeration. */
export enum ProductMediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

/**
 * Updates a product media.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductMediaUpdate = {
  errors: Array<ProductError>;
  media?: Maybe<ProductMedia>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export type ProductMediaUpdateInput = {
  /** Alt text for a product media. */
  alt?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when product media is updated.
 *
 * Added in Saleor 3.12.
 */
export type ProductMediaUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product media the event relates to. */
  productMedia?: Maybe<ProductMedia>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when product metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductMetadataUpdated = Event & {
  /** The category of the product. */
  category?: Maybe<Category>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product the event relates to. */
  product?: Maybe<Product>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when product metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductMetadataUpdatedProductArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type ProductOrder = {
  /**
   * Sort product by the selected attribute's values.
   * Note: this doesn't take translations into account yet.
   */
  attributeId?: InputMaybe<Scalars['ID']>;
  /**
   * Specifies the channel in which to sort the data.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort products by the selected field. */
  field?: InputMaybe<ProductOrderField>;
};

export enum ProductOrderField {
  /**
   * Sort products by collection. Note: This option is available only for the `Collection.products` query.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  Collection = 'COLLECTION',
  /**
   * Sort products by creation date.
   *
   * Added in Saleor 3.8.
   */
  CreatedAt = 'CREATED_AT',
  /** Sort products by update date. */
  Date = 'DATE',
  /** Sort products by update date. */
  LastModified = 'LAST_MODIFIED',
  /** Sort products by update date. */
  LastModifiedAt = 'LAST_MODIFIED_AT',
  /**
   * Sort products by a minimal price of a product's variant.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  MinimalPrice = 'MINIMAL_PRICE',
  /** Sort products by name. */
  Name = 'NAME',
  /**
   * Sort products by price.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  Price = 'PRICE',
  /**
   * Sort products by publication date.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  PublicationDate = 'PUBLICATION_DATE',
  /**
   * Sort products by publication status.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  Published = 'PUBLISHED',
  /**
   * Sort products by publication date.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  PublishedAt = 'PUBLISHED_AT',
  /** Sort products by rank. Note: This option is available only with the `search` filter. */
  Rank = 'RANK',
  /** Sort products by rating. */
  Rating = 'RATING',
  /** Sort products by type. */
  Type = 'TYPE'
}

/** Represents availability of a product in the storefront. */
export type ProductPricingInfo = {
  /** The discount amount if in sale (null otherwise). */
  discount?: Maybe<TaxedMoney>;
  /** The discount amount in the local currency. */
  discountLocalCurrency?: Maybe<TaxedMoney>;
  /**
   * Determines whether this product's price displayed in a storefront should include taxes.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  displayGrossPrices: Scalars['Boolean'];
  /** Whether it is in sale or not. */
  onSale?: Maybe<Scalars['Boolean']>;
  /** The discounted price range of the product variants. */
  priceRange?: Maybe<TaxedMoneyRange>;
  /** The discounted price range of the product variants in the local currency. */
  priceRangeLocalCurrency?: Maybe<TaxedMoneyRange>;
  /** The undiscounted price range of the product variants. */
  priceRangeUndiscounted?: Maybe<TaxedMoneyRange>;
};

/**
 * Reorder product attribute values.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductReorderAttributeValues = {
  errors: Array<ProductError>;
  /** Product from which attribute values are reordered. */
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export type ProductStockFilterInput = {
  quantity?: InputMaybe<IntRangeInput>;
  warehouseIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type ProductTranslatableContent = Node & {
  /** List of product attribute values that can be translated. */
  attributeValues: Array<AttributeValueTranslatableContent>;
  /**
   * Description of the product.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  /**
   * Description of the product.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
   */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /**
   * Represents an individual item for sale in the storefront.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  product?: Maybe<Product>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  /** Returns translated product fields for the given language code. */
  translation?: Maybe<ProductTranslation>;
};

export type ProductTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a product.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type ProductTranslate = {
  errors: Array<TranslationError>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type ProductTranslation = Node & {
  /**
   * Translated description of the product.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  /**
   * Translated description of the product.
   *
   * Rich text format. For reference see https://editorjs.io/
   * @deprecated This field will be removed in Saleor 4.0. Use the `description` field instead.
   */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductType = Node &
  ObjectWithMetadata & {
    /**
     * Variant attributes of that product type with attached variant selection.
     *
     * Added in Saleor 3.1.
     */
    assignedVariantAttributes?: Maybe<Array<AssignedVariantAttribute>>;
    /**
     * List of attributes which can be assigned to this product type.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS.
     */
    availableAttributes?: Maybe<AttributeCountableConnection>;
    hasVariants: Scalars['Boolean'];
    id: Scalars['ID'];
    isDigital: Scalars['Boolean'];
    isShippingRequired: Scalars['Boolean'];
    /** The product type kind. */
    kind: ProductTypeKindEnum;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** Product attributes of that product type. */
    productAttributes?: Maybe<Array<Attribute>>;
    /**
     * List of products of this type.
     * @deprecated This field will be removed in Saleor 4.0. Use the top-level `products` query with the `productTypes` filter.
     */
    products?: Maybe<ProductCountableConnection>;
    slug: Scalars['String'];
    /**
     * Tax class assigned to this product type. All products of this product type use this tax class, unless it's overridden in the `Product` type.
     *
     * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
     */
    taxClass?: Maybe<TaxClass>;
    /**
     * A type of tax. Assigned by enabled tax gateway
     * @deprecated This field will be removed in Saleor 4.0. Use `taxClass` field instead.
     */
    taxType?: Maybe<TaxType>;
    /**
     * Variant attributes of that product type.
     * @deprecated This field will be removed in Saleor 4.0. Use `assignedVariantAttributes` instead.
     */
    variantAttributes?: Maybe<Array<Attribute>>;
    weight?: Maybe<Weight>;
  };

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeAssignedVariantAttributesArgs = {
  variantSelection?: InputMaybe<VariantAttributeScope>;
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeAvailableAttributesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AttributeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AttributeWhereInput>;
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeVariantAttributesArgs = {
  variantSelection?: InputMaybe<VariantAttributeScope>;
};

/**
 * Deletes product types.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductTypeBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export enum ProductTypeConfigurable {
  Configurable = 'CONFIGURABLE',
  Simple = 'SIMPLE'
}

export type ProductTypeCountableConnection = {
  edges: Array<ProductTypeCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductTypeCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductType;
};

/**
 * Creates a new product type.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductTypeCreate = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/**
 * Deletes a product type.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductTypeDelete = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

export enum ProductTypeEnum {
  Digital = 'DIGITAL',
  Shippable = 'SHIPPABLE'
}

export type ProductTypeFilterInput = {
  configurable?: InputMaybe<ProductTypeConfigurable>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  kind?: InputMaybe<ProductTypeKindEnum>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  productType?: InputMaybe<ProductTypeEnum>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};

export type ProductTypeInput = {
  /** Determines if product of this type has multiple variants. This option mainly simplifies product management in the dashboard. There is always at least one variant created under the hood. */
  hasVariants?: InputMaybe<Scalars['Boolean']>;
  /** Determines if products are digital. */
  isDigital?: InputMaybe<Scalars['Boolean']>;
  /** Determines if shipping is required for products of this variant. */
  isShippingRequired?: InputMaybe<Scalars['Boolean']>;
  /** The product type kind. */
  kind?: InputMaybe<ProductTypeKindEnum>;
  /** Name of the product type. */
  name?: InputMaybe<Scalars['String']>;
  /** List of attributes shared among all product variants. */
  productAttributes?: InputMaybe<Array<Scalars['ID']>>;
  /** Product type slug. */
  slug?: InputMaybe<Scalars['String']>;
  /** ID of a tax class to assign to this product type. All products of this product type would use this tax class, unless it's overridden in the `Product` type. */
  taxClass?: InputMaybe<Scalars['ID']>;
  /**
   * Tax rate for enabled tax gateway.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0.. Use tax classes to control the tax calculation for a product type. If taxCode is provided, Saleor will try to find a tax class with given code (codes are stored in metadata) and assign it. If no tax class is found, it would be created and assigned.
   */
  taxCode?: InputMaybe<Scalars['String']>;
  /** List of attributes used to distinguish between different variants of a product. */
  variantAttributes?: InputMaybe<Array<Scalars['ID']>>;
  /** Weight of the ProductType items. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** An enumeration. */
export enum ProductTypeKindEnum {
  GiftCard = 'GIFT_CARD',
  Normal = 'NORMAL'
}

/**
 * Reorder the attributes of a product type.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductTypeReorderAttributes = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  /** Product type from which attributes are reordered. */
  productType?: Maybe<ProductType>;
};

export enum ProductTypeSortField {
  /** Sort products by type. */
  Digital = 'DIGITAL',
  /** Sort products by name. */
  Name = 'NAME',
  /** Sort products by shipping. */
  ShippingRequired = 'SHIPPING_REQUIRED'
}

export type ProductTypeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort product types by the selected field. */
  field: ProductTypeSortField;
};

/**
 * Updates an existing product type.
 *
 * Requires one of the following permissions: MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES.
 */
export type ProductTypeUpdate = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/**
 * Updates an existing product.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductUpdate = {
  errors: Array<ProductError>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Event sent when product is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductUpdated = Event & {
  /** The category of the product. */
  category?: Maybe<Category>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product the event relates to. */
  product?: Maybe<Product>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when product is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductUpdatedProductArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariant = Node &
  ObjectWithMetadata & {
    /** List of attributes assigned to this variant. */
    attributes: Array<SelectedAttribute>;
    /** Channel given to retrieve this product variant. Also used by federation gateway to resolve this object in a federated query. */
    channel?: Maybe<Scalars['String']>;
    /**
     * List of price information in channels for the product.
     *
     * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
     */
    channelListings?: Maybe<Array<ProductVariantChannelListing>>;
    created: Scalars['DateTime'];
    /**
     * Digital content for the product variant.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS.
     */
    digitalContent?: Maybe<DigitalContent>;
    /**
     * External ID of this product.
     *
     * Added in Saleor 3.10.
     */
    externalReference?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    /**
     * List of images for the product variant.
     * @deprecated This field will be removed in Saleor 4.0. Use the `media` field instead.
     */
    images?: Maybe<Array<ProductImage>>;
    /** Gross margin percentage value. */
    margin?: Maybe<Scalars['Int']>;
    /** List of media for the product variant. */
    media?: Maybe<Array<ProductMedia>>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /**
     * Preorder data for product variant.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    preorder?: Maybe<PreorderData>;
    /** Lists the storefront variant's pricing, the current price and discounts, only meant for displaying. */
    pricing?: Maybe<VariantPricingInfo>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    product: Product;
    /** Quantity of a product available for sale in one checkout. Field value will be `null` when no `limitQuantityPerCheckout` in global settings has been set, and `productVariant` stocks are not tracked. */
    quantityAvailable?: Maybe<Scalars['Int']>;
    quantityLimitPerCustomer?: Maybe<Scalars['Int']>;
    /**
     * Total quantity ordered.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS.
     */
    quantityOrdered?: Maybe<Scalars['Int']>;
    /**
     * Total revenue generated by a variant in given period of time. Note: this field should be queried using `reportProductSales` query as it uses optimizations suitable for such calculations.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS.
     */
    revenue?: Maybe<TaxedMoney>;
    sku?: Maybe<Scalars['String']>;
    /**
     * Stocks for the product variant.
     *
     * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS.
     */
    stocks?: Maybe<Array<Stock>>;
    trackInventory: Scalars['Boolean'];
    /** Returns translated product variant fields for the given language code. */
    translation?: Maybe<ProductVariantTranslation>;
    updatedAt: Scalars['DateTime'];
    weight?: Maybe<Weight>;
  };

/** Represents a version of a product such as different size or color. */
export type ProductVariantAttributesArgs = {
  variantSelection?: InputMaybe<VariantAttributeScope>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantPricingArgs = {
  address?: InputMaybe<AddressInput>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantQuantityAvailableArgs = {
  address?: InputMaybe<AddressInput>;
  countryCode?: InputMaybe<CountryCode>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantRevenueArgs = {
  period?: InputMaybe<ReportingPeriod>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantStocksArgs = {
  address?: InputMaybe<AddressInput>;
  countryCode?: InputMaybe<CountryCode>;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariantTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Event sent when product variant is back in stock.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantBackInStock = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product variant the event relates to. */
  productVariant?: Maybe<ProductVariant>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** Look up a warehouse. */
  warehouse?: Maybe<Warehouse>;
};

/**
 * Event sent when product variant is back in stock.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantBackInStockProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Creates product variants for a given product.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantBulkCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  bulkProductErrors: Array<BulkProductError>;
  /** Returns how many objects were created. */
  count: Scalars['Int'];
  errors: Array<BulkProductError>;
  /** List of the created variants.This field will be removed in Saleor 4.0. */
  productVariants: Array<ProductVariant>;
  /**
   * List of the created variants.
   *
   * Added in Saleor 3.11.
   */
  results: Array<ProductVariantBulkResult>;
};

export type ProductVariantBulkCreateInput = {
  /** List of attributes specific to this variant. */
  attributes: Array<BulkAttributeValueInput>;
  /** List of prices assigned to channels. */
  channelListings?: InputMaybe<Array<ProductVariantChannelListingAddInput>>;
  /**
   * External ID of this product variant.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the product variant metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Variant name. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Determines if variant is in preorder.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  preorder?: InputMaybe<PreorderSettingsInput>;
  /**
   * Fields required to update the product variant private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /**
   * Determines maximum quantity of `ProductVariant`,that can be bought in a single checkout.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  quantityLimitPerCustomer?: InputMaybe<Scalars['Int']>;
  /** Stock keeping unit. */
  sku?: InputMaybe<Scalars['String']>;
  /** Stocks of a product available for sale. */
  stocks?: InputMaybe<Array<StockInput>>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/**
 * Deletes product variants.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export type ProductVariantBulkError = {
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** List of channel listings IDs which causes the error. */
  channelListings?: Maybe<Array<Scalars['ID']>>;
  /**
   * List of channel IDs which causes the error.
   *
   * Added in Saleor 3.12.
   */
  channels?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ProductVariantBulkErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /**
   * List of stocks IDs which causes the error.
   *
   * Added in Saleor 3.12.
   */
  stocks?: Maybe<Array<Scalars['ID']>>;
  /** List of attribute values IDs which causes the error. */
  values?: Maybe<Array<Scalars['ID']>>;
  /** List of warehouse IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ProductVariantBulkErrorCode {
  AttributeAlreadyAssigned = 'ATTRIBUTE_ALREADY_ASSIGNED',
  AttributeCannotBeAssigned = 'ATTRIBUTE_CANNOT_BE_ASSIGNED',
  AttributeVariantsDisabled = 'ATTRIBUTE_VARIANTS_DISABLED',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidPrice = 'INVALID_PRICE',
  NotFound = 'NOT_FOUND',
  NotProductsVariant = 'NOT_PRODUCTS_VARIANT',
  ProductNotAssignedToChannel = 'PRODUCT_NOT_ASSIGNED_TO_CHANNEL',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type ProductVariantBulkResult = {
  /** List of errors occurred on create attempt. */
  errors?: Maybe<Array<ProductVariantBulkError>>;
  /** Product variant data. */
  productVariant?: Maybe<ProductVariant>;
};

/**
 * Update multiple product variants.
 *
 * Added in Saleor 3.11.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantBulkUpdate = {
  /** Returns how many objects were updated. */
  count: Scalars['Int'];
  errors: Array<ProductVariantBulkError>;
  /** List of the updated variants. */
  results: Array<ProductVariantBulkResult>;
};

/**
 * Input fields to update product variants.
 *
 * Added in Saleor 3.11.
 */
export type ProductVariantBulkUpdateInput = {
  /** List of attributes specific to this variant. */
  attributes?: InputMaybe<Array<BulkAttributeValueInput>>;
  /**
   * Channel listings input.
   *
   * Added in Saleor 3.12.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  channelListings?: InputMaybe<ProductVariantChannelListingUpdateInput>;
  /**
   * External ID of this product variant.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** ID of the product variant to update. */
  id: Scalars['ID'];
  /**
   * Fields required to update the product variant metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Variant name. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Determines if variant is in preorder.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  preorder?: InputMaybe<PreorderSettingsInput>;
  /**
   * Fields required to update the product variant private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /**
   * Determines maximum quantity of `ProductVariant`,that can be bought in a single checkout.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  quantityLimitPerCustomer?: InputMaybe<Scalars['Int']>;
  /** Stock keeping unit. */
  sku?: InputMaybe<Scalars['String']>;
  /**
   * Stocks input.
   *
   * Added in Saleor 3.12.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  stocks?: InputMaybe<ProductVariantStocksUpdateInput>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/** Represents product varaint channel listing. */
export type ProductVariantChannelListing = Node & {
  channel: Channel;
  /** Cost price of the variant. */
  costPrice?: Maybe<Money>;
  id: Scalars['ID'];
  /**
   * Gross margin percentage value.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  margin?: Maybe<Scalars['Int']>;
  /**
   * Preorder variant data.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  preorderThreshold?: Maybe<PreorderThreshold>;
  price?: Maybe<Money>;
};

export type ProductVariantChannelListingAddInput = {
  /** ID of a channel. */
  channelId: Scalars['ID'];
  /** Cost price of the variant in channel. */
  costPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /**
   * The threshold for preorder variant in channel.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  preorderThreshold?: InputMaybe<Scalars['Int']>;
  /** Price of the particular variant in channel. */
  price: Scalars['PositiveDecimal'];
};

/**
 * Manage product variant prices in channels.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantChannelListingUpdate = {
  errors: Array<ProductChannelListingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productChannelListingErrors: Array<ProductChannelListingError>;
  /** An updated product variant instance. */
  variant?: Maybe<ProductVariant>;
};

export type ProductVariantChannelListingUpdateInput = {
  /** List of channels to create variant channel listings. */
  create?: InputMaybe<Array<ProductVariantChannelListingAddInput>>;
  /** List of channel listings to remove. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
  /** List of channel listings to update. */
  update?: InputMaybe<Array<ChannelListingUpdateInput>>;
};

export type ProductVariantCountableConnection = {
  edges: Array<ProductVariantCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductVariantCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductVariant;
};

/**
 * Creates a new variant for a product.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantCreate = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantCreateInput = {
  /** List of attributes specific to this variant. */
  attributes: Array<AttributeValueInput>;
  /**
   * External ID of this product variant.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the product variant metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Variant name. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Determines if variant is in preorder.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  preorder?: InputMaybe<PreorderSettingsInput>;
  /**
   * Fields required to update the product variant private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** Product ID of which type is the variant. */
  product: Scalars['ID'];
  /**
   * Determines maximum quantity of `ProductVariant`,that can be bought in a single checkout.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  quantityLimitPerCustomer?: InputMaybe<Scalars['Int']>;
  /** Stock keeping unit. */
  sku?: InputMaybe<Scalars['String']>;
  /** Stocks of a product available for sale. */
  stocks?: InputMaybe<Array<StockInput>>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/**
 * Event sent when new product variant is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product variant the event relates to. */
  productVariant?: Maybe<ProductVariant>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new product variant is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantCreatedProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a product variant.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantDelete = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/**
 * Event sent when product variant is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product variant the event relates to. */
  productVariant?: Maybe<ProductVariant>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when product variant is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantDeletedProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type ProductVariantFilterInput = {
  isPreorder?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Array<Scalars['String']>>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
};

export type ProductVariantInput = {
  /** List of attributes specific to this variant. */
  attributes?: InputMaybe<Array<AttributeValueInput>>;
  /**
   * External ID of this product variant.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /**
   * Fields required to update the product variant metadata.
   *
   * Added in Saleor 3.8.
   */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Variant name. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Determines if variant is in preorder.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  preorder?: InputMaybe<PreorderSettingsInput>;
  /**
   * Fields required to update the product variant private metadata.
   *
   * Added in Saleor 3.8.
   */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /**
   * Determines maximum quantity of `ProductVariant`,that can be bought in a single checkout.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  quantityLimitPerCustomer?: InputMaybe<Scalars['Int']>;
  /** Stock keeping unit. */
  sku?: InputMaybe<Scalars['String']>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: InputMaybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: InputMaybe<Scalars['WeightScalar']>;
};

/**
 * Event sent when product variant metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantMetadataUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product variant the event relates to. */
  productVariant?: Maybe<ProductVariant>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when product variant metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantMetadataUpdatedProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when product variant is out of stock.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantOutOfStock = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product variant the event relates to. */
  productVariant?: Maybe<ProductVariant>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** Look up a warehouse. */
  warehouse?: Maybe<Warehouse>;
};

/**
 * Event sent when product variant is out of stock.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantOutOfStockProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deactivates product variant preorder. It changes all preorder allocation into regular allocation.
 *
 * Added in Saleor 3.1.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantPreorderDeactivate = {
  errors: Array<ProductError>;
  /** Product variant with ended preorder. */
  productVariant?: Maybe<ProductVariant>;
};

/**
 * Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantReorder = {
  errors: Array<ProductError>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

/**
 * Reorder product variant attribute values.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantReorderAttributeValues = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  /** Product variant from which attribute values are reordered. */
  productVariant?: Maybe<ProductVariant>;
};

/**
 * Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantSetDefault = {
  errors: Array<ProductError>;
  product?: Maybe<Product>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
};

export enum ProductVariantSortField {
  /** Sort products variants by last modified at. */
  LastModifiedAt = 'LAST_MODIFIED_AT'
}

export type ProductVariantSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort productVariants by the selected field. */
  field: ProductVariantSortField;
};

/**
 * Event sent when product variant stock is updated.
 *
 * Added in Saleor 3.11.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantStockUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product variant the event relates to. */
  productVariant?: Maybe<ProductVariant>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** Look up a warehouse. */
  warehouse?: Maybe<Warehouse>;
};

/**
 * Event sent when product variant stock is updated.
 *
 * Added in Saleor 3.11.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantStockUpdatedProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Creates stocks for product variant.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantStocksCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  bulkStockErrors: Array<BulkStockError>;
  errors: Array<BulkStockError>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
};

/**
 * Delete stocks from product variant.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantStocksDelete = {
  errors: Array<StockError>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  stockErrors: Array<StockError>;
};

/**
 * Update stocks for product variant.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantStocksUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  bulkStockErrors: Array<BulkStockError>;
  errors: Array<BulkStockError>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantStocksUpdateInput = {
  /** List of warehouses to create stocks. */
  create?: InputMaybe<Array<StockInput>>;
  /** List of stocks to remove. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
  /** List of stocks to update. */
  update?: InputMaybe<Array<StockUpdateInput>>;
};

export type ProductVariantTranslatableContent = Node & {
  /** List of product variant attribute values that can be translated. */
  attributeValues: Array<AttributeValueTranslatableContent>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /**
   * Represents a version of a product such as different size or color.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  productVariant?: Maybe<ProductVariant>;
  /** Returns translated product variant fields for the given language code. */
  translation?: Maybe<ProductVariantTranslation>;
};

export type ProductVariantTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a product variant.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type ProductVariantTranslate = {
  errors: Array<TranslationError>;
  productVariant?: Maybe<ProductVariant>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type ProductVariantTranslation = Node & {
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name: Scalars['String'];
};

/**
 * Updates an existing variant for product.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type ProductVariantUpdate = {
  errors: Array<ProductError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/**
 * Event sent when product variant is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The product variant the event relates to. */
  productVariant?: Maybe<ProductVariant>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when product variant is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ProductVariantUpdatedProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type PublishableChannelListingInput = {
  /** ID of a channel. */
  channelId: Scalars['ID'];
  /** Determines if object is visible to customers. */
  isPublished?: InputMaybe<Scalars['Boolean']>;
  /**
   * Publication date. ISO 8601 standard.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `publishedAt` field instead.
   */
  publicationDate?: InputMaybe<Scalars['Date']>;
  /**
   * Publication date time. ISO 8601 standard.
   *
   * Added in Saleor 3.3.
   */
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type Query = {
  _entities?: Maybe<Array<Maybe<_Entity>>>;
  _service?: Maybe<_Service>;
  /** Look up an address by ID. */
  address?: Maybe<Address>;
  /** Returns address validation rules. */
  addressValidationRules?: Maybe<AddressValidationData>;
  /**
   * Look up an app by ID. If ID is not provided, return the currently authenticated app.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER AUTHENTICATED_APP. The authenticated app has access to its resources. Fetching different apps requires MANAGE_APPS permission.
   */
  app?: Maybe<App>;
  /**
   * Look up an app extension by ID.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  appExtension?: Maybe<AppExtension>;
  /**
   * List of all extensions.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  appExtensions?: Maybe<AppExtensionCountableConnection>;
  /**
   * List of the apps.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, MANAGE_APPS.
   */
  apps?: Maybe<AppCountableConnection>;
  /**
   * List of all apps installations
   *
   * Requires one of the following permissions: MANAGE_APPS.
   */
  appsInstallations: Array<AppInstallation>;
  /** Look up an attribute by ID, slug or external reference. */
  attribute?: Maybe<Attribute>;
  /** List of the shop's attributes. */
  attributes?: Maybe<AttributeCountableConnection>;
  /** List of the shop's categories. */
  categories?: Maybe<CategoryCountableConnection>;
  /** Look up a category by ID or slug. */
  category?: Maybe<Category>;
  /** Look up a channel by ID or slug. */
  channel?: Maybe<Channel>;
  /**
   * List of all channels.
   *
   * Requires one of the following permissions: AUTHENTICATED_APP, AUTHENTICATED_STAFF_USER.
   */
  channels?: Maybe<Array<Channel>>;
  /** Look up a checkout by token and slug of channel. */
  checkout?: Maybe<Checkout>;
  /**
   * List of checkout lines.
   *
   * Requires one of the following permissions: MANAGE_CHECKOUTS.
   */
  checkoutLines?: Maybe<CheckoutLineCountableConnection>;
  /**
   * List of checkouts.
   *
   * Requires one of the following permissions: MANAGE_CHECKOUTS.
   */
  checkouts?: Maybe<CheckoutCountableConnection>;
  /** Look up a collection by ID. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
  collection?: Maybe<Collection>;
  /** List of the shop's collections. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
  collections?: Maybe<CollectionCountableConnection>;
  /**
   * List of the shop's customers.
   *
   * Requires one of the following permissions: MANAGE_ORDERS, MANAGE_USERS.
   */
  customers?: Maybe<UserCountableConnection>;
  /**
   * Look up digital content by ID.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  digitalContent?: Maybe<DigitalContent>;
  /**
   * List of digital content.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  digitalContents?: Maybe<DigitalContentCountableConnection>;
  /**
   * List of draft orders.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  draftOrders?: Maybe<OrderCountableConnection>;
  /**
   * Look up a export file by ID.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  exportFile?: Maybe<ExportFile>;
  /**
   * List of export files.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  exportFiles?: Maybe<ExportFileCountableConnection>;
  /**
   * Look up a gift card by ID.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCard?: Maybe<GiftCard>;
  /**
   * List of gift card currencies.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardCurrencies: Array<Scalars['String']>;
  /**
   * Gift card related settings from site settings.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardSettings: GiftCardSettings;
  /**
   * List of gift card tags.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCardTags?: Maybe<GiftCardTagCountableConnection>;
  /**
   * List of gift cards.
   *
   * Requires one of the following permissions: MANAGE_GIFT_CARD.
   */
  giftCards?: Maybe<GiftCardCountableConnection>;
  /**
   * List of activity events to display on homepage (at the moment it only contains order-events).
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  homepageEvents?: Maybe<OrderEventCountableConnection>;
  /** Return the currently authenticated user. */
  me?: Maybe<User>;
  /** Look up a navigation menu by ID or name. */
  menu?: Maybe<Menu>;
  /** Look up a menu item by ID. */
  menuItem?: Maybe<MenuItem>;
  /** List of the storefronts's menu items. */
  menuItems?: Maybe<MenuItemCountableConnection>;
  /** List of the storefront's menus. */
  menus?: Maybe<MenuCountableConnection>;
  /** Look up an order by ID or external reference. */
  order?: Maybe<Order>;
  /**
   * Look up an order by token.
   * @deprecated This field will be removed in Saleor 4.0.
   */
  orderByToken?: Maybe<Order>;
  /**
   * Order related settings from site settings. Returns `orderSettings` for the first `channel` in alphabetical order.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   * @deprecated This field will be removed in Saleor 4.0. Use the `channel` query to fetch the `orderSettings` field instead.
   */
  orderSettings?: Maybe<OrderSettings>;
  /**
   * List of orders.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  orders?: Maybe<OrderCountableConnection>;
  /**
   * Return the total sales amount from a specific period.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  ordersTotal?: Maybe<TaxedMoney>;
  /** Look up a page by ID or slug. */
  page?: Maybe<Page>;
  /** Look up a page type by ID. */
  pageType?: Maybe<PageType>;
  /** List of the page types. */
  pageTypes?: Maybe<PageTypeCountableConnection>;
  /** List of the shop's pages. */
  pages?: Maybe<PageCountableConnection>;
  /**
   * Look up a payment by ID.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  payment?: Maybe<Payment>;
  /**
   * List of payments.
   *
   * Requires one of the following permissions: MANAGE_ORDERS.
   */
  payments?: Maybe<PaymentCountableConnection>;
  /**
   * Look up permission group by ID.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  permissionGroup?: Maybe<Group>;
  /**
   * List of permission groups.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  permissionGroups?: Maybe<GroupCountableConnection>;
  /**
   * Look up a plugin by ID.
   *
   * Requires one of the following permissions: MANAGE_PLUGINS.
   */
  plugin?: Maybe<Plugin>;
  /**
   * List of plugins.
   *
   * Requires one of the following permissions: MANAGE_PLUGINS.
   */
  plugins?: Maybe<PluginCountableConnection>;
  /** Look up a product by ID. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
  product?: Maybe<Product>;
  /** Look up a product type by ID. */
  productType?: Maybe<ProductType>;
  /** List of the shop's product types. */
  productTypes?: Maybe<ProductTypeCountableConnection>;
  /** Look up a product variant by ID or SKU. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
  productVariant?: Maybe<ProductVariant>;
  /** List of product variants. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
  productVariants?: Maybe<ProductVariantCountableConnection>;
  /** List of the shop's products. Requires one of the following permissions to include the unpublished items: MANAGE_ORDERS, MANAGE_DISCOUNTS, MANAGE_PRODUCTS. */
  products?: Maybe<ProductCountableConnection>;
  /**
   * List of top selling products.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  reportProductSales?: Maybe<ProductVariantCountableConnection>;
  /**
   * Look up a sale by ID.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  sale?: Maybe<Sale>;
  /**
   * List of the shop's sales.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  sales?: Maybe<SaleCountableConnection>;
  /**
   * Look up a shipping zone by ID.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingZone?: Maybe<ShippingZone>;
  /**
   * List of the shop's shipping zones.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   */
  shippingZones?: Maybe<ShippingZoneCountableConnection>;
  /** Return information about the shop. */
  shop: Shop;
  /**
   * List of the shop's staff users.
   *
   * Requires one of the following permissions: MANAGE_STAFF.
   */
  staffUsers?: Maybe<UserCountableConnection>;
  /**
   * Look up a stock by ID
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  stock?: Maybe<Stock>;
  /**
   * List of stocks.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS.
   */
  stocks?: Maybe<StockCountableConnection>;
  /**
   * Look up a tax class.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  taxClass?: Maybe<TaxClass>;
  /**
   * List of tax classes.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  taxClasses?: Maybe<TaxClassCountableConnection>;
  /**
   * Look up a tax configuration.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  taxConfiguration?: Maybe<TaxConfiguration>;
  /**
   * List of tax configurations.
   *
   * Added in Saleor 3.9.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  taxConfigurations?: Maybe<TaxConfigurationCountableConnection>;
  /**
   * Tax class rates grouped by country.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  taxCountryConfiguration?: Maybe<TaxCountryConfiguration>;
  /**
   *
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  taxCountryConfigurations?: Maybe<Array<TaxCountryConfiguration>>;
  /** List of all tax rates available from tax gateway. */
  taxTypes?: Maybe<Array<TaxType>>;
  /**
   * Look up a transaction by ID.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: HANDLE_PAYMENTS.
   */
  transaction?: Maybe<TransactionItem>;
  /**
   * Lookup a translatable item by ID.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  translation?: Maybe<TranslatableItem>;
  /**
   * Returns a list of all translatable items of a given kind.
   *
   * Requires one of the following permissions: MANAGE_TRANSLATIONS.
   */
  translations?: Maybe<TranslatableItemConnection>;
  /**
   * Look up a user by ID or email address.
   *
   * Requires one of the following permissions: MANAGE_STAFF, MANAGE_USERS, MANAGE_ORDERS.
   */
  user?: Maybe<User>;
  /**
   * Look up a voucher by ID.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  voucher?: Maybe<Voucher>;
  /**
   * List of the shop's vouchers.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   */
  vouchers?: Maybe<VoucherCountableConnection>;
  /**
   * Look up a warehouse by ID.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS, MANAGE_SHIPPING.
   */
  warehouse?: Maybe<Warehouse>;
  /**
   * List of warehouses.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS, MANAGE_SHIPPING.
   */
  warehouses?: Maybe<WarehouseCountableConnection>;
  /** Look up a webhook by ID. Requires one of the following permissions: MANAGE_APPS, OWNER. */
  webhook?: Maybe<Webhook>;
  /**
   * List of all available webhook events.
   *
   * Requires one of the following permissions: MANAGE_APPS.
   * @deprecated This field will be removed in Saleor 4.0. Use `WebhookEventTypeAsyncEnum` and `WebhookEventTypeSyncEnum` to get available event types.
   */
  webhookEvents?: Maybe<Array<WebhookEvent>>;
  /** Retrieve a sample payload for a given webhook event based on real data. It can be useful for some integrations where sample payload is required. */
  webhookSamplePayload?: Maybe<Scalars['JSONString']>;
};

export type Query_EntitiesArgs = {
  representations?: InputMaybe<Array<InputMaybe<Scalars['_Any']>>>;
};

export type QueryAddressArgs = {
  id: Scalars['ID'];
};

export type QueryAddressValidationRulesArgs = {
  city?: InputMaybe<Scalars['String']>;
  cityArea?: InputMaybe<Scalars['String']>;
  countryArea?: InputMaybe<Scalars['String']>;
  countryCode: CountryCode;
};

export type QueryAppArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryAppExtensionArgs = {
  id: Scalars['ID'];
};

export type QueryAppExtensionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AppExtensionFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryAppsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AppFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<AppSortingInput>;
};

export type QueryAttributeArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryAttributesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<AttributeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<AttributeSortingInput>;
  where?: InputMaybe<AttributeWhereInput>;
};

export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CategoryFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<CategorySortingInput>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryChannelArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryCheckoutArgs = {
  id?: InputMaybe<Scalars['ID']>;
  token?: InputMaybe<Scalars['UUID']>;
};

export type QueryCheckoutLinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryCheckoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CheckoutFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<CheckoutSortingInput>;
};

export type QueryCollectionArgs = {
  channel?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CollectionFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<CollectionSortingInput>;
};

export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CustomerFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<UserSortingInput>;
};

export type QueryDigitalContentArgs = {
  id: Scalars['ID'];
};

export type QueryDigitalContentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryDraftOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<OrderDraftFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<OrderSortingInput>;
};

export type QueryExportFileArgs = {
  id: Scalars['ID'];
};

export type QueryExportFilesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ExportFileFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ExportFileSortingInput>;
};

export type QueryGiftCardArgs = {
  id: Scalars['ID'];
};

export type QueryGiftCardTagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<GiftCardTagFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryGiftCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<GiftCardFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<GiftCardSortingInput>;
};

export type QueryHomepageEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryMenuArgs = {
  channel?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryMenuItemArgs = {
  channel?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type QueryMenuItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<MenuItemFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<MenuItemSortingInput>;
};

export type QueryMenusArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<MenuFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<MenuSortingInput>;
};

export type QueryOrderArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryOrderByTokenArgs = {
  token: Scalars['UUID'];
};

export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<OrderFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<OrderSortingInput>;
};

export type QueryOrdersTotalArgs = {
  channel?: InputMaybe<Scalars['String']>;
  period?: InputMaybe<ReportingPeriod>;
};

export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryPageTypeArgs = {
  id: Scalars['ID'];
};

export type QueryPageTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PageTypeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PageTypeSortingInput>;
};

export type QueryPagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PageFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PageSortingInput>;
};

export type QueryPaymentArgs = {
  id: Scalars['ID'];
};

export type QueryPaymentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PaymentFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryPermissionGroupArgs = {
  id: Scalars['ID'];
};

export type QueryPermissionGroupsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PermissionGroupFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PermissionGroupSortingInput>;
};

export type QueryPluginArgs = {
  id: Scalars['ID'];
};

export type QueryPluginsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PluginFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<PluginSortingInput>;
};

export type QueryProductArgs = {
  channel?: InputMaybe<Scalars['String']>;
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryProductTypeArgs = {
  id: Scalars['ID'];
};

export type QueryProductTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductTypeFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductTypeSortingInput>;
};

export type QueryProductVariantArgs = {
  channel?: InputMaybe<Scalars['String']>;
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  sku?: InputMaybe<Scalars['String']>;
};

export type QueryProductVariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductVariantFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductVariantSortingInput>;
};

export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ProductFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ProductOrder>;
};

export type QueryReportProductSalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  period: ReportingPeriod;
};

export type QuerySaleArgs = {
  channel?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type QuerySalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SaleFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<SaleSortingInput>;
};

export type QueryShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type QueryShippingZonesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ShippingZoneFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryStaffUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<StaffUserInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<UserSortingInput>;
};

export type QueryStockArgs = {
  id: Scalars['ID'];
};

export type QueryStocksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<StockFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryTaxClassArgs = {
  id: Scalars['ID'];
};

export type QueryTaxClassesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TaxClassFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<TaxClassSortingInput>;
};

export type QueryTaxConfigurationArgs = {
  id: Scalars['ID'];
};

export type QueryTaxConfigurationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<TaxConfigurationFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryTaxCountryConfigurationArgs = {
  countryCode: CountryCode;
};

export type QueryTransactionArgs = {
  id: Scalars['ID'];
};

export type QueryTranslationArgs = {
  id: Scalars['ID'];
  kind: TranslatableKinds;
};

export type QueryTranslationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  kind: TranslatableKinds;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryVoucherArgs = {
  channel?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type QueryVouchersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<VoucherFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<VoucherSortingInput>;
};

export type QueryWarehouseArgs = {
  externalReference?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type QueryWarehousesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<WarehouseFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<WarehouseSortingInput>;
};

export type QueryWebhookArgs = {
  id: Scalars['ID'];
};

export type QueryWebhookSamplePayloadArgs = {
  eventType: WebhookSampleEventTypeEnum;
};

/** Represents a reduced VAT rate for a particular type of goods. */
export type ReducedRate = {
  /** Reduced VAT rate in percent. */
  rate: Scalars['Float'];
  /** A type of goods. */
  rateType: Scalars['String'];
};

/** Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie. */
export type RefreshToken = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

export type ReorderInput = {
  /** The ID of the item to move. */
  id: Scalars['ID'];
  /** The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: InputMaybe<Scalars['Int']>;
};

export enum ReportingPeriod {
  ThisMonth = 'THIS_MONTH',
  Today = 'TODAY'
}

/**
 * Request email change of the logged in user.
 *
 * Requires one of the following permissions: AUTHENTICATED_USER.
 */
export type RequestEmailChange = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** A user instance. */
  user?: Maybe<User>;
};

/** Sends an email with the account password modification link. */
export type RequestPasswordReset = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type Sale = Node &
  ObjectWithMetadata & {
    /** List of categories this sale applies to. */
    categories?: Maybe<CategoryCountableConnection>;
    /**
     * List of channels available for the sale.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    channelListings?: Maybe<Array<SaleChannelListing>>;
    /**
     * List of collections this sale applies to.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    collections?: Maybe<CollectionCountableConnection>;
    created: Scalars['DateTime'];
    /** Currency code for sale. */
    currency?: Maybe<Scalars['String']>;
    /** Sale value. */
    discountValue?: Maybe<Scalars['Float']>;
    endDate?: Maybe<Scalars['DateTime']>;
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /**
     * List of products this sale applies to.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    products?: Maybe<ProductCountableConnection>;
    startDate: Scalars['DateTime'];
    /** Returns translated sale fields for the given language code. */
    translation?: Maybe<SaleTranslation>;
    type: SaleType;
    updatedAt: Scalars['DateTime'];
    /**
     * List of product variants this sale applies to.
     *
     * Added in Saleor 3.1.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    variants?: Maybe<ProductVariantCountableConnection>;
  };

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleMetafieldArgs = {
  key: Scalars['String'];
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SalePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SalePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleVariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * Adds products, categories, collections to a voucher.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type SaleAddCatalogues = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  /** Sale of which catalogue IDs will be modified. */
  sale?: Maybe<Sale>;
};

/**
 * Deletes sales.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type SaleBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
};

/** Represents sale channel listing. */
export type SaleChannelListing = Node & {
  channel: Channel;
  currency: Scalars['String'];
  discountValue: Scalars['Float'];
  id: Scalars['ID'];
};

export type SaleChannelListingAddInput = {
  /** ID of a channel. */
  channelId: Scalars['ID'];
  /** The value of the discount. */
  discountValue: Scalars['PositiveDecimal'];
};

export type SaleChannelListingInput = {
  /** List of channels to which the sale should be assigned. */
  addChannels?: InputMaybe<Array<SaleChannelListingAddInput>>;
  /** List of channels from which the sale should be unassigned. */
  removeChannels?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Manage sale's availability in channels.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type SaleChannelListingUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  /** An updated sale instance. */
  sale?: Maybe<Sale>;
};

export type SaleCountableConnection = {
  edges: Array<SaleCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type SaleCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Sale;
};

/**
 * Creates a new sale.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type SaleCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  sale?: Maybe<Sale>;
};

/**
 * Event sent when new sale is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The sale the event relates to. */
  sale?: Maybe<Sale>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new sale is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleCreatedSaleArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a sale.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type SaleDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  sale?: Maybe<Sale>;
};

/**
 * Event sent when sale is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The sale the event relates to. */
  sale?: Maybe<Sale>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when sale is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleDeletedSaleArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type SaleFilterInput = {
  metadata?: InputMaybe<Array<MetadataFilter>>;
  saleType?: InputMaybe<DiscountValueTypeEnum>;
  search?: InputMaybe<Scalars['String']>;
  started?: InputMaybe<DateTimeRangeInput>;
  status?: InputMaybe<Array<DiscountStatusEnum>>;
  updatedAt?: InputMaybe<DateTimeRangeInput>;
};

export type SaleInput = {
  /** Categories related to the discount. */
  categories?: InputMaybe<Array<Scalars['ID']>>;
  /** Collections related to the discount. */
  collections?: InputMaybe<Array<Scalars['ID']>>;
  /** End date of the voucher in ISO 8601 format. */
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** Voucher name. */
  name?: InputMaybe<Scalars['String']>;
  /** Products related to the discount. */
  products?: InputMaybe<Array<Scalars['ID']>>;
  /** Start date of the voucher in ISO 8601 format. */
  startDate?: InputMaybe<Scalars['DateTime']>;
  /** Fixed or percentage. */
  type?: InputMaybe<DiscountValueTypeEnum>;
  /** Value of the voucher. */
  value?: InputMaybe<Scalars['PositiveDecimal']>;
  variants?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Removes products, categories, collections from a sale.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type SaleRemoveCatalogues = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  /** Sale of which catalogue IDs will be modified. */
  sale?: Maybe<Sale>;
};

export enum SaleSortField {
  /** Sort sales by created at. */
  CreatedAt = 'CREATED_AT',
  /** Sort sales by end date. */
  EndDate = 'END_DATE',
  /** Sort sales by last modified at. */
  LastModifiedAt = 'LAST_MODIFIED_AT',
  /** Sort sales by name. */
  Name = 'NAME',
  /** Sort sales by start date. */
  StartDate = 'START_DATE',
  /** Sort sales by type. */
  Type = 'TYPE',
  /**
   * Sort sales by value.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  Value = 'VALUE'
}

export type SaleSortingInput = {
  /**
   * Specifies the channel in which to sort the data.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort sales by the selected field. */
  field: SaleSortField;
};

/**
 * The event informs about the start or end of the sale.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleToggle = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /**
   * The sale the event relates to.
   *
   * Added in Saleor 3.5.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  sale?: Maybe<Sale>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * The event informs about the start or end of the sale.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleToggleSaleArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type SaleTranslatableContent = Node & {
  id: Scalars['ID'];
  name: Scalars['String'];
  /**
   * Sales allow creating discounts for categories, collections or products and are visible to all the customers.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  sale?: Maybe<Sale>;
  /** Returns translated sale fields for the given language code. */
  translation?: Maybe<SaleTranslation>;
};

export type SaleTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a sale.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type SaleTranslate = {
  errors: Array<TranslationError>;
  sale?: Maybe<Sale>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type SaleTranslation = Node & {
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
};

export enum SaleType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

/**
 * Updates a sale.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type SaleUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  sale?: Maybe<Sale>;
};

/**
 * Event sent when sale is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The sale the event relates to. */
  sale?: Maybe<Sale>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when sale is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type SaleUpdatedSaleArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Represents a custom attribute. */
export type SelectedAttribute = {
  /** Name of an attribute displayed in the interface. */
  attribute: Attribute;
  /** Values of an attribute. */
  values: Array<AttributeValue>;
};

export type SeoInput = {
  /** SEO description. */
  description?: InputMaybe<Scalars['String']>;
  /** SEO title. */
  title?: InputMaybe<Scalars['String']>;
};

/** Sets the user's password from the token sent by email using the RequestPasswordReset mutation. */
export type SetPassword = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  /** CSRF token required to re-generate access token. */
  csrfToken?: Maybe<Scalars['String']>;
  errors: Array<AccountError>;
  /** JWT refresh token, required to re-generate access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
};

export type ShippingError = {
  /** List of channels IDs which causes the error. */
  channels?: Maybe<Array<Scalars['ID']>>;
  /** The error code. */
  code: ShippingErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of warehouse IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ShippingErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  MaxLessThanMin = 'MAX_LESS_THAN_MIN',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/**
 * List shipping methods for checkout.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingListMethodsForCheckout = Event & {
  /** The checkout the event relates to. */
  checkout?: Maybe<Checkout>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /**
   * Shipping methods that can be used with this checkout.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  shippingMethods?: Maybe<Array<ShippingMethod>>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** Shipping methods that can be used as means of shipping for orders and checkouts. */
export type ShippingMethod = Node &
  ObjectWithMetadata & {
    /** Describes if this shipping method is active and can be selected. */
    active: Scalars['Boolean'];
    /**
     * Shipping method description.
     *
     * Rich text format. For reference see https://editorjs.io/
     */
    description?: Maybe<Scalars['JSONString']>;
    /** Unique ID of ShippingMethod available for Order. */
    id: Scalars['ID'];
    /** Maximum delivery days for this shipping method. */
    maximumDeliveryDays?: Maybe<Scalars['Int']>;
    /** Maximum order price for this shipping method. */
    maximumOrderPrice?: Maybe<Money>;
    /**
     * Maximum order weight for this shipping method.
     * @deprecated This field will be removed in Saleor 4.0.
     */
    maximumOrderWeight?: Maybe<Weight>;
    /** Message connected to this shipping method. */
    message?: Maybe<Scalars['String']>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     */
    metafield?: Maybe<Scalars['String']>;
    /** Public metadata. Use `keys` to control which fields you want to include. The default is to include everything. */
    metafields?: Maybe<Scalars['Metadata']>;
    /** Minimum delivery days for this shipping method. */
    minimumDeliveryDays?: Maybe<Scalars['Int']>;
    /** Minimal order price for this shipping method. */
    minimumOrderPrice?: Maybe<Money>;
    /**
     * Minimum order weight for this shipping method.
     * @deprecated This field will be removed in Saleor 4.0.
     */
    minimumOrderWeight?: Maybe<Weight>;
    /** Shipping method name. */
    name: Scalars['String'];
    /** The price of selected shipping method. */
    price: Money;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /** Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything. */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** Returns translated shipping method fields for the given language code. */
    translation?: Maybe<ShippingMethodTranslation>;
    /**
     * Type of the shipping method.
     * @deprecated This field will be removed in Saleor 4.0.
     */
    type?: Maybe<ShippingMethodTypeEnum>;
  };

/** Shipping methods that can be used as means of shipping for orders and checkouts. */
export type ShippingMethodMetafieldArgs = {
  key: Scalars['String'];
};

/** Shipping methods that can be used as means of shipping for orders and checkouts. */
export type ShippingMethodMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Shipping methods that can be used as means of shipping for orders and checkouts. */
export type ShippingMethodPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Shipping methods that can be used as means of shipping for orders and checkouts. */
export type ShippingMethodPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Shipping methods that can be used as means of shipping for orders and checkouts. */
export type ShippingMethodTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Represents shipping method channel listing. */
export type ShippingMethodChannelListing = Node & {
  channel: Channel;
  id: Scalars['ID'];
  maximumOrderPrice?: Maybe<Money>;
  minimumOrderPrice?: Maybe<Money>;
  price?: Maybe<Money>;
};

export type ShippingMethodChannelListingAddInput = {
  /** ID of a channel. */
  channelId: Scalars['ID'];
  /** Maximum order price to use this shipping method. */
  maximumOrderPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Minimum order price to use this shipping method. */
  minimumOrderPrice?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Shipping price of the shipping method in this channel. */
  price?: InputMaybe<Scalars['PositiveDecimal']>;
};

export type ShippingMethodChannelListingInput = {
  /** List of channels to which the shipping method should be assigned. */
  addChannels?: InputMaybe<Array<ShippingMethodChannelListingAddInput>>;
  /** List of channels from which the shipping method should be unassigned. */
  removeChannels?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Manage shipping method's availability in channels.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingMethodChannelListingUpdate = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  /** An updated shipping method instance. */
  shippingMethod?: Maybe<ShippingMethodType>;
};

/** Represents shipping method postal code rule. */
export type ShippingMethodPostalCodeRule = Node & {
  /** End address range. */
  end?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Inclusion type of the postal code rule. */
  inclusionType?: Maybe<PostalCodeRuleInclusionTypeEnum>;
  /** Start address range. */
  start?: Maybe<Scalars['String']>;
};

export type ShippingMethodTranslatableContent = Node & {
  /**
   * Description of the shipping method.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /**
   * Shipping method are the methods you'll use to get customer's orders  to them. They are directly exposed to the customers.
   *
   * Requires one of the following permissions: MANAGE_SHIPPING.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  shippingMethod?: Maybe<ShippingMethodType>;
  /** Returns translated shipping method fields for the given language code. */
  translation?: Maybe<ShippingMethodTranslation>;
};

export type ShippingMethodTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ShippingMethodTranslation = Node & {
  /**
   * Translated description of the shipping method.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: Maybe<Scalars['JSONString']>;
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
};

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodType = Node &
  ObjectWithMetadata & {
    /**
     * List of channels available for the method.
     *
     * Requires one of the following permissions: MANAGE_SHIPPING.
     */
    channelListings?: Maybe<Array<ShippingMethodChannelListing>>;
    /**
     * Shipping method description.
     *
     * Rich text format. For reference see https://editorjs.io/
     */
    description?: Maybe<Scalars['JSONString']>;
    /**
     * List of excluded products for the shipping method.
     *
     * Requires one of the following permissions: MANAGE_SHIPPING.
     */
    excludedProducts?: Maybe<ProductCountableConnection>;
    /** Shipping method ID. */
    id: Scalars['ID'];
    /** Maximum number of days for delivery. */
    maximumDeliveryDays?: Maybe<Scalars['Int']>;
    /** The price of the cheapest variant (including discounts). */
    maximumOrderPrice?: Maybe<Money>;
    /** Maximum order weight to use this shipping method. */
    maximumOrderWeight?: Maybe<Weight>;
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** Minimal number of days for delivery. */
    minimumDeliveryDays?: Maybe<Scalars['Int']>;
    /** The price of the cheapest variant (including discounts). */
    minimumOrderPrice?: Maybe<Money>;
    /** Minimum order weight to use this shipping method. */
    minimumOrderWeight?: Maybe<Weight>;
    /** Shipping method name. */
    name: Scalars['String'];
    /** Postal code ranges rule of exclusion or inclusion of the shipping method. */
    postalCodeRules?: Maybe<Array<ShippingMethodPostalCodeRule>>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /**
     * Tax class assigned to this shipping method.
     *
     * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
     */
    taxClass?: Maybe<TaxClass>;
    /** Returns translated shipping method fields for the given language code. */
    translation?: Maybe<ShippingMethodTranslation>;
    /** Type of the shipping method. */
    type?: Maybe<ShippingMethodTypeEnum>;
  };

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTypeExcludedProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTypeMetafieldArgs = {
  key: Scalars['String'];
};

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTypeMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTypePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTypePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTypeTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** An enumeration. */
export enum ShippingMethodTypeEnum {
  Price = 'PRICE',
  Weight = 'WEIGHT'
}

/**
 * List of shipping methods available for the country.
 *
 * Added in Saleor 3.6.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingMethodsPerCountry = {
  /** The country code. */
  countryCode: CountryCode;
  /** List of available shipping methods. */
  shippingMethods?: Maybe<Array<ShippingMethod>>;
};

export type ShippingPostalCodeRulesCreateInputRange = {
  /** End range of the postal code. */
  end?: InputMaybe<Scalars['String']>;
  /** Start range of the postal code. */
  start: Scalars['String'];
};

/**
 * Deletes shipping prices.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingPriceBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
};

/**
 * Creates a new shipping price.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingPriceCreate = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  shippingMethod?: Maybe<ShippingMethodType>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
};

/**
 * Event sent when new shipping price is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The shipping method the event relates to. */
  shippingMethod?: Maybe<ShippingMethodType>;
  /** The shipping zone the shipping method belongs to. */
  shippingZone?: Maybe<ShippingZone>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new shipping price is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceCreatedShippingMethodArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new shipping price is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceCreatedShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a shipping price.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingPriceDelete = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  /** A shipping method to delete. */
  shippingMethod?: Maybe<ShippingMethodType>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
};

/**
 * Event sent when shipping price is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The shipping method the event relates to. */
  shippingMethod?: Maybe<ShippingMethodType>;
  /** The shipping zone the shipping method belongs to. */
  shippingZone?: Maybe<ShippingZone>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when shipping price is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceDeletedShippingMethodArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when shipping price is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceDeletedShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Exclude products from shipping price.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingPriceExcludeProducts = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  /** A shipping method with new list of excluded products. */
  shippingMethod?: Maybe<ShippingMethodType>;
};

export type ShippingPriceExcludeProductsInput = {
  /** List of products which will be excluded. */
  products: Array<Scalars['ID']>;
};

export type ShippingPriceInput = {
  /** Postal code rules to add. */
  addPostalCodeRules?: InputMaybe<Array<ShippingPostalCodeRulesCreateInputRange>>;
  /** Postal code rules to delete. */
  deletePostalCodeRules?: InputMaybe<Array<Scalars['ID']>>;
  /** Shipping method description. */
  description?: InputMaybe<Scalars['JSONString']>;
  /** Inclusion type for currently assigned postal code rules. */
  inclusionType?: InputMaybe<PostalCodeRuleInclusionTypeEnum>;
  /** Maximum number of days for delivery. */
  maximumDeliveryDays?: InputMaybe<Scalars['Int']>;
  /** Maximum order weight to use this shipping method. */
  maximumOrderWeight?: InputMaybe<Scalars['WeightScalar']>;
  /** Minimal number of days for delivery. */
  minimumDeliveryDays?: InputMaybe<Scalars['Int']>;
  /** Minimum order weight to use this shipping method. */
  minimumOrderWeight?: InputMaybe<Scalars['WeightScalar']>;
  /** Name of the shipping method. */
  name?: InputMaybe<Scalars['String']>;
  /** Shipping zone this method belongs to. */
  shippingZone?: InputMaybe<Scalars['ID']>;
  /** ID of a tax class to assign to this shipping method. If not provided, the default tax class will be used. */
  taxClass?: InputMaybe<Scalars['ID']>;
  /** Shipping type: price or weight based. */
  type?: InputMaybe<ShippingMethodTypeEnum>;
};

/**
 * Remove product from excluded list for shipping price.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingPriceRemoveProductFromExclude = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  /** A shipping method with new list of excluded products. */
  shippingMethod?: Maybe<ShippingMethodType>;
};

/**
 * Creates/updates translations for a shipping method.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type ShippingPriceTranslate = {
  errors: Array<TranslationError>;
  shippingMethod?: Maybe<ShippingMethodType>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type ShippingPriceTranslationInput = {
  /**
   * Translated shipping method description.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
  name?: InputMaybe<Scalars['String']>;
};

/**
 * Updates a new shipping price.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingPriceUpdate = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  shippingMethod?: Maybe<ShippingMethodType>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
};

/**
 * Event sent when shipping price is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The shipping method the event relates to. */
  shippingMethod?: Maybe<ShippingMethodType>;
  /** The shipping zone the shipping method belongs to. */
  shippingZone?: Maybe<ShippingZone>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when shipping price is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceUpdatedShippingMethodArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when shipping price is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingPriceUpdatedShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly. */
export type ShippingZone = Node &
  ObjectWithMetadata & {
    /** List of channels for shipping zone. */
    channels: Array<Channel>;
    /** List of countries available for the method. */
    countries: Array<CountryDisplay>;
    default: Scalars['Boolean'];
    /** Description of a shipping zone. */
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** Lowest and highest prices for the shipping. */
    priceRange?: Maybe<MoneyRange>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** List of shipping methods available for orders shipped to countries within this shipping zone. */
    shippingMethods?: Maybe<Array<ShippingMethodType>>;
    /** List of warehouses for shipping zone. */
    warehouses: Array<Warehouse>;
  };

/** Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly. */
export type ShippingZoneMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly. */
export type ShippingZoneMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly. */
export type ShippingZonePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly. */
export type ShippingZonePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Deletes shipping zones.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingZoneBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
};

export type ShippingZoneCountableConnection = {
  edges: Array<ShippingZoneCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ShippingZoneCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ShippingZone;
};

/**
 * Creates a new shipping zone.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingZoneCreate = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingZoneCreateInput = {
  /** List of channels to assign to the shipping zone. */
  addChannels?: InputMaybe<Array<Scalars['ID']>>;
  /** List of warehouses to assign to a shipping zone */
  addWarehouses?: InputMaybe<Array<Scalars['ID']>>;
  /** List of countries in this shipping zone. */
  countries?: InputMaybe<Array<Scalars['String']>>;
  /** Default shipping zone will be used for countries not covered by other zones. */
  default?: InputMaybe<Scalars['Boolean']>;
  /** Description of the shipping zone. */
  description?: InputMaybe<Scalars['String']>;
  /** Shipping zone's name. Visible only to the staff. */
  name?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new shipping zone is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The shipping zone the event relates to. */
  shippingZone?: Maybe<ShippingZone>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when new shipping zone is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneCreatedShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a shipping zone.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingZoneDelete = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

/**
 * Event sent when shipping zone is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The shipping zone the event relates to. */
  shippingZone?: Maybe<ShippingZone>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when shipping zone is deleted.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneDeletedShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export type ShippingZoneFilterInput = {
  channels?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when shipping zone metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneMetadataUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The shipping zone the event relates to. */
  shippingZone?: Maybe<ShippingZone>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when shipping zone metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneMetadataUpdatedShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Updates a new shipping zone.
 *
 * Requires one of the following permissions: MANAGE_SHIPPING.
 */
export type ShippingZoneUpdate = {
  errors: Array<ShippingError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingZoneUpdateInput = {
  /** List of channels to assign to the shipping zone. */
  addChannels?: InputMaybe<Array<Scalars['ID']>>;
  /** List of warehouses to assign to a shipping zone */
  addWarehouses?: InputMaybe<Array<Scalars['ID']>>;
  /** List of countries in this shipping zone. */
  countries?: InputMaybe<Array<Scalars['String']>>;
  /** Default shipping zone will be used for countries not covered by other zones. */
  default?: InputMaybe<Scalars['Boolean']>;
  /** Description of the shipping zone. */
  description?: InputMaybe<Scalars['String']>;
  /** Shipping zone's name. Visible only to the staff. */
  name?: InputMaybe<Scalars['String']>;
  /** List of channels to unassign from the shipping zone. */
  removeChannels?: InputMaybe<Array<Scalars['ID']>>;
  /** List of warehouses to unassign from a shipping zone */
  removeWarehouses?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Event sent when shipping zone is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The shipping zone the event relates to. */
  shippingZone?: Maybe<ShippingZone>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Event sent when shipping zone is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type ShippingZoneUpdatedShippingZoneArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Represents a shop resource containing general shop data and configuration. */
export type Shop = {
  /**
   * Enable automatic fulfillment for all digital products.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  automaticFulfillmentDigitalProducts?: Maybe<Scalars['Boolean']>;
  /** List of available external authentications. */
  availableExternalAuthentications: Array<ExternalAuthentication>;
  /** List of available payment gateways. */
  availablePaymentGateways: Array<PaymentGateway>;
  /** Shipping methods that are available for the shop. */
  availableShippingMethods?: Maybe<Array<ShippingMethod>>;
  /**
   * List of all currencies supported by shop's channels.
   *
   * Added in Saleor 3.1.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  channelCurrencies: Array<Scalars['String']>;
  /**
   * Charge taxes on shipping.
   * @deprecated This field will be removed in Saleor 4.0. Use `ShippingMethodType.taxClass` to determine whether taxes are calculated for shipping methods; if a tax class is set, the taxes will be calculated, otherwise no tax rate will be applied.
   */
  chargeTaxesOnShipping: Scalars['Boolean'];
  /** Company address. */
  companyAddress?: Maybe<Address>;
  /** List of countries available in the shop. */
  countries: Array<CountryDisplay>;
  /** URL of a view where customers can set their password. */
  customerSetPasswordUrl?: Maybe<Scalars['String']>;
  /** Shop's default country. */
  defaultCountry?: Maybe<CountryDisplay>;
  /**
   * Default number of max downloads per digital content URL.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  defaultDigitalMaxDownloads?: Maybe<Scalars['Int']>;
  /**
   * Default number of days which digital content URL will be valid.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  defaultDigitalUrlValidDays?: Maybe<Scalars['Int']>;
  /**
   * Default shop's email sender's address.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  defaultMailSenderAddress?: Maybe<Scalars['String']>;
  /**
   * Default shop's email sender's name.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  defaultMailSenderName?: Maybe<Scalars['String']>;
  /** Default weight unit. */
  defaultWeightUnit?: Maybe<WeightUnitsEnum>;
  /** Shop's description. */
  description?: Maybe<Scalars['String']>;
  /**
   * Display prices with tax in store.
   * @deprecated This field will be removed in Saleor 4.0. Use `Channel.taxConfiguration` to determine whether to display gross or net prices.
   */
  displayGrossPrices: Scalars['Boolean'];
  /** Shop's domain data. */
  domain: Domain;
  /**
   * Allow to approve fulfillments which are unpaid.
   *
   * Added in Saleor 3.1.
   */
  fulfillmentAllowUnpaid: Scalars['Boolean'];
  /**
   * Automatically approve all new fulfillments.
   *
   * Added in Saleor 3.1.
   */
  fulfillmentAutoApprove: Scalars['Boolean'];
  /** Header text. */
  headerText?: Maybe<Scalars['String']>;
  /**
   * Include taxes in prices.
   * @deprecated This field will be removed in Saleor 4.0. Use `Channel.taxConfiguration.pricesEnteredWithTax` to determine whether prices are entered with tax.
   */
  includeTaxesInPrices: Scalars['Boolean'];
  /** List of the shops's supported languages. */
  languages: Array<LanguageDisplay>;
  /**
   * Default number of maximum line quantity in single checkout (per single checkout line).
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  limitQuantityPerCheckout?: Maybe<Scalars['Int']>;
  /**
   * Resource limitations and current usage if any set for a shop
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
   */
  limits: LimitInfo;
  /** Shop's name. */
  name: Scalars['String'];
  /** List of available permissions. */
  permissions: Array<Permission>;
  /** List of possible phone prefixes. */
  phonePrefixes: Array<Scalars['String']>;
  /**
   * Default number of minutes stock will be reserved for anonymous checkout or null when stock reservation is disabled.
   *
   * Added in Saleor 3.1.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  reserveStockDurationAnonymousUser?: Maybe<Scalars['Int']>;
  /**
   * Default number of minutes stock will be reserved for authenticated checkout or null when stock reservation is disabled.
   *
   * Added in Saleor 3.1.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  reserveStockDurationAuthenticatedUser?: Maybe<Scalars['Int']>;
  /**
   * Minor Saleor API version.
   *
   * Added in Saleor 3.5.
   */
  schemaVersion: Scalars['String'];
  /**
   * List of staff notification recipients.
   *
   * Requires one of the following permissions: MANAGE_SETTINGS.
   */
  staffNotificationRecipients?: Maybe<Array<StaffNotificationRecipient>>;
  /** Enable inventory tracking. */
  trackInventoryByDefault?: Maybe<Scalars['Boolean']>;
  /** Returns translated shop fields for the given language code. */
  translation?: Maybe<ShopTranslation>;
  /**
   * Saleor API version.
   *
   * Requires one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP.
   */
  version: Scalars['String'];
};

/** Represents a shop resource containing general shop data and configuration. */
export type ShopAvailablePaymentGatewaysArgs = {
  channel?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};

/** Represents a shop resource containing general shop data and configuration. */
export type ShopAvailableShippingMethodsArgs = {
  address?: InputMaybe<AddressInput>;
  channel: Scalars['String'];
};

/** Represents a shop resource containing general shop data and configuration. */
export type ShopCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>;
  languageCode?: InputMaybe<LanguageCodeEnum>;
};

/** Represents a shop resource containing general shop data and configuration. */
export type ShopTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Update the shop's address. If the `null` value is passed, the currently selected address will be deleted.
 *
 * Requires one of the following permissions: MANAGE_SETTINGS.
 */
export type ShopAddressUpdate = {
  errors: Array<ShopError>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shopErrors: Array<ShopError>;
};

/**
 * Updates site domain of the shop.
 *
 * Requires one of the following permissions: MANAGE_SETTINGS.
 */
export type ShopDomainUpdate = {
  errors: Array<ShopError>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shopErrors: Array<ShopError>;
};

export type ShopError = {
  /** The error code. */
  code: ShopErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ShopErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  CannotFetchTaxRates = 'CANNOT_FETCH_TAX_RATES',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/**
 * Fetch tax rates.
 *
 * Requires one of the following permissions: MANAGE_SETTINGS.
 */
export type ShopFetchTaxRates = {
  errors: Array<ShopError>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shopErrors: Array<ShopError>;
};

export type ShopSettingsInput = {
  /** Enable automatic fulfillment for all digital products. */
  automaticFulfillmentDigitalProducts?: InputMaybe<Scalars['Boolean']>;
  /**
   * Charge taxes on shipping.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. To enable taxes for a shipping method, assign a tax class to the shipping method with `shippingPriceCreate` or `shippingPriceUpdate` mutations.
   */
  chargeTaxesOnShipping?: InputMaybe<Scalars['Boolean']>;
  /** URL of a view where customers can set their password. */
  customerSetPasswordUrl?: InputMaybe<Scalars['String']>;
  /** Default number of max downloads per digital content URL. */
  defaultDigitalMaxDownloads?: InputMaybe<Scalars['Int']>;
  /** Default number of days which digital content URL will be valid. */
  defaultDigitalUrlValidDays?: InputMaybe<Scalars['Int']>;
  /** Default email sender's address. */
  defaultMailSenderAddress?: InputMaybe<Scalars['String']>;
  /** Default email sender's name. */
  defaultMailSenderName?: InputMaybe<Scalars['String']>;
  /** Default weight unit. */
  defaultWeightUnit?: InputMaybe<WeightUnitsEnum>;
  /** SEO description. */
  description?: InputMaybe<Scalars['String']>;
  /**
   * Display prices with tax in store.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `taxConfigurationUpdate` mutation to configure this setting per channel or country.
   */
  displayGrossPrices?: InputMaybe<Scalars['Boolean']>;
  /**
   * Enable ability to approve fulfillments which are unpaid.
   *
   * Added in Saleor 3.1.
   */
  fulfillmentAllowUnpaid?: InputMaybe<Scalars['Boolean']>;
  /**
   * Enable automatic approval of all new fulfillments.
   *
   * Added in Saleor 3.1.
   */
  fulfillmentAutoApprove?: InputMaybe<Scalars['Boolean']>;
  /** Header text. */
  headerText?: InputMaybe<Scalars['String']>;
  /**
   * Include taxes in prices.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `taxConfigurationUpdate` mutation to configure this setting per channel or country.
   */
  includeTaxesInPrices?: InputMaybe<Scalars['Boolean']>;
  /**
   * Default number of maximum line quantity in single checkout. Minimum possible value is 1, default value is 50.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  limitQuantityPerCheckout?: InputMaybe<Scalars['Int']>;
  /**
   * Default number of minutes stock will be reserved for anonymous checkout. Enter 0 or null to disable.
   *
   * Added in Saleor 3.1.
   */
  reserveStockDurationAnonymousUser?: InputMaybe<Scalars['Int']>;
  /**
   * Default number of minutes stock will be reserved for authenticated checkout. Enter 0 or null to disable.
   *
   * Added in Saleor 3.1.
   */
  reserveStockDurationAuthenticatedUser?: InputMaybe<Scalars['Int']>;
  /** Enable inventory tracking. */
  trackInventoryByDefault?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Creates/updates translations for shop settings.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type ShopSettingsTranslate = {
  errors: Array<TranslationError>;
  /** Updated shop settings. */
  shop?: Maybe<Shop>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
};

export type ShopSettingsTranslationInput = {
  description?: InputMaybe<Scalars['String']>;
  headerText?: InputMaybe<Scalars['String']>;
};

/**
 * Updates shop settings.
 *
 * Requires one of the following permissions: MANAGE_SETTINGS.
 */
export type ShopSettingsUpdate = {
  errors: Array<ShopError>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shopErrors: Array<ShopError>;
};

export type ShopTranslation = Node & {
  description: Scalars['String'];
  headerText: Scalars['String'];
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
};

export type SiteDomainInput = {
  /** Domain name for shop. */
  domain?: InputMaybe<Scalars['String']>;
  /** Shop site name. */
  name?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes staff users. Apps are not allowed to perform this mutation.
 *
 * Requires one of the following permissions: MANAGE_STAFF.
 */
export type StaffBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<StaffError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  staffErrors: Array<StaffError>;
};

/**
 * Creates a new staff user. Apps are not allowed to perform this mutation.
 *
 * Requires one of the following permissions: MANAGE_STAFF.
 */
export type StaffCreate = {
  errors: Array<StaffError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

export type StaffCreateInput = {
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: InputMaybe<Array<Scalars['ID']>>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new staff user is created.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type StaffCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The user the event relates to. */
  user?: Maybe<User>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Deletes a staff user. Apps are not allowed to perform this mutation.
 *
 * Requires one of the following permissions: MANAGE_STAFF.
 */
export type StaffDelete = {
  errors: Array<StaffError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

/**
 * Event sent when staff user is deleted.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type StaffDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The user the event relates to. */
  user?: Maybe<User>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type StaffError = {
  /** A type of address that causes the error. */
  addressType?: Maybe<AddressTypeEnum>;
  /** The error code. */
  code: AccountErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** List of permission group IDs which cause the error. */
  groups?: Maybe<Array<Scalars['ID']>>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
  /** List of user IDs which causes the error. */
  users?: Maybe<Array<Scalars['ID']>>;
};

export enum StaffMemberStatus {
  /** User account has been activated. */
  Active = 'ACTIVE',
  /** User account has not been activated yet. */
  Deactivated = 'DEACTIVATED'
}

/** Represents a recipient of email notifications send by Saleor, such as notifications about new orders. Notifications can be assigned to staff users or arbitrary email addresses. */
export type StaffNotificationRecipient = Node & {
  /** Determines if a notification active. */
  active?: Maybe<Scalars['Boolean']>;
  /** Returns email address of a user subscribed to email notifications. */
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Returns a user subscribed to email notifications. */
  user?: Maybe<User>;
};

/**
 * Creates a new staff notification recipient.
 *
 * Requires one of the following permissions: MANAGE_SETTINGS.
 */
export type StaffNotificationRecipientCreate = {
  errors: Array<ShopError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

/**
 * Delete staff notification recipient.
 *
 * Requires one of the following permissions: MANAGE_SETTINGS.
 */
export type StaffNotificationRecipientDelete = {
  errors: Array<ShopError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

export type StaffNotificationRecipientInput = {
  /** Determines if a notification active. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Email address of a user subscribed to email notifications. */
  email?: InputMaybe<Scalars['String']>;
  /** The ID of the user subscribed to email notifications.. */
  user?: InputMaybe<Scalars['ID']>;
};

/**
 * Updates a staff notification recipient.
 *
 * Requires one of the following permissions: MANAGE_SETTINGS.
 */
export type StaffNotificationRecipientUpdate = {
  errors: Array<ShopError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

/**
 * Updates an existing staff user. Apps are not allowed to perform this mutation.
 *
 * Requires one of the following permissions: MANAGE_STAFF.
 */
export type StaffUpdate = {
  errors: Array<StaffError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

export type StaffUpdateInput = {
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: InputMaybe<Array<Scalars['ID']>>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** List of permission group IDs from which user should be unassigned. */
  removeGroups?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Event sent when staff user is updated.
 *
 * Added in Saleor 3.5.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type StaffUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The user the event relates to. */
  user?: Maybe<User>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type StaffUserInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StaffMemberStatus>;
};

/** Represents stock. */
export type Stock = Node & {
  id: Scalars['ID'];
  productVariant: ProductVariant;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS.
   */
  quantity: Scalars['Int'];
  /**
   * Quantity allocated for orders.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS.
   */
  quantityAllocated: Scalars['Int'];
  /**
   * Quantity reserved for checkouts.
   *
   * Requires one of the following permissions: MANAGE_PRODUCTS, MANAGE_ORDERS.
   */
  quantityReserved: Scalars['Int'];
  warehouse: Warehouse;
};

export enum StockAvailability {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK'
}

export type StockCountableConnection = {
  edges: Array<StockCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type StockCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Stock;
};

export type StockError = {
  /** The error code. */
  code: StockErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum StockErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type StockFilterInput = {
  quantity?: InputMaybe<Scalars['Float']>;
  search?: InputMaybe<Scalars['String']>;
};

export type StockInput = {
  /** Quantity of items available for sell. */
  quantity: Scalars['Int'];
  /** Warehouse in which stock is located. */
  warehouse: Scalars['ID'];
};

/**
 * Represents the channel stock settings.
 *
 * Added in Saleor 3.7.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type StockSettings = {
  /** Allocation strategy defines the preference of warehouses for allocations and reservations. */
  allocationStrategy: AllocationStrategyEnum;
};

export type StockSettingsInput = {
  /** Allocation strategy options. Strategy defines the preference of warehouses for allocations and reservations. */
  allocationStrategy: AllocationStrategyEnum;
};

export type StockUpdateInput = {
  /** Quantity of items available for sell. */
  quantity: Scalars['Int'];
  /** Stock. */
  stock: Scalars['ID'];
};

/** Enum representing the type of a payment storage in a gateway. */
export enum StorePaymentMethodEnum {
  /** Storage is disabled. The payment is not stored. */
  None = 'NONE',
  /** Off session storage type. The payment is stored to be reused even if the customer is absent. */
  OffSession = 'OFF_SESSION',
  /** On session storage type. The payment is stored only to be reused when the customer is present in the checkout flow. */
  OnSession = 'ON_SESSION'
}

/**
 * Define the filtering options for string fields.
 *
 * Added in Saleor 3.11.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type StringFilterInput = {
  /** The value equal to. */
  eq?: InputMaybe<Scalars['String']>;
  /** The value included in. */
  oneOf?: InputMaybe<Array<Scalars['String']>>;
};

export type Subscription = {
  /**
   * Look up subscription event.
   *
   * Added in Saleor 3.2.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  event?: Maybe<Event>;
};

export enum TaxCalculationStrategy {
  FlatRates = 'FLAT_RATES',
  TaxApp = 'TAX_APP'
}

/**
 * Tax class is a named object used to define tax rates per country. Tax class can be assigned to product types, products and shipping methods to define their tax rates.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxClass = Node &
  ObjectWithMetadata & {
    /** Country-specific tax rates for this tax class. */
    countries: Array<TaxClassCountryRate>;
    /** The ID of the object. */
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** Name of the tax class. */
    name: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
  };

/**
 * Tax class is a named object used to define tax rates per country. Tax class can be assigned to product types, products and shipping methods to define their tax rates.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxClassMetafieldArgs = {
  key: Scalars['String'];
};

/**
 * Tax class is a named object used to define tax rates per country. Tax class can be assigned to product types, products and shipping methods to define their tax rates.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxClassMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Tax class is a named object used to define tax rates per country. Tax class can be assigned to product types, products and shipping methods to define their tax rates.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxClassPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/**
 * Tax class is a named object used to define tax rates per country. Tax class can be assigned to product types, products and shipping methods to define their tax rates.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxClassPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type TaxClassCountableConnection = {
  edges: Array<TaxClassCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type TaxClassCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TaxClass;
};

/**
 * Tax rate for a country. When tax class is null, it represents the default tax rate for that country; otherwise it's a country tax rate specific to the given tax class.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxClassCountryRate = {
  /** Country in which this tax rate applies. */
  country: CountryDisplay;
  /** Tax rate value. */
  rate: Scalars['Float'];
  /** Related tax class. */
  taxClass?: Maybe<TaxClass>;
};

/**
 * Create a tax class.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_TAXES.
 */
export type TaxClassCreate = {
  errors: Array<TaxClassCreateError>;
  taxClass?: Maybe<TaxClass>;
};

export type TaxClassCreateError = {
  /** The error code. */
  code: TaxClassCreateErrorCode;
  /** List of country codes for which the configuration is invalid. */
  countryCodes: Array<Scalars['String']>;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TaxClassCreateErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

export type TaxClassCreateInput = {
  /** List of country-specific tax rates to create for this tax class. */
  createCountryRates?: InputMaybe<Array<CountryRateInput>>;
  /** Name of the tax class. */
  name: Scalars['String'];
};

/**
 * Delete a tax class. After deleting the tax class any products, product types or shipping methods using it are updated to use the default tax class.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_TAXES.
 */
export type TaxClassDelete = {
  errors: Array<TaxClassDeleteError>;
  taxClass?: Maybe<TaxClass>;
};

export type TaxClassDeleteError = {
  /** The error code. */
  code: TaxClassDeleteErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TaxClassDeleteErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

export type TaxClassFilterInput = {
  countries?: InputMaybe<Array<CountryCode>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
};

export type TaxClassRateInput = {
  /** Tax rate value. */
  rate?: InputMaybe<Scalars['Float']>;
  /** ID of a tax class for which to update the tax rate */
  taxClassId?: InputMaybe<Scalars['ID']>;
};

export enum TaxClassSortField {
  /** Sort tax classes by name. */
  Name = 'NAME'
}

export type TaxClassSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort tax classes by the selected field. */
  field: TaxClassSortField;
};

/**
 * Update a tax class.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_TAXES.
 */
export type TaxClassUpdate = {
  errors: Array<TaxClassUpdateError>;
  taxClass?: Maybe<TaxClass>;
};

export type TaxClassUpdateError = {
  /** The error code. */
  code: TaxClassUpdateErrorCode;
  /** List of country codes for which the configuration is invalid. */
  countryCodes: Array<Scalars['String']>;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TaxClassUpdateErrorCode {
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

export type TaxClassUpdateInput = {
  /** Name of the tax class. */
  name?: InputMaybe<Scalars['String']>;
  /** List of country codes for which to remove the tax class rates. Note: It removes all rates for given country code. */
  removeCountryRates?: InputMaybe<Array<CountryCode>>;
  /** List of country-specific tax rates to create or update for this tax class. */
  updateCountryRates?: InputMaybe<Array<CountryRateUpdateInput>>;
};

/**
 * Channel-specific tax configuration.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxConfiguration = Node &
  ObjectWithMetadata & {
    /** A channel to which the tax configuration applies to. */
    channel: Channel;
    /** Determines whether taxes are charged in the given channel. */
    chargeTaxes: Scalars['Boolean'];
    /** List of country-specific exceptions in tax configuration. */
    countries: Array<TaxConfigurationPerCountry>;
    /** Determines whether prices displayed in a storefront should include taxes. */
    displayGrossPrices: Scalars['Boolean'];
    /** The ID of the object. */
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /** Determines whether prices are entered with the tax included. */
    pricesEnteredWithTax: Scalars['Boolean'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** The default strategy to use for tax calculation in the given channel. Taxes can be calculated either using user-defined flat rates or with a tax app. Empty value means that no method is selected and taxes are not calculated. */
    taxCalculationStrategy?: Maybe<TaxCalculationStrategy>;
  };

/**
 * Channel-specific tax configuration.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxConfigurationMetafieldArgs = {
  key: Scalars['String'];
};

/**
 * Channel-specific tax configuration.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxConfigurationMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Channel-specific tax configuration.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxConfigurationPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/**
 * Channel-specific tax configuration.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxConfigurationPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

export type TaxConfigurationCountableConnection = {
  edges: Array<TaxConfigurationCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type TaxConfigurationCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TaxConfiguration;
};

export type TaxConfigurationFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
};

/**
 * Country-specific exceptions of a channel's tax configuration.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxConfigurationPerCountry = {
  /** Determines whether taxes are charged in this country. */
  chargeTaxes: Scalars['Boolean'];
  /** Country in which this configuration applies. */
  country: CountryDisplay;
  /** Determines whether prices displayed in a storefront should include taxes for this country. */
  displayGrossPrices: Scalars['Boolean'];
  /** A country-specific strategy to use for tax calculation. Taxes can be calculated either using user-defined flat rates or with a tax app. If not provided, use the value from the channel's tax configuration. */
  taxCalculationStrategy?: Maybe<TaxCalculationStrategy>;
};

export type TaxConfigurationPerCountryInput = {
  /** Determines whether taxes are charged in this country. */
  chargeTaxes: Scalars['Boolean'];
  /** Country in which this configuration applies. */
  countryCode: CountryCode;
  /** Determines whether prices displayed in a storefront should include taxes for this country. */
  displayGrossPrices: Scalars['Boolean'];
  /** A country-specific strategy to use for tax calculation. Taxes can be calculated either using user-defined flat rates or with a tax app. If not provided, use the value from the channel's tax configuration. */
  taxCalculationStrategy?: InputMaybe<TaxCalculationStrategy>;
};

/**
 * Update tax configuration for a channel.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_TAXES.
 */
export type TaxConfigurationUpdate = {
  errors: Array<TaxConfigurationUpdateError>;
  taxConfiguration?: Maybe<TaxConfiguration>;
};

export type TaxConfigurationUpdateError = {
  /** The error code. */
  code: TaxConfigurationUpdateErrorCode;
  /** List of country codes for which the configuration is invalid. */
  countryCodes: Array<Scalars['String']>;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TaxConfigurationUpdateErrorCode {
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

export type TaxConfigurationUpdateInput = {
  /** Determines whether taxes are charged in the given channel. */
  chargeTaxes?: InputMaybe<Scalars['Boolean']>;
  /** Determines whether prices displayed in a storefront should include taxes. */
  displayGrossPrices?: InputMaybe<Scalars['Boolean']>;
  /** Determines whether prices are entered with the tax included. */
  pricesEnteredWithTax?: InputMaybe<Scalars['Boolean']>;
  /** List of country codes for which to remove the tax configuration. */
  removeCountriesConfiguration?: InputMaybe<Array<CountryCode>>;
  /** The default strategy to use for tax calculation in the given channel. Taxes can be calculated either using user-defined flat rates or with a tax app. Empty value means that no method is selected and taxes are not calculated. */
  taxCalculationStrategy?: InputMaybe<TaxCalculationStrategy>;
  /** List of tax country configurations to create or update (identified by a country code). */
  updateCountriesConfiguration?: InputMaybe<Array<TaxConfigurationPerCountryInput>>;
};

/**
 * Tax class rates grouped by country.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TaxCountryConfiguration = {
  /** A country for which tax class rates are grouped. */
  country: CountryDisplay;
  /** List of tax class rates. */
  taxClassCountryRates: Array<TaxClassCountryRate>;
};

/**
 * Remove all tax class rates for a specific country.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_TAXES.
 */
export type TaxCountryConfigurationDelete = {
  errors: Array<TaxCountryConfigurationDeleteError>;
  /** Updated tax class rates grouped by a country. */
  taxCountryConfiguration?: Maybe<TaxCountryConfiguration>;
};

export type TaxCountryConfigurationDeleteError = {
  /** The error code. */
  code: TaxCountryConfigurationDeleteErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TaxCountryConfigurationDeleteErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND'
}

/**
 * Update tax class rates for a specific country.
 *
 * Added in Saleor 3.9.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_TAXES.
 */
export type TaxCountryConfigurationUpdate = {
  errors: Array<TaxCountryConfigurationUpdateError>;
  /** Updated tax class rates grouped by a country. */
  taxCountryConfiguration?: Maybe<TaxCountryConfiguration>;
};

export type TaxCountryConfigurationUpdateError = {
  /** The error code. */
  code: TaxCountryConfigurationUpdateErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of tax class IDs for which the update failed. */
  taxClassIds: Array<Scalars['String']>;
};

/** An enumeration. */
export enum TaxCountryConfigurationUpdateErrorCode {
  CannotCreateNegativeRate = 'CANNOT_CREATE_NEGATIVE_RATE',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  OnlyOneDefaultCountryRateAllowed = 'ONLY_ONE_DEFAULT_COUNTRY_RATE_ALLOWED'
}

/**
 * Exempt checkout or order from charging the taxes. When tax exemption is enabled, taxes won't be charged for the checkout or order. Taxes may still be calculated in cases when product prices are entered with the tax included and the net price needs to be known.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: MANAGE_TAXES.
 */
export type TaxExemptionManage = {
  errors: Array<TaxExemptionManageError>;
  taxableObject?: Maybe<TaxSourceObject>;
};

export type TaxExemptionManageError = {
  /** The error code. */
  code: TaxExemptionManageErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TaxExemptionManageErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotEditableOrder = 'NOT_EDITABLE_ORDER',
  NotFound = 'NOT_FOUND'
}

export type TaxSourceLine = CheckoutLine | OrderLine;

export type TaxSourceObject = Checkout | Order;

/** Representation of tax types fetched from tax gateway. */
export type TaxType = {
  /** Description of the tax type. */
  description?: Maybe<Scalars['String']>;
  /** External tax code used to identify given tax group. */
  taxCode?: Maybe<Scalars['String']>;
};

/** Taxable object. */
export type TaxableObject = {
  /** The address data. */
  address?: Maybe<Address>;
  channel: Channel;
  /** The currency of the object. */
  currency: Scalars['String'];
  /** List of discounts. */
  discounts: Array<TaxableObjectDiscount>;
  /** List of lines assigned to the object. */
  lines: Array<TaxableObjectLine>;
  /** Determines if prices contain entered tax.. */
  pricesEnteredWithTax: Scalars['Boolean'];
  /** The price of shipping method. */
  shippingPrice: Money;
  /** The source object related to this tax object. */
  sourceObject: TaxSourceObject;
};

/** Taxable object discount. */
export type TaxableObjectDiscount = {
  /** The amount of the discount. */
  amount: Money;
  /** The name of the discount. */
  name?: Maybe<Scalars['String']>;
};

export type TaxableObjectLine = {
  /** Determines if taxes are being charged for the product. */
  chargeTaxes: Scalars['Boolean'];
  /** The product name. */
  productName: Scalars['String'];
  /** The product sku. */
  productSku?: Maybe<Scalars['String']>;
  /** Number of items. */
  quantity: Scalars['Int'];
  /** The source line related to this tax line. */
  sourceLine: TaxSourceLine;
  /** Price of the order line. */
  totalPrice: Money;
  /** Price of the single item in the order line. */
  unitPrice: Money;
  /** The variant name. */
  variantName: Scalars['String'];
};

/** Represents a monetary value with taxes. In cases where taxes were not applied, net and gross values will be equal. */
export type TaxedMoney = {
  /** Currency code. */
  currency: Scalars['String'];
  /** Amount of money including taxes. */
  gross: Money;
  /** Amount of money without taxes. */
  net: Money;
  /** Amount of taxes. */
  tax: Money;
};

/** Represents a range of monetary values. */
export type TaxedMoneyRange = {
  /** Lower bound of a price range. */
  start?: Maybe<TaxedMoney>;
  /** Upper bound of a price range. */
  stop?: Maybe<TaxedMoney>;
};

/**
 * Event sent when thumbnail is created.
 *
 * Added in Saleor 3.12.
 */
export type ThumbnailCreated = Event & {
  /**
   * Thumbnail id.
   *
   * Added in Saleor 3.12.
   */
  id?: Maybe<Scalars['ID']>;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /**
   * Original media url.
   *
   * Added in Saleor 3.12.
   */
  mediaUrl?: Maybe<Scalars['String']>;
  /**
   * Object the thumbnail refers to.
   *
   * Added in Saleor 3.12.
   */
  objectId?: Maybe<Scalars['ID']>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /**
   * Thumbnail url.
   *
   * Added in Saleor 3.12.
   */
  url?: Maybe<Scalars['String']>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ThumbnailFormatEnum {
  Avif = 'AVIF',
  Original = 'ORIGINAL',
  Webp = 'WEBP'
}

export type TimePeriod = {
  /** The length of the period. */
  amount: Scalars['Int'];
  /** The type of the period. */
  type: TimePeriodTypeEnum;
};

export type TimePeriodInputType = {
  /** The length of the period. */
  amount: Scalars['Int'];
  /** The type of the period. */
  type: TimePeriodTypeEnum;
};

/** An enumeration. */
export enum TimePeriodTypeEnum {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

/** An object representing a single payment. */
export type Transaction = Node & {
  /** Total amount of the transaction. */
  amount?: Maybe<Money>;
  created: Scalars['DateTime'];
  error?: Maybe<Scalars['String']>;
  gatewayResponse: Scalars['JSONString'];
  id: Scalars['ID'];
  isSuccess: Scalars['Boolean'];
  kind: TransactionKind;
  payment: Payment;
  token: Scalars['String'];
};

export type TransactionAction = {
  /** Determines the action type. */
  actionType: TransactionActionEnum;
  /** Transaction request amount. Null when action type is VOID. */
  amount?: Maybe<Scalars['PositiveDecimal']>;
};

/**
 * Represents possible actions on payment transaction.
 *
 *     The following actions are possible:
 *     CHARGE - Represents the charge action.
 *     REFUND - Represents a refund action.
 *     VOID - Represents a void action.
 *
 */
export enum TransactionActionEnum {
  Charge = 'CHARGE',
  Refund = 'REFUND',
  Void = 'VOID'
}

/**
 * Event sent when transaction action is requested.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionActionRequest = Event & {
  /**
   * Requested action data.
   *
   * Added in Saleor 3.4.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  action: TransactionAction;
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /**
   * Look up a transaction.
   *
   * Added in Saleor 3.4.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  transaction?: Maybe<TransactionItem>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/**
 * Create transaction for checkout or order. Requires the following permissions: AUTHENTICATED_APP and HANDLE_PAYMENTS.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionCreate = {
  errors: Array<TransactionCreateError>;
  transaction?: Maybe<TransactionItem>;
};

export type TransactionCreateError = {
  /** The error code. */
  code: TransactionCreateErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TransactionCreateErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  IncorrectCurrency = 'INCORRECT_CURRENCY',
  Invalid = 'INVALID',
  MetadataKeyRequired = 'METADATA_KEY_REQUIRED',
  NotFound = 'NOT_FOUND'
}

export type TransactionCreateInput = {
  /** Amount authorized by this transaction. */
  amountAuthorized?: InputMaybe<MoneyInput>;
  /** Amount charged by this transaction. */
  amountCharged?: InputMaybe<MoneyInput>;
  /** Amount refunded by this transaction. */
  amountRefunded?: InputMaybe<MoneyInput>;
  /** Amount voided by this transaction. */
  amountVoided?: InputMaybe<MoneyInput>;
  /** List of all possible actions for the transaction */
  availableActions?: InputMaybe<Array<TransactionActionEnum>>;
  /** Payment public metadata. */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Payment private metadata. */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** Reference of the transaction. */
  reference?: InputMaybe<Scalars['String']>;
  /** Status of the transaction. */
  status: Scalars['String'];
  /** Payment type used for this transaction. */
  type: Scalars['String'];
};

/** Represents transaction's event. */
export type TransactionEvent = Node & {
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Name of the transaction's event. */
  name?: Maybe<Scalars['String']>;
  /** Reference of transaction's event. */
  reference: Scalars['String'];
  /** Status of transaction's event. */
  status: TransactionStatus;
};

export type TransactionEventInput = {
  /** Name of the transaction. */
  name?: InputMaybe<Scalars['String']>;
  /** Reference of the transaction. */
  reference?: InputMaybe<Scalars['String']>;
  /** Current status of the payment transaction. */
  status: TransactionStatus;
};

/**
 * Represents a payment transaction.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionItem = Node &
  ObjectWithMetadata & {
    /** List of actions that can be performed in the current state of a payment. */
    actions: Array<TransactionActionEnum>;
    /** Total amount authorized for this payment. */
    authorizedAmount: Money;
    /** Total amount charged for this payment. */
    chargedAmount: Money;
    createdAt: Scalars['DateTime'];
    /** List of all transaction's events. */
    events: Array<TransactionEvent>;
    /** The ID of the object. */
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    modifiedAt: Scalars['DateTime'];
    /**
     * The related order.
     *
     * Added in Saleor 3.6.
     */
    order?: Maybe<Order>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** Reference of transaction. */
    reference: Scalars['String'];
    /** Total amount refunded for this payment. */
    refundedAmount: Money;
    /** Status of transaction. */
    status: Scalars['String'];
    /** Type of transaction. */
    type: Scalars['String'];
    /** Total amount voided for this payment. */
    voidedAmount: Money;
  };

/**
 * Represents a payment transaction.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionItemMetafieldArgs = {
  key: Scalars['String'];
};

/**
 * Represents a payment transaction.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionItemMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Represents a payment transaction.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionItemPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/**
 * Represents a payment transaction.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionItemPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Event sent when transaction item metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionItemMetadataUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /**
   * Look up a transaction.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  transaction?: Maybe<TransactionItem>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TransactionKind {
  ActionToConfirm = 'ACTION_TO_CONFIRM',
  Auth = 'AUTH',
  Cancel = 'CANCEL',
  Capture = 'CAPTURE',
  Confirm = 'CONFIRM',
  External = 'EXTERNAL',
  Pending = 'PENDING',
  Refund = 'REFUND',
  RefundOngoing = 'REFUND_ONGOING',
  Void = 'VOID'
}

/**
 * Request an action for payment transaction.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: HANDLE_PAYMENTS, MANAGE_ORDERS.
 */
export type TransactionRequestAction = {
  errors: Array<TransactionRequestActionError>;
  transaction?: Maybe<TransactionItem>;
};

export type TransactionRequestActionError = {
  /** The error code. */
  code: TransactionRequestActionErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TransactionRequestActionErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  MissingTransactionActionRequestWebhook = 'MISSING_TRANSACTION_ACTION_REQUEST_WEBHOOK',
  NotFound = 'NOT_FOUND'
}

/** An enumeration. */
export enum TransactionStatus {
  Failure = 'FAILURE',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

/**
 * Create transaction for checkout or order. Requires the following permissions: AUTHENTICATED_APP and HANDLE_PAYMENTS.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TransactionUpdate = {
  errors: Array<TransactionUpdateError>;
  transaction?: Maybe<TransactionItem>;
};

export type TransactionUpdateError = {
  /** The error code. */
  code: TransactionUpdateErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TransactionUpdateErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  IncorrectCurrency = 'INCORRECT_CURRENCY',
  Invalid = 'INVALID',
  MetadataKeyRequired = 'METADATA_KEY_REQUIRED',
  NotFound = 'NOT_FOUND'
}

export type TransactionUpdateInput = {
  /** Amount authorized by this transaction. */
  amountAuthorized?: InputMaybe<MoneyInput>;
  /** Amount charged by this transaction. */
  amountCharged?: InputMaybe<MoneyInput>;
  /** Amount refunded by this transaction. */
  amountRefunded?: InputMaybe<MoneyInput>;
  /** Amount voided by this transaction. */
  amountVoided?: InputMaybe<MoneyInput>;
  /** List of all possible actions for the transaction */
  availableActions?: InputMaybe<Array<TransactionActionEnum>>;
  /** Payment public metadata. */
  metadata?: InputMaybe<Array<MetadataInput>>;
  /** Payment private metadata. */
  privateMetadata?: InputMaybe<Array<MetadataInput>>;
  /** Reference of the transaction. */
  reference?: InputMaybe<Scalars['String']>;
  /** Status of the transaction. */
  status?: InputMaybe<Scalars['String']>;
  /** Payment type used for this transaction. */
  type?: InputMaybe<Scalars['String']>;
};

export type TranslatableItem =
  | AttributeTranslatableContent
  | AttributeValueTranslatableContent
  | CategoryTranslatableContent
  | CollectionTranslatableContent
  | MenuItemTranslatableContent
  | PageTranslatableContent
  | ProductTranslatableContent
  | ProductVariantTranslatableContent
  | SaleTranslatableContent
  | ShippingMethodTranslatableContent
  | VoucherTranslatableContent;

export type TranslatableItemConnection = {
  edges: Array<TranslatableItemEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type TranslatableItemEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TranslatableItem;
};

export enum TranslatableKinds {
  Attribute = 'ATTRIBUTE',
  AttributeValue = 'ATTRIBUTE_VALUE',
  Category = 'CATEGORY',
  Collection = 'COLLECTION',
  MenuItem = 'MENU_ITEM',
  Page = 'PAGE',
  Product = 'PRODUCT',
  Sale = 'SALE',
  ShippingMethod = 'SHIPPING_METHOD',
  Variant = 'VARIANT',
  Voucher = 'VOUCHER'
}

/**
 * Event sent when new translation is created.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TranslationCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The translation the event relates to. */
  translation?: Maybe<TranslationTypes>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type TranslationError = {
  /** The error code. */
  code: TranslationErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum TranslationErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

export type TranslationInput = {
  /**
   * Translated description.
   *
   * Rich text format. For reference see https://editorjs.io/
   */
  description?: InputMaybe<Scalars['JSONString']>;
  name?: InputMaybe<Scalars['String']>;
  seoDescription?: InputMaybe<Scalars['String']>;
  seoTitle?: InputMaybe<Scalars['String']>;
};

export type TranslationTypes =
  | AttributeTranslation
  | AttributeValueTranslation
  | CategoryTranslation
  | CollectionTranslation
  | MenuItemTranslation
  | PageTranslation
  | ProductTranslation
  | ProductVariantTranslation
  | SaleTranslation
  | ShippingMethodTranslation
  | VoucherTranslation;

/**
 * Event sent when translation is updated.
 *
 * Added in Saleor 3.2.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type TranslationUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** The translation the event relates to. */
  translation?: Maybe<TranslationTypes>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
};

export type UpdateInvoiceInput = {
  /** Invoice number */
  number?: InputMaybe<Scalars['String']>;
  /** URL of an invoice to download. */
  url?: InputMaybe<Scalars['String']>;
};

/** Updates metadata of an object. To use it, you need to have access to the modified object. */
export type UpdateMetadata = {
  errors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  metadataErrors: Array<MetadataError>;
};

/** Updates private metadata of an object. To use it, you need to be an authenticated staff user or an app and have access to the modified object. */
export type UpdatePrivateMetadata = {
  errors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  metadataErrors: Array<MetadataError>;
};

export type UploadError = {
  /** The error code. */
  code: UploadErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum UploadErrorCode {
  GraphqlError = 'GRAPHQL_ERROR'
}

/** Represents user data. */
export type User = Node &
  ObjectWithMetadata & {
    /** List of all user's addresses. */
    addresses: Array<Address>;
    avatar?: Maybe<Image>;
    /**
     * Returns the last open checkout of this user.
     * @deprecated This field will be removed in Saleor 4.0. Use the `checkoutTokens` field to fetch the user checkouts.
     */
    checkout?: Maybe<Checkout>;
    /** Returns the checkout ID's assigned to this user. */
    checkoutIds?: Maybe<Array<Scalars['ID']>>;
    /**
     * Returns the checkout UUID's assigned to this user.
     * @deprecated This field will be removed in Saleor 4.0. Use `checkoutIds` instead.
     */
    checkoutTokens?: Maybe<Array<Scalars['UUID']>>;
    /**
     * Returns checkouts assigned to this user.
     *
     * Added in Saleor 3.8.
     */
    checkouts?: Maybe<CheckoutCountableConnection>;
    dateJoined: Scalars['DateTime'];
    defaultBillingAddress?: Maybe<Address>;
    defaultShippingAddress?: Maybe<Address>;
    /** List of user's permission groups which user can manage. */
    editableGroups?: Maybe<Array<Group>>;
    email: Scalars['String'];
    /**
     * List of events associated with the user.
     *
     * Requires one of the following permissions: MANAGE_USERS, MANAGE_STAFF.
     */
    events?: Maybe<Array<CustomerEvent>>;
    /**
     * External ID of this user.
     *
     * Added in Saleor 3.10.
     */
    externalReference?: Maybe<Scalars['String']>;
    firstName: Scalars['String'];
    /** List of the user gift cards. */
    giftCards?: Maybe<GiftCardCountableConnection>;
    id: Scalars['ID'];
    isActive: Scalars['Boolean'];
    isStaff: Scalars['Boolean'];
    /** User language code. */
    languageCode: LanguageCodeEnum;
    lastLogin?: Maybe<Scalars['DateTime']>;
    lastName: Scalars['String'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    /**
     * A note about the customer.
     *
     * Requires one of the following permissions: MANAGE_USERS, MANAGE_STAFF.
     */
    note?: Maybe<Scalars['String']>;
    /** List of user's orders. Requires one of the following permissions: MANAGE_STAFF, OWNER. */
    orders?: Maybe<OrderCountableConnection>;
    /** List of user's permission groups. */
    permissionGroups?: Maybe<Array<Group>>;
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /** List of stored payment sources. */
    storedPaymentSources?: Maybe<Array<PaymentSource>>;
    updatedAt: Scalars['DateTime'];
    /** List of user's permissions. */
    userPermissions?: Maybe<Array<UserPermission>>;
  };

/** Represents user data. */
export type UserAvatarArgs = {
  format?: InputMaybe<ThumbnailFormatEnum>;
  size?: InputMaybe<Scalars['Int']>;
};

/** Represents user data. */
export type UserCheckoutIdsArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Represents user data. */
export type UserCheckoutTokensArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Represents user data. */
export type UserCheckoutsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  channel?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Represents user data. */
export type UserGiftCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Represents user data. */
export type UserMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents user data. */
export type UserMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents user data. */
export type UserOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Represents user data. */
export type UserPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents user data. */
export type UserPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents user data. */
export type UserStoredPaymentSourcesArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a user avatar. Only for staff members.
 *
 * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
 */
export type UserAvatarDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/**
 * Create a user avatar. Only for staff members. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec
 *
 * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
 */
export type UserAvatarUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** An updated user instance. */
  user?: Maybe<User>;
};

/**
 * Activate or deactivate users.
 *
 * Requires one of the following permissions: MANAGE_USERS.
 */
export type UserBulkSetActive = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  errors: Array<AccountError>;
};

export type UserCountableConnection = {
  edges: Array<UserCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

export type UserCreateInput = {
  /** Slug of a channel which will be used for notify user. Optional when only one channel exists. */
  channel?: InputMaybe<Scalars['String']>;
  /** Billing address of the customer. */
  defaultBillingAddress?: InputMaybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: InputMaybe<AddressInput>;
  /** The unique email address of the user. */
  email?: InputMaybe<Scalars['String']>;
  /**
   * External ID of the customer.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** Given name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** User account is active. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** User language code. */
  languageCode?: InputMaybe<LanguageCodeEnum>;
  /** Family name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** A note about the user. */
  note?: InputMaybe<Scalars['String']>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: InputMaybe<Scalars['String']>;
};

export type UserPermission = {
  /** Internal code for permission. */
  code: PermissionEnum;
  /** Describe action(s) allowed to do by permission. */
  name: Scalars['String'];
  /** List of user permission groups which contains this permission. */
  sourcePermissionGroups?: Maybe<Array<Group>>;
};

export type UserPermissionSourcePermissionGroupsArgs = {
  userId: Scalars['ID'];
};

export enum UserSortField {
  /** Sort users by created at. */
  CreatedAt = 'CREATED_AT',
  /** Sort users by email. */
  Email = 'EMAIL',
  /** Sort users by first name. */
  FirstName = 'FIRST_NAME',
  /** Sort users by last modified at. */
  LastModifiedAt = 'LAST_MODIFIED_AT',
  /** Sort users by last name. */
  LastName = 'LAST_NAME',
  /** Sort users by order count. */
  OrderCount = 'ORDER_COUNT'
}

export type UserSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort users by the selected field. */
  field: UserSortField;
};

/** Represents a VAT rate for a country. */
export type Vat = {
  /** Country code. */
  countryCode: Scalars['String'];
  /** Country's VAT rate exceptions for specific types of goods. */
  reducedRates: Array<ReducedRate>;
  /** Standard VAT rate in percent. */
  standardRate?: Maybe<Scalars['Float']>;
};

export enum VariantAttributeScope {
  All = 'ALL',
  NotVariantSelection = 'NOT_VARIANT_SELECTION',
  VariantSelection = 'VARIANT_SELECTION'
}

/**
 * Assign an media to a product variant.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type VariantMediaAssign = {
  errors: Array<ProductError>;
  media?: Maybe<ProductMedia>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/**
 * Unassign an media from a product variant.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type VariantMediaUnassign = {
  errors: Array<ProductError>;
  media?: Maybe<ProductMedia>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Represents availability of a variant in the storefront. */
export type VariantPricingInfo = {
  /** The discount amount if in sale (null otherwise). */
  discount?: Maybe<TaxedMoney>;
  /** The discount amount in the local currency. */
  discountLocalCurrency?: Maybe<TaxedMoney>;
  /** Whether it is in sale or not. */
  onSale?: Maybe<Scalars['Boolean']>;
  /** The price, with any discount subtracted. */
  price?: Maybe<TaxedMoney>;
  /** The discounted price in the local currency. */
  priceLocalCurrency?: Maybe<TaxedMoney>;
  /** The price without any discount. */
  priceUndiscounted?: Maybe<TaxedMoney>;
};

/** Verify JWT token. */
export type VerifyToken = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  accountErrors: Array<AccountError>;
  errors: Array<AccountError>;
  /** Determine if token is valid or not. */
  isValid: Scalars['Boolean'];
  /** JWT payload. */
  payload?: Maybe<Scalars['GenericScalar']>;
  /** User assigned to token. */
  user?: Maybe<User>;
};

/** An enumeration. */
export enum VolumeUnitsEnum {
  AcreFt = 'ACRE_FT',
  AcreIn = 'ACRE_IN',
  CubicCentimeter = 'CUBIC_CENTIMETER',
  CubicDecimeter = 'CUBIC_DECIMETER',
  CubicFoot = 'CUBIC_FOOT',
  CubicInch = 'CUBIC_INCH',
  CubicMeter = 'CUBIC_METER',
  CubicMillimeter = 'CUBIC_MILLIMETER',
  CubicYard = 'CUBIC_YARD',
  FlOz = 'FL_OZ',
  Liter = 'LITER',
  Pint = 'PINT',
  Qt = 'QT'
}

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type Voucher = Node &
  ObjectWithMetadata & {
    applyOncePerCustomer: Scalars['Boolean'];
    applyOncePerOrder: Scalars['Boolean'];
    /** List of categories this voucher applies to. */
    categories?: Maybe<CategoryCountableConnection>;
    /**
     * List of availability in channels for the voucher.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    channelListings?: Maybe<Array<VoucherChannelListing>>;
    code: Scalars['String'];
    /**
     * List of collections this voucher applies to.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    collections?: Maybe<CollectionCountableConnection>;
    /** List of countries available for the shipping voucher. */
    countries?: Maybe<Array<CountryDisplay>>;
    /** Currency code for voucher. */
    currency?: Maybe<Scalars['String']>;
    /** Voucher value. */
    discountValue?: Maybe<Scalars['Float']>;
    /** Determines a type of discount for voucher - value or percentage */
    discountValueType: DiscountValueTypeEnum;
    endDate?: Maybe<Scalars['DateTime']>;
    id: Scalars['ID'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    minCheckoutItemsQuantity?: Maybe<Scalars['Int']>;
    /** Minimum order value to apply voucher. */
    minSpent?: Maybe<Money>;
    name?: Maybe<Scalars['String']>;
    onlyForStaff: Scalars['Boolean'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    /**
     * List of products this voucher applies to.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    products?: Maybe<ProductCountableConnection>;
    startDate: Scalars['DateTime'];
    /** Returns translated voucher fields for the given language code. */
    translation?: Maybe<VoucherTranslation>;
    /** Determines a type of voucher. */
    type: VoucherTypeEnum;
    usageLimit?: Maybe<Scalars['Int']>;
    used: Scalars['Int'];
    /**
     * List of product variants this voucher applies to.
     *
     * Added in Saleor 3.1.
     *
     * Requires one of the following permissions: MANAGE_DISCOUNTS.
     */
    variants?: Maybe<ProductVariantCountableConnection>;
  };

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherMetafieldArgs = {
  key: Scalars['String'];
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherPrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherPrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherVariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/**
 * Adds products, categories, collections to a voucher.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type VoucherAddCatalogues = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  /** Voucher of which catalogue IDs will be modified. */
  voucher?: Maybe<Voucher>;
};

/**
 * Deletes vouchers.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type VoucherBulkDelete = {
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
};

/** Represents voucher channel listing. */
export type VoucherChannelListing = Node & {
  channel: Channel;
  currency: Scalars['String'];
  discountValue: Scalars['Float'];
  id: Scalars['ID'];
  minSpent?: Maybe<Money>;
};

export type VoucherChannelListingAddInput = {
  /** ID of a channel. */
  channelId: Scalars['ID'];
  /** Value of the voucher. */
  discountValue?: InputMaybe<Scalars['PositiveDecimal']>;
  /** Min purchase amount required to apply the voucher. */
  minAmountSpent?: InputMaybe<Scalars['PositiveDecimal']>;
};

export type VoucherChannelListingInput = {
  /** List of channels to which the voucher should be assigned. */
  addChannels?: InputMaybe<Array<VoucherChannelListingAddInput>>;
  /** List of channels from which the voucher should be unassigned. */
  removeChannels?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Manage voucher's availability in channels.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type VoucherChannelListingUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  /** An updated voucher instance. */
  voucher?: Maybe<Voucher>;
};

export type VoucherCountableConnection = {
  edges: Array<VoucherCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type VoucherCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Voucher;
};

/**
 * Creates a new voucher.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type VoucherCreate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  voucher?: Maybe<Voucher>;
};

/**
 * Event sent when new voucher is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The voucher the event relates to. */
  voucher?: Maybe<Voucher>;
};

/**
 * Event sent when new voucher is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherCreatedVoucherArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Deletes a voucher.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type VoucherDelete = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  voucher?: Maybe<Voucher>;
};

/**
 * Event sent when voucher is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The voucher the event relates to. */
  voucher?: Maybe<Voucher>;
};

/**
 * Event sent when voucher is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherDeletedVoucherArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

export enum VoucherDiscountType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
  Shipping = 'SHIPPING'
}

export type VoucherFilterInput = {
  discountType?: InputMaybe<Array<VoucherDiscountType>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Array<MetadataFilter>>;
  search?: InputMaybe<Scalars['String']>;
  started?: InputMaybe<DateTimeRangeInput>;
  status?: InputMaybe<Array<DiscountStatusEnum>>;
  timesUsed?: InputMaybe<IntRangeInput>;
};

export type VoucherInput = {
  /** Voucher should be applied once per customer. */
  applyOncePerCustomer?: InputMaybe<Scalars['Boolean']>;
  /** Voucher should be applied to the cheapest item or entire order. */
  applyOncePerOrder?: InputMaybe<Scalars['Boolean']>;
  /** Categories discounted by the voucher. */
  categories?: InputMaybe<Array<Scalars['ID']>>;
  /** Code to use the voucher. */
  code?: InputMaybe<Scalars['String']>;
  /** Collections discounted by the voucher. */
  collections?: InputMaybe<Array<Scalars['ID']>>;
  /** Country codes that can be used with the shipping voucher. */
  countries?: InputMaybe<Array<Scalars['String']>>;
  /** Choices: fixed or percentage. */
  discountValueType?: InputMaybe<DiscountValueTypeEnum>;
  /** End date of the voucher in ISO 8601 format. */
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** Minimal quantity of checkout items required to apply the voucher. */
  minCheckoutItemsQuantity?: InputMaybe<Scalars['Int']>;
  /** Voucher name. */
  name?: InputMaybe<Scalars['String']>;
  /** Voucher can be used only by staff user. */
  onlyForStaff?: InputMaybe<Scalars['Boolean']>;
  /** Products discounted by the voucher. */
  products?: InputMaybe<Array<Scalars['ID']>>;
  /** Start date of the voucher in ISO 8601 format. */
  startDate?: InputMaybe<Scalars['DateTime']>;
  /** Voucher type: PRODUCT, CATEGORY SHIPPING or ENTIRE_ORDER. */
  type?: InputMaybe<VoucherTypeEnum>;
  /** Limit number of times this voucher can be used in total. */
  usageLimit?: InputMaybe<Scalars['Int']>;
  /**
   * Variants discounted by the voucher.
   *
   * Added in Saleor 3.1.
   */
  variants?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Event sent when voucher metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherMetadataUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The voucher the event relates to. */
  voucher?: Maybe<Voucher>;
};

/**
 * Event sent when voucher metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherMetadataUpdatedVoucherArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/**
 * Removes products, categories, collections from a voucher.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type VoucherRemoveCatalogues = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  /** Voucher of which catalogue IDs will be modified. */
  voucher?: Maybe<Voucher>;
};

export enum VoucherSortField {
  /** Sort vouchers by code. */
  Code = 'CODE',
  /** Sort vouchers by end date. */
  EndDate = 'END_DATE',
  /**
   * Sort vouchers by minimum spent amount.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  MinimumSpentAmount = 'MINIMUM_SPENT_AMOUNT',
  /** Sort vouchers by start date. */
  StartDate = 'START_DATE',
  /** Sort vouchers by type. */
  Type = 'TYPE',
  /** Sort vouchers by usage limit. */
  UsageLimit = 'USAGE_LIMIT',
  /**
   * Sort vouchers by value.
   *
   * This option requires a channel filter to work as the values can vary between channels.
   */
  Value = 'VALUE'
}

export type VoucherSortingInput = {
  /**
   * Specifies the channel in which to sort the data.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use root-level channel argument instead.
   */
  channel?: InputMaybe<Scalars['String']>;
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort vouchers by the selected field. */
  field: VoucherSortField;
};

export type VoucherTranslatableContent = Node & {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** Returns translated voucher fields for the given language code. */
  translation?: Maybe<VoucherTranslation>;
  /**
   * Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes.
   *
   * Requires one of the following permissions: MANAGE_DISCOUNTS.
   * @deprecated This field will be removed in Saleor 4.0. Get model fields from the root level queries.
   */
  voucher?: Maybe<Voucher>;
};

export type VoucherTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/**
 * Creates/updates translations for a voucher.
 *
 * Requires one of the following permissions: MANAGE_TRANSLATIONS.
 */
export type VoucherTranslate = {
  errors: Array<TranslationError>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  translationErrors: Array<TranslationError>;
  voucher?: Maybe<Voucher>;
};

export type VoucherTranslation = Node & {
  id: Scalars['ID'];
  /** Translation language. */
  language: LanguageDisplay;
  name?: Maybe<Scalars['String']>;
};

export enum VoucherTypeEnum {
  EntireOrder = 'ENTIRE_ORDER',
  Shipping = 'SHIPPING',
  SpecificProduct = 'SPECIFIC_PRODUCT'
}

/**
 * Updates a voucher.
 *
 * Requires one of the following permissions: MANAGE_DISCOUNTS.
 */
export type VoucherUpdate = {
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  discountErrors: Array<DiscountError>;
  errors: Array<DiscountError>;
  voucher?: Maybe<Voucher>;
};

/**
 * Event sent when voucher is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The voucher the event relates to. */
  voucher?: Maybe<Voucher>;
};

/**
 * Event sent when voucher is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type VoucherUpdatedVoucherArgs = {
  channel?: InputMaybe<Scalars['String']>;
};

/** Represents warehouse. */
export type Warehouse = Node &
  ObjectWithMetadata & {
    address: Address;
    /**
     * Click and collect options: local, all or disabled.
     *
     * Added in Saleor 3.1.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    clickAndCollectOption: WarehouseClickAndCollectOptionEnum;
    /**
     * Warehouse company name.
     * @deprecated This field will be removed in Saleor 4.0. Use `Address.companyName` instead.
     */
    companyName: Scalars['String'];
    email: Scalars['String'];
    /**
     * External ID of this warehouse.
     *
     * Added in Saleor 3.10.
     */
    externalReference?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    isPrivate: Scalars['Boolean'];
    /** List of public metadata items. Can be accessed without permissions. */
    metadata: Array<MetadataItem>;
    /**
     * A single key from public metadata.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafield?: Maybe<Scalars['String']>;
    /**
     * Public metadata. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    metafields?: Maybe<Scalars['Metadata']>;
    name: Scalars['String'];
    /** List of private metadata items. Requires staff permissions to access. */
    privateMetadata: Array<MetadataItem>;
    /**
     * A single key from private metadata. Requires staff permissions to access.
     *
     * Tip: Use GraphQL aliases to fetch multiple keys.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafield?: Maybe<Scalars['String']>;
    /**
     * Private metadata. Requires staff permissions to access. Use `keys` to control which fields you want to include. The default is to include everything.
     *
     * Added in Saleor 3.3.
     *
     * Note: this API is currently in Feature Preview and can be subject to changes at later point.
     */
    privateMetafields?: Maybe<Scalars['Metadata']>;
    shippingZones: ShippingZoneCountableConnection;
    slug: Scalars['String'];
  };

/** Represents warehouse. */
export type WarehouseMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents warehouse. */
export type WarehouseMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents warehouse. */
export type WarehousePrivateMetafieldArgs = {
  key: Scalars['String'];
};

/** Represents warehouse. */
export type WarehousePrivateMetafieldsArgs = {
  keys?: InputMaybe<Array<Scalars['String']>>;
};

/** Represents warehouse. */
export type WarehouseShippingZonesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** An enumeration. */
export enum WarehouseClickAndCollectOptionEnum {
  All = 'ALL',
  Disabled = 'DISABLED',
  Local = 'LOCAL'
}

export type WarehouseCountableConnection = {
  edges: Array<WarehouseCountableEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type WarehouseCountableEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Warehouse;
};

/**
 * Creates new warehouse.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type WarehouseCreate = {
  errors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  warehouseErrors: Array<WarehouseError>;
};

export type WarehouseCreateInput = {
  /** Address of the warehouse. */
  address: AddressInput;
  /** The email address of the warehouse. */
  email?: InputMaybe<Scalars['String']>;
  /**
   * External ID of the warehouse.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /** Warehouse name. */
  name: Scalars['String'];
  /**
   * Shipping zones supported by the warehouse.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Providing the zone ids will raise a ValidationError.
   */
  shippingZones?: InputMaybe<Array<Scalars['ID']>>;
  /** Warehouse slug. */
  slug?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when new warehouse is created.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type WarehouseCreated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The warehouse the event relates to. */
  warehouse?: Maybe<Warehouse>;
};

/**
 * Deletes selected warehouse.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type WarehouseDelete = {
  errors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  warehouseErrors: Array<WarehouseError>;
};

/**
 * Event sent when warehouse is deleted.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type WarehouseDeleted = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The warehouse the event relates to. */
  warehouse?: Maybe<Warehouse>;
};

export type WarehouseError = {
  /** The error code. */
  code: WarehouseErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** List of shipping zones IDs which causes the error. */
  shippingZones?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum WarehouseErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type WarehouseFilterInput = {
  channels?: InputMaybe<Array<Scalars['ID']>>;
  clickAndCollectOption?: InputMaybe<WarehouseClickAndCollectOptionEnum>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
};

/**
 * Event sent when warehouse metadata is updated.
 *
 * Added in Saleor 3.8.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type WarehouseMetadataUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The warehouse the event relates to. */
  warehouse?: Maybe<Warehouse>;
};

/**
 * Add shipping zone to given warehouse.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type WarehouseShippingZoneAssign = {
  errors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  warehouseErrors: Array<WarehouseError>;
};

/**
 * Remove shipping zone from given warehouse.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type WarehouseShippingZoneUnassign = {
  errors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  warehouseErrors: Array<WarehouseError>;
};

export enum WarehouseSortField {
  /** Sort warehouses by name. */
  Name = 'NAME'
}

export type WarehouseSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort warehouses by the selected field. */
  field: WarehouseSortField;
};

/**
 * Updates given warehouse.
 *
 * Requires one of the following permissions: MANAGE_PRODUCTS.
 */
export type WarehouseUpdate = {
  errors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  warehouseErrors: Array<WarehouseError>;
};

export type WarehouseUpdateInput = {
  /** Address of the warehouse. */
  address?: InputMaybe<AddressInput>;
  /**
   * Click and collect options: local, all or disabled.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  clickAndCollectOption?: InputMaybe<WarehouseClickAndCollectOptionEnum>;
  /** The email address of the warehouse. */
  email?: InputMaybe<Scalars['String']>;
  /**
   * External ID of the warehouse.
   *
   * Added in Saleor 3.10.
   */
  externalReference?: InputMaybe<Scalars['String']>;
  /**
   * Visibility of warehouse stocks.
   *
   * Added in Saleor 3.1.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  /** Warehouse name. */
  name?: InputMaybe<Scalars['String']>;
  /** Warehouse slug. */
  slug?: InputMaybe<Scalars['String']>;
};

/**
 * Event sent when warehouse is updated.
 *
 * Added in Saleor 3.4.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 */
export type WarehouseUpdated = Event & {
  /** Time of the event. */
  issuedAt?: Maybe<Scalars['DateTime']>;
  /** The user or application that triggered the event. */
  issuingPrincipal?: Maybe<IssuingPrincipal>;
  /** The application receiving the webhook. */
  recipient?: Maybe<App>;
  /** Saleor version that triggered the event. */
  version?: Maybe<Scalars['String']>;
  /** The warehouse the event relates to. */
  warehouse?: Maybe<Warehouse>;
};

/** Webhook. */
export type Webhook = Node & {
  app: App;
  /** List of asynchronous webhook events. */
  asyncEvents: Array<WebhookEventAsync>;
  /**
   * Custom headers, which will be added to HTTP request.
   *
   * Added in Saleor 3.12.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  customHeaders?: Maybe<Scalars['JSONString']>;
  /** Event deliveries. */
  eventDeliveries?: Maybe<EventDeliveryCountableConnection>;
  /**
   * List of webhook events.
   * @deprecated This field will be removed in Saleor 4.0. Use `asyncEvents` or `syncEvents` instead.
   */
  events: Array<WebhookEvent>;
  id: Scalars['ID'];
  /** Informs if webhook is activated. */
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  /**
   * Used to create a hash signature for each payload.
   * @deprecated This field will be removed in Saleor 4.0. As of Saleor 3.5, webhook payloads default to signing using a verifiable JWS.
   */
  secretKey?: Maybe<Scalars['String']>;
  /** Used to define payloads for specific events. */
  subscriptionQuery?: Maybe<Scalars['String']>;
  /** List of synchronous webhook events. */
  syncEvents: Array<WebhookEventSync>;
  /** Target URL for webhook. */
  targetUrl: Scalars['String'];
};

/** Webhook. */
export type WebhookEventDeliveriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<EventDeliveryFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<EventDeliverySortingInput>;
};

/**
 * Creates a new webhook subscription.
 *
 * Requires one of the following permissions: MANAGE_APPS, AUTHENTICATED_APP.
 */
export type WebhookCreate = {
  errors: Array<WebhookError>;
  webhook?: Maybe<Webhook>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  webhookErrors: Array<WebhookError>;
};

export type WebhookCreateInput = {
  /** ID of the app to which webhook belongs. */
  app?: InputMaybe<Scalars['ID']>;
  /** The asynchronous events that webhook wants to subscribe. */
  asyncEvents?: InputMaybe<Array<WebhookEventTypeAsyncEnum>>;
  /**
   * Custom headers, which will be added to HTTP request. There is a limitation of 5 headers per webhook and 998 characters per header.Only "X-*" and "Authorization*" keys are allowed.
   *
   * Added in Saleor 3.12.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  customHeaders?: InputMaybe<Scalars['JSONString']>;
  /**
   * The events that webhook wants to subscribe.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `asyncEvents` or `syncEvents` instead.
   */
  events?: InputMaybe<Array<WebhookEventTypeEnum>>;
  /** Determine if webhook will be set active or not. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** The name of the webhook. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Subscription query used to define a webhook payload.
   *
   * Added in Saleor 3.2.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  query?: InputMaybe<Scalars['String']>;
  /**
   * The secret key used to create a hash signature with each payload.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. As of Saleor 3.5, webhook payloads default to signing using a verifiable JWS.
   */
  secretKey?: InputMaybe<Scalars['String']>;
  /** The synchronous events that webhook wants to subscribe. */
  syncEvents?: InputMaybe<Array<WebhookEventTypeSyncEnum>>;
  /** The url to receive the payload. */
  targetUrl?: InputMaybe<Scalars['String']>;
};

/**
 * Delete a webhook. Before the deletion, the webhook is deactivated to pause any deliveries that are already scheduled. The deletion might fail if delivery is in progress. In such a case, the webhook is not deleted but remains deactivated.
 *
 * Requires one of the following permissions: MANAGE_APPS, AUTHENTICATED_APP.
 */
export type WebhookDelete = {
  errors: Array<WebhookError>;
  webhook?: Maybe<Webhook>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  webhookErrors: Array<WebhookError>;
};

/**
 * Performs a dry run of a webhook event. Supports a single event (the first, if multiple provided in the `query`). Requires permission relevant to processed event.
 *
 * Added in Saleor 3.11.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
 */
export type WebhookDryRun = {
  errors: Array<WebhookDryRunError>;
  /** JSON payload, that would be sent out to webhook's target URL. */
  payload?: Maybe<Scalars['JSONString']>;
};

export type WebhookDryRunError = {
  /** The error code. */
  code: WebhookDryRunErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum WebhookDryRunErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  InvalidId = 'INVALID_ID',
  MissingEvent = 'MISSING_EVENT',
  MissingPermission = 'MISSING_PERMISSION',
  MissingSubscription = 'MISSING_SUBSCRIPTION',
  NotFound = 'NOT_FOUND',
  Syntax = 'SYNTAX',
  TypeNotSupported = 'TYPE_NOT_SUPPORTED',
  UnableToParse = 'UNABLE_TO_PARSE'
}

export type WebhookError = {
  /** The error code. */
  code: WebhookErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum WebhookErrorCode {
  DeleteFailed = 'DELETE_FAILED',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidCustomHeaders = 'INVALID_CUSTOM_HEADERS',
  MissingEvent = 'MISSING_EVENT',
  MissingSubscription = 'MISSING_SUBSCRIPTION',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Syntax = 'SYNTAX',
  UnableToParse = 'UNABLE_TO_PARSE',
  Unique = 'UNIQUE'
}

/** Webhook event. */
export type WebhookEvent = {
  /** Internal name of the event type. */
  eventType: WebhookEventTypeEnum;
  /** Display name of the event. */
  name: Scalars['String'];
};

/** Asynchronous webhook event. */
export type WebhookEventAsync = {
  /** Internal name of the event type. */
  eventType: WebhookEventTypeAsyncEnum;
  /** Display name of the event. */
  name: Scalars['String'];
};

/** Synchronous webhook event. */
export type WebhookEventSync = {
  /** Internal name of the event type. */
  eventType: WebhookEventTypeSyncEnum;
  /** Display name of the event. */
  name: Scalars['String'];
};

/** Enum determining type of webhook. */
export enum WebhookEventTypeAsyncEnum {
  /** A new address created. */
  AddressCreated = 'ADDRESS_CREATED',
  /** An address deleted. */
  AddressDeleted = 'ADDRESS_DELETED',
  /** An address updated. */
  AddressUpdated = 'ADDRESS_UPDATED',
  /** All the events. */
  AnyEvents = 'ANY_EVENTS',
  /** An app deleted. */
  AppDeleted = 'APP_DELETED',
  /** A new app installed. */
  AppInstalled = 'APP_INSTALLED',
  /** An app status is changed. */
  AppStatusChanged = 'APP_STATUS_CHANGED',
  /** An app updated. */
  AppUpdated = 'APP_UPDATED',
  /** A new attribute is created. */
  AttributeCreated = 'ATTRIBUTE_CREATED',
  /** An attribute is deleted. */
  AttributeDeleted = 'ATTRIBUTE_DELETED',
  /** An attribute is updated. */
  AttributeUpdated = 'ATTRIBUTE_UPDATED',
  /** A new attribute value is created. */
  AttributeValueCreated = 'ATTRIBUTE_VALUE_CREATED',
  /** An attribute value is deleted. */
  AttributeValueDeleted = 'ATTRIBUTE_VALUE_DELETED',
  /** An attribute value is updated. */
  AttributeValueUpdated = 'ATTRIBUTE_VALUE_UPDATED',
  /** A new category created. */
  CategoryCreated = 'CATEGORY_CREATED',
  /** A category is deleted. */
  CategoryDeleted = 'CATEGORY_DELETED',
  /** A category is updated. */
  CategoryUpdated = 'CATEGORY_UPDATED',
  /** A new channel created. */
  ChannelCreated = 'CHANNEL_CREATED',
  /** A channel is deleted. */
  ChannelDeleted = 'CHANNEL_DELETED',
  /** A channel status is changed. */
  ChannelStatusChanged = 'CHANNEL_STATUS_CHANGED',
  /** A channel is updated. */
  ChannelUpdated = 'CHANNEL_UPDATED',
  /** A new checkout is created. */
  CheckoutCreated = 'CHECKOUT_CREATED',
  /**
   * A checkout metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CheckoutMetadataUpdated = 'CHECKOUT_METADATA_UPDATED',
  /** A checkout is updated. It also triggers all updates related to the checkout. */
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  /** A new collection is created. */
  CollectionCreated = 'COLLECTION_CREATED',
  /** A collection is deleted. */
  CollectionDeleted = 'COLLECTION_DELETED',
  /**
   * A collection metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CollectionMetadataUpdated = 'COLLECTION_METADATA_UPDATED',
  /** A collection is updated. */
  CollectionUpdated = 'COLLECTION_UPDATED',
  /** A new customer account is created. */
  CustomerCreated = 'CUSTOMER_CREATED',
  /** A customer account is deleted. */
  CustomerDeleted = 'CUSTOMER_DELETED',
  /**
   * A customer account metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CustomerMetadataUpdated = 'CUSTOMER_METADATA_UPDATED',
  /** A customer account is updated. */
  CustomerUpdated = 'CUSTOMER_UPDATED',
  /** A draft order is created. */
  DraftOrderCreated = 'DRAFT_ORDER_CREATED',
  /** A draft order is deleted. */
  DraftOrderDeleted = 'DRAFT_ORDER_DELETED',
  /** A draft order is updated. */
  DraftOrderUpdated = 'DRAFT_ORDER_UPDATED',
  /** A fulfillment is approved. */
  FulfillmentApproved = 'FULFILLMENT_APPROVED',
  /** A fulfillment is cancelled. */
  FulfillmentCanceled = 'FULFILLMENT_CANCELED',
  /** A new fulfillment is created. */
  FulfillmentCreated = 'FULFILLMENT_CREATED',
  /**
   * A fulfillment metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  FulfillmentMetadataUpdated = 'FULFILLMENT_METADATA_UPDATED',
  /** A new gift card created. */
  GiftCardCreated = 'GIFT_CARD_CREATED',
  /** A gift card is deleted. */
  GiftCardDeleted = 'GIFT_CARD_DELETED',
  /**
   * A gift card metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  GiftCardMetadataUpdated = 'GIFT_CARD_METADATA_UPDATED',
  /** A gift card status is changed. */
  GiftCardStatusChanged = 'GIFT_CARD_STATUS_CHANGED',
  /** A gift card is updated. */
  GiftCardUpdated = 'GIFT_CARD_UPDATED',
  /** An invoice is deleted. */
  InvoiceDeleted = 'INVOICE_DELETED',
  /** An invoice for order requested. */
  InvoiceRequested = 'INVOICE_REQUESTED',
  /** Invoice has been sent. */
  InvoiceSent = 'INVOICE_SENT',
  /** A new menu created. */
  MenuCreated = 'MENU_CREATED',
  /** A menu is deleted. */
  MenuDeleted = 'MENU_DELETED',
  /** A new menu item created. */
  MenuItemCreated = 'MENU_ITEM_CREATED',
  /** A menu item is deleted. */
  MenuItemDeleted = 'MENU_ITEM_DELETED',
  /** A menu item is updated. */
  MenuItemUpdated = 'MENU_ITEM_UPDATED',
  /** A menu is updated. */
  MenuUpdated = 'MENU_UPDATED',
  /** User notification triggered. */
  NotifyUser = 'NOTIFY_USER',
  /** An observability event is created. */
  Observability = 'OBSERVABILITY',
  /** An order is cancelled. */
  OrderCancelled = 'ORDER_CANCELLED',
  /** An order is confirmed (status change unconfirmed -> unfulfilled) by a staff user using the OrderConfirm mutation. It also triggers when the user completes the checkout and the shop setting `automatically_confirm_all_new_orders` is enabled. */
  OrderConfirmed = 'ORDER_CONFIRMED',
  /** A new order is placed. */
  OrderCreated = 'ORDER_CREATED',
  /** An order is fulfilled. */
  OrderFulfilled = 'ORDER_FULFILLED',
  /** Payment is made and an order is fully paid. */
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  /**
   * An order metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  OrderMetadataUpdated = 'ORDER_METADATA_UPDATED',
  /** An order is updated; triggered for all changes related to an order; covers all other order webhooks, except for ORDER_CREATED. */
  OrderUpdated = 'ORDER_UPDATED',
  /** A new page is created. */
  PageCreated = 'PAGE_CREATED',
  /** A page is deleted. */
  PageDeleted = 'PAGE_DELETED',
  /** A new page type is created. */
  PageTypeCreated = 'PAGE_TYPE_CREATED',
  /** A page type is deleted. */
  PageTypeDeleted = 'PAGE_TYPE_DELETED',
  /** A page type is updated. */
  PageTypeUpdated = 'PAGE_TYPE_UPDATED',
  /** A page is updated. */
  PageUpdated = 'PAGE_UPDATED',
  /** A new permission group is created. */
  PermissionGroupCreated = 'PERMISSION_GROUP_CREATED',
  /** A permission group is deleted. */
  PermissionGroupDeleted = 'PERMISSION_GROUP_DELETED',
  /** A permission group is updated. */
  PermissionGroupUpdated = 'PERMISSION_GROUP_UPDATED',
  /** A new product is created. */
  ProductCreated = 'PRODUCT_CREATED',
  /** A product is deleted. */
  ProductDeleted = 'PRODUCT_DELETED',
  /**
   * A new product media is created.
   *
   * Added in Saleor 3.12.
   */
  ProductMediaCreated = 'PRODUCT_MEDIA_CREATED',
  /**
   * A product media is deleted.
   *
   * Added in Saleor 3.12.
   */
  ProductMediaDeleted = 'PRODUCT_MEDIA_DELETED',
  /**
   * A product media is updated.
   *
   * Added in Saleor 3.12.
   */
  ProductMediaUpdated = 'PRODUCT_MEDIA_UPDATED',
  /**
   * A product metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  ProductMetadataUpdated = 'PRODUCT_METADATA_UPDATED',
  /** A product is updated. */
  ProductUpdated = 'PRODUCT_UPDATED',
  /** A product variant is back in stock. */
  ProductVariantBackInStock = 'PRODUCT_VARIANT_BACK_IN_STOCK',
  /** A new product variant is created. */
  ProductVariantCreated = 'PRODUCT_VARIANT_CREATED',
  /** A product variant is deleted. */
  ProductVariantDeleted = 'PRODUCT_VARIANT_DELETED',
  /**
   * A product variant metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  ProductVariantMetadataUpdated = 'PRODUCT_VARIANT_METADATA_UPDATED',
  /** A product variant is out of stock. */
  ProductVariantOutOfStock = 'PRODUCT_VARIANT_OUT_OF_STOCK',
  /** A product variant stock is updated */
  ProductVariantStockUpdated = 'PRODUCT_VARIANT_STOCK_UPDATED',
  /** A product variant is updated. */
  ProductVariantUpdated = 'PRODUCT_VARIANT_UPDATED',
  /** A sale is created. */
  SaleCreated = 'SALE_CREATED',
  /** A sale is deleted. */
  SaleDeleted = 'SALE_DELETED',
  /** A sale is activated or deactivated. */
  SaleToggle = 'SALE_TOGGLE',
  /** A sale is updated. */
  SaleUpdated = 'SALE_UPDATED',
  /** A new shipping price is created. */
  ShippingPriceCreated = 'SHIPPING_PRICE_CREATED',
  /** A shipping price is deleted. */
  ShippingPriceDeleted = 'SHIPPING_PRICE_DELETED',
  /** A shipping price is updated. */
  ShippingPriceUpdated = 'SHIPPING_PRICE_UPDATED',
  /** A new shipping zone is created. */
  ShippingZoneCreated = 'SHIPPING_ZONE_CREATED',
  /** A shipping zone is deleted. */
  ShippingZoneDeleted = 'SHIPPING_ZONE_DELETED',
  /**
   * A shipping zone metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  ShippingZoneMetadataUpdated = 'SHIPPING_ZONE_METADATA_UPDATED',
  /** A shipping zone is updated. */
  ShippingZoneUpdated = 'SHIPPING_ZONE_UPDATED',
  /** A new staff user is created. */
  StaffCreated = 'STAFF_CREATED',
  /** A staff user is deleted. */
  StaffDeleted = 'STAFF_DELETED',
  /** A staff user is updated. */
  StaffUpdated = 'STAFF_UPDATED',
  /**
   * A thumbnail is created.
   *
   * Added in Saleor 3.12.
   */
  ThumbnailCreated = 'THUMBNAIL_CREATED',
  /** An action requested for transaction. */
  TransactionActionRequest = 'TRANSACTION_ACTION_REQUEST',
  /**
   * Transaction item metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  TransactionItemMetadataUpdated = 'TRANSACTION_ITEM_METADATA_UPDATED',
  /** A new translation is created. */
  TranslationCreated = 'TRANSLATION_CREATED',
  /** A translation is updated. */
  TranslationUpdated = 'TRANSLATION_UPDATED',
  /** A new voucher created. */
  VoucherCreated = 'VOUCHER_CREATED',
  /** A voucher is deleted. */
  VoucherDeleted = 'VOUCHER_DELETED',
  /**
   * A voucher metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  VoucherMetadataUpdated = 'VOUCHER_METADATA_UPDATED',
  /** A voucher is updated. */
  VoucherUpdated = 'VOUCHER_UPDATED',
  /** A new warehouse created. */
  WarehouseCreated = 'WAREHOUSE_CREATED',
  /** A warehouse is deleted. */
  WarehouseDeleted = 'WAREHOUSE_DELETED',
  /**
   * A warehouse metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  WarehouseMetadataUpdated = 'WAREHOUSE_METADATA_UPDATED',
  /** A warehouse is updated. */
  WarehouseUpdated = 'WAREHOUSE_UPDATED'
}

/** Enum determining type of webhook. */
export enum WebhookEventTypeEnum {
  /** A new address created. */
  AddressCreated = 'ADDRESS_CREATED',
  /** An address deleted. */
  AddressDeleted = 'ADDRESS_DELETED',
  /** An address updated. */
  AddressUpdated = 'ADDRESS_UPDATED',
  /** All the events. */
  AnyEvents = 'ANY_EVENTS',
  /** An app deleted. */
  AppDeleted = 'APP_DELETED',
  /** A new app installed. */
  AppInstalled = 'APP_INSTALLED',
  /** An app status is changed. */
  AppStatusChanged = 'APP_STATUS_CHANGED',
  /** An app updated. */
  AppUpdated = 'APP_UPDATED',
  /** A new attribute is created. */
  AttributeCreated = 'ATTRIBUTE_CREATED',
  /** An attribute is deleted. */
  AttributeDeleted = 'ATTRIBUTE_DELETED',
  /** An attribute is updated. */
  AttributeUpdated = 'ATTRIBUTE_UPDATED',
  /** A new attribute value is created. */
  AttributeValueCreated = 'ATTRIBUTE_VALUE_CREATED',
  /** An attribute value is deleted. */
  AttributeValueDeleted = 'ATTRIBUTE_VALUE_DELETED',
  /** An attribute value is updated. */
  AttributeValueUpdated = 'ATTRIBUTE_VALUE_UPDATED',
  /** A new category created. */
  CategoryCreated = 'CATEGORY_CREATED',
  /** A category is deleted. */
  CategoryDeleted = 'CATEGORY_DELETED',
  /** A category is updated. */
  CategoryUpdated = 'CATEGORY_UPDATED',
  /** A new channel created. */
  ChannelCreated = 'CHANNEL_CREATED',
  /** A channel is deleted. */
  ChannelDeleted = 'CHANNEL_DELETED',
  /** A channel status is changed. */
  ChannelStatusChanged = 'CHANNEL_STATUS_CHANGED',
  /** A channel is updated. */
  ChannelUpdated = 'CHANNEL_UPDATED',
  /**
   * Event called for checkout tax calculation.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CheckoutCalculateTaxes = 'CHECKOUT_CALCULATE_TAXES',
  /** A new checkout is created. */
  CheckoutCreated = 'CHECKOUT_CREATED',
  /** Filter shipping methods for checkout. */
  CheckoutFilterShippingMethods = 'CHECKOUT_FILTER_SHIPPING_METHODS',
  /**
   * A checkout metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CheckoutMetadataUpdated = 'CHECKOUT_METADATA_UPDATED',
  /** A checkout is updated. It also triggers all updates related to the checkout. */
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  /** A new collection is created. */
  CollectionCreated = 'COLLECTION_CREATED',
  /** A collection is deleted. */
  CollectionDeleted = 'COLLECTION_DELETED',
  /**
   * A collection metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CollectionMetadataUpdated = 'COLLECTION_METADATA_UPDATED',
  /** A collection is updated. */
  CollectionUpdated = 'COLLECTION_UPDATED',
  /** A new customer account is created. */
  CustomerCreated = 'CUSTOMER_CREATED',
  /** A customer account is deleted. */
  CustomerDeleted = 'CUSTOMER_DELETED',
  /**
   * A customer account metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CustomerMetadataUpdated = 'CUSTOMER_METADATA_UPDATED',
  /** A customer account is updated. */
  CustomerUpdated = 'CUSTOMER_UPDATED',
  /** A draft order is created. */
  DraftOrderCreated = 'DRAFT_ORDER_CREATED',
  /** A draft order is deleted. */
  DraftOrderDeleted = 'DRAFT_ORDER_DELETED',
  /** A draft order is updated. */
  DraftOrderUpdated = 'DRAFT_ORDER_UPDATED',
  /** A fulfillment is approved. */
  FulfillmentApproved = 'FULFILLMENT_APPROVED',
  /** A fulfillment is cancelled. */
  FulfillmentCanceled = 'FULFILLMENT_CANCELED',
  /** A new fulfillment is created. */
  FulfillmentCreated = 'FULFILLMENT_CREATED',
  /**
   * A fulfillment metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  FulfillmentMetadataUpdated = 'FULFILLMENT_METADATA_UPDATED',
  /** A new gift card created. */
  GiftCardCreated = 'GIFT_CARD_CREATED',
  /** A gift card is deleted. */
  GiftCardDeleted = 'GIFT_CARD_DELETED',
  /**
   * A gift card metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  GiftCardMetadataUpdated = 'GIFT_CARD_METADATA_UPDATED',
  /** A gift card status is changed. */
  GiftCardStatusChanged = 'GIFT_CARD_STATUS_CHANGED',
  /** A gift card is updated. */
  GiftCardUpdated = 'GIFT_CARD_UPDATED',
  /** An invoice is deleted. */
  InvoiceDeleted = 'INVOICE_DELETED',
  /** An invoice for order requested. */
  InvoiceRequested = 'INVOICE_REQUESTED',
  /** Invoice has been sent. */
  InvoiceSent = 'INVOICE_SENT',
  /** A new menu created. */
  MenuCreated = 'MENU_CREATED',
  /** A menu is deleted. */
  MenuDeleted = 'MENU_DELETED',
  /** A new menu item created. */
  MenuItemCreated = 'MENU_ITEM_CREATED',
  /** A menu item is deleted. */
  MenuItemDeleted = 'MENU_ITEM_DELETED',
  /** A menu item is updated. */
  MenuItemUpdated = 'MENU_ITEM_UPDATED',
  /** A menu is updated. */
  MenuUpdated = 'MENU_UPDATED',
  /** User notification triggered. */
  NotifyUser = 'NOTIFY_USER',
  /** An observability event is created. */
  Observability = 'OBSERVABILITY',
  /**
   * Event called for order tax calculation.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  OrderCalculateTaxes = 'ORDER_CALCULATE_TAXES',
  /** An order is cancelled. */
  OrderCancelled = 'ORDER_CANCELLED',
  /** An order is confirmed (status change unconfirmed -> unfulfilled) by a staff user using the OrderConfirm mutation. It also triggers when the user completes the checkout and the shop setting `automatically_confirm_all_new_orders` is enabled. */
  OrderConfirmed = 'ORDER_CONFIRMED',
  /** A new order is placed. */
  OrderCreated = 'ORDER_CREATED',
  /** Filter shipping methods for order. */
  OrderFilterShippingMethods = 'ORDER_FILTER_SHIPPING_METHODS',
  /** An order is fulfilled. */
  OrderFulfilled = 'ORDER_FULFILLED',
  /** Payment is made and an order is fully paid. */
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  /**
   * An order metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  OrderMetadataUpdated = 'ORDER_METADATA_UPDATED',
  /** An order is updated; triggered for all changes related to an order; covers all other order webhooks, except for ORDER_CREATED. */
  OrderUpdated = 'ORDER_UPDATED',
  /** A new page is created. */
  PageCreated = 'PAGE_CREATED',
  /** A page is deleted. */
  PageDeleted = 'PAGE_DELETED',
  /** A new page type is created. */
  PageTypeCreated = 'PAGE_TYPE_CREATED',
  /** A page type is deleted. */
  PageTypeDeleted = 'PAGE_TYPE_DELETED',
  /** A page type is updated. */
  PageTypeUpdated = 'PAGE_TYPE_UPDATED',
  /** A page is updated. */
  PageUpdated = 'PAGE_UPDATED',
  /** Authorize payment. */
  PaymentAuthorize = 'PAYMENT_AUTHORIZE',
  /** Capture payment. */
  PaymentCapture = 'PAYMENT_CAPTURE',
  /** Confirm payment. */
  PaymentConfirm = 'PAYMENT_CONFIRM',
  /** Listing available payment gateways. */
  PaymentListGateways = 'PAYMENT_LIST_GATEWAYS',
  /** Process payment. */
  PaymentProcess = 'PAYMENT_PROCESS',
  /** Refund payment. */
  PaymentRefund = 'PAYMENT_REFUND',
  /** Void payment. */
  PaymentVoid = 'PAYMENT_VOID',
  /** A new permission group is created. */
  PermissionGroupCreated = 'PERMISSION_GROUP_CREATED',
  /** A permission group is deleted. */
  PermissionGroupDeleted = 'PERMISSION_GROUP_DELETED',
  /** A permission group is updated. */
  PermissionGroupUpdated = 'PERMISSION_GROUP_UPDATED',
  /** A new product is created. */
  ProductCreated = 'PRODUCT_CREATED',
  /** A product is deleted. */
  ProductDeleted = 'PRODUCT_DELETED',
  /**
   * A new product media is created.
   *
   * Added in Saleor 3.12.
   */
  ProductMediaCreated = 'PRODUCT_MEDIA_CREATED',
  /**
   * A product media is deleted.
   *
   * Added in Saleor 3.12.
   */
  ProductMediaDeleted = 'PRODUCT_MEDIA_DELETED',
  /**
   * A product media is updated.
   *
   * Added in Saleor 3.12.
   */
  ProductMediaUpdated = 'PRODUCT_MEDIA_UPDATED',
  /**
   * A product metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  ProductMetadataUpdated = 'PRODUCT_METADATA_UPDATED',
  /** A product is updated. */
  ProductUpdated = 'PRODUCT_UPDATED',
  /** A product variant is back in stock. */
  ProductVariantBackInStock = 'PRODUCT_VARIANT_BACK_IN_STOCK',
  /** A new product variant is created. */
  ProductVariantCreated = 'PRODUCT_VARIANT_CREATED',
  /** A product variant is deleted. */
  ProductVariantDeleted = 'PRODUCT_VARIANT_DELETED',
  /**
   * A product variant metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  ProductVariantMetadataUpdated = 'PRODUCT_VARIANT_METADATA_UPDATED',
  /** A product variant is out of stock. */
  ProductVariantOutOfStock = 'PRODUCT_VARIANT_OUT_OF_STOCK',
  /** A product variant stock is updated */
  ProductVariantStockUpdated = 'PRODUCT_VARIANT_STOCK_UPDATED',
  /** A product variant is updated. */
  ProductVariantUpdated = 'PRODUCT_VARIANT_UPDATED',
  /** A sale is created. */
  SaleCreated = 'SALE_CREATED',
  /** A sale is deleted. */
  SaleDeleted = 'SALE_DELETED',
  /** A sale is activated or deactivated. */
  SaleToggle = 'SALE_TOGGLE',
  /** A sale is updated. */
  SaleUpdated = 'SALE_UPDATED',
  /** Fetch external shipping methods for checkout. */
  ShippingListMethodsForCheckout = 'SHIPPING_LIST_METHODS_FOR_CHECKOUT',
  /** A new shipping price is created. */
  ShippingPriceCreated = 'SHIPPING_PRICE_CREATED',
  /** A shipping price is deleted. */
  ShippingPriceDeleted = 'SHIPPING_PRICE_DELETED',
  /** A shipping price is updated. */
  ShippingPriceUpdated = 'SHIPPING_PRICE_UPDATED',
  /** A new shipping zone is created. */
  ShippingZoneCreated = 'SHIPPING_ZONE_CREATED',
  /** A shipping zone is deleted. */
  ShippingZoneDeleted = 'SHIPPING_ZONE_DELETED',
  /**
   * A shipping zone metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  ShippingZoneMetadataUpdated = 'SHIPPING_ZONE_METADATA_UPDATED',
  /** A shipping zone is updated. */
  ShippingZoneUpdated = 'SHIPPING_ZONE_UPDATED',
  /** A new staff user is created. */
  StaffCreated = 'STAFF_CREATED',
  /** A staff user is deleted. */
  StaffDeleted = 'STAFF_DELETED',
  /** A staff user is updated. */
  StaffUpdated = 'STAFF_UPDATED',
  /**
   * A thumbnail is created.
   *
   * Added in Saleor 3.12.
   */
  ThumbnailCreated = 'THUMBNAIL_CREATED',
  /** An action requested for transaction. */
  TransactionActionRequest = 'TRANSACTION_ACTION_REQUEST',
  /**
   * Transaction item metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  TransactionItemMetadataUpdated = 'TRANSACTION_ITEM_METADATA_UPDATED',
  /** A new translation is created. */
  TranslationCreated = 'TRANSLATION_CREATED',
  /** A translation is updated. */
  TranslationUpdated = 'TRANSLATION_UPDATED',
  /** A new voucher created. */
  VoucherCreated = 'VOUCHER_CREATED',
  /** A voucher is deleted. */
  VoucherDeleted = 'VOUCHER_DELETED',
  /**
   * A voucher metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  VoucherMetadataUpdated = 'VOUCHER_METADATA_UPDATED',
  /** A voucher is updated. */
  VoucherUpdated = 'VOUCHER_UPDATED',
  /** A new warehouse created. */
  WarehouseCreated = 'WAREHOUSE_CREATED',
  /** A warehouse is deleted. */
  WarehouseDeleted = 'WAREHOUSE_DELETED',
  /**
   * A warehouse metadata is updated.
   *
   * Added in Saleor 3.8.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  WarehouseMetadataUpdated = 'WAREHOUSE_METADATA_UPDATED',
  /** A warehouse is updated. */
  WarehouseUpdated = 'WAREHOUSE_UPDATED'
}

/** Enum determining type of webhook. */
export enum WebhookEventTypeSyncEnum {
  /**
   * Event called for checkout tax calculation.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  CheckoutCalculateTaxes = 'CHECKOUT_CALCULATE_TAXES',
  /** Filter shipping methods for checkout. */
  CheckoutFilterShippingMethods = 'CHECKOUT_FILTER_SHIPPING_METHODS',
  /**
   * Event called for order tax calculation.
   *
   * Added in Saleor 3.6.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  OrderCalculateTaxes = 'ORDER_CALCULATE_TAXES',
  /** Filter shipping methods for order. */
  OrderFilterShippingMethods = 'ORDER_FILTER_SHIPPING_METHODS',
  /** Authorize payment. */
  PaymentAuthorize = 'PAYMENT_AUTHORIZE',
  /** Capture payment. */
  PaymentCapture = 'PAYMENT_CAPTURE',
  /** Confirm payment. */
  PaymentConfirm = 'PAYMENT_CONFIRM',
  /** Listing available payment gateways. */
  PaymentListGateways = 'PAYMENT_LIST_GATEWAYS',
  /** Process payment. */
  PaymentProcess = 'PAYMENT_PROCESS',
  /** Refund payment. */
  PaymentRefund = 'PAYMENT_REFUND',
  /** Void payment. */
  PaymentVoid = 'PAYMENT_VOID',
  /** Fetch external shipping methods for checkout. */
  ShippingListMethodsForCheckout = 'SHIPPING_LIST_METHODS_FOR_CHECKOUT'
}

/** An enumeration. */
export enum WebhookSampleEventTypeEnum {
  AddressCreated = 'ADDRESS_CREATED',
  AddressDeleted = 'ADDRESS_DELETED',
  AddressUpdated = 'ADDRESS_UPDATED',
  AppDeleted = 'APP_DELETED',
  AppInstalled = 'APP_INSTALLED',
  AppStatusChanged = 'APP_STATUS_CHANGED',
  AppUpdated = 'APP_UPDATED',
  AttributeCreated = 'ATTRIBUTE_CREATED',
  AttributeDeleted = 'ATTRIBUTE_DELETED',
  AttributeUpdated = 'ATTRIBUTE_UPDATED',
  AttributeValueCreated = 'ATTRIBUTE_VALUE_CREATED',
  AttributeValueDeleted = 'ATTRIBUTE_VALUE_DELETED',
  AttributeValueUpdated = 'ATTRIBUTE_VALUE_UPDATED',
  CategoryCreated = 'CATEGORY_CREATED',
  CategoryDeleted = 'CATEGORY_DELETED',
  CategoryUpdated = 'CATEGORY_UPDATED',
  ChannelCreated = 'CHANNEL_CREATED',
  ChannelDeleted = 'CHANNEL_DELETED',
  ChannelStatusChanged = 'CHANNEL_STATUS_CHANGED',
  ChannelUpdated = 'CHANNEL_UPDATED',
  CheckoutCreated = 'CHECKOUT_CREATED',
  CheckoutMetadataUpdated = 'CHECKOUT_METADATA_UPDATED',
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  CollectionCreated = 'COLLECTION_CREATED',
  CollectionDeleted = 'COLLECTION_DELETED',
  CollectionMetadataUpdated = 'COLLECTION_METADATA_UPDATED',
  CollectionUpdated = 'COLLECTION_UPDATED',
  CustomerCreated = 'CUSTOMER_CREATED',
  CustomerDeleted = 'CUSTOMER_DELETED',
  CustomerMetadataUpdated = 'CUSTOMER_METADATA_UPDATED',
  CustomerUpdated = 'CUSTOMER_UPDATED',
  DraftOrderCreated = 'DRAFT_ORDER_CREATED',
  DraftOrderDeleted = 'DRAFT_ORDER_DELETED',
  DraftOrderUpdated = 'DRAFT_ORDER_UPDATED',
  FulfillmentApproved = 'FULFILLMENT_APPROVED',
  FulfillmentCanceled = 'FULFILLMENT_CANCELED',
  FulfillmentCreated = 'FULFILLMENT_CREATED',
  FulfillmentMetadataUpdated = 'FULFILLMENT_METADATA_UPDATED',
  GiftCardCreated = 'GIFT_CARD_CREATED',
  GiftCardDeleted = 'GIFT_CARD_DELETED',
  GiftCardMetadataUpdated = 'GIFT_CARD_METADATA_UPDATED',
  GiftCardStatusChanged = 'GIFT_CARD_STATUS_CHANGED',
  GiftCardUpdated = 'GIFT_CARD_UPDATED',
  InvoiceDeleted = 'INVOICE_DELETED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceSent = 'INVOICE_SENT',
  MenuCreated = 'MENU_CREATED',
  MenuDeleted = 'MENU_DELETED',
  MenuItemCreated = 'MENU_ITEM_CREATED',
  MenuItemDeleted = 'MENU_ITEM_DELETED',
  MenuItemUpdated = 'MENU_ITEM_UPDATED',
  MenuUpdated = 'MENU_UPDATED',
  NotifyUser = 'NOTIFY_USER',
  Observability = 'OBSERVABILITY',
  OrderCancelled = 'ORDER_CANCELLED',
  OrderConfirmed = 'ORDER_CONFIRMED',
  OrderCreated = 'ORDER_CREATED',
  OrderFulfilled = 'ORDER_FULFILLED',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  OrderMetadataUpdated = 'ORDER_METADATA_UPDATED',
  OrderUpdated = 'ORDER_UPDATED',
  PageCreated = 'PAGE_CREATED',
  PageDeleted = 'PAGE_DELETED',
  PageTypeCreated = 'PAGE_TYPE_CREATED',
  PageTypeDeleted = 'PAGE_TYPE_DELETED',
  PageTypeUpdated = 'PAGE_TYPE_UPDATED',
  PageUpdated = 'PAGE_UPDATED',
  PermissionGroupCreated = 'PERMISSION_GROUP_CREATED',
  PermissionGroupDeleted = 'PERMISSION_GROUP_DELETED',
  PermissionGroupUpdated = 'PERMISSION_GROUP_UPDATED',
  ProductCreated = 'PRODUCT_CREATED',
  ProductDeleted = 'PRODUCT_DELETED',
  ProductMediaCreated = 'PRODUCT_MEDIA_CREATED',
  ProductMediaDeleted = 'PRODUCT_MEDIA_DELETED',
  ProductMediaUpdated = 'PRODUCT_MEDIA_UPDATED',
  ProductMetadataUpdated = 'PRODUCT_METADATA_UPDATED',
  ProductUpdated = 'PRODUCT_UPDATED',
  ProductVariantBackInStock = 'PRODUCT_VARIANT_BACK_IN_STOCK',
  ProductVariantCreated = 'PRODUCT_VARIANT_CREATED',
  ProductVariantDeleted = 'PRODUCT_VARIANT_DELETED',
  ProductVariantMetadataUpdated = 'PRODUCT_VARIANT_METADATA_UPDATED',
  ProductVariantOutOfStock = 'PRODUCT_VARIANT_OUT_OF_STOCK',
  ProductVariantStockUpdated = 'PRODUCT_VARIANT_STOCK_UPDATED',
  ProductVariantUpdated = 'PRODUCT_VARIANT_UPDATED',
  SaleCreated = 'SALE_CREATED',
  SaleDeleted = 'SALE_DELETED',
  SaleToggle = 'SALE_TOGGLE',
  SaleUpdated = 'SALE_UPDATED',
  ShippingPriceCreated = 'SHIPPING_PRICE_CREATED',
  ShippingPriceDeleted = 'SHIPPING_PRICE_DELETED',
  ShippingPriceUpdated = 'SHIPPING_PRICE_UPDATED',
  ShippingZoneCreated = 'SHIPPING_ZONE_CREATED',
  ShippingZoneDeleted = 'SHIPPING_ZONE_DELETED',
  ShippingZoneMetadataUpdated = 'SHIPPING_ZONE_METADATA_UPDATED',
  ShippingZoneUpdated = 'SHIPPING_ZONE_UPDATED',
  StaffCreated = 'STAFF_CREATED',
  StaffDeleted = 'STAFF_DELETED',
  StaffUpdated = 'STAFF_UPDATED',
  ThumbnailCreated = 'THUMBNAIL_CREATED',
  TransactionActionRequest = 'TRANSACTION_ACTION_REQUEST',
  TransactionItemMetadataUpdated = 'TRANSACTION_ITEM_METADATA_UPDATED',
  TranslationCreated = 'TRANSLATION_CREATED',
  TranslationUpdated = 'TRANSLATION_UPDATED',
  VoucherCreated = 'VOUCHER_CREATED',
  VoucherDeleted = 'VOUCHER_DELETED',
  VoucherMetadataUpdated = 'VOUCHER_METADATA_UPDATED',
  VoucherUpdated = 'VOUCHER_UPDATED',
  WarehouseCreated = 'WAREHOUSE_CREATED',
  WarehouseDeleted = 'WAREHOUSE_DELETED',
  WarehouseMetadataUpdated = 'WAREHOUSE_METADATA_UPDATED',
  WarehouseUpdated = 'WAREHOUSE_UPDATED'
}

/**
 * Trigger a webhook event. Supports a single event (the first, if multiple provided in the `webhook.subscription_query`). Requires permission relevant to processed event. Successfully delivered webhook returns `delivery` with status='PENDING' and empty payload.
 *
 * Added in Saleor 3.11.
 *
 * Note: this API is currently in Feature Preview and can be subject to changes at later point.
 *
 * Requires one of the following permissions: AUTHENTICATED_STAFF_USER.
 */
export type WebhookTrigger = {
  delivery?: Maybe<EventDelivery>;
  errors: Array<WebhookTriggerError>;
};

export type WebhookTriggerError = {
  /** The error code. */
  code: WebhookTriggerErrorCode;
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum WebhookTriggerErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  InvalidId = 'INVALID_ID',
  MissingEvent = 'MISSING_EVENT',
  MissingPermission = 'MISSING_PERMISSION',
  MissingQuery = 'MISSING_QUERY',
  MissingSubscription = 'MISSING_SUBSCRIPTION',
  NotFound = 'NOT_FOUND',
  Syntax = 'SYNTAX',
  TypeNotSupported = 'TYPE_NOT_SUPPORTED',
  UnableToParse = 'UNABLE_TO_PARSE'
}

/**
 * Updates a webhook subscription.
 *
 * Requires one of the following permissions: MANAGE_APPS, AUTHENTICATED_APP.
 */
export type WebhookUpdate = {
  errors: Array<WebhookError>;
  webhook?: Maybe<Webhook>;
  /** @deprecated This field will be removed in Saleor 4.0. Use `errors` field instead. */
  webhookErrors: Array<WebhookError>;
};

export type WebhookUpdateInput = {
  /** ID of the app to which webhook belongs. */
  app?: InputMaybe<Scalars['ID']>;
  /** The asynchronous events that webhook wants to subscribe. */
  asyncEvents?: InputMaybe<Array<WebhookEventTypeAsyncEnum>>;
  /**
   * Custom headers, which will be added to HTTP request. There is a limitation of 5 headers per webhook and 998 characters per header.Only "X-*" and "Authorization*" keys are allowed.
   *
   * Added in Saleor 3.12.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  customHeaders?: InputMaybe<Scalars['JSONString']>;
  /**
   * The events that webhook wants to subscribe.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. Use `asyncEvents` or `syncEvents` instead.
   */
  events?: InputMaybe<Array<WebhookEventTypeEnum>>;
  /** Determine if webhook will be set active or not. */
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** The new name of the webhook. */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Subscription query used to define a webhook payload.
   *
   * Added in Saleor 3.2.
   *
   * Note: this API is currently in Feature Preview and can be subject to changes at later point.
   */
  query?: InputMaybe<Scalars['String']>;
  /**
   * Use to create a hash signature with each payload.
   *
   * DEPRECATED: this field will be removed in Saleor 4.0. As of Saleor 3.5, webhook payloads default to signing using a verifiable JWS.
   */
  secretKey?: InputMaybe<Scalars['String']>;
  /** The synchronous events that webhook wants to subscribe. */
  syncEvents?: InputMaybe<Array<WebhookEventTypeSyncEnum>>;
  /** The url to receive the payload. */
  targetUrl?: InputMaybe<Scalars['String']>;
};

/** Represents weight value in a specific weight unit. */
export type Weight = {
  /** Weight unit. */
  unit: WeightUnitsEnum;
  /** Weight value. */
  value: Scalars['Float'];
};

/** An enumeration. */
export enum WeightUnitsEnum {
  G = 'G',
  Kg = 'KG',
  Lb = 'LB',
  Oz = 'OZ',
  Tonne = 'TONNE'
}

/** _Entity union as defined by Federation spec. */
export type _Entity =
  | Address
  | App
  | Category
  | Collection
  | Group
  | PageType
  | Product
  | ProductMedia
  | ProductType
  | ProductVariant
  | User;

/** _Service manifest as defined by Federation spec. */
export type _Service = {
  sdl?: Maybe<Scalars['String']>;
};

export type FeaturedProductFragment = {
  id: string;
  slug: string;
  name: string;
  isAvailableForPurchase?: boolean | null;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  updatedAt: string;
  pricing?: {
    priceRange?: {
      start?: { gross: { currency: string; amount: number } } | null;
      stop?: { gross: { currency: string; amount: number } } | null;
    } | null;
  } | null;
  media?: Array<{ url: string; type: ProductMediaType; alt: string }> | null;
  collections?: Array<{ name: string }> | null;
  variants?: Array<{
    id: string;
    name: string;
    pricing?: { price?: { gross: { currency: string; amount: number } } | null } | null;
  }> | null;
} & { ' $fragmentName'?: 'FeaturedProductFragment' };

export type GetCollectionBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type GetCollectionBySlugQuery = {
  collection?: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  } | null;
};

export type GetCollectionProductsBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type GetCollectionProductsBySlugQuery = {
  collection?: {
    products?: {
      edges: Array<{
        node: {
          id: string;
          slug: string;
          name: string;
          isAvailableForPurchase?: boolean | null;
          description?: string | null;
          seoTitle?: string | null;
          seoDescription?: string | null;
          updatedAt: string;
          pricing?: {
            priceRange?: {
              start?: { gross: { currency: string; amount: number } } | null;
              stop?: { gross: { currency: string; amount: number } } | null;
            } | null;
          } | null;
          media?: Array<{ url: string; type: ProductMediaType; alt: string }> | null;
          collections?: Array<{ name: string }> | null;
          variants?: Array<{
            id: string;
            name: string;
            pricing?: { price?: { gross: { currency: string; amount: number } } | null } | null;
          }> | null;
        };
      }>;
    } | null;
  } | null;
};

export type GetCollectionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCollectionsQuery = {
  collections?: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        slug: string;
        description?: string | null;
        seoTitle?: string | null;
        seoDescription?: string | null;
      };
    }>;
  } | null;
};

export type GetFeaturedProductsQueryVariables = Exact<{
  first: Scalars['Int'];
}>;

export type GetFeaturedProductsQuery = {
  products?: {
    edges: Array<{
      node: { ' $fragmentRefs'?: { FeaturedProductFragment: FeaturedProductFragment } };
    }>;
  } | null;
};

export type GetMenuBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type GetMenuBySlugQuery = {
  menu?: {
    id: string;
    slug: string;
    name: string;
    items?: Array<{
      id: string;
      name: string;
      url?: string | null;
      collection?: { slug: string } | null;
      children?: Array<{ id: string; collection?: { slug: string } | null }> | null;
    }> | null;
  } | null;
};

export type GetPageBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type GetPageBySlugQuery = {
  page?: {
    id: string;
    title: string;
    slug: string;
    content?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    created: string;
  } | null;
};

export type GetProductBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type GetProductBySlugQuery = {
  product?: {
    id: string;
    slug: string;
    name: string;
    isAvailableForPurchase?: boolean | null;
    description?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    updatedAt: string;
    pricing?: {
      priceRange?: {
        start?: { gross: { currency: string; amount: number } } | null;
        stop?: { gross: { currency: string; amount: number } } | null;
      } | null;
    } | null;
    media?: Array<{ url: string; type: ProductMediaType; alt: string }> | null;
    collections?: Array<{ name: string }> | null;
    variants?: Array<{
      id: string;
      name: string;
      pricing?: { price?: { gross: { currency: string; amount: number } } | null } | null;
    }> | null;
  } | null;
};

export type SearchProductsQueryVariables = Exact<{
  search: Scalars['String'];
  sortBy: ProductOrderField;
  sortDirection: OrderDirection;
}>;

export type SearchProductsQuery = {
  products?: {
    edges: Array<{
      node: {
        id: string;
        slug: string;
        name: string;
        isAvailableForPurchase?: boolean | null;
        description?: string | null;
        seoTitle?: string | null;
        seoDescription?: string | null;
        updatedAt: string;
        pricing?: {
          priceRange?: {
            start?: { gross: { currency: string; amount: number } } | null;
            stop?: { gross: { currency: string; amount: number } } | null;
          } | null;
        } | null;
        media?: Array<{ url: string; type: ProductMediaType; alt: string }> | null;
        collections?: Array<{ name: string }> | null;
        variants?: Array<{
          id: string;
          name: string;
          pricing?: { price?: { gross: { currency: string; amount: number } } | null } | null;
        }> | null;
      };
    }>;
  } | null;
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductsQuery = { products?: { edges: Array<{ node: { name: string } }> } | null };

export const FeaturedProductFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeaturedProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAvailableForPurchase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seoDescription' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pricing' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'priceRange' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'start' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'gross' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'gross' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'media' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'url' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'size' },
                      value: { kind: 'IntValue', value: '2160' }
                    }
                  ]
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'alt' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pricing' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'gross' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<FeaturedProductFragment, unknown>;
export const GetCollectionBySlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollectionBySlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'StringValue', value: 'default-channel', block: false }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seoDescription' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCollectionBySlugQuery, GetCollectionBySlugQueryVariables>;
export const GetCollectionProductsBySlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollectionProductsBySlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'StringValue', value: 'default-channel', block: false }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'first' },
                      value: { kind: 'IntValue', value: '100' }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'isAvailableForPurchase' }
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'seoDescription' }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pricing' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'priceRange' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'start' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'gross' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: {
                                                              kind: 'Name',
                                                              value: 'currency'
                                                            }
                                                          },
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'amount' }
                                                          }
                                                        ]
                                                      }
                                                    }
                                                  ]
                                                }
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'stop' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'gross' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: {
                                                              kind: 'Name',
                                                              value: 'currency'
                                                            }
                                                          },
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'amount' }
                                                          }
                                                        ]
                                                      }
                                                    }
                                                  ]
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'media' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'url' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'size' },
                                              value: { kind: 'IntValue', value: '2160' }
                                            }
                                          ]
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'alt' } }
                                      ]
                                    }
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'collections' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                                      ]
                                    }
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'variants' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'pricing' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'price' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'gross' },
                                                      selectionSet: {
                                                        kind: 'SelectionSet',
                                                        selections: [
                                                          {
                                                            kind: 'Field',
                                                            name: {
                                                              kind: 'Name',
                                                              value: 'currency'
                                                            }
                                                          },
                                                          {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'amount' }
                                                          }
                                                        ]
                                                      }
                                                    }
                                                  ]
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<
  GetCollectionProductsBySlugQuery,
  GetCollectionProductsBySlugQueryVariables
>;
export const GetCollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollections' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'StringValue', value: 'default-channel', block: false }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '100' }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'seoDescription' } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetFeaturedProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFeaturedProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'StringValue', value: 'default-channel', block: false }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'FeaturedProduct' }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'FeaturedProduct' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Product' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isAvailableForPurchase' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seoDescription' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'pricing' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'priceRange' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'start' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'gross' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stop' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'gross' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'media' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'url' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'size' },
                      value: { kind: 'IntValue', value: '2160' }
                    }
                  ]
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'alt' } }
              ]
            }
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
            }
          },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pricing' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'gross' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetFeaturedProductsQuery, GetFeaturedProductsQueryVariables>;
export const GetMenuBySlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMenuBySlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'menu' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'StringValue', value: 'default-channel', block: false }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'collection' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'slug' } }]
                        }
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'children' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'collection' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetMenuBySlugQuery, GetMenuBySlugQueryVariables>;
export const GetPageBySlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPageBySlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'page' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seoDescription' } },
                { kind: 'Field', name: { kind: 'Name', value: 'created' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetPageBySlugQuery, GetPageBySlugQueryVariables>;
export const GetProductBySlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductBySlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isAvailableForPurchase' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'seoDescription' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pricing' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'priceRange' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'start' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'gross' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' }
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                      ]
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stop' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'gross' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' }
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'media' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'url' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'size' },
                            value: { kind: 'IntValue', value: '2160' }
                          }
                        ]
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'alt' } }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'collections' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pricing' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'gross' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' }
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'amount' } }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetProductBySlugQuery, GetProductBySlugQueryVariables>;
export const SearchProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'search' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ProductOrderField' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'OrderDirection' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '100' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'StringValue', value: 'default-channel', block: false }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'field' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } }
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'direction' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } }
                    }
                  ]
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'search' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'search' } }
                    }
                  ]
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isAvailableForPurchase' }
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'seoTitle' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'seoDescription' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pricing' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'priceRange' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'start' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'gross' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'currency' }
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'amount' }
                                                    }
                                                  ]
                                                }
                                              }
                                            ]
                                          }
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'stop' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'gross' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'currency' }
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'amount' }
                                                    }
                                                  ]
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'media' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'size' },
                                        value: { kind: 'IntValue', value: '2160' }
                                      }
                                    ]
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'alt' } }
                                ]
                              }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'collections' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } }
                                ]
                              }
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'variants' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pricing' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'price' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'gross' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'currency' }
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'amount' }
                                                    }
                                                  ]
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<SearchProductsQuery, SearchProductsQueryVariables>;
export const GetProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProducts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '10' }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'channel' },
                value: { kind: 'StringValue', value: 'default-channel', block: false }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
