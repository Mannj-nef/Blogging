import React from 'react'
import Auth from '~/components/auth'
import SignIn from '~/components/auth/signIn'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Modal from '~/components/modal'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      {children}

      <Auth />
      <Footer />
    </>
  )
}

export default MainLayout
