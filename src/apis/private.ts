import axios, { AxiosResponse } from 'axios'
import { ENV } from '~/shared/constants'
import { handelRequestPrivate } from './handleRequest'
import { handleErrorResponse, handleResponseAuth } from './response'

const httpPrivate = axios.create({
  baseURL: ENV.BASE_API_URL_FULL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

httpPrivate.interceptors.request.use(handelRequestPrivate)
httpPrivate.interceptors.response.use(handleResponseAuth, handleErrorResponse)

export default httpPrivate
