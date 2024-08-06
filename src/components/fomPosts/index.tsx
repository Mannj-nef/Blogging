'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Avatar, Form, Input } from 'antd'
import { Select } from 'antd'
import Button from '~/components/button'
import ContentEditor from './ContentEditor'
import ImagePost from './ImagePost'
import { UserOutlined } from '@ant-design/icons'
import usePostStore from '~/store/postStore'
import useAuthStore from '~/store/authStore'
import Modal from '~/components/modal'

import { CATEGORY, STATUS_POST } from '~/types/post'
import useUploadImage from '~/hooks/useUploadImage'
import useToast from '~/hooks/useToast'
import { slugiFy } from '~/utils/handleSlugify'

import './style.scss'
import { useMutation } from '@tanstack/react-query'
import { createPost, updatePost } from '~/services/posts'
import { RequestPostBase } from '~/types/request/posts'

const FormPost = () => {
  const { contextHolder, openNotification } = useToast()
  const { auth } = useAuthStore()
  const { handleUploadImage, imageURL, setImageUrl, isLoading } =
    useUploadImage()
  const { isShowModal, setIsShowModal, postDetail } = usePostStore()

  const [title, setTitle] = useState(postDetail ? postDetail.title : '')
  const [contentValue, setContentValue] = useState(
    postDetail ? postDetail.content : ''
  )
  const [status, setStatus] = useState(
    postDetail ? postDetail.status : STATUS_POST.PUBLIC
  )
  const [category, setCategory] = useState(
    postDetail ? postDetail.category : null
  )

  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: createPost
  })

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: updatePost
  })

  const handleOk = () => {
    setIsShowModal(false)
  }

  const handleCancel = () => {
    setIsShowModal(false)
  }

  const onFinish = () => {
    const dataRequired = {
      content: contentValue,
      slug: slugiFy(title),
      category: category as CATEGORY,
      title
    }
    const data: RequestPostBase = {
      ...dataRequired,
      status,
      imageThumbnail: imageURL
    }

    const requiredValidate = Object.values(dataRequired).some((value) => !value)

    if (requiredValidate) {
      openNotification({
        type: 'error',
        message: 'Please fill all required fields!'
      })
      return
    }

    if (postDetail) {
      // create post
      mutateUpdate(
        { payload: data, postId: `${postDetail.id}` },
        {
          onSuccess: () => {
            console.log('create post success')
            setIsShowModal(false)
          },
          onError: (err: any) => {
            console.log(err)
          }
        }
      )
    } else {
      // create post
      mutateCreate(data, {
        onSuccess: () => {
          console.log('create post success')
          setIsShowModal(false)
        },
        onError: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  const handleChangeStatusPost = (value: STATUS_POST) => {
    setStatus(value)
  }

  const handleChangeCategory = (value: CATEGORY) => {
    setCategory(value)
  }

  useEffect(() => {
    if (postDetail && postDetail.imageThumbnail) {
      setImageUrl(postDetail.imageThumbnail)
    }
  }, [postDetail, imageURL, setImageUrl])

  if (!auth) return null

  return (
    <Modal
      isModalOpen={isShowModal}
      handleOk={handleOk}
      handleCancel={handleCancel}
    >
      {contextHolder}
      <div className="form-post">
        <h3 className="title">
          {postDetail ? 'Update Post' : 'Create new Post'}
        </h3>

        <div className="content-post">
          <div className="content-post-top">
            {auth.coverPhoto ? (
              <div className="image-wrapper">
                <Image
                  src={auth.coverPhoto}
                  width={32}
                  height={32}
                  alt="avatar"
                />
              </div>
            ) : (
              <Avatar size="large" icon={<UserOutlined />} />
            )}

            <div>
              <p className="user-name">{auth.userName}</p>
              <Select
                size="small"
                defaultValue={status}
                style={{ width: 80, padding: 0 }}
                onChange={handleChangeStatusPost}
                options={[
                  { value: STATUS_POST.PUBLIC, label: STATUS_POST.PUBLIC },
                  { value: STATUS_POST.PRIVATE, label: STATUS_POST.PRIVATE }
                ]}
              />
            </div>
          </div>

          <Form layout="vertical" autoComplete="off">
            <Form.Item
              label="Title"
              name="title"
              className="field-wrapper"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!'
                }
              ]}
            >
              <Input
                placeholder="Post title"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              className="field-wrapper"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!'
                }
              ]}
            >
              <Select
                size="large"
                onChange={handleChangeCategory}
                defaultValue={category}
                placeholder="Select a category"
                options={Object.values(CATEGORY).map((category) => ({
                  value: category,
                  label: category
                }))}
              />
            </Form.Item>

            <Form.Item>
              <label htmlFor="image">Image</label>

              <ImagePost
                handleUploadImage={handleUploadImage}
                imageURL={imageURL}
                setImageUrl={setImageUrl}
                isLoading={isLoading}
              />
            </Form.Item>

            <Form.Item>
              <ContentEditor value={contentValue} setValue={setContentValue} />
            </Form.Item>
          </Form>
        </div>

        <div style={{ marginTop: 20 }}>
          <Button
            typeof="submit"
            onClick={onFinish}
            style={{
              backgroundColor: ' var(--color-secondary)',
              color: 'var(--color-primary)'
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default FormPost
