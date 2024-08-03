import Image from 'next/image'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar as AntAvatar } from 'antd'
import useAuthStore from '~/store/authStore'

const Avatar = () => {
  const { auth } = useAuthStore()

  return (
    <div className="avatar">
      {auth?.coverPhoto ? (
        <div className="image-wrapper">
          <Image src={auth.coverPhoto} width={32} height={32} alt="avatar" />
        </div>
      ) : (
        <AntAvatar size="default" icon={<UserOutlined />} />
      )}

      <div></div>
    </div>
  )
}

export default Avatar
