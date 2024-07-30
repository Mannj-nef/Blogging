'use client'
import { Modal as ModalAntd } from 'antd'
import { useEffect, useState } from 'react'
import React from 'react'

interface IProps {
  children: React.ReactNode
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
}

const Modal = ({ children, isModalOpen, handleOk, handleCancel }: IProps) => {
  return (
    <ModalAntd
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </ModalAntd>
  )
}

export default Modal
