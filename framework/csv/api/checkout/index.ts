import { NextApiRequest, NextApiResponse } from 'next'

const checkoutApi = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(`https://wa.me/5491141634695`)
}

export default checkoutApi
