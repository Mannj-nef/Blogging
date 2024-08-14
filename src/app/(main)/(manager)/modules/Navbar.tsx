'use client'
import React from 'react'
import { NAVIGATE_MANAGER } from '~/shared/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useToast from '~/hooks/useToast'
import { useMutation } from '@tanstack/react-query'
import { logOut } from '~/apis/auth'
import useToken from '~/hooks/useToken'
import useAuthStore from '~/store/zustand/authStore'
import { MESSAGE } from '~/shared/constants'
import { IconPencilSquare } from '~/components/common/icons'
import usePostStore from '~/store/zustand/postStore'

const Navbar = () => {
  const pathname = usePathname()
  const token = useToken()
  const { setAuth } = useAuthStore()
  const { contextHolder, openNotification } = useToast()
  const { setIsShowModal } = usePostStore()

  const { mutate } = useMutation({ mutationFn: logOut })

  const handleLogout = () => {
    if (!token) return

    mutate(
      {
        refreshToken: token.refreshToken
      },
      {
        onSuccess: () => {
          setAuth(undefined)
        },
        onError: (err: any) => {
          openNotification({
            message: err?.response?.data.message || MESSAGE.SOMETHING_WENT_WRONG
          })
        }
      }
    )
  }

  return (
    <div className='manage-nav'>
      {contextHolder}
      <div className='content-item' onClick={() => setIsShowModal(true)}>
        <div className='icon'>
          <IconPencilSquare />
        </div>
        <p>Write new post</p>
      </div>

      {NAVIGATE_MANAGER.map((item) => {
        if (item.href) {
          return (
            <Link
              key={item.title}
              className={`content-item ${pathname === item.href ? 'active' : ''}`}
              href={item.href}
            >
              <div className='icon'>{item.icon}</div>
              <p>{item.title}</p>
            </Link>
          )
        }

        return (
          <div key={item.title} className='content-item' onClick={handleLogout}>
            <div className='icon'>{item.icon}</div>
            <p>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Navbar
