import React from 'react'
import Footer from '~/components/footer'
import Header from '~/components/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
