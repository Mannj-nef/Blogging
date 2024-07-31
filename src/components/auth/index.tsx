'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import Modal from '~/components/modal'
import SignIn from './signIn'
import useAuthStore from '~/store/authStore'
import SignUp from './signUp'
import ForgotPassword from './forgotPassword'
import ResetPassword from './resetPassword'

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
