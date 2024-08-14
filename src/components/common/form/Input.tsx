import React, { HTMLAttributes } from 'react'
import './style.scss'

interface IProps extends HTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  customClass?: string
}

const Input = (props: IProps) => {
  const { customClass = '', children, type = 'text', placeholder = '', ...rest } = props

  return (
    <div className={`input-common ${customClass}`}>
      <input type={type} placeholder={placeholder} {...rest} />
      {children ? <span className='input-icon'>{children}</span> : null}
    </div>
  )
}

export default Input
