import { Post, PostDetail } from '../post'

export type ResponseGetPost = {
  message: string
  posts: Post[]
  total?: number
  totalPage?: number
  currentPage?: number
}

export type ResponseCreatePost = {
  message: string
}

export type ResponseGetPostByUser = ResponseGetPost

export type ResponseGetPostDetail = {
  message: string
  post: PostDetail
}

export type ResponseDeletePost = {
  message: string
}
