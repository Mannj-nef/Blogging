import httpPrivate from '~/apis/private'
import { API_ENDPOINT } from '~/shared/constants'
import { REACTION_TYPE } from '~/types/post'

export const reactPost = async ({
  postId,
  reaction
}: {
  postId: string
  reaction: REACTION_TYPE
}) => {
  const { data } = await httpPrivate.post<{ message: string }>(
    API_ENDPOINT.REACTION_POST,
    {
      postId,
      reaction
    }
  )
  return data
}

export const unReactPost = async (postId: string) => {
  const { data } = await httpPrivate.delete<{ message: string }>(
    `${API_ENDPOINT.REACTION_POST}/${postId}`
  )
  return data
}
