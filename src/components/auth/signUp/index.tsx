'use client'

import useAuthStore from '~/store/authStore'
import { Form, FormProps, Input } from 'antd'
import Button from '~/components/button'
import { IconBack } from '~/components/icons'

import './style.scss'

type FieldType = {
  username: string
  password: string
  confirmPassword: string
  email: string
}

const SignUp = () => {
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
    <div className="sign-up">
      <h2 className="sign-up-top">Register</h2>

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          className="field-wrapper"
          rules={[{ min: 6, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          className="field-wrapper"
          rules={[{ type: 'email', message: 'Please input valid Email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          className="field-wrapper"
          rules={[{ min: 6, message: 'Please input your password!' }]}
        >
          <Input.Password />
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
          <Input.Password />
        </Form.Item>

        <div className="go-back" onClick={() => setTitleModal('LOGIN')}>
          <span className="go-back-icon">
            <IconBack />
          </span>
          <p>Back to login</p>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="sign-button">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
