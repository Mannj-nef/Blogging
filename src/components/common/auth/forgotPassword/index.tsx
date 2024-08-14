import React from 'react'
import { Form, FormProps, Input } from 'antd'

import './style.scss'
import Button from '~/components/common/button'
import useAuthStore from '~/store/zustand/authStore'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '~/apis/auth'
import { MESSAGE } from '~/shared/constants'
import useToast from '~/hooks/useToast'

type FieldType = {
  email: string
}

const ForgotPassword = () => {
  const { setTitleModal, setEmail } = useAuthStore()
  const { contextHolder, openNotification } = useToast()
  const { mutate, isPending } = useMutation({ mutationFn: forgotPassword })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values, {
      onSuccess: () => {
        setEmail(values.email)
        setTitleModal('RESET_PASSWORD')
      },
      onError: (err: any) => {
        const errorMessage = err?.response?.data.message || MESSAGE.SOMETHING_WENT_WRONG
        openNotification({
          message: errorMessage,
          type: 'error'
        })
      }
    })
  }

  return (
    <div className='forgot-password'>
      {contextHolder}
      <h2 className='forgot-password-top'>Forgot password</h2>
      <Form layout='vertical' onFinish={onFinish} autoComplete='off'>
        <Form.Item
          label='Email Address'
          name='email'
          className='field-wrapper'
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please input valid Email!' }
          ]}
        >
          <Input placeholder='Enter your email' />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' className='sign-button' loading={isPending}>
            Forgot password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
