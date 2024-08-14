import { API_ENDPOINT } from '~/shared/constants'
import { ResponseUser } from '~/types/response/auth'
import { RequestUpdateProfile } from '~/types/request/auth'
import { httpPrivate } from '~/apis/axiosInstance'

export const getMe = async () => {
  const { data } = await httpPrivate.get<ResponseUser>(API_ENDPOINT.GET_ME)
  return data
}

export const updateProfile = async (payload: RequestUpdateProfile) => {
  const { data } = await httpPrivate.patch<ResponseUser>(
    API_ENDPOINT.UPDATE_PROFILE,
    payload
  )
  return data
}
