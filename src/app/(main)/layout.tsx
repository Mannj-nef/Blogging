import React from 'react'
import Auth from '~/app/@auth'
import FormPost from '~/components/fomPosts'
import Footer from '~/components/footer'

import Header from '~/components/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      {children}
      <Auth />
      <FormPost />
      <Footer />
    </>
  )
}

export default MainLayout
