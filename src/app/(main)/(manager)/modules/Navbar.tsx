'use client'
import React from 'react'
import { NAVIGATE_MANAGER } from '~/shared/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <div className="manage-nav">
      {NAVIGATE_MANAGER.map((item) => {
        if (item.href) {
          return (
            <Link
              key={item.title}
              className={`content-item ${pathname === item.href ? 'active' : ''}`}
              href={item.href}
            >
              <div className="icon">{item.icon}</div>
              <p>{item.title}</p>
            </Link>
          )
        }

        return (
          <div key={item.title} className="content-item">
            <div className="icon">{item.icon}</div>
            <p>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Navbar
