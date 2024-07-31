import React from 'react'
import Auth from '~/app/@auth'
import Footer from '~/components/footer'
import Header from '~/components/header'

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
