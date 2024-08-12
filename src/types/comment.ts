import { User } from './user'

export type Comment = {
  id: string
  updateAt: Date
  createAt: Date
  userId: string
  postId: string
  content: string
  parentId: string | null
  replies: Comment[]
  user: Pick<
    User,
    'id' | 'email' | 'firstName' | 'lastName' | 'coverPhoto' | 'userName'
  >
}
