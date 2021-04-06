import { AquilacmsConfig } from '..'
import { getConfig } from '../api'

async function getAllOrders({
  config,
}: {
  config?: AquilacmsConfig
}): Promise<{ orders: any[] }> {
  config = getConfig(config)
  const data: any = []
  return { orders: data }
}

export default getAllOrders
