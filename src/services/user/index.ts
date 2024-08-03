import { API_ENDPOINT } from '~/shared/constants'
import { ResponseUser } from '../../types/response/auth'
import httpPrivate from '~/apis/private'

export const getMe = async () => {
  const { data } = await httpPrivate.get<ResponseUser>(API_ENDPOINT.GET_ME)
  return data
}
