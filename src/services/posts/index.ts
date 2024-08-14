import { httpPrivate, httpPublic } from '~/apis/axiosInstance'

import { API_ENDPOINT } from '~/shared/constants'
import {
  RequestGetPost,
  RequestPostCreate,
  RequestPostUpdate
} from '~/types/request/posts'
import {
  ResponseCreatePost,
  ResponseDeletePost,
  ResponseGetPost,
  ResponseGetPostByUser,
  ResponseGetPostDetail
} from '~/types/response/posts'

export const getPosts = async ({
  title = '',
  trending,
  isLatest,
  category,
  limit = 10,
  page = 1
}: RequestGetPost) => {
  const { data } = await httpPublic.get<ResponseGetPost>(API_ENDPOINT.POSTS, {
    params: { title, trending, category, limit, page, isLatest }
  })
  return data
}

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

export const getYourPost = async (userId: string) => {
  const { data } = await httpPrivate.get<ResponseGetPostByUser>(
    `${API_ENDPOINT.GET_POST_BY_USER}/${userId}`
  )

  return data
}

export const detailPost = async ({
  postId,
  userId
}: {
  postId: string
  userId?: string
}) => {
  const API_GET_POST_DETAIL_ENDPOINT = userId
    ? `${API_ENDPOINT.POSTS}/${postId}?userId=${userId}`
    : `${API_ENDPOINT.POSTS}/${postId}`

  const { data } = await httpPublic.get<ResponseGetPostDetail>(
    `${API_GET_POST_DETAIL_ENDPOINT}`
  )
  return data
}

export const deletePost = async (postId: string) => {
  const { data } = await httpPrivate.delete<ResponseDeletePost>(
    `${API_ENDPOINT.POSTS}/${postId}`
  )
  return data
}
