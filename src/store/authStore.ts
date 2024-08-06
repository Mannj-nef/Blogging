import { create } from 'zustand'
import { getMe } from '~/services/user'
import { User } from '~/types/user'

export type TittleModal =
  | 'LOGIN'
  | 'REGISTER'
  | 'FORGOT_PASSWORD'
  | 'RESET_PASSWORD'

type AuthState = {
  isOpenModalAuth: boolean
  titleModal: TittleModal
  auth?: User
}

type AuthAction = {
  authenticationSuccess: () => void
  getAuth: () => void
  setAuth: (auth?: User) => void
  setResetModalAuth: () => void
  setIsOpenModalAuth: (isOpenModalAuth: boolean) => void
  setTitleModal: (titleModal: TittleModal) => void
}

type AuthStore = AuthState & AuthAction

const useAuthStore = create<AuthStore>((set) => ({
  isOpenModalAuth: false,
  titleModal: 'LOGIN',
  auth: undefined,

  setAuth: (auth?: User) => set(() => ({ auth })),
  setTitleModal: (titleModal: TittleModal) => set(() => ({ titleModal })),

  setResetModalAuth: () => {
    set(() => ({ isOpenModalAuth: false, titleModal: 'LOGIN' }))
  },

  setIsOpenModalAuth: (isOpenModalAuth: boolean) => {
    set(() => ({ isOpenModalAuth }))
  },

  authenticationSuccess: async () => {
    const { user } = await getMe()

    set(() => ({ auth: user }))
    set(() => ({ isOpenModalAuth: false, titleModal: 'LOGIN' }))
  },

  getAuth: async () => {
    const { user } = await getMe()
    set(() => ({ auth: user }))
  }
}))

export default useAuthStore
