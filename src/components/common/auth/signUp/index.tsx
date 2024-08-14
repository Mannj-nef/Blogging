'use client'
import useAuthStore from '~/store/authStore'
import { Form, FormProps, Input } from 'antd'
import Button from '~/components/common/button'
import { IconBack } from '~/components/common/icons'

import './style.scss'
import { useMutation } from '@tanstack/react-query'
import { MESSAGE } from '~/shared/constants'
import { RequestSignUp } from '~/types/request/auth'
import { signUp } from '~/services/auth'
import useToast from '~/hooks/useToast'

type FieldType = {
  userName: string
  password: string
  confirmPassword: string
  email: string
}

const SignUp = () => {
  const { contextHolder, openNotification } = useToast()
  const { setTitleModal, authenticationSuccess } = useAuthStore()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: RequestSignUp) => signUp(payload)
  })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values, {
      onSuccess: () => {
        authenticationSuccess()
      },

      onError: (err: any) => {
        const errorMessage =
          err?.response?.data.message || MESSAGE.SOMETHING_WENT_WRONG

        openNotification({
          message: errorMessage,
          type: 'error'
        })
      }
    })
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="sign-up">
      {contextHolder}
      <h2 className="sign-up-top">Register</h2>

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          className="field-wrapper"
          rules={[
            { required: true, message: 'Username is required' },
            { min: 6, message: 'Please input your username!' }
          ]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          className="field-wrapper"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please input valid Email!' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          className="field-wrapper"
          rules={[
            { required: true, message: 'Password is required' },
            { min: 6, message: 'Please input your password!' }
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          className="field-wrapper"
          rules={[
            ({ getFieldValue }) => ({
              required: true,
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

        <div className="go-back" onClick={() => setTitleModal('LOGIN')}>
          <span className="go-back-icon">
            <IconBack />
          </span>
          <p>Back to login</p>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="sign-button" loading={isPending}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
