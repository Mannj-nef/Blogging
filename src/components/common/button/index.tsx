import React, { HTMLAttributes } from 'react'
import { Button as AntButton } from 'antd'
import './style.scss'

type ButtonType = 'button' | 'submit' | 'reset'
interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  htmlType?: ButtonType
  loading?: boolean
}

const Button = ({ htmlType = 'button', className = '', ...props }: IButtonProps) => {
  return (
    <div className='wrap-button'>
      <AntButton
        style={{ width: '100%' }}
        color='#b39b9b'
        className={`button-common ${className}`}
        htmlType={htmlType}
        loading={props.loading}
        {...props}
      >
        {props.children}
      </AntButton>
    </div>
  )
}

export default Button
