'use client'
import { useQuery } from '@tanstack/react-query'
import { GetProp, Table, TablePaginationConfig, TableProps, Tag } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Input from '~/components/from/Input'
import { IconSearch } from '~/components/icons'
import ActionTable from '~/modules/post/action'
import { getYourPost } from '~/services/posts'
import { QUERY_KEY } from '~/shared/constants'
import { IMAGES } from '~/shared/images'
import useAuthStore from '~/store/authStore'
import usePostStore from '~/store/postStore'
import { Post, STATUS_POST } from '~/types/post'
import { User } from '~/types/user'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: SorterResult<any>['field']
  sortOrder?: SorterResult<any>['order']
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const YourPosts = () => {
  const { auth } = useAuthStore()
  const { yourPosts, setYourPosts } = usePostStore()
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5
    }
  })

  const handleTableChange: TableProps['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setData([]);
    }
  }

  const { data: dataResponse } = useQuery({
    queryKey: [QUERY_KEY.GET_POST_BY_USER_ID, auth],
    queryFn: () => getYourPost((auth as User).id)
  })

  const columns: TableProps<Post>['columns'] = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (value: string) => <p>{value.slice(0, 5)}...</p>
      },
      {
        title: 'Post',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
        render: (_, record) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div
              style={{
                flexShrink: 0,
                width: '80px',
                height: '80px',
                borderRadius: 12,
                overflow: 'hidden'
              }}
            >
              <Image
                src={record.imageThumbnail || IMAGES.IMAGE_DEFAULT}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                alt=""
                width={100}
                height={100}
              />
            </div>

            <h3 className="text-line-3">{record.title}</h3>
          </div>
        )
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => (
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
        render: (_, record) => (
          <ActionTable postId={record.id} postDetail={record} />
        )
      }
    ],
    []
  )

  useEffect(() => {
    if (dataResponse) {
      setYourPosts(dataResponse.posts)
    }
  }, [dataResponse, setYourPosts])

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

      <Table
        columns={columns}
        dataSource={yourPosts}
        rowKey={(row) => row.id}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default YourPosts
