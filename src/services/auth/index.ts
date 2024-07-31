import httpPublic from '~/apis/public'
import { API_ENDPOINT } from '~/shared/constants'
import {
  RequestForgotPassword,
  RequestLogOut,
  RequestRefreshToken,
  RequestResetPassword,
  RequestSignIn,
  RequestSignUp
} from '~/types/request/auth'
import {
  ResponseForgotPassword,
  ResponseLogOut,
  ResponseRefreshToken,
  ResponseResetPassword,
  ResponseSignIn,
  ResponseSignUp
} from '~/types/response/auth'

export const signIn = async (payload: RequestSignIn) => {
  const { data } = await httpPublic.post<ResponseSignIn>(
    API_ENDPOINT.SIGN_IN,
    payload
  )
  return data
}

export const signUp = async (payload: RequestSignUp) => {
  const { data } = await httpPublic.post<ResponseSignUp>(
    API_ENDPOINT.SIGN_UP,
    payload
  )
  return data
}

export const forgotPassword = async (payload: RequestForgotPassword) => {
  const { data } = await httpPublic.post<ResponseForgotPassword>(
    API_ENDPOINT.FORGOT_PASSWORD,
    payload
  )
  return data
}

export const resetPassword = async (payload: RequestResetPassword) => {
  const { data } = await httpPublic.post<ResponseResetPassword>(
    API_ENDPOINT.RESET_PASSWORD,
    payload
  )
  return data
}

export const refreshToken = async (payload: RequestRefreshToken) => {
  const { data } = await httpPublic.post<ResponseRefreshToken>(
    API_ENDPOINT.REFRESH_TOKEN,
    payload
  )
  return data
}

export const logOut = async (payload: RequestLogOut) => {
  const { data } = await httpPublic.post<ResponseLogOut>(
    API_ENDPOINT.LOG_OUT,
    payload
  )
  return data
}
