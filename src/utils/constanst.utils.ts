export const BLUR_DATA_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8fBIAApUBruKYvzsAAAAASUVORK5CYII='

export const SOCIAL_LINKS = {
    FB: 'FB',
    TWITTER: 'TWITTER',
    YOUTUBE: 'YOUTUBE',
    IG: 'IG',
}

export const ROUTE = {
    HOME: '/',
    ABOUT: '/about',
    ACCOUNT: '/account',

    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/product',
    
    BLOGS: '/blogs',
    BLOG_DETAIL: '/blog',

    RECIPES: '/recipes',
    RECIPE_DETAIL: '/recipe',

    NOTIFICATION: '/notifications',
    BUSSINESS: '/bussiness',
    CONTACT: '/contact',
    CHECKOUT: '/checkout',
    FAQ: '/faq',
    CUSTOMER_SERVICE: '/customer-service',
    TERM_CONDITION: '/term-condition',
    PRIVACY_POLICY: '/privacy-policy',
    FORGOT_PASSWORD: '/forgot-password'
}

export const ACCOUNT_TAB = {
    CUSTOMER_INFO: '',
    ORDER: 'orders',
    FAVOURITE: 'wishlist',
}

export const LOCAL_STORAGE_KEY = {
  TOKEN: 'token'
}

export const QUERY_KEY = {
    TAB: 'tab',
    CATEGORY: 'category',
    BRAND: 'brand',
    FEATURED: 'feature',
    SORTBY:'sortby',
    RECIPES:'recipes'
}

export enum ProductFeature {
    BestSellers = 'Best Sellers',
    Sales = 'Sales',
    NewItem = 'New Item',
    Viewed = 'Viewed',
}

export const KEY = {
    ENTER: 'Enter',
}

export const OPTION_ALL = 'all';
export const DEFAULT_PAGE_SIZE=20;


export const CATEGORY = [
    {
      name: 'All',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=${OPTION_ALL}`,
    },
    {
      name: 'Veggie',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=veggie`,
    },
    {
      name: 'Seafood',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=seafood`,
    },
    {
      name: 'Frozen',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=frozen`,
    },
    {
      name: 'Coffee Bean',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=coffee_bean`,
    },
    {
      name: 'Sauce',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=sauce`,
    },
  ]
  
  export  const BRAND = [
    {
      name: 'Maggi',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=maggi`,
    },
    {
      name: 'Chomilex',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=chomilex`,
    },
    {
      name: 'Chinsu',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=chinsu`,
    },
  ]
  
export const FEATURED = [
    {
      name: 'Best Sellers',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=best_sellers`,
    },
    {
      name: 'Sales',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=sales`,
    },
    {
      name: 'New Item',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=new_item`,
    },
    {
      name: 'Viewed',
      link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=viewed`,
    },
  ]
  
export const DEFAULT_BLOG_PAGE_SIZE=6;

export const FILTER_PAGE = [ROUTE.HOME,ROUTE.PRODUCTS]

export const STATE_OPTIONS = [
  {
    name: 'Hồ Chí Minh',
    value: 'Hồ Chí Minh',
  },
  {
    name: 'Hà Nội',
    value: 'Hà Nội',
  },
]