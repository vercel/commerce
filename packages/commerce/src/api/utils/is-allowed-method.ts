import type { NextApiRequest, NextApiResponse } from 'next'

export type HTTP_METHODS = 'OPTIONS' | 'GET' | 'POST' | 'PUT' | 'DELETE'

export default function isAllowedMethod(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: HTTP_METHODS[]
) {
  const methods = allowedMethods.includes('OPTIONS')
    ? allowedMethods
    : [...allowedMethods, 'OPTIONS']

  if (!req.method || !methods.includes(req.method)) {
    res.status(405)
    res.setHeader('Allow', methods.join(', '))
    res.json({
      errors: [
        {
          message: `You are not allowed to use the ${
            req.method
          } method for this route, please use one of the following methods: ${methods.join(
            ', '
          )}`,
        },
      ],
    })
    return false
  }

  if (req.method === 'OPTIONS') {
    res.status(200)
    res.setHeader('Allow', methods.join(', '))
    res.setHeader('Content-Length', '0')
    res.end()
    return false
  }

  return true
}
