import { useState } from 'react'
import useGetFavoriteProduct from '../account/useGetFavoriteProduct'
import { ToggleFavoriteMutation } from '@framework/schema'
import fetcher from 'src/utils/fetcher'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { toggleWishlistMutation } from '@framework/utils/mutations/toggle-wishlist-mutation'

interface Props {
  productId?:string
}

const useToggleProductWishlist = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { mutate } = useGetFavoriteProduct();

  const onToggleProductWishlist = (
    { productId }:Props ,
    fCallBack: (isSuccess: boolean, message?: string,idToggleResult?:string[]) => void
  ) => {
    setError(null)
    setLoading(true)
    fetcher<ToggleFavoriteMutation>({
      query: toggleWishlistMutation,
      variables: {
        productId
      },
    })
      .then((data) => {
        fCallBack(true)
        mutate()
        return data 
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
