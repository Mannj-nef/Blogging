export type RequestGetComment = {
  postId: string
  page: string
  limit: string
}

export type RespectCreateComment = {
  postId: string
  content: string
  parentId: string | null
}

export type RequestUpdateComment = {
  postId: string
  commentId: string
  content: string
}
