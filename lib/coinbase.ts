const COINBASE_API = 'https://api.commerce.coinbase.com'

function getHeaders() {
  const apiKey = process.env.COINBASE_API_KEY || ''
  return {
    'Content-Type': 'application/json',
    'X-CC-Api-Key': apiKey,
    'X-CC-Version': '2018-03-22'
  }
}

export async function createCharge(input: {
  name: string
  description: string
  amountUsd: number
  metadata: Record<string, string>
}) {
  const res = await fetch(`${COINBASE_API}/charges`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      name: input.name,
      description: input.description,
      pricing_type: 'fixed_price',
      local_price: { amount: input.amountUsd.toFixed(2), currency: 'USD' },
      metadata: input.metadata
    })
  })
  if (!res.ok) throw new Error('Failed to create Coinbase charge')
  const json = await res.json()
  return json.data as { id: string; hosted_url: string }
}


