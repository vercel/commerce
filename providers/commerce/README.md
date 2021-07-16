# Commerce Framework

- [Commerce Framework](#commerce-framework)
  - [Commerce Hooks](#commerce-hooks)
    - [CommerceProvider](#commerceprovider)
  - [Authentication Hooks](#authentication-hooks)
    - [useSignup](#usesignup)
    - [useLogin](#uselogin)
    - [useLogout](#uselogout)
  - [Customer Hooks](#customer-hooks)
    - [useCustomer](#usecustomer)
  - [Product Hooks](#product-hooks)
    - [usePrice](#useprice)
    - [useSearch](#usesearch)
  - [Cart Hooks](#cart-hooks)
    - [useCart](#usecart)
    - [useAddItem](#useadditem)
    - [useUpdateItem](#useupdateitem)
    - [useRemoveItem](#useremoveitem)
  - [Wishlist Hooks](#wishlist-hooks)
  - [Commerce API](#commerce-api)
  - [More](#more)

The commerce framework ships multiple hooks and a Node.js API, both using an underlying headless e-commerce platform, which we call commerce providers.

The core features are:

- Code splitted hooks for data fetching using [SWR](https://swr.vercel.app/), and to handle common user actions
- A Node.js API for initial data population, static generation of content and for creating the API endpoints that connect to the hooks, if required.

> 👩‍🔬 If you would like to contribute a new provider, check the docs for [Adding a new Commerce Provider](./new-provider.md).

> 🚧 The core commerce framework is under active development, new features and updates will be continuously added over time. Breaking changes are expected while we finish the API.

## Commerce Hooks

A commerce hook is a [React hook](https://reactjs.org/docs/hooks-intro.html) that's connected to a commerce provider. They focus on user actions and data fetching of data that wasn't statically generated.

Data fetching hooks use [SWR](https://swr.vercel.app/) underneath and you're welcome to use any of its [return values](https://swr.vercel.app/docs/options#return-values) and [options](https://swr.vercel.app/docs/options#options). For example, using the `useCustomer` hook:

```jsx
const { data, isLoading, error } = useCustomer({
  swrOptions: {
    revalidateOnFocus: true,
  },
})
```

### CommerceProvider

This component adds the provider config and handlers to the context of your React tree for it's children. You can optionally pass the `locale` to it:

```jsx
import { CommerceProvider } from '@framework'

const App = ({ locale = 'en-US', children }) => {
  return <CommerceProvider locale={locale}>{children}</CommerceProvider>
}
```

## Authentication Hooks

### useSignup

Returns a _signup_ function that can be used to sign up the current visitor:

```jsx
import useSignup from '@framework/auth/use-signup'

const SignupView = () => {
  const signup = useSignup()

  const handleSignup = async () => {
    await signup({
      email,
      firstName,
      lastName,
      password,
    })
  }

  return <form onSubmit={handleSignup}>{children}</form>
}
```

### useLogin

Returns a _login_ function that can be used to sign in the current visitor into an existing customer:

```jsx
import useLogin from '@framework/auth/use-login'

const LoginView = () => {
  const login = useLogin()
  const handleLogin = async () => {
    await login({
      email,
      password,
    })
  }

  return <form onSubmit={handleLogin}>{children}</form>
}
```

### useLogout

Returns a _logout_ function that signs out the current customer when called.

```jsx
import useLogout from '@framework/auth/use-logout'

const LogoutButton = () => {
  const logout = useLogout()
  return (
    <button type="button" onClick={() => logout()}>
      Logout
    </button>
  )
}
```

## Customer Hooks

### useCustomer

Fetches and returns the data of the signed in customer:

```jsx
import useCustomer from '@framework/customer/use-customer'

const Profile = () => {
  const { data, isLoading, error } = useCustomer()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (!data) return null

  return <div>Hello, {data.firstName}</div>
}
```

## Product Hooks

### usePrice

Helper hook to format price according to the commerce locale and currency code. It also handles discounts:

```jsx
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'

// ...
const { data } = useCart()
const { price, discount, basePrice } = usePrice(
  data && {
    amount: data.subtotalPrice,
    currencyCode: data.currency.code,
    // If `baseAmount` is used, a discount will be calculated
    // baseAmount: number,
  }
)
// ...
```

### useSearch

Fetches and returns the products that match a set of filters:

```jsx
import useSearch from '@framework/product/use-search'

const SearchPage = ({ searchString, category, brand, sortStr }) => {
  const { data } = useSearch({
    search: searchString || '',
    categoryId: category?.entityId,
    brandId: brand?.entityId,
    sort: sortStr,
  })

  return (
    <Grid layout="normal">
      {data.products.map((product) => (
        <ProductCard key={product.path} product={product} />
      ))}
    </Grid>
  )
}
```

## Cart Hooks

### useCart

Fetches and returns the data of the current cart:

```jsx
import useCart from '@framework/cart/use-cart'

const CartTotal = () => {
  const { data, isLoading, isEmpty, error } = useCart()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (isEmpty) return <p>The cart is empty</p>

  return <p>The cart total is {data.totalPrice}</p>
}
```

### useAddItem

Returns a function that adds a new item to the cart when called, if this is the first item it will create the cart:

```jsx
import { useAddItem } from '@framework/cart'

const AddToCartButton = ({ productId, variantId }) => {
  const addItem = useAddItem()

  const addToCart = async () => {
    await addItem({
      productId,
      variantId,
    })
  }

  return <button onClick={addToCart}>Add To Cart</button>
}
```

### useUpdateItem

Returns a function that updates a current item in the cart when called, usually the quantity.

```jsx
import { useUpdateItem } from '@framework/cart'

const CartItemQuantity = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const updateItem = useUpdateItem({ item })

  const updateQuantity = async (e) => {
    const val = e.target.value

    setQuantity(val)
    await updateItem({ quantity: val })
  }

  return (
    <input
      type="number"
      max={99}
      min={0}
      value={quantity}
      onChange={updateQuantity}
    />
  )
}
```

If the `quantity` is lower than 1 the item will be removed from the cart.

### useRemoveItem

Returns a function that removes an item in the cart when called:

```jsx
import { useRemoveItem } from '@framework/cart'

const RemoveButton = ({ item }) => {
  const removeItem = useRemoveItem()
  const handleRemove = async () => {
    await removeItem(item)
  }

  return <button onClick={handleRemove}>Remove</button>
}
```

## Wishlist Hooks

Wishlist hooks work just like [cart hooks](#cart-hooks). Feel free to check how those work first.

The example below shows how to use the `useWishlist`, `useAddItem` and `useRemoveItem` hooks:

```jsx
import { useWishlist, useAddItem, useRemoveItem } from '@framework/wishlist'

const WishlistButton = ({ productId, variant }) => {
  const addItem = useAddItem()
  const removeItem = useRemoveItem()
  const { data, isLoading, isEmpty, error } = useWishlist()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  if (isEmpty) return <p>The wihslist is empty</p>

  const { data: customer } = useCustomer()
  const itemInWishlist = data?.items?.find(
    (item) => item.product_id === productId && item.variant_id === variant.id
  )

  const handleWishlistChange = async (e) => {
    e.preventDefault()
    if (!customer) return

    if (itemInWishlist) {
      await removeItem({ id: itemInWishlist.id })
    } else {
      await addItem({
        productId,
        variantId: variant.id,
      })
    }
  }

  return (
    <button onClick={handleWishlistChange}>
      <Heart fill={itemInWishlist ? 'var(--pink)' : 'none'} />
    </button>
  )
}
```

## Commerce API

While commerce hooks focus on client side data fetching and interactions, the commerce API focuses on static content generation for pages and API endpoints in a Node.js context.

> The commerce API is currently going through a refactor in https://github.com/vercel/commerce/pull/252 - We'll update the docs once the API is released.

## More

Feel free to read through the source for more usage, and check the commerce vercel demo and commerce repo for usage examples: ([demo.vercel.store](https://demo.vercel.store/)) ([repo](https://github.com/vercel/commerce))
