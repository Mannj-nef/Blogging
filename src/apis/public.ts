import axios from 'axios'
import { handleErrorResponse, handleResponseAuth } from './response'

const httpPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

httpPublic.interceptors.response.use(handleResponseAuth, handleErrorResponse)

export default httpPublic
