import axios from 'axios'
import { ENV } from '~/shared/constants'

const token: {
  access_token: string
  refresh_token: string
} = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token') as string)
  : null

const http = axios.create({
  baseURL: ENV.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.access_token}`
  },
  timeout: 30000
})

// http.interceptors.request.use(handleRequest)
// http.interceptors.response.use(handleResponse, handleErrorResponse)

export default http
