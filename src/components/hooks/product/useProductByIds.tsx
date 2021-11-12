import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { ProductByMutation } from '@framework/schema'
import { productByIdsMutation } from '@framework/utils/mutations/product-by-ids-mutation'
import { normalizeProducts } from '@framework/utils/normalize'
import { ProductCard } from '@commerce/types/product'
import useSWR from 'swr'
import gglFetcher from 'src/utils/gglFetcher'

export interface ProductByIdsAgs {
    input:{
        ids: string[]
    }
}

const useProductByIds = (input:ProductByIdsAgs) => {
    const { data, isValidating, ...rest } = useSWR<ProductByMutation>([productByIdsMutation, input], gglFetcher)

  return { viewedProducts: normalizeProducts(data?.productByIds||[]) }

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<CommonError | null>(null)

//   const productByIds = (input: ProductByIdsInput,
//     fCallBack: (isSuccess: boolean, rs: ProductCard[]) => void
//     ) => {
//     setError(null)
//     setLoading(true)
//     rawFetcher<ProductByMutation>({
//       query: productByIdsMutation,
//       variables: {input},
//     })
//       .then(({ data, headers }) => {
//         let rs = normalizeProducts(data.productByIds)
//         fCallBack(true,rs)
//       })
//       .catch((error) => {
//         setError(error)
//         fCallBack(false, error.message)
//       })
//       .finally(() => setLoading(false))
//   }

//   return { loading, productByIds, error }
}

export default useProductByIds
