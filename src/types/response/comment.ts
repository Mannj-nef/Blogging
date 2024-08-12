import { Comment } from '../comment'

export type ResponseGetComment = {
  message: string
  comments: Comment[]
}

export type ResponseCreateComment = {
  message: string
}
