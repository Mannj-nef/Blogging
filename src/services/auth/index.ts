import httpPublic from '~/apis/public'
import {
  RequestForgotPassword,
  RequestLogOut,
  RequestRefreshToken,
  RequestResetPassword,
  RequestSignIn,
  RequestSignUp
} from '~/types/request/auth'

export const signIn = async (payload: RequestSignIn) => {
  const { data } = await httpPublic.post<RequestSignIn>(
    API_ENDPOINT.SIGN_IN,
    payload
  )
  return data
}

export const signUp = async (payload: RequestSignUp) => {
  const { data } = await httpPublic.post<RequestSignUp>(
    API_ENDPOINT.SIGN_UP,
    payload
  )
  return data
}

export const forgotPassword = async (payload: RequestForgotPassword) => {
  const { data } = await httpPublic.post<RequestForgotPassword>(
    API_ENDPOINT.FORGOT_PASSWORD,
    payload
  )
  return data
}

export const resetPassword = async (payload: RequestResetPassword) => {
  const { data } = await httpPublic.post<RequestResetPassword>(
    API_ENDPOINT.RESET_PASSWORD,
    payload
  )
  return data
}

export const refreshToken = async (payload: RequestRefreshToken) => {
  const { data } = await httpPublic.post<RequestRefreshToken>(
    API_ENDPOINT.REFRESH_TOKEN,
    payload
  )
  return data
}

export const logOut = async (payload: RequestLogOut) => {
  const { data } = await httpPublic.post<RequestLogOut>(
    API_ENDPOINT.LOG_OUT,
    payload
  )
  return data
}
