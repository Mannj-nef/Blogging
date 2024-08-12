'use client'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { title } from 'process'
import React, { useCallback, useEffect, useState } from 'react'
import {
  IconComment,
  IconAngryAction,
  IconCrushAction,
  IconEye,
  IconHahnAction,
  IconLike,
  IconLikeAction,
  IconLoveAction,
  IconSadAction,
  IconWaoAction
} from '~/components/icons'
import { reactPost, unReactPost } from '~/services/reaction'
import { IMAGES } from '~/shared/images'
import useAuthStore from '~/store/authStore'
import usePostStore from '~/store/postStore'
import { PostDetail, REACTION_TYPE } from '~/types/post'

interface IProps {
  blogDetail?: PostDetail
  openComment: () => void
}

const REACTION_LIST = [
  {
    type: REACTION_TYPE.LIKE,
    icon: <IconLikeAction />
  },
  {
    type: REACTION_TYPE.LOVE,
    icon: <IconLoveAction />
  },
  {
    type: REACTION_TYPE.CRUSH,
    icon: <IconCrushAction />
  },
  {
    type: REACTION_TYPE.HAHA,
    icon: <IconHahnAction />
  },

  {
    type: REACTION_TYPE.WOW,
    icon: <IconWaoAction />
  },
  {
    type: REACTION_TYPE.SAD,
    icon: <IconSadAction />
  },
  {
    type: REACTION_TYPE.ANGRY,
    icon: <IconAngryAction />
  }
]

const TopPostsDetail = ({ openComment, blogDetail }: IProps) => {
  const [isReact, setIsReact] = useState(false)
  const { getAuth, setIsOpenModalAuth } = useAuthStore()
  const [reactionPost, setReactionPost] = useState<REACTION_TYPE | null>()

  const { setPostDetail } = usePostStore()

  const { mutate: mutateReaction } = useMutation({ mutationFn: reactPost })
  const { mutate: mutateUnReaction } = useMutation({ mutationFn: unReactPost })

  const handleLike = (type: REACTION_TYPE) => {
    if (!blogDetail) return

    if (!isReact) {
      // reaction
      if (type) {
        mutateReaction(
          { postId: blogDetail.id, reaction: type },
          {
            onSuccess: () => {
              setReactionPost(type)
              setIsReact(true)

              setPostDetail({
                ...blogDetail,
                reaction: {
                  type: type,
                  total: blogDetail.reaction.total + 1
                }
              })
            },
            onError: (err: any) => {
              const status = err?.response?.status

              if (status === 401) {
                setIsOpenModalAuth(true)
              }
            }
          }
        )
      }
    } else {
      mutateUnReaction(blogDetail.id, {
        onSuccess: () => {
          setIsReact(false)
          setReactionPost(null)

          setPostDetail({
            ...blogDetail,
            reaction: {
              type: null,
              total: blogDetail.reaction.total - 1
            }
          })
        },
        onError: (err: any) => {
          const status = err?.response?.status

          if (status === 401) {
            setIsOpenModalAuth(true)
          }
        }
      })
    }
  }

  const handleReaction = (type: REACTION_TYPE) => {
    if (!blogDetail) return

    mutateReaction(
      { postId: blogDetail.id, reaction: type },
      {
        onSuccess: () => {
          setReactionPost(type)
          setIsReact(true)

          setPostDetail({
            ...blogDetail,
            reaction: {
              type: type,
              total: isReact
                ? blogDetail.reaction.total
                : blogDetail.reaction.total + 1
            }
          })
        },
        onError: (err: any) => {
          const status = err?.response?.status

          if (status === 401) {
            setIsOpenModalAuth(true)
          }
        }
      }
    )
  }

  useEffect(() => {
    if (blogDetail?.reaction.type) {
      setIsReact(true)
      setReactionPost(blogDetail?.reaction.type)
    } else {
      setIsReact(false)
      setReactionPost(null)
    }
  }, [blogDetail?.reaction.type])

  if (!blogDetail) return null

  return (
    <div className="top-post-detail">
      <div className="image-wrapper">
        <Image
          src={blogDetail.imageThumbnail || IMAGES.IMAGE_DEFAULT}
          alt=""
          width={800}
          height={800}
        />
      </div>

      <div className="post-info">
        <div style={{ flex: 1 }}>
          <p className="post-category">{blogDetail.category}</p>

          <h1 className="post-title text-line-4">{blogDetail.title} </h1>
        </div>

        <div>
          <div className="post-info-bottom-wrapper">
            <div className="post-info-bottom">
              <span>11/2/2024</span>
              <span className="dote"></span>
              <span>{blogDetail.user.userName}</span>
            </div>

            <div className="post-info-bottom">
              <span
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {blogDetail.reaction.total}

                <IconLike style={{ width: '20px', height: '20px' }} />
              </span>
              <span className="dote"></span>
              <span
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {blogDetail.commentTotal}
                <IconComment style={{ width: '20px', height: '20px' }} />
              </span>
              <span className="dote"></span>
              <span
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {blogDetail.popularity}
                <IconEye style={{ width: '20px', height: '20px' }} />
              </span>
            </div>
          </div>

          <div className="post-action">
            <div
              className={`action-item action-like ${isReact ? 'liked' : ''} ${reactionPost ? reactionPost : ''}`}
              onClick={() => handleLike(REACTION_TYPE.LIKE)}
            >
              {!reactionPost ? (
                <IconLike style={{ width: '20px', height: '20px' }} />
              ) : null}

              <span>{reactionPost || 'like'}</span>

              <div
                style={{
                  height: 17,
                  width: '100%',
                  position: 'absolute',
                  top: '-30%'
                }}
              ></div>

              <div className="like-action-wrapper">
                {REACTION_LIST.map((item) => (
                  <span
                    key={item.type}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReaction(item.type)
                    }}
                  >
                    {item.icon}
                  </span>
                ))}
              </div>
            </div>

            <div className="action-item" onClick={openComment}>
              <IconComment style={{ width: '20px', height: '20px' }} />
              <span>Comment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopPostsDetail
