export type ResponseAuthBase = {
  message: string
  token: {
    accessToken: string
    refreshToken: string
  }
}

export type ResponseSignIn = ResponseAuthBase

export type ResponseSignUp = ResponseAuthBase

export type ResponseResetPassword = ResponseAuthBase

export type ResponseRefreshToken = ResponseAuthBase

export type ResponseForgotPassword = Omit<ResponseAuthBase, 'token'>

export type RequestLogOut = Omit<ResponseAuthBase, 'token'>
