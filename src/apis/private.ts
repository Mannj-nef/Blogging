import axios from 'axios'
import { handelRequestPrivate } from './handleRequest'
import { handleErrorResponse, handleResponseAuth } from './response'

const httpPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

httpPrivate.interceptors.request.use(handelRequestPrivate)
httpPrivate.interceptors.response.use(handleResponseAuth, handleErrorResponse)

export default httpPrivate
