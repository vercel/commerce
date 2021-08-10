import Cookies from 'js-cookie'
import { SHOPIFY_WHISLIST_ID_COOKIE } from '../const'

const getWishlistId = (id?: string) => {
  return id || Cookies.get(SHOPIFY_WHISLIST_ID_COOKIE)
}

export default getWishlistId
