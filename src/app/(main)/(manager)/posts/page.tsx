'use client'
import { Table, TableProps, Tag } from 'antd'
import Image from 'next/image'
import { useMemo } from 'react'
import Input from '~/components/from/Input'
import { IconSearch } from '~/components/icons'
import ActionTable from '~/modules/post/action'
import { IMAGES } from '~/shared/images'
import { CATEGORY, STATUS_POST } from '~/types/post'

interface DataType {
  id: string
  name: string
  category: CATEGORY
  status: STATUS_POST
}

const data: DataType[] = [
  {
    id: '1',
    name: 'John Brown',
    category: CATEGORY.FROND_END,
    status: STATUS_POST.PUBLIC
  }
]

const YourPosts = () => {
  const columns: TableProps<DataType>['columns'] = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Post',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: 12,
                overflow: 'hidden'
              }}
            >
              <Image
                src={IMAGES.IMAGE_DEFAULT}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                alt=""
                width={100}
                height={100}
              />
            </div>

            <h3>{record.name}</h3>
          </div>
        )
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (_, { category }) => (
          <>
            <Tag color={'cyan'} key={category}>
              {category.toUpperCase()}
            </Tag>
          </>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, { status }) => (
          <>
            {status === STATUS_POST.PUBLIC ? (
              <Tag color={'green'}>{status.toUpperCase()}</Tag>
            ) : (
              <Tag color={'volcano'}>{status.toUpperCase()}</Tag>
            )}
          </>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => <ActionTable postId={record.id} />
      }
    ],
    []
  )

  return (
    <div className="your-posts-wrapper">
      <div className="your-posts-top">
        <h2>Your post</h2>

        <Input
          placeholder="search"
          customClass="your-post-search"
          onChange={() => {}}
        >
          <IconSearch />
        </Input>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default YourPosts
