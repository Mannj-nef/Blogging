import axios from 'axios'
import { handelRequestPrivate } from './handleRequest'
import { handleErrorResponse, handleResponseAuth } from './response'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

const httpPrivate = http
const httpPublic = http

httpPrivate.interceptors.request.use(handelRequestPrivate)
httpPrivate.interceptors.response.use(handleResponseAuth, handleErrorResponse)

http.interceptors.response.use(handleResponseAuth, handleErrorResponse)

export { httpPrivate, httpPublic }
