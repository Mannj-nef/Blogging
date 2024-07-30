'use client'

import useAuthStore from '~/store/authStore'
import Button from '../button'

const User = () => {
  const { auth, setIsOpenModalAuth, setTitleModal } = useAuthStore()

  const handleOpenModalSingIn = () => {
    setIsOpenModalAuth(true)
    setTitleModal('LOGIN')
  }

  return (
    <>
      {auth ? (
        <></>
      ) : (
        <Button className="btn-to-sign" onClick={handleOpenModalSingIn}>
          Sign in
        </Button>
      )}
    </>
  )
}

export default User
