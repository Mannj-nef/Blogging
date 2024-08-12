import { CATEGORY, STATUS_POST } from '../post'

export type RequestPostBase = {
  id?: string
  title: string
  slug: string
  category: CATEGORY
  imageThumbnail: string
  content: string
  status: STATUS_POST
}

export type RequestPostCreate = RequestPostBase
export type RequestPostUpdate = RequestPostBase

export type RequestGetPost = {
  title?: string
  trending?: boolean
  isLatest?: boolean
  category?: CATEGORY
  limit?: number
  page?: number
}
