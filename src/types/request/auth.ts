export type RequestSignIn = {
  email: string
  password: string
}

export type RequestSignUp = {
  userName: string
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
  otp: string
  email: string
}

export type RequestRefreshToken = {
  refreshToken: string
}

export type RequestLogOut = {
  refreshToken: string
}

export type RequestUpdateProfile = {
  firstName?: string
  lastName?: string
  email: string
  userName?: string
  phoneNumber?: number
  dateOfBirth?: string
  city?: string
  biography?: string
  coverPhoto?: string
}
