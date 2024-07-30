import { Pagination as Paging } from 'antd'

import './style.scss'

interface IProps {
  onChange: () => void
  classCustom?: string
  currantPage: number
  totalPage: number
}

const Pagination = ({
  onChange,
  classCustom = '',
  currantPage,
  totalPage
}: IProps) => {
  return (
    <div className={`pagination ${classCustom}`}>
      <Paging
        defaultCurrent={currantPage}
        total={totalPage}
        onChange={onChange}
      />
    </div>
  )
}

export default Pagination
