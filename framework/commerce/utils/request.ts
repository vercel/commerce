const request = async ({query, variables}) => {

  const data = await fetch('http://localhost:5000/shop-api', {
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