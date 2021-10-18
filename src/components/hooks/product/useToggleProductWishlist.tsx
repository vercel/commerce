import { useState } from 'react'
import useGetFavoriteProduct from '../account/useGetFavoriteProduct'
import { FavoriteList } from '@framework/schema'
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
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    fetcher<FavoriteList>({
      query: toggleWishlistMutation,
      variables: {
        productId
      },
    })
      .then((data) => {
        mutate()
        fCallBack(true)
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
