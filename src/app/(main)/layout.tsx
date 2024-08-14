import React from 'react'
import Auth from '~/app/@auth'
import FormPost from '~/components/common/formPosts'
import Footer from '~/components/common/footer'

import Header from '~/components/common/header'

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
