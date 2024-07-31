import { create, createStore } from 'zustand'
import { User } from '~/types/user'

export type TittleModal =
  | 'LOGIN'
  | 'REGISTER'
  | 'FORGOT_PASSWORD'
  | 'RESET_PASSWORD'

export type AuthState = {
  isOpenModalAuth: boolean
  titleModal: TittleModal
  auth?: User
}

export type AuthAction = {
  setIsOpenModalAuth: (isOpenModalAuth: boolean) => void
  setTitleModal: (titleModal: TittleModal) => void
}

export type AuthStore = AuthState & AuthAction

const useAuthStore = create<AuthStore>((set) => ({
  isOpenModalAuth: false,
  titleModal: 'LOGIN',
  auth: undefined,

  setIsOpenModalAuth: (isOpenModalAuth: boolean) =>
    set(() => ({ isOpenModalAuth })),
  setTitleModal: (titleModal: TittleModal) => set(() => ({ titleModal }))
}))

export default useAuthStore
