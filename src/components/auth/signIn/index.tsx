'use client'
import { Form, FormProps, Input } from 'antd'
import './style.scss'
import Button from '~/components/button'
import useAuthStore from '~/store/authStore'

type FieldType = {
  email: string
  password: string
}

const SignIn = () => {
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
    <div className="sign-in">
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

        <Form.Item>
          <p className="forgot-password">Forgot password</p>
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
