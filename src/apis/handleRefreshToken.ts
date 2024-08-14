import axios from 'axios'
import { API_ENDPOINT } from '~/shared/constants'
import { getToken, removeToken, setToken } from '~/utils/handleToken'

export const handleRefreshToken = async () => {
  const token = getToken()

  if (!token || !token.refreshToken) return

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINT.REFRESH_TOKEN}`,
      {
        refreshToken: token.refreshToken
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    setToken(data.token)
  } catch (error) {
    removeToken()
  }
}
