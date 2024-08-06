import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import { Avatar as AntAvatar } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { UserOutlined } from '@ant-design/icons'
import useAuthStore from '~/store/authStore'
import { EVENT_KEY, sendEvent } from '~/utils/even'
import Button from '~/components/button'
import { logOut } from '~/services/auth'
import useToken from '~/hooks/useToken'
import useToast from '~/hooks/useToast'
import { MESSAGE } from '~/shared/constants'
import { NAVIGATE_USER } from '~/shared/data'
import usePostStore from '~/store/postStore'

const Avatar = () => {
  const token = useToken()
  const { contextHolder, openNotification } = useToast()

  const [show, setShow] = useState(false)

  const { auth, setAuth } = useAuthStore()
  const { setIsShowModal } = usePostStore()

  const { mutate } = useMutation({ mutationFn: logOut })

  const handleShow = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setShow(!show)
    sendEvent({ eventName: EVENT_KEY.USER_CONTROL })
  }

  const handelClose = useCallback(
    (show: boolean) => {
      if (show) {
        setShow(false)
      }
    },
    [setShow]
  )

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

  useEffect(() => {
    window.addEventListener('click', () => handelClose(show))

    return () => window.removeEventListener('click', () => handelClose(show))
  }, [handelClose, show])

  useEffect

  return (
    <div className="avatar">
      {contextHolder}
      {auth?.coverPhoto ? (
        <div className="image-wrapper" onClick={(e) => handleShow(e)}>
          <Image src={auth.coverPhoto} width={32} height={32} alt="avatar" />
        </div>
      ) : (
        <AntAvatar
          size="default"
          icon={<UserOutlined />}
          onClick={(e) => handleShow(e as MouseEvent<HTMLElement>)}
        />
      )}

      {show ? (
        <div className="avatar-content">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5
            }}
          >
            {NAVIGATE_USER.map((item) => {
              if (item.href) {
                return (
                  <Link
                    key={item.title}
                    className="content-item"
                    href={item.href}
                  >
                    <div className="icon">{item.icon}</div>
                    <p>{item.title}</p>
                  </Link>
                )
              }

              return (
                <div
                  key={item.title}
                  className="content-item"
                  onClick={() => item.click(setIsShowModal(true))}
                >
                  <div className="icon">{item.icon}</div>
                  <p>{item.title}</p>
                </div>
              )
            })}

            <div
              style={{
                height: 2,
                width: '100px',
                backgroundColor: '#6b545473',
                margin: '10px auto',
                borderRadius: 4
              }}
            ></div>
          </div>

          <div onClick={handleLogout}>
            <Button>Log out</Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Avatar
