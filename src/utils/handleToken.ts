import { LOCAL_STORAGE } from '~/shared/constants'

export const setToken = (token: { token: string; refreshToken: string }) => {
  localStorage.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(token))
}

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE.TOKEN)
}

export const getToken = () => {
  const token: { token: string; refreshToken: string } | null =
    localStorage.getItem(LOCAL_STORAGE.TOKEN)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN) as string)
      : null

  return token
}
