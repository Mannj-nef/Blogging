import React from 'react'
import './style.scss'
import { RESOURCES, SERVICES } from '~/shared/data/footer'
import Link from 'next/link'
import Image from 'next/image'
import { IMAGES } from '~/shared/images'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container footer-content'>
        <div>
          <h3>Resources</h3>
          <div className='footer-link-list'>
            {RESOURCES.map((resourceItems, index) => (
              <ul key={index}>
                {resourceItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h3>Services 1</h3>
          <div className='footer-link-list'>
            <ul>
              {SERVICES.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3>Services 2</h3>
          <div className='footer-link-list'>
            <ul>
              {SERVICES.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3>Mobile application & Link</h3>
          <div className='wrapper-download'>
            <div>
              <div>
                <Image src={IMAGES.GOOGLE_PLAY} width={200} height={50} alt='App Store' loading='lazy'></Image>
              </div>
              <div>
                <Image src={IMAGES.APP_STORE} width={200} height={50} alt='App Store' loading='lazy'></Image>
              </div>
            </div>

            <div className='wrapper-qr'>
              <Image src={IMAGES.SCAN_QR} alt='mannjneff' width={200} height={200} loading='lazy' />
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '12px', padding: 10 }}>Copyright © 2024 - Mannjneff</div>
    </footer>
  )
}

export default Footer
