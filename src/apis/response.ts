import axios, { AxiosError, AxiosResponse } from 'axios'
import { API_ENDPOINT } from '~/shared/constants'
import { ResponseAuthBase } from '~/types/response/auth'
import { removeToken, setToken } from '~/utils/handleToken'
import { handleRefreshToken } from './handleRefreshToken'

export const handleResponseAuth = async (res: AxiosResponse) => {
  const { url } = res.config

  const authApis: string[] = [API_ENDPOINT.SIGN_IN, API_ENDPOINT.SIGN_UP, API_ENDPOINT.RESET_PASSWORD]

  if (authApis.includes(`${url}`)) {
    const data: ResponseAuthBase = res.data

    if (data) {
      setToken({
        accessToken: data.token.accessToken,
        refreshToken: data.token.refreshToken
      })
    }
  } else if (url === API_ENDPOINT.LOG_OUT) {
    removeToken()
  }

  return res
}

export const handleErrorResponse = async (error: AxiosError) => {
  const prevRequest = error.response as AxiosResponse
  const {
    status,
    config: { url }
  } = prevRequest

  const authApis: string[] = [API_ENDPOINT.REFRESH_TOKEN]

  if (status === 401 && axios.isAxiosError(error) && !authApis.includes(`${url}`)) {
    await handleRefreshToken()
  }
  throw error
}
