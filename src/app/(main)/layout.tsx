import React from 'react'
import Auth from '~/app/@auth'
import FormPost from '~/components/fomPosts'

import Header from '~/components/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      {children}
      <Auth />
      <FormPost />
    </>
  )
}

export default MainLayout
