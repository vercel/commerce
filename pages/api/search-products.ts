import { NextApiRequest, NextApiResponse } from 'next'

import commerce from '@lib/api/commerce'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //cors stuff
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const search = `${req.query.search}`.toLowerCase()

    // const products = await getProducts({filter})

    const locale = 'en-us'
    const preview = false

    const config = { locale, locales: [locale] }

    const { products } = await commerce.getAllProducts({
      variables: { first: 50 },
      config,
      preview,
    })

    const returnedProducts = products
      .filter((p: any) => {
        return (
          search === '' ||
          p.name.toLowerCase().indexOf(search) !== -1 ||
          (p.description && p.description.toLowerCase().indexOf(search) !== -1)
        )
      })
      .map((p: any) => {
        return {
          name: p.name,
          imageUrl: p.images[0].url,
          price: p.price,
          id: p.id,
          description: p.description,
          slug: p.path || p.slug,
        }
      })
      .sort((a: any, b: any) => {
        if (a.name > b.name) return 1
        return -1
      })

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.json(returnedProducts)
  } catch (e) {
    res.statusCode = 500
    res.json({ message: 'An error occurred ', error: e })
  }
}
