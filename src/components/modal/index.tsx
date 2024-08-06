'use client'
import { Modal as ModalAntd } from 'antd'
import React from 'react'

interface IProps {
  children: React.ReactNode
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  closeIcon?: boolean
}

const Modal = ({
  children,
  isModalOpen,
  handleOk,
  handleCancel,
  closeIcon = true
}: IProps) => {
  return (
    <ModalAntd
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closeIcon={closeIcon}
    >
      {children}
    </ModalAntd>
  )
}

export default Modal
