import { httpPublic } from '~/apis/axiosInstance'
import { API_ENDPOINT } from '~/shared/constants'
import {
  RequestForgotPassword,
  RequestLogOut,
  RequestResetPassword,
  RequestSignIn,
  RequestSignUp
} from '~/types/request/auth'
import {
  ResponseForgotPassword,
  ResponseLogOut,
  ResponseResetPassword,
  ResponseSignIn,
  ResponseSignUp
} from '~/types/response/auth'

export const signIn = async (payload: RequestSignIn) => {
  const data = await httpPublic.post<ResponseSignIn>(API_ENDPOINT.SIGN_IN, payload)
  return data
}

export const signUp = async (payload: RequestSignUp) => {
  const { data } = await httpPublic.post<ResponseSignUp>(API_ENDPOINT.SIGN_UP, payload)
  return data
}

export const forgotPassword = async (payload: RequestForgotPassword) => {
  const { data } = await httpPublic.post<ResponseForgotPassword>(API_ENDPOINT.FORGOT_PASSWORD, payload)
  return data
}

export const resetPassword = async (payload: RequestResetPassword) => {
  const { data } = await httpPublic.post<ResponseResetPassword>(API_ENDPOINT.RESET_PASSWORD, payload)
  return data
}

export const logOut = async (payload: RequestLogOut) => {
  const { data } = await httpPublic.post<ResponseLogOut>(API_ENDPOINT.LOG_OUT, payload)
  return data
}
