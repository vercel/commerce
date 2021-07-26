interface requestProps {
  query: string
  variables: any
}
const request = async ({query, variables}: requestProps) => {

  const data = await fetch(String(process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ query: query, variables: variables })
  })

  if (data.status === 200) {
    const response = await data.json()
    return response
  }

  return {
    error: true
  }
}

export default request