import { useCallback, useMemo } from 'react'

export function emptyHook() {
  const useEmptyHook = async (options: any = {}) => {
    let wishlist = []
    const localWishlist = localStorage.getItem('wishlist')
    if (localWishlist) {
      wishlist = JSON.parse(localWishlist)
      if (!wishlist.includes(options.productId)) {
        wishlist.push(options.productId)
      }
    } else {
      wishlist.push(options.productId)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    return wishlist
  }

  return useEmptyHook
}

export default emptyHook
