'use client'

import useAuthStore from '~/store/authStore'
import Navbar from './modules/Navbar'
import './style.scss'
import { useRouter } from 'next/navigation'
import { ROUTER } from '~/shared/constants'
import { useEffect } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!auth) {
      router.push(ROUTER.HOME)
    }
  }, [auth, router])

  if (!auth) return null

  return (
    <div className="container wrapper-layout-manager">
      <div className="content-left">
        <Navbar />
      </div>

      <div className="content-right">{children}</div>
    </div>
  )
}

export default Layout
