import { getToken } from '~/utils/handleToken'

const useToken = () => {
  const token = getToken()

  return token
}
export default useToken
