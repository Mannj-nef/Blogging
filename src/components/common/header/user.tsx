'use client'
import useAuthStore from '~/store/zustand/authStore'
import Button from '../button'
import Avatar from './avatar'

const User = () => {
  const { auth, setIsOpenModalAuth, setTitleModal } = useAuthStore()

  const handleOpenModalSingIn = () => {
    setIsOpenModalAuth(true)
    setTitleModal('LOGIN')
  }

  return (
    <>
      {auth ? (
        <Avatar />
      ) : (
        <Button className='btn-to-sign' onClick={handleOpenModalSingIn}>
          Sign in
        </Button>
      )}
    </>
  )
}

export default User
