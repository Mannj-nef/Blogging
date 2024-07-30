import Link from 'next/link'
import React from 'react'
import './style.scss'

import Button from '~/components/button'
import { NAVIGATORS } from '~/shared/data'

const Header = () => {
  return (
    <header className="header container">
      <Link href="/">
        <h1 className="logo">Blogging</h1>
      </Link>

      <div className="header-right">
        <ul className="header-nav-list">
          {NAVIGATORS.map((item) => (
            <li key={item.title}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>

        <Button className="btn-to-sign">Sign in</Button>
      </div>
    </header>
  )
}

export default Header
