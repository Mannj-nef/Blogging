import React from 'react'
import { Form, FormProps, Input } from 'antd'

import './style.scss'
import Button from '~/components/button'
import useAuthStore from '~/store/authStore'

type FieldType = {
  email: string
}

const ForgotPassword = () => {
  const { setTitleModal } = useAuthStore()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="forgot-password">
      <h2 className="forgot-password-top">Forgot password</h2>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email Address"
          name="email"
          className="field-wrapper"
          rules={[{ type: 'email', message: 'Please input valid Email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="sign-button"
            onClick={() => setTitleModal('RESET_PASSWORD')}
          >
            Forgot password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
