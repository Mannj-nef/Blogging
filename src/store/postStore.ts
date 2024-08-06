import { create } from 'zustand'
import { RequestPostBase } from '~/types/request/posts'

type PostState = {
  isShowModal: boolean
  postDetail?: RequestPostBase
}

// const testDetailPost = {
//   id: '39a5ae5f-75c9-40b9-b8da-f3cd855556db',
//   title: 'posUpdate asdfasd asdfas là 1 developer hehelij à',
//   category: 'front-end',
//   slug: 'asdfasd-asdfas-là-1-developer-hehelij-à',
//   imageThumbnail: 'https://i.ibb.co/G0qs8dm/avatar-anh-meo-cute-3.jpg',
//   status: 'public',
//   content:
//     '"<h1>ádfasdf</h1><h2>ádfasdf</h2><ol><li>ádfasdfasdádfasdfasdfasd</li><li>ádfasdfasdf</li><li>àdasdfasasd</li></ol><ul><li>sdfsdfsd</li><li>sdfsdfsdf</li><li><a href="https://www.google.com/" rel="noopener noreferrer" target="_blank">linkned</a></li></ul>"'
// }

type PostAction = {
  setIsShowModal: (isShowModal: boolean) => void
  setPostDetail: (postDetail: any) => void
}

type PostStore = PostState & PostAction

const usePostStore = create<PostStore>((set) => ({
  isShowModal: false,
  postDetail: undefined,

  setIsShowModal: (isShowModal: boolean) => set(() => ({ isShowModal })),
  setPostDetail: (postDetail: any) => set(() => ({ postDetail }))
}))

export default usePostStore
