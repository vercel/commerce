import { Product } from '@commerce/types'
import { normalizeProduct } from '../../../lib/normalize'
import getAllProducts from '../../../product/get-all-products'
import type { ProductsHandlers } from '../products'

const SORT: { [key: string]: string | undefined } = {
  latest: 'id',
  trending: 'total_sold',
  price: 'price',
}

const LIMIT = 12

// Return current cart info
const getProducts: ProductsHandlers['getProducts'] = async ({
  res,
  body: { search, category, brand, sort: sortParam },
  config,
}) => {
  let filter: any = {
    kind: 'SimpleProduct',
  }
  let sort = {}

  if (search) filter['$text'] = { $search: search }

  if (category) {
    const cat: any = await config.storeApiFetch('/v2/category', {
      method: 'POST',
      body: JSON.stringify({
        lang: 'en',
        PostBody: {
          filter: {
            _id: category,
          },
          structure: {
            productsList: 1,
          },
          page: 1,
          limit: 1,
        },
      }),
    })

    const productIds: string[] = cat.productsList
      .filter((p: any) => p.checked)
      .map((p: any) => p.id)
    // if (search) {
    //   filter = {
    //     $and: [{ ...filter }, { _id: { $in: productIds } }],
    //   }
    // } else {
    filter = {
      _id: { $in: productIds },
    }
    // }
  }

  if (sortParam) {
    const [_sort, direction] = sortParam.split('-')
    const sortValue = SORT[_sort]

    if (sortValue && direction) {
      switch (sortValue) {
        case 'latest':
          // 'desc'
          console.log(`sort by ${sortValue} not implemented`)
        case 'trending':
          // 'desc'
          console.log(`sort by ${sortValue} not implemented`)
        case 'price':
          if (direction === 'asc') sort = { 'price.priceSort.ati': 1 }
          else if (direction === 'desc') sort = { 'price.priceSort.ati': -1 }
      }
    }
  }

  const { datas } = await config.storeApiFetch('/v2/products', {
    method: 'POST',
    body: JSON.stringify({
      lang: 'en',
      PostBody: {
        filter,
        structure: {
          canonical: 1,
          reviews: 1,
          stock: 1,
          universe: 1,
        },
        // populate: ['bundle_sections.products.id'],
        sort,
        page: 1,
        limit: LIMIT,
      },
    }),
  })

  const found = datas ? datas.length > 0 : false
  const products = datas ? datas.map(normalizeProduct) : []

  res.status(200).json({ data: { products, found } })
}

export default getProducts
