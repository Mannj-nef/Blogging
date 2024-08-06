import { useCallback, useMemo } from 'react'
import { IconEye, IconPencilSquare, IconTrash } from '~/components/icons'

import './style.scss'
import usePostStore from '~/store/postStore'

interface IProps {
  postId: string
  postDetail?: any
}

const ActionTable = ({ postId, postDetail }: IProps) => {
  const { setIsShowModal } = usePostStore()
  const handleViewDetailPost = () => {
    console.log(1)
  }
  const handleOpenModalEditPost = useCallback(() => {
    ;() => {
      console.log(2)
      setIsShowModal(true)
    }
  }, [setIsShowModal])

  const handleDeletePost = useCallback(() => {
    console.log({ postId }, 123123)
  }, [postId])

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
          <IconEye
            onClick={handleViewDetailPost}
            style={{ width: 20, height: 20, color: 'var(--color-green)' }}
          />
        )
      },
      {
        type: 'delete',
        icon: (
          <IconTrash
            onClick={handleDeletePost}
            style={{ width: 20, height: 20, color: 'var(--color-danger)' }}
          />
        )
      }
    ],
    [handleDeletePost, handleOpenModalEditPost]
  )

  return (
    <div className="action-table-wrapper">
      {BUTTON_ACTIONS.map((item) => (
        <div key={item.type} className="action-item">
          {item.icon}
        </div>
      ))}
    </div>
  )
}

export default ActionTable
