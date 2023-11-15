export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type Customer = {
	__typename?: 'Customer';
	/** Indicates whether the customer has consented to be sent marketing material via email. */
	acceptsMarketing: boolean;
	/** A list of addresses for the customer. */
	addresses: Maybe<string>;
	/** The date and time when the customer was created. */
	createdAt: string;
	/** The customer’s default address. */
	defaultAddress?: Maybe<string>;
	/** The customer’s name, email or phone number. */
	displayName: string;
	/** The customer’s email address. */
	email?: Maybe<string>;
	/** The customer’s first name. */
	firstName?: Maybe<string>;
	/** A unique identifier for the customer. */
	id: string;
	/** The customer's most recently updated, incomplete checkout. */
	/** The customer’s last name. */
	lastName?: Maybe<string>;
	/** Returns a metafield found by namespace and key. */
	/**
	 * The metafields associated with the resource matching the supplied list of namespaces and keys.
	 *
	 */
	/** The number of orders that the customer has made at the store in their lifetime. */
	numberOfOrders: string;
	/** The orders associated with the customer. */
	/** The customer’s phone number. */
	phone?: Maybe<string>;
	/**
	 * A comma separated list of tags that have been added to the customer.
	 * Additional access scope required: unauthenticated_read_customer_tags.
	 *
	 */
	tags: Array<string>;
	/** The date and time when the customer information was updated. */
	updatedAt: string;
};

export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Color: string;
	DateTime: string;
	Decimal: string;
	HTML: string;
	JSON: unknown;
	URL: string;
	UnsignedInt64: string;
};

export type DisplayableError = {
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

export type CustomerAccessToken = {
	__typename?: 'CustomerAccessToken';
	/** The customer’s access token. */
	accessToken: Scalars['String'];
	/** The date and time when the customer access token expires. */
	expiresAt: Scalars['DateTime'];
};

export type CustomerUserError = DisplayableError & {
	__typename?: 'CustomerUserError';
	/** The error code. */
	code?: Maybe<any>;
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

export type UserError = DisplayableError & {
	__typename?: 'UserError';
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

export type CustomerAccessTokenCreatePayload = {
	__typename?: 'CustomerAccessTokenCreatePayload';
	/** The newly created customer access token object. */
	customerAccessToken?: Maybe<CustomerAccessToken>;
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

/** Return type for `customerCreate` mutation. */
export type CustomerCreatePayload = {
	__typename?: 'CustomerCreatePayload';
	/** The created customer object. */
	customer?: Maybe<Customer>;
	/** The list of errors that occurred from executing the mutation. */
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
};

export type CustomerRecoverPayload = {
	__typename?: 'CustomerRecoverPayload';
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

export type CustomerResetPayload = {
	__typename?: 'CustomerResetPayload';
	/** The customer object which was reset. */
	customer?: Maybe<Customer>;
	/** A newly created customer access token object for the customer. */
	customerAccessToken?: Maybe<CustomerAccessToken>;
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};
