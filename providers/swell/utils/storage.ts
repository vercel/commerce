export const getCheckoutIdFromStorage = (token: string) => {
  if (window && window.sessionStorage) {
    return window.sessionStorage.getItem(token)
  }

  return null
}

export const setCheckoutIdInStorage = (token: string, id: string | number) => {
  if (window && window.sessionStorage) {
    return window.sessionStorage.setItem(token, id + '')
  }
}
