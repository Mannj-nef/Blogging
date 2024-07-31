'use client'
import { Form, FormProps, Input } from 'antd'
import './style.scss'
import Button from '~/components/button'
import useAuthStore from '~/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { MESSAGE, QUERY_KEY } from '~/shared/constants'
import { signIn } from '~/services/auth'
import { RequestSignIn } from '~/types/request/auth'
import useToast from '~/hooks/useToast'

type FieldType = {
  email: string
  password: string
}

const SignIn = () => {
  const { contextHolder, openNotification } = useToast()
  const { setResetModalAuth, setTitleModal } = useAuthStore()

  const { mutate } = useMutation({
    mutationKey: [QUERY_KEY.SIGN_IN],
    mutationFn: (payload: RequestSignIn) => signIn(payload)
  })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values, {
      onSuccess: () => {
        setResetModalAuth()
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
            { required: true },
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
            { required: true },
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
          <Button htmlType="submit" className="sign-button">
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
