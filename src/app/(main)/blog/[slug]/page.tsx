'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CommentPost, ContentBlog, TopBlog } from '~/components/blogDetail'
import { useQuery } from '@tanstack/react-query'
import { detailPost } from '~/services/posts'
import { QUERY_KEY } from '~/shared/constants'
import useAuthStore from '~/store/authStore'
import usePostStore from '~/store/postStore'

import './style.scss'

const BlogDetail = () => {
  const param = useParams()
  const { auth } = useAuthStore()
  const { postDetail, setPostDetail } = usePostStore()
  const [isShowModalComment, setIsShowModalComment] = useState(false)
  const [slug, id] = decodeURI(param.slug as string).split(' ')

  const { data: blogDetailResponse, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_POST_DETAIL, slug, id, auth?.id],
    queryFn: () => detailPost({ postId: id, userId: auth?.id })
  })

  useEffect(() => {
    if (!blogDetailResponse) return

    setPostDetail(blogDetailResponse.post)
  }, [blogDetailResponse, setPostDetail])

  if (!blogDetailResponse || !postDetail)
    return (
      <div style={{ height: '300px' }}>
        <h2 style={{ textAlign: 'center', marginTop: '150px' }}>
          {isLoading ? 'Loading...' : 'This post does not exist'}
        </h2>
      </div>
    )

  return (
    <div className="container post-detail-wrapper">
      <TopBlog
        blogDetail={postDetail}
        openComment={() => setIsShowModalComment(true)}
      />

      <ContentBlog blogDetail={postDetail} />

      {isShowModalComment ? (
        <CommentPost
          postId={blogDetailResponse.post.id}
          isModalOpen={isShowModalComment}
          setIsShowModal={setIsShowModalComment}
        />
      ) : null}
    </div>
  )
}

export default BlogDetail
