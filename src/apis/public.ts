import axios from 'axios'
import { ENV } from '~/shared/constants'
import { handleErrorResponse, handleResponseAuth } from './response'

const httpPublic = axios.create({
  baseURL: ENV.BASE_API_URL_FULL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

httpPublic.interceptors.response.use(handleResponseAuth, handleErrorResponse)

export default httpPublic
