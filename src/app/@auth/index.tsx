'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect } from 'react'
import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp
} from '~/components/common/auth'
import Modal from '~/components/common/modal'
import { getMe } from '~/services/user'
import { QUERY_KEY } from '~/shared/constants'
import useAuthStore from '~/store/authStore'

const Auth = () => {
  const { isOpenModalAuth, titleModal, setIsOpenModalAuth, setAuth } =
    useAuthStore()

  const { data: responseUser, error } = useQuery({
    queryKey: [QUERY_KEY.GET_ME],
    queryFn: getMe
  })

  const handleOk = () => {
    setIsOpenModalAuth(false)
  }

  const handleCancel = () => {
    setIsOpenModalAuth(false)
  }

  const renderModal = useCallback(() => {
    switch (titleModal) {
      case 'LOGIN':
        return <SignIn />

      case 'REGISTER':
        return <SignUp />

      case 'FORGOT_PASSWORD':
        return <ForgotPassword />

      case 'RESET_PASSWORD':
        return <ResetPassword />

      default:
        return null
    }
  }, [titleModal])

  useEffect(() => {
    if (responseUser) {
      setAuth(responseUser.user)
      setIsOpenModalAuth(false)
    }

    if (error) {
      setIsOpenModalAuth(true)
    }
  }, [error, responseUser, setAuth, setIsOpenModalAuth])

  return (
    <>
      <Modal
        isModalOpen={isOpenModalAuth}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        {renderModal()}
      </Modal>
    </>
  )
}

export default Auth
