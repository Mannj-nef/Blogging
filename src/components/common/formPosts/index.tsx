'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Avatar, Form, FormProps, Input } from 'antd'
import { Select } from 'antd'
import Button from '~/components/common/button'
import ContentEditor from './ContentEditor'
import ImagePost from './ImagePost'
import { UserOutlined } from '@ant-design/icons'
import usePostStore from '~/store/zustand/postStore'
import useAuthStore from '~/store/zustand/authStore'
import Modal from '~/components/common/modal'

import { CATEGORY, Post, STATUS_POST } from '~/types/post'
import useUploadImage from '~/hooks/useUploadImage'
import useToast from '~/hooks/useToast'
import { slugiFy } from '~/utils/handleSlugify'

import './style.scss'
import { useMutation } from '@tanstack/react-query'
import { createPost, updatePost } from '~/apis/posts'
import { RequestPostBase } from '~/types/request/posts'
import { uuid } from 'uuidv4'

const FormPost = () => {
  const [form] = Form.useForm<Post>()

  const { contextHolder, openNotification } = useToast()
  const { auth } = useAuthStore()
  const { handleUploadImage, imageURL, setImageUrl, isLoading } = useUploadImage()
  const { isShowModal, setIsShowModal, postDetailUpdate, setPostDetailUpdate, setPostDetail, setYourPosts, yourPosts } =
    usePostStore()

  const [title, setTitle] = useState('')
  const [contentValue, setContentValue] = useState(postDetailUpdate ? postDetailUpdate.content : '')
  const [status, setStatus] = useState(STATUS_POST.PUBLIC)
  const [category, setCategory] = useState<CATEGORY | null>(null)

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

    setPostDetailUpdate(undefined)
  }

  const onFinish: FormProps<Post>['onFinish'] = (value) => {
    const dataRequired = {
      content: contentValue,
      slug: slugiFy(title ? title : value.title),
      category: value.category as CATEGORY,
      title: title ? title : value.title
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

    if (postDetailUpdate) {
      // update post
      mutateUpdate(
        { payload: data, postId: `${postDetailUpdate.id}` },
        {
          onSuccess: () => {
            const newPost = yourPosts.map((post) => {
              if (post.id !== postDetailUpdate.id) return post

              return {
                ...post,
                ...data
              }
            })

            setIsShowModal(false)
            setYourPosts(newPost)
            setPostDetail(undefined)

            form.resetFields()
          },
          onError: (err: any) => {
            console.log(err)
          }
        }
      )
    } else {
      const newData = {
        ...data,
        id: uuid()
      }
      // create post
      mutateCreate(newData, {
        onSuccess: () => {
          setIsShowModal(false)
          setYourPosts([...yourPosts, newData as Post].reverse())
          form.resetFields()
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
    if (postDetailUpdate) {
      form.setFieldsValue({
        title: postDetailUpdate.title,
        category: postDetailUpdate.category,
        status: postDetailUpdate.status
      })

      // setTitle
      setContentValue(postDetailUpdate.content)
      setStatus(postDetailUpdate.status)
      setImageUrl(postDetailUpdate.imageThumbnail)
    } else {
      form.setFieldsValue({
        title: '',
        category: undefined,
        status: STATUS_POST.PUBLIC
      })
      setContentValue('')
      setStatus(STATUS_POST.PUBLIC)
      setImageUrl('')
    }
  }, [postDetailUpdate, setImageUrl, isShowModal, form])

  if (!auth) return null

  return (
    <Modal isModalOpen={isShowModal} handleOk={handleOk} handleCancel={handleCancel}>
      {contextHolder}
      <div className='form-post'>
        <h3 className='title'>{postDetailUpdate ? 'Update Post' : 'Create new Post'}</h3>

        <div className='content-post'>
          <div className='content-post-top'>
            {auth.coverPhoto ? (
              <div className='image-wrapper'>
                <Image src={auth.coverPhoto} width={32} height={32} alt='avatar' />
              </div>
            ) : (
              <Avatar size='large' icon={<UserOutlined />} />
            )}

            <div>
              <p className='user-name'>{auth.userName}</p>
              <Select
                size='small'
                value={status}
                style={{ width: 80, padding: 0 }}
                onChange={handleChangeStatusPost}
                options={[
                  { value: STATUS_POST.PUBLIC, label: STATUS_POST.PUBLIC },
                  { value: STATUS_POST.PRIVATE, label: STATUS_POST.PRIVATE }
                ]}
              />
            </div>
          </div>

          <Form form={form} layout='vertical' autoComplete='off' onFinish={onFinish}>
            <Form.Item
              label='Title'
              name='title'
              className='field-wrapper'
              rules={[
                {
                  required: true,
                  message: 'Please input your title!'
                }
              ]}
            >
              <Input placeholder='Post title' onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>

            <Form.Item
              label='Category'
              name='category'
              className='field-wrapper'
              rules={[
                {
                  required: true,
                  message: 'Please input your title!'
                }
              ]}
            >
              <Select
                size='large'
                onChange={handleChangeCategory}
                placeholder='Select a category'
                options={Object.values(CATEGORY).map((category) => ({
                  value: category,
                  label: category
                }))}
              />
            </Form.Item>

            <Form.Item>
              <label htmlFor='image'>Image</label>

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

            <Form.Item>
              <div style={{ marginTop: 20 }}>
                <Button
                  htmlType='submit'
                  // onClick={onFinish}
                  style={{
                    backgroundColor: ' var(--color-secondary)',
                    color: 'var(--color-primary)'
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default FormPost
