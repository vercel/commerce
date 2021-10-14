type Options = {
  includeProducts?: boolean
}

export function emptyHook(options?: Options) {
  const useEmptyHook = async ({ id }: { id: string | number }) => {
    let wishlist = []
    const localWishlist = localStorage.getItem('wishlist')
    if (localWishlist) {
      wishlist = JSON.parse(localWishlist)
      wishlist = wishlist.filter((p: string) => p !== id)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    return Promise.resolve()
  }

  return useEmptyHook
}

export default emptyHook
