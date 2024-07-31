export type RequestSignIn = {
  email: string
  password: string
}

export type RequestSignUp = {
  username: string
  password: string
  confirmPassword: string
  email: string
}

export type RequestForgotPassword = {
  email: string
}

export type RequestResetPassword = {
  password: string
  confirmPassword: string
  otp: number
}

export type RequestRefreshToken = {
  refreshToken: string
}

export type RequestLogOut = {
  refreshToken: string
}
