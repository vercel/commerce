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
}

/** Input for the addCartItems mutation */
export type AddCartItemsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Cart items to be added */
  items?: Maybe<Array<Maybe<CartItemInput>>>
}

/** The payload for the addCartItems mutation */
export type AddCartItemsPayload = {
  __typename?: 'AddCartItemsPayload'
  added?: Maybe<Array<Maybe<CartItem>>>
  cart?: Maybe<Cart>
  cartErrors?: Maybe<Array<Maybe<CartItemError>>>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the addFee mutation */
export type AddFeeInput = {
  /** Fee amount */
  amount?: Maybe<Scalars['Float']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Unique name for the fee. */
  name: Scalars['String']
  /** The tax class for the fee if taxable. */
  taxClass?: Maybe<TaxClassEnum>
  /** Is the fee taxable? */
  taxable?: Maybe<Scalars['Boolean']>
}

/** The payload for the addFee mutation */
export type AddFeePayload = {
  __typename?: 'AddFeePayload'
  cart?: Maybe<Cart>
  cartFee?: Maybe<CartFee>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the addToCart mutation */
export type AddToCartInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** JSON string representation of extra cart item data */
  extraData?: Maybe<Scalars['String']>
  /** Cart item product database ID or global ID */
  productId: Scalars['Int']
  /** Cart item quantity */
  quantity?: Maybe<Scalars['Int']>
  /** Cart item product variation attributes */
  variation?: Maybe<Array<Maybe<ProductAttributeInput>>>
  /** Cart item product variation database ID or global ID */
  variationId?: Maybe<Scalars['Int']>
}

/** The payload for the addToCart mutation */
export type AddToCartPayload = {
  __typename?: 'AddToCartPayload'
  cart?: Maybe<Cart>
  cartItem?: Maybe<CartItem>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Coupon applied to the shopping cart. */
export type AppliedCoupon = {
  __typename?: 'AppliedCoupon'
  /** Coupon code */
  code: Scalars['String']
  /** Discount applied with this coupon */
  discountAmount: Scalars['String']
  /** Taxes on discount applied with this coupon */
  discountTax: Scalars['String']
}

/** Coupon applied to the shopping cart. */
export type AppliedCouponDiscountAmountArgs = {
  excludeTax?: Maybe<Scalars['Boolean']>
}

/** Input for the applyCoupon mutation */
export type ApplyCouponInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Code of coupon being applied */
  code: Scalars['String']
}

/** The payload for the applyCoupon mutation */
export type ApplyCouponPayload = {
  __typename?: 'ApplyCouponPayload'
  applied?: Maybe<AppliedCoupon>
  cart?: Maybe<Cart>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Attribute object */
export type Attribute = {
  /** Name of attribute */
  name?: Maybe<Scalars['String']>
  /** Selected value of attribute */
  value?: Maybe<Scalars['String']>
}

/** Avatars are profile images for users. WordPress by default uses the Gravatar service to host and fetch avatars from. */
export type Avatar = {
  __typename?: 'Avatar'
  /** URL for the default image or a default type. Accepts &#039;404&#039; (return a 404 instead of a default image), &#039;retro&#039; (8bit), &#039;monsterid&#039; (monster), &#039;wavatar&#039; (cartoon face), &#039;indenticon&#039; (the &#039;quilt&#039;), &#039;mystery&#039;, &#039;mm&#039;, or &#039;mysteryman&#039; (The Oyster Man), &#039;blank&#039; (transparent GIF), or &#039;gravatar_default&#039; (the Gravatar logo). */
  default?: Maybe<Scalars['String']>
  /** HTML attributes to insert in the IMG element. Is not sanitized. */
  extraAttr?: Maybe<Scalars['String']>
  /** Whether to always show the default image, never the Gravatar. */
  forceDefault?: Maybe<Scalars['Boolean']>
  /** Whether the avatar was successfully found. */
  foundAvatar?: Maybe<Scalars['Boolean']>
  /** Height of the avatar image. */
  height?: Maybe<Scalars['Int']>
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** What rating to display avatars up to. Accepts &#039;G&#039;, &#039;PG&#039;, &#039;R&#039;, &#039;X&#039;, and are judged in that order. */
  rating?: Maybe<Scalars['String']>
  /** Type of url scheme to use. Typically HTTP vs. HTTPS. */
  scheme?: Maybe<Scalars['String']>
  /** The size of the avatar in pixels. A value of 96 will match a 96px x 96px gravatar image. */
  size?: Maybe<Scalars['Int']>
  /** URL for the gravatar image source. */
  url?: Maybe<Scalars['String']>
  /** Width of the avatar image. */
  width?: Maybe<Scalars['Int']>
}

/** What rating to display avatars up to. Accepts 'G', 'PG', 'R', 'X', and are judged in that order. Default is the value of the 'avatar_rating' option */
export enum AvatarRatingEnum {
  /** Indicates a G level avatar rating level. */
  G = 'G',
  /** Indicates a PG level avatar rating level. */
  Pg = 'PG',
  /** Indicates an R level avatar rating level. */
  R = 'R',
  /** Indicates an X level avatar rating level. */
  X = 'X',
}

/** Product backorder enumeration */
export enum BackordersEnum {
  No = 'NO',
  Notify = 'NOTIFY',
  Yes = 'YES',
}

/** The cart object */
export type Cart = {
  __typename?: 'Cart'
  /** Coupons applied to the cart */
  appliedCoupons?: Maybe<Array<Maybe<AppliedCoupon>>>
  /** Available shipping methods for this order. */
  availableShippingMethods?: Maybe<Array<Maybe<ShippingPackage>>>
  /** Shipping method chosen for this order. */
  chosenShippingMethods?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Connection between the Cart type and the CartItem type */
  contents?: Maybe<CartToCartItemConnection>
  /** Cart contents tax */
  contentsTax?: Maybe<Scalars['String']>
  /** Cart contents total */
  contentsTotal?: Maybe<Scalars['String']>
  /** Cart discount tax */
  discountTax?: Maybe<Scalars['String']>
  /** Cart discount total */
  discountTotal?: Maybe<Scalars['String']>
  /** Do display prices include taxes */
  displayPricesIncludeTax?: Maybe<Scalars['Boolean']>
  /** Cart fee tax */
  feeTax?: Maybe<Scalars['String']>
  /** Cart fee total */
  feeTotal?: Maybe<Scalars['String']>
  /** Additional fees on the cart. */
  fees?: Maybe<Array<Maybe<CartFee>>>
  /** Is cart empty */
  isEmpty?: Maybe<Scalars['Boolean']>
  /** Is customer shipping address needed */
  needsShippingAddress?: Maybe<Scalars['Boolean']>
  /** Cart shipping tax */
  shippingTax?: Maybe<Scalars['String']>
  /** Cart shipping total */
  shippingTotal?: Maybe<Scalars['String']>
  /** Cart subtotal */
  subtotal?: Maybe<Scalars['String']>
  /** Cart subtotal tax */
  subtotalTax?: Maybe<Scalars['String']>
  /** Cart total after calculation */
  total?: Maybe<Scalars['String']>
  /** Cart total tax amount */
  totalTax?: Maybe<Scalars['String']>
  /** Cart total taxes itemized */
  totalTaxes?: Maybe<Array<Maybe<CartTax>>>
}

/** The cart object */
export type CartContentsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CartToCartItemConnectionWhereArgs>
}

/** An error that occurred when updating the cart */
export type CartError = {
  /** Reason for error */
  reasons?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Type of error */
  type: CartErrorType
}

/** Cart error type enumeration */
export enum CartErrorType {
  InvalidCartItem = 'INVALID_CART_ITEM',
  InvalidCoupon = 'INVALID_COUPON',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
}

/** An additional fee */
export type CartFee = {
  __typename?: 'CartFee'
  /** Fee amount */
  amount?: Maybe<Scalars['Float']>
  /** Fee ID */
  id: Scalars['ID']
  /** Fee name */
  name: Scalars['String']
  /** Fee tax class */
  taxClass?: Maybe<TaxClassEnum>
  /** Is fee taxable? */
  taxable?: Maybe<Scalars['Boolean']>
  /** Fee total */
  total?: Maybe<Scalars['Float']>
}

/** A item in the cart */
export type CartItem = {
  __typename?: 'CartItem'
  /** Object meta data */
  extraData?: Maybe<Array<Maybe<MetaData>>>
  /** CartItem ID */
  key: Scalars['ID']
  /** Connection between the CartItem type and the Product type */
  product?: Maybe<CartItemToProductConnectionEdge>
  /** Quantity of the product */
  quantity?: Maybe<Scalars['Int']>
  /** Item&#039;s subtotal */
  subtotal?: Maybe<Scalars['String']>
  /** Item&#039;s subtotal tax */
  subtotalTax?: Maybe<Scalars['String']>
  /** Item&#039;s tax */
  tax?: Maybe<Scalars['String']>
  /** Item&#039;s total */
  total?: Maybe<Scalars['String']>
  /** Connection between the CartItem type and the ProductVariation type */
  variation?: Maybe<CartItemToProductVariationConnectionEdge>
}

/** A item in the cart */
export type CartItemExtraDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Error that occurred when adding an item to the cart. */
export type CartItemError = CartError & {
  __typename?: 'CartItemError'
  /** JSON string representation of extra cart item data */
  extraData?: Maybe<Scalars['String']>
  /** Cart item product database ID or global ID */
  productId: Scalars['Int']
  /** Cart item quantity */
  quantity?: Maybe<Scalars['Int']>
  /** Reason for error */
  reasons?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Type of error */
  type: CartErrorType
  /** Cart item product variation attributes */
  variation?: Maybe<Array<Maybe<ProductAttributeOutput>>>
  /** Cart item product variation database ID or global ID */
  variationId?: Maybe<Scalars['Int']>
}

/** Cart item quantity */
export type CartItemInput = {
  /** JSON string representation of extra cart item data */
  extraData?: Maybe<Scalars['String']>
  /** Cart item product database ID or global ID */
  productId: Scalars['Int']
  /** Cart item quantity */
  quantity?: Maybe<Scalars['Int']>
  /** Cart item product variation attributes */
  variation?: Maybe<Array<Maybe<ProductAttributeInput>>>
  /** Cart item product variation database ID or global ID */
  variationId?: Maybe<Scalars['Int']>
}

/** Cart item quantity */
export type CartItemQuantityInput = {
  /** Cart item being updated */
  key: Scalars['ID']
  /** Cart item's new quantity */
  quantity: Scalars['Int']
}

/** Connection between the CartItem type and the Product type */
export type CartItemToProductConnectionEdge = {
  __typename?: 'CartItemToProductConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Product>
  /** Simple variation attribute data */
  simpleVariations?: Maybe<Array<Maybe<SimpleAttribute>>>
}

/** Connection between the CartItem type and the ProductVariation type */
export type CartItemToProductVariationConnectionEdge = {
  __typename?: 'CartItemToProductVariationConnectionEdge'
  /** Attributes of the variation. */
  attributes?: Maybe<Array<Maybe<VariationAttribute>>>
  /** The node of the connection, without the edges */
  node?: Maybe<ProductVariation>
}

/** An itemized cart tax item */
export type CartTax = {
  __typename?: 'CartTax'
  /** Tax amount */
  amount?: Maybe<Scalars['String']>
  /** Tax Rate ID */
  id: Scalars['ID']
  /** Is tax compound? */
  isCompound?: Maybe<Scalars['Boolean']>
  /** Tax label */
  label: Scalars['String']
}

/** Connection between the Cart type and the CartItem type */
export type CartToCartItemConnection = {
  __typename?: 'CartToCartItemConnection'
  /** Edges for the CartToCartItemConnection connection */
  edges?: Maybe<Array<Maybe<CartToCartItemConnectionEdge>>>
  /** Total number of items in the cart. */
  itemCount?: Maybe<Scalars['Int']>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<CartItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
  /** Total number of different products in the cart */
  productCount?: Maybe<Scalars['Int']>
}

/** An edge in a connection */
export type CartToCartItemConnectionEdge = {
  __typename?: 'CartToCartItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<CartItem>
}

/** Arguments for filtering the CartToCartItemConnection connection */
export type CartToCartItemConnectionWhereArgs = {
  /** Limit results to cart items that require shipping */
  needsShipping?: Maybe<Scalars['Boolean']>
}

/** Product catalog visibility enumeration */
export enum CatalogVisibilityEnum {
  Catalog = 'CATALOG',
  Hidden = 'HIDDEN',
  Search = 'SEARCH',
  Visible = 'VISIBLE',
}

/** The category type */
export type Category = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier &
  HierarchicalTermNode &
  MenuItemLinkable & {
    __typename?: 'Category'
    /** The ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<CategoryToAncestorsCategoryConnection>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    categoryId?: Maybe<Scalars['Int']>
    /** Connection between the category type and the category type */
    children?: Maybe<CategoryToCategoryConnection>
    /** Connection between the category type and the ContentNode type */
    contentNodes?: Maybe<CategoryToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /** Connection between the category type and the category type */
    parent?: Maybe<CategoryToParentCategoryConnectionEdge>
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']>
    /** Connection between the category type and the post type */
    posts?: Maybe<CategoryToPostConnection>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the category type and the Taxonomy type */
    taxonomy?: Maybe<CategoryToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The category type */
export type CategoryAncestorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The category type */
export type CategoryChildrenArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CategoryToCategoryConnectionWhereArgs>
}

/** The category type */
export type CategoryContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CategoryToContentNodeConnectionWhereArgs>
}

/** The category type */
export type CategoryEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The category type */
export type CategoryEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The category type */
export type CategoryPostsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CategoryToPostConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum CategoryIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the category type and the category type */
export type CategoryToAncestorsCategoryConnection = {
  __typename?: 'CategoryToAncestorsCategoryConnection'
  /** Edges for the CategoryToAncestorsCategoryConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToAncestorsCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CategoryToAncestorsCategoryConnectionEdge = {
  __typename?: 'CategoryToAncestorsCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Category>
}

/** Connection between the category type and the category type */
export type CategoryToCategoryConnection = {
  __typename?: 'CategoryToCategoryConnection'
  /** Edges for the CategoryToCategoryConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CategoryToCategoryConnectionEdge = {
  __typename?: 'CategoryToCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Category>
}

/** Arguments for filtering the CategoryToCategoryConnection connection */
export type CategoryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the category type and the ContentNode type */
export type CategoryToContentNodeConnection = {
  __typename?: 'CategoryToContentNodeConnection'
  /** Edges for the CategoryToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CategoryToContentNodeConnectionEdge = {
  __typename?: 'CategoryToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the CategoryToContentNodeConnection connection */
export type CategoryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfCategoryEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the category type and the category type */
export type CategoryToParentCategoryConnectionEdge = {
  __typename?: 'CategoryToParentCategoryConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Category>
}

/** Connection between the category type and the post type */
export type CategoryToPostConnection = {
  __typename?: 'CategoryToPostConnection'
  /** Edges for the CategoryToPostConnection connection */
  edges?: Maybe<Array<Maybe<CategoryToPostConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CategoryToPostConnectionEdge = {
  __typename?: 'CategoryToPostConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Post>
}

/** Arguments for filtering the CategoryToPostConnection connection */
export type CategoryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the category type and the Taxonomy type */
export type CategoryToTaxonomyConnectionEdge = {
  __typename?: 'CategoryToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** Input for the checkout mutation */
export type CheckoutInput = {
  /** Create new customer account */
  account?: Maybe<CreateAccountInput>
  /** Order billing address */
  billing?: Maybe<CustomerAddressInput>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Order customer note */
  customerNote?: Maybe<Scalars['String']>
  /** Define if the order is paid. It will set the status to processing and reduce stock items. */
  isPaid?: Maybe<Scalars['Boolean']>
  /** Order meta data */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** Payment method ID. */
  paymentMethod?: Maybe<Scalars['String']>
  /** Ship to a separate address */
  shipToDifferentAddress?: Maybe<Scalars['Boolean']>
  /** Order shipping address */
  shipping?: Maybe<CustomerAddressInput>
  /** Order shipping method */
  shippingMethod?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Order transaction ID */
  transactionId?: Maybe<Scalars['String']>
}

/** The payload for the checkout mutation */
export type CheckoutPayload = {
  __typename?: 'CheckoutPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  customer?: Maybe<Customer>
  order?: Maybe<Order>
  redirect?: Maybe<Scalars['String']>
  result?: Maybe<Scalars['String']>
}

/** A Comment object */
export type Comment = Node &
  DatabaseIdentifier & {
    __typename?: 'Comment'
    /** User agent used to post the comment. This field is equivalent to WP_Comment-&gt;comment_agent and the value matching the &quot;comment_agent&quot; column in SQL. */
    agent?: Maybe<Scalars['String']>
    /** The approval status of the comment. This field is equivalent to WP_Comment-&gt;comment_approved and the value matching the &quot;comment_approved&quot; column in SQL. */
    approved?: Maybe<Scalars['Boolean']>
    /** The author of the comment */
    author?: Maybe<CommentToCommenterConnectionEdge>
    /** IP address for the author. This field is equivalent to WP_Comment-&gt;comment_author_IP and the value matching the &quot;comment_author_IP&quot; column in SQL. */
    authorIp?: Maybe<Scalars['String']>
    /**
     * ID for the comment, unique among comments.
     * @deprecated Deprecated in favor of databaseId
     */
    commentId?: Maybe<Scalars['Int']>
    /** Connection between the Comment type and the ContentNode type */
    commentedOn?: Maybe<CommentToContentNodeConnectionEdge>
    /** Content of the comment. This field is equivalent to WP_Comment-&gt;comment_content and the value matching the &quot;comment_content&quot; column in SQL. */
    content?: Maybe<Scalars['String']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** Date the comment was posted in local time. This field is equivalent to WP_Comment-&gt;date and the value matching the &quot;date&quot; column in SQL. */
    date?: Maybe<Scalars['String']>
    /** Date the comment was posted in GMT. This field is equivalent to WP_Comment-&gt;date_gmt and the value matching the &quot;date_gmt&quot; column in SQL. */
    dateGmt?: Maybe<Scalars['String']>
    /** The globally unique identifier for the comment object */
    id: Scalars['ID']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Karma value for the comment. This field is equivalent to WP_Comment-&gt;comment_karma and the value matching the &quot;comment_karma&quot; column in SQL. */
    karma?: Maybe<Scalars['Int']>
    /** Connection between the Comment type and the Comment type */
    parent?: Maybe<CommentToParentCommentConnectionEdge>
    /** The database id of the parent comment node or null if it is the root comment */
    parentDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the parent comment node. */
    parentId?: Maybe<Scalars['ID']>
    /** Connection between the Comment type and the Comment type */
    replies?: Maybe<CommentToCommentConnection>
    /** Type of comment. This field is equivalent to WP_Comment-&gt;comment_type and the value matching the &quot;comment_type&quot; column in SQL. */
    type?: Maybe<Scalars['String']>
  }

/** A Comment object */
export type CommentContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A Comment object */
export type CommentParentArgs = {
  where?: Maybe<CommentToParentCommentConnectionWhereArgs>
}

/** A Comment object */
export type CommentRepliesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CommentToCommentConnectionWhereArgs>
}

/** A Comment Author object */
export type CommentAuthor = Node &
  Commenter & {
    __typename?: 'CommentAuthor'
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int']
    /** The email for the comment author */
    email?: Maybe<Scalars['String']>
    /** The globally unique identifier for the comment author object */
    id: Scalars['ID']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** The name for the comment author. */
    name?: Maybe<Scalars['String']>
    /** The url the comment author. */
    url?: Maybe<Scalars['String']>
  }

/** Connection between the Comment type and the Comment type */
export type CommentToCommentConnection = {
  __typename?: 'CommentToCommentConnection'
  /** Edges for the CommentToCommentConnection connection */
  edges?: Maybe<Array<Maybe<CommentToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CommentToCommentConnectionEdge = {
  __typename?: 'CommentToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
}

/** Arguments for filtering the CommentToCommentConnection connection */
export type CommentToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Connection between the Comment type and the Commenter type */
export type CommentToCommenterConnectionEdge = {
  __typename?: 'CommentToCommenterConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Commenter>
}

/** Connection between the Comment type and the ContentNode type */
export type CommentToContentNodeConnectionEdge = {
  __typename?: 'CommentToContentNodeConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<ContentNode>
}

/** Connection between the Comment type and the Comment type */
export type CommentToParentCommentConnectionEdge = {
  __typename?: 'CommentToParentCommentConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Comment>
}

/** Arguments for filtering the CommentToParentCommentConnection connection */
export type CommentToParentCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** The author of a comment */
export type Commenter = {
  /** Identifies the primary key from the database. */
  databaseId: Scalars['Int']
  /** The email address of the author of a comment. */
  email?: Maybe<Scalars['String']>
  /** The globally unique identifier for the comment author. */
  id: Scalars['ID']
  /** Whether the author information is considered restricted. (not fully public) */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** The name of the author of a comment. */
  name?: Maybe<Scalars['String']>
  /** The url of the author of a comment. */
  url?: Maybe<Scalars['String']>
}

/** Options for ordering the connection */
export enum CommentsConnectionOrderbyEnum {
  /** Order by browser user agent of the commenter. */
  CommentAgent = 'COMMENT_AGENT',
  /** Order by true/false approval of the comment. */
  CommentApproved = 'COMMENT_APPROVED',
  /** Order by name of the comment author. */
  CommentAuthor = 'COMMENT_AUTHOR',
  /** Order by e-mail of the comment author. */
  CommentAuthorEmail = 'COMMENT_AUTHOR_EMAIL',
  /** Order by IP address of the comment author. */
  CommentAuthorIp = 'COMMENT_AUTHOR_IP',
  /** Order by URL address of the comment author. */
  CommentAuthorUrl = 'COMMENT_AUTHOR_URL',
  /** Order by the comment contents. */
  CommentContent = 'COMMENT_CONTENT',
  /** Order by date/time timestamp of the comment. */
  CommentDate = 'COMMENT_DATE',
  /** Order by GMT timezone date/time timestamp of the comment. */
  CommentDateGmt = 'COMMENT_DATE_GMT',
  /** Order by the globally unique identifier for the comment object */
  CommentId = 'COMMENT_ID',
  /** Order by the array list of comment IDs listed in the where clause. */
  CommentIn = 'COMMENT_IN',
  /** Order by the comment karma score. */
  CommentKarma = 'COMMENT_KARMA',
  /** Order by the comment parent ID. */
  CommentParent = 'COMMENT_PARENT',
  /** Order by the post object ID. */
  CommentPostId = 'COMMENT_POST_ID',
  /** Order by the the type of comment, such as 'comment', 'pingback', or 'trackback'. */
  CommentType = 'COMMENT_TYPE',
  /** Order by the user ID. */
  UserId = 'USER_ID',
}

/** Nodes used to manage content */
export type ContentNode = {
  /** Connection between the ContentNode type and the ContentType type */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
  /** The ID of the node in the database. */
  databaseId: Scalars['Int']
  /** Post publishing date. */
  date?: Maybe<Scalars['String']>
  /** The publishing date set in GMT. */
  dateGmt?: Maybe<Scalars['String']>
  /** The desired slug of the post */
  desiredSlug?: Maybe<Scalars['String']>
  /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
  /** The RSS enclosure for the object */
  enclosure?: Maybe<Scalars['String']>
  /** Connection between the ContentNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
  /** Connection between the ContentNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
  /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
  guid?: Maybe<Scalars['String']>
  /** The unique resource identifier path */
  id: Scalars['ID']
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']
  /** Whether the object is a node in the preview state */
  isPreview?: Maybe<Scalars['Boolean']>
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']
  /** The user that most recently edited the node */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
  /** The permalink of the post */
  link?: Maybe<Scalars['String']>
  /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
  modified?: Maybe<Scalars['String']>
  /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
  modifiedGmt?: Maybe<Scalars['String']>
  /** The database id of the preview node */
  previewRevisionDatabaseId?: Maybe<Scalars['Int']>
  /** Whether the object is a node in the preview state */
  previewRevisionId?: Maybe<Scalars['ID']>
  /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
  slug?: Maybe<Scalars['String']>
  /** The current status of the object */
  status?: Maybe<Scalars['String']>
  /** The template assigned to a node of content */
  template?: Maybe<ContentTemplate>
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']>
}

/** Nodes used to manage content */
export type ContentNodeEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** Nodes used to manage content */
export type ContentNodeEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ContentNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Connection between the ContentNode type and the ContentType type */
export type ContentNodeToContentTypeConnectionEdge = {
  __typename?: 'ContentNodeToContentTypeConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<ContentType>
}

/** Connection between the ContentNode type and the User type */
export type ContentNodeToEditLastConnectionEdge = {
  __typename?: 'ContentNodeToEditLastConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<User>
}

/** Connection between the ContentNode type and the User type */
export type ContentNodeToEditLockConnectionEdge = {
  __typename?: 'ContentNodeToEditLockConnectionEdge'
  /** The timestamp for when the node was last edited */
  lockTimestamp?: Maybe<Scalars['String']>
  /** The node of the connection, without the edges */
  node?: Maybe<User>
}

/** Connection between the ContentNode type and the EnqueuedScript type */
export type ContentNodeToEnqueuedScriptConnection = {
  __typename?: 'ContentNodeToEnqueuedScriptConnection'
  /** Edges for the ContentNodeToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<ContentNodeToEnqueuedScriptConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ContentNodeToEnqueuedScriptConnectionEdge = {
  __typename?: 'ContentNodeToEnqueuedScriptConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>
}

/** Connection between the ContentNode type and the EnqueuedStylesheet type */
export type ContentNodeToEnqueuedStylesheetConnection = {
  __typename?: 'ContentNodeToEnqueuedStylesheetConnection'
  /** Edges for the ContentNodeToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<ContentNodeToEnqueuedStylesheetConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ContentNodeToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'ContentNodeToEnqueuedStylesheetConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>
}

/** A union of Content Node Types that support revisions */
export type ContentRevisionUnion = Post | Page

/** The template assigned to a node of content */
export type ContentTemplate = {
  /** The name of the template */
  templateName?: Maybe<Scalars['String']>
}

/** An Post Type object */
export type ContentType = Node &
  UniformResourceIdentifiable & {
    __typename?: 'ContentType'
    /** Whether this content type should can be exported. */
    canExport?: Maybe<Scalars['Boolean']>
    /** Connection between the ContentType type and the Taxonomy type */
    connectedTaxonomies?: Maybe<ContentTypeToTaxonomyConnection>
    /** Connection between the ContentType type and the ContentNode type */
    contentNodes?: Maybe<ContentTypeToContentNodeConnection>
    /** Whether content of this type should be deleted when the author of it is deleted from the system. */
    deleteWithUser?: Maybe<Scalars['Boolean']>
    /** Description of the content type. */
    description?: Maybe<Scalars['String']>
    /** Whether to exclude nodes of this content type from front end search results. */
    excludeFromSearch?: Maybe<Scalars['Boolean']>
    /** The plural name of the content type within the GraphQL Schema. */
    graphqlPluralName?: Maybe<Scalars['String']>
    /** The singular name of the content type within the GraphQL Schema. */
    graphqlSingleName?: Maybe<Scalars['String']>
    /** Whether this content type should have archives. Content archives are generated by type and by date. */
    hasArchive?: Maybe<Scalars['Boolean']>
    /** Whether the content type is hierarchical, for example pages. */
    hierarchical?: Maybe<Scalars['Boolean']>
    /** The globally unique identifier of the post-type object. */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether this page is set to the static front page. */
    isFrontPage: Scalars['Boolean']
    /** Whether this page is set to the blog posts page. */
    isPostsPage: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** Display name of the content type. */
    label?: Maybe<Scalars['String']>
    /** Details about the content type labels. */
    labels?: Maybe<PostTypeLabelDetails>
    /** The name of the icon file to display as a menu icon. */
    menuIcon?: Maybe<Scalars['String']>
    /** The position of this post type in the menu. Only applies if show_in_menu is true. */
    menuPosition?: Maybe<Scalars['Int']>
    /** The internal name of the post type. This should not be used for display purposes. */
    name?: Maybe<Scalars['String']>
    /** Whether a content type is intended for use publicly either via the admin interface or by front-end users. While the default settings of exclude_from_search, publicly_queryable, show_ui, and show_in_nav_menus are inherited from public, each does not rely on this relationship and controls a very specific intention. */
    public?: Maybe<Scalars['Boolean']>
    /** Whether queries can be performed on the front end for the content type as part of parse_request(). */
    publiclyQueryable?: Maybe<Scalars['Boolean']>
    /** Name of content type to display in REST API &quot;wp/v2&quot; namespace. */
    restBase?: Maybe<Scalars['String']>
    /** The REST Controller class assigned to handling this content type. */
    restControllerClass?: Maybe<Scalars['String']>
    /** Makes this content type available via the admin bar. */
    showInAdminBar?: Maybe<Scalars['Boolean']>
    /** Whether to add the content type to the GraphQL Schema. */
    showInGraphql?: Maybe<Scalars['Boolean']>
    /** Where to show the content type in the admin menu. To work, $show_ui must be true. If true, the post type is shown in its own top level menu. If false, no menu is shown. If a string of an existing top level menu (eg. &quot;tools.php&quot; or &quot;edit.php?post_type=page&quot;), the post type will be placed as a sub-menu of that. */
    showInMenu?: Maybe<Scalars['Boolean']>
    /** Makes this content type available for selection in navigation menus. */
    showInNavMenus?: Maybe<Scalars['Boolean']>
    /** Whether the content type is associated with a route under the the REST API &quot;wp/v2&quot; namespace. */
    showInRest?: Maybe<Scalars['Boolean']>
    /** Whether to generate and allow a UI for managing this content type in the admin. */
    showUi?: Maybe<Scalars['Boolean']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** An Post Type object */
export type ContentTypeConnectedTaxonomiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** An Post Type object */
export type ContentTypeContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ContentTypeToContentNodeConnectionWhereArgs>
}

/** Allowed Content Types */
export enum ContentTypeEnum {
  /** The Type of Content object */
  Attachment = 'ATTACHMENT',
  /** The Type of Content object */
  Page = 'PAGE',
  /** The Type of Content object */
  Post = 'POST',
  /** The Type of Content object */
  Product = 'PRODUCT',
  /** The Type of Content object */
  ProductVariation = 'PRODUCT_VARIATION',
  /** The Type of Content object */
  ShopCoupon = 'SHOP_COUPON',
  /** The Type of Content object */
  ShopOrder = 'SHOP_ORDER',
  /** The Type of Content object */
  ShopOrderRefund = 'SHOP_ORDER_REFUND',
}

/** The Type of Identifier used to fetch a single Content Type node. To be used along with the "id" field. Default is "ID". */
export enum ContentTypeIdTypeEnum {
  /** The globally unique ID */
  Id = 'ID',
  /** The name of the content type. */
  Name = 'NAME',
}

/** Connection between the ContentType type and the ContentNode type */
export type ContentTypeToContentNodeConnection = {
  __typename?: 'ContentTypeToContentNodeConnection'
  /** Edges for the ContentTypeToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<ContentTypeToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ContentTypeToContentNodeConnectionEdge = {
  __typename?: 'ContentTypeToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the ContentTypeToContentNodeConnection connection */
export type ContentTypeToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the ContentType type and the Taxonomy type */
export type ContentTypeToTaxonomyConnection = {
  __typename?: 'ContentTypeToTaxonomyConnection'
  /** Edges for the ContentTypeToTaxonomyConnection connection */
  edges?: Maybe<Array<Maybe<ContentTypeToTaxonomyConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Taxonomy>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ContentTypeToTaxonomyConnectionEdge = {
  __typename?: 'ContentTypeToTaxonomyConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Taxonomy>
}

/** Allowed Content Types of the Category taxonomy. */
export enum ContentTypesOfCategoryEnum {
  /** The Type of Content object */
  Post = 'POST',
}

/** Allowed Content Types of the PaColor taxonomy. */
export enum ContentTypesOfPaColorEnum {
  /** The Type of Content object */
  Product = 'PRODUCT',
}

/** Allowed Content Types of the PaSize taxonomy. */
export enum ContentTypesOfPaSizeEnum {
  /** The Type of Content object */
  Product = 'PRODUCT',
}

/** Allowed Content Types of the PostFormat taxonomy. */
export enum ContentTypesOfPostFormatEnum {
  /** The Type of Content object */
  Post = 'POST',
}

/** Allowed Content Types of the ProductCategory taxonomy. */
export enum ContentTypesOfProductCategoryEnum {
  /** The Type of Content object */
  Product = 'PRODUCT',
}

/** Allowed Content Types of the ProductTag taxonomy. */
export enum ContentTypesOfProductTagEnum {
  /** The Type of Content object */
  Product = 'PRODUCT',
}

/** Allowed Content Types of the ProductType taxonomy. */
export enum ContentTypesOfProductTypeEnum {
  /** The Type of Content object */
  Product = 'PRODUCT',
}

/** Allowed Content Types of the ShippingClass taxonomy. */
export enum ContentTypesOfShippingClassEnum {
  /** The Type of Content object */
  Product = 'PRODUCT',
  /** The Type of Content object */
  ProductVariation = 'PRODUCT_VARIATION',
}

/** Allowed Content Types of the Tag taxonomy. */
export enum ContentTypesOfTagEnum {
  /** The Type of Content object */
  Post = 'POST',
}

/** Allowed Content Types of the VisibleProduct taxonomy. */
export enum ContentTypesOfVisibleProductEnum {
  /** The Type of Content object */
  Product = 'PRODUCT',
  /** The Type of Content object */
  ProductVariation = 'PRODUCT_VARIATION',
}

/** Countries enumeration */
export enum CountriesEnum {
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
  Zw = 'ZW',
}

/** A coupon object */
export type Coupon = Node & {
  __typename?: 'Coupon'
  /** Amount off provided by the coupon */
  amount?: Maybe<Scalars['Float']>
  /** Coupon code */
  code?: Maybe<Scalars['String']>
  /** The ID of the coupon in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** Date coupon created */
  date?: Maybe<Scalars['String']>
  /** Date coupon expires */
  dateExpiry?: Maybe<Scalars['String']>
  /** Explanation of what the coupon does */
  description?: Maybe<Scalars['String']>
  /** Type of discount */
  discountType?: Maybe<DiscountTypeEnum>
  /** Only customers with a matching email address can use the coupon */
  emailRestrictions?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Excluding sale items mean this coupon cannot be used on items that are on sale (or carts that contain on sale items) */
  excludeSaleItems?: Maybe<Scalars['Boolean']>
  /** Connection between the Coupon type and the productCategory type */
  excludedProductCategories?: Maybe<CouponToExcludedProductCategoriesConnection>
  /** Connection between the Coupon type and the Product type */
  excludedProducts?: Maybe<CouponToExcludedProductsConnection>
  /** Does this coupon grant free shipping? */
  freeShipping?: Maybe<Scalars['Boolean']>
  /** The globally unique identifier for the coupon */
  id: Scalars['ID']
  /** Individual use means this coupon cannot be used in conjunction with other coupons */
  individualUse?: Maybe<Scalars['Boolean']>
  /** The number of products in your cart this coupon can apply to (for product discounts) */
  limitUsageToXItems?: Maybe<Scalars['Int']>
  /** Maximum spend amount that must be met before this coupon can be used  */
  maximumAmount?: Maybe<Scalars['Float']>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** Minimum spend amount that must be met before this coupon can be used */
  minimumAmount?: Maybe<Scalars['Float']>
  /** Date coupon modified */
  modified?: Maybe<Scalars['String']>
  /** Connection between the Coupon type and the productCategory type */
  productCategories?: Maybe<CouponToProductCategoryConnection>
  /** Connection between the Coupon type and the Product type */
  products?: Maybe<CouponToProductConnection>
  /** How many times the coupon has been used */
  usageCount?: Maybe<Scalars['Int']>
  /** Amount of times this coupon can be used globally */
  usageLimit?: Maybe<Scalars['Int']>
  /** Amount of times this coupon can be used by a customer */
  usageLimitPerUser?: Maybe<Scalars['Int']>
  /** Connection between the Coupon type and the Customer type */
  usedBy?: Maybe<CouponToCustomerConnection>
}

/** A coupon object */
export type CouponExcludedProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CouponToExcludedProductCategoriesConnectionWhereArgs>
}

/** A coupon object */
export type CouponExcludedProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CouponToExcludedProductsConnectionWhereArgs>
}

/** A coupon object */
export type CouponMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A coupon object */
export type CouponProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CouponToProductCategoryConnectionWhereArgs>
}

/** A coupon object */
export type CouponProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CouponToProductConnectionWhereArgs>
}

/** A coupon object */
export type CouponUsedByArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CouponToCustomerConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single Coupon. Default is ID. */
export enum CouponIdTypeEnum {
  /** Coupon code. */
  Code = 'CODE',
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** a coupon line object */
export type CouponLine = {
  __typename?: 'CouponLine'
  /** Line&#039;s Coupon code */
  code?: Maybe<Scalars['String']>
  /** Line&#039;s Coupon */
  coupon?: Maybe<Coupon>
  /** The ID of the order item in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** Line&#039;s Discount total */
  discount?: Maybe<Scalars['String']>
  /** Line&#039;s Discount total tax */
  discountTax?: Maybe<Scalars['String']>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** The Id of the order the order item belongs to. */
  orderId?: Maybe<Scalars['Int']>
}

/** a coupon line object */
export type CouponLineMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** Connection between the Coupon type and the Customer type */
export type CouponToCustomerConnection = {
  __typename?: 'CouponToCustomerConnection'
  /** Edges for the CouponToCustomerConnection connection */
  edges?: Maybe<Array<Maybe<CouponToCustomerConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Customer>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CouponToCustomerConnectionEdge = {
  __typename?: 'CouponToCustomerConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Customer>
}

/** Arguments for filtering the CouponToCustomerConnection connection */
export type CouponToCustomerConnectionWhereArgs = {
  /** Limit result set to resources with a specific email. */
  email?: Maybe<Scalars['String']>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Order of results. */
  order?: Maybe<OrderEnum>
  /** Order results by a specific field. */
  orderby?: Maybe<CustomerConnectionOrderbyEnum>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
}

/** Connection between the Coupon type and the productCategory type */
export type CouponToExcludedProductCategoriesConnection = {
  __typename?: 'CouponToExcludedProductCategoriesConnection'
  /** Edges for the CouponToExcludedProductCategoriesConnection connection */
  edges?: Maybe<Array<Maybe<CouponToExcludedProductCategoriesConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductCategory>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CouponToExcludedProductCategoriesConnectionEdge = {
  __typename?: 'CouponToExcludedProductCategoriesConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductCategory>
}

/** Arguments for filtering the CouponToExcludedProductCategoriesConnection connection */
export type CouponToExcludedProductCategoriesConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Coupon type and the Product type */
export type CouponToExcludedProductsConnection = {
  __typename?: 'CouponToExcludedProductsConnection'
  /** Edges for the CouponToExcludedProductsConnection connection */
  edges?: Maybe<Array<Maybe<CouponToExcludedProductsConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CouponToExcludedProductsConnectionEdge = {
  __typename?: 'CouponToExcludedProductsConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the CouponToExcludedProductsConnection connection */
export type CouponToExcludedProductsConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the Coupon type and the productCategory type */
export type CouponToProductCategoryConnection = {
  __typename?: 'CouponToProductCategoryConnection'
  /** Edges for the CouponToProductCategoryConnection connection */
  edges?: Maybe<Array<Maybe<CouponToProductCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductCategory>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CouponToProductCategoryConnectionEdge = {
  __typename?: 'CouponToProductCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductCategory>
}

/** Arguments for filtering the CouponToProductCategoryConnection connection */
export type CouponToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Coupon type and the Product type */
export type CouponToProductConnection = {
  __typename?: 'CouponToProductConnection'
  /** Edges for the CouponToProductConnection connection */
  edges?: Maybe<Array<Maybe<CouponToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CouponToProductConnectionEdge = {
  __typename?: 'CouponToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the CouponToProductConnection connection */
export type CouponToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Customer account credentials */
export type CreateAccountInput = {
  /** Customer password */
  password: Scalars['String']
  /** Customer username */
  username: Scalars['String']
}

/** Input for the createCategory mutation */
export type CreateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the category object */
  description?: Maybe<Scalars['String']>
  /** The name of the category object to mutate */
  name: Scalars['String']
  /** The ID of the category that should be set as the parent */
  parentId?: Maybe<Scalars['ID']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createCategory mutation */
export type CreateCategoryPayload = {
  __typename?: 'CreateCategoryPayload'
  /** The created category */
  category?: Maybe<Category>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the createComment mutation */
export type CreateCommentInput = {
  /** The approval status of the comment. */
  approved?: Maybe<Scalars['String']>
  /** The name of the comment's author. */
  author?: Maybe<Scalars['String']>
  /** The email of the comment's author. */
  authorEmail?: Maybe<Scalars['String']>
  /** The url of the comment's author. */
  authorUrl?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the post object the comment belongs to. */
  commentOn?: Maybe<Scalars['Int']>
  /** Content of the comment. */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** Parent comment of current comment. */
  parent?: Maybe<Scalars['ID']>
  /** Type of comment. */
  type?: Maybe<Scalars['String']>
}

/** The payload for the createComment mutation */
export type CreateCommentPayload = {
  __typename?: 'CreateCommentPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment that was created */
  comment?: Maybe<Comment>
  /** Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache */
  success?: Maybe<Scalars['Boolean']>
}

/** Input for the createCoupon mutation */
export type CreateCouponInput = {
  /** The amount of discount. Should always be numeric, even if setting a percentage. */
  amount?: Maybe<Scalars['Float']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Coupon code. */
  code: Scalars['String']
  /** The date the coupon expires, in the site's timezone. */
  dateExpires?: Maybe<Scalars['String']>
  /** The date the coupon expires, as GMT. */
  dateExpiresGmt?: Maybe<Scalars['String']>
  /** Coupon description. */
  description?: Maybe<Scalars['String']>
  /** Determines the type of discount that will be applied. */
  discountType?: Maybe<DiscountTypeEnum>
  /** List of email addresses that can use this coupon. */
  emailRestrictions?: Maybe<Array<Maybe<Scalars['String']>>>
  /** If true, this coupon will not be applied to items that have sale prices. */
  excludeSaleItems?: Maybe<Scalars['Boolean']>
  /** List of category IDs the coupon does not apply to. */
  excludedProductCategories?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** List of product IDs the coupon cannot be used on. */
  excludedProductIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** If true and if the free shipping method requires a coupon, this coupon will enable free shipping. */
  freeShipping?: Maybe<Scalars['Boolean']>
  /** If true, the coupon can only be used individually. Other applied coupons will be removed from the cart. */
  individualUse?: Maybe<Scalars['Boolean']>
  /** Max number of items in the cart the coupon can be applied to. */
  limitUsageToXItems?: Maybe<Scalars['Int']>
  /** Maximum order amount allowed when using the coupon. */
  maximumAmount?: Maybe<Scalars['String']>
  /** Meta data. */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** Minimum order amount that needs to be in the cart before coupon applies. */
  minimumAmount?: Maybe<Scalars['String']>
  /** List of category IDs the coupon applies to. */
  productCategories?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** List of product IDs the coupon can be used on. */
  productIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** How many times the coupon can be used in total. */
  usageLimit?: Maybe<Scalars['Int']>
  /** How many times the coupon can be used per customer. */
  usageLimitPerUser?: Maybe<Scalars['Int']>
}

/** The payload for the createCoupon mutation */
export type CreateCouponPayload = {
  __typename?: 'CreateCouponPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  coupon?: Maybe<Coupon>
}

/** Input for the createMediaItem mutation */
export type CreateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: Maybe<Scalars['String']>
  /** The userId to assign as the author of the mediaItem */
  authorId?: Maybe<Scalars['ID']>
  /** The caption for the mediaItem */
  caption?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment status for the mediaItem */
  commentStatus?: Maybe<Scalars['String']>
  /** The date of the mediaItem */
  date?: Maybe<Scalars['String']>
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: Maybe<Scalars['String']>
  /** Description of the mediaItem */
  description?: Maybe<Scalars['String']>
  /** The file name of the mediaItem */
  filePath?: Maybe<Scalars['String']>
  /** The file type of the mediaItem */
  fileType?: Maybe<MimeTypeEnum>
  /** The WordPress post ID or the graphQL postId of the parent object */
  parentId?: Maybe<Scalars['ID']>
  /** The ping status for the mediaItem */
  pingStatus?: Maybe<Scalars['String']>
  /** The slug of the mediaItem */
  slug?: Maybe<Scalars['String']>
  /** The status of the mediaItem */
  status?: Maybe<MediaItemStatusEnum>
  /** The title of the mediaItem */
  title?: Maybe<Scalars['String']>
}

/** The payload for the createMediaItem mutation */
export type CreateMediaItemPayload = {
  __typename?: 'CreateMediaItemPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The MediaItem object mutation type. */
  mediaItem?: Maybe<MediaItem>
}

/** Input for the createOrder mutation */
export type CreateOrderInput = {
  /** Order billing address */
  billing?: Maybe<CustomerAddressInput>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Coupons codes to be applied to order */
  coupons?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Currency the order was created with, in ISO format. */
  currency?: Maybe<Scalars['String']>
  /** Order customer ID */
  customerId?: Maybe<Scalars['Int']>
  /** Note left by customer during checkout. */
  customerNote?: Maybe<Scalars['String']>
  /** Order shipping lines */
  feeLines?: Maybe<Array<Maybe<FeeLineInput>>>
  /** Define if the order is paid. It will set the status to processing and reduce stock items. */
  isPaid?: Maybe<Scalars['Boolean']>
  /** Order line items */
  lineItems?: Maybe<Array<Maybe<LineItemInput>>>
  /** Order meta data */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** Parent order ID. */
  parentId?: Maybe<Scalars['Int']>
  /** Payment method ID. */
  paymentMethod?: Maybe<Scalars['String']>
  /** Payment method title. */
  paymentMethodTitle?: Maybe<Scalars['String']>
  /** Order shipping address */
  shipping?: Maybe<CustomerAddressInput>
  /** Order shipping lines */
  shippingLines?: Maybe<Array<Maybe<ShippingLineInput>>>
  /** Order status */
  status?: Maybe<OrderStatusEnum>
  /** Order transaction ID */
  transactionId?: Maybe<Scalars['String']>
}

/** The payload for the createOrder mutation */
export type CreateOrderPayload = {
  __typename?: 'CreateOrderPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  order?: Maybe<Order>
  orderId?: Maybe<Scalars['Int']>
}

/** Input for the createPaColor mutation */
export type CreatePaColorInput = {
  /** The slug that the pa_color will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the pa_color object */
  description?: Maybe<Scalars['String']>
  /** The name of the pa_color object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createPaColor mutation */
export type CreatePaColorPayload = {
  __typename?: 'CreatePaColorPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created pa_color */
  paColor?: Maybe<PaColor>
}

/** Input for the createPaSize mutation */
export type CreatePaSizeInput = {
  /** The slug that the pa_size will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the pa_size object */
  description?: Maybe<Scalars['String']>
  /** The name of the pa_size object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createPaSize mutation */
export type CreatePaSizePayload = {
  __typename?: 'CreatePaSizePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created pa_size */
  paSize?: Maybe<PaSize>
}

/** Input for the createPage mutation */
export type CreatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>
  /** The content of the object */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>
  /** The ID of the parent object */
  parentId?: Maybe<Scalars['ID']>
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>
  /** The status of the object */
  status?: Maybe<PostStatusEnum>
  /** The title of the object */
  title?: Maybe<Scalars['String']>
}

/** The payload for the createPage mutation */
export type CreatePagePayload = {
  __typename?: 'CreatePagePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The Post object mutation type. */
  page?: Maybe<Page>
}

/** Input for the createPostFormat mutation */
export type CreatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the post_format object */
  description?: Maybe<Scalars['String']>
  /** The name of the post_format object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createPostFormat mutation */
export type CreatePostFormatPayload = {
  __typename?: 'CreatePostFormatPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created post_format */
  postFormat?: Maybe<PostFormat>
}

/** Input for the createPost mutation */
export type CreatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>
  /** Set connections between the post and categories */
  categories?: Maybe<PostCategoriesInput>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>
  /** The content of the object */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** The excerpt of the object */
  excerpt?: Maybe<Scalars['String']>
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>
  /** The ping status for the object */
  pingStatus?: Maybe<Scalars['String']>
  /** URLs that have been pinged. */
  pinged?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Set connections between the post and postFormats */
  postFormats?: Maybe<PostPostFormatsInput>
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>
  /** The status of the object */
  status?: Maybe<PostStatusEnum>
  /** Set connections between the post and tags */
  tags?: Maybe<PostTagsInput>
  /** The title of the object */
  title?: Maybe<Scalars['String']>
  /** URLs queued to be pinged. */
  toPing?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The payload for the createPost mutation */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The Post object mutation type. */
  post?: Maybe<Post>
}

/** Input for the createProductCategory mutation */
export type CreateProductCategoryInput = {
  /** The slug that the product_cat will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_cat object */
  description?: Maybe<Scalars['String']>
  /** The name of the product_cat object to mutate */
  name: Scalars['String']
  /** The ID of the product_cat that should be set as the parent */
  parentId?: Maybe<Scalars['ID']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createProductCategory mutation */
export type CreateProductCategoryPayload = {
  __typename?: 'CreateProductCategoryPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_cat */
  productCategory?: Maybe<ProductCategory>
}

/** Input for the createProductTag mutation */
export type CreateProductTagInput = {
  /** The slug that the product_tag will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_tag object */
  description?: Maybe<Scalars['String']>
  /** The name of the product_tag object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createProductTag mutation */
export type CreateProductTagPayload = {
  __typename?: 'CreateProductTagPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_tag */
  productTag?: Maybe<ProductTag>
}

/** Input for the createProductType mutation */
export type CreateProductTypeInput = {
  /** The slug that the product_type will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_type object */
  description?: Maybe<Scalars['String']>
  /** The name of the product_type object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createProductType mutation */
export type CreateProductTypePayload = {
  __typename?: 'CreateProductTypePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_type */
  productType?: Maybe<ProductType>
}

/** Input for the createShippingClass mutation */
export type CreateShippingClassInput = {
  /** The slug that the product_shipping_class will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_shipping_class object */
  description?: Maybe<Scalars['String']>
  /** The name of the product_shipping_class object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createShippingClass mutation */
export type CreateShippingClassPayload = {
  __typename?: 'CreateShippingClassPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_shipping_class */
  shippingClass?: Maybe<ShippingClass>
}

/** Input for the createTag mutation */
export type CreateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the post_tag object */
  description?: Maybe<Scalars['String']>
  /** The name of the post_tag object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createTag mutation */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created post_tag */
  tag?: Maybe<Tag>
}

/** Input for the createUser mutation */
export type CreateUserInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>
  /** User's locale. */
  locale?: Maybe<Scalars['String']>
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: Maybe<Scalars['Boolean']>
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: Maybe<Scalars['Boolean']>
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>
  /** An array of roles to be assigned to the user. */
  roles?: Maybe<Array<Maybe<Scalars['String']>>>
  /** A string that contains the user's username for logging in. */
  username: Scalars['String']
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>
}

/** The payload for the createUser mutation */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The User object mutation type. */
  user?: Maybe<User>
}

/** Input for the createVisibleProduct mutation */
export type CreateVisibleProductInput = {
  /** The slug that the product_visibility will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_visibility object */
  description?: Maybe<Scalars['String']>
  /** The name of the product_visibility object to mutate */
  name: Scalars['String']
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the createVisibleProduct mutation */
export type CreateVisibleProductPayload = {
  __typename?: 'CreateVisibleProductPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_visibility */
  visibleProduct?: Maybe<VisibleProduct>
}

/** A customer object */
export type Customer = Node & {
  __typename?: 'Customer'
  /** Return the date customer billing address properties */
  billing?: Maybe<CustomerAddress>
  /** Has customer calculated shipping? */
  calculatedShipping?: Maybe<Scalars['Boolean']>
  /** The ID of the customer in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** Return the date customer was created */
  date?: Maybe<Scalars['String']>
  /** Return the customer&#039;s display name. */
  displayName?: Maybe<Scalars['String']>
  /** Connection between the Customer type and the DownloadableItem type */
  downloadableItems?: Maybe<CustomerToDownloadableItemConnection>
  /** Return the customer&#039;s email. */
  email?: Maybe<Scalars['String']>
  /** Return the customer&#039;s first name. */
  firstName?: Maybe<Scalars['String']>
  /** Has calculated shipping? */
  hasCalculatedShipping?: Maybe<Scalars['Boolean']>
  /** The globally unique identifier for the customer */
  id: Scalars['ID']
  /** Whether the JWT User secret has been revoked. If the secret has been revoked, auth tokens will not be issued until an admin, or user with proper capabilities re-issues a secret for the user. */
  isJwtAuthSecretRevoked: Scalars['Boolean']
  /** Return the date customer was last updated */
  isPayingCustomer?: Maybe<Scalars['Boolean']>
  /** Is customer VAT exempt? */
  isVatExempt?: Maybe<Scalars['Boolean']>
  /** The expiration for the JWT Token for the user. If not set custom for the user, it will use the default sitewide expiration setting */
  jwtAuthExpiration?: Maybe<Scalars['String']>
  /** A JWT token that can be used in future requests for authentication/authorization */
  jwtAuthToken?: Maybe<Scalars['String']>
  /** A JWT token that can be used in future requests to get a refreshed jwtAuthToken. If the refresh token used in a request is revoked or otherwise invalid, a valid Auth token will NOT be issued in the response headers. */
  jwtRefreshToken?: Maybe<Scalars['String']>
  /** A unique secret tied to the users JWT token that can be revoked or refreshed. Revoking the secret prevents JWT tokens from being issued to the user. Refreshing the token invalidates previously issued tokens, but allows new tokens to be issued. */
  jwtUserSecret?: Maybe<Scalars['String']>
  /** Return the customer&#039;s last name. */
  lastName?: Maybe<Scalars['String']>
  /** Gets the customers last order. */
  lastOrder?: Maybe<Order>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** Return the date customer was last updated */
  modified?: Maybe<Scalars['String']>
  /** Return the number of orders this customer has. */
  orderCount?: Maybe<Scalars['Int']>
  /** Connection between the Customer type and the Order type */
  orders?: Maybe<CustomerToOrderConnection>
  /** Connection between the Customer type and the Refund type */
  refunds?: Maybe<CustomerToRefundConnection>
  /** Return the customer&#039;s user role. */
  role?: Maybe<Scalars['String']>
  /** A JWT token that can be used in future requests to for WooCommerce session identification */
  sessionToken?: Maybe<Scalars['String']>
  /** Return the date customer shipping address properties */
  shipping?: Maybe<CustomerAddress>
  /** Return how much money this customer has spent. */
  totalSpent?: Maybe<Scalars['Float']>
  /** Return the customer&#039;s username. */
  username?: Maybe<Scalars['String']>
}

/** A customer object */
export type CustomerDownloadableItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CustomerToDownloadableItemConnectionWhereArgs>
}

/** A customer object */
export type CustomerMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A customer object */
export type CustomerOrdersArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CustomerToOrderConnectionWhereArgs>
}

/** A customer object */
export type CustomerRefundsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<CustomerToRefundConnectionWhereArgs>
}

/** A customer address object */
export type CustomerAddress = {
  __typename?: 'CustomerAddress'
  /** Address 1 */
  address1?: Maybe<Scalars['String']>
  /** Address 2 */
  address2?: Maybe<Scalars['String']>
  /** City */
  city?: Maybe<Scalars['String']>
  /** Company */
  company?: Maybe<Scalars['String']>
  /** Country */
  country?: Maybe<CountriesEnum>
  /** E-mail */
  email?: Maybe<Scalars['String']>
  /** First name */
  firstName?: Maybe<Scalars['String']>
  /** Last name */
  lastName?: Maybe<Scalars['String']>
  /** Phone */
  phone?: Maybe<Scalars['String']>
  /** Zip Postal Code */
  postcode?: Maybe<Scalars['String']>
  /** State */
  state?: Maybe<Scalars['String']>
}

/** Customer address information */
export type CustomerAddressInput = {
  /** Address 1 */
  address1?: Maybe<Scalars['String']>
  /** Address 2 */
  address2?: Maybe<Scalars['String']>
  /** City */
  city?: Maybe<Scalars['String']>
  /** Company */
  company?: Maybe<Scalars['String']>
  /** Country */
  country?: Maybe<CountriesEnum>
  /** E-mail */
  email?: Maybe<Scalars['String']>
  /** First name */
  firstName?: Maybe<Scalars['String']>
  /** Last name */
  lastName?: Maybe<Scalars['String']>
  /** Clear old address data */
  overwrite?: Maybe<Scalars['Boolean']>
  /** Phone */
  phone?: Maybe<Scalars['String']>
  /** Zip Postal Code */
  postcode?: Maybe<Scalars['String']>
  /** State */
  state?: Maybe<Scalars['String']>
}

/** Field to order the connection by */
export enum CustomerConnectionOrderbyEnum {
  /** Order by customer email */
  Email = 'EMAIL',
  /** Order by customer ID */
  Id = 'ID',
  /** Order by include field */
  Include = 'INCLUDE',
  /** Order by customer display name */
  Name = 'NAME',
  /** Order by customer registration date */
  RegisteredDate = 'REGISTERED_DATE',
  /** Order by customer username */
  Username = 'USERNAME',
}

/** Connection between the Customer type and the DownloadableItem type */
export type CustomerToDownloadableItemConnection = {
  __typename?: 'CustomerToDownloadableItemConnection'
  /** Edges for the CustomerToDownloadableItemConnection connection */
  edges?: Maybe<Array<Maybe<CustomerToDownloadableItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<DownloadableItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CustomerToDownloadableItemConnectionEdge = {
  __typename?: 'CustomerToDownloadableItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<DownloadableItem>
}

/** Arguments for filtering the CustomerToDownloadableItemConnection connection */
export type CustomerToDownloadableItemConnectionWhereArgs = {
  /** Limit results to downloadable items that can be downloaded now. */
  active?: Maybe<Scalars['Boolean']>
  /** Limit results to downloadable items that are expired. */
  expired?: Maybe<Scalars['Boolean']>
  /** Limit results to downloadable items that have downloads remaining. */
  hasDownloadsRemaining?: Maybe<Scalars['Boolean']>
}

/** Connection between the Customer type and the Order type */
export type CustomerToOrderConnection = {
  __typename?: 'CustomerToOrderConnection'
  /** Edges for the CustomerToOrderConnection connection */
  edges?: Maybe<Array<Maybe<CustomerToOrderConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Order>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CustomerToOrderConnectionEdge = {
  __typename?: 'CustomerToOrderConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Order>
}

/** Arguments for filtering the CustomerToOrderConnection connection */
export type CustomerToOrderConnectionWhereArgs = {
  /** Limit result set to orders assigned a specific customer. */
  customerId?: Maybe<Scalars['Int']>
  /** Limit result set to orders assigned a specific group of customers. */
  customersIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<OrdersOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to orders assigned a specific product. */
  productId?: Maybe<Scalars['Int']>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to orders assigned a specific status. */
  statuses?: Maybe<Array<Maybe<OrderStatusEnum>>>
}

/** Connection between the Customer type and the Refund type */
export type CustomerToRefundConnection = {
  __typename?: 'CustomerToRefundConnection'
  /** Edges for the CustomerToRefundConnection connection */
  edges?: Maybe<Array<Maybe<CustomerToRefundConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Refund>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type CustomerToRefundConnectionEdge = {
  __typename?: 'CustomerToRefundConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Refund>
}

/** Arguments for filtering the CustomerToRefundConnection connection */
export type CustomerToRefundConnectionWhereArgs = {
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to refunds from a specific group of order IDs. */
  orderIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostTypeOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to refunds assigned a specific status. */
  statuses?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Object that can be identified with a Database ID */
export type DatabaseIdentifier = {
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int']
}

/** Date values */
export type DateInput = {
  /** Day of the month (from 1 to 31) */
  day?: Maybe<Scalars['Int']>
  /** Month number (from 1 to 12) */
  month?: Maybe<Scalars['Int']>
  /** 4 digit year (e.g. 2017) */
  year?: Maybe<Scalars['Int']>
}

/** Filter the connection based on input */
export type DateQueryInput = {
  /** Nodes should be returned after this date */
  after?: Maybe<DateInput>
  /** Nodes should be returned before this date */
  before?: Maybe<DateInput>
  /** Column to query against */
  column?: Maybe<PostObjectsConnectionDateColumnEnum>
  /** For after/before, whether exact value should be matched or not */
  compare?: Maybe<Scalars['String']>
  /** Day of the month (from 1 to 31) */
  day?: Maybe<Scalars['Int']>
  /** Hour (from 0 to 23) */
  hour?: Maybe<Scalars['Int']>
  /** For after/before, whether exact value should be matched or not */
  inclusive?: Maybe<Scalars['Boolean']>
  /** Minute (from 0 to 59) */
  minute?: Maybe<Scalars['Int']>
  /** Month number (from 1 to 12) */
  month?: Maybe<Scalars['Int']>
  /** OR or AND, how the sub-arrays should be compared */
  relation?: Maybe<RelationEnum>
  /** Second (0 to 59) */
  second?: Maybe<Scalars['Int']>
  /** Week of the year (from 0 to 53) */
  week?: Maybe<Scalars['Int']>
  /** 4 digit year (e.g. 2017) */
  year?: Maybe<Scalars['Int']>
}

/** The template assigned to the node */
export type DefaultTemplate = ContentTemplate & {
  __typename?: 'DefaultTemplate'
  /** The name of the template */
  templateName?: Maybe<Scalars['String']>
}

/** Input for the deleteCategory mutation */
export type DeleteCategoryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the category to delete */
  id: Scalars['ID']
}

/** The payload for the deleteCategory mutation */
export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload'
  /** The deteted term object */
  category?: Maybe<Category>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
}

/** Input for the deleteComment mutation */
export type DeleteCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Whether the comment should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>
  /** The deleted comment ID */
  id: Scalars['ID']
}

/** The payload for the deleteComment mutation */
export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The deleted comment object */
  comment?: Maybe<Comment>
  /** The deleted comment ID */
  deletedId?: Maybe<Scalars['ID']>
}

/** Input for the deleteCoupon mutation */
export type DeleteCouponInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Delete the object. Set to "false" by default. */
  forceDelete?: Maybe<Scalars['Boolean']>
  /** Unique identifier for the object. */
  id: Scalars['ID']
}

/** The payload for the deleteCoupon mutation */
export type DeleteCouponPayload = {
  __typename?: 'DeleteCouponPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  coupon?: Maybe<Coupon>
}

/** Input for the deleteMediaItem mutation */
export type DeleteMediaItemInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Whether the mediaItem should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>
  /** The ID of the mediaItem to delete */
  id: Scalars['ID']
}

/** The payload for the deleteMediaItem mutation */
export type DeleteMediaItemPayload = {
  __typename?: 'DeleteMediaItemPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted mediaItem */
  deletedId?: Maybe<Scalars['ID']>
  /** The mediaItem before it was deleted */
  mediaItem?: Maybe<MediaItem>
}

/** Input for the deleteOrder mutation */
export type DeleteOrderInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Delete or simply place in trash. */
  forceDelete?: Maybe<Scalars['Boolean']>
  /** Order global ID */
  id?: Maybe<Scalars['ID']>
  /** Order WP ID */
  orderId?: Maybe<Scalars['Int']>
}

/** Input for the deleteOrderItems mutation */
export type DeleteOrderItemsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Order global ID */
  id?: Maybe<Scalars['ID']>
  /** ID Order items being deleted */
  itemIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Order WP ID */
  orderId?: Maybe<Scalars['Int']>
}

/** The payload for the deleteOrderItems mutation */
export type DeleteOrderItemsPayload = {
  __typename?: 'DeleteOrderItemsPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  order?: Maybe<Order>
}

/** The payload for the deleteOrder mutation */
export type DeleteOrderPayload = {
  __typename?: 'DeleteOrderPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  order?: Maybe<Order>
}

/** Input for the deletePaColor mutation */
export type DeletePaColorInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the paColor to delete */
  id: Scalars['ID']
}

/** The payload for the deletePaColor mutation */
export type DeletePaColorPayload = {
  __typename?: 'DeletePaColorPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  paColor?: Maybe<PaColor>
}

/** Input for the deletePaSize mutation */
export type DeletePaSizeInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the paSize to delete */
  id: Scalars['ID']
}

/** The payload for the deletePaSize mutation */
export type DeletePaSizePayload = {
  __typename?: 'DeletePaSizePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  paSize?: Maybe<PaSize>
}

/** Input for the deletePage mutation */
export type DeletePageInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>
  /** The ID of the page to delete */
  id: Scalars['ID']
}

/** The payload for the deletePage mutation */
export type DeletePagePayload = {
  __typename?: 'DeletePagePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The object before it was deleted */
  page?: Maybe<Page>
}

/** Input for the deletePostFormat mutation */
export type DeletePostFormatInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the postFormat to delete */
  id: Scalars['ID']
}

/** The payload for the deletePostFormat mutation */
export type DeletePostFormatPayload = {
  __typename?: 'DeletePostFormatPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  postFormat?: Maybe<PostFormat>
}

/** Input for the deletePost mutation */
export type DeletePostInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>
  /** The ID of the post to delete */
  id: Scalars['ID']
}

/** The payload for the deletePost mutation */
export type DeletePostPayload = {
  __typename?: 'DeletePostPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The object before it was deleted */
  post?: Maybe<Post>
}

/** Input for the deleteProductCategory mutation */
export type DeleteProductCategoryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the productCategory to delete */
  id: Scalars['ID']
}

/** The payload for the deleteProductCategory mutation */
export type DeleteProductCategoryPayload = {
  __typename?: 'DeleteProductCategoryPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  productCategory?: Maybe<ProductCategory>
}

/** Input for the deleteProductTag mutation */
export type DeleteProductTagInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the productTag to delete */
  id: Scalars['ID']
}

/** The payload for the deleteProductTag mutation */
export type DeleteProductTagPayload = {
  __typename?: 'DeleteProductTagPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  productTag?: Maybe<ProductTag>
}

/** Input for the deleteProductType mutation */
export type DeleteProductTypeInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the productType to delete */
  id: Scalars['ID']
}

/** The payload for the deleteProductType mutation */
export type DeleteProductTypePayload = {
  __typename?: 'DeleteProductTypePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  productType?: Maybe<ProductType>
}

/** Input for the deleteReview mutation */
export type DeleteReviewInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Whether the product review should be force deleted instead of being moved to the trash */
  forceDelete?: Maybe<Scalars['Boolean']>
  /** The ID of the target product review */
  id: Scalars['ID']
}

/** The payload for the deleteReview mutation */
export type DeleteReviewPayload = {
  __typename?: 'DeleteReviewPayload'
  /** The affected product review ID */
  affectedId?: Maybe<Scalars['ID']>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The product rating of the affected product review */
  rating?: Maybe<Scalars['Float']>
  /** The affected product review */
  review?: Maybe<Comment>
}

/** Input for the deleteShippingClass mutation */
export type DeleteShippingClassInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the shippingClass to delete */
  id: Scalars['ID']
}

/** The payload for the deleteShippingClass mutation */
export type DeleteShippingClassPayload = {
  __typename?: 'DeleteShippingClassPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  shippingClass?: Maybe<ShippingClass>
}

/** Input for the deleteTag mutation */
export type DeleteTagInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the tag to delete */
  id: Scalars['ID']
}

/** The payload for the deleteTag mutation */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  tag?: Maybe<Tag>
}

/** Input for the deleteUser mutation */
export type DeleteUserInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the user you want to delete */
  id: Scalars['ID']
  /** Reassign posts and links to new User ID. */
  reassignId?: Maybe<Scalars['ID']>
}

/** The payload for the deleteUser mutation */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the user that you just deleted */
  deletedId?: Maybe<Scalars['ID']>
  /** The deleted user object */
  user?: Maybe<User>
}

/** Input for the deleteVisibleProduct mutation */
export type DeleteVisibleProductInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the visibleProduct to delete */
  id: Scalars['ID']
}

/** The payload for the deleteVisibleProduct mutation */
export type DeleteVisibleProductPayload = {
  __typename?: 'DeleteVisibleProductPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the deleted object */
  deletedId?: Maybe<Scalars['ID']>
  /** The deteted term object */
  visibleProduct?: Maybe<VisibleProduct>
}

/** Coupon discount type enumeration */
export enum DiscountTypeEnum {
  /** Fixed cart discount */
  FixedCart = 'FIXED_CART',
  /** Fixed product discount */
  FixedProduct = 'FIXED_PRODUCT',
  /** Percentage discount */
  Percent = 'PERCENT',
}

/** The discussion setting type */
export type DiscussionSettings = {
  __typename?: 'DiscussionSettings'
  /** Allow people to submit comments on new posts. */
  defaultCommentStatus?: Maybe<Scalars['String']>
  /** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
  defaultPingStatus?: Maybe<Scalars['String']>
}

/** A downloadable item */
export type DownloadableItem = {
  __typename?: 'DownloadableItem'
  /** The date the downloadable item expires */
  accessExpires?: Maybe<Scalars['String']>
  /** ProductDownload of the downloadable item */
  download?: Maybe<ProductDownload>
  /** Downloadable item unique identifier */
  downloadId: Scalars['String']
  /** Number of times the item can be downloaded. */
  downloadsRemaining?: Maybe<Scalars['Int']>
  /** Name of the downloadable item. */
  name?: Maybe<Scalars['String']>
  /** Product of downloadable item. */
  product?: Maybe<Product>
  /** Download URL of the downloadable item. */
  url?: Maybe<Scalars['String']>
}

/** Input for the emptyCart mutation */
export type EmptyCartInput = {
  clearPersistentCart?: Maybe<Scalars['Boolean']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** The payload for the emptyCart mutation */
export type EmptyCartPayload = {
  __typename?: 'EmptyCartPayload'
  cart?: Maybe<Cart>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  deletedCart?: Maybe<Cart>
}

/** Asset enqueued by the CMS */
export type EnqueuedAsset = {
  /** @todo */
  args?: Maybe<Scalars['Boolean']>
  /** Dependencies needed to use this asset */
  dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>
  /** Extra information needed for the script */
  extra?: Maybe<Scalars['String']>
  /** The handle of the enqueued asset */
  handle?: Maybe<Scalars['String']>
  /** The ID of the enqueued asset */
  id: Scalars['ID']
  /** The source of the asset */
  src?: Maybe<Scalars['String']>
  /** The version of the enqueued asset */
  version?: Maybe<Scalars['String']>
}

/** Script enqueued by the CMS */
export type EnqueuedScript = Node &
  EnqueuedAsset & {
    __typename?: 'EnqueuedScript'
    /** @todo */
    args?: Maybe<Scalars['Boolean']>
    /** Dependencies needed to use this asset */
    dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>
    /** Extra information needed for the script */
    extra?: Maybe<Scalars['String']>
    /** The handle of the enqueued asset */
    handle?: Maybe<Scalars['String']>
    /** The ID of the enqueued asset */
    id: Scalars['ID']
    /** The source of the asset */
    src?: Maybe<Scalars['String']>
    /** The version of the enqueued asset */
    version?: Maybe<Scalars['String']>
  }

/** Stylesheet enqueued by the CMS */
export type EnqueuedStylesheet = Node &
  EnqueuedAsset & {
    __typename?: 'EnqueuedStylesheet'
    /** @todo */
    args?: Maybe<Scalars['Boolean']>
    /** Dependencies needed to use this asset */
    dependencies?: Maybe<Array<Maybe<EnqueuedScript>>>
    /** Extra information needed for the script */
    extra?: Maybe<Scalars['String']>
    /** The handle of the enqueued asset */
    handle?: Maybe<Scalars['String']>
    /** The ID of the enqueued asset */
    id: Scalars['ID']
    /** The source of the asset */
    src?: Maybe<Scalars['String']>
    /** The version of the enqueued asset */
    version?: Maybe<Scalars['String']>
  }

/** A external product object */
export type ExternalProduct = Node &
  Product &
  NodeWithComments &
  NodeWithContentEditor &
  NodeWithFeaturedImage &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'ExternalProduct'
    /** Connection between the Product type and the ProductAttribute type */
    attributes?: Maybe<ProductToProductAttributeConnection>
    /** Product average count */
    averageRating?: Maybe<Scalars['Float']>
    /** External product Buy button text */
    buttonText?: Maybe<Scalars['String']>
    /** Catalog visibility */
    catalogVisibility?: Maybe<CatalogVisibilityEnum>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** The content of the post. */
    content?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** The ID of the product in the database */
    databaseId: Scalars['Int']
    /** Date product created */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** Date on sale from */
    dateOnSaleFrom?: Maybe<Scalars['String']>
    /** Date on sale to */
    dateOnSaleTo?: Maybe<Scalars['String']>
    /** Connection between the ExternalProduct type and the VariationAttribute type */
    defaultAttributes?: Maybe<ExternalProductToVariationAttributeConnection>
    /** Product description */
    description?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** External product url */
    externalUrl?: Maybe<Scalars['String']>
    /** If the product is featured */
    featured?: Maybe<Scalars['Boolean']>
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>
    /** Connection between the Product type and the MediaItem type */
    galleryImages?: Maybe<ProductToMediaItemConnection>
    /** Connection between the Product type and the GlobalProductAttribute type */
    globalAttributes?: Maybe<ProductToGlobalProductAttributeConnection>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** The globally unique identifier for the product */
    id: Scalars['ID']
    /** Main image */
    image?: Maybe<MediaItem>
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** Connection between the Product type and the LocalProductAttribute type */
    localAttributes?: Maybe<ProductToLocalProductAttributeConnection>
    /** Menu order */
    menuOrder?: Maybe<Scalars['Int']>
    /** Object meta data */
    metaData?: Maybe<Array<Maybe<MetaData>>>
    /** Date product last updated */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /** Product name */
    name?: Maybe<Scalars['String']>
    /** Is product on sale? */
    onSale?: Maybe<Scalars['Boolean']>
    /** Connection between the Product type and the paColor type */
    paColors?: Maybe<ProductToPaColorConnection>
    /** Connection between the Product type and the paSize type */
    paSizes?: Maybe<ProductToPaSizeConnection>
    /** Parent product */
    parent?: Maybe<Product>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** Product&#039;s active price */
    price?: Maybe<Scalars['String']>
    /** Connection between the Product type and the productCategory type */
    productCategories?: Maybe<ProductToProductCategoryConnection>
    /** Connection between the Product type and the productTag type */
    productTags?: Maybe<ProductToProductTagConnection>
    /** Connection between the Product type and the productType type */
    productTypes?: Maybe<ProductToProductTypeConnection>
    /** Can product be purchased? */
    purchasable?: Maybe<Scalars['Boolean']>
    /** Purchase note */
    purchaseNote?: Maybe<Scalars['String']>
    /** Product&#039;s regular price */
    regularPrice?: Maybe<Scalars['String']>
    /** Connection between the Product type and the Product type */
    related?: Maybe<ProductToProductConnection>
    /** Product review count */
    reviewCount?: Maybe<Scalars['Int']>
    /** Connection between the Product type and the Comment type */
    reviews?: Maybe<ProductToCommentConnection>
    /** If reviews are allowed */
    reviewsAllowed?: Maybe<Scalars['Boolean']>
    /** Product&#039;s sale price */
    salePrice?: Maybe<Scalars['String']>
    /** Connection between the Product type and the shippingClass type */
    shippingClasses?: Maybe<ProductToShippingClassConnection>
    /** Product short description */
    shortDescription?: Maybe<Scalars['String']>
    /** Product SKU */
    sku?: Maybe<Scalars['String']>
    /** Product slug */
    slug?: Maybe<Scalars['String']>
    /** Product status */
    status?: Maybe<Scalars['String']>
    /** Tax class */
    taxClass?: Maybe<TaxClassEnum>
    /** Tax status */
    taxStatus?: Maybe<TaxStatusEnum>
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>
    /** Number total of sales */
    totalSales?: Maybe<Scalars['Int']>
    /** Product type */
    type?: Maybe<ProductTypesEnum>
    /** Connection between the Product type and the Product type */
    upsell?: Maybe<ProductToUpsellConnection>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** Connection between the Product type and the visibleProduct type */
    visibleProducts?: Maybe<ProductToVisibleProductConnection>
  }

/** A external product object */
export type ExternalProductAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductAttributeConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A external product object */
export type ExternalProductDefaultAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A external product object */
export type ExternalProductDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A external product object */
export type ExternalProductEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A external product object */
export type ExternalProductEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A external product object */
export type ExternalProductGalleryImagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToMediaItemConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductGlobalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToGlobalProductAttributeConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductLocalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToLocalProductAttributeConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A external product object */
export type ExternalProductPaColorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaColorConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductPaSizesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaSizeConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A external product object */
export type ExternalProductProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductCategoryConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductProductTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTagConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductProductTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTypeConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductRegularPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A external product object */
export type ExternalProductRelatedArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductReviewsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToCommentConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductSalePriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A external product object */
export type ExternalProductShippingClassesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToShippingClassConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductShortDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A external product object */
export type ExternalProductUpsellArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToUpsellConnectionWhereArgs>
}

/** A external product object */
export type ExternalProductVisibleProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToVisibleProductConnectionWhereArgs>
}

/** Connection between the ExternalProduct type and the VariationAttribute type */
export type ExternalProductToVariationAttributeConnection = {
  __typename?: 'ExternalProductToVariationAttributeConnection'
  /** Edges for the ExternalProductToVariationAttributeConnection connection */
  edges?: Maybe<Array<Maybe<ExternalProductToVariationAttributeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VariationAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ExternalProductToVariationAttributeConnectionEdge = {
  __typename?: 'ExternalProductToVariationAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VariationAttribute>
}

/** a fee line object */
export type FeeLine = {
  __typename?: 'FeeLine'
  /** Fee amount */
  amount?: Maybe<Scalars['String']>
  /** The ID of the order item in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** Fee name */
  name?: Maybe<Scalars['String']>
  /** The Id of the order the order item belongs to. */
  orderId?: Maybe<Scalars['Int']>
  /** Line tax class */
  taxClass?: Maybe<TaxClassEnum>
  /** Tax status of fee */
  taxStatus?: Maybe<TaxStatusEnum>
  /** Line taxes */
  taxes?: Maybe<Array<Maybe<OrderItemTax>>>
  /** Line total (after discounts) */
  total?: Maybe<Scalars['String']>
  /** Line total tax (after discounts) */
  totalTax?: Maybe<Scalars['String']>
}

/** a fee line object */
export type FeeLineMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** Fee line data. */
export type FeeLineInput = {
  /** Fee amount. */
  amount?: Maybe<Scalars['String']>
  /** Fee Line ID */
  id?: Maybe<Scalars['ID']>
  /** Fee name. */
  name?: Maybe<Scalars['String']>
  /** Tax class of fee. */
  taxClass?: Maybe<TaxClassEnum>
  /** Tax status of fee. */
  taxStatus?: Maybe<TaxStatusEnum>
  /** Line total (after discounts). */
  total?: Maybe<Scalars['String']>
}

/** Input for the fillCart mutation */
export type FillCartInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Coupons to be applied to the cart */
  coupons?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Cart items to be added */
  items?: Maybe<Array<Maybe<CartItemInput>>>
  /** Shipping methods to be used. */
  shippingMethods?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The payload for the fillCart mutation */
export type FillCartPayload = {
  __typename?: 'FillCartPayload'
  added?: Maybe<Array<Maybe<CartItem>>>
  applied?: Maybe<Array<Maybe<AppliedCoupon>>>
  cart?: Maybe<Cart>
  cartErrors?: Maybe<Array<Maybe<CartError>>>
  chosenShippingMethods?: Maybe<Array<Maybe<Scalars['String']>>>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** The general setting type */
export type GeneralSettings = {
  __typename?: 'GeneralSettings'
  /** A date format for all date strings. */
  dateFormat?: Maybe<Scalars['String']>
  /** Site tagline. */
  description?: Maybe<Scalars['String']>
  /** This address is used for admin purposes, like new user notification. */
  email?: Maybe<Scalars['String']>
  /** WordPress locale code. */
  language?: Maybe<Scalars['String']>
  /** A day number of the week that the week should start on. */
  startOfWeek?: Maybe<Scalars['Int']>
  /** A time format for all time strings. */
  timeFormat?: Maybe<Scalars['String']>
  /** A city in the same timezone as you. */
  timezone?: Maybe<Scalars['String']>
  /** Site title. */
  title?: Maybe<Scalars['String']>
  /** Site URL. */
  url?: Maybe<Scalars['String']>
}

/** A product attribute object */
export type GlobalProductAttribute = ProductAttribute & {
  __typename?: 'GlobalProductAttribute'
  /** Attribute ID */
  attributeId: Scalars['Int']
  /** Attribute Global ID */
  id: Scalars['ID']
  /** Attribute label */
  label: Scalars['String']
  /** Product attribute name */
  name: Scalars['String']
  /** Attribute options */
  options?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Attribute position */
  position: Scalars['Int']
  /** Product attribute scope. */
  scope: ProductAttributeTypesEnum
  /** Product attribute slug */
  slug: Scalars['String']
  /** Connection between the GlobalProductAttribute type and the TermNode type */
  terms?: Maybe<GlobalProductAttributeToTermNodeConnection>
  /** Is attribute on product variation */
  variation: Scalars['Boolean']
  /** Is attribute visible */
  visible: Scalars['Boolean']
}

/** A product attribute object */
export type GlobalProductAttributeTermsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<GlobalProductAttributeToTermNodeConnectionWhereArgs>
}

/** Connection between the GlobalProductAttribute type and the TermNode type */
export type GlobalProductAttributeToTermNodeConnection = {
  __typename?: 'GlobalProductAttributeToTermNodeConnection'
  /** Edges for the GlobalProductAttributeToTermNodeConnection connection */
  edges?: Maybe<Array<Maybe<GlobalProductAttributeToTermNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<TermNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type GlobalProductAttributeToTermNodeConnectionEdge = {
  __typename?: 'GlobalProductAttributeToTermNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<TermNode>
}

/** Arguments for filtering the GlobalProductAttributeToTermNodeConnection connection */
export type GlobalProductAttributeToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** A group product object */
export type GroupProduct = Node &
  Product &
  NodeWithComments &
  NodeWithContentEditor &
  NodeWithFeaturedImage &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'GroupProduct'
    /** Product&#039;s add to cart button text description */
    addToCartDescription?: Maybe<Scalars['String']>
    /** Product&#039;s add to cart button text description */
    addToCartText?: Maybe<Scalars['String']>
    /** Connection between the Product type and the ProductAttribute type */
    attributes?: Maybe<ProductToProductAttributeConnection>
    /** Product average count */
    averageRating?: Maybe<Scalars['Float']>
    /** Catalog visibility */
    catalogVisibility?: Maybe<CatalogVisibilityEnum>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** The content of the post. */
    content?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** The ID of the product in the database */
    databaseId: Scalars['Int']
    /** Date product created */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** Date on sale from */
    dateOnSaleFrom?: Maybe<Scalars['String']>
    /** Date on sale to */
    dateOnSaleTo?: Maybe<Scalars['String']>
    /** Connection between the GroupProduct type and the VariationAttribute type */
    defaultAttributes?: Maybe<GroupProductToVariationAttributeConnection>
    /** Product description */
    description?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** If the product is featured */
    featured?: Maybe<Scalars['Boolean']>
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>
    /** Connection between the Product type and the MediaItem type */
    galleryImages?: Maybe<ProductToMediaItemConnection>
    /** Connection between the Product type and the GlobalProductAttribute type */
    globalAttributes?: Maybe<ProductToGlobalProductAttributeConnection>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** The globally unique identifier for the product */
    id: Scalars['ID']
    /** Main image */
    image?: Maybe<MediaItem>
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** Connection between the Product type and the LocalProductAttribute type */
    localAttributes?: Maybe<ProductToLocalProductAttributeConnection>
    /** Menu order */
    menuOrder?: Maybe<Scalars['Int']>
    /** Object meta data */
    metaData?: Maybe<Array<Maybe<MetaData>>>
    /** Date product last updated */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /** Product name */
    name?: Maybe<Scalars['String']>
    /** Is product on sale? */
    onSale?: Maybe<Scalars['Boolean']>
    /** Connection between the Product type and the paColor type */
    paColors?: Maybe<ProductToPaColorConnection>
    /** Connection between the Product type and the paSize type */
    paSizes?: Maybe<ProductToPaSizeConnection>
    /** Parent product */
    parent?: Maybe<Product>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** Products&#039; price range */
    price?: Maybe<Scalars['String']>
    /** Connection between the Product type and the productCategory type */
    productCategories?: Maybe<ProductToProductCategoryConnection>
    /** Connection between the Product type and the productTag type */
    productTags?: Maybe<ProductToProductTagConnection>
    /** Connection between the Product type and the productType type */
    productTypes?: Maybe<ProductToProductTypeConnection>
    /** Connection between the GroupProduct type and the Product type */
    products?: Maybe<GroupProductToProductConnection>
    /** Can product be purchased? */
    purchasable?: Maybe<Scalars['Boolean']>
    /** Purchase note */
    purchaseNote?: Maybe<Scalars['String']>
    /** Connection between the Product type and the Product type */
    related?: Maybe<ProductToProductConnection>
    /** Product review count */
    reviewCount?: Maybe<Scalars['Int']>
    /** Connection between the Product type and the Comment type */
    reviews?: Maybe<ProductToCommentConnection>
    /** If reviews are allowed */
    reviewsAllowed?: Maybe<Scalars['Boolean']>
    /** Connection between the Product type and the shippingClass type */
    shippingClasses?: Maybe<ProductToShippingClassConnection>
    /** Product short description */
    shortDescription?: Maybe<Scalars['String']>
    /** Product SKU */
    sku?: Maybe<Scalars['String']>
    /** Product slug */
    slug?: Maybe<Scalars['String']>
    /** Product status */
    status?: Maybe<Scalars['String']>
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>
    /** Number total of sales */
    totalSales?: Maybe<Scalars['Int']>
    /** Product type */
    type?: Maybe<ProductTypesEnum>
    /** Connection between the Product type and the Product type */
    upsell?: Maybe<ProductToUpsellConnection>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** Connection between the Product type and the visibleProduct type */
    visibleProducts?: Maybe<ProductToVisibleProductConnection>
  }

/** A group product object */
export type GroupProductAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductAttributeConnectionWhereArgs>
}

/** A group product object */
export type GroupProductContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A group product object */
export type GroupProductDefaultAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A group product object */
export type GroupProductDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A group product object */
export type GroupProductEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A group product object */
export type GroupProductEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A group product object */
export type GroupProductGalleryImagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToMediaItemConnectionWhereArgs>
}

/** A group product object */
export type GroupProductGlobalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToGlobalProductAttributeConnectionWhereArgs>
}

/** A group product object */
export type GroupProductLocalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToLocalProductAttributeConnectionWhereArgs>
}

/** A group product object */
export type GroupProductMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A group product object */
export type GroupProductPaColorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaColorConnectionWhereArgs>
}

/** A group product object */
export type GroupProductPaSizesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaSizeConnectionWhereArgs>
}

/** A group product object */
export type GroupProductProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductCategoryConnectionWhereArgs>
}

/** A group product object */
export type GroupProductProductTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTagConnectionWhereArgs>
}

/** A group product object */
export type GroupProductProductTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTypeConnectionWhereArgs>
}

/** A group product object */
export type GroupProductProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<GroupProductToProductConnectionWhereArgs>
}

/** A group product object */
export type GroupProductRelatedArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductConnectionWhereArgs>
}

/** A group product object */
export type GroupProductReviewsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToCommentConnectionWhereArgs>
}

/** A group product object */
export type GroupProductShippingClassesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToShippingClassConnectionWhereArgs>
}

/** A group product object */
export type GroupProductShortDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A group product object */
export type GroupProductUpsellArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToUpsellConnectionWhereArgs>
}

/** A group product object */
export type GroupProductVisibleProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToVisibleProductConnectionWhereArgs>
}

/** Connection between the GroupProduct type and the Product type */
export type GroupProductToProductConnection = {
  __typename?: 'GroupProductToProductConnection'
  /** Edges for the GroupProductToProductConnection connection */
  edges?: Maybe<Array<Maybe<GroupProductToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type GroupProductToProductConnectionEdge = {
  __typename?: 'GroupProductToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the GroupProductToProductConnection connection */
export type GroupProductToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the GroupProduct type and the VariationAttribute type */
export type GroupProductToVariationAttributeConnection = {
  __typename?: 'GroupProductToVariationAttributeConnection'
  /** Edges for the GroupProductToVariationAttributeConnection connection */
  edges?: Maybe<Array<Maybe<GroupProductToVariationAttributeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VariationAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type GroupProductToVariationAttributeConnectionEdge = {
  __typename?: 'GroupProductToVariationAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VariationAttribute>
}

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNode = {
  /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
  ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>
  /** Connection between the HierarchicalContentNode type and the ContentNode type */
  children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>
  /** The parent of the node. The parent object can be of various types */
  parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>
  /** Database id of the parent node */
  parentDatabaseId?: Maybe<Scalars['Int']>
  /** The globally unique identifier of the parent node. */
  parentId?: Maybe<Scalars['ID']>
}

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeAncestorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>
}

/** Content node with hierarchical (parent/child) relationships */
export type HierarchicalContentNodeChildrenArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>
}

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToContentNodeAncestorsConnection = {
  __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnection'
  /** Edges for the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
  edges?: Maybe<
    Array<Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionEdge>>
  >
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionEdge = {
  __typename?: 'HierarchicalContentNodeToContentNodeAncestorsConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToContentNodeChildrenConnection = {
  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnection'
  /** Edges for the HierarchicalContentNodeToContentNodeChildrenConnection connection */
  edges?: Maybe<
    Array<Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionEdge>>
  >
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type HierarchicalContentNodeToContentNodeChildrenConnectionEdge = {
  __typename?: 'HierarchicalContentNodeToContentNodeChildrenConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the HierarchicalContentNodeToContentNodeChildrenConnection connection */
export type HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the HierarchicalContentNode type and the ContentNode type */
export type HierarchicalContentNodeToParentContentNodeConnectionEdge = {
  __typename?: 'HierarchicalContentNodeToParentContentNodeConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<ContentNode>
}

/** Term node with hierarchical (parent/child) relationships */
export type HierarchicalTermNode = {
  /** Database id of the parent node */
  parentDatabaseId?: Maybe<Scalars['Int']>
  /** The globally unique identifier of the parent node. */
  parentId?: Maybe<Scalars['ID']>
}

/** a line item object */
export type LineItem = {
  __typename?: 'LineItem'
  /** The ID of the order item in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** Line item&#039;s taxes */
  itemDownloads?: Maybe<Array<Maybe<ProductDownload>>>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** The Id of the order the order item belongs to. */
  orderId?: Maybe<Scalars['Int']>
  /** Line item&#039;s product object */
  product?: Maybe<Product>
  /** Line item&#039;s product ID */
  productId?: Maybe<Scalars['Int']>
  /** Line item&#039;s product quantity */
  quantity?: Maybe<Scalars['Int']>
  /** Line item&#039;s subtotal */
  subtotal?: Maybe<Scalars['String']>
  /** Line item&#039;s subtotal tax */
  subtotalTax?: Maybe<Scalars['String']>
  /** Line item&#039;s tax class */
  taxClass?: Maybe<TaxClassEnum>
  /** Line item&#039;s taxes */
  taxStatus?: Maybe<TaxStatusEnum>
  /** Line item&#039;s taxes */
  taxes?: Maybe<Array<Maybe<OrderItemTax>>>
  /** Line item&#039;s total */
  total?: Maybe<Scalars['String']>
  /** Line item&#039;s total tax */
  totalTax?: Maybe<Scalars['String']>
  /** Line item&#039;s product variation object */
  variation?: Maybe<ProductVariation>
  /** Line item&#039;s product variation ID */
  variationId?: Maybe<Scalars['Int']>
}

/** a line item object */
export type LineItemMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** Meta data. */
export type LineItemInput = {
  /** Line Item ID */
  id?: Maybe<Scalars['ID']>
  /** Meta data. */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** Line name */
  name?: Maybe<Scalars['String']>
  /** Product ID. */
  productId?: Maybe<Scalars['Int']>
  /** Quantity ordered. */
  quantity?: Maybe<Scalars['Int']>
  /** Product SKU. */
  sku?: Maybe<Scalars['String']>
  /** Line subtotal (before discounts). */
  subtotal?: Maybe<Scalars['String']>
  /** Tax class of product. */
  taxClass?: Maybe<TaxClassEnum>
  /** Line total (after discounts). */
  total?: Maybe<Scalars['String']>
  /** Variation ID, if applicable. */
  variationId?: Maybe<Scalars['Int']>
}

/** A product attribute object */
export type LocalProductAttribute = ProductAttribute & {
  __typename?: 'LocalProductAttribute'
  /** Attribute ID */
  attributeId: Scalars['Int']
  /** Attribute Global ID */
  id: Scalars['ID']
  /** Attribute label */
  label: Scalars['String']
  /** Attribute name */
  name: Scalars['String']
  /** Attribute options */
  options?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Attribute position */
  position: Scalars['Int']
  /** Product attribute scope. */
  scope: ProductAttributeTypesEnum
  /** Is attribute on product variation */
  variation: Scalars['Boolean']
  /** Is attribute visible */
  visible: Scalars['Boolean']
}

/** Input for the login mutation */
export type LoginInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The plain-text password for the user logging in. */
  password: Scalars['String']
  /** The username used for login. Typically a unique or email address depending on specific configuration */
  username: Scalars['String']
}

/** The payload for the login mutation */
export type LoginPayload = {
  __typename?: 'LoginPayload'
  /** JWT Token that can be used in future requests for Authentication */
  authToken?: Maybe<Scalars['String']>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Customer object of authenticated user. */
  customer?: Maybe<Customer>
  /** A JWT token that can be used in future requests to get a refreshed jwtAuthToken. If the refresh token used in a request is revoked or otherwise invalid, a valid Auth token will NOT be issued in the response headers. */
  refreshToken?: Maybe<Scalars['String']>
  /** A JWT token that can be used in future requests to for WooCommerce session identification */
  sessionToken?: Maybe<Scalars['String']>
  /** The user that was logged in */
  user?: Maybe<User>
}

/** Product manage stock enumeration */
export enum ManageStockEnum {
  False = 'FALSE',
  Parent = 'PARENT',
  True = 'TRUE',
}

/** File details for a Media Item */
export type MediaDetails = {
  __typename?: 'MediaDetails'
  /** The filename of the mediaItem */
  file?: Maybe<Scalars['String']>
  /** The height of the mediaItem */
  height?: Maybe<Scalars['Int']>
  /** Meta information associated with the mediaItem */
  meta?: Maybe<MediaItemMeta>
  /** The available sizes of the mediaItem */
  sizes?: Maybe<Array<Maybe<MediaSize>>>
  /** The width of the mediaItem */
  width?: Maybe<Scalars['Int']>
}

/** The mediaItem type */
export type MediaItem = Node &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier &
  NodeWithTemplate &
  NodeWithTitle &
  NodeWithAuthor &
  NodeWithComments &
  HierarchicalContentNode & {
    __typename?: 'MediaItem'
    /** Alternative text to display when resource is not displayed */
    altText?: Maybe<Scalars['String']>
    /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']>
    /** The caption for the resource */
    caption?: Maybe<Scalars['String']>
    /** Connection between the HierarchicalContentNode type and the ContentNode type */
    children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** Connection between the mediaItem type and the Comment type */
    comments?: Maybe<MediaItemToCommentConnection>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** Post publishing date. */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** Description of the image (stored as post_content) */
    description?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** The filesize in bytes of the resource */
    fileSize?: Maybe<Scalars['Int']>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** The globally unique identifier of the attachment object. */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** Details about the mediaItem */
    mediaDetails?: Maybe<MediaDetails>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    mediaItemId: Scalars['Int']
    /** Url of the mediaItem */
    mediaItemUrl?: Maybe<Scalars['String']>
    /** Type of resource */
    mediaType?: Maybe<Scalars['String']>
    /** The mime type of the mediaItem */
    mimeType?: Maybe<Scalars['String']>
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /** The parent of the node. The parent object can be of various types */
    parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** The sizes attribute value for an image. */
    sizes?: Maybe<Scalars['String']>
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']>
    /** Url of the mediaItem */
    sourceUrl?: Maybe<Scalars['String']>
    /** The srcset attribute specifies the URL of the image to use in different situations. It is a comma separated string of urls and their widths. */
    srcSet?: Maybe<Scalars['String']>
    /** The current status of the object */
    status?: Maybe<Scalars['String']>
    /** The template assigned to the node */
    template?: Maybe<ContentTemplate>
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The mediaItem type */
export type MediaItemAncestorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>
}

/** The mediaItem type */
export type MediaItemCaptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** The mediaItem type */
export type MediaItemChildrenArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>
}

/** The mediaItem type */
export type MediaItemCommentsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<MediaItemToCommentConnectionWhereArgs>
}

/** The mediaItem type */
export type MediaItemDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** The mediaItem type */
export type MediaItemEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The mediaItem type */
export type MediaItemEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The mediaItem type */
export type MediaItemFileSizeArgs = {
  size?: Maybe<MediaItemSizeEnum>
}

/** The mediaItem type */
export type MediaItemSizesArgs = {
  size?: Maybe<MediaItemSizeEnum>
}

/** The mediaItem type */
export type MediaItemSourceUrlArgs = {
  size?: Maybe<MediaItemSizeEnum>
}

/** The mediaItem type */
export type MediaItemSrcSetArgs = {
  size?: Maybe<MediaItemSizeEnum>
}

/** The mediaItem type */
export type MediaItemTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum MediaItemIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a media item by its source url */
  SourceUrl = 'SOURCE_URL',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Meta connected to a MediaItem */
export type MediaItemMeta = {
  __typename?: 'MediaItemMeta'
  /** Aperture measurement of the media item. */
  aperture?: Maybe<Scalars['Float']>
  /** Information about the camera used to create the media item. */
  camera?: Maybe<Scalars['String']>
  /** The text string description associated with the media item. */
  caption?: Maybe<Scalars['String']>
  /** Copyright information associated with the media item. */
  copyright?: Maybe<Scalars['String']>
  /** The date/time when the media was created. */
  createdTimestamp?: Maybe<Scalars['Int']>
  /** The original creator of the media item. */
  credit?: Maybe<Scalars['String']>
  /** The focal length value of the media item. */
  focalLength?: Maybe<Scalars['Float']>
  /** The ISO (International Organization for Standardization) value of the media item. */
  iso?: Maybe<Scalars['Int']>
  /** List of keywords used to describe or identfy the media item. */
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>
  /** The vertical or horizontal aspect of the media item. */
  orientation?: Maybe<Scalars['String']>
  /** The shutter speed information of the media item. */
  shutterSpeed?: Maybe<Scalars['Float']>
  /** A useful title for the media item. */
  title?: Maybe<Scalars['String']>
}

/** The size of the media item object. */
export enum MediaItemSizeEnum {
  /** MediaItem with the large size */
  Large = 'LARGE',
  /** MediaItem with the medium size */
  Medium = 'MEDIUM',
  /** MediaItem with the medium_large size */
  MediumLarge = 'MEDIUM_LARGE',
  /** MediaItem with the shop_catalog size */
  ShopCatalog = 'SHOP_CATALOG',
  /** MediaItem with the shop_single size */
  ShopSingle = 'SHOP_SINGLE',
  /** MediaItem with the shop_thumbnail size */
  ShopThumbnail = 'SHOP_THUMBNAIL',
  /** MediaItem with the thumbnail size */
  Thumbnail = 'THUMBNAIL',
  /** MediaItem with the woocommerce_gallery_thumbnail size */
  WoocommerceGalleryThumbnail = 'WOOCOMMERCE_GALLERY_THUMBNAIL',
  /** MediaItem with the woocommerce_single size */
  WoocommerceSingle = 'WOOCOMMERCE_SINGLE',
  /** MediaItem with the woocommerce_thumbnail size */
  WoocommerceThumbnail = 'WOOCOMMERCE_THUMBNAIL',
  /** MediaItem with the 1536x1536 size */
  '1536X1536' = '_1536X1536',
  /** MediaItem with the 2048x2048 size */
  '2048X2048' = '_2048X2048',
}

/** The status of the media item object. */
export enum MediaItemStatusEnum {
  /** Objects with the auto-draft status */
  AutoDraft = 'AUTO_DRAFT',
  /** Objects with the inherit status */
  Inherit = 'INHERIT',
  /** Objects with the private status */
  Private = 'PRIVATE',
  /** Objects with the trash status */
  Trash = 'TRASH',
}

/** Connection between the mediaItem type and the Comment type */
export type MediaItemToCommentConnection = {
  __typename?: 'MediaItemToCommentConnection'
  /** Edges for the MediaItemToCommentConnection connection */
  edges?: Maybe<Array<Maybe<MediaItemToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type MediaItemToCommentConnectionEdge = {
  __typename?: 'MediaItemToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
}

/** Arguments for filtering the MediaItemToCommentConnection connection */
export type MediaItemToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Details of an available size for a media item */
export type MediaSize = {
  __typename?: 'MediaSize'
  /** The filename of the referenced size */
  file?: Maybe<Scalars['String']>
  /** The filesize of the resource */
  fileSize?: Maybe<Scalars['Int']>
  /** The height of the referenced size */
  height?: Maybe<Scalars['String']>
  /** The mime type of the referenced size */
  mimeType?: Maybe<Scalars['String']>
  /** The referenced size name */
  name?: Maybe<Scalars['String']>
  /** The url of the referenced size */
  sourceUrl?: Maybe<Scalars['String']>
  /** The width of the referenced size */
  width?: Maybe<Scalars['String']>
}

/** Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme. */
export type Menu = Node &
  DatabaseIdentifier & {
    __typename?: 'Menu'
    /** The number of items in the menu */
    count?: Maybe<Scalars['Int']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** The globally unique identifier of the nav menu object. */
    id: Scalars['ID']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** The locations a menu is assigned to */
    locations?: Maybe<Array<Maybe<MenuLocationEnum>>>
    /**
     * WP ID of the nav menu.
     * @deprecated Deprecated in favor of the databaseId field
     */
    menuId?: Maybe<Scalars['Int']>
    /** Connection between the Menu type and the MenuItem type */
    menuItems?: Maybe<MenuToMenuItemConnection>
    /** Display name of the menu. Equivalent to WP_Term-&gt;name. */
    name?: Maybe<Scalars['String']>
    /** The url friendly name of the menu. Equivalent to WP_Term-&gt;slug */
    slug?: Maybe<Scalars['String']>
  }

/** Menus are the containers for navigation items. Menus can be assigned to menu locations, which are typically registered by the active theme. */
export type MenuMenuItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<MenuToMenuItemConnectionWhereArgs>
}

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItem = Node &
  DatabaseIdentifier & {
    __typename?: 'MenuItem'
    /** Connection between the MenuItem type and the MenuItem type */
    childItems?: Maybe<MenuItemToMenuItemConnection>
    /** Connection from MenuItem to it&#039;s connected node */
    connectedNode?: Maybe<MenuItemToMenuItemLinkableConnectionEdge>
    /**
     * The object connected to this menu item.
     * @deprecated Deprecated in favor of the connectedNode field
     */
    connectedObject?: Maybe<MenuItemObjectUnion>
    /** Class attribute for the menu item link */
    cssClasses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** Description of the menu item. */
    description?: Maybe<Scalars['String']>
    /** The globally unique identifier of the nav menu item object. */
    id: Scalars['ID']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Label or title of the menu item. */
    label?: Maybe<Scalars['String']>
    /** Link relationship (XFN) of the menu item. */
    linkRelationship?: Maybe<Scalars['String']>
    /** The locations the menu item&#039;s Menu is assigned to */
    locations?: Maybe<Array<Maybe<MenuLocationEnum>>>
    /** The Menu a MenuItem is part of */
    menu?: Maybe<MenuItemToMenuConnectionEdge>
    /**
     * WP ID of the menu item.
     * @deprecated Deprecated in favor of the databaseId field
     */
    menuItemId?: Maybe<Scalars['Int']>
    /** Menu item order */
    order?: Maybe<Scalars['Int']>
    /** The database id of the parent menu item or null if it is the root */
    parentDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the parent nav menu item object. */
    parentId?: Maybe<Scalars['ID']>
    /** Path for the resource. Relative path for internal resources. Absolute path for external resources. */
    path?: Maybe<Scalars['String']>
    /** Target attribute for the menu item link. */
    target?: Maybe<Scalars['String']>
    /** Title attribute for the menu item link */
    title?: Maybe<Scalars['String']>
    /** URL or destination of the menu item. */
    url?: Maybe<Scalars['String']>
  }

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItemChildItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<MenuItemToMenuItemConnectionWhereArgs>
}

/** Nodes that can be linked to as Menu Items */
export type MenuItemLinkable = {
  /** The unique resource identifier path */
  databaseId: Scalars['Int']
  /** The unique resource identifier path */
  id: Scalars['ID']
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuItemNodeIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** Deprecated in favor of MenuItemLinkeable Interface */
export type MenuItemObjectUnion =
  | Post
  | Page
  | Category
  | Tag
  | ProductCategory
  | ProductTag

/** Connection between the MenuItem type and the Menu type */
export type MenuItemToMenuConnectionEdge = {
  __typename?: 'MenuItemToMenuConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Menu>
}

/** Connection between the MenuItem type and the MenuItem type */
export type MenuItemToMenuItemConnection = {
  __typename?: 'MenuItemToMenuItemConnection'
  /** Edges for the MenuItemToMenuItemConnection connection */
  edges?: Maybe<Array<Maybe<MenuItemToMenuItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MenuItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type MenuItemToMenuItemConnectionEdge = {
  __typename?: 'MenuItemToMenuItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<MenuItem>
}

/** Arguments for filtering the MenuItemToMenuItemConnection connection */
export type MenuItemToMenuItemConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>
  /** The database ID of the parent menu object */
  parentDatabaseId?: Maybe<Scalars['Int']>
  /** The ID of the parent menu object */
  parentId?: Maybe<Scalars['ID']>
}

/** Connection between the MenuItem type and the MenuItemLinkable type */
export type MenuItemToMenuItemLinkableConnectionEdge = {
  __typename?: 'MenuItemToMenuItemLinkableConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<MenuItemLinkable>
}

/** Registered menu locations */
export enum MenuLocationEnum {
  /** Empty menu location */
  Empty = 'EMPTY',
}

/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
export enum MenuNodeIdTypeEnum {
  /** Identify a menu node by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a menu node by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a menu node by it's name */
  Name = 'NAME',
}

/** Connection between the Menu type and the MenuItem type */
export type MenuToMenuItemConnection = {
  __typename?: 'MenuToMenuItemConnection'
  /** Edges for the MenuToMenuItemConnection connection */
  edges?: Maybe<Array<Maybe<MenuToMenuItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MenuItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type MenuToMenuItemConnectionEdge = {
  __typename?: 'MenuToMenuItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<MenuItem>
}

/** Arguments for filtering the MenuToMenuItemConnection connection */
export type MenuToMenuItemConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>
  /** The database ID of the parent menu object */
  parentDatabaseId?: Maybe<Scalars['Int']>
  /** The ID of the parent menu object */
  parentId?: Maybe<Scalars['ID']>
}

/** Extra data defined on the WC object */
export type MetaData = {
  __typename?: 'MetaData'
  /** Meta ID. */
  id?: Maybe<Scalars['ID']>
  /** Meta key. */
  key: Scalars['String']
  /** Meta value. */
  value?: Maybe<Scalars['String']>
}

/** Meta data. */
export type MetaDataInput = {
  /** Meta key. */
  key: Scalars['String']
  /** Meta value. */
  value: Scalars['String']
}

/** The MimeType of the object */
export enum MimeTypeEnum {
  /** MimeType application/java */
  ApplicationJava = 'APPLICATION_JAVA',
  /** MimeType application/msword */
  ApplicationMsword = 'APPLICATION_MSWORD',
  /** MimeType application/octet-stream */
  ApplicationOctetStream = 'APPLICATION_OCTET_STREAM',
  /** MimeType application/onenote */
  ApplicationOnenote = 'APPLICATION_ONENOTE',
  /** MimeType application/oxps */
  ApplicationOxps = 'APPLICATION_OXPS',
  /** MimeType application/pdf */
  ApplicationPdf = 'APPLICATION_PDF',
  /** MimeType application/rar */
  ApplicationRar = 'APPLICATION_RAR',
  /** MimeType application/rtf */
  ApplicationRtf = 'APPLICATION_RTF',
  /** MimeType application/ttaf+xml */
  ApplicationTtafXml = 'APPLICATION_TTAF_XML',
  /** MimeType application/vnd.apple.keynote */
  ApplicationVndAppleKeynote = 'APPLICATION_VND_APPLE_KEYNOTE',
  /** MimeType application/vnd.apple.numbers */
  ApplicationVndAppleNumbers = 'APPLICATION_VND_APPLE_NUMBERS',
  /** MimeType application/vnd.apple.pages */
  ApplicationVndApplePages = 'APPLICATION_VND_APPLE_PAGES',
  /** MimeType application/vnd.ms-access */
  ApplicationVndMsAccess = 'APPLICATION_VND_MS_ACCESS',
  /** MimeType application/vnd.ms-excel */
  ApplicationVndMsExcel = 'APPLICATION_VND_MS_EXCEL',
  /** MimeType application/vnd.ms-excel.addin.macroEnabled.12 */
  ApplicationVndMsExcelAddinMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12',
  /** MimeType application/vnd.ms-excel.sheet.binary.macroEnabled.12 */
  ApplicationVndMsExcelSheetBinaryMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12',
  /** MimeType application/vnd.ms-excel.sheet.macroEnabled.12 */
  ApplicationVndMsExcelSheetMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12',
  /** MimeType application/vnd.ms-excel.template.macroEnabled.12 */
  ApplicationVndMsExcelTemplateMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint */
  ApplicationVndMsPowerpoint = 'APPLICATION_VND_MS_POWERPOINT',
  /** MimeType application/vnd.ms-powerpoint.addin.macroEnabled.12 */
  ApplicationVndMsPowerpointAddinMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.presentation.macroEnabled.12 */
  ApplicationVndMsPowerpointPresentationMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.slideshow.macroEnabled.12 */
  ApplicationVndMsPowerpointSlideshowMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.slide.macroEnabled.12 */
  ApplicationVndMsPowerpointSlideMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12',
  /** MimeType application/vnd.ms-powerpoint.template.macroEnabled.12 */
  ApplicationVndMsPowerpointTemplateMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12',
  /** MimeType application/vnd.ms-project */
  ApplicationVndMsProject = 'APPLICATION_VND_MS_PROJECT',
  /** MimeType application/vnd.ms-word.document.macroEnabled.12 */
  ApplicationVndMsWordDocumentMacroenabled_12 = 'APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12',
  /** MimeType application/vnd.ms-word.template.macroEnabled.12 */
  ApplicationVndMsWordTemplateMacroenabled_12 = 'APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12',
  /** MimeType application/vnd.ms-write */
  ApplicationVndMsWrite = 'APPLICATION_VND_MS_WRITE',
  /** MimeType application/vnd.ms-xpsdocument */
  ApplicationVndMsXpsdocument = 'APPLICATION_VND_MS_XPSDOCUMENT',
  /** MimeType application/vnd.oasis.opendocument.chart */
  ApplicationVndOasisOpendocumentChart = 'APPLICATION_VND_OASIS_OPENDOCUMENT_CHART',
  /** MimeType application/vnd.oasis.opendocument.database */
  ApplicationVndOasisOpendocumentDatabase = 'APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE',
  /** MimeType application/vnd.oasis.opendocument.formula */
  ApplicationVndOasisOpendocumentFormula = 'APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA',
  /** MimeType application/vnd.oasis.opendocument.graphics */
  ApplicationVndOasisOpendocumentGraphics = 'APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS',
  /** MimeType application/vnd.oasis.opendocument.presentation */
  ApplicationVndOasisOpendocumentPresentation = 'APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION',
  /** MimeType application/vnd.oasis.opendocument.spreadsheet */
  ApplicationVndOasisOpendocumentSpreadsheet = 'APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET',
  /** MimeType application/vnd.oasis.opendocument.text */
  ApplicationVndOasisOpendocumentText = 'APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.presentation */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlPresentation = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slide */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlide = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slideshow */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlideshow = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW',
  /** MimeType application/vnd.openxmlformats-officedocument.presentationml.template */
  ApplicationVndOpenxmlformatsOfficedocumentPresentationmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE',
  /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.sheet */
  ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET',
  /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.template */
  ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE',
  /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.document */
  ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT',
  /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.template */
  ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE',
  /** MimeType application/wordperfect */
  ApplicationWordperfect = 'APPLICATION_WORDPERFECT',
  /** MimeType application/x-7z-compressed */
  ApplicationX_7ZCompressed = 'APPLICATION_X_7Z_COMPRESSED',
  /** MimeType application/x-gzip */
  ApplicationXGzip = 'APPLICATION_X_GZIP',
  /** MimeType application/x-tar */
  ApplicationXTar = 'APPLICATION_X_TAR',
  /** MimeType application/zip */
  ApplicationZip = 'APPLICATION_ZIP',
  /** MimeType audio/aac */
  AudioAac = 'AUDIO_AAC',
  /** MimeType audio/flac */
  AudioFlac = 'AUDIO_FLAC',
  /** MimeType audio/midi */
  AudioMidi = 'AUDIO_MIDI',
  /** MimeType audio/mpeg */
  AudioMpeg = 'AUDIO_MPEG',
  /** MimeType audio/ogg */
  AudioOgg = 'AUDIO_OGG',
  /** MimeType audio/wav */
  AudioWav = 'AUDIO_WAV',
  /** MimeType audio/x-matroska */
  AudioXMatroska = 'AUDIO_X_MATROSKA',
  /** MimeType audio/x-ms-wax */
  AudioXMsWax = 'AUDIO_X_MS_WAX',
  /** MimeType audio/x-ms-wma */
  AudioXMsWma = 'AUDIO_X_MS_WMA',
  /** MimeType audio/x-realaudio */
  AudioXRealaudio = 'AUDIO_X_REALAUDIO',
  /** MimeType image/bmp */
  ImageBmp = 'IMAGE_BMP',
  /** MimeType image/gif */
  ImageGif = 'IMAGE_GIF',
  /** MimeType image/heic */
  ImageHeic = 'IMAGE_HEIC',
  /** MimeType image/jpeg */
  ImageJpeg = 'IMAGE_JPEG',
  /** MimeType image/png */
  ImagePng = 'IMAGE_PNG',
  /** MimeType image/tiff */
  ImageTiff = 'IMAGE_TIFF',
  /** MimeType image/webp */
  ImageWebp = 'IMAGE_WEBP',
  /** MimeType image/x-icon */
  ImageXIcon = 'IMAGE_X_ICON',
  /** MimeType text/calendar */
  TextCalendar = 'TEXT_CALENDAR',
  /** MimeType text/css */
  TextCss = 'TEXT_CSS',
  /** MimeType text/csv */
  TextCsv = 'TEXT_CSV',
  /** MimeType text/plain */
  TextPlain = 'TEXT_PLAIN',
  /** MimeType text/richtext */
  TextRichtext = 'TEXT_RICHTEXT',
  /** MimeType text/tab-separated-values */
  TextTabSeparatedValues = 'TEXT_TAB_SEPARATED_VALUES',
  /** MimeType text/vtt */
  TextVtt = 'TEXT_VTT',
  /** MimeType video/3gpp */
  Video_3Gpp = 'VIDEO_3GPP',
  /** MimeType video/3gpp2 */
  Video_3Gpp2 = 'VIDEO_3GPP2',
  /** MimeType video/avi */
  VideoAvi = 'VIDEO_AVI',
  /** MimeType video/divx */
  VideoDivx = 'VIDEO_DIVX',
  /** MimeType video/mp4 */
  VideoMp4 = 'VIDEO_MP4',
  /** MimeType video/mpeg */
  VideoMpeg = 'VIDEO_MPEG',
  /** MimeType video/ogg */
  VideoOgg = 'VIDEO_OGG',
  /** MimeType video/quicktime */
  VideoQuicktime = 'VIDEO_QUICKTIME',
  /** MimeType video/webm */
  VideoWebm = 'VIDEO_WEBM',
  /** MimeType video/x-flv */
  VideoXFlv = 'VIDEO_X_FLV',
  /** MimeType video/x-matroska */
  VideoXMatroska = 'VIDEO_X_MATROSKA',
  /** MimeType video/x-ms-asf */
  VideoXMsAsf = 'VIDEO_X_MS_ASF',
  /** MimeType video/x-ms-wm */
  VideoXMsWm = 'VIDEO_X_MS_WM',
  /** MimeType video/x-ms-wmv */
  VideoXMsWmv = 'VIDEO_X_MS_WMV',
  /** MimeType video/x-ms-wmx */
  VideoXMsWmx = 'VIDEO_X_MS_WMX',
}

/** An object with an ID */
export type Node = {
  /** The globally unique ID for the object */
  id: Scalars['ID']
}

/** A node that can have an author assigned to it */
export type NodeWithAuthor = {
  /** Connection between the NodeWithAuthor type and the User type */
  author?: Maybe<NodeWithAuthorToUserConnectionEdge>
  /** The database identifier of the author of the node */
  authorDatabaseId?: Maybe<Scalars['Int']>
  /** The globally unique identifier of the author of the node */
  authorId?: Maybe<Scalars['ID']>
}

/** Connection between the NodeWithAuthor type and the User type */
export type NodeWithAuthorToUserConnectionEdge = {
  __typename?: 'NodeWithAuthorToUserConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<User>
}

/** A node that can have comments associated with it */
export type NodeWithComments = {
  /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
  commentCount?: Maybe<Scalars['Int']>
  /** Whether the comments are open or closed for this particular post. */
  commentStatus?: Maybe<Scalars['String']>
}

/** A node that supports the content editor */
export type NodeWithContentEditor = {
  /** The content of the post. */
  content?: Maybe<Scalars['String']>
}

/** A node that supports the content editor */
export type NodeWithContentEditorContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A node that can have an excerpt */
export type NodeWithExcerpt = {
  /** The excerpt of the post. */
  excerpt?: Maybe<Scalars['String']>
}

/** A node that can have an excerpt */
export type NodeWithExcerptExcerptArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A node that can have a featured image set */
export type NodeWithFeaturedImage = {
  /** Connection between the ContentNode type and the ContentType type */
  contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
  /** The unique identifier stored in the database */
  databaseId: Scalars['Int']
  /** Post publishing date. */
  date?: Maybe<Scalars['String']>
  /** The publishing date set in GMT. */
  dateGmt?: Maybe<Scalars['String']>
  /** The desired slug of the post */
  desiredSlug?: Maybe<Scalars['String']>
  /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
  editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
  /** The RSS enclosure for the object */
  enclosure?: Maybe<Scalars['String']>
  /** Connection between the ContentNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
  /** Connection between the ContentNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
  /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
  /** The database identifier for the featured image node assigned to the content node */
  featuredImageDatabaseId?: Maybe<Scalars['Int']>
  /** Globally unique ID of the featured image assigned to the node */
  featuredImageId?: Maybe<Scalars['ID']>
  /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
  guid?: Maybe<Scalars['String']>
  /** The unique resource identifier path */
  id: Scalars['ID']
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']
  /** Whether the object is a node in the preview state */
  isPreview?: Maybe<Scalars['Boolean']>
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']
  /** The user that most recently edited the node */
  lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
  /** The permalink of the post */
  link?: Maybe<Scalars['String']>
  /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
  modified?: Maybe<Scalars['String']>
  /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
  modifiedGmt?: Maybe<Scalars['String']>
  /** The database id of the preview node */
  previewRevisionDatabaseId?: Maybe<Scalars['Int']>
  /** Whether the object is a node in the preview state */
  previewRevisionId?: Maybe<Scalars['ID']>
  /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
  slug?: Maybe<Scalars['String']>
  /** The current status of the object */
  status?: Maybe<Scalars['String']>
  /** The template assigned to a node of content */
  template?: Maybe<ContentTemplate>
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']>
}

/** A node that can have a featured image set */
export type NodeWithFeaturedImageEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A node that can have a featured image set */
export type NodeWithFeaturedImageEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** Connection between the NodeWithFeaturedImage type and the MediaItem type */
export type NodeWithFeaturedImageToMediaItemConnectionEdge = {
  __typename?: 'NodeWithFeaturedImageToMediaItemConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<MediaItem>
}

/** A node that can have page attributes */
export type NodeWithPageAttributes = {
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>
}

/** A node that can have revisions */
export type NodeWithRevisions = {
  /** True if the node is a revision of another node */
  isRevision?: Maybe<Scalars['Boolean']>
  /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
  revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>
}

/** Connection between the NodeWithRevisions type and the ContentNode type */
export type NodeWithRevisionsToContentNodeConnectionEdge = {
  __typename?: 'NodeWithRevisionsToContentNodeConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<ContentNode>
}

/** A node that can have a template associated with it */
export type NodeWithTemplate = {
  /** The template assigned to the node */
  template?: Maybe<ContentTemplate>
}

/** A node that NodeWith a title */
export type NodeWithTitle = {
  /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
  title?: Maybe<Scalars['String']>
}

/** A node that NodeWith a title */
export type NodeWithTitleTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A node that can have trackbacks and pingbacks */
export type NodeWithTrackbacks = {
  /** Whether the pings are open or closed for this particular post. */
  pingStatus?: Maybe<Scalars['String']>
  /** URLs that have been pinged. */
  pinged?: Maybe<Array<Maybe<Scalars['String']>>>
  /** URLs queued to be pinged. */
  toPing?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A order object */
export type Order = Node &
  NodeWithComments & {
    __typename?: 'Order'
    /** Order billing properties */
    billing?: Maybe<CustomerAddress>
    /** Cart hash */
    cartHash?: Maybe<Scalars['String']>
    /** Cart tax amount */
    cartTax?: Maybe<Scalars['String']>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** Connection between the Order type and the CouponLine type */
    couponLines?: Maybe<OrderToCouponLineConnection>
    /** How order was created */
    createdVia?: Maybe<Scalars['String']>
    /** Order currency */
    currency?: Maybe<Scalars['String']>
    /** Order customer */
    customer?: Maybe<Customer>
    /** Customer IP Address */
    customerIpAddress?: Maybe<Scalars['String']>
    /** Customer note */
    customerNote?: Maybe<Scalars['String']>
    /** Customer User Agent */
    customerUserAgent?: Maybe<Scalars['String']>
    /** The ID of the order in the database */
    databaseId?: Maybe<Scalars['Int']>
    /** Date order was created */
    date?: Maybe<Scalars['String']>
    /** Date order was completed */
    dateCompleted?: Maybe<Scalars['String']>
    /** Date order was paid */
    datePaid?: Maybe<Scalars['String']>
    /** Discount tax amount */
    discountTax?: Maybe<Scalars['String']>
    /** Discount total amount */
    discountTotal?: Maybe<Scalars['String']>
    /** Connection between the Order type and the DownloadableItem type */
    downloadableItems?: Maybe<OrderToDownloadableItemConnection>
    /** Connection between the Order type and the FeeLine type */
    feeLines?: Maybe<OrderToFeeLineConnection>
    /** Order has a billing address? */
    hasBillingAddress?: Maybe<Scalars['Boolean']>
    /** If order contains a downloadable product */
    hasDownloadableItem?: Maybe<Scalars['Boolean']>
    /** Order has a shipping address? */
    hasShippingAddress?: Maybe<Scalars['Boolean']>
    /** The globally unique identifier for the order */
    id: Scalars['ID']
    /** Is product download is permitted */
    isDownloadPermitted?: Maybe<Scalars['Boolean']>
    /** Connection between the Order type and the LineItem type */
    lineItems?: Maybe<OrderToLineItemConnection>
    /** Object meta data */
    metaData?: Maybe<Array<Maybe<MetaData>>>
    /** Date order was last updated */
    modified?: Maybe<Scalars['String']>
    /** If order needs payment */
    needsPayment?: Maybe<Scalars['Boolean']>
    /** If order needs processing before it can be completed */
    needsProcessing?: Maybe<Scalars['Boolean']>
    /** If order needs shipping address */
    needsShippingAddress?: Maybe<Scalars['Boolean']>
    /** Order key */
    orderKey?: Maybe<Scalars['String']>
    /** Connection between the Order type and the Comment type */
    orderNotes?: Maybe<OrderToCommentConnection>
    /** Order number */
    orderNumber?: Maybe<Scalars['String']>
    /** Order version */
    orderVersion?: Maybe<Scalars['String']>
    /** Parent order */
    parent?: Maybe<Order>
    /** Payment method */
    paymentMethod?: Maybe<Scalars['String']>
    /** Payment method title */
    paymentMethodTitle?: Maybe<Scalars['String']>
    /** Prices include taxes? */
    pricesIncludeTax?: Maybe<Scalars['Boolean']>
    /** Connection between the Order type and the Refund type */
    refunds?: Maybe<OrderToRefundConnection>
    /** Order shipping properties */
    shipping?: Maybe<CustomerAddress>
    /** Order customer */
    shippingAddressMapUrl?: Maybe<Scalars['String']>
    /** Connection between the Order type and the ShippingLine type */
    shippingLines?: Maybe<OrderToShippingLineConnection>
    /** Shipping tax amount */
    shippingTax?: Maybe<Scalars['String']>
    /** Shipping total amount */
    shippingTotal?: Maybe<Scalars['String']>
    /** Order status */
    status?: Maybe<OrderStatusEnum>
    /** Order subtotal */
    subtotal?: Maybe<Scalars['String']>
    /** Connection between the Order type and the TaxLine type */
    taxLines?: Maybe<OrderToTaxLineConnection>
    /** Order grand total */
    total?: Maybe<Scalars['String']>
    /** Order taxes */
    totalTax?: Maybe<Scalars['String']>
    /** Transaction ID */
    transactionId?: Maybe<Scalars['String']>
  }

/** A order object */
export type OrderCartTaxArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A order object */
export type OrderCouponLinesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A order object */
export type OrderDiscountTaxArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A order object */
export type OrderDiscountTotalArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A order object */
export type OrderDownloadableItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<OrderToDownloadableItemConnectionWhereArgs>
}

/** A order object */
export type OrderFeeLinesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A order object */
export type OrderLineItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A order object */
export type OrderMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A order object */
export type OrderOrderNotesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<OrderToCommentConnectionWhereArgs>
}

/** A order object */
export type OrderRefundsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<OrderToRefundConnectionWhereArgs>
}

/** A order object */
export type OrderShippingLinesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A order object */
export type OrderShippingTaxArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A order object */
export type OrderShippingTotalArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A order object */
export type OrderSubtotalArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A order object */
export type OrderTaxLinesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A order object */
export type OrderTotalArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A order object */
export type OrderTotalTaxArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** The cardinality of the connection order */
export enum OrderEnum {
  /** Sort the query result set in an ascending order */
  Asc = 'ASC',
  /** Sort the query result set in a descending order */
  Desc = 'DESC',
}

/** The Type of Identifier used to fetch a single Order. Default is ID. */
export enum OrderIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Order number. */
  OrderNumber = 'ORDER_NUMBER',
}

/** Order item tax statement */
export type OrderItemTax = {
  __typename?: 'OrderItemTax'
  /** Amount taxed */
  amount?: Maybe<Scalars['Float']>
  /** Subtotal */
  subtotal?: Maybe<Scalars['Float']>
  /** Tax line connected to this statement */
  taxLine?: Maybe<TaxLine>
  /** Order item ID for tax line connected to this statement */
  taxLineId: Scalars['Int']
  /** Total */
  total?: Maybe<Scalars['Float']>
}

/** Order status enumeration */
export enum OrderStatusEnum {
  /** Cancelled */
  Cancelled = 'CANCELLED',
  /** Completed */
  Completed = 'COMPLETED',
  /** Failed */
  Failed = 'FAILED',
  /** On hold */
  OnHold = 'ON_HOLD',
  /** Pending payment */
  Pending = 'PENDING',
  /** Processing */
  Processing = 'PROCESSING',
  /** Refunded */
  Refunded = 'REFUNDED',
}

/** Connection between the Order type and the Comment type */
export type OrderToCommentConnection = {
  __typename?: 'OrderToCommentConnection'
  /** Edges for the OrderToCommentConnection connection */
  edges?: Maybe<Array<Maybe<OrderToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToCommentConnectionEdge = {
  __typename?: 'OrderToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** Is this a customer note? */
  isCustomerNote?: Maybe<Scalars['Boolean']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
}

/** Arguments for filtering the OrderToCommentConnection connection */
export type OrderToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Connection between the Order type and the CouponLine type */
export type OrderToCouponLineConnection = {
  __typename?: 'OrderToCouponLineConnection'
  /** Edges for the OrderToCouponLineConnection connection */
  edges?: Maybe<Array<Maybe<OrderToCouponLineConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<CouponLine>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToCouponLineConnectionEdge = {
  __typename?: 'OrderToCouponLineConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<CouponLine>
}

/** Connection between the Order type and the DownloadableItem type */
export type OrderToDownloadableItemConnection = {
  __typename?: 'OrderToDownloadableItemConnection'
  /** Edges for the OrderToDownloadableItemConnection connection */
  edges?: Maybe<Array<Maybe<OrderToDownloadableItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<DownloadableItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToDownloadableItemConnectionEdge = {
  __typename?: 'OrderToDownloadableItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<DownloadableItem>
}

/** Arguments for filtering the OrderToDownloadableItemConnection connection */
export type OrderToDownloadableItemConnectionWhereArgs = {
  /** Limit results to downloadable items that can be downloaded now. */
  active?: Maybe<Scalars['Boolean']>
  /** Limit results to downloadable items that are expired. */
  expired?: Maybe<Scalars['Boolean']>
  /** Limit results to downloadable items that have downloads remaining. */
  hasDownloadsRemaining?: Maybe<Scalars['Boolean']>
}

/** Connection between the Order type and the FeeLine type */
export type OrderToFeeLineConnection = {
  __typename?: 'OrderToFeeLineConnection'
  /** Edges for the OrderToFeeLineConnection connection */
  edges?: Maybe<Array<Maybe<OrderToFeeLineConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<FeeLine>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToFeeLineConnectionEdge = {
  __typename?: 'OrderToFeeLineConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<FeeLine>
}

/** Connection between the Order type and the LineItem type */
export type OrderToLineItemConnection = {
  __typename?: 'OrderToLineItemConnection'
  /** Edges for the OrderToLineItemConnection connection */
  edges?: Maybe<Array<Maybe<OrderToLineItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<LineItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToLineItemConnectionEdge = {
  __typename?: 'OrderToLineItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<LineItem>
}

/** Connection between the Order type and the Refund type */
export type OrderToRefundConnection = {
  __typename?: 'OrderToRefundConnection'
  /** Edges for the OrderToRefundConnection connection */
  edges?: Maybe<Array<Maybe<OrderToRefundConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Refund>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToRefundConnectionEdge = {
  __typename?: 'OrderToRefundConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Refund>
}

/** Arguments for filtering the OrderToRefundConnection connection */
export type OrderToRefundConnectionWhereArgs = {
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to refunds from a specific group of order IDs. */
  orderIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostTypeOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to refunds assigned a specific status. */
  statuses?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Connection between the Order type and the ShippingLine type */
export type OrderToShippingLineConnection = {
  __typename?: 'OrderToShippingLineConnection'
  /** Edges for the OrderToShippingLineConnection connection */
  edges?: Maybe<Array<Maybe<OrderToShippingLineConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ShippingLine>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToShippingLineConnectionEdge = {
  __typename?: 'OrderToShippingLineConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ShippingLine>
}

/** Connection between the Order type and the TaxLine type */
export type OrderToTaxLineConnection = {
  __typename?: 'OrderToTaxLineConnection'
  /** Edges for the OrderToTaxLineConnection connection */
  edges?: Maybe<Array<Maybe<OrderToTaxLineConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<TaxLine>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type OrderToTaxLineConnectionEdge = {
  __typename?: 'OrderToTaxLineConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<TaxLine>
}

/** Fields to order the Orders connection by */
export enum OrdersOrderByEnum {
  /** Order by publish date */
  Date = 'DATE',
  /** Order by date the order was completed */
  DateCompleted = 'DATE_COMPLETED',
  /** Order by date the order was paid */
  DatePaid = 'DATE_PAID',
  /** Order by order discount amount */
  Discount = 'DISCOUNT',
  /** Preserve the ID order given in the IN array */
  In = 'IN',
  /** Order by the menu order value */
  MenuOrder = 'MENU_ORDER',
  /** Order by last modified date */
  Modified = 'MODIFIED',
  /** Preserve slug order given in the NAME_IN array */
  NameIn = 'NAME_IN',
  /** Order by order key */
  OrderKey = 'ORDER_KEY',
  /** Order by parent ID */
  Parent = 'PARENT',
  /** Order by slug */
  Slug = 'SLUG',
  /** Order by order total */
  Tax = 'TAX',
  /** Order by order total */
  Total = 'TOTAL',
}

/** Options for ordering the connection */
export type OrdersOrderbyInput = {
  field: OrdersOrderByEnum
  order?: Maybe<OrderEnum>
}

/** The paColor type */
export type PaColor = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'PaColor'
    /** Connection between the paColor type and the ContentNode type */
    contentNodes?: Maybe<PaColorToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    paColorId?: Maybe<Scalars['Int']>
    /** Connection between the PaColor type and the Product type */
    products?: Maybe<PaColorToProductConnection>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the paColor type and the Taxonomy type */
    taxonomy?: Maybe<PaColorToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** Connection between the PaColor type and the ProductVariation type */
    variations?: Maybe<PaColorToProductVariationConnection>
  }

/** The paColor type */
export type PaColorContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PaColorToContentNodeConnectionWhereArgs>
}

/** The paColor type */
export type PaColorEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The paColor type */
export type PaColorEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The paColor type */
export type PaColorProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PaColorToProductConnectionWhereArgs>
}

/** The paColor type */
export type PaColorVariationsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PaColorToProductVariationConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PaColorIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the paColor type and the ContentNode type */
export type PaColorToContentNodeConnection = {
  __typename?: 'PaColorToContentNodeConnection'
  /** Edges for the PaColorToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<PaColorToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PaColorToContentNodeConnectionEdge = {
  __typename?: 'PaColorToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the PaColorToContentNodeConnection connection */
export type PaColorToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfPaColorEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the PaColor type and the Product type */
export type PaColorToProductConnection = {
  __typename?: 'PaColorToProductConnection'
  /** Edges for the PaColorToProductConnection connection */
  edges?: Maybe<Array<Maybe<PaColorToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PaColorToProductConnectionEdge = {
  __typename?: 'PaColorToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the PaColorToProductConnection connection */
export type PaColorToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the PaColor type and the ProductVariation type */
export type PaColorToProductVariationConnection = {
  __typename?: 'PaColorToProductVariationConnection'
  /** Edges for the PaColorToProductVariationConnection connection */
  edges?: Maybe<Array<Maybe<PaColorToProductVariationConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductVariation>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PaColorToProductVariationConnectionEdge = {
  __typename?: 'PaColorToProductVariationConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductVariation>
}

/** Arguments for filtering the PaColorToProductVariationConnection connection */
export type PaColorToProductVariationConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the paColor type and the Taxonomy type */
export type PaColorToTaxonomyConnectionEdge = {
  __typename?: 'PaColorToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** The paSize type */
export type PaSize = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'PaSize'
    /** Connection between the paSize type and the ContentNode type */
    contentNodes?: Maybe<PaSizeToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    paSizeId?: Maybe<Scalars['Int']>
    /** Connection between the PaSize type and the Product type */
    products?: Maybe<PaSizeToProductConnection>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the paSize type and the Taxonomy type */
    taxonomy?: Maybe<PaSizeToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** Connection between the PaSize type and the ProductVariation type */
    variations?: Maybe<PaSizeToProductVariationConnection>
  }

/** The paSize type */
export type PaSizeContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PaSizeToContentNodeConnectionWhereArgs>
}

/** The paSize type */
export type PaSizeEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The paSize type */
export type PaSizeEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The paSize type */
export type PaSizeProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PaSizeToProductConnectionWhereArgs>
}

/** The paSize type */
export type PaSizeVariationsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PaSizeToProductVariationConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PaSizeIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the paSize type and the ContentNode type */
export type PaSizeToContentNodeConnection = {
  __typename?: 'PaSizeToContentNodeConnection'
  /** Edges for the PaSizeToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<PaSizeToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PaSizeToContentNodeConnectionEdge = {
  __typename?: 'PaSizeToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the PaSizeToContentNodeConnection connection */
export type PaSizeToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfPaSizeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the PaSize type and the Product type */
export type PaSizeToProductConnection = {
  __typename?: 'PaSizeToProductConnection'
  /** Edges for the PaSizeToProductConnection connection */
  edges?: Maybe<Array<Maybe<PaSizeToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PaSizeToProductConnectionEdge = {
  __typename?: 'PaSizeToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the PaSizeToProductConnection connection */
export type PaSizeToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the PaSize type and the ProductVariation type */
export type PaSizeToProductVariationConnection = {
  __typename?: 'PaSizeToProductVariationConnection'
  /** Edges for the PaSizeToProductVariationConnection connection */
  edges?: Maybe<Array<Maybe<PaSizeToProductVariationConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductVariation>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PaSizeToProductVariationConnectionEdge = {
  __typename?: 'PaSizeToProductVariationConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductVariation>
}

/** Arguments for filtering the PaSizeToProductVariationConnection connection */
export type PaSizeToProductVariationConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the paSize type and the Taxonomy type */
export type PaSizeToTaxonomyConnectionEdge = {
  __typename?: 'PaSizeToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** The page type */
export type Page = Node &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier &
  NodeWithTemplate &
  NodeWithTitle &
  NodeWithContentEditor &
  NodeWithAuthor &
  NodeWithFeaturedImage &
  NodeWithComments &
  NodeWithRevisions &
  NodeWithPageAttributes &
  HierarchicalContentNode &
  MenuItemLinkable & {
    __typename?: 'Page'
    /** Returns ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnection>
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']>
    /** Connection between the HierarchicalContentNode type and the ContentNode type */
    children?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnection>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** Connection between the page type and the Comment type */
    comments?: Maybe<PageToCommentConnection>
    /** The content of the post. */
    content?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** The unique resource identifier path */
    databaseId: Scalars['Int']
    /** Post publishing date. */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** The globally unique identifier of the page object. */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether this page is set to the static front page. */
    isFrontPage: Scalars['Boolean']
    /** Whether this page is set to the blog posts page. */
    isPostsPage: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether this page is set to the privacy page. */
    isPrivacyPage: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
    menuOrder?: Maybe<Scalars['Int']>
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    pageId: Scalars['Int']
    /** The parent of the node. The parent object can be of various types */
    parent?: Maybe<HierarchicalContentNodeToParentContentNodeConnectionEdge>
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']>
    /** Connection between the page type and the page type */
    preview?: Maybe<PageToPreviewConnectionEdge>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>
    /** Connection between the page type and the page type */
    revisions?: Maybe<PageToRevisionConnection>
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']>
    /** The current status of the object */
    status?: Maybe<Scalars['String']>
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The page type */
export type PageAncestorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs>
}

/** The page type */
export type PageChildrenArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs>
}

/** The page type */
export type PageCommentsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PageToCommentConnectionWhereArgs>
}

/** The page type */
export type PageContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** The page type */
export type PageEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The page type */
export type PageEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The page type */
export type PageRevisionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PageToRevisionConnectionWhereArgs>
}

/** The page type */
export type PageTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PageIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** Connection between the page type and the Comment type */
export type PageToCommentConnection = {
  __typename?: 'PageToCommentConnection'
  /** Edges for the PageToCommentConnection connection */
  edges?: Maybe<Array<Maybe<PageToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PageToCommentConnectionEdge = {
  __typename?: 'PageToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
}

/** Arguments for filtering the PageToCommentConnection connection */
export type PageToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Connection between the page type and the page type */
export type PageToPreviewConnectionEdge = {
  __typename?: 'PageToPreviewConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Page>
}

/** Connection between the page type and the page type */
export type PageToRevisionConnection = {
  __typename?: 'PageToRevisionConnection'
  /** Edges for the pageToRevisionConnection connection */
  edges?: Maybe<Array<Maybe<PageToRevisionConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Page>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PageToRevisionConnectionEdge = {
  __typename?: 'PageToRevisionConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Page>
}

/** Arguments for filtering the pageToRevisionConnection connection */
export type PageToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** A payment gateway object */
export type PaymentGateway = {
  __typename?: 'PaymentGateway'
  /** gateway&#039;s description */
  description?: Maybe<Scalars['String']>
  /** gateway&#039;s icon */
  icon?: Maybe<Scalars['String']>
  /** gateway&#039;s title */
  id: Scalars['String']
  /** gateway&#039;s title */
  title?: Maybe<Scalars['String']>
}

/** An plugin object */
export type Plugin = Node & {
  __typename?: 'Plugin'
  /** Name of the plugin author(s), may also be a company name. */
  author?: Maybe<Scalars['String']>
  /** URI for the related author(s)/company website. */
  authorUri?: Maybe<Scalars['String']>
  /** Description of the plugin. */
  description?: Maybe<Scalars['String']>
  /** The globally unique identifier of the plugin object. */
  id: Scalars['ID']
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** Display name of the plugin. */
  name?: Maybe<Scalars['String']>
  /** Plugin path. */
  path?: Maybe<Scalars['String']>
  /** URI for the plugin website. This is useful for directing users for support requests etc. */
  pluginUri?: Maybe<Scalars['String']>
  /** Current version of the plugin. */
  version?: Maybe<Scalars['String']>
}

/** The post type */
export type Post = Node &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier &
  NodeWithTemplate &
  NodeWithTitle &
  NodeWithContentEditor &
  NodeWithAuthor &
  NodeWithFeaturedImage &
  NodeWithExcerpt &
  NodeWithComments &
  NodeWithTrackbacks &
  NodeWithRevisions &
  MenuItemLinkable & {
    __typename?: 'Post'
    /** Connection between the NodeWithAuthor type and the User type */
    author?: Maybe<NodeWithAuthorToUserConnectionEdge>
    /** The database identifier of the author of the node */
    authorDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the author of the node */
    authorId?: Maybe<Scalars['ID']>
    /** Connection between the post type and the category type */
    categories?: Maybe<PostToCategoryConnection>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** Connection between the post type and the Comment type */
    comments?: Maybe<PostToCommentConnection>
    /** The content of the post. */
    content?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** The unique resource identifier path */
    databaseId: Scalars['Int']
    /** Post publishing date. */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** The excerpt of the post. */
    excerpt?: Maybe<Scalars['String']>
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** The globally unique identifier of the post object. */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** True if the node is a revision of another node */
    isRevision?: Maybe<Scalars['Boolean']>
    /** Whether this page is sticky */
    isSticky: Scalars['Boolean']
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** The local modified time for a post. If a post was recently updated the modified field will change to match the corresponding time. */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /** Whether the pings are open or closed for this particular post. */
    pingStatus?: Maybe<Scalars['String']>
    /** URLs that have been pinged. */
    pinged?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Connection between the post type and the postFormat type */
    postFormats?: Maybe<PostToPostFormatConnection>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of the databaseId field
     */
    postId: Scalars['Int']
    /** Connection between the post type and the post type */
    preview?: Maybe<PostToPreviewConnectionEdge>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** If the current node is a revision, this field exposes the node this is a revision of. Returns null if the node is not a revision of another node. */
    revisionOf?: Maybe<NodeWithRevisionsToContentNodeConnectionEdge>
    /** Connection between the post type and the post type */
    revisions?: Maybe<PostToRevisionConnection>
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']>
    /** The current status of the object */
    status?: Maybe<Scalars['String']>
    /** Connection between the post type and the tag type */
    tags?: Maybe<PostToTagConnection>
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>
    /** Connection between the post type and the TermNode type */
    terms?: Maybe<PostToTermNodeConnection>
    /** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
    title?: Maybe<Scalars['String']>
    /** URLs queued to be pinged. */
    toPing?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The post type */
export type PostCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostToCategoryConnectionWhereArgs>
}

/** The post type */
export type PostCommentsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostToCommentConnectionWhereArgs>
}

/** The post type */
export type PostContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** The post type */
export type PostEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The post type */
export type PostEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The post type */
export type PostExcerptArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** The post type */
export type PostPostFormatsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostToPostFormatConnectionWhereArgs>
}

/** The post type */
export type PostRevisionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostToRevisionConnectionWhereArgs>
}

/** The post type */
export type PostTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostToTagConnectionWhereArgs>
}

/** The post type */
export type PostTermsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostToTermNodeConnectionWhereArgs>
}

/** The post type */
export type PostTitleArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** Set relationships between the post to categories */
export type PostCategoriesInput = {
  /** If true, this will append the category to existing related categories. If false, this will replace existing relationships. Default true. */
  append?: Maybe<Scalars['Boolean']>
  /** The input list of items to set. */
  nodes?: Maybe<Array<Maybe<PostCategoriesNodeInput>>>
}

/** List of categories to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostCategoriesNodeInput = {
  /** The description of the category. This field is used to set a description of the category if a new one is created during the mutation. */
  description?: Maybe<Scalars['String']>
  /** The ID of the category. If present, this will be used to connect to the post. If no existing category exists with this ID, no connection will be made. */
  id?: Maybe<Scalars['ID']>
  /** The name of the category. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: Maybe<Scalars['String']>
  /** The slug of the category. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: Maybe<Scalars['String']>
}

/** The postFormat type */
export type PostFormat = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'PostFormat'
    /** Connection between the postFormat type and the ContentNode type */
    contentNodes?: Maybe<PostFormatToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    postFormatId?: Maybe<Scalars['Int']>
    /** Connection between the postFormat type and the post type */
    posts?: Maybe<PostFormatToPostConnection>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the postFormat type and the Taxonomy type */
    taxonomy?: Maybe<PostFormatToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The postFormat type */
export type PostFormatContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostFormatToContentNodeConnectionWhereArgs>
}

/** The postFormat type */
export type PostFormatEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The postFormat type */
export type PostFormatEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The postFormat type */
export type PostFormatPostsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<PostFormatToPostConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostFormatIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the postFormat type and the ContentNode type */
export type PostFormatToContentNodeConnection = {
  __typename?: 'PostFormatToContentNodeConnection'
  /** Edges for the PostFormatToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<PostFormatToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostFormatToContentNodeConnectionEdge = {
  __typename?: 'PostFormatToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the PostFormatToContentNodeConnection connection */
export type PostFormatToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfPostFormatEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the postFormat type and the post type */
export type PostFormatToPostConnection = {
  __typename?: 'PostFormatToPostConnection'
  /** Edges for the PostFormatToPostConnection connection */
  edges?: Maybe<Array<Maybe<PostFormatToPostConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostFormatToPostConnectionEdge = {
  __typename?: 'PostFormatToPostConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Post>
}

/** Arguments for filtering the PostFormatToPostConnection connection */
export type PostFormatToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the postFormat type and the Taxonomy type */
export type PostFormatToTaxonomyConnectionEdge = {
  __typename?: 'PostFormatToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum PostIdType {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
  /** Identify a resource by the URI. */
  Uri = 'URI',
}

/** The format of post field data. */
export enum PostObjectFieldFormatEnum {
  /** Provide the field value directly from database */
  Raw = 'RAW',
  /** Apply the default WordPress rendering */
  Rendered = 'RENDERED',
}

/** The column to use when filtering by date */
export enum PostObjectsConnectionDateColumnEnum {
  /** The date the comment was created in local time. */
  Date = 'DATE',
  /** The most recent modification date of the comment. */
  Modified = 'MODIFIED',
}

/** Field to order the connection by */
export enum PostObjectsConnectionOrderbyEnum {
  /** Order by author */
  Author = 'AUTHOR',
  /** Order by the number of comments it has acquired */
  CommentCount = 'COMMENT_COUNT',
  /** Order by publish date */
  Date = 'DATE',
  /** Preserve the ID order given in the IN array */
  In = 'IN',
  /** Order by the menu order value */
  MenuOrder = 'MENU_ORDER',
  /** Order by last modified date */
  Modified = 'MODIFIED',
  /** Preserve slug order given in the NAME_IN array */
  NameIn = 'NAME_IN',
  /** Order by parent ID */
  Parent = 'PARENT',
  /** Order by slug */
  Slug = 'SLUG',
  /** Order by title */
  Title = 'TITLE',
}

/** Options for ordering the connection */
export type PostObjectsConnectionOrderbyInput = {
  /** The field to order the connection by */
  field: PostObjectsConnectionOrderbyEnum
  /** Possible directions in which to order a list of items */
  order: OrderEnum
}

/** Set relationships between the post to postFormats */
export type PostPostFormatsInput = {
  /** If true, this will append the postFormat to existing related postFormats. If false, this will replace existing relationships. Default true. */
  append?: Maybe<Scalars['Boolean']>
  /** The input list of items to set. */
  nodes?: Maybe<Array<Maybe<PostPostFormatsNodeInput>>>
}

/** List of postFormats to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostPostFormatsNodeInput = {
  /** The description of the postFormat. This field is used to set a description of the postFormat if a new one is created during the mutation. */
  description?: Maybe<Scalars['String']>
  /** The ID of the postFormat. If present, this will be used to connect to the post. If no existing postFormat exists with this ID, no connection will be made. */
  id?: Maybe<Scalars['ID']>
  /** The name of the postFormat. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: Maybe<Scalars['String']>
  /** The slug of the postFormat. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: Maybe<Scalars['String']>
}

/** The status of the object. */
export enum PostStatusEnum {
  /** Objects with the auto-draft status */
  AutoDraft = 'AUTO_DRAFT',
  /** Objects with the draft status */
  Draft = 'DRAFT',
  /** Objects with the future status */
  Future = 'FUTURE',
  /** Objects with the inherit status */
  Inherit = 'INHERIT',
  /** Objects with the pending status */
  Pending = 'PENDING',
  /** Objects with the private status */
  Private = 'PRIVATE',
  /** Objects with the publish status */
  Publish = 'PUBLISH',
  /** Objects with the request-completed status */
  RequestCompleted = 'REQUEST_COMPLETED',
  /** Objects with the request-confirmed status */
  RequestConfirmed = 'REQUEST_CONFIRMED',
  /** Objects with the request-failed status */
  RequestFailed = 'REQUEST_FAILED',
  /** Objects with the request-pending status */
  RequestPending = 'REQUEST_PENDING',
  /** Objects with the trash status */
  Trash = 'TRASH',
  /** Objects with the wc-cancelled status */
  WcCancelled = 'WC_CANCELLED',
  /** Objects with the wc-completed status */
  WcCompleted = 'WC_COMPLETED',
  /** Objects with the wc-failed status */
  WcFailed = 'WC_FAILED',
  /** Objects with the wc-on-hold status */
  WcOnHold = 'WC_ON_HOLD',
  /** Objects with the wc-pending status */
  WcPending = 'WC_PENDING',
  /** Objects with the wc-processing status */
  WcProcessing = 'WC_PROCESSING',
  /** Objects with the wc-refunded status */
  WcRefunded = 'WC_REFUNDED',
}

/** Set relationships between the post to tags */
export type PostTagsInput = {
  /** If true, this will append the tag to existing related tags. If false, this will replace existing relationships. Default true. */
  append?: Maybe<Scalars['Boolean']>
  /** The input list of items to set. */
  nodes?: Maybe<Array<Maybe<PostTagsNodeInput>>>
}

/** List of tags to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostTagsNodeInput = {
  /** The description of the tag. This field is used to set a description of the tag if a new one is created during the mutation. */
  description?: Maybe<Scalars['String']>
  /** The ID of the tag. If present, this will be used to connect to the post. If no existing tag exists with this ID, no connection will be made. */
  id?: Maybe<Scalars['ID']>
  /** The name of the tag. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: Maybe<Scalars['String']>
  /** The slug of the tag. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: Maybe<Scalars['String']>
}

/** Connection between the post type and the category type */
export type PostToCategoryConnection = {
  __typename?: 'PostToCategoryConnection'
  /** Edges for the PostToCategoryConnection connection */
  edges?: Maybe<Array<Maybe<PostToCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostToCategoryConnectionEdge = {
  __typename?: 'PostToCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Category>
}

/** Arguments for filtering the PostToCategoryConnection connection */
export type PostToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the post type and the Comment type */
export type PostToCommentConnection = {
  __typename?: 'PostToCommentConnection'
  /** Edges for the PostToCommentConnection connection */
  edges?: Maybe<Array<Maybe<PostToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostToCommentConnectionEdge = {
  __typename?: 'PostToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
}

/** Arguments for filtering the PostToCommentConnection connection */
export type PostToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Connection between the post type and the postFormat type */
export type PostToPostFormatConnection = {
  __typename?: 'PostToPostFormatConnection'
  /** Edges for the PostToPostFormatConnection connection */
  edges?: Maybe<Array<Maybe<PostToPostFormatConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PostFormat>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostToPostFormatConnectionEdge = {
  __typename?: 'PostToPostFormatConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<PostFormat>
}

/** Arguments for filtering the PostToPostFormatConnection connection */
export type PostToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the post type and the post type */
export type PostToPreviewConnectionEdge = {
  __typename?: 'PostToPreviewConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Post>
}

/** Connection between the post type and the post type */
export type PostToRevisionConnection = {
  __typename?: 'PostToRevisionConnection'
  /** Edges for the postToRevisionConnection connection */
  edges?: Maybe<Array<Maybe<PostToRevisionConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostToRevisionConnectionEdge = {
  __typename?: 'PostToRevisionConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Post>
}

/** Arguments for filtering the postToRevisionConnection connection */
export type PostToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the post type and the tag type */
export type PostToTagConnection = {
  __typename?: 'PostToTagConnection'
  /** Edges for the PostToTagConnection connection */
  edges?: Maybe<Array<Maybe<PostToTagConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Tag>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostToTagConnectionEdge = {
  __typename?: 'PostToTagConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Tag>
}

/** Arguments for filtering the PostToTagConnection connection */
export type PostToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the post type and the TermNode type */
export type PostToTermNodeConnection = {
  __typename?: 'PostToTermNodeConnection'
  /** Edges for the PostToTermNodeConnection connection */
  edges?: Maybe<Array<Maybe<PostToTermNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<TermNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type PostToTermNodeConnectionEdge = {
  __typename?: 'PostToTermNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<TermNode>
}

/** Arguments for filtering the PostToTermNodeConnection connection */
export type PostToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** The Taxonomy to filter terms by */
  taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Details for labels of the PostType */
export type PostTypeLabelDetails = {
  __typename?: 'PostTypeLabelDetails'
  /** Default is ‘Add New’ for both hierarchical and non-hierarchical types. */
  addNew?: Maybe<Scalars['String']>
  /** Label for adding a new singular item. */
  addNewItem?: Maybe<Scalars['String']>
  /** Label to signify all items in a submenu link. */
  allItems?: Maybe<Scalars['String']>
  /** Label for archives in nav menus */
  archives?: Maybe<Scalars['String']>
  /** Label for the attributes meta box. */
  attributes?: Maybe<Scalars['String']>
  /** Label for editing a singular item. */
  editItem?: Maybe<Scalars['String']>
  /** Label for the Featured Image meta box title. */
  featuredImage?: Maybe<Scalars['String']>
  /** Label for the table views hidden heading. */
  filterItemsList?: Maybe<Scalars['String']>
  /** Label for the media frame button. */
  insertIntoItem?: Maybe<Scalars['String']>
  /** Label for the table hidden heading. */
  itemsList?: Maybe<Scalars['String']>
  /** Label for the table pagination hidden heading. */
  itemsListNavigation?: Maybe<Scalars['String']>
  /** Label for the menu name. */
  menuName?: Maybe<Scalars['String']>
  /** General name for the post type, usually plural. */
  name?: Maybe<Scalars['String']>
  /** Label for the new item page title. */
  newItem?: Maybe<Scalars['String']>
  /** Label used when no items are found. */
  notFound?: Maybe<Scalars['String']>
  /** Label used when no items are in the trash. */
  notFoundInTrash?: Maybe<Scalars['String']>
  /** Label used to prefix parents of hierarchical items. */
  parentItemColon?: Maybe<Scalars['String']>
  /** Label for removing the featured image. */
  removeFeaturedImage?: Maybe<Scalars['String']>
  /** Label for searching plural items. */
  searchItems?: Maybe<Scalars['String']>
  /** Label for setting the featured image. */
  setFeaturedImage?: Maybe<Scalars['String']>
  /** Name for one object of this post type. */
  singularName?: Maybe<Scalars['String']>
  /** Label for the media frame filter. */
  uploadedToThisItem?: Maybe<Scalars['String']>
  /** Label in the media frame for using a featured image. */
  useFeaturedImage?: Maybe<Scalars['String']>
  /** Label for viewing a singular item. */
  viewItem?: Maybe<Scalars['String']>
  /** Label for viewing post type archives. */
  viewItems?: Maybe<Scalars['String']>
}

/** Fields to order the PostType connection by */
export enum PostTypeOrderByEnum {
  /** Order by publish date */
  Date = 'DATE',
  /** Preserve the ID order given in the IN array */
  In = 'IN',
  /** Order by the menu order value */
  MenuOrder = 'MENU_ORDER',
  /** Order by last modified date */
  Modified = 'MODIFIED',
  /** Preserve slug order given in the NAME_IN array */
  NameIn = 'NAME_IN',
  /** Order by parent ID */
  Parent = 'PARENT',
  /** Order by slug */
  Slug = 'SLUG',
}

/** Options for ordering the connection */
export type PostTypeOrderbyInput = {
  field: PostTypeOrderByEnum
  order?: Maybe<OrderEnum>
}

/** Pricing field format enumeration */
export enum PricingFieldFormatEnum {
  Formatted = 'FORMATTED',
  Raw = 'RAW',
}

/** Product object */
export type Product = {
  /** Connection between the Product type and the ProductAttribute type */
  attributes?: Maybe<ProductToProductAttributeConnection>
  /** Product average count */
  averageRating?: Maybe<Scalars['Float']>
  /** Catalog visibility */
  catalogVisibility?: Maybe<CatalogVisibilityEnum>
  /** The ID of the product in the database */
  databaseId: Scalars['Int']
  /** Date product created */
  date?: Maybe<Scalars['String']>
  /** Date on sale from */
  dateOnSaleFrom?: Maybe<Scalars['String']>
  /** Date on sale to */
  dateOnSaleTo?: Maybe<Scalars['String']>
  /** Product description */
  description?: Maybe<Scalars['String']>
  /** If the product is featured */
  featured?: Maybe<Scalars['Boolean']>
  /** Connection between the Product type and the MediaItem type */
  galleryImages?: Maybe<ProductToMediaItemConnection>
  /** Connection between the Product type and the GlobalProductAttribute type */
  globalAttributes?: Maybe<ProductToGlobalProductAttributeConnection>
  /** The globally unique identifier for the product */
  id: Scalars['ID']
  /** Main image */
  image?: Maybe<MediaItem>
  /** The permalink of the post */
  link?: Maybe<Scalars['String']>
  /** Connection between the Product type and the LocalProductAttribute type */
  localAttributes?: Maybe<ProductToLocalProductAttributeConnection>
  /** Menu order */
  menuOrder?: Maybe<Scalars['Int']>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** Date product last updated */
  modified?: Maybe<Scalars['String']>
  /** Product name */
  name?: Maybe<Scalars['String']>
  /** Is product on sale? */
  onSale?: Maybe<Scalars['Boolean']>
  /** Connection between the Product type and the paColor type */
  paColors?: Maybe<ProductToPaColorConnection>
  /** Connection between the Product type and the paSize type */
  paSizes?: Maybe<ProductToPaSizeConnection>
  /** Parent product */
  parent?: Maybe<Product>
  /** Connection between the Product type and the productCategory type */
  productCategories?: Maybe<ProductToProductCategoryConnection>
  /** Connection between the Product type and the productTag type */
  productTags?: Maybe<ProductToProductTagConnection>
  /** Connection between the Product type and the productType type */
  productTypes?: Maybe<ProductToProductTypeConnection>
  /** Can product be purchased? */
  purchasable?: Maybe<Scalars['Boolean']>
  /** Purchase note */
  purchaseNote?: Maybe<Scalars['String']>
  /** Connection between the Product type and the Product type */
  related?: Maybe<ProductToProductConnection>
  /** Product review count */
  reviewCount?: Maybe<Scalars['Int']>
  /** Connection between the Product type and the Comment type */
  reviews?: Maybe<ProductToCommentConnection>
  /** If reviews are allowed */
  reviewsAllowed?: Maybe<Scalars['Boolean']>
  /** Connection between the Product type and the shippingClass type */
  shippingClasses?: Maybe<ProductToShippingClassConnection>
  /** Product short description */
  shortDescription?: Maybe<Scalars['String']>
  /** Product SKU */
  sku?: Maybe<Scalars['String']>
  /** Product slug */
  slug?: Maybe<Scalars['String']>
  /** Product status */
  status?: Maybe<Scalars['String']>
  /** Number total of sales */
  totalSales?: Maybe<Scalars['Int']>
  /** Product type */
  type?: Maybe<ProductTypesEnum>
  /** Connection between the Product type and the Product type */
  upsell?: Maybe<ProductToUpsellConnection>
  /** Connection between the Product type and the visibleProduct type */
  visibleProducts?: Maybe<ProductToVisibleProductConnection>
}

/** Product object */
export type ProductAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductAttributeConnectionWhereArgs>
}

/** Product object */
export type ProductDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** Product object */
export type ProductGalleryImagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToMediaItemConnectionWhereArgs>
}

/** Product object */
export type ProductGlobalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToGlobalProductAttributeConnectionWhereArgs>
}

/** Product object */
export type ProductLocalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToLocalProductAttributeConnectionWhereArgs>
}

/** Product object */
export type ProductMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** Product object */
export type ProductPaColorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaColorConnectionWhereArgs>
}

/** Product object */
export type ProductPaSizesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaSizeConnectionWhereArgs>
}

/** Product object */
export type ProductProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductCategoryConnectionWhereArgs>
}

/** Product object */
export type ProductProductTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTagConnectionWhereArgs>
}

/** Product object */
export type ProductProductTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTypeConnectionWhereArgs>
}

/** Product object */
export type ProductRelatedArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductConnectionWhereArgs>
}

/** Product object */
export type ProductReviewsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToCommentConnectionWhereArgs>
}

/** Product object */
export type ProductShippingClassesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToShippingClassConnectionWhereArgs>
}

/** Product object */
export type ProductShortDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** Product object */
export type ProductUpsellArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToUpsellConnectionWhereArgs>
}

/** Product object */
export type ProductVisibleProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToVisibleProductConnectionWhereArgs>
}

/** Product attribute object */
export type ProductAttribute = {
  /** Attribute ID */
  attributeId: Scalars['Int']
  /** Attribute Global ID */
  id: Scalars['ID']
  /** Attribute label */
  label: Scalars['String']
  /** Attribute name */
  name: Scalars['String']
  /** Attribute options */
  options?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Attribute position */
  position: Scalars['Int']
  /** Product attribute scope. */
  scope: ProductAttributeTypesEnum
  /** Is attribute on product variation */
  variation: Scalars['Boolean']
  /** Is attribute visible */
  visible: Scalars['Boolean']
}

/** Options for ordering the connection */
export type ProductAttributeInput = {
  attributeName: Scalars['String']
  attributeValue?: Maybe<Scalars['String']>
}

/** A simple product attribute object */
export type ProductAttributeOutput = {
  __typename?: 'ProductAttributeOutput'
  /** Attribute name. */
  attributeName?: Maybe<Scalars['String']>
  /** Attribute value. */
  attributeValue?: Maybe<Scalars['String']>
}

/** Product attribute type enumeration */
export enum ProductAttributeTypesEnum {
  /** A global product attribute */
  Global = 'GLOBAL',
  /** A local product attribute */
  Local = 'LOCAL',
}

/** The productCategory type */
export type ProductCategory = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier &
  HierarchicalTermNode &
  MenuItemLinkable & {
    __typename?: 'ProductCategory'
    /** The ancestors of the node. Default ordered as lowest (closest to the child) to highest (closest to the root). */
    ancestors?: Maybe<ProductCategoryToAncestorsProductCategoryConnection>
    /** Connection between the productCategory type and the productCategory type */
    children?: Maybe<ProductCategoryToProductCategoryConnection>
    /** Connection between the productCategory type and the ContentNode type */
    contentNodes?: Maybe<ProductCategoryToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Product category display type */
    display?: Maybe<ProductCategoryDisplay>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Product category image */
    image?: Maybe<MediaItem>
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** Product category menu order */
    menuOrder?: Maybe<Scalars['Int']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /** Connection between the productCategory type and the productCategory type */
    parent?: Maybe<ProductCategoryToParentProductCategoryConnectionEdge>
    /** Database id of the parent node */
    parentDatabaseId?: Maybe<Scalars['Int']>
    /** The globally unique identifier of the parent node. */
    parentId?: Maybe<Scalars['ID']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    productCategoryId?: Maybe<Scalars['Int']>
    /** Connection between the ProductCategory type and the Product type */
    products?: Maybe<ProductCategoryToProductConnection>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the productCategory type and the Taxonomy type */
    taxonomy?: Maybe<ProductCategoryToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The productCategory type */
export type ProductCategoryAncestorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The productCategory type */
export type ProductCategoryChildrenArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductCategoryToProductCategoryConnectionWhereArgs>
}

/** The productCategory type */
export type ProductCategoryContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductCategoryToContentNodeConnectionWhereArgs>
}

/** The productCategory type */
export type ProductCategoryEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The productCategory type */
export type ProductCategoryEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The productCategory type */
export type ProductCategoryProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductCategoryToProductConnectionWhereArgs>
}

/** Product category display type enumeration */
export enum ProductCategoryDisplay {
  /** Display both products and subcategories of this category. */
  Both = 'BOTH',
  /** Display default content connected to this category. */
  Default = 'DEFAULT',
  /** Display products associated with this category. */
  Products = 'PRODUCTS',
  /** Display subcategories of this category. */
  Subcategories = 'SUBCATEGORIES',
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ProductCategoryIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the productCategory type and the productCategory type */
export type ProductCategoryToAncestorsProductCategoryConnection = {
  __typename?: 'ProductCategoryToAncestorsProductCategoryConnection'
  /** Edges for the ProductCategoryToAncestorsProductCategoryConnection connection */
  edges?: Maybe<
    Array<Maybe<ProductCategoryToAncestorsProductCategoryConnectionEdge>>
  >
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductCategory>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductCategoryToAncestorsProductCategoryConnectionEdge = {
  __typename?: 'ProductCategoryToAncestorsProductCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductCategory>
}

/** Connection between the productCategory type and the ContentNode type */
export type ProductCategoryToContentNodeConnection = {
  __typename?: 'ProductCategoryToContentNodeConnection'
  /** Edges for the ProductCategoryToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<ProductCategoryToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductCategoryToContentNodeConnectionEdge = {
  __typename?: 'ProductCategoryToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the ProductCategoryToContentNodeConnection connection */
export type ProductCategoryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfProductCategoryEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the productCategory type and the productCategory type */
export type ProductCategoryToParentProductCategoryConnectionEdge = {
  __typename?: 'ProductCategoryToParentProductCategoryConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<ProductCategory>
}

/** Connection between the productCategory type and the productCategory type */
export type ProductCategoryToProductCategoryConnection = {
  __typename?: 'ProductCategoryToProductCategoryConnection'
  /** Edges for the ProductCategoryToProductCategoryConnection connection */
  edges?: Maybe<Array<Maybe<ProductCategoryToProductCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductCategory>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductCategoryToProductCategoryConnectionEdge = {
  __typename?: 'ProductCategoryToProductCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductCategory>
}

/** Arguments for filtering the ProductCategoryToProductCategoryConnection connection */
export type ProductCategoryToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the ProductCategory type and the Product type */
export type ProductCategoryToProductConnection = {
  __typename?: 'ProductCategoryToProductConnection'
  /** Edges for the ProductCategoryToProductConnection connection */
  edges?: Maybe<Array<Maybe<ProductCategoryToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductCategoryToProductConnectionEdge = {
  __typename?: 'ProductCategoryToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the ProductCategoryToProductConnection connection */
export type ProductCategoryToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the productCategory type and the Taxonomy type */
export type ProductCategoryToTaxonomyConnectionEdge = {
  __typename?: 'ProductCategoryToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** A product object */
export type ProductDownload = {
  __typename?: 'ProductDownload'
  /** Is file allowed */
  allowedFileType?: Maybe<Scalars['Boolean']>
  /** Product download ID */
  downloadId: Scalars['String']
  /** Download file */
  file?: Maybe<Scalars['String']>
  /** Validate file exists */
  fileExists?: Maybe<Scalars['Boolean']>
  /** File extension */
  fileExt?: Maybe<Scalars['String']>
  /** Type of file path set */
  filePathType?: Maybe<Scalars['String']>
  /** File type */
  fileType?: Maybe<Scalars['String']>
  /** Product download name */
  name?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single Product. Default is ID. */
export enum ProductIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
  /** Unique store identifier for product. */
  Sku = 'SKU',
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  Slug = 'SLUG',
}

/** The productTag type */
export type ProductTag = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier &
  MenuItemLinkable & {
    __typename?: 'ProductTag'
    /** Connection between the productTag type and the ContentNode type */
    contentNodes?: Maybe<ProductTagToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    productTagId?: Maybe<Scalars['Int']>
    /** Connection between the ProductTag type and the Product type */
    products?: Maybe<ProductTagToProductConnection>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the productTag type and the Taxonomy type */
    taxonomy?: Maybe<ProductTagToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The productTag type */
export type ProductTagContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductTagToContentNodeConnectionWhereArgs>
}

/** The productTag type */
export type ProductTagEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The productTag type */
export type ProductTagEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The productTag type */
export type ProductTagProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductTagToProductConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ProductTagIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the productTag type and the ContentNode type */
export type ProductTagToContentNodeConnection = {
  __typename?: 'ProductTagToContentNodeConnection'
  /** Edges for the ProductTagToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<ProductTagToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductTagToContentNodeConnectionEdge = {
  __typename?: 'ProductTagToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the ProductTagToContentNodeConnection connection */
export type ProductTagToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfProductTagEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the ProductTag type and the Product type */
export type ProductTagToProductConnection = {
  __typename?: 'ProductTagToProductConnection'
  /** Edges for the ProductTagToProductConnection connection */
  edges?: Maybe<Array<Maybe<ProductTagToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductTagToProductConnectionEdge = {
  __typename?: 'ProductTagToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the ProductTagToProductConnection connection */
export type ProductTagToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the productTag type and the Taxonomy type */
export type ProductTagToTaxonomyConnectionEdge = {
  __typename?: 'ProductTagToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** Product taxonomies */
export enum ProductTaxonomyEnum {
  Pacolor = 'PACOLOR',
  Pasize = 'PASIZE',
  Productcategory = 'PRODUCTCATEGORY',
  Producttag = 'PRODUCTTAG',
  Producttype = 'PRODUCTTYPE',
  Shippingclass = 'SHIPPINGCLASS',
  Visibleproduct = 'VISIBLEPRODUCT',
}

/** Product filter */
export type ProductTaxonomyFilterInput = {
  /** A list of term ids */
  ids?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Filter operation type */
  operator?: Maybe<TaxonomyOperatorEnum>
  /** Which field to select taxonomy term by. */
  taxonomy: ProductTaxonomyEnum
  /** A list of term slugs */
  terms?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Product taxonomy filter type */
export type ProductTaxonomyInput = {
  /** Product taxonomy rules to be filter results by */
  filters?: Maybe<Array<Maybe<ProductTaxonomyFilterInput>>>
  /** Logic relation between each filter. */
  relation?: Maybe<RelationEnum>
}

/** Connection between the Product type and the Comment type */
export type ProductToCommentConnection = {
  __typename?: 'ProductToCommentConnection'
  /** Average review rating for this product. */
  averageRating?: Maybe<Scalars['Float']>
  /** Edges for the ProductToCommentConnection connection */
  edges?: Maybe<Array<Maybe<ProductToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToCommentConnectionEdge = {
  __typename?: 'ProductToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
  /** Review rating */
  rating?: Maybe<Scalars['Float']>
}

/** Arguments for filtering the ProductToCommentConnection connection */
export type ProductToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Connection between the Product type and the GlobalProductAttribute type */
export type ProductToGlobalProductAttributeConnection = {
  __typename?: 'ProductToGlobalProductAttributeConnection'
  /** Edges for the ProductToGlobalProductAttributeConnection connection */
  edges?: Maybe<Array<Maybe<ProductToGlobalProductAttributeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<GlobalProductAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToGlobalProductAttributeConnectionEdge = {
  __typename?: 'ProductToGlobalProductAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<GlobalProductAttribute>
}

/** Arguments for filtering the ProductToGlobalProductAttributeConnection connection */
export type ProductToGlobalProductAttributeConnectionWhereArgs = {
  /** Filter results by attribute scope. */
  type?: Maybe<ProductAttributeTypesEnum>
}

/** Connection between the Product type and the LocalProductAttribute type */
export type ProductToLocalProductAttributeConnection = {
  __typename?: 'ProductToLocalProductAttributeConnection'
  /** Edges for the ProductToLocalProductAttributeConnection connection */
  edges?: Maybe<Array<Maybe<ProductToLocalProductAttributeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<LocalProductAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToLocalProductAttributeConnectionEdge = {
  __typename?: 'ProductToLocalProductAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<LocalProductAttribute>
}

/** Arguments for filtering the ProductToLocalProductAttributeConnection connection */
export type ProductToLocalProductAttributeConnectionWhereArgs = {
  /** Filter results by attribute scope. */
  type?: Maybe<ProductAttributeTypesEnum>
}

/** Connection between the Product type and the MediaItem type */
export type ProductToMediaItemConnection = {
  __typename?: 'ProductToMediaItemConnection'
  /** Edges for the ProductToMediaItemConnection connection */
  edges?: Maybe<Array<Maybe<ProductToMediaItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MediaItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToMediaItemConnectionEdge = {
  __typename?: 'ProductToMediaItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<MediaItem>
}

/** Arguments for filtering the ProductToMediaItemConnection connection */
export type ProductToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the Product type and the paColor type */
export type ProductToPaColorConnection = {
  __typename?: 'ProductToPaColorConnection'
  /** Edges for the ProductToPaColorConnection connection */
  edges?: Maybe<Array<Maybe<ProductToPaColorConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PaColor>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToPaColorConnectionEdge = {
  __typename?: 'ProductToPaColorConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<PaColor>
}

/** Arguments for filtering the ProductToPaColorConnection connection */
export type ProductToPaColorConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Product type and the paSize type */
export type ProductToPaSizeConnection = {
  __typename?: 'ProductToPaSizeConnection'
  /** Edges for the ProductToPaSizeConnection connection */
  edges?: Maybe<Array<Maybe<ProductToPaSizeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PaSize>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToPaSizeConnectionEdge = {
  __typename?: 'ProductToPaSizeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<PaSize>
}

/** Arguments for filtering the ProductToPaSizeConnection connection */
export type ProductToPaSizeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Product type and the ProductAttribute type */
export type ProductToProductAttributeConnection = {
  __typename?: 'ProductToProductAttributeConnection'
  /** Edges for the ProductToProductAttributeConnection connection */
  edges?: Maybe<Array<Maybe<ProductToProductAttributeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToProductAttributeConnectionEdge = {
  __typename?: 'ProductToProductAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductAttribute>
}

/** Arguments for filtering the ProductToProductAttributeConnection connection */
export type ProductToProductAttributeConnectionWhereArgs = {
  /** Filter results by attribute scope. */
  type?: Maybe<ProductAttributeTypesEnum>
}

/** Connection between the Product type and the productCategory type */
export type ProductToProductCategoryConnection = {
  __typename?: 'ProductToProductCategoryConnection'
  /** Edges for the ProductToProductCategoryConnection connection */
  edges?: Maybe<Array<Maybe<ProductToProductCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductCategory>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToProductCategoryConnectionEdge = {
  __typename?: 'ProductToProductCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductCategory>
}

/** Arguments for filtering the ProductToProductCategoryConnection connection */
export type ProductToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Product type and the Product type */
export type ProductToProductConnection = {
  __typename?: 'ProductToProductConnection'
  /** Edges for the ProductToProductConnection connection */
  edges?: Maybe<Array<Maybe<ProductToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToProductConnectionEdge = {
  __typename?: 'ProductToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the ProductToProductConnection connection */
export type ProductToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Shuffle results? (Pagination currently not support by this argument) */
  shuffle?: Maybe<Scalars['Boolean']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the Product type and the productTag type */
export type ProductToProductTagConnection = {
  __typename?: 'ProductToProductTagConnection'
  /** Edges for the ProductToProductTagConnection connection */
  edges?: Maybe<Array<Maybe<ProductToProductTagConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductTag>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToProductTagConnectionEdge = {
  __typename?: 'ProductToProductTagConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductTag>
}

/** Arguments for filtering the ProductToProductTagConnection connection */
export type ProductToProductTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Product type and the productType type */
export type ProductToProductTypeConnection = {
  __typename?: 'ProductToProductTypeConnection'
  /** Edges for the ProductToProductTypeConnection connection */
  edges?: Maybe<Array<Maybe<ProductToProductTypeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductType>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToProductTypeConnectionEdge = {
  __typename?: 'ProductToProductTypeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductType>
}

/** Arguments for filtering the ProductToProductTypeConnection connection */
export type ProductToProductTypeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Product type and the shippingClass type */
export type ProductToShippingClassConnection = {
  __typename?: 'ProductToShippingClassConnection'
  /** Edges for the ProductToShippingClassConnection connection */
  edges?: Maybe<Array<Maybe<ProductToShippingClassConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ShippingClass>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToShippingClassConnectionEdge = {
  __typename?: 'ProductToShippingClassConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ShippingClass>
}

/** Arguments for filtering the ProductToShippingClassConnection connection */
export type ProductToShippingClassConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the Product type and the Product type */
export type ProductToUpsellConnection = {
  __typename?: 'ProductToUpsellConnection'
  /** Edges for the ProductToUpsellConnection connection */
  edges?: Maybe<Array<Maybe<ProductToUpsellConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToUpsellConnectionEdge = {
  __typename?: 'ProductToUpsellConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the ProductToUpsellConnection connection */
export type ProductToUpsellConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the Product type and the visibleProduct type */
export type ProductToVisibleProductConnection = {
  __typename?: 'ProductToVisibleProductConnection'
  /** Edges for the ProductToVisibleProductConnection connection */
  edges?: Maybe<Array<Maybe<ProductToVisibleProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VisibleProduct>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductToVisibleProductConnectionEdge = {
  __typename?: 'ProductToVisibleProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VisibleProduct>
}

/** Arguments for filtering the ProductToVisibleProductConnection connection */
export type ProductToVisibleProductConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** The productType type */
export type ProductType = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'ProductType'
    /** Connection between the productType type and the ContentNode type */
    contentNodes?: Maybe<ProductTypeToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    productTypeId?: Maybe<Scalars['Int']>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the productType type and the Taxonomy type */
    taxonomy?: Maybe<ProductTypeToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The productType type */
export type ProductTypeContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductTypeToContentNodeConnectionWhereArgs>
}

/** The productType type */
export type ProductTypeEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The productType type */
export type ProductTypeEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ProductTypeIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the productType type and the ContentNode type */
export type ProductTypeToContentNodeConnection = {
  __typename?: 'ProductTypeToContentNodeConnection'
  /** Edges for the ProductTypeToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<ProductTypeToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductTypeToContentNodeConnectionEdge = {
  __typename?: 'ProductTypeToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the ProductTypeToContentNodeConnection connection */
export type ProductTypeToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfProductTypeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the productType type and the Taxonomy type */
export type ProductTypeToTaxonomyConnectionEdge = {
  __typename?: 'ProductTypeToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** Product type enumeration */
export enum ProductTypesEnum {
  /** An external product */
  External = 'EXTERNAL',
  /** A product group */
  Grouped = 'GROUPED',
  /** A simple product */
  Simple = 'SIMPLE',
  /** A variable product */
  Variable = 'VARIABLE',
  /** A product variation */
  Variation = 'VARIATION',
}

/** A product variation object */
export type ProductVariation = Node &
  NodeWithFeaturedImage &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'ProductVariation'
    /** Connection between the ProductVariation type and the VariationAttribute type */
    attributes?: Maybe<ProductVariationToVariationAttributeConnection>
    /** Product variation backorders */
    backorders?: Maybe<BackordersEnum>
    /** Can product be backordered? */
    backordersAllowed?: Maybe<Scalars['Boolean']>
    /** Product variation catalog visibility */
    catalogVisibility?: Maybe<CatalogVisibilityEnum>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** The ID of the refund in the database */
    databaseId: Scalars['Int']
    /** Date variation created */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** Date on sale from */
    dateOnSaleFrom?: Maybe<Scalars['String']>
    /** Date on sale to */
    dateOnSaleTo?: Maybe<Scalars['String']>
    /** Product description */
    description?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** Download expiry */
    downloadExpiry?: Maybe<Scalars['Int']>
    /** Download limit */
    downloadLimit?: Maybe<Scalars['Int']>
    /** Is downloadable? */
    downloadable?: Maybe<Scalars['Boolean']>
    /** Product downloads */
    downloads?: Maybe<Array<Maybe<ProductDownload>>>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** Does product variation have any visible attributes */
    hasAttributes?: Maybe<Scalars['Boolean']>
    /** Product variation height */
    height?: Maybe<Scalars['String']>
    /** The globally unique identifier for the product variation */
    id: Scalars['ID']
    /** Product variation main image */
    image?: Maybe<MediaItem>
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** Product variation length */
    length?: Maybe<Scalars['String']>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** if/how product variation stock is managed */
    manageStock?: Maybe<ManageStockEnum>
    /** Menu order */
    menuOrder?: Maybe<Scalars['Int']>
    /** Object meta data */
    metaData?: Maybe<Array<Maybe<MetaData>>>
    /** Date variation last updated */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /** Product name */
    name?: Maybe<Scalars['String']>
    /** Is variation on sale? */
    onSale?: Maybe<Scalars['Boolean']>
    /** The parent of the node. The parent object can be of various types */
    parent?: Maybe<ProductVariationToVariableProductConnectionEdge>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** Product variation&#039;s active price */
    price?: Maybe<Scalars['String']>
    /** If product variation can be bought */
    purchasable?: Maybe<Scalars['Boolean']>
    /** Product variation purchase_note */
    purchaseNote?: Maybe<Scalars['String']>
    /** Product variation&#039;s regular price */
    regularPrice?: Maybe<Scalars['String']>
    /** Product variation&#039;s sale price */
    salePrice?: Maybe<Scalars['String']>
    /** Product variation shipping class */
    shippingClass?: Maybe<Scalars['String']>
    /** Connection between the ProductVariation type and the shippingClass type */
    shippingClasses?: Maybe<ProductVariationToShippingClassConnection>
    /** Product variation SKU (Stock-keeping unit) */
    sku?: Maybe<Scalars['String']>
    /** The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name field and the post_name column in the database for the &quot;post_objects&quot; table. */
    slug?: Maybe<Scalars['String']>
    /** Variation status */
    status?: Maybe<Scalars['String']>
    /** Product variation stock quantity */
    stockQuantity?: Maybe<Scalars['Int']>
    /** Product stock status */
    stockStatus?: Maybe<StockStatusEnum>
    /** Product variation tax class */
    taxClass?: Maybe<TaxClassEnum>
    /** Tax status */
    taxStatus?: Maybe<TaxStatusEnum>
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>
    /** Product type */
    type?: Maybe<ProductTypesEnum>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** Is product virtual? */
    virtual?: Maybe<Scalars['Boolean']>
    /** Connection between the ProductVariation type and the visibleProduct type */
    visibleProducts?: Maybe<ProductVariationToVisibleProductConnection>
    /** Product variation weight */
    weight?: Maybe<Scalars['String']>
    /** Product variation width */
    width?: Maybe<Scalars['String']>
  }

/** A product variation object */
export type ProductVariationAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A product variation object */
export type ProductVariationEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A product variation object */
export type ProductVariationEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A product variation object */
export type ProductVariationMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A product variation object */
export type ProductVariationPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A product variation object */
export type ProductVariationRegularPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A product variation object */
export type ProductVariationSalePriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A product variation object */
export type ProductVariationShippingClassesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductVariationToShippingClassConnectionWhereArgs>
}

/** A product variation object */
export type ProductVariationVisibleProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductVariationToVisibleProductConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single ProductVariation. Default is ID. */
export enum ProductVariationIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** Connection between the ProductVariation type and the shippingClass type */
export type ProductVariationToShippingClassConnection = {
  __typename?: 'ProductVariationToShippingClassConnection'
  /** Edges for the ProductVariationToShippingClassConnection connection */
  edges?: Maybe<Array<Maybe<ProductVariationToShippingClassConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ShippingClass>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductVariationToShippingClassConnectionEdge = {
  __typename?: 'ProductVariationToShippingClassConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ShippingClass>
}

/** Arguments for filtering the ProductVariationToShippingClassConnection connection */
export type ProductVariationToShippingClassConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the ProductVariation type and the VariableProduct type */
export type ProductVariationToVariableProductConnectionEdge = {
  __typename?: 'ProductVariationToVariableProductConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<VariableProduct>
}

/** Connection between the ProductVariation type and the VariationAttribute type */
export type ProductVariationToVariationAttributeConnection = {
  __typename?: 'ProductVariationToVariationAttributeConnection'
  /** Edges for the ProductVariationToVariationAttributeConnection connection */
  edges?: Maybe<
    Array<Maybe<ProductVariationToVariationAttributeConnectionEdge>>
  >
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VariationAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductVariationToVariationAttributeConnectionEdge = {
  __typename?: 'ProductVariationToVariationAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VariationAttribute>
}

/** Connection between the ProductVariation type and the visibleProduct type */
export type ProductVariationToVisibleProductConnection = {
  __typename?: 'ProductVariationToVisibleProductConnection'
  /** Edges for the ProductVariationToVisibleProductConnection connection */
  edges?: Maybe<Array<Maybe<ProductVariationToVisibleProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VisibleProduct>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ProductVariationToVisibleProductConnectionEdge = {
  __typename?: 'ProductVariationToVisibleProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VisibleProduct>
}

/** Arguments for filtering the ProductVariationToVisibleProductConnection connection */
export type ProductVariationToVisibleProductConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Fields to order the Products connection by */
export enum ProductsOrderByEnum {
  /** Order by publish date */
  Date = 'DATE',
  /** Preserve the ID order given in the IN array */
  In = 'IN',
  /** Order by the menu order value */
  MenuOrder = 'MENU_ORDER',
  /** Order by last modified date */
  Modified = 'MODIFIED',
  /** Preserve slug order given in the NAME_IN array */
  NameIn = 'NAME_IN',
  /** Order by date product sale starts */
  OnSaleFrom = 'ON_SALE_FROM',
  /** Order by date product sale ends */
  OnSaleTo = 'ON_SALE_TO',
  /** Order by parent ID */
  Parent = 'PARENT',
  /** Order by product's current price */
  Price = 'PRICE',
  /** Order by product average rating */
  Rating = 'RATING',
  /** Order by product's regular price */
  RegularPrice = 'REGULAR_PRICE',
  /** Order by number of reviews on product */
  ReviewCount = 'REVIEW_COUNT',
  /** Order by product's sale price */
  SalePrice = 'SALE_PRICE',
  /** Order by slug */
  Slug = 'SLUG',
  /** Order by total sales of products sold */
  TotalSales = 'TOTAL_SALES',
}

/** Options for ordering the connection */
export type ProductsOrderbyInput = {
  field: ProductsOrderByEnum
  order?: Maybe<OrderEnum>
}

/** The reading setting type */
export type ReadingSettings = {
  __typename?: 'ReadingSettings'
  /** Blog pages show at most. */
  postsPerPage?: Maybe<Scalars['Int']>
}

/** Input for the refreshJwtAuthToken mutation */
export type RefreshJwtAuthTokenInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** A valid, previously issued JWT refresh token. If valid a new Auth token will be provided. If invalid, expired, revoked or otherwise invalid, a new AuthToken will not be provided. */
  jwtRefreshToken: Scalars['String']
}

/** The payload for the refreshJwtAuthToken mutation */
export type RefreshJwtAuthTokenPayload = {
  __typename?: 'RefreshJwtAuthTokenPayload'
  /** JWT Token that can be used in future requests for Authentication */
  authToken?: Maybe<Scalars['String']>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** A refund object */
export type Refund = Node & {
  __typename?: 'Refund'
  /** Refunded amount */
  amount?: Maybe<Scalars['Float']>
  /** The ID of the refund in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** The date of the refund */
  date?: Maybe<Scalars['String']>
  /** The globally unique identifier for the refund */
  id: Scalars['ID']
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** Reason for refund */
  reason?: Maybe<Scalars['String']>
  /** User who completed the refund */
  refundedBy?: Maybe<User>
  /** A title for the new post type */
  title?: Maybe<Scalars['String']>
}

/** A refund object */
export type RefundMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** The Type of Identifier used to fetch a single Refund. Default is ID. */
export enum RefundIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** Input for the registerCustomer mutation */
export type RegisterCustomerInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>
  /** Customer billing information */
  billing?: Maybe<CustomerAddressInput>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>
  /** User's locale. */
  locale?: Maybe<Scalars['String']>
  /** Meta data. */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>
  /** Customer shipping address */
  shipping?: Maybe<CustomerAddressInput>
  /** Customer shipping is identical to billing address */
  shippingSameAsBilling?: Maybe<Scalars['Boolean']>
  /** A string that contains the user's username. */
  username?: Maybe<Scalars['String']>
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>
}

/** The payload for the registerCustomer mutation */
export type RegisterCustomerPayload = {
  __typename?: 'RegisterCustomerPayload'
  /** JWT Token that can be used in future requests for Authentication */
  authToken?: Maybe<Scalars['String']>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  customer?: Maybe<Customer>
  /** A JWT token that can be used in future requests to get a refreshed jwtAuthToken. If the refresh token used in a request is revoked or otherwise invalid, a valid Auth token will NOT be issued in the response headers. */
  refreshToken?: Maybe<Scalars['String']>
  viewer?: Maybe<User>
}

/** Input for the registerUser mutation */
export type RegisterUserInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>
  /** User's locale. */
  locale?: Maybe<Scalars['String']>
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: Maybe<Scalars['Boolean']>
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: Maybe<Scalars['Boolean']>
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>
  /** A string that contains the user's username. */
  username: Scalars['String']
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>
}

/** The payload for the registerUser mutation */
export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The User object mutation type. */
  user?: Maybe<User>
}

/** The logical relation between each item in the array when there are more than one. */
export enum RelationEnum {
  /** The logical AND condition returns true if both operands are true, otherwise, it returns false. */
  And = 'AND',
  /** The logical OR condition returns false if both operands are false, otherwise, it returns true. */
  Or = 'OR',
}

/** Input for the removeCoupons mutation */
export type RemoveCouponsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Code of coupon being applied */
  codes?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The payload for the removeCoupons mutation */
export type RemoveCouponsPayload = {
  __typename?: 'RemoveCouponsPayload'
  cart?: Maybe<Cart>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the removeItemsFromCart mutation */
export type RemoveItemsFromCartInput = {
  /** Remove all cart items */
  all?: Maybe<Scalars['Boolean']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Item keys of the items being removed */
  keys?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/** The payload for the removeItemsFromCart mutation */
export type RemoveItemsFromCartPayload = {
  __typename?: 'RemoveItemsFromCartPayload'
  cart?: Maybe<Cart>
  cartItems?: Maybe<Array<Maybe<CartItem>>>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the resetUserPassword mutation */
export type ResetUserPasswordInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Password reset key */
  key?: Maybe<Scalars['String']>
  /** The user's login (username). */
  login?: Maybe<Scalars['String']>
  /** The new password. */
  password?: Maybe<Scalars['String']>
}

/** The payload for the resetUserPassword mutation */
export type ResetUserPasswordPayload = {
  __typename?: 'ResetUserPasswordPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The User object mutation type. */
  user?: Maybe<User>
}

/** Input for the restoreCartItems mutation */
export type RestoreCartItemsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Cart item key of the item being removed */
  keys?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/** The payload for the restoreCartItems mutation */
export type RestoreCartItemsPayload = {
  __typename?: 'RestoreCartItemsPayload'
  cart?: Maybe<Cart>
  cartItems?: Maybe<Array<Maybe<CartItem>>>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the restoreComment mutation */
export type RestoreCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the comment to be restored */
  id: Scalars['ID']
}

/** The payload for the restoreComment mutation */
export type RestoreCommentPayload = {
  __typename?: 'RestoreCommentPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The restored comment object */
  comment?: Maybe<Comment>
  /** The ID of the restored comment */
  restoredId?: Maybe<Scalars['ID']>
}

/** Input for the restoreReview mutation */
export type RestoreReviewInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the target product review */
  id: Scalars['ID']
}

/** The payload for the restoreReview mutation */
export type RestoreReviewPayload = {
  __typename?: 'RestoreReviewPayload'
  /** The affected product review ID */
  affectedId?: Maybe<Scalars['ID']>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The product rating of the affected product review */
  rating?: Maybe<Scalars['Float']>
  /** The affected product review */
  review?: Maybe<Comment>
}

/** The root mutation */
export type RootMutation = {
  __typename?: 'RootMutation'
  /** The payload for the addCartItems mutation */
  addCartItems?: Maybe<AddCartItemsPayload>
  /** The payload for the addFee mutation */
  addFee?: Maybe<AddFeePayload>
  /** The payload for the addToCart mutation */
  addToCart?: Maybe<AddToCartPayload>
  /** The payload for the applyCoupon mutation */
  applyCoupon?: Maybe<ApplyCouponPayload>
  /** The payload for the checkout mutation */
  checkout?: Maybe<CheckoutPayload>
  /** The payload for the createCategory mutation */
  createCategory?: Maybe<CreateCategoryPayload>
  /** The payload for the createComment mutation */
  createComment?: Maybe<CreateCommentPayload>
  /** The payload for the createCoupon mutation */
  createCoupon?: Maybe<CreateCouponPayload>
  /** The payload for the createMediaItem mutation */
  createMediaItem?: Maybe<CreateMediaItemPayload>
  /** The payload for the createOrder mutation */
  createOrder?: Maybe<CreateOrderPayload>
  /** The payload for the createPaColor mutation */
  createPaColor?: Maybe<CreatePaColorPayload>
  /** The payload for the createPaSize mutation */
  createPaSize?: Maybe<CreatePaSizePayload>
  /** The payload for the createPage mutation */
  createPage?: Maybe<CreatePagePayload>
  /** The payload for the createPost mutation */
  createPost?: Maybe<CreatePostPayload>
  /** The payload for the createPostFormat mutation */
  createPostFormat?: Maybe<CreatePostFormatPayload>
  /** The payload for the createProductCategory mutation */
  createProductCategory?: Maybe<CreateProductCategoryPayload>
  /** The payload for the createProductTag mutation */
  createProductTag?: Maybe<CreateProductTagPayload>
  /** The payload for the createProductType mutation */
  createProductType?: Maybe<CreateProductTypePayload>
  /** The payload for the createShippingClass mutation */
  createShippingClass?: Maybe<CreateShippingClassPayload>
  /** The payload for the createTag mutation */
  createTag?: Maybe<CreateTagPayload>
  /** The payload for the createUser mutation */
  createUser?: Maybe<CreateUserPayload>
  /** The payload for the createVisibleProduct mutation */
  createVisibleProduct?: Maybe<CreateVisibleProductPayload>
  /** The payload for the deleteCategory mutation */
  deleteCategory?: Maybe<DeleteCategoryPayload>
  /** The payload for the deleteComment mutation */
  deleteComment?: Maybe<DeleteCommentPayload>
  /** The payload for the deleteCoupon mutation */
  deleteCoupon?: Maybe<DeleteCouponPayload>
  /** The payload for the deleteMediaItem mutation */
  deleteMediaItem?: Maybe<DeleteMediaItemPayload>
  /** The payload for the deleteOrder mutation */
  deleteOrder?: Maybe<DeleteOrderPayload>
  /** The payload for the deleteOrderItems mutation */
  deleteOrderItems?: Maybe<DeleteOrderItemsPayload>
  /** The payload for the deletePaColor mutation */
  deletePaColor?: Maybe<DeletePaColorPayload>
  /** The payload for the deletePaSize mutation */
  deletePaSize?: Maybe<DeletePaSizePayload>
  /** The payload for the deletePage mutation */
  deletePage?: Maybe<DeletePagePayload>
  /** The payload for the deletePost mutation */
  deletePost?: Maybe<DeletePostPayload>
  /** The payload for the deletePostFormat mutation */
  deletePostFormat?: Maybe<DeletePostFormatPayload>
  /** The payload for the deleteProductCategory mutation */
  deleteProductCategory?: Maybe<DeleteProductCategoryPayload>
  /** The payload for the deleteProductTag mutation */
  deleteProductTag?: Maybe<DeleteProductTagPayload>
  /** The payload for the deleteProductType mutation */
  deleteProductType?: Maybe<DeleteProductTypePayload>
  /** The payload for the deleteReview mutation */
  deleteReview?: Maybe<DeleteReviewPayload>
  /** The payload for the deleteShippingClass mutation */
  deleteShippingClass?: Maybe<DeleteShippingClassPayload>
  /** The payload for the deleteTag mutation */
  deleteTag?: Maybe<DeleteTagPayload>
  /** The payload for the deleteUser mutation */
  deleteUser?: Maybe<DeleteUserPayload>
  /** The payload for the deleteVisibleProduct mutation */
  deleteVisibleProduct?: Maybe<DeleteVisibleProductPayload>
  /** The payload for the emptyCart mutation */
  emptyCart?: Maybe<EmptyCartPayload>
  /** The payload for the fillCart mutation */
  fillCart?: Maybe<FillCartPayload>
  /** Increase the count. */
  increaseCount?: Maybe<Scalars['Int']>
  /** The payload for the login mutation */
  login?: Maybe<LoginPayload>
  /** The payload for the refreshJwtAuthToken mutation */
  refreshJwtAuthToken?: Maybe<RefreshJwtAuthTokenPayload>
  /** The payload for the registerCustomer mutation */
  registerCustomer?: Maybe<RegisterCustomerPayload>
  /** The payload for the registerUser mutation */
  registerUser?: Maybe<RegisterUserPayload>
  /** The payload for the removeCoupons mutation */
  removeCoupons?: Maybe<RemoveCouponsPayload>
  /** The payload for the removeItemsFromCart mutation */
  removeItemsFromCart?: Maybe<RemoveItemsFromCartPayload>
  /** The payload for the resetUserPassword mutation */
  resetUserPassword?: Maybe<ResetUserPasswordPayload>
  /** The payload for the restoreCartItems mutation */
  restoreCartItems?: Maybe<RestoreCartItemsPayload>
  /** The payload for the restoreComment mutation */
  restoreComment?: Maybe<RestoreCommentPayload>
  /** The payload for the restoreReview mutation */
  restoreReview?: Maybe<RestoreReviewPayload>
  /** The payload for the sendPasswordResetEmail mutation */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmailPayload>
  /** The payload for the UpdateCategory mutation */
  updateCategory?: Maybe<UpdateCategoryPayload>
  /** The payload for the updateComment mutation */
  updateComment?: Maybe<UpdateCommentPayload>
  /** The payload for the updateCoupon mutation */
  updateCoupon?: Maybe<UpdateCouponPayload>
  /** The payload for the updateCustomer mutation */
  updateCustomer?: Maybe<UpdateCustomerPayload>
  /** The payload for the updateItemQuantities mutation */
  updateItemQuantities?: Maybe<UpdateItemQuantitiesPayload>
  /** The payload for the updateMediaItem mutation */
  updateMediaItem?: Maybe<UpdateMediaItemPayload>
  /** The payload for the updateOrder mutation */
  updateOrder?: Maybe<UpdateOrderPayload>
  /** The payload for the UpdatePaColor mutation */
  updatePaColor?: Maybe<UpdatePaColorPayload>
  /** The payload for the UpdatePaSize mutation */
  updatePaSize?: Maybe<UpdatePaSizePayload>
  /** The payload for the updatePage mutation */
  updatePage?: Maybe<UpdatePagePayload>
  /** The payload for the updatePost mutation */
  updatePost?: Maybe<UpdatePostPayload>
  /** The payload for the UpdatePostFormat mutation */
  updatePostFormat?: Maybe<UpdatePostFormatPayload>
  /** The payload for the UpdateProductCategory mutation */
  updateProductCategory?: Maybe<UpdateProductCategoryPayload>
  /** The payload for the UpdateProductTag mutation */
  updateProductTag?: Maybe<UpdateProductTagPayload>
  /** The payload for the UpdateProductType mutation */
  updateProductType?: Maybe<UpdateProductTypePayload>
  /** The payload for the updateReview mutation */
  updateReview?: Maybe<UpdateReviewPayload>
  /** The payload for the updateSettings mutation */
  updateSettings?: Maybe<UpdateSettingsPayload>
  /** The payload for the UpdateShippingClass mutation */
  updateShippingClass?: Maybe<UpdateShippingClassPayload>
  /** The payload for the updateShippingMethod mutation */
  updateShippingMethod?: Maybe<UpdateShippingMethodPayload>
  /** The payload for the UpdateTag mutation */
  updateTag?: Maybe<UpdateTagPayload>
  /** The payload for the updateUser mutation */
  updateUser?: Maybe<UpdateUserPayload>
  /** The payload for the UpdateVisibleProduct mutation */
  updateVisibleProduct?: Maybe<UpdateVisibleProductPayload>
  /** The payload for the writeReview mutation */
  writeReview?: Maybe<WriteReviewPayload>
}

/** The root mutation */
export type RootMutationAddCartItemsArgs = {
  input: AddCartItemsInput
}

/** The root mutation */
export type RootMutationAddFeeArgs = {
  input: AddFeeInput
}

/** The root mutation */
export type RootMutationAddToCartArgs = {
  input: AddToCartInput
}

/** The root mutation */
export type RootMutationApplyCouponArgs = {
  input: ApplyCouponInput
}

/** The root mutation */
export type RootMutationCheckoutArgs = {
  input: CheckoutInput
}

/** The root mutation */
export type RootMutationCreateCategoryArgs = {
  input: CreateCategoryInput
}

/** The root mutation */
export type RootMutationCreateCommentArgs = {
  input: CreateCommentInput
}

/** The root mutation */
export type RootMutationCreateCouponArgs = {
  input: CreateCouponInput
}

/** The root mutation */
export type RootMutationCreateMediaItemArgs = {
  input: CreateMediaItemInput
}

/** The root mutation */
export type RootMutationCreateOrderArgs = {
  input: CreateOrderInput
}

/** The root mutation */
export type RootMutationCreatePaColorArgs = {
  input: CreatePaColorInput
}

/** The root mutation */
export type RootMutationCreatePaSizeArgs = {
  input: CreatePaSizeInput
}

/** The root mutation */
export type RootMutationCreatePageArgs = {
  input: CreatePageInput
}

/** The root mutation */
export type RootMutationCreatePostArgs = {
  input: CreatePostInput
}

/** The root mutation */
export type RootMutationCreatePostFormatArgs = {
  input: CreatePostFormatInput
}

/** The root mutation */
export type RootMutationCreateProductCategoryArgs = {
  input: CreateProductCategoryInput
}

/** The root mutation */
export type RootMutationCreateProductTagArgs = {
  input: CreateProductTagInput
}

/** The root mutation */
export type RootMutationCreateProductTypeArgs = {
  input: CreateProductTypeInput
}

/** The root mutation */
export type RootMutationCreateShippingClassArgs = {
  input: CreateShippingClassInput
}

/** The root mutation */
export type RootMutationCreateTagArgs = {
  input: CreateTagInput
}

/** The root mutation */
export type RootMutationCreateUserArgs = {
  input: CreateUserInput
}

/** The root mutation */
export type RootMutationCreateVisibleProductArgs = {
  input: CreateVisibleProductInput
}

/** The root mutation */
export type RootMutationDeleteCategoryArgs = {
  input: DeleteCategoryInput
}

/** The root mutation */
export type RootMutationDeleteCommentArgs = {
  input: DeleteCommentInput
}

/** The root mutation */
export type RootMutationDeleteCouponArgs = {
  input: DeleteCouponInput
}

/** The root mutation */
export type RootMutationDeleteMediaItemArgs = {
  input: DeleteMediaItemInput
}

/** The root mutation */
export type RootMutationDeleteOrderArgs = {
  input: DeleteOrderInput
}

/** The root mutation */
export type RootMutationDeleteOrderItemsArgs = {
  input: DeleteOrderItemsInput
}

/** The root mutation */
export type RootMutationDeletePaColorArgs = {
  input: DeletePaColorInput
}

/** The root mutation */
export type RootMutationDeletePaSizeArgs = {
  input: DeletePaSizeInput
}

/** The root mutation */
export type RootMutationDeletePageArgs = {
  input: DeletePageInput
}

/** The root mutation */
export type RootMutationDeletePostArgs = {
  input: DeletePostInput
}

/** The root mutation */
export type RootMutationDeletePostFormatArgs = {
  input: DeletePostFormatInput
}

/** The root mutation */
export type RootMutationDeleteProductCategoryArgs = {
  input: DeleteProductCategoryInput
}

/** The root mutation */
export type RootMutationDeleteProductTagArgs = {
  input: DeleteProductTagInput
}

/** The root mutation */
export type RootMutationDeleteProductTypeArgs = {
  input: DeleteProductTypeInput
}

/** The root mutation */
export type RootMutationDeleteReviewArgs = {
  input: DeleteReviewInput
}

/** The root mutation */
export type RootMutationDeleteShippingClassArgs = {
  input: DeleteShippingClassInput
}

/** The root mutation */
export type RootMutationDeleteTagArgs = {
  input: DeleteTagInput
}

/** The root mutation */
export type RootMutationDeleteUserArgs = {
  input: DeleteUserInput
}

/** The root mutation */
export type RootMutationDeleteVisibleProductArgs = {
  input: DeleteVisibleProductInput
}

/** The root mutation */
export type RootMutationEmptyCartArgs = {
  input: EmptyCartInput
}

/** The root mutation */
export type RootMutationFillCartArgs = {
  input: FillCartInput
}

/** The root mutation */
export type RootMutationIncreaseCountArgs = {
  count?: Maybe<Scalars['Int']>
}

/** The root mutation */
export type RootMutationLoginArgs = {
  input: LoginInput
}

/** The root mutation */
export type RootMutationRefreshJwtAuthTokenArgs = {
  input: RefreshJwtAuthTokenInput
}

/** The root mutation */
export type RootMutationRegisterCustomerArgs = {
  input: RegisterCustomerInput
}

/** The root mutation */
export type RootMutationRegisterUserArgs = {
  input: RegisterUserInput
}

/** The root mutation */
export type RootMutationRemoveCouponsArgs = {
  input: RemoveCouponsInput
}

/** The root mutation */
export type RootMutationRemoveItemsFromCartArgs = {
  input: RemoveItemsFromCartInput
}

/** The root mutation */
export type RootMutationResetUserPasswordArgs = {
  input: ResetUserPasswordInput
}

/** The root mutation */
export type RootMutationRestoreCartItemsArgs = {
  input: RestoreCartItemsInput
}

/** The root mutation */
export type RootMutationRestoreCommentArgs = {
  input: RestoreCommentInput
}

/** The root mutation */
export type RootMutationRestoreReviewArgs = {
  input: RestoreReviewInput
}

/** The root mutation */
export type RootMutationSendPasswordResetEmailArgs = {
  input: SendPasswordResetEmailInput
}

/** The root mutation */
export type RootMutationUpdateCategoryArgs = {
  input: UpdateCategoryInput
}

/** The root mutation */
export type RootMutationUpdateCommentArgs = {
  input: UpdateCommentInput
}

/** The root mutation */
export type RootMutationUpdateCouponArgs = {
  input: UpdateCouponInput
}

/** The root mutation */
export type RootMutationUpdateCustomerArgs = {
  input: UpdateCustomerInput
}

/** The root mutation */
export type RootMutationUpdateItemQuantitiesArgs = {
  input: UpdateItemQuantitiesInput
}

/** The root mutation */
export type RootMutationUpdateMediaItemArgs = {
  input: UpdateMediaItemInput
}

/** The root mutation */
export type RootMutationUpdateOrderArgs = {
  input: UpdateOrderInput
}

/** The root mutation */
export type RootMutationUpdatePaColorArgs = {
  input: UpdatePaColorInput
}

/** The root mutation */
export type RootMutationUpdatePaSizeArgs = {
  input: UpdatePaSizeInput
}

/** The root mutation */
export type RootMutationUpdatePageArgs = {
  input: UpdatePageInput
}

/** The root mutation */
export type RootMutationUpdatePostArgs = {
  input: UpdatePostInput
}

/** The root mutation */
export type RootMutationUpdatePostFormatArgs = {
  input: UpdatePostFormatInput
}

/** The root mutation */
export type RootMutationUpdateProductCategoryArgs = {
  input: UpdateProductCategoryInput
}

/** The root mutation */
export type RootMutationUpdateProductTagArgs = {
  input: UpdateProductTagInput
}

/** The root mutation */
export type RootMutationUpdateProductTypeArgs = {
  input: UpdateProductTypeInput
}

/** The root mutation */
export type RootMutationUpdateReviewArgs = {
  input: UpdateReviewInput
}

/** The root mutation */
export type RootMutationUpdateSettingsArgs = {
  input: UpdateSettingsInput
}

/** The root mutation */
export type RootMutationUpdateShippingClassArgs = {
  input: UpdateShippingClassInput
}

/** The root mutation */
export type RootMutationUpdateShippingMethodArgs = {
  input: UpdateShippingMethodInput
}

/** The root mutation */
export type RootMutationUpdateTagArgs = {
  input: UpdateTagInput
}

/** The root mutation */
export type RootMutationUpdateUserArgs = {
  input: UpdateUserInput
}

/** The root mutation */
export type RootMutationUpdateVisibleProductArgs = {
  input: UpdateVisibleProductInput
}

/** The root mutation */
export type RootMutationWriteReviewArgs = {
  input: WriteReviewInput
}

/** The root entry point into the Graph */
export type RootQuery = {
  __typename?: 'RootQuery'
  /** Entry point to get all settings for the site */
  allSettings?: Maybe<Settings>
  /** The cart object */
  cart?: Maybe<Cart>
  /** The cart object */
  cartFee?: Maybe<CartFee>
  /** The cart object */
  cartItem?: Maybe<CartItem>
  /** Connection between the RootQuery type and the category type */
  categories?: Maybe<RootQueryToCategoryConnection>
  /** A 0bject */
  category?: Maybe<Category>
  /** Returns a Comment */
  comment?: Maybe<Comment>
  /** Connection between the RootQuery type and the Comment type */
  comments?: Maybe<RootQueryToCommentConnection>
  /** A node used to manage content */
  contentNode?: Maybe<ContentNode>
  /** Connection between the RootQuery type and the ContentNode type */
  contentNodes?: Maybe<RootQueryToContentNodeConnection>
  /** Fetch a Content Type node by unique Identifier */
  contentType?: Maybe<ContentType>
  /** Connection between the RootQuery type and the ContentType type */
  contentTypes?: Maybe<RootQueryToContentTypeConnection>
  /** A coupon object */
  coupon?: Maybe<Coupon>
  /** Connection between the RootQuery type and the Coupon type */
  coupons?: Maybe<RootQueryToCouponConnection>
  /** A customer object */
  customer?: Maybe<Customer>
  /** Connection between the RootQuery type and the Customer type */
  customers?: Maybe<RootQueryToCustomerConnection>
  /** Fields of the &#039;DiscussionSettings&#039; settings group */
  discussionSettings?: Maybe<DiscussionSettings>
  /** A simple product object */
  externalProduct?: Maybe<ExternalProduct>
  /** Fields of the &#039;GeneralSettings&#039; settings group */
  generalSettings?: Maybe<GeneralSettings>
  /** A simple product object */
  groupedProduct?: Maybe<GroupProduct>
  /** An object of the mediaItem Type.  */
  mediaItem?: Maybe<MediaItem>
  /**
   * A mediaItem object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  mediaItemBy?: Maybe<MediaItem>
  /** Connection between the RootQuery type and the mediaItem type */
  mediaItems?: Maybe<RootQueryToMediaItemConnection>
  /** A WordPress navigation menu */
  menu?: Maybe<Menu>
  /** A WordPress navigation menu item */
  menuItem?: Maybe<MenuItem>
  /** Connection between the RootQuery type and the MenuItem type */
  menuItems?: Maybe<RootQueryToMenuItemConnection>
  /** Connection between the RootQuery type and the Menu type */
  menus?: Maybe<RootQueryToMenuConnection>
  /** Fetches an object given its ID */
  node?: Maybe<Node>
  /** Fetches an object given its Unique Resource Identifier */
  nodeByUri?: Maybe<UniformResourceIdentifiable>
  /** A order object */
  order?: Maybe<Order>
  /** Connection between the RootQuery type and the Order type */
  orders?: Maybe<RootQueryToOrderConnection>
  /** A 0bject */
  paColor?: Maybe<PaColor>
  /** Connection between the RootQuery type and the paColor type */
  paColors?: Maybe<RootQueryToPaColorConnection>
  /** A 0bject */
  paSize?: Maybe<PaSize>
  /** Connection between the RootQuery type and the paSize type */
  paSizes?: Maybe<RootQueryToPaSizeConnection>
  /** An object of the page Type.  */
  page?: Maybe<Page>
  /**
   * A page object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  pageBy?: Maybe<Page>
  /** Connection between the RootQuery type and the page type */
  pages?: Maybe<RootQueryToPageConnection>
  /** Connection between the RootQuery type and the PaymentGateway type */
  paymentGateways?: Maybe<RootQueryToPaymentGatewayConnection>
  /** A WordPress plugin */
  plugin?: Maybe<Plugin>
  /** Connection between the RootQuery type and the Plugin type */
  plugins?: Maybe<RootQueryToPluginConnection>
  /** An object of the post Type.  */
  post?: Maybe<Post>
  /**
   * A post object
   * @deprecated Deprecated in favor of using the single entry point for this type with ID and IDType fields. For example, instead of postBy( id: &quot;&quot; ), use post(id: &quot;&quot; idType: &quot;&quot;)
   */
  postBy?: Maybe<Post>
  /** A 0bject */
  postFormat?: Maybe<PostFormat>
  /** Connection between the RootQuery type and the postFormat type */
  postFormats?: Maybe<RootQueryToPostFormatConnection>
  /** Connection between the RootQuery type and the post type */
  posts?: Maybe<RootQueryToPostConnection>
  /** A product object */
  product?: Maybe<Product>
  /** Connection between the RootQuery type and the productCategory type */
  productCategories?: Maybe<RootQueryToProductCategoryConnection>
  /** A 0bject */
  productCategory?: Maybe<ProductCategory>
  /** A 0bject */
  productTag?: Maybe<ProductTag>
  /** Connection between the RootQuery type and the productTag type */
  productTags?: Maybe<RootQueryToProductTagConnection>
  /** A 0bject */
  productType?: Maybe<ProductType>
  /** Connection between the RootQuery type and the productType type */
  productTypes?: Maybe<RootQueryToProductTypeConnection>
  /** A product variation object */
  productVariation?: Maybe<ProductVariation>
  /** Connection between the RootQuery type and the Product type */
  products?: Maybe<RootQueryToProductConnection>
  /** Fields of the &#039;ReadingSettings&#039; settings group */
  readingSettings?: Maybe<ReadingSettings>
  /** A refund object */
  refund?: Maybe<Refund>
  /** Connection between the RootQuery type and the Refund type */
  refunds?: Maybe<RootQueryToRefundConnection>
  /** Connection between the RootQuery type and the EnqueuedScript type */
  registeredScripts?: Maybe<RootQueryToEnqueuedScriptConnection>
  /** Connection between the RootQuery type and the EnqueuedStylesheet type */
  registeredStylesheets?: Maybe<RootQueryToEnqueuedStylesheetConnection>
  /** Connection between the RootQuery type and the ContentRevisionUnion type */
  revisions?: Maybe<RootQueryToContentRevisionUnionConnection>
  /** A 0bject */
  shippingClass?: Maybe<ShippingClass>
  /** Connection between the RootQuery type and the shippingClass type */
  shippingClasses?: Maybe<RootQueryToShippingClassConnection>
  /** A shipping method object */
  shippingMethod?: Maybe<ShippingMethod>
  /** Connection between the RootQuery type and the ShippingMethod type */
  shippingMethods?: Maybe<RootQueryToShippingMethodConnection>
  /** A simple product object */
  simpleProduct?: Maybe<SimpleProduct>
  /** A 0bject */
  tag?: Maybe<Tag>
  /** Connection between the RootQuery type and the tag type */
  tags?: Maybe<RootQueryToTagConnection>
  /** A tax rate object */
  taxRate?: Maybe<TaxRate>
  /** Connection between the RootQuery type and the TaxRate type */
  taxRates?: Maybe<RootQueryToTaxRateConnection>
  /** Connection between the RootQuery type and the Taxonomy type */
  taxonomies?: Maybe<RootQueryToTaxonomyConnection>
  /** Fetch a Taxonomy node by unique Identifier */
  taxonomy?: Maybe<Taxonomy>
  /** A node in a taxonomy used to group and relate content nodes */
  termNode?: Maybe<TermNode>
  /** Connection between the RootQuery type and the TermNode type */
  terms?: Maybe<RootQueryToTermNodeConnection>
  /** A Theme object */
  theme?: Maybe<Theme>
  /** Connection between the RootQuery type and the Theme type */
  themes?: Maybe<RootQueryToThemeConnection>
  /** Returns a user */
  user?: Maybe<User>
  /** Returns a user role */
  userRole?: Maybe<UserRole>
  /** Connection between the RootQuery type and the UserRole type */
  userRoles?: Maybe<RootQueryToUserRoleConnection>
  /** Connection between the RootQuery type and the User type */
  users?: Maybe<RootQueryToUserConnection>
  /** A simple product object */
  variableProduct?: Maybe<VariableProduct>
  /** Returns the current user */
  viewer?: Maybe<User>
  /** A 0bject */
  visibleProduct?: Maybe<VisibleProduct>
  /** Connection between the RootQuery type and the visibleProduct type */
  visibleProducts?: Maybe<RootQueryToVisibleProductConnection>
  /** Fields of the &#039;WritingSettings&#039; settings group */
  writingSettings?: Maybe<WritingSettings>
}

/** The root entry point into the Graph */
export type RootQueryCartArgs = {
  recalculateTotals?: Maybe<Scalars['Boolean']>
}

/** The root entry point into the Graph */
export type RootQueryCartFeeArgs = {
  id: Scalars['ID']
}

/** The root entry point into the Graph */
export type RootQueryCartItemArgs = {
  key: Scalars['ID']
}

/** The root entry point into the Graph */
export type RootQueryCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToCategoryConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryCategoryArgs = {
  id: Scalars['ID']
  idType?: Maybe<CategoryIdType>
}

/** The root entry point into the Graph */
export type RootQueryCommentArgs = {
  id: Scalars['ID']
}

/** The root entry point into the Graph */
export type RootQueryCommentsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToCommentConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryContentNodeArgs = {
  id: Scalars['ID']
  idType?: Maybe<ContentNodeIdTypeEnum>
  contentType?: Maybe<ContentTypeEnum>
  asPreview?: Maybe<Scalars['Boolean']>
}

/** The root entry point into the Graph */
export type RootQueryContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToContentNodeConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryContentTypeArgs = {
  id: Scalars['ID']
  idType?: Maybe<ContentTypeIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryContentTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryCouponArgs = {
  id: Scalars['ID']
  idType?: Maybe<CouponIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryCouponsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToCouponConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryCustomerArgs = {
  id?: Maybe<Scalars['ID']>
  customerId?: Maybe<Scalars['Int']>
}

/** The root entry point into the Graph */
export type RootQueryCustomersArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToCustomerConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryExternalProductArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<ProductIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryGroupedProductArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<ProductIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryMediaItemArgs = {
  id: Scalars['ID']
  idType?: Maybe<MediaItemIdType>
  asPreview?: Maybe<Scalars['Boolean']>
}

/** The root entry point into the Graph */
export type RootQueryMediaItemByArgs = {
  id?: Maybe<Scalars['ID']>
  mediaItemId?: Maybe<Scalars['Int']>
  uri?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryMediaItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToMediaItemConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryMenuArgs = {
  id: Scalars['ID']
  idType?: Maybe<MenuNodeIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryMenuItemArgs = {
  id: Scalars['ID']
  idType?: Maybe<MenuItemNodeIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryMenuItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToMenuItemConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryMenusArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToMenuConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryNodeArgs = {
  id?: Maybe<Scalars['ID']>
}

/** The root entry point into the Graph */
export type RootQueryNodeByUriArgs = {
  uri: Scalars['String']
}

/** The root entry point into the Graph */
export type RootQueryOrderArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<OrderIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryOrdersArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToOrderConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryPaColorArgs = {
  id: Scalars['ID']
  idType?: Maybe<PaColorIdType>
}

/** The root entry point into the Graph */
export type RootQueryPaColorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToPaColorConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryPaSizeArgs = {
  id: Scalars['ID']
  idType?: Maybe<PaSizeIdType>
}

/** The root entry point into the Graph */
export type RootQueryPaSizesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToPaSizeConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryPageArgs = {
  id: Scalars['ID']
  idType?: Maybe<PageIdType>
  asPreview?: Maybe<Scalars['Boolean']>
}

/** The root entry point into the Graph */
export type RootQueryPageByArgs = {
  id?: Maybe<Scalars['ID']>
  pageId?: Maybe<Scalars['Int']>
  uri?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryPagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToPageConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryPaymentGatewaysArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToPaymentGatewayConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryPluginArgs = {
  id: Scalars['ID']
}

/** The root entry point into the Graph */
export type RootQueryPluginsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryPostArgs = {
  id: Scalars['ID']
  idType?: Maybe<PostIdType>
  asPreview?: Maybe<Scalars['Boolean']>
}

/** The root entry point into the Graph */
export type RootQueryPostByArgs = {
  id?: Maybe<Scalars['ID']>
  postId?: Maybe<Scalars['Int']>
  uri?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryPostFormatArgs = {
  id: Scalars['ID']
  idType?: Maybe<PostFormatIdType>
}

/** The root entry point into the Graph */
export type RootQueryPostFormatsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToPostFormatConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryPostsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToPostConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryProductArgs = {
  id: Scalars['ID']
  idType?: Maybe<ProductIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToProductCategoryConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryProductCategoryArgs = {
  id: Scalars['ID']
  idType?: Maybe<ProductCategoryIdType>
}

/** The root entry point into the Graph */
export type RootQueryProductTagArgs = {
  id: Scalars['ID']
  idType?: Maybe<ProductTagIdType>
}

/** The root entry point into the Graph */
export type RootQueryProductTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToProductTagConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryProductTypeArgs = {
  id: Scalars['ID']
  idType?: Maybe<ProductTypeIdType>
}

/** The root entry point into the Graph */
export type RootQueryProductTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToProductTypeConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryProductVariationArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<ProductVariationIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToProductConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryRefundArgs = {
  id: Scalars['ID']
  idType?: Maybe<RefundIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryRefundsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToRefundConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryRegisteredScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryRegisteredStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryRevisionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToContentRevisionUnionConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryShippingClassArgs = {
  id: Scalars['ID']
  idType?: Maybe<ShippingClassIdType>
}

/** The root entry point into the Graph */
export type RootQueryShippingClassesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToShippingClassConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryShippingMethodArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<ShippingMethodIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryShippingMethodsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQuerySimpleProductArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<ProductIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryTagArgs = {
  id: Scalars['ID']
  idType?: Maybe<TagIdType>
}

/** The root entry point into the Graph */
export type RootQueryTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToTagConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryTaxRateArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<TaxRateIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryTaxRatesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToTaxRateConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryTaxonomiesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryTaxonomyArgs = {
  id: Scalars['ID']
  idType?: Maybe<TaxonomyIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryTermNodeArgs = {
  id: Scalars['ID']
  idType?: Maybe<TermNodeIdTypeEnum>
  taxonomy?: Maybe<TaxonomyEnum>
}

/** The root entry point into the Graph */
export type RootQueryTermsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToTermNodeConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryThemeArgs = {
  id: Scalars['ID']
}

/** The root entry point into the Graph */
export type RootQueryThemesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryUserArgs = {
  id: Scalars['ID']
  idType?: Maybe<UserNodeIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryUserRoleArgs = {
  id: Scalars['ID']
}

/** The root entry point into the Graph */
export type RootQueryUserRolesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The root entry point into the Graph */
export type RootQueryUsersArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToUserConnectionWhereArgs>
}

/** The root entry point into the Graph */
export type RootQueryVariableProductArgs = {
  id?: Maybe<Scalars['ID']>
  idType?: Maybe<ProductIdTypeEnum>
}

/** The root entry point into the Graph */
export type RootQueryVisibleProductArgs = {
  id: Scalars['ID']
  idType?: Maybe<VisibleProductIdType>
}

/** The root entry point into the Graph */
export type RootQueryVisibleProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<RootQueryToVisibleProductConnectionWhereArgs>
}

/** Connection between the RootQuery type and the category type */
export type RootQueryToCategoryConnection = {
  __typename?: 'RootQueryToCategoryConnection'
  /** Edges for the RootQueryToCategoryConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Category>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToCategoryConnectionEdge = {
  __typename?: 'RootQueryToCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Category>
}

/** Arguments for filtering the RootQueryToCategoryConnection connection */
export type RootQueryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the Comment type */
export type RootQueryToCommentConnection = {
  __typename?: 'RootQueryToCommentConnection'
  /** Edges for the RootQueryToCommentConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToCommentConnectionEdge = {
  __typename?: 'RootQueryToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
}

/** Arguments for filtering the RootQueryToCommentConnection connection */
export type RootQueryToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Connection between the RootQuery type and the ContentNode type */
export type RootQueryToContentNodeConnection = {
  __typename?: 'RootQueryToContentNodeConnection'
  /** Edges for the RootQueryToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToContentNodeConnectionEdge = {
  __typename?: 'RootQueryToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the RootQueryToContentNodeConnection connection */
export type RootQueryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the ContentRevisionUnion type */
export type RootQueryToContentRevisionUnionConnection = {
  __typename?: 'RootQueryToContentRevisionUnionConnection'
  /** Edges for the RootQueryToContentRevisionUnionConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToContentRevisionUnionConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToContentRevisionUnionConnectionEdge = {
  __typename?: 'RootQueryToContentRevisionUnionConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentRevisionUnion>
}

/** Arguments for filtering the RootQueryToContentRevisionUnionConnection connection */
export type RootQueryToContentRevisionUnionConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the ContentType type */
export type RootQueryToContentTypeConnection = {
  __typename?: 'RootQueryToContentTypeConnection'
  /** Edges for the RootQueryToContentTypeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToContentTypeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentType>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToContentTypeConnectionEdge = {
  __typename?: 'RootQueryToContentTypeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentType>
}

/** Connection between the RootQuery type and the Coupon type */
export type RootQueryToCouponConnection = {
  __typename?: 'RootQueryToCouponConnection'
  /** Edges for the RootQueryToCouponConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToCouponConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Coupon>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToCouponConnectionEdge = {
  __typename?: 'RootQueryToCouponConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Coupon>
}

/** Arguments for filtering the RootQueryToCouponConnection connection */
export type RootQueryToCouponConnectionWhereArgs = {
  /** Limit result set to resources with a specific code. */
  code?: Maybe<Scalars['String']>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostTypeOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the Customer type */
export type RootQueryToCustomerConnection = {
  __typename?: 'RootQueryToCustomerConnection'
  /** Edges for the RootQueryToCustomerConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToCustomerConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Customer>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToCustomerConnectionEdge = {
  __typename?: 'RootQueryToCustomerConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Customer>
}

/** Arguments for filtering the RootQueryToCustomerConnection connection */
export type RootQueryToCustomerConnectionWhereArgs = {
  /** Limit result set to resources with a specific email. */
  email?: Maybe<Scalars['String']>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Order of results. */
  order?: Maybe<OrderEnum>
  /** Order results by a specific field. */
  orderby?: Maybe<CustomerConnectionOrderbyEnum>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the EnqueuedScript type */
export type RootQueryToEnqueuedScriptConnection = {
  __typename?: 'RootQueryToEnqueuedScriptConnection'
  /** Edges for the RootQueryToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToEnqueuedScriptConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToEnqueuedScriptConnectionEdge = {
  __typename?: 'RootQueryToEnqueuedScriptConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>
}

/** Connection between the RootQuery type and the EnqueuedStylesheet type */
export type RootQueryToEnqueuedStylesheetConnection = {
  __typename?: 'RootQueryToEnqueuedStylesheetConnection'
  /** Edges for the RootQueryToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToEnqueuedStylesheetConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'RootQueryToEnqueuedStylesheetConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>
}

/** Connection between the RootQuery type and the mediaItem type */
export type RootQueryToMediaItemConnection = {
  __typename?: 'RootQueryToMediaItemConnection'
  /** Edges for the RootQueryToMediaItemConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToMediaItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MediaItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToMediaItemConnectionEdge = {
  __typename?: 'RootQueryToMediaItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<MediaItem>
}

/** Arguments for filtering the RootQueryToMediaItemConnection connection */
export type RootQueryToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the Menu type */
export type RootQueryToMenuConnection = {
  __typename?: 'RootQueryToMenuConnection'
  /** Edges for the RootQueryToMenuConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToMenuConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Menu>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToMenuConnectionEdge = {
  __typename?: 'RootQueryToMenuConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Menu>
}

/** Arguments for filtering the RootQueryToMenuConnection connection */
export type RootQueryToMenuConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>
  /** The slug of the menu to query items for */
  slug?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the MenuItem type */
export type RootQueryToMenuItemConnection = {
  __typename?: 'RootQueryToMenuItemConnection'
  /** Edges for the RootQueryToMenuItemConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToMenuItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MenuItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToMenuItemConnectionEdge = {
  __typename?: 'RootQueryToMenuItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<MenuItem>
}

/** Arguments for filtering the RootQueryToMenuItemConnection connection */
export type RootQueryToMenuItemConnectionWhereArgs = {
  /** The ID of the object */
  id?: Maybe<Scalars['Int']>
  /** The menu location for the menu being queried */
  location?: Maybe<MenuLocationEnum>
  /** The database ID of the parent menu object */
  parentDatabaseId?: Maybe<Scalars['Int']>
  /** The ID of the parent menu object */
  parentId?: Maybe<Scalars['ID']>
}

/** Connection between the RootQuery type and the Order type */
export type RootQueryToOrderConnection = {
  __typename?: 'RootQueryToOrderConnection'
  /** Edges for the RootQueryToOrderConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToOrderConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Order>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToOrderConnectionEdge = {
  __typename?: 'RootQueryToOrderConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Order>
}

/** Arguments for filtering the RootQueryToOrderConnection connection */
export type RootQueryToOrderConnectionWhereArgs = {
  /** Limit result set to orders assigned a specific customer. */
  customerId?: Maybe<Scalars['Int']>
  /** Limit result set to orders assigned a specific group of customers. */
  customersIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<OrdersOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to orders assigned a specific product. */
  productId?: Maybe<Scalars['Int']>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to orders assigned a specific status. */
  statuses?: Maybe<Array<Maybe<OrderStatusEnum>>>
}

/** Connection between the RootQuery type and the paColor type */
export type RootQueryToPaColorConnection = {
  __typename?: 'RootQueryToPaColorConnection'
  /** Edges for the RootQueryToPaColorConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPaColorConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PaColor>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToPaColorConnectionEdge = {
  __typename?: 'RootQueryToPaColorConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<PaColor>
}

/** Arguments for filtering the RootQueryToPaColorConnection connection */
export type RootQueryToPaColorConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the paSize type */
export type RootQueryToPaSizeConnection = {
  __typename?: 'RootQueryToPaSizeConnection'
  /** Edges for the RootQueryToPaSizeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPaSizeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PaSize>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToPaSizeConnectionEdge = {
  __typename?: 'RootQueryToPaSizeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<PaSize>
}

/** Arguments for filtering the RootQueryToPaSizeConnection connection */
export type RootQueryToPaSizeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the page type */
export type RootQueryToPageConnection = {
  __typename?: 'RootQueryToPageConnection'
  /** Edges for the RootQueryToPageConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPageConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Page>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToPageConnectionEdge = {
  __typename?: 'RootQueryToPageConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Page>
}

/** Arguments for filtering the RootQueryToPageConnection connection */
export type RootQueryToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the PaymentGateway type */
export type RootQueryToPaymentGatewayConnection = {
  __typename?: 'RootQueryToPaymentGatewayConnection'
  /** Edges for the RootQueryToPaymentGatewayConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPaymentGatewayConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PaymentGateway>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToPaymentGatewayConnectionEdge = {
  __typename?: 'RootQueryToPaymentGatewayConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<PaymentGateway>
}

/** Arguments for filtering the RootQueryToPaymentGatewayConnection connection */
export type RootQueryToPaymentGatewayConnectionWhereArgs = {
  /** Include disabled payment gateways? */
  all?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the Plugin type */
export type RootQueryToPluginConnection = {
  __typename?: 'RootQueryToPluginConnection'
  /** Edges for the RootQueryToPluginConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPluginConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Plugin>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToPluginConnectionEdge = {
  __typename?: 'RootQueryToPluginConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Plugin>
}

/** Connection between the RootQuery type and the post type */
export type RootQueryToPostConnection = {
  __typename?: 'RootQueryToPostConnection'
  /** Edges for the RootQueryToPostConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPostConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToPostConnectionEdge = {
  __typename?: 'RootQueryToPostConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Post>
}

/** Arguments for filtering the RootQueryToPostConnection connection */
export type RootQueryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the RootQuery type and the postFormat type */
export type RootQueryToPostFormatConnection = {
  __typename?: 'RootQueryToPostFormatConnection'
  /** Edges for the RootQueryToPostFormatConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToPostFormatConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<PostFormat>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToPostFormatConnectionEdge = {
  __typename?: 'RootQueryToPostFormatConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<PostFormat>
}

/** Arguments for filtering the RootQueryToPostFormatConnection connection */
export type RootQueryToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the productCategory type */
export type RootQueryToProductCategoryConnection = {
  __typename?: 'RootQueryToProductCategoryConnection'
  /** Edges for the RootQueryToProductCategoryConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToProductCategoryConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductCategory>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToProductCategoryConnectionEdge = {
  __typename?: 'RootQueryToProductCategoryConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductCategory>
}

/** Arguments for filtering the RootQueryToProductCategoryConnection connection */
export type RootQueryToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the Product type */
export type RootQueryToProductConnection = {
  __typename?: 'RootQueryToProductConnection'
  /** Edges for the RootQueryToProductConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToProductConnectionEdge = {
  __typename?: 'RootQueryToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the RootQueryToProductConnection connection */
export type RootQueryToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the RootQuery type and the productTag type */
export type RootQueryToProductTagConnection = {
  __typename?: 'RootQueryToProductTagConnection'
  /** Edges for the RootQueryToProductTagConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToProductTagConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductTag>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToProductTagConnectionEdge = {
  __typename?: 'RootQueryToProductTagConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductTag>
}

/** Arguments for filtering the RootQueryToProductTagConnection connection */
export type RootQueryToProductTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the productType type */
export type RootQueryToProductTypeConnection = {
  __typename?: 'RootQueryToProductTypeConnection'
  /** Edges for the RootQueryToProductTypeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToProductTypeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductType>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToProductTypeConnectionEdge = {
  __typename?: 'RootQueryToProductTypeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductType>
}

/** Arguments for filtering the RootQueryToProductTypeConnection connection */
export type RootQueryToProductTypeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the Refund type */
export type RootQueryToRefundConnection = {
  __typename?: 'RootQueryToRefundConnection'
  /** Edges for the RootQueryToRefundConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToRefundConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Refund>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToRefundConnectionEdge = {
  __typename?: 'RootQueryToRefundConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Refund>
}

/** Arguments for filtering the RootQueryToRefundConnection connection */
export type RootQueryToRefundConnectionWhereArgs = {
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to refunds from a specific group of order IDs. */
  orderIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostTypeOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit results to those matching a string. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to refunds assigned a specific status. */
  statuses?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Connection between the RootQuery type and the shippingClass type */
export type RootQueryToShippingClassConnection = {
  __typename?: 'RootQueryToShippingClassConnection'
  /** Edges for the RootQueryToShippingClassConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToShippingClassConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ShippingClass>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToShippingClassConnectionEdge = {
  __typename?: 'RootQueryToShippingClassConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ShippingClass>
}

/** Arguments for filtering the RootQueryToShippingClassConnection connection */
export type RootQueryToShippingClassConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the ShippingMethod type */
export type RootQueryToShippingMethodConnection = {
  __typename?: 'RootQueryToShippingMethodConnection'
  /** Edges for the RootQueryToShippingMethodConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToShippingMethodConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ShippingMethod>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToShippingMethodConnectionEdge = {
  __typename?: 'RootQueryToShippingMethodConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ShippingMethod>
}

/** Connection between the RootQuery type and the tag type */
export type RootQueryToTagConnection = {
  __typename?: 'RootQueryToTagConnection'
  /** Edges for the RootQueryToTagConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToTagConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Tag>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToTagConnectionEdge = {
  __typename?: 'RootQueryToTagConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Tag>
}

/** Arguments for filtering the RootQueryToTagConnection connection */
export type RootQueryToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the TaxRate type */
export type RootQueryToTaxRateConnection = {
  __typename?: 'RootQueryToTaxRateConnection'
  /** Edges for the RootQueryToTaxRateConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToTaxRateConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<TaxRate>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToTaxRateConnectionEdge = {
  __typename?: 'RootQueryToTaxRateConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<TaxRate>
}

/** Arguments for filtering the RootQueryToTaxRateConnection connection */
export type RootQueryToTaxRateConnectionWhereArgs = {
  /** Sort by tax class. */
  class?: Maybe<TaxClassEnum>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<TaxRateConnectionOrderbyInput>>>
  /** Filter results by a post code. */
  postCode?: Maybe<Scalars['String']>
  /** Filter results by a group of post codes. */
  postCodeIn?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Connection between the RootQuery type and the Taxonomy type */
export type RootQueryToTaxonomyConnection = {
  __typename?: 'RootQueryToTaxonomyConnection'
  /** Edges for the RootQueryToTaxonomyConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToTaxonomyConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Taxonomy>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToTaxonomyConnectionEdge = {
  __typename?: 'RootQueryToTaxonomyConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Taxonomy>
}

/** Connection between the RootQuery type and the TermNode type */
export type RootQueryToTermNodeConnection = {
  __typename?: 'RootQueryToTermNodeConnection'
  /** Edges for the RootQueryToTermNodeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToTermNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<TermNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToTermNodeConnectionEdge = {
  __typename?: 'RootQueryToTermNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<TermNode>
}

/** Arguments for filtering the RootQueryToTermNodeConnection connection */
export type RootQueryToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** The Taxonomy to filter terms by */
  taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Connection between the RootQuery type and the Theme type */
export type RootQueryToThemeConnection = {
  __typename?: 'RootQueryToThemeConnection'
  /** Edges for the RootQueryToThemeConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToThemeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Theme>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToThemeConnectionEdge = {
  __typename?: 'RootQueryToThemeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Theme>
}

/** Connection between the RootQuery type and the User type */
export type RootQueryToUserConnection = {
  __typename?: 'RootQueryToUserConnection'
  /** Edges for the RootQueryToUserConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToUserConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<User>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToUserConnectionEdge = {
  __typename?: 'RootQueryToUserConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<User>
}

/** Arguments for filtering the RootQueryToUserConnection connection */
export type RootQueryToUserConnectionWhereArgs = {
  /** Array of userIds to exclude. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Pass an array of post types to filter results to users who have published posts in those post types. */
  hasPublishedPosts?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of userIds to include. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** The user login. */
  login?: Maybe<Scalars['String']>
  /** An array of logins to include. Users matching one of these logins will be included in results. */
  loginIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** An array of logins to exclude. Users matching one of these logins will not be included in results. */
  loginNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** The user nicename. */
  nicename?: Maybe<Scalars['String']>
  /** An array of nicenames to include. Users matching one of these nicenames will be included in results. */
  nicenameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** An array of nicenames to exclude. Users matching one of these nicenames will not be included in results. */
  nicenameNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<UsersConnectionOrderbyInput>>>
  /** An array of role names that users must match to be included in results. Note that this is an inclusive list: users must match *each* role. */
  role?: Maybe<UserRoleEnum>
  /** An array of role names. Matched users must have at least one of these roles. */
  roleIn?: Maybe<Array<Maybe<UserRoleEnum>>>
  /** An array of role names to exclude. Users matching one or more of these roles will not be included in results. */
  roleNotIn?: Maybe<Array<Maybe<UserRoleEnum>>>
  /** Search keyword. Searches for possible string matches on columns. When "searchColumns" is left empty, it tries to determine which column to search in based on search string. */
  search?: Maybe<Scalars['String']>
  /** Array of column names to be searched. Accepts 'ID', 'login', 'nicename', 'email', 'url'. */
  searchColumns?: Maybe<Array<Maybe<UsersConnectionSearchColumnEnum>>>
}

/** Connection between the RootQuery type and the UserRole type */
export type RootQueryToUserRoleConnection = {
  __typename?: 'RootQueryToUserRoleConnection'
  /** Edges for the RootQueryToUserRoleConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToUserRoleConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<UserRole>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToUserRoleConnectionEdge = {
  __typename?: 'RootQueryToUserRoleConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<UserRole>
}

/** Connection between the RootQuery type and the visibleProduct type */
export type RootQueryToVisibleProductConnection = {
  __typename?: 'RootQueryToVisibleProductConnection'
  /** Edges for the RootQueryToVisibleProductConnection connection */
  edges?: Maybe<Array<Maybe<RootQueryToVisibleProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VisibleProduct>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type RootQueryToVisibleProductConnectionEdge = {
  __typename?: 'RootQueryToVisibleProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VisibleProduct>
}

/** Arguments for filtering the RootQueryToVisibleProductConnection connection */
export type RootQueryToVisibleProductConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: Maybe<Scalars['String']>
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: Maybe<Scalars['Int']>
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: Maybe<Scalars['Boolean']>
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: Maybe<Scalars['String']>
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: Maybe<Scalars['Boolean']>
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** Array of term ids to include. Default empty array. */
  include?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of names to return term(s) for. Default empty. */
  name?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: Maybe<Scalars['String']>
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Direction the connection should be ordered in */
  order?: Maybe<OrderEnum>
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: Maybe<TermObjectsConnectionOrderbyEnum>
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: Maybe<Scalars['Boolean']>
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: Maybe<Scalars['Int']>
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: Maybe<Scalars['String']>
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: Maybe<Scalars['Boolean']>
}

/** Input for the sendPasswordResetEmail mutation */
export type SendPasswordResetEmailInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** A string that contains the user's username or email address. */
  username: Scalars['String']
}

/** The payload for the sendPasswordResetEmail mutation */
export type SendPasswordResetEmailPayload = {
  __typename?: 'SendPasswordResetEmailPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The user that the password reset email was sent to */
  user?: Maybe<User>
}

/** All of the registered settings */
export type Settings = {
  __typename?: 'Settings'
  /** Settings of the the string Settings Group */
  discussionSettingsDefaultCommentStatus?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  discussionSettingsDefaultPingStatus?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  generalSettingsDateFormat?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  generalSettingsDescription?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  generalSettingsEmail?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  generalSettingsLanguage?: Maybe<Scalars['String']>
  /** Settings of the the integer Settings Group */
  generalSettingsStartOfWeek?: Maybe<Scalars['Int']>
  /** Settings of the the string Settings Group */
  generalSettingsTimeFormat?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  generalSettingsTimezone?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  generalSettingsTitle?: Maybe<Scalars['String']>
  /** Settings of the the string Settings Group */
  generalSettingsUrl?: Maybe<Scalars['String']>
  /** Settings of the the integer Settings Group */
  readingSettingsPostsPerPage?: Maybe<Scalars['Int']>
  /** Settings of the the integer Settings Group */
  writingSettingsDefaultCategory?: Maybe<Scalars['Int']>
  /** Settings of the the string Settings Group */
  writingSettingsDefaultPostFormat?: Maybe<Scalars['String']>
  /** Settings of the the boolean Settings Group */
  writingSettingsUseSmilies?: Maybe<Scalars['Boolean']>
}

/** The shippingClass type */
export type ShippingClass = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'ShippingClass'
    /** Connection between the shippingClass type and the ContentNode type */
    contentNodes?: Maybe<ShippingClassToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    shippingClassId?: Maybe<Scalars['Int']>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the shippingClass type and the Taxonomy type */
    taxonomy?: Maybe<ShippingClassToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The shippingClass type */
export type ShippingClassContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ShippingClassToContentNodeConnectionWhereArgs>
}

/** The shippingClass type */
export type ShippingClassEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The shippingClass type */
export type ShippingClassEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum ShippingClassIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the shippingClass type and the ContentNode type */
export type ShippingClassToContentNodeConnection = {
  __typename?: 'ShippingClassToContentNodeConnection'
  /** Edges for the ShippingClassToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<ShippingClassToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type ShippingClassToContentNodeConnectionEdge = {
  __typename?: 'ShippingClassToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the ShippingClassToContentNodeConnection connection */
export type ShippingClassToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfShippingClassEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the shippingClass type and the Taxonomy type */
export type ShippingClassToTaxonomyConnectionEdge = {
  __typename?: 'ShippingClassToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** a shipping line object */
export type ShippingLine = {
  __typename?: 'ShippingLine'
  /** The ID of the order item in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** Shipping Line&#039;s shipping method name */
  methodTitle?: Maybe<Scalars['String']>
  /** The Id of the order the order item belongs to. */
  orderId?: Maybe<Scalars['Int']>
  /** Shipping Line&#039;s shipping method */
  shippingMethod?: Maybe<ShippingMethod>
  /** Line tax class */
  taxClass?: Maybe<TaxClassEnum>
  /** Line taxes */
  taxes?: Maybe<Array<Maybe<OrderItemTax>>>
  /** Line total (after discounts) */
  total?: Maybe<Scalars['String']>
  /** Line total tax (after discounts) */
  totalTax?: Maybe<Scalars['String']>
}

/** a shipping line object */
export type ShippingLineMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** Shipping lines data. */
export type ShippingLineInput = {
  /** Shipping Line ID */
  id?: Maybe<Scalars['ID']>
  /** Shipping instance ID. */
  instanceId?: Maybe<Scalars['String']>
  /** Meta data. */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** Shipping method ID. */
  methodId: Scalars['String']
  /** Shipping method name. */
  methodTitle: Scalars['String']
  /** Line total (after discounts). */
  total: Scalars['String']
}

/** A shipping method object */
export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod'
  /** The ID of the shipping method in the database */
  databaseId: Scalars['ID']
  /** Shipping method description. */
  description?: Maybe<Scalars['String']>
  /** The globally unique identifier for the tax rate. */
  id: Scalars['ID']
  /** Shipping method title. */
  title?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single Shipping Method. Default is ID. */
export enum ShippingMethodIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** Shipping package object */
export type ShippingPackage = {
  __typename?: 'ShippingPackage'
  /** Shipping package details */
  packageDetails?: Maybe<Scalars['String']>
  /** Shipping package rates */
  rates?: Maybe<Array<Maybe<ShippingRate>>>
  /** This shipping package supports the shipping calculator. */
  supportsShippingCalculator?: Maybe<Scalars['Boolean']>
}

/** Shipping rate object */
export type ShippingRate = {
  __typename?: 'ShippingRate'
  /** Shipping rate cost */
  cost?: Maybe<Scalars['String']>
  /** Shipping rate ID */
  id: Scalars['ID']
  /** Shipping instance ID */
  instanceId?: Maybe<Scalars['Int']>
  /** Shipping rate label */
  label?: Maybe<Scalars['String']>
  /** Shipping method ID */
  methodId: Scalars['ID']
}

/** A simple attribute object */
export type SimpleAttribute = Attribute & {
  __typename?: 'SimpleAttribute'
  /** Name of attribute */
  name?: Maybe<Scalars['String']>
  /** Selected value of attribute */
  value?: Maybe<Scalars['String']>
}

/** A product object */
export type SimpleProduct = Node &
  Product &
  NodeWithComments &
  NodeWithContentEditor &
  NodeWithFeaturedImage &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'SimpleProduct'
    /** Connection between the Product type and the ProductAttribute type */
    attributes?: Maybe<ProductToProductAttributeConnection>
    /** Product average count */
    averageRating?: Maybe<Scalars['Float']>
    /** Product backorders status */
    backorders?: Maybe<BackordersEnum>
    /** Can product be backordered? */
    backordersAllowed?: Maybe<Scalars['Boolean']>
    /** Catalog visibility */
    catalogVisibility?: Maybe<CatalogVisibilityEnum>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** The content of the post. */
    content?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** Connection between the SimpleProduct type and the Product type */
    crossSell?: Maybe<SimpleProductToProductConnection>
    /** The ID of the product in the database */
    databaseId: Scalars['Int']
    /** Date product created */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** Date on sale from */
    dateOnSaleFrom?: Maybe<Scalars['String']>
    /** Date on sale to */
    dateOnSaleTo?: Maybe<Scalars['String']>
    /** Connection between the SimpleProduct type and the VariationAttribute type */
    defaultAttributes?: Maybe<SimpleProductToVariationAttributeConnection>
    /** Product description */
    description?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** Download expiry */
    downloadExpiry?: Maybe<Scalars['Int']>
    /** Download limit */
    downloadLimit?: Maybe<Scalars['Int']>
    /** Is downloadable? */
    downloadable?: Maybe<Scalars['Boolean']>
    /** Product downloads */
    downloads?: Maybe<Array<Maybe<ProductDownload>>>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** If the product is featured */
    featured?: Maybe<Scalars['Boolean']>
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>
    /** Connection between the Product type and the MediaItem type */
    galleryImages?: Maybe<ProductToMediaItemConnection>
    /** Connection between the Product type and the GlobalProductAttribute type */
    globalAttributes?: Maybe<ProductToGlobalProductAttributeConnection>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** Product&#039;s height */
    height?: Maybe<Scalars['String']>
    /** The globally unique identifier for the product */
    id: Scalars['ID']
    /** Main image */
    image?: Maybe<MediaItem>
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** Product&#039;s length */
    length?: Maybe<Scalars['String']>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** Connection between the Product type and the LocalProductAttribute type */
    localAttributes?: Maybe<ProductToLocalProductAttributeConnection>
    /** If product manage stock */
    manageStock?: Maybe<Scalars['Boolean']>
    /** Menu order */
    menuOrder?: Maybe<Scalars['Int']>
    /** Object meta data */
    metaData?: Maybe<Array<Maybe<MetaData>>>
    /** Date product last updated */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /** Product name */
    name?: Maybe<Scalars['String']>
    /** Is product on sale? */
    onSale?: Maybe<Scalars['Boolean']>
    /** Connection between the Product type and the paColor type */
    paColors?: Maybe<ProductToPaColorConnection>
    /** Connection between the Product type and the paSize type */
    paSizes?: Maybe<ProductToPaSizeConnection>
    /** Parent product */
    parent?: Maybe<Product>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** Product&#039;s active price */
    price?: Maybe<Scalars['String']>
    /** Connection between the Product type and the productCategory type */
    productCategories?: Maybe<ProductToProductCategoryConnection>
    /** Connection between the Product type and the productTag type */
    productTags?: Maybe<ProductToProductTagConnection>
    /** Connection between the Product type and the productType type */
    productTypes?: Maybe<ProductToProductTypeConnection>
    /** Can product be purchased? */
    purchasable?: Maybe<Scalars['Boolean']>
    /** Purchase note */
    purchaseNote?: Maybe<Scalars['String']>
    /** Product&#039;s regular price */
    regularPrice?: Maybe<Scalars['String']>
    /** Connection between the Product type and the Product type */
    related?: Maybe<ProductToProductConnection>
    /** Product review count */
    reviewCount?: Maybe<Scalars['Int']>
    /** Connection between the Product type and the Comment type */
    reviews?: Maybe<ProductToCommentConnection>
    /** If reviews are allowed */
    reviewsAllowed?: Maybe<Scalars['Boolean']>
    /** Product&#039;s sale price */
    salePrice?: Maybe<Scalars['String']>
    /** shipping class ID */
    shippingClassId?: Maybe<Scalars['Int']>
    /** Connection between the Product type and the shippingClass type */
    shippingClasses?: Maybe<ProductToShippingClassConnection>
    /** Does product need to be shipped? */
    shippingRequired?: Maybe<Scalars['Boolean']>
    /** Is product shipping taxable? */
    shippingTaxable?: Maybe<Scalars['Boolean']>
    /** Product short description */
    shortDescription?: Maybe<Scalars['String']>
    /** Product SKU */
    sku?: Maybe<Scalars['String']>
    /** Product slug */
    slug?: Maybe<Scalars['String']>
    /** If should be sold individually */
    soldIndividually?: Maybe<Scalars['Boolean']>
    /** Product status */
    status?: Maybe<Scalars['String']>
    /** Number of items available for sale */
    stockQuantity?: Maybe<Scalars['Int']>
    /** Product stock status */
    stockStatus?: Maybe<StockStatusEnum>
    /** Tax class */
    taxClass?: Maybe<TaxClassEnum>
    /** Tax status */
    taxStatus?: Maybe<TaxStatusEnum>
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>
    /** Number total of sales */
    totalSales?: Maybe<Scalars['Int']>
    /** Product type */
    type?: Maybe<ProductTypesEnum>
    /** Connection between the Product type and the Product type */
    upsell?: Maybe<ProductToUpsellConnection>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** Is product virtual? */
    virtual?: Maybe<Scalars['Boolean']>
    /** Connection between the Product type and the visibleProduct type */
    visibleProducts?: Maybe<ProductToVisibleProductConnection>
    /** Product&#039;s weight */
    weight?: Maybe<Scalars['String']>
    /** Product&#039;s width */
    width?: Maybe<Scalars['String']>
  }

/** A product object */
export type SimpleProductAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductAttributeConnectionWhereArgs>
}

/** A product object */
export type SimpleProductContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A product object */
export type SimpleProductCrossSellArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<SimpleProductToProductConnectionWhereArgs>
}

/** A product object */
export type SimpleProductDefaultAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A product object */
export type SimpleProductDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A product object */
export type SimpleProductEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A product object */
export type SimpleProductEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A product object */
export type SimpleProductGalleryImagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToMediaItemConnectionWhereArgs>
}

/** A product object */
export type SimpleProductGlobalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToGlobalProductAttributeConnectionWhereArgs>
}

/** A product object */
export type SimpleProductLocalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToLocalProductAttributeConnectionWhereArgs>
}

/** A product object */
export type SimpleProductMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A product object */
export type SimpleProductPaColorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaColorConnectionWhereArgs>
}

/** A product object */
export type SimpleProductPaSizesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaSizeConnectionWhereArgs>
}

/** A product object */
export type SimpleProductPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A product object */
export type SimpleProductProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductCategoryConnectionWhereArgs>
}

/** A product object */
export type SimpleProductProductTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTagConnectionWhereArgs>
}

/** A product object */
export type SimpleProductProductTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTypeConnectionWhereArgs>
}

/** A product object */
export type SimpleProductRegularPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A product object */
export type SimpleProductRelatedArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductConnectionWhereArgs>
}

/** A product object */
export type SimpleProductReviewsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToCommentConnectionWhereArgs>
}

/** A product object */
export type SimpleProductSalePriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A product object */
export type SimpleProductShippingClassesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToShippingClassConnectionWhereArgs>
}

/** A product object */
export type SimpleProductShortDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A product object */
export type SimpleProductUpsellArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToUpsellConnectionWhereArgs>
}

/** A product object */
export type SimpleProductVisibleProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToVisibleProductConnectionWhereArgs>
}

/** Connection between the SimpleProduct type and the Product type */
export type SimpleProductToProductConnection = {
  __typename?: 'SimpleProductToProductConnection'
  /** Edges for the SimpleProductToProductConnection connection */
  edges?: Maybe<Array<Maybe<SimpleProductToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type SimpleProductToProductConnectionEdge = {
  __typename?: 'SimpleProductToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the SimpleProductToProductConnection connection */
export type SimpleProductToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the SimpleProduct type and the VariationAttribute type */
export type SimpleProductToVariationAttributeConnection = {
  __typename?: 'SimpleProductToVariationAttributeConnection'
  /** Edges for the SimpleProductToVariationAttributeConnection connection */
  edges?: Maybe<Array<Maybe<SimpleProductToVariationAttributeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VariationAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type SimpleProductToVariationAttributeConnectionEdge = {
  __typename?: 'SimpleProductToVariationAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VariationAttribute>
}

/** Product stock status enumeration */
export enum StockStatusEnum {
  InStock = 'IN_STOCK',
  OnBackorder = 'ON_BACKORDER',
  OutOfStock = 'OUT_OF_STOCK',
}

/** The tag type */
export type Tag = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier &
  MenuItemLinkable & {
    __typename?: 'Tag'
    /** Connection between the tag type and the ContentNode type */
    contentNodes?: Maybe<TagToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /** Connection between the tag type and the post type */
    posts?: Maybe<TagToPostConnection>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    tagId?: Maybe<Scalars['Int']>
    /** Connection between the tag type and the Taxonomy type */
    taxonomy?: Maybe<TagToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
  }

/** The tag type */
export type TagContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<TagToContentNodeConnectionWhereArgs>
}

/** The tag type */
export type TagEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The tag type */
export type TagEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The tag type */
export type TagPostsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<TagToPostConnectionWhereArgs>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum TagIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the tag type and the ContentNode type */
export type TagToContentNodeConnection = {
  __typename?: 'TagToContentNodeConnection'
  /** Edges for the TagToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<TagToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type TagToContentNodeConnectionEdge = {
  __typename?: 'TagToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the TagToContentNodeConnection connection */
export type TagToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfTagEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the tag type and the post type */
export type TagToPostConnection = {
  __typename?: 'TagToPostConnection'
  /** Edges for the TagToPostConnection connection */
  edges?: Maybe<Array<Maybe<TagToPostConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type TagToPostConnectionEdge = {
  __typename?: 'TagToPostConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Post>
}

/** Arguments for filtering the TagToPostConnection connection */
export type TagToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the tag type and the Taxonomy type */
export type TagToTaxonomyConnectionEdge = {
  __typename?: 'TagToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** Tax class enumeration */
export enum TaxClassEnum {
  /** Inherits Tax class from cart */
  InheritCart = 'INHERIT_CART',
  ReducedRate = 'REDUCED_RATE',
  /** Standard Tax rate */
  Standard = 'STANDARD',
  ZeroRate = 'ZERO_RATE',
}

/** a tax line object */
export type TaxLine = {
  __typename?: 'TaxLine'
  /** The ID of the order item in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** Is this a compound tax rate? */
  isCompound?: Maybe<Scalars['Boolean']>
  /** Tax rate label */
  label?: Maybe<Scalars['String']>
  /** Object meta data */
  metaData?: Maybe<Array<Maybe<MetaData>>>
  /** The Id of the order the order item belongs to. */
  orderId?: Maybe<Scalars['Int']>
  /** Tax rate code/name */
  rateCode?: Maybe<Scalars['String']>
  /** Tax line&#039;s shipping tax total */
  shippingTaxTotal?: Maybe<Scalars['String']>
  /** Tax line&#039;s tax rate */
  taxRate?: Maybe<TaxRate>
  /** Tax total (not including shipping taxes) */
  taxTotal?: Maybe<Scalars['String']>
}

/** a tax line object */
export type TaxLineMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A Tax rate object */
export type TaxRate = Node & {
  __typename?: 'TaxRate'
  /** City name. */
  city?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Tax class. Default is standard. */
  class?: Maybe<TaxClassEnum>
  /** Whether or not this is a compound rate. */
  compound?: Maybe<Scalars['Boolean']>
  /** Country ISO 3166 code. */
  country?: Maybe<Scalars['String']>
  /** The ID of the customer in the database */
  databaseId?: Maybe<Scalars['Int']>
  /** The globally unique identifier for the tax rate. */
  id: Scalars['ID']
  /** Tax rate name. */
  name?: Maybe<Scalars['String']>
  /** Indicates the order that will appear in queries. */
  order?: Maybe<Scalars['Int']>
  /** Postcode/ZIP. */
  postcode?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Tax priority. */
  priority?: Maybe<Scalars['Int']>
  /** Tax rate. */
  rate?: Maybe<Scalars['String']>
  /** Whether or not this tax rate also gets applied to shipping. */
  shipping?: Maybe<Scalars['Boolean']>
  /** State code. */
  state?: Maybe<Scalars['String']>
}

/** Field to order the connection by */
export enum TaxRateConnectionOrderbyEnum {
  Id = 'ID',
  Order = 'ORDER',
}

/** Options for ordering the connection */
export type TaxRateConnectionOrderbyInput = {
  field: TaxRateConnectionOrderbyEnum
  order?: Maybe<OrderEnum>
}

/** The Type of Identifier used to fetch a single Tax rate. Default is ID. */
export enum TaxRateIdTypeEnum {
  /** Identify a resource by the Database ID. */
  DatabaseId = 'DATABASE_ID',
  /** Identify a resource by the (hashed) Global ID. */
  Id = 'ID',
}

/** Product tax status enumeration */
export enum TaxStatusEnum {
  None = 'NONE',
  Shipping = 'SHIPPING',
  Taxable = 'TAXABLE',
}

/** A taxonomy object */
export type Taxonomy = Node & {
  __typename?: 'Taxonomy'
  /** List of Content Types associated with the Taxonomy */
  connectedContentTypes?: Maybe<TaxonomyToContentTypeConnection>
  /** Description of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;description */
  description?: Maybe<Scalars['String']>
  /** The plural name of the post type within the GraphQL Schema. */
  graphqlPluralName?: Maybe<Scalars['String']>
  /** The singular name of the post type within the GraphQL Schema. */
  graphqlSingleName?: Maybe<Scalars['String']>
  /** Whether the taxonomy is hierarchical */
  hierarchical?: Maybe<Scalars['Boolean']>
  /** The globally unique identifier of the taxonomy object. */
  id: Scalars['ID']
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** Name of the taxonomy shown in the menu. Usually plural. */
  label?: Maybe<Scalars['String']>
  /** The display name of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;label */
  name?: Maybe<Scalars['String']>
  /** Whether the taxonomy is publicly queryable */
  public?: Maybe<Scalars['Boolean']>
  /** Name of content type to diplay in REST API &quot;wp/v2&quot; namespace. */
  restBase?: Maybe<Scalars['String']>
  /** The REST Controller class assigned to handling this content type. */
  restControllerClass?: Maybe<Scalars['String']>
  /** Whether to show the taxonomy as part of a tag cloud widget. This field is equivalent to WP_Taxonomy-&gt;show_tagcloud */
  showCloud?: Maybe<Scalars['Boolean']>
  /** Whether to display a column for the taxonomy on its post type listing screens. */
  showInAdminColumn?: Maybe<Scalars['Boolean']>
  /** Whether to add the post type to the GraphQL Schema. */
  showInGraphql?: Maybe<Scalars['Boolean']>
  /** Whether to show the taxonomy in the admin menu */
  showInMenu?: Maybe<Scalars['Boolean']>
  /** Whether the taxonomy is available for selection in navigation menus. */
  showInNavMenus?: Maybe<Scalars['Boolean']>
  /** Whether to show the taxonomy in the quick/bulk edit panel. */
  showInQuickEdit?: Maybe<Scalars['Boolean']>
  /** Whether to add the post type route in the REST API &quot;wp/v2&quot; namespace. */
  showInRest?: Maybe<Scalars['Boolean']>
  /** Whether to generate and allow a UI for managing terms in this taxonomy in the admin */
  showUi?: Maybe<Scalars['Boolean']>
}

/** A taxonomy object */
export type TaxonomyConnectedContentTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** Allowed taxonomies */
export enum TaxonomyEnum {
  /** Taxonomy enum category */
  Category = 'CATEGORY',
  /** Taxonomy enum pa_color */
  Pacolor = 'PACOLOR',
  /** Taxonomy enum pa_size */
  Pasize = 'PASIZE',
  /** Taxonomy enum post_format */
  Postformat = 'POSTFORMAT',
  /** Taxonomy enum product_cat */
  Productcategory = 'PRODUCTCATEGORY',
  /** Taxonomy enum product_tag */
  Producttag = 'PRODUCTTAG',
  /** Taxonomy enum product_type */
  Producttype = 'PRODUCTTYPE',
  /** Taxonomy enum product_shipping_class */
  Shippingclass = 'SHIPPINGCLASS',
  /** Taxonomy enum post_tag */
  Tag = 'TAG',
  /** Taxonomy enum product_visibility */
  Visibleproduct = 'VISIBLEPRODUCT',
}

/** The Type of Identifier used to fetch a single Taxonomy node. To be used along with the "id" field. Default is "ID". */
export enum TaxonomyIdTypeEnum {
  /** The globally unique ID */
  Id = 'ID',
  /** The name of the taxonomy */
  Name = 'NAME',
}

/** Taxonomy query operators */
export enum TaxonomyOperatorEnum {
  And = 'AND',
  Exists = 'EXISTS',
  In = 'IN',
  NotExists = 'NOT_EXISTS',
  NotIn = 'NOT_IN',
}

/** Connection between the Taxonomy type and the ContentType type */
export type TaxonomyToContentTypeConnection = {
  __typename?: 'TaxonomyToContentTypeConnection'
  /** Edges for the TaxonomyToContentTypeConnection connection */
  edges?: Maybe<Array<Maybe<TaxonomyToContentTypeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentType>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type TaxonomyToContentTypeConnectionEdge = {
  __typename?: 'TaxonomyToContentTypeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentType>
}

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNode = {
  /** The number of objects connected to the object */
  count?: Maybe<Scalars['Int']>
  /** Identifies the primary key from the database. */
  databaseId: Scalars['Int']
  /** The description of the object */
  description?: Maybe<Scalars['String']>
  /** Connection between the TermNode type and the EnqueuedScript type */
  enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
  /** Connection between the TermNode type and the EnqueuedStylesheet type */
  enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
  /** The unique resource identifier path */
  id: Scalars['ID']
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']
  /** The link to the term */
  link?: Maybe<Scalars['String']>
  /** The human friendly name of the object. */
  name?: Maybe<Scalars['String']>
  /** An alphanumeric identifier for the object unique to its type. */
  slug?: Maybe<Scalars['String']>
  /** The ID of the term group that this term object belongs to */
  termGroupId?: Maybe<Scalars['Int']>
  /** The taxonomy ID that the object is associated with */
  termTaxonomyId?: Maybe<Scalars['Int']>
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']>
}

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNodeEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** Terms are nodes within a Taxonomy, used to group and relate other nodes. */
export type TermNodeEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single resource. Default is "ID". To be used along with the "id" field. */
export enum TermNodeIdTypeEnum {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the TermNode type and the EnqueuedScript type */
export type TermNodeToEnqueuedScriptConnection = {
  __typename?: 'TermNodeToEnqueuedScriptConnection'
  /** Edges for the TermNodeToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<TermNodeToEnqueuedScriptConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type TermNodeToEnqueuedScriptConnectionEdge = {
  __typename?: 'TermNodeToEnqueuedScriptConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>
}

/** Connection between the TermNode type and the EnqueuedStylesheet type */
export type TermNodeToEnqueuedStylesheetConnection = {
  __typename?: 'TermNodeToEnqueuedStylesheetConnection'
  /** Edges for the TermNodeToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<TermNodeToEnqueuedStylesheetConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type TermNodeToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'TermNodeToEnqueuedStylesheetConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>
}

/** Options for ordering the connection by */
export enum TermObjectsConnectionOrderbyEnum {
  /** Order the connection by item count. */
  Count = 'COUNT',
  /** Order the connection by description. */
  Description = 'DESCRIPTION',
  /** Order the connection by name. */
  Name = 'NAME',
  /** Order the connection by slug. */
  Slug = 'SLUG',
  /** Order the connection by term group. */
  TermGroup = 'TERM_GROUP',
  /** Order the connection by term id. */
  TermId = 'TERM_ID',
  /** Order the connection by term order. */
  TermOrder = 'TERM_ORDER',
}

/** A theme object */
export type Theme = Node & {
  __typename?: 'Theme'
  /** Name of the theme author(s), could also be a company name. This field is equivalent to WP_Theme-&gt;get( &quot;Author&quot; ). */
  author?: Maybe<Scalars['String']>
  /** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;AuthorURI&quot; ). */
  authorUri?: Maybe<Scalars['String']>
  /** The description of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Description&quot; ). */
  description?: Maybe<Scalars['String']>
  /** The globally unique identifier of the theme object. */
  id: Scalars['ID']
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** Display name of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Name&quot; ). */
  name?: Maybe<Scalars['String']>
  /** The URL of the screenshot for the theme. The screenshot is intended to give an overview of what the theme looks like. This field is equivalent to WP_Theme-&gt;get_screenshot(). */
  screenshot?: Maybe<Scalars['String']>
  /** The theme slug is used to internally match themes. Theme slugs can have subdirectories like: my-theme/sub-theme. This field is equivalent to WP_Theme-&gt;get_stylesheet(). */
  slug?: Maybe<Scalars['String']>
  /** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;Tags&quot; ). */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  /** A URI if the theme has a website associated with it. The Theme URI is handy for directing users to a theme site for support etc. This field is equivalent to WP_Theme-&gt;get( &quot;ThemeURI&quot; ). */
  themeUri?: Maybe<Scalars['String']>
  /** The current version of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Version&quot; ). */
  version?: Maybe<Scalars['String']>
}

/** Any node that has a URI */
export type UniformResourceIdentifiable = {
  /** The unique resource identifier path */
  id: Scalars['ID']
  /** Whether the node is a Content Node */
  isContentNode: Scalars['Boolean']
  /** Whether the node is a Term */
  isTermNode: Scalars['Boolean']
  /** The unique resource identifier path */
  uri?: Maybe<Scalars['String']>
}

/** Input for the UpdateCategory mutation */
export type UpdateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the category object */
  description?: Maybe<Scalars['String']>
  /** The ID of the category object to update */
  id: Scalars['ID']
  /** The name of the category object to mutate */
  name?: Maybe<Scalars['String']>
  /** The ID of the category that should be set as the parent */
  parentId?: Maybe<Scalars['ID']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdateCategory mutation */
export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload'
  /** The created category */
  category?: Maybe<Category>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the updateComment mutation */
export type UpdateCommentInput = {
  /** The approval status of the comment. */
  approved?: Maybe<Scalars['String']>
  /** The name of the comment's author. */
  author?: Maybe<Scalars['String']>
  /** The email of the comment's author. */
  authorEmail?: Maybe<Scalars['String']>
  /** The url of the comment's author. */
  authorUrl?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the post object the comment belongs to. */
  commentOn?: Maybe<Scalars['Int']>
  /** Content of the comment. */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** The ID of the comment being updated. */
  id: Scalars['ID']
  /** Parent comment of current comment. */
  parent?: Maybe<Scalars['ID']>
  /** Type of comment. */
  type?: Maybe<Scalars['String']>
}

/** The payload for the updateComment mutation */
export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment that was created */
  comment?: Maybe<Comment>
  /** Whether the mutation succeeded. If the comment is not approved, the server will not return the comment to a non authenticated user, but a success message can be returned if the create succeeded, and the client can optimistically add the comment to the client cache */
  success?: Maybe<Scalars['Boolean']>
}

/** Input for the updateCoupon mutation */
export type UpdateCouponInput = {
  /** The amount of discount. Should always be numeric, even if setting a percentage. */
  amount?: Maybe<Scalars['Float']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Coupon code. */
  code?: Maybe<Scalars['String']>
  /** The date the coupon expires, in the site's timezone. */
  dateExpires?: Maybe<Scalars['String']>
  /** The date the coupon expires, as GMT. */
  dateExpiresGmt?: Maybe<Scalars['String']>
  /** Coupon description. */
  description?: Maybe<Scalars['String']>
  /** Determines the type of discount that will be applied. */
  discountType?: Maybe<DiscountTypeEnum>
  /** List of email addresses that can use this coupon. */
  emailRestrictions?: Maybe<Array<Maybe<Scalars['String']>>>
  /** If true, this coupon will not be applied to items that have sale prices. */
  excludeSaleItems?: Maybe<Scalars['Boolean']>
  /** List of category IDs the coupon does not apply to. */
  excludedProductCategories?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** List of product IDs the coupon cannot be used on. */
  excludedProductIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** If true and if the free shipping method requires a coupon, this coupon will enable free shipping. */
  freeShipping?: Maybe<Scalars['Boolean']>
  /** Unique identifier for the object. */
  id: Scalars['ID']
  /** If true, the coupon can only be used individually. Other applied coupons will be removed from the cart. */
  individualUse?: Maybe<Scalars['Boolean']>
  /** Max number of items in the cart the coupon can be applied to. */
  limitUsageToXItems?: Maybe<Scalars['Int']>
  /** Maximum order amount allowed when using the coupon. */
  maximumAmount?: Maybe<Scalars['String']>
  /** Meta data. */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** Minimum order amount that needs to be in the cart before coupon applies. */
  minimumAmount?: Maybe<Scalars['String']>
  /** List of category IDs the coupon applies to. */
  productCategories?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** List of product IDs the coupon can be used on. */
  productIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** How many times the coupon can be used in total. */
  usageLimit?: Maybe<Scalars['Int']>
  /** How many times the coupon can be used per customer. */
  usageLimitPerUser?: Maybe<Scalars['Int']>
}

/** The payload for the updateCoupon mutation */
export type UpdateCouponPayload = {
  __typename?: 'UpdateCouponPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  coupon?: Maybe<Coupon>
}

/** Input for the updateCustomer mutation */
export type UpdateCustomerInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>
  /** Customer billing information */
  billing?: Maybe<CustomerAddressInput>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>
  /** The ID of the user */
  id?: Maybe<Scalars['ID']>
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>
  /** User's locale. */
  locale?: Maybe<Scalars['String']>
  /** Meta data. */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>
  /** An array of roles to be assigned to the user. */
  roles?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Customer shipping address */
  shipping?: Maybe<CustomerAddressInput>
  /** Customer shipping is identical to billing address */
  shippingSameAsBilling?: Maybe<Scalars['Boolean']>
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>
}

/** The payload for the updateCustomer mutation */
export type UpdateCustomerPayload = {
  __typename?: 'UpdateCustomerPayload'
  /** JWT Token that can be used in future requests for Authentication */
  authToken?: Maybe<Scalars['String']>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  customer?: Maybe<Customer>
  /** A JWT token that can be used in future requests to get a refreshed jwtAuthToken. If the refresh token used in a request is revoked or otherwise invalid, a valid Auth token will NOT be issued in the response headers. */
  refreshToken?: Maybe<Scalars['String']>
}

/** Input for the updateItemQuantities mutation */
export type UpdateItemQuantitiesInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Cart item being updated */
  items?: Maybe<Array<Maybe<CartItemQuantityInput>>>
}

/** The payload for the updateItemQuantities mutation */
export type UpdateItemQuantitiesPayload = {
  __typename?: 'UpdateItemQuantitiesPayload'
  cart?: Maybe<Cart>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  items?: Maybe<Array<Maybe<CartItem>>>
  removed?: Maybe<Array<Maybe<CartItem>>>
  updated?: Maybe<Array<Maybe<CartItem>>>
}

/** Input for the updateMediaItem mutation */
export type UpdateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: Maybe<Scalars['String']>
  /** The userId to assign as the author of the mediaItem */
  authorId?: Maybe<Scalars['ID']>
  /** The caption for the mediaItem */
  caption?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment status for the mediaItem */
  commentStatus?: Maybe<Scalars['String']>
  /** The date of the mediaItem */
  date?: Maybe<Scalars['String']>
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: Maybe<Scalars['String']>
  /** Description of the mediaItem */
  description?: Maybe<Scalars['String']>
  /** The file name of the mediaItem */
  filePath?: Maybe<Scalars['String']>
  /** The file type of the mediaItem */
  fileType?: Maybe<MimeTypeEnum>
  /** The ID of the mediaItem object */
  id: Scalars['ID']
  /** The WordPress post ID or the graphQL postId of the parent object */
  parentId?: Maybe<Scalars['ID']>
  /** The ping status for the mediaItem */
  pingStatus?: Maybe<Scalars['String']>
  /** The slug of the mediaItem */
  slug?: Maybe<Scalars['String']>
  /** The status of the mediaItem */
  status?: Maybe<MediaItemStatusEnum>
  /** The title of the mediaItem */
  title?: Maybe<Scalars['String']>
}

/** The payload for the updateMediaItem mutation */
export type UpdateMediaItemPayload = {
  __typename?: 'UpdateMediaItemPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The MediaItem object mutation type. */
  mediaItem?: Maybe<MediaItem>
}

/** Input for the updateOrder mutation */
export type UpdateOrderInput = {
  /** Order billing address */
  billing?: Maybe<CustomerAddressInput>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Coupons codes to be applied to order */
  coupons?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Currency the order was created with, in ISO format. */
  currency?: Maybe<Scalars['String']>
  /** Order customer ID */
  customerId?: Maybe<Scalars['Int']>
  /** Note left by customer during checkout. */
  customerNote?: Maybe<Scalars['String']>
  /** Order shipping lines */
  feeLines?: Maybe<Array<Maybe<FeeLineInput>>>
  /** Order global ID */
  id?: Maybe<Scalars['ID']>
  /** Define if the order is paid. It will set the status to processing and reduce stock items. */
  isPaid?: Maybe<Scalars['Boolean']>
  /** Order line items */
  lineItems?: Maybe<Array<Maybe<LineItemInput>>>
  /** Order meta data */
  metaData?: Maybe<Array<Maybe<MetaDataInput>>>
  /** Order WP ID */
  orderId?: Maybe<Scalars['Int']>
  /** Parent order ID. */
  parentId?: Maybe<Scalars['Int']>
  /** Payment method ID. */
  paymentMethod?: Maybe<Scalars['String']>
  /** Payment method title. */
  paymentMethodTitle?: Maybe<Scalars['String']>
  /** Order shipping address */
  shipping?: Maybe<CustomerAddressInput>
  /** Order shipping lines */
  shippingLines?: Maybe<Array<Maybe<ShippingLineInput>>>
  /** Order status */
  status?: Maybe<OrderStatusEnum>
  /** Order transaction ID */
  transactionId?: Maybe<Scalars['String']>
}

/** The payload for the updateOrder mutation */
export type UpdateOrderPayload = {
  __typename?: 'UpdateOrderPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  order?: Maybe<Order>
}

/** Input for the UpdatePaColor mutation */
export type UpdatePaColorInput = {
  /** The slug that the pa_color will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the pa_color object */
  description?: Maybe<Scalars['String']>
  /** The ID of the paColor object to update */
  id: Scalars['ID']
  /** The name of the pa_color object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdatePaColor mutation */
export type UpdatePaColorPayload = {
  __typename?: 'UpdatePaColorPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created pa_color */
  paColor?: Maybe<PaColor>
}

/** Input for the UpdatePaSize mutation */
export type UpdatePaSizeInput = {
  /** The slug that the pa_size will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the pa_size object */
  description?: Maybe<Scalars['String']>
  /** The ID of the paSize object to update */
  id: Scalars['ID']
  /** The name of the pa_size object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdatePaSize mutation */
export type UpdatePaSizePayload = {
  __typename?: 'UpdatePaSizePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created pa_size */
  paSize?: Maybe<PaSize>
}

/** Input for the updatePage mutation */
export type UpdatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>
  /** The content of the object */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** The ID of the page object */
  id: Scalars['ID']
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>
  /** The ID of the parent object */
  parentId?: Maybe<Scalars['ID']>
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>
  /** The status of the object */
  status?: Maybe<PostStatusEnum>
  /** The title of the object */
  title?: Maybe<Scalars['String']>
}

/** The payload for the updatePage mutation */
export type UpdatePagePayload = {
  __typename?: 'UpdatePagePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The Post object mutation type. */
  page?: Maybe<Page>
}

/** Input for the UpdatePostFormat mutation */
export type UpdatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the post_format object */
  description?: Maybe<Scalars['String']>
  /** The ID of the postFormat object to update */
  id: Scalars['ID']
  /** The name of the post_format object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdatePostFormat mutation */
export type UpdatePostFormatPayload = {
  __typename?: 'UpdatePostFormatPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created post_format */
  postFormat?: Maybe<PostFormat>
}

/** Input for the updatePost mutation */
export type UpdatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: Maybe<Scalars['ID']>
  /** Set connections between the post and categories */
  categories?: Maybe<PostCategoriesInput>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The comment status for the object */
  commentStatus?: Maybe<Scalars['String']>
  /** The content of the object */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** The excerpt of the object */
  excerpt?: Maybe<Scalars['String']>
  /** The ID of the post object */
  id: Scalars['ID']
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: Maybe<Scalars['Int']>
  /** The password used to protect the content of the object */
  password?: Maybe<Scalars['String']>
  /** The ping status for the object */
  pingStatus?: Maybe<Scalars['String']>
  /** URLs that have been pinged. */
  pinged?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Set connections between the post and postFormats */
  postFormats?: Maybe<PostPostFormatsInput>
  /** The slug of the object */
  slug?: Maybe<Scalars['String']>
  /** The status of the object */
  status?: Maybe<PostStatusEnum>
  /** Set connections between the post and tags */
  tags?: Maybe<PostTagsInput>
  /** The title of the object */
  title?: Maybe<Scalars['String']>
  /** URLs queued to be pinged. */
  toPing?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The payload for the updatePost mutation */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The Post object mutation type. */
  post?: Maybe<Post>
}

/** Input for the UpdateProductCategory mutation */
export type UpdateProductCategoryInput = {
  /** The slug that the product_cat will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_cat object */
  description?: Maybe<Scalars['String']>
  /** The ID of the productCategory object to update */
  id: Scalars['ID']
  /** The name of the product_cat object to mutate */
  name?: Maybe<Scalars['String']>
  /** The ID of the product_cat that should be set as the parent */
  parentId?: Maybe<Scalars['ID']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdateProductCategory mutation */
export type UpdateProductCategoryPayload = {
  __typename?: 'UpdateProductCategoryPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_cat */
  productCategory?: Maybe<ProductCategory>
}

/** Input for the UpdateProductTag mutation */
export type UpdateProductTagInput = {
  /** The slug that the product_tag will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_tag object */
  description?: Maybe<Scalars['String']>
  /** The ID of the productTag object to update */
  id: Scalars['ID']
  /** The name of the product_tag object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdateProductTag mutation */
export type UpdateProductTagPayload = {
  __typename?: 'UpdateProductTagPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_tag */
  productTag?: Maybe<ProductTag>
}

/** Input for the UpdateProductType mutation */
export type UpdateProductTypeInput = {
  /** The slug that the product_type will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_type object */
  description?: Maybe<Scalars['String']>
  /** The ID of the productType object to update */
  id: Scalars['ID']
  /** The name of the product_type object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdateProductType mutation */
export type UpdateProductTypePayload = {
  __typename?: 'UpdateProductTypePayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_type */
  productType?: Maybe<ProductType>
}

/** Input for the updateReview mutation */
export type UpdateReviewInput = {
  /** The approval status of the comment. */
  approved?: Maybe<Scalars['String']>
  /** The name of the comment's author. */
  author?: Maybe<Scalars['String']>
  /** The email of the comment's author. */
  authorEmail?: Maybe<Scalars['String']>
  /** The url of the comment's author. */
  authorUrl?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the post object the comment belongs to. */
  commentOn?: Maybe<Scalars['Int']>
  /** Content of the comment. */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** The ID of the review being updated. */
  id: Scalars['ID']
  /** Parent comment of current comment. */
  parent?: Maybe<Scalars['ID']>
  /** Product rating */
  rating: Scalars['Int']
}

/** The payload for the updateReview mutation */
export type UpdateReviewPayload = {
  __typename?: 'UpdateReviewPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The product rating of the review that was created */
  rating?: Maybe<Scalars['Float']>
  /** The product review that was created */
  review?: Maybe<Comment>
}

/** Input for the updateSettings mutation */
export type UpdateSettingsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Allow people to submit comments on new posts. */
  discussionSettingsDefaultCommentStatus?: Maybe<Scalars['String']>
  /** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
  discussionSettingsDefaultPingStatus?: Maybe<Scalars['String']>
  /** A date format for all date strings. */
  generalSettingsDateFormat?: Maybe<Scalars['String']>
  /** Site tagline. */
  generalSettingsDescription?: Maybe<Scalars['String']>
  /** This address is used for admin purposes, like new user notification. */
  generalSettingsEmail?: Maybe<Scalars['String']>
  /** WordPress locale code. */
  generalSettingsLanguage?: Maybe<Scalars['String']>
  /** A day number of the week that the week should start on. */
  generalSettingsStartOfWeek?: Maybe<Scalars['Int']>
  /** A time format for all time strings. */
  generalSettingsTimeFormat?: Maybe<Scalars['String']>
  /** A city in the same timezone as you. */
  generalSettingsTimezone?: Maybe<Scalars['String']>
  /** Site title. */
  generalSettingsTitle?: Maybe<Scalars['String']>
  /** Site URL. */
  generalSettingsUrl?: Maybe<Scalars['String']>
  /** Blog pages show at most. */
  readingSettingsPostsPerPage?: Maybe<Scalars['Int']>
  /** Default post category. */
  writingSettingsDefaultCategory?: Maybe<Scalars['Int']>
  /** Default post format. */
  writingSettingsDefaultPostFormat?: Maybe<Scalars['String']>
  /** Convert emoticons like :-) and :-P to graphics on display. */
  writingSettingsUseSmilies?: Maybe<Scalars['Boolean']>
}

/** The payload for the updateSettings mutation */
export type UpdateSettingsPayload = {
  __typename?: 'UpdateSettingsPayload'
  /** Update all settings. */
  allSettings?: Maybe<Settings>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Update the discussion setting. */
  discussionSettings?: Maybe<DiscussionSettings>
  /** Update the general setting. */
  generalSettings?: Maybe<GeneralSettings>
  /** Update the reading setting. */
  readingSettings?: Maybe<ReadingSettings>
  /** Update the writing setting. */
  writingSettings?: Maybe<WritingSettings>
}

/** Input for the UpdateShippingClass mutation */
export type UpdateShippingClassInput = {
  /** The slug that the product_shipping_class will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_shipping_class object */
  description?: Maybe<Scalars['String']>
  /** The ID of the shippingClass object to update */
  id: Scalars['ID']
  /** The name of the product_shipping_class object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdateShippingClass mutation */
export type UpdateShippingClassPayload = {
  __typename?: 'UpdateShippingClassPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_shipping_class */
  shippingClass?: Maybe<ShippingClass>
}

/** Input for the updateShippingMethod mutation */
export type UpdateShippingMethodInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  shippingMethods?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The payload for the updateShippingMethod mutation */
export type UpdateShippingMethodPayload = {
  __typename?: 'UpdateShippingMethodPayload'
  cart?: Maybe<Cart>
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
}

/** Input for the UpdateTag mutation */
export type UpdateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the post_tag object */
  description?: Maybe<Scalars['String']>
  /** The ID of the tag object to update */
  id: Scalars['ID']
  /** The name of the post_tag object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdateTag mutation */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created post_tag */
  tag?: Maybe<Tag>
}

/** Input for the updateUser mutation */
export type UpdateUserInput = {
  /** User's AOL IM account. */
  aim?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** A string containing content about the user. */
  description?: Maybe<Scalars['String']>
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: Maybe<Scalars['String']>
  /** A string containing the user's email address. */
  email?: Maybe<Scalars['String']>
  /** 	The user's first name. */
  firstName?: Maybe<Scalars['String']>
  /** The ID of the user */
  id: Scalars['ID']
  /** User's Jabber account. */
  jabber?: Maybe<Scalars['String']>
  /** The user's last name. */
  lastName?: Maybe<Scalars['String']>
  /** User's locale. */
  locale?: Maybe<Scalars['String']>
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: Maybe<Scalars['String']>
  /** The user's nickname, defaults to the user's username. */
  nickname?: Maybe<Scalars['String']>
  /** A string that contains the plain text password for the user. */
  password?: Maybe<Scalars['String']>
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: Maybe<Scalars['Boolean']>
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: Maybe<Scalars['String']>
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: Maybe<Scalars['Boolean']>
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: Maybe<Scalars['String']>
  /** An array of roles to be assigned to the user. */
  roles?: Maybe<Array<Maybe<Scalars['String']>>>
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: Maybe<Scalars['String']>
  /** User's Yahoo IM account. */
  yim?: Maybe<Scalars['String']>
}

/** The payload for the updateUser mutation */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The User object mutation type. */
  user?: Maybe<User>
}

/** Input for the UpdateVisibleProduct mutation */
export type UpdateVisibleProductInput = {
  /** The slug that the product_visibility will be an alias of */
  aliasOf?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The description of the product_visibility object */
  description?: Maybe<Scalars['String']>
  /** The ID of the visibleProduct object to update */
  id: Scalars['ID']
  /** The name of the product_visibility object to mutate */
  name?: Maybe<Scalars['String']>
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: Maybe<Scalars['String']>
}

/** The payload for the UpdateVisibleProduct mutation */
export type UpdateVisibleProductPayload = {
  __typename?: 'UpdateVisibleProductPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The created product_visibility */
  visibleProduct?: Maybe<VisibleProduct>
}

/** A User object */
export type User = Node &
  UniformResourceIdentifiable &
  Commenter &
  DatabaseIdentifier & {
    __typename?: 'User'
    /** Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument. */
    avatar?: Maybe<Avatar>
    /** User metadata option name. Usually it will be &quot;wp_capabilities&quot;. */
    capKey?: Maybe<Scalars['String']>
    /** A list of capabilities (permissions) granted to the user */
    capabilities?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Connection between the User type and the Comment type */
    comments?: Maybe<UserToCommentConnection>
    /** Identifies the primary key from the database. */
    databaseId: Scalars['Int']
    /** Description of the user. */
    description?: Maybe<Scalars['String']>
    /** Email address of the user. This is equivalent to the WP_User-&gt;user_email property. */
    email?: Maybe<Scalars['String']>
    /** Connection between the User type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<UserToEnqueuedScriptConnection>
    /** Connection between the User type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<UserToEnqueuedStylesheetConnection>
    /** A complete list of capabilities including capabilities inherited from a role. This is equivalent to the array keys of WP_User-&gt;allcaps. */
    extraCapabilities?: Maybe<Array<Maybe<Scalars['String']>>>
    /** First name of the user. This is equivalent to the WP_User-&gt;user_first_name property. */
    firstName?: Maybe<Scalars['String']>
    /** The globally unique identifier for the user object. */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the JWT User secret has been revoked. If the secret has been revoked, auth tokens will not be issued until an admin, or user with proper capabilities re-issues a secret for the user. */
    isJwtAuthSecretRevoked: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The expiration for the JWT Token for the user. If not set custom for the user, it will use the default sitewide expiration setting */
    jwtAuthExpiration?: Maybe<Scalars['String']>
    /** A JWT token that can be used in future requests for authentication/authorization */
    jwtAuthToken?: Maybe<Scalars['String']>
    /** A JWT token that can be used in future requests to get a refreshed jwtAuthToken. If the refresh token used in a request is revoked or otherwise invalid, a valid Auth token will NOT be issued in the response headers. */
    jwtRefreshToken?: Maybe<Scalars['String']>
    /** A unique secret tied to the users JWT token that can be revoked or refreshed. Revoking the secret prevents JWT tokens from being issued to the user. Refreshing the token invalidates previously issued tokens, but allows new tokens to be issued. */
    jwtUserSecret?: Maybe<Scalars['String']>
    /** Last name of the user. This is equivalent to the WP_User-&gt;user_last_name property. */
    lastName?: Maybe<Scalars['String']>
    /** The preferred language locale set for the user. Value derived from get_user_locale(). */
    locale?: Maybe<Scalars['String']>
    /** Connection between the User type and the mediaItem type */
    mediaItems?: Maybe<UserToMediaItemConnection>
    /** Display name of the user. This is equivalent to the WP_User-&gt;dispaly_name property. */
    name?: Maybe<Scalars['String']>
    /** The nicename for the user. This field is equivalent to WP_User-&gt;user_nicename */
    nicename?: Maybe<Scalars['String']>
    /** Nickname of the user. */
    nickname?: Maybe<Scalars['String']>
    /** Connection between the User type and the page type */
    pages?: Maybe<UserToPageConnection>
    /** Connection between the User type and the post type */
    posts?: Maybe<UserToPostConnection>
    /** The date the user registered or was created. The field follows a full ISO8601 date string format. */
    registeredDate?: Maybe<Scalars['String']>
    /** Connection between the User and Revisions authored by the user */
    revisions?: Maybe<UserToContentRevisionUnionConnection>
    /** Connection between the User type and the UserRole type */
    roles?: Maybe<UserToUserRoleConnection>
    /** The slug for the user. This field is equivalent to WP_User-&gt;user_nicename */
    slug?: Maybe<Scalars['String']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** A website url that is associated with the user. */
    url?: Maybe<Scalars['String']>
    /**
     * The Id of the user. Equivalent to WP_User-&gt;ID
     * @deprecated Deprecated in favor of the databaseId field
     */
    userId?: Maybe<Scalars['Int']>
    /** Username for the user. This field is equivalent to WP_User-&gt;user_login. */
    username?: Maybe<Scalars['String']>
    /** A JWT token that can be used in future requests to for WooCommerce session identification */
    wooSessionToken?: Maybe<Scalars['String']>
  }

/** A User object */
export type UserAvatarArgs = {
  size?: Maybe<Scalars['Int']>
  forceDefault?: Maybe<Scalars['Boolean']>
  rating?: Maybe<AvatarRatingEnum>
}

/** A User object */
export type UserCommentsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<UserToCommentConnectionWhereArgs>
}

/** A User object */
export type UserEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A User object */
export type UserEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A User object */
export type UserMediaItemsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<UserToMediaItemConnectionWhereArgs>
}

/** A User object */
export type UserPagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<UserToPageConnectionWhereArgs>
}

/** A User object */
export type UserPostsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<UserToPostConnectionWhereArgs>
}

/** A User object */
export type UserRevisionsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<UserToContentRevisionUnionConnectionWhereArgs>
}

/** A User object */
export type UserRolesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single User node. To be used along with the "id" field. Default is "ID". */
export enum UserNodeIdTypeEnum {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The Email of the User */
  Email = 'EMAIL',
  /** The hashed Global ID */
  Id = 'ID',
  /** The slug of the User */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
  /** The username the User uses to login with */
  Username = 'USERNAME',
}

/** A user role object */
export type UserRole = Node & {
  __typename?: 'UserRole'
  /** The capabilities that belong to this role */
  capabilities?: Maybe<Array<Maybe<Scalars['String']>>>
  /** The display name of the role */
  displayName?: Maybe<Scalars['String']>
  /** The globally unique identifier for the user role object. */
  id: Scalars['ID']
  /** Whether the object is restricted from the current viewer */
  isRestricted?: Maybe<Scalars['Boolean']>
  /** The registered name of the role */
  name?: Maybe<Scalars['String']>
}

/** Names of available user roles */
export enum UserRoleEnum {
  /** User role with specific capabilities */
  Author = 'AUTHOR',
  /** User role with specific capabilities */
  Contributor = 'CONTRIBUTOR',
  /** User role with specific capabilities */
  Customer = 'CUSTOMER',
  /** User role with specific capabilities */
  Editor = 'EDITOR',
  /** User role with specific capabilities */
  ShopManager = 'SHOP_MANAGER',
  /** User role with specific capabilities */
  Subscriber = 'SUBSCRIBER',
}

/** Connection between the User type and the Comment type */
export type UserToCommentConnection = {
  __typename?: 'UserToCommentConnection'
  /** Edges for the UserToCommentConnection connection */
  edges?: Maybe<Array<Maybe<UserToCommentConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Comment>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToCommentConnectionEdge = {
  __typename?: 'UserToCommentConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Comment>
}

/** Arguments for filtering the UserToCommentConnection connection */
export type UserToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: Maybe<Scalars['String']>
  /** Array of author IDs to include comments for. */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Comment author URL. */
  authorUrl?: Maybe<Scalars['String']>
  /** Array of comment IDs to include. */
  commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Include comments of a given type. */
  commentType?: Maybe<Scalars['String']>
  /** Include comments from a given array of comment types. */
  commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: Maybe<Scalars['String']>
  /** Content object author ID to limit results by. */
  contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: Maybe<Scalars['ID']>
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Content object name to retrieve affiliated comments for. */
  contentName?: Maybe<Scalars['String']>
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: Maybe<Scalars['Int']>
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Karma score to retrieve matching comments for. */
  karma?: Maybe<Scalars['Int']>
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
  /** Field to order the comments by. */
  orderby?: Maybe<CommentsConnectionOrderbyEnum>
  /** Parent ID of comment to retrieve children of. */
  parent?: Maybe<Scalars['Int']>
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Search term(s) to retrieve matching comments for. */
  search?: Maybe<Scalars['String']>
  /** Comment status to limit results by. */
  status?: Maybe<Scalars['String']>
  /** Include comments for a specific user ID. */
  userId?: Maybe<Scalars['ID']>
}

/** Connection between the User type and the ContentRevisionUnion type */
export type UserToContentRevisionUnionConnection = {
  __typename?: 'UserToContentRevisionUnionConnection'
  /** Edges for the UserToContentRevisionUnionConnection connection */
  edges?: Maybe<Array<Maybe<UserToContentRevisionUnionConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToContentRevisionUnionConnectionEdge = {
  __typename?: 'UserToContentRevisionUnionConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentRevisionUnion>
}

/** Arguments for filtering the UserToContentRevisionUnionConnection connection */
export type UserToContentRevisionUnionConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypeEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the User type and the EnqueuedScript type */
export type UserToEnqueuedScriptConnection = {
  __typename?: 'UserToEnqueuedScriptConnection'
  /** Edges for the UserToEnqueuedScriptConnection connection */
  edges?: Maybe<Array<Maybe<UserToEnqueuedScriptConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedScript>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToEnqueuedScriptConnectionEdge = {
  __typename?: 'UserToEnqueuedScriptConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedScript>
}

/** Connection between the User type and the EnqueuedStylesheet type */
export type UserToEnqueuedStylesheetConnection = {
  __typename?: 'UserToEnqueuedStylesheetConnection'
  /** Edges for the UserToEnqueuedStylesheetConnection connection */
  edges?: Maybe<Array<Maybe<UserToEnqueuedStylesheetConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<EnqueuedStylesheet>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToEnqueuedStylesheetConnectionEdge = {
  __typename?: 'UserToEnqueuedStylesheetConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<EnqueuedStylesheet>
}

/** Connection between the User type and the mediaItem type */
export type UserToMediaItemConnection = {
  __typename?: 'UserToMediaItemConnection'
  /** Edges for the UserToMediaItemConnection connection */
  edges?: Maybe<Array<Maybe<UserToMediaItemConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<MediaItem>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToMediaItemConnectionEdge = {
  __typename?: 'UserToMediaItemConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<MediaItem>
}

/** Arguments for filtering the UserToMediaItemConnection connection */
export type UserToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the User type and the page type */
export type UserToPageConnection = {
  __typename?: 'UserToPageConnection'
  /** Edges for the UserToPageConnection connection */
  edges?: Maybe<Array<Maybe<UserToPageConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Page>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToPageConnectionEdge = {
  __typename?: 'UserToPageConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Page>
}

/** Arguments for filtering the UserToPageConnection connection */
export type UserToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the User type and the post type */
export type UserToPostConnection = {
  __typename?: 'UserToPostConnection'
  /** Edges for the UserToPostConnection connection */
  edges?: Maybe<Array<Maybe<UserToPostConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Post>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToPostConnectionEdge = {
  __typename?: 'UserToPostConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Post>
}

/** Arguments for filtering the UserToPostConnection connection */
export type UserToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: Maybe<Scalars['Int']>
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Find objects connected to the author by the author's nicename */
  authorName?: Maybe<Scalars['String']>
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Category ID */
  categoryId?: Maybe<Scalars['Int']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Use Category Slug */
  categoryName?: Maybe<Scalars['String']>
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Tag Slug */
  tag?: Maybe<Scalars['String']>
  /** Use Tag ID */
  tagId?: Maybe<Scalars['String']>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Array of tag slugs, used to display objects from one tag OR another */
  tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Array of tag slugs, used to exclude objects in specified tags */
  tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the User type and the UserRole type */
export type UserToUserRoleConnection = {
  __typename?: 'UserToUserRoleConnection'
  /** Edges for the UserToUserRoleConnection connection */
  edges?: Maybe<Array<Maybe<UserToUserRoleConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<UserRole>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type UserToUserRoleConnectionEdge = {
  __typename?: 'UserToUserRoleConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<UserRole>
}

/** Field to order the connection by */
export enum UsersConnectionOrderbyEnum {
  /** Order by display name */
  DisplayName = 'DISPLAY_NAME',
  /** Order by email address */
  Email = 'EMAIL',
  /** Order by login */
  Login = 'LOGIN',
  /** Preserve the login order given in the LOGIN_IN array */
  LoginIn = 'LOGIN_IN',
  /** Order by nice name */
  NiceName = 'NICE_NAME',
  /** Preserve the nice name order given in the NICE_NAME_IN array */
  NiceNameIn = 'NICE_NAME_IN',
  /** Order by registration date */
  Registered = 'REGISTERED',
  /** Order by URL */
  Url = 'URL',
}

/** Options for ordering the connection */
export type UsersConnectionOrderbyInput = {
  /** The field name used to sort the results. */
  field: UsersConnectionOrderbyEnum
  /** The cardinality of the order of the connection */
  order?: Maybe<OrderEnum>
}

/** Column used for searching for users. */
export enum UsersConnectionSearchColumnEnum {
  /** The user's email address. */
  Email = 'EMAIL',
  /** The globally unique ID. */
  Id = 'ID',
  /** The username the User uses to login with. */
  Login = 'LOGIN',
  /** A URL-friendly name for the user. The default is the user's username. */
  Nicename = 'NICENAME',
  /** The URL of the user\s website. */
  Url = 'URL',
}

/** A variable product object */
export type VariableProduct = Node &
  Product &
  NodeWithComments &
  NodeWithContentEditor &
  NodeWithFeaturedImage &
  ContentNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'VariableProduct'
    /** Connection between the Product type and the ProductAttribute type */
    attributes?: Maybe<ProductToProductAttributeConnection>
    /** Product average count */
    averageRating?: Maybe<Scalars['Float']>
    /** Product backorders status */
    backorders?: Maybe<BackordersEnum>
    /** Can product be backordered? */
    backordersAllowed?: Maybe<Scalars['Boolean']>
    /** Catalog visibility */
    catalogVisibility?: Maybe<CatalogVisibilityEnum>
    /** The number of comments. Even though WPGraphQL denotes this field as an integer, in WordPress this field should be saved as a numeric string for compatibility. */
    commentCount?: Maybe<Scalars['Int']>
    /** Whether the comments are open or closed for this particular post. */
    commentStatus?: Maybe<Scalars['String']>
    /** The content of the post. */
    content?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the ContentType type */
    contentType?: Maybe<ContentNodeToContentTypeConnectionEdge>
    /** Connection between the VariableProduct type and the Product type */
    crossSell?: Maybe<VariableProductToProductConnection>
    /** The ID of the product in the database */
    databaseId: Scalars['Int']
    /** Date product created */
    date?: Maybe<Scalars['String']>
    /** The publishing date set in GMT. */
    dateGmt?: Maybe<Scalars['String']>
    /** Date on sale from */
    dateOnSaleFrom?: Maybe<Scalars['String']>
    /** Date on sale to */
    dateOnSaleTo?: Maybe<Scalars['String']>
    /** Connection between the VariableProduct type and the VariationAttribute type */
    defaultAttributes?: Maybe<VariableProductToVariationAttributeConnection>
    /** Product description */
    description?: Maybe<Scalars['String']>
    /** The desired slug of the post */
    desiredSlug?: Maybe<Scalars['String']>
    /** If a user has edited the node within the past 15 seconds, this will return the user that last edited. Null if the edit lock doesn&#039;t exist or is greater than 15 seconds */
    editingLockedBy?: Maybe<ContentNodeToEditLockConnectionEdge>
    /** The RSS enclosure for the object */
    enclosure?: Maybe<Scalars['String']>
    /** Connection between the ContentNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<ContentNodeToEnqueuedScriptConnection>
    /** Connection between the ContentNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<ContentNodeToEnqueuedStylesheetConnection>
    /** If the product is featured */
    featured?: Maybe<Scalars['Boolean']>
    /** Connection between the NodeWithFeaturedImage type and the MediaItem type */
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>
    /** The database identifier for the featured image node assigned to the content node */
    featuredImageDatabaseId?: Maybe<Scalars['Int']>
    /** Globally unique ID of the featured image assigned to the node */
    featuredImageId?: Maybe<Scalars['ID']>
    /** Connection between the Product type and the MediaItem type */
    galleryImages?: Maybe<ProductToMediaItemConnection>
    /** Connection between the Product type and the GlobalProductAttribute type */
    globalAttributes?: Maybe<ProductToGlobalProductAttributeConnection>
    /** The global unique identifier for this post. This currently matches the value stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot; database table. */
    guid?: Maybe<Scalars['String']>
    /** Product&#039;s height */
    height?: Maybe<Scalars['String']>
    /** The globally unique identifier for the product */
    id: Scalars['ID']
    /** Main image */
    image?: Maybe<MediaItem>
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is a node in the preview state */
    isPreview?: Maybe<Scalars['Boolean']>
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The user that most recently edited the node */
    lastEditedBy?: Maybe<ContentNodeToEditLastConnectionEdge>
    /** Product&#039;s length */
    length?: Maybe<Scalars['String']>
    /** The permalink of the post */
    link?: Maybe<Scalars['String']>
    /** Connection between the Product type and the LocalProductAttribute type */
    localAttributes?: Maybe<ProductToLocalProductAttributeConnection>
    /** If product manage stock */
    manageStock?: Maybe<Scalars['Boolean']>
    /** Menu order */
    menuOrder?: Maybe<Scalars['Int']>
    /** Object meta data */
    metaData?: Maybe<Array<Maybe<MetaData>>>
    /** Date product last updated */
    modified?: Maybe<Scalars['String']>
    /** The GMT modified time for a post. If a post was recently updated the modified field will change to match the corresponding time in GMT. */
    modifiedGmt?: Maybe<Scalars['String']>
    /** Product name */
    name?: Maybe<Scalars['String']>
    /** Is product on sale? */
    onSale?: Maybe<Scalars['Boolean']>
    /** Connection between the Product type and the paColor type */
    paColors?: Maybe<ProductToPaColorConnection>
    /** Connection between the Product type and the paSize type */
    paSizes?: Maybe<ProductToPaSizeConnection>
    /** Parent product */
    parent?: Maybe<Product>
    /** The database id of the preview node */
    previewRevisionDatabaseId?: Maybe<Scalars['Int']>
    /** Whether the object is a node in the preview state */
    previewRevisionId?: Maybe<Scalars['ID']>
    /** Product&#039;s active price */
    price?: Maybe<Scalars['String']>
    /** Connection between the Product type and the productCategory type */
    productCategories?: Maybe<ProductToProductCategoryConnection>
    /** Connection between the Product type and the productTag type */
    productTags?: Maybe<ProductToProductTagConnection>
    /** Connection between the Product type and the productType type */
    productTypes?: Maybe<ProductToProductTypeConnection>
    /** Can product be purchased? */
    purchasable?: Maybe<Scalars['Boolean']>
    /** Purchase note */
    purchaseNote?: Maybe<Scalars['String']>
    /** Product&#039;s regular price */
    regularPrice?: Maybe<Scalars['String']>
    /** Connection between the Product type and the Product type */
    related?: Maybe<ProductToProductConnection>
    /** Product review count */
    reviewCount?: Maybe<Scalars['Int']>
    /** Connection between the Product type and the Comment type */
    reviews?: Maybe<ProductToCommentConnection>
    /** If reviews are allowed */
    reviewsAllowed?: Maybe<Scalars['Boolean']>
    /** Product&#039;s sale price */
    salePrice?: Maybe<Scalars['String']>
    /** shipping class ID */
    shippingClassId?: Maybe<Scalars['Int']>
    /** Connection between the Product type and the shippingClass type */
    shippingClasses?: Maybe<ProductToShippingClassConnection>
    /** Does product need to be shipped? */
    shippingRequired?: Maybe<Scalars['Boolean']>
    /** Is product shipping taxable? */
    shippingTaxable?: Maybe<Scalars['Boolean']>
    /** Product short description */
    shortDescription?: Maybe<Scalars['String']>
    /** Product SKU */
    sku?: Maybe<Scalars['String']>
    /** Product slug */
    slug?: Maybe<Scalars['String']>
    /** If should be sold individually */
    soldIndividually?: Maybe<Scalars['Boolean']>
    /** Product status */
    status?: Maybe<Scalars['String']>
    /** Number of items available for sale */
    stockQuantity?: Maybe<Scalars['Int']>
    /** Product stock status */
    stockStatus?: Maybe<StockStatusEnum>
    /** Tax class */
    taxClass?: Maybe<TaxClassEnum>
    /** Tax status */
    taxStatus?: Maybe<TaxStatusEnum>
    /** The template assigned to a node of content */
    template?: Maybe<ContentTemplate>
    /** Number total of sales */
    totalSales?: Maybe<Scalars['Int']>
    /** Product type */
    type?: Maybe<ProductTypesEnum>
    /** Connection between the Product type and the Product type */
    upsell?: Maybe<ProductToUpsellConnection>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /** Connection between the VariableProduct type and the ProductVariation type */
    variations?: Maybe<VariableProductToProductVariationConnection>
    /** Connection between the Product type and the visibleProduct type */
    visibleProducts?: Maybe<ProductToVisibleProductConnection>
    /** Product&#039;s weight */
    weight?: Maybe<Scalars['String']>
    /** Product&#039;s width */
    width?: Maybe<Scalars['String']>
  }

/** A variable product object */
export type VariableProductAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductAttributeConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductContentArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A variable product object */
export type VariableProductCrossSellArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<VariableProductToProductConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductDefaultAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A variable product object */
export type VariableProductDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A variable product object */
export type VariableProductEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A variable product object */
export type VariableProductEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** A variable product object */
export type VariableProductGalleryImagesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToMediaItemConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductGlobalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToGlobalProductAttributeConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductLocalAttributesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToLocalProductAttributeConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductMetaDataArgs = {
  key?: Maybe<Scalars['String']>
  keysIn?: Maybe<Array<Maybe<Scalars['String']>>>
  multiple?: Maybe<Scalars['Boolean']>
}

/** A variable product object */
export type VariableProductPaColorsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaColorConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductPaSizesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToPaSizeConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A variable product object */
export type VariableProductProductCategoriesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductCategoryConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductProductTagsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTagConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductProductTypesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductTypeConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductRegularPriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A variable product object */
export type VariableProductRelatedArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToProductConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductReviewsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToCommentConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductSalePriceArgs = {
  format?: Maybe<PricingFieldFormatEnum>
}

/** A variable product object */
export type VariableProductShippingClassesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToShippingClassConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductShortDescriptionArgs = {
  format?: Maybe<PostObjectFieldFormatEnum>
}

/** A variable product object */
export type VariableProductUpsellArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToUpsellConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductVariationsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<VariableProductToProductVariationConnectionWhereArgs>
}

/** A variable product object */
export type VariableProductVisibleProductsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ProductToVisibleProductConnectionWhereArgs>
}

/** Connection between the VariableProduct type and the Product type */
export type VariableProductToProductConnection = {
  __typename?: 'VariableProductToProductConnection'
  /** Edges for the VariableProductToProductConnection connection */
  edges?: Maybe<Array<Maybe<VariableProductToProductConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<Product>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type VariableProductToProductConnectionEdge = {
  __typename?: 'VariableProductToProductConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<Product>
}

/** Arguments for filtering the VariableProductToProductConnection connection */
export type VariableProductToProductConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the VariableProduct type and the ProductVariation type */
export type VariableProductToProductVariationConnection = {
  __typename?: 'VariableProductToProductVariationConnection'
  /** Edges for the VariableProductToProductVariationConnection connection */
  edges?: Maybe<Array<Maybe<VariableProductToProductVariationConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ProductVariation>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type VariableProductToProductVariationConnectionEdge = {
  __typename?: 'VariableProductToProductVariationConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ProductVariation>
}

/** Arguments for filtering the VariableProductToProductVariationConnection connection */
export type VariableProductToProductVariationConnectionWhereArgs = {
  /** Limit result set to products with a specific attribute. Use the taxonomy name/attribute slug. */
  attribute?: Maybe<Scalars['String']>
  /** Limit result set to products with a specific attribute term ID (required an assigned attribute). */
  attributeTerm?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  category?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific category name. */
  categoryId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Filter the connection based on dates. */
  dateQuery?: Maybe<DateQueryInput>
  /** Ensure result set excludes specific IDs. */
  exclude?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to featured products. */
  featured?: Maybe<Scalars['Boolean']>
  /** Limit result set to specific ids. */
  include?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a maximum price. */
  maxPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products based on a minimum price. */
  minPrice?: Maybe<Scalars['Float']>
  /** Limit result set to products on sale. */
  onSale?: Maybe<Scalars['Boolean']>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<ProductsOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: Maybe<Scalars['Int']>
  /** Specify objects whose parent is in an array. */
  parentIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products based on a keyword search. */
  search?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: Maybe<Scalars['Int']>
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: Maybe<Scalars['String']>
  /** Limit result set to products with specific slugs. */
  slugIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products assigned a specific status. */
  status?: Maybe<Scalars['String']>
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: Maybe<Array<Maybe<StockStatusEnum>>>
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: Maybe<Scalars['Boolean']>
  /** Limit result set to products assigned a specific tag name. */
  tag?: Maybe<Scalars['String']>
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: Maybe<Scalars['Int']>
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: Maybe<ProductTaxonomyInput>
  /** Limit result set to products assigned a specific type. */
  type?: Maybe<ProductTypesEnum>
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: Maybe<Array<Maybe<ProductTypesEnum>>>
  /** Limit result set to products with a specific visibility level. */
  visibility?: Maybe<CatalogVisibilityEnum>
}

/** Connection between the VariableProduct type and the VariationAttribute type */
export type VariableProductToVariationAttributeConnection = {
  __typename?: 'VariableProductToVariationAttributeConnection'
  /** Edges for the VariableProductToVariationAttributeConnection connection */
  edges?: Maybe<Array<Maybe<VariableProductToVariationAttributeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<VariationAttribute>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type VariableProductToVariationAttributeConnectionEdge = {
  __typename?: 'VariableProductToVariationAttributeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<VariationAttribute>
}

/** A product variation attribute object */
export type VariationAttribute = Attribute & {
  __typename?: 'VariationAttribute'
  /** The Database ID of the attribute. */
  attributeId?: Maybe<Scalars['Int']>
  /** The Global ID of the attribute. */
  id: Scalars['ID']
  /** Label of attribute */
  label?: Maybe<Scalars['String']>
  /** Name of attribute */
  name?: Maybe<Scalars['String']>
  /** Selected value of attribute */
  value?: Maybe<Scalars['String']>
}

/** The visibleProduct type */
export type VisibleProduct = Node &
  TermNode &
  UniformResourceIdentifiable &
  DatabaseIdentifier & {
    __typename?: 'VisibleProduct'
    /** Connection between the visibleProduct type and the ContentNode type */
    contentNodes?: Maybe<VisibleProductToContentNodeConnection>
    /** The number of objects connected to the object */
    count?: Maybe<Scalars['Int']>
    /** The unique identifier stored in the database */
    databaseId: Scalars['Int']
    /** The description of the object */
    description?: Maybe<Scalars['String']>
    /** Connection between the TermNode type and the EnqueuedScript type */
    enqueuedScripts?: Maybe<TermNodeToEnqueuedScriptConnection>
    /** Connection between the TermNode type and the EnqueuedStylesheet type */
    enqueuedStylesheets?: Maybe<TermNodeToEnqueuedStylesheetConnection>
    /** The unique resource identifier path */
    id: Scalars['ID']
    /** Whether the node is a Content Node */
    isContentNode: Scalars['Boolean']
    /** Whether the object is restricted from the current viewer */
    isRestricted?: Maybe<Scalars['Boolean']>
    /** Whether the node is a Term */
    isTermNode: Scalars['Boolean']
    /** The link to the term */
    link?: Maybe<Scalars['String']>
    /** The human friendly name of the object. */
    name?: Maybe<Scalars['String']>
    /** An alphanumeric identifier for the object unique to its type. */
    slug?: Maybe<Scalars['String']>
    /** Connection between the visibleProduct type and the Taxonomy type */
    taxonomy?: Maybe<VisibleProductToTaxonomyConnectionEdge>
    /** The ID of the term group that this term object belongs to */
    termGroupId?: Maybe<Scalars['Int']>
    /** The taxonomy ID that the object is associated with */
    termTaxonomyId?: Maybe<Scalars['Int']>
    /** The unique resource identifier path */
    uri?: Maybe<Scalars['String']>
    /**
     * The id field matches the WP_Post-&gt;ID field.
     * @deprecated Deprecated in favor of databaseId
     */
    visibleProductId?: Maybe<Scalars['Int']>
  }

/** The visibleProduct type */
export type VisibleProductContentNodesArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<VisibleProductToContentNodeConnectionWhereArgs>
}

/** The visibleProduct type */
export type VisibleProductEnqueuedScriptsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The visibleProduct type */
export type VisibleProductEnqueuedStylesheetsArgs = {
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
}

/** The Type of Identifier used to fetch a single resource. Default is ID. */
export enum VisibleProductIdType {
  /** The Database ID for the node */
  DatabaseId = 'DATABASE_ID',
  /** The hashed Global ID */
  Id = 'ID',
  /** The name of the node */
  Name = 'NAME',
  /** Url friendly name of the node */
  Slug = 'SLUG',
  /** The URI for the node */
  Uri = 'URI',
}

/** Connection between the visibleProduct type and the ContentNode type */
export type VisibleProductToContentNodeConnection = {
  __typename?: 'VisibleProductToContentNodeConnection'
  /** Edges for the VisibleProductToContentNodeConnection connection */
  edges?: Maybe<Array<Maybe<VisibleProductToContentNodeConnectionEdge>>>
  /** The nodes of the connection, without the edges */
  nodes?: Maybe<Array<Maybe<ContentNode>>>
  /** Information about pagination in a connection. */
  pageInfo?: Maybe<WpPageInfo>
}

/** An edge in a connection */
export type VisibleProductToContentNodeConnectionEdge = {
  __typename?: 'VisibleProductToContentNodeConnectionEdge'
  /** A cursor for use in pagination */
  cursor?: Maybe<Scalars['String']>
  /** The item at the end of the edge */
  node?: Maybe<ContentNode>
}

/** Arguments for filtering the VisibleProductToContentNodeConnection connection */
export type VisibleProductToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: Maybe<Array<Maybe<ContentTypesOfVisibleProductEnum>>>
  /** Filter the connection based on dates */
  dateQuery?: Maybe<DateQueryInput>
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: Maybe<Scalars['Boolean']>
  /** Specific ID of the object */
  id?: Maybe<Scalars['Int']>
  /** Array of IDs for the objects to retrieve */
  in?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Get objects with a specific mimeType property */
  mimeType?: Maybe<MimeTypeEnum>
  /** Slug / post_name of the object */
  name?: Maybe<Scalars['String']>
  /** Specify objects to retrieve. Use slugs */
  nameIn?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** What paramater to use to order the objects by. */
  orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: Maybe<Scalars['ID']>
  /** Specify objects whose parent is in an array */
  parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Specify posts whose parent is not in an array */
  parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Show posts with a specific password. */
  password?: Maybe<Scalars['String']>
  /** Show Posts based on a keyword search */
  search?: Maybe<Scalars['String']>
  /** Retrieve posts where post status is in an array. */
  stati?: Maybe<Array<Maybe<PostStatusEnum>>>
  /** Show posts with a specific status. */
  status?: Maybe<PostStatusEnum>
  /** Title of the object */
  title?: Maybe<Scalars['String']>
}

/** Connection between the visibleProduct type and the Taxonomy type */
export type VisibleProductToTaxonomyConnectionEdge = {
  __typename?: 'VisibleProductToTaxonomyConnectionEdge'
  /** The node of the connection, without the edges */
  node?: Maybe<Taxonomy>
}

/** Information about pagination in a connection. */
export type WpPageInfo = {
  __typename?: 'WPPageInfo'
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>
}

/** Input for the writeReview mutation */
export type WriteReviewInput = {
  /** The approval status of the comment. */
  approved?: Maybe<Scalars['String']>
  /** The name of the comment's author. */
  author?: Maybe<Scalars['String']>
  /** The email of the comment's author. */
  authorEmail?: Maybe<Scalars['String']>
  /** The url of the comment's author. */
  authorUrl?: Maybe<Scalars['String']>
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The ID of the post object the comment belongs to. */
  commentOn?: Maybe<Scalars['Int']>
  /** Content of the comment. */
  content?: Maybe<Scalars['String']>
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: Maybe<Scalars['String']>
  /** Parent comment of current comment. */
  parent?: Maybe<Scalars['ID']>
  /** Product rating */
  rating: Scalars['Int']
}

/** The payload for the writeReview mutation */
export type WriteReviewPayload = {
  __typename?: 'WriteReviewPayload'
  /** If a &#039;clientMutationId&#039; input is provided to the mutation, it will be returned as output on the mutation. This ID can be used by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: Maybe<Scalars['String']>
  /** The product rating of the review that was created */
  rating?: Maybe<Scalars['Float']>
  /** The product review that was created */
  review?: Maybe<Comment>
}

/** The writing setting type */
export type WritingSettings = {
  __typename?: 'WritingSettings'
  /** Default post category. */
  defaultCategory?: Maybe<Scalars['Int']>
  /** Default post format. */
  defaultPostFormat?: Maybe<Scalars['String']>
  /** Convert emoticons like :-) and :-P to graphics on display. */
  useSmilies?: Maybe<Scalars['Boolean']>
}

export type GetAllProductsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>
}>

export type GetAllProductsQuery = { __typename?: 'RootQuery' } & {
  products?: Maybe<
    { __typename?: 'RootQueryToProductConnection' } & {
      pageInfo?: Maybe<
        { __typename?: 'WPPageInfo' } & Pick<
          WpPageInfo,
          'hasNextPage' | 'hasPreviousPage'
        >
      >
      edges?: Maybe<
        Array<
          Maybe<
            { __typename?: 'RootQueryToProductConnectionEdge' } & {
              node?: Maybe<
                | ({ __typename?: 'ExternalProduct' } & Pick<
                    ExternalProduct,
                    'id' | 'name'
                  > & {
                      image?: Maybe<
                        { __typename?: 'MediaItem' } & Pick<
                          MediaItem,
                          'uri' | 'altText'
                        >
                      >
                    })
                | ({ __typename?: 'GroupProduct' } & Pick<
                    GroupProduct,
                    'id' | 'name'
                  > & {
                      image?: Maybe<
                        { __typename?: 'MediaItem' } & Pick<
                          MediaItem,
                          'uri' | 'altText'
                        >
                      >
                    })
                | ({ __typename?: 'SimpleProduct' } & Pick<
                    SimpleProduct,
                    'id' | 'name'
                  > & {
                      image?: Maybe<
                        { __typename?: 'MediaItem' } & Pick<
                          MediaItem,
                          'uri' | 'altText'
                        >
                      >
                    })
                | ({ __typename?: 'VariableProduct' } & Pick<
                    VariableProduct,
                    'id' | 'name'
                  > & {
                      image?: Maybe<
                        { __typename?: 'MediaItem' } & Pick<
                          MediaItem,
                          'uri' | 'altText'
                        >
                      >
                    })
              >
            }
          >
        >
      >
    }
  >
}

export type GetCustomerIdQueryVariables = Exact<{ [key: string]: never }>

export type GetCustomerIdQuery = { __typename?: 'RootQuery' } & {
  customer?: Maybe<{ __typename?: 'Customer' } & Pick<Customer, 'id'>>
}

export type GetCustomerQueryVariables = Exact<{ [key: string]: never }>

export type GetCustomerQuery = { __typename?: 'RootQuery' } & {
  customer?: Maybe<
    { __typename?: 'Customer' } & Pick<
      Customer,
      'id' | 'firstName' | 'lastName' | 'displayName' | 'email'
    >
  >
}

export type SettingQueryVariables = Exact<{ [key: string]: never }>

export type SettingQuery = { __typename?: 'RootQuery' } & {
  generalSettings?: Maybe<
    { __typename?: 'GeneralSettings' } & Pick<GeneralSettings, 'title'>
  >
}
