import { ToggleFavoriteMutation } from '@framework/schema'
import { toggleWishlistMutation } from '@framework/utils/mutations/toggle-wishlist-mutation'
import { useState } from 'react'
import fetcher from 'src/utils/fetcher'

interface Props {
  productId?:string
}

const useToggleProductWishlist = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)


  const onToggleProductWishlist = (
    { productId }:Props ,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    fetcher<ToggleFavoriteMutation>({
      query: toggleWishlistMutation,
      variables: {
        productId
      },
    })
      .then( data => {
        fCallBack(true)
        return data;
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, onToggleProductWishlist, error }
}

export default useToggleProductWishlist
