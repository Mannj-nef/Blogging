'use client'

import { Flex, Form, FormProps, GetProps, Input } from 'antd'
import React from 'react'
import Button from '~/components/button'
import useAuthStore from '~/store/authStore'

import './style.scss'
import { IconBack } from '~/components/icons'

type FieldType = {
  password: string
  confirmPassword: string
  otp: number
}

type OTPProps = GetProps<typeof Input.OTP>

const ResetPassword = () => {
  const { setTitleModal } = useAuthStore()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text)
  }

  const sharedProps: OTPProps = {
    onChange
  }
  return (
    <div className="reset-password">
      <h2 className="reset-password-top">Reset password</h2>

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="OTP" name="otp" className="field-wrapper">
          <Flex gap="middle" align="flex-start" vertical>
            <Input.OTP length={6} {...sharedProps} />
          </Flex>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          className="field-wrapper"
          rules={[{ min: 6, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          className="field-wrapper"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              }
            })
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <div
          className="go-back"
          onClick={() => setTitleModal('FORGOT_PASSWORD')}
        >
          <span className="go-back-icon">
            <IconBack />
          </span>
          <p>Back</p>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="sign-button">
            Reset password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ResetPassword
