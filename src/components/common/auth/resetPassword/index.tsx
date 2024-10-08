'use client'

import { Flex, Form, FormProps, GetProps, Input } from 'antd'
import React from 'react'
import Button from '~/components/common/button'
import useAuthStore from '~/store/zustand/authStore'

import './style.scss'
import { IconBack } from '~/components/common/icons'
import { resetPassword } from '~/apis/auth'
import { useMutation } from '@tanstack/react-query'
import useToast from '~/hooks/useToast'
import { MESSAGE } from '~/shared/constants'

type FieldType = {
  password: string
  confirmPassword: string
  otp: number
}

type OTPProps = GetProps<typeof Input.OTP>

const ResetPassword = () => {
  const [otp, setOtp] = React.useState('')
  const { email, setTitleModal, authenticationSuccess } = useAuthStore()
  const { contextHolder, openNotification } = useToast()
  const { mutate, isPending } = useMutation({ mutationFn: resetPassword })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (!email) {
      openNotification({
        message: 'Email not found',
        type: 'error'
      })
      return
    }

    const data = {
      ...values,
      otp,
      email
    }

    mutate(data, {
      onSuccess: () => {
        authenticationSuccess()
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

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onChange: OTPProps['onChange'] = (text) => {
    setOtp(text)
  }

  const sharedProps: OTPProps = {
    onChange
  }
  return (
    <div className='reset-password'>
      {contextHolder}
      <h2 className='reset-password-top'>Reset password</h2>

      <Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item
          label='OTP'
          name='otp'
          className='field-wrapper'
          rules={[{ required: true, message: 'Please input your OTP' }]}
        >
          <Flex gap='middle' align='flex-start' vertical>
            <Input.OTP length={6} {...sharedProps} />
          </Flex>
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          className='field-wrapper'
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Please input your password!' }
          ]}
        >
          <Input.Password placeholder='Enter your password' />
        </Form.Item>

        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          className='field-wrapper'
          rules={[
            { required: true, message: 'Please input your confirm password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password placeholder='Enter your password' />
        </Form.Item>

        <div className='go-back' onClick={() => setTitleModal('FORGOT_PASSWORD')}>
          <span className='go-back-icon'>
            <IconBack />
          </span>
          <p>Back</p>
        </div>

        <Form.Item>
          <Button htmlType='submit' className='sign-button' loading={isPending}>
            Reset password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ResetPassword
