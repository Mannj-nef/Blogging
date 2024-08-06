import httpPrivate from '~/apis/private'
import { API_ENDPOINT } from '~/shared/constants'
import { RequestPostCreate, RequestPostUpdate } from '~/types/request/posts'
import { ResponseCreatePost } from '~/types/response/posts'

export const createPost = async (payload: RequestPostCreate) => {
  const { data } = await httpPrivate.post<ResponseCreatePost>(
    API_ENDPOINT.POSTS,
    payload
  )
  return data
}

export const updatePost = async ({
  payload,
  postId
}: {
  payload: RequestPostUpdate
  postId: string
}) => {
  const { data } = await httpPrivate.patch<ResponseCreatePost>(
    `${API_ENDPOINT.POSTS}/${postId}`,
    payload
  )
  return data
}
