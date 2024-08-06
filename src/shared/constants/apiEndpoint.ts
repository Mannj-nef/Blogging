export const API_ENDPOINT = {
  // auth
  SIGN_IN: '/auth/login',
  SIGN_UP: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOG_OUT: '/auth/logout',

  // users
  GET_ME: 'users/get-me',

  // posts
  POSTS: '/posts'
} as const
