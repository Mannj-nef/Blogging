import { useCallback, useMemo } from 'react'
import { IconEye, IconPencilSquare, IconTrash } from '~/components/common/icons'

import { ExclamationCircleFilled } from '@ant-design/icons'
import usePostStore from '~/store/zustand/postStore'
import { Post } from '~/types/post'
import Link from 'next/link'
import { MESSAGE, ROUTER } from '~/shared/constants'
import { Modal } from 'antd'

import './style.scss'
import { useMutation } from '@tanstack/react-query'
import { deletePost } from '~/apis/posts'
import useToast from '~/hooks/useToast'
interface IProps {
  postId: string
  postDetail: Post
}

const { confirm } = Modal

const ActionTable = ({ postId, postDetail }: IProps) => {
  const { setIsShowModal, setPostDetailUpdate, setYourPosts, yourPosts } = usePostStore()

  const { contextHolder, openNotification } = useToast()

  const { mutate: mutateDeletePost } = useMutation({
    mutationFn: deletePost
  })

  const showDeleteConfirm = useCallback(() => {
    confirm({
      title: 'Do you want to delete these Post?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        mutateDeletePost(postId, {
          onSuccess: () => {
            const newYourPosts = yourPosts.filter((item) => item.id !== postId)
            setYourPosts(newYourPosts)
          },

          onError: (err: any) => {
            const errorMessage = err?.response?.data.message || MESSAGE.SOMETHING_WENT_WRONG
            openNotification({
              message: errorMessage,
              type: 'error'
            })
          }
        })
      }
    })
  }, [mutateDeletePost, openNotification, postId, setYourPosts, yourPosts])

  const handleOpenModalEditPost = useCallback(() => {
    setPostDetailUpdate(postDetail)
    setIsShowModal(true)
  }, [setIsShowModal, setPostDetailUpdate, postDetail])

  const BUTTON_ACTIONS = useMemo(
    () => [
      {
        type: 'edit',
        icon: (
          <IconPencilSquare
            onClick={handleOpenModalEditPost}
            style={{ width: 20, height: 20, color: 'var(--color-link)' }}
          />
        )
      },
      {
        type: 'view',
        icon: (
          <Link href={`${ROUTER.BLOG}/${postDetail.slug} ${postId}`}>
            <IconEye style={{ width: 20, height: 20, color: 'var(--color-green)' }} />
          </Link>
        )
      },
      {
        type: 'delete',
        icon: <IconTrash onClick={showDeleteConfirm} style={{ width: 20, height: 20, color: 'var(--color-danger)' }} />
      }
    ],
    [showDeleteConfirm, handleOpenModalEditPost, postDetail.slug, postId]
  )

  return (
    <div className='action-table-wrapper'>
      {contextHolder}

      {BUTTON_ACTIONS.map((item) => (
        <div key={item.type} className='action-item'>
          {item.icon}
        </div>
      ))}
    </div>
  )
}

export default ActionTable
