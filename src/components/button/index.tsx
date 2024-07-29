import React, { HTMLAttributes } from 'react'
import { Button as AntButton } from 'antd'
import './style.scss'

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button = ({ className = '', ...props }: IButtonProps) => {
  return (
    <div className="wrap-button">
      <AntButton
        color="#b39b9b"
        className={`button-common ${className}`}
        {...props}
      >
        {props.children}
      </AntButton>
    </div>
  )
}

export default Button
