'use client'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import useAuthStore from '~/store/authStore'
import { Avatar as AntAvatar, Form, FormProps, Input, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ExclamationCircleFilled } from '@ant-design/icons'
import {
  createComment,
  deleteComment,
  getCommentByPostId,
  updateComment
} from '~/services/comment'
import { MESSAGE, QUERY_KEY } from '~/shared/constants'
import { Comment } from '~/types/comment'
import dayjs from 'dayjs'
import useToast from '~/hooks/useToast'
import usePostStore from '~/store/postStore'

interface IProps {
  postId: string
  isModalOpen: boolean
  setIsShowModal: (isShowModal: boolean) => void
}

const { confirm } = Modal

const CommentPosts = ({ postId, isModalOpen, setIsShowModal }: IProps) => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [editComment, setEditComment] = useState({
    id: '',
    isEdit: false
  })
  const [replyComment, setReplyComment] = useState({
    id: '',
    isReply: false
  })

  const [toggleFetchComment, setToggleFetchComment] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])

  const { contextHolder, openNotification } = useToast()

  const { auth, setIsOpenModalAuth } = useAuthStore()
  const { postDetail, setPostDetail } = usePostStore()

  const [form] = Form.useForm<Comment>()

  const { data } = useQuery({
    queryKey: [
      QUERY_KEY.GET_COMMENT_BY_POST,
      limit,
      page,
      postId,
      toggleFetchComment,
      comments
    ],
    queryFn: () =>
      getCommentByPostId({ limit: `${limit}`, page: `${page}`, postId })
  })

  const { mutate } = useMutation({
    mutationFn: createComment
  })

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: updateComment
  })

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: deleteComment
  })

  const handleCancel = () => {
    setIsShowModal(false)
  }

  const onFinish: FormProps<{ content: string }>['onFinish'] = (value) => {
    if (!auth) {
      setIsOpenModalAuth(true)
      return
    }
    if (!value.content) return

    mutate(
      {
        postId,
        content: value.content,
        parentId: replyComment?.id || null
      },
      {
        onSuccess: () => {
          form.resetFields()
          setToggleFetchComment(!toggleFetchComment)

          if (postDetail) {
            postDetail.commentTotal = postDetail.commentTotal + 1
            setPostDetail(postDetail)
          }

          if (replyComment?.isReply) {
            setReplyComment({ id: '', isReply: false })
          }
        },

        onError: (err: any) => {
          const errorMessage =
            err?.response?.data.message || MESSAGE.SOMETHING_WENT_WRONG
          openNotification({
            message: errorMessage,
            type: 'error'
          })
        }
      }
    )
  }

  const handelEditComment: FormProps<{ content: string }>['onFinish'] = (
    value
  ) => {
    if (!value) return
    mutateUpdateComment(
      {
        postId,
        commentId: editComment.id,
        content: value.content
      },
      {
        onSuccess: () => {
          setToggleFetchComment(!toggleFetchComment)
          setEditComment({
            isEdit: false,
            id: ''
          })
        },
        onError: (err: any) => {
          const errorMessage =
            err?.response?.data.message || MESSAGE.SOMETHING_WENT_WRONG
          openNotification({
            message: errorMessage,
            type: 'error'
          })
        }
      }
    )
  }

  const showDeleteConfirm = useCallback(
    (id: string) => {
      confirm({
        title: 'Do you want to delete these Comment?',
        icon: <ExclamationCircleFilled />,
        onOk() {
          mutateDeleteComment(id, {
            onSuccess: () => {
              setToggleFetchComment(!toggleFetchComment)
            },

            onError: (err: any) => {
              const errorMessage =
                err?.response?.data.message || MESSAGE.SOMETHING_WENT_WRONG
              openNotification({
                message: errorMessage,
                type: 'error'
              })
            }
          })
        }
      })
    },
    [mutateDeleteComment, openNotification, toggleFetchComment]
  )

  useEffect(() => {
    if (!data) return

    setComments(data.comments)
  }, [data])

  return (
    <div
      className="modal-comment"
      style={{ display: isModalOpen ? 'block' : 'none' }}
    >
      {contextHolder}
      <div className="layout" onClick={handleCancel}></div>

      <div className="main-comment">
        <div>
          <div className="input-comment-wrapper">
            {auth?.coverPhoto ? (
              <div className="image-wrapper">
                <Image
                  src={auth.coverPhoto}
                  width={32}
                  height={32}
                  alt="avatar"
                />
              </div>
            ) : (
              <AntAvatar
                style={{ flexShrink: 0 }}
                size="default"
                icon={<UserOutlined />}
              />
            )}

            <Form
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              style={{ flex: 1 }}
            >
              <Form.Item name="content" className="input-comment">
                <Input
                  size="large"
                  placeholder="Enter your new comment"
                ></Input>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div
          style={{
            height: 2,
            borderRadius: 4,
            width: '40%',
            backgroundColor: '#6b545447',
            margin: '0 auto'
          }}
        ></div>

        <div className="list-comment">
          {comments.length > 0 &&
            comments.map((commentItem) => (
              <div key={commentItem.id} className="comment-item">
                <div className="top">
                  {commentItem.user.coverPhoto ? (
                    <div className="image-wrapper">
                      <Image
                        src={commentItem.user.coverPhoto}
                        width={32}
                        height={32}
                        alt="avatar"
                      />
                    </div>
                  ) : (
                    <AntAvatar
                      style={{ flexShrink: 0 }}
                      size="default"
                      icon={<UserOutlined />}
                    />
                  )}

                  <div className="info-user">
                    <p className="user-name">{commentItem.user.userName}</p>
                    <p>{dayjs(commentItem.updateAt).format('DD/MM/YYYY')}</p>
                  </div>
                </div>

                {editComment.isEdit && editComment.id === commentItem.id ? (
                  <Form
                    style={{ marginLeft: 55, marginTop: 5 }}
                    onFinish={handelEditComment}
                    autoComplete="off"
                    fields={[
                      {
                        name: ['content'],
                        value: commentItem.content
                      }
                    ]}
                  >
                    <Form.Item name="content" className="input-comment">
                      <Input
                        style={{ height: 48 }}
                        size="large"
                        autoFocus
                        placeholder="Enter your new comment"
                      ></Input>
                    </Form.Item>
                  </Form>
                ) : (
                  <div style={{ marginLeft: 55 }} className="content">
                    {commentItem.content}
                  </div>
                )}

                <div className="action">
                  {replyComment.isReply &&
                  replyComment.id === commentItem.id ? (
                    <span
                      style={{
                        cursor: 'pointer',
                        fontSize: 12,
                        color: 'var(--color-link)'
                      }}
                      onClick={() =>
                        setReplyComment({
                          id: '',
                          isReply: false
                        })
                      }
                    >
                      Clear
                    </span>
                  ) : (
                    <span
                      style={{
                        cursor: 'pointer',
                        fontSize: 12,
                        color: 'var(--color-link)'
                      }}
                      onClick={() =>
                        setReplyComment({
                          id: commentItem.id,
                          isReply: true
                        })
                      }
                    >
                      Reply
                    </span>
                  )}

                  {auth?.id === commentItem.userId ? (
                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        justifyContent: 'end'
                      }}
                    >
                      {editComment.isEdit &&
                      editComment.id === commentItem.id ? (
                        <span
                          style={{
                            cursor: 'pointer',
                            fontSize: 12,
                            color: 'var(--color-green)'
                          }}
                          onClick={() =>
                            setEditComment({
                              isEdit: false,
                              id: ''
                            })
                          }
                        >
                          Cancel
                        </span>
                      ) : (
                        <span
                          style={{
                            cursor: 'pointer',
                            fontSize: 12,
                            color: 'var(--color-green)'
                          }}
                          onClick={() =>
                            setEditComment({
                              isEdit: true,
                              id: commentItem.id
                            })
                          }
                        >
                          Edit
                        </span>
                      )}

                      <span
                        style={{
                          cursor: 'pointer',
                          fontSize: 12,
                          color: 'var(--color-danger)'
                        }}
                        onClick={() => showDeleteConfirm(commentItem.id)}
                      >
                        Remove
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* REPLY */}
                {replyComment.isReply && replyComment.id === commentItem.id && (
                  <Form
                    style={{ marginLeft: 55, marginTop: 5 }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item name="content" className="input-comment">
                      <Input
                        style={{ height: 48 }}
                        size="large"
                        autoFocus
                        placeholder="Enter your comment"
                      ></Input>
                    </Form.Item>
                  </Form>
                )}
                {/* REPLY */}

                {commentItem.replies.length > 0 &&
                  commentItem.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="reply-item comment-item"
                      style={{ marginLeft: 55 }}
                    >
                      <div>
                        <div className="top">
                          {reply.user.coverPhoto ? (
                            <div className="image-wrapper">
                              <Image
                                src={reply.user.coverPhoto}
                                width={32}
                                height={32}
                                alt="avatar"
                              />
                            </div>
                          ) : (
                            <AntAvatar
                              style={{ flexShrink: 0 }}
                              size="default"
                              icon={<UserOutlined />}
                            />
                          )}

                          <div className="info-user">
                            <p className="user-name">{reply.user.userName}</p>
                            <p>{dayjs(reply.updateAt).format('DD/MM/YYYY')}</p>
                          </div>
                        </div>
                      </div>

                      {editComment.isEdit && editComment.id === reply.id ? (
                        <Form
                          style={{ marginLeft: 55, marginTop: 5 }}
                          onFinish={handelEditComment}
                          autoComplete="off"
                          fields={[
                            {
                              name: ['content'],
                              value: reply.content
                            }
                          ]}
                        >
                          <Form.Item name="content" className="input-comment">
                            <Input
                              style={{ height: 48 }}
                              size="large"
                              autoFocus
                              placeholder="Enter your new comment"
                            ></Input>
                          </Form.Item>
                        </Form>
                      ) : (
                        <div style={{ marginLeft: 55 }} className="content">
                          {reply.content}
                        </div>
                      )}

                      <div className="action">
                        {auth?.id === reply.userId ? (
                          <div
                            style={{
                              display: 'flex',
                              gap: 10,
                              justifyContent: 'end'
                            }}
                          >
                            {editComment.isEdit &&
                            editComment.id === reply.id ? (
                              <span
                                style={{
                                  cursor: 'pointer',
                                  fontSize: 12,
                                  color: 'var(--color-green)'
                                }}
                                onClick={() =>
                                  setEditComment({
                                    isEdit: false,
                                    id: ''
                                  })
                                }
                              >
                                Cancel
                              </span>
                            ) : (
                              <span
                                style={{
                                  cursor: 'pointer',
                                  fontSize: 12,
                                  color: 'var(--color-green)'
                                }}
                                onClick={() =>
                                  setEditComment({
                                    isEdit: true,
                                    id: reply.id
                                  })
                                }
                              >
                                Edit
                              </span>
                            )}

                            <span
                              style={{
                                cursor: 'pointer',
                                fontSize: 12,
                                color: 'var(--color-danger)'
                              }}
                              onClick={() => showDeleteConfirm(reply.id)}
                            >
                              Remove
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CommentPosts
