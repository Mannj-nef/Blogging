import Link from 'next/link'
import React from 'react'
import './style.scss'

import { NAVIGATORS } from '~/shared/data'
import User from './user'

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

        <User />
      </div>
    </header>
  )
}

export default Header
