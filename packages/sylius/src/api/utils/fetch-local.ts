export const fetchRestApi = async <T>(
  method: string,
  path: string,
  body?: Record<string, unknown>,
  fetchOptions?: Record<string, any>
) => {
  const res = await fetch(process.env.NEXT_PUBLIC_SYLIUS_API_URL + path, {
    ...fetchOptions,
    method,
    headers: {
      ...fetchOptions?.headers,
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const jsonResponse = await res.json()
  return jsonResponse as T
}

export default fetchRestApi
