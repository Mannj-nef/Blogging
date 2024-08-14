import { PaginationProps, Pagination as Paging } from 'antd'

import './style.scss'

interface IProps {
  onChange: PaginationProps['onShowSizeChange']
  classCustom?: string
  currantPage: number
  totalPage: number
  pageSize?: number
}

const Pagination = ({
  onChange,
  classCustom = '',
  currantPage,
  totalPage,
  pageSize = 4
}: IProps) => {
  return (
    <div className={`pagination ${classCustom}`}>
      <Paging
        pageSize={pageSize}
        defaultCurrent={currantPage}
        total={totalPage}
        onChange={onChange}
      />
    </div>
  )
}

export default Pagination
