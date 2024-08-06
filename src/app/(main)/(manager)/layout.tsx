import Navbar from './modules/Navbar'
import './style.scss'

const Layout = ({ children }: { children: React.ReactNode }) => {
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
