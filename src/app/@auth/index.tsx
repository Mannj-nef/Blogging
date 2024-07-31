'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp
} from '~/components/auth'
import Modal from '~/components/modal'
import useAuthStore from '~/store/authStore'

const Auth = () => {
  const { isOpenModalAuth, titleModal, setIsOpenModalAuth } = useAuthStore()

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
    setIsOpenModalAuth(true)
  }, [setIsOpenModalAuth])

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
