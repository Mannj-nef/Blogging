import axios from 'axios'
import { ENV } from '~/shared/constants'

const httpPublic = axios.create({
  baseURL: ENV.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

// http.interceptors.request.use(handleRequest)
// http.interceptors.response.use(handleResponse, handleErrorResponse)

export default httpPublic
