import { LineItem } from '../types'

const api = {
  get: (): LineItem[] => {
    if (!process.browser) {
      return []
    }

    const raw = localStorage.getItem('cart')

    if (!raw) {
      return []
    }

    return JSON.parse(raw) as LineItem[]
  },
  set: (items: LineItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items))
  },
  add: (item: LineItem) => {
    const items = api.get()
    const itemIndex = items.findIndex(
      (_item) => _item.productId === item.productId
    )

    if (itemIndex >= 0) {
      items[itemIndex].quantity = (items[itemIndex].quantity || 0) + 1
    } else {
      items.push(item)
    }

    api.set(items)

    return items
  },
  remove: (item: LineItem) => {
    const items = api.get()
    const itemIndex = items.findIndex(
      (_item) => _item.productId === item.productId
    )

    if (itemIndex >= 0) {
      items.splice(itemIndex, 1)
    }

    api.set(items)

    return items
  },
  update: (item: LineItem) => {
    const items = api.get()
    const itemIndex = items.findIndex(
      (_item) => _item.productId === item.productId
    )

    if (itemIndex >= 0) {
      items[itemIndex] = item
    } else {
      items.push(item)
    }

    api.set(items)

    return items
  },
}

export default api
