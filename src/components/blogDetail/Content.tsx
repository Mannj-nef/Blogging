import React from 'react'
import parse from 'html-react-parser'
import { PostDetail } from '~/types/post'

interface IProps {
  blogDetail?: PostDetail
}

const ContentPostDetail = ({ blogDetail }: IProps) => {
  return (
    <div className='post-content'>
      <div className='entry-content'>{parse(blogDetail?.content || '')}</div>
    </div>
  )
}

export default ContentPostDetail
