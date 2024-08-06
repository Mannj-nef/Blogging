'use client'
import { Col, DatePicker, Form, FormProps, Input, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import Button from '~/components/button'
import useUploadImage from '~/hooks/useUploadImage'
import useAuthStore from '~/store/authStore'
import Image from 'next/image'
import { IMAGES } from '~/shared/images'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const dateFormat = 'YYYY/MM/DD'

type FieldType = {
  firstName: string
  lastName: string
  userName: string
  phoneNumber: number
  dateOfBirth: Date
  city: string
  biography: string
}

const UserDetail = () => {
  const { auth } = useAuthStore()
  const { imageURL, handleUploadImage } = useUploadImage()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log(values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  if (!auth) return null

  return (
    <div className="profile-wrapper">
      <div>
        <label className="profile-cover">
          {imageURL ? (
            <Image fill src={imageURL} alt={auth.userName} />
          ) : (
            <>
              <input
                type="file"
                onChange={() => {}}
                style={{ display: 'none' }}
              />
              <Image
                fill
                src={auth.coverPhoto || IMAGES.AVATAR_DEFAULT}
                alt={auth.userName}
              />
            </>
          )}
        </label>
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        fields={[
          {
            name: ['firstName'],
            value: auth.firstName
          },
          {
            name: ['lastName'],
            value: auth.lastName
          },
          {
            name: ['email'],
            value: auth.email
          },
          {
            name: ['phoneNumber'],
            value: auth.phoneNumber
          },
          {
            name: ['dateOfBirth'],
            value: auth.dateOfBirth ? dayjs(auth.dateOfBirth, dateFormat) : ''
          },
          {
            name: ['city'],
            value: auth.city
          },
          {
            name: ['biography'],
            value: auth.biography
          }
        ]}
      >
        <Row gutter={[40, 20]}>
          <Col span={12}>
            <Form.Item
              label="First name"
              name="firstName"
              className="field-wrapper"
            >
              <Input
                size="large"
                placeholder="First name"
                addonAfter={<UserOutlined style={{ width: 20 }} />}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last name"
              name="lastName"
              className="field-wrapper"
            >
              <Input
                size="large"
                placeholder="Last name"
                addonAfter={<UserOutlined style={{ width: 20 }} />}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email address"
              name="email"
              className="field-wrapper"
            >
              <Input
                size="large"
                placeholder="Email"
                addonAfter={<UserOutlined style={{ width: 20 }} />}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              className="field-wrapper"
            >
              <Input
                size="large"
                placeholder="Phone number"
                addonAfter={<UserOutlined style={{ width: 20 }} />}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Date of birth"
              name="dateOfBirth"
              className="field-wrapper"
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                // defaultValue={dayjs('2015/01/01', dateFormat)}
                format={dateFormat}
              />
              {/* <DatePicker
                defaultValue={dayjs('2015/01/01', dateFormat)}
                format={dateFormat}
              /> */}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="City" name="city" className="field-wrapper">
              <Input
                size="large"
                placeholder="City"
                addonAfter={<UserOutlined style={{ width: 20 }} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Bio"
          name="biography"
          className="field-wrapper"
          style={{ marginTop: 20 }}
        >
          <TextArea
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
            // defaultValue={auth.biography}
            minLength={256}
            style={{
              height: 20
            }}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 3 }}
          />
        </Form.Item>

        <div
          style={{ width: 'fit-content', marginLeft: 'auto', marginTop: 20 }}
        >
          <Button htmlType="submit">Save</Button>
        </div>
      </Form>
    </div>
  )
}

export default UserDetail
