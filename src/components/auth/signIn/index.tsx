'use client'
import { Form, FormProps, Input } from 'antd'
import './style.scss'
import Button from '~/components/button'
import useAuthStore from '~/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { MESSAGE } from '~/shared/constants'
import { signIn } from '~/services/auth'
import { RequestSignIn } from '~/types/request/auth'
import useToast from '~/hooks/useToast'

type FieldType = {
  email: string
  password: string
}

const SignIn = () => {
  const { contextHolder, openNotification } = useToast()
  const { setResetModalAuth, setTitleModal, getAuth, authenticationSuccess } =
    useAuthStore()

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: RequestSignIn) => signIn(payload)
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
    <div className="sign-in">
      {contextHolder}
      <div className="sign-in-top">
        <h2>Welcome back</h2>
        <p>Welcome back? Please enter your detail</p>
      </div>

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

        <Form.Item>
          <p
            onClick={() => setTitleModal('FORGOT_PASSWORD')}
            className="forgot-password"
          >
            Forgot password
          </p>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="sign-button" loading={isPending}>
            Submit
          </Button>
        </Form.Item>

        <Form.Item style={{ margin: 'auto' }}>
          <p className="to-sign-up">
            <span className="not-account">{`Don't have an account?`} </span>
            <span
              className="go-to-sign-up"
              onClick={() => setTitleModal('REGISTER')}
            >
              Sign up for free
            </span>
          </p>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignIn
