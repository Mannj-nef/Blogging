import { List } from 'antd'
import { useRouter } from 'next/navigation'
import { Category as CategoryType } from '~/types/post'

interface IProps {
  title?: string
  category: CategoryType[]
}

const Category = ({ category, title = 'ALL CATEGORIES' }: IProps) => {
  const router = useRouter()

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
                  onClick={() =>
                    router.push(`/?category=${item}`, { scroll: false })
                  }
                >
                  {' '}
                  - {item}
                </p>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Category
