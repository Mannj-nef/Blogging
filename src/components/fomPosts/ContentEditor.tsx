'use client'
import React, { useMemo, useState } from 'react'
import { FullscreenOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import Modal from '~/components/modal'

interface IProps {
  value: string
  setValue: (value: string) => void
}

const ContentEditor = ({ setValue, value }: IProps) => {
  const [isShowFullContent, setIsShowFullContent] = useState(false)
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  )

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link']
      ]
    }),
    []
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <label htmlFor="image">Content</label>
        <FullscreenOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => setIsShowFullContent(true)}
        />
      </div>

      <ReactQuill
        style={{ height: '150px', marginBottom: 20 }}
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
      />

      <Modal
        isModalOpen={isShowFullContent}
        handleCancel={() => setIsShowFullContent(false)}
        handleOk={() => setIsShowFullContent(false)}
        closeIcon={false}
      >
        <div>
          <ReactQuill
            className="full-content-editor-quill"
            modules={modules}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </Modal>
    </>
  )
}

export default ContentEditor
