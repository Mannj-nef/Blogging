import React, { HTMLAttributes } from 'react'
import { Button as AntButton } from 'antd'
import './style.scss'

type ButtonType = 'button' | 'submit' | 'reset'
interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  htmlType?: ButtonType
}

const Button = ({
  htmlType = 'button',
  className = '',
  ...props
}: IButtonProps) => {
  return (
    <div className="wrap-button">
      <AntButton
        color="#b39b9b"
        className={`button-common ${className}`}
        htmlType={htmlType}
        {...props}
      >
        {props.children}
      </AntButton>
    </div>
  )
}

export default Button
