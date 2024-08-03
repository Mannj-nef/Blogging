import { InternalAxiosRequestConfig } from 'axios'
import { getToken } from '~/utils/handleToken'

export const handelRequestPrivate = async (
  config: InternalAxiosRequestConfig
) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`
  }

  return config
}
