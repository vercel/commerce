import { VENDURE_TOKEN } from '../const'

export const getToken = () => {
  return localStorage.getItem(VENDURE_TOKEN)
}

export const setToken = (token: string) => {
  localStorage.setItem(VENDURE_TOKEN, token)
}
