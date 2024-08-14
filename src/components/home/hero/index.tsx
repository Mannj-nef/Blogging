import Image from 'next/image'
import React from 'react'
import Button from '~/components/common/button'
import { IMAGES } from '~/shared/images'

const Hero = () => {
  return (
    <div className="hero container">
      <Image src={IMAGES.HERO} width={1599} height={581} alt="hero-blog" />

      <div className="hero-info">
        <h2 className="hero-title">Something title</h2>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non cumque
          minima facilis distinctio. Unde repellendus sapiente distinctio enim
          explicabo in sit, blanditiis laborum, velit aut aliquid excepturi quis
          accusantium at!
        </p>

        <div style={{ width: 'fit-content', margin: 'auto' }}>
          <Button className="hero-button">Button</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
