import httpPrivate from '~/apis/private'
import httpPublic from '~/apis/public'
import { API_ENDPOINT } from '~/shared/constants'
import {
  RequestGetComment,
  RequestUpdateComment,
  RespectCreateComment
} from '~/types/request/comment'
import {
  ResponseCreateComment,
  ResponseGetComment
} from '~/types/response/comment'

export const getCommentByPostId = async (payload: RequestGetComment) => {
  const { data } = await httpPublic.get<ResponseGetComment>(
    API_ENDPOINT.GET_COMMENT,
    {
      params: payload
    }
  )
  return data
}

export const createComment = async (payload: RespectCreateComment) => {
  const { data } = await httpPrivate.post<ResponseCreateComment>(
    API_ENDPOINT.GET_COMMENT,
    payload
  )
  return data
}

export const updateComment = async (payload: RequestUpdateComment) => {
  const { commentId, ...rest } = payload

  const { data } = await httpPrivate.patch<ResponseCreateComment>(
    `${API_ENDPOINT.GET_COMMENT}/${payload.commentId}`,
    rest
  )
  return data
}

export const deleteComment = async (commentId: string) => {
  const { data } = await httpPrivate.delete<ResponseCreateComment>(
    `${API_ENDPOINT.GET_COMMENT}/${commentId}`
  )
  return data
}
