import { Product } from '@commerce/types'
import * as Papa from 'papaparse'

import { CSV_URL } from '../const'
import { RawProduct } from './types'

const api = {
  list: () => {
    return fetch(CSV_URL)
      .then((response) => response.text())
      .then(
        (blob) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(blob, {
              header: true,
              complete: (results) => {
                const products = results.data as RawProduct[]

                return resolve(
                  products.map((product) => ({
                    id: product.id,
                    description: product.description,
                    title: product.title,
                    images: [{ url: product.image, alt: product.title }],
                    name: product.title,
                    options: [
                      {
                        id: product.id,
                        displayName: product.title,
                        values: [
                          {
                            hexColors: ['#000'],
                            label: product.title,
                          },
                        ],
                      },
                    ],
                    price: {
                      currencyCode: 'ARS',
                      value: Number(product.price),
                    },
                    variants: [
                      {
                        id: product.id,
                        options: [
                          {
                            id: product.id,
                            displayName: product.title,
                            values: [
                              {
                                hexColors: ['#000'],
                                label: product.title,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    descriptionHtml: product.description,
                    slug: product.id,
                    path: `/${product.id}`,
                    sku: product.id,
                  }))
                )
              },
              error: (error) => reject(error.message),
            })
          })
      )
  },
  fetch: (slug: Product['slug']) => {
    return api
      .list()
      .then((products) => products.find((product) => product.slug === slug))
  },
}

export default api
