'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { IconCloseMark } from '~/components/icons'

interface IProps {
  imageURL: string
  handleUploadImage: ({ event, file }: { event: any; file?: File }) => void
  setImageUrl: (url: string) => void
  isLoading?: boolean
}

const ImagePost = ({
  handleUploadImage,
  imageURL,
  setImageUrl,
  isLoading
}: IProps) => {
  const [fileEnter, setFileEnter] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFileEnter(false)

    if (e.dataTransfer.items) {
      Array.from(e.dataTransfer.items).forEach((item, i) => {
        if (item.kind === 'file') {
          const file = item.getAsFile()

          if (file) {
            handleUploadImage({ event: e as any, file })
          }
        }
      })
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#eee',
        height: 200,
        border: `3px ${imageURL ? 'solid' : 'dotted'}  #ccc`,
        borderRadius: 6,
        overflow: 'hidden'
      }}
    >
      {imageURL ? (
        <>
          <div style={{ width: '100%', height: '200px', position: 'relative' }}>
            <Image src={imageURL} style={{ objectFit: 'cover' }} alt="" fill />
            <span
              style={{
                color: ' red',
                padding: 4,
                backgroundColor: 'var(--color-primary)',
                borderRadius: '50%',
                position: 'absolute',
                top: 10,
                right: 10,
                cursor: 'pointer',
                width: 20,
                height: 20,
                display: 'inline-block'
              }}
              onClick={() => setImageUrl('')}
            >
              <IconCloseMark />
            </span>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setFileEnter(true)
            }}
            onDragLeave={(e) => {
              setFileEnter(false)
            }}
            onDragEnd={(e) => {
              e.preventDefault()
              setFileEnter(false)
            }}
            onDrop={handleDrop}
          >
            <label
              htmlFor="file"
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <p className="ant-upload-text">
                {fileEnter
                  ? 'Drop image here'
                  : 'Click or drag image [ jpg, png ] to this area to upload'}
              </p>
            </label>
          </div>

          <input
            id="file"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleUploadImage({ event: e })
            }}
          />
        </>
      )}
    </div>
  )
}

export default ImagePost
