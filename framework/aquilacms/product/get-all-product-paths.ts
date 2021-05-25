import { AquilacmsConfig, getConfig } from '../api'

export type GetAllProductsResultAquila = {
  datas: any[]
  count: number
  min: {
    et: number
    ati: number
  }
  max: {
    et: number
    ati: number
  }
  specialPriceMin: {
    et: number
    ati: number
  }
  specialPriceMax: {
    et: number
    ati: number
  }
}

type ProductPath = {
  node: {
    path: string
  }
}

type ProductPaths = ProductPath[]

type GetAllProductPathsResult<
  T extends { products: any[] } = { products: ProductPaths }
> = T

async function getAllProductPaths({
  variables,
  config,
}: {
  variables?: {
    locales?: string[] | undefined
  }
  config?: AquilacmsConfig
} = {}): Promise<GetAllProductPathsResult> {
  config = getConfig(config)
  let data: any = {
    paths: [],
    products: [],
  }
  try {
    const result: GetAllProductsResultAquila = await config.storeApiFetch(
      '/v2/products',
      {
        method: 'POST',
        body: JSON.stringify({
          PostBody: {
            filter: {
              kind: 'SimpleProduct',
            },
            structure: {
              translation: 1,
            },
            limit: 200,
            page: 1,
          },
        }),
      }
    )
    // if (variables?.locales) {
    //   for (const locale of variables?.locales) {
    //     for (const p of result.datas) {
    //       const loc = locale.split('-')[0]
    //       if (p.slug[loc]) data.paths.push(`/${locale}/product/${p.slug[loc]}/`)
    //     }
    //   }
    // } else {
    return {
      products: result.datas.map((p) => {
        return {
          node: {
            path: `/${p.slug['en']}/`,
          },
        }
      }),
    }
    // }
  } catch (err) {
    console.error(err)
  }
  return data
}

export default getAllProductPaths
