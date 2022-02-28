import { useCallback, useMemo } from 'react'

export function emptyHook() {
  const useEmptyHook = async (options: any = {}) => {
    let wishlist = []
    const localWishlist = localStorage.getItem('wishlist')
    if (localWishlist) {
      wishlist = JSON.parse(localWishlist)
      if (!wishlist.includes(options.variantId)) {
        wishlist.push(options.variantId)
      }
    } else {
      wishlist.push(options.variantId)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    return wishlist
  }

  return useEmptyHook
}

export default emptyHook
