import { create } from 'zustand'
import { Post, PostDetail } from '~/types/post'
import { RequestPostBase } from '~/types/request/posts'

type PostState = {
  isShowModal: boolean
  postDetail?: PostDetail
  postDetailUpdate?: RequestPostBase
  yourPosts: Post[]
}

type PostAction = {
  setPostDetailUpdate: (postDetailUpdate?: RequestPostBase) => void
  setYourPosts: (yourPosts?: Post[]) => void
  setIsShowModal: (isShowModal: boolean) => void
  setPostDetail: (postDetail?: PostDetail) => void
}

type PostStore = PostState & PostAction

const usePostStore = create<PostStore>((set) => ({
  isShowModal: false,
  postDetail: undefined,
  postDetailUpdate: undefined,
  yourPosts: [],

  setYourPosts: (yourPosts?: Post[]) => set(() => ({ yourPosts })),
  setIsShowModal: (isShowModal: boolean) => set(() => ({ isShowModal })),
  setPostDetail: (postDetail?: PostDetail) => set(() => ({ postDetail })),
  setPostDetailUpdate: (postDetailUpdate?: RequestPostBase) => set(() => ({ postDetailUpdate }))
}))

export default usePostStore
