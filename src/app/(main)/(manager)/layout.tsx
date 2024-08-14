'use client'

import useAuthStore from '~/store/zustand/authStore'
import Navbar from './modules/Navbar'
import { useRouter } from 'next/navigation'
import { ROUTER } from '~/shared/constants'
import { useEffect } from 'react'
import useToken from '~/hooks/useToken'

import './style.scss'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore()
  const token = useToken()
  const router = useRouter()

  useEffect(() => {
    if (!token && !auth) {
      router.push(ROUTER.HOME)
    }
  }, [auth, router, token])

  if (!auth) return null

  return (
    <div className='container wrapper-layout-manager'>
      <div className='content-left'>
        <Navbar />
      </div>

      <div className='content-right'>{children}</div>
    </div>
  )
}

export default Layout
