'use client'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'

interface IProps {
  value: string
  setValue: (value: string) => void
}

const ContentEditor = ({ setValue, value }: IProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

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
        <label htmlFor='image'>Content</label>
      </div>

      <ReactQuill
        className='react-quill-custom-class'
        style={{ marginBottom: 20 }}
        modules={modules}
        theme='snow'
        value={value}
        onChange={setValue}
      />
    </>
  )
}

export default ContentEditor
