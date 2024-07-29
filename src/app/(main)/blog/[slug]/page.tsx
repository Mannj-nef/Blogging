'use client'
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter
} from 'next/navigation'

import React from 'react'

const BlogDetail = () => {
  const router = useRouter()
  const pathname = usePathname()
  const param = useParams()
  const a = useSearchParams()
  console.log(pathname, param, a.get('asdfa'), router)

  return <div>blog detail</div>
}

export default BlogDetail
