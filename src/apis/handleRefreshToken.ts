import { API_ENDPOINT, ENV } from '~/shared/constants'
import { getToken, removeToken, setToken } from '~/utils/handleToken'

export const handleRefreshToken = async () => {
  const token = getToken()

  if (!token || !token.refreshToken) return

  try {
    const response = await fetch(
      `${ENV.BASE_API_URL_FULL}${API_ENDPOINT.REFRESH_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: token.refreshToken
        })
      }
    )

    const data = await response.json()
    setToken(data.token)
  } catch (error) {
    removeToken()
  }
}
