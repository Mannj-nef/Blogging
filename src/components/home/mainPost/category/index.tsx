import { List } from 'antd'
import Button from '~/components/common/button'
import { CATEGORY as CategoryType } from '~/types/post'

interface IProps {
  title?: string
  category: CategoryType[]
  categorySelected?: CategoryType
  onSearch: (title?: CategoryType) => void
}

const Category = ({
  category,
  title = 'ALL CATEGORIES',
  onSearch,
  categorySelected
}: IProps) => {
  const handleSearchCategory = (value: CategoryType) => {
    onSearch(value)
  }

  return (
    <div className="main-post-category">
      <h2>{title}</h2>

      <List
        itemLayout="horizontal"
        dataSource={category}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <p
                  className={`${categorySelected === item ? 'active' : ''}`}
                  onClick={() => handleSearchCategory(item)}
                >
                  {' '}
                  - {item}
                </p>
              }
            />
          </List.Item>
        )}
      />
      <div
        style={{ cursor: 'pointer', marginLeft: 'auto', width: 'fit-content' }}
        onClick={() => onSearch()}
      >
        <Button>Clear</Button>
      </div>
    </div>
  )
}

export default Category
