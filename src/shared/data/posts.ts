import { CATEGORY as CATEGORY_ENUM, Post, STATUS_POST } from '~/types/post'

export const CATEGORY: CATEGORY_ENUM[] = [
  CATEGORY_ENUM.FROND_END,
  CATEGORY_ENUM.BACK_END,
  CATEGORY_ENUM.FULL_STACK,
  CATEGORY_ENUM.MOBILE,
  CATEGORY_ENUM.GAME
]

export const POSTS: Post[] = [
  {
    id: '1',
    user: {
      userName: 'John Smith'
    },
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.title 1',
    slug: 'Lorem ipsum dolor sit 1',
    content: '',
    status: STATUS_POST.PUBLIC,
    popularity: 10,
    createdAt: '29/07/2024',
    updateAt: '29/07/2024',
    category: CATEGORY_ENUM.FROND_END,
    imageThumbnail:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8MXwwfHx8MA%3D%3D'
  },
  {
    id: '2',
    user: {
      userName: 'Sarah Johnson'
    },
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.title 2',
    slug: 'Lorem ipsum dolor sit 2',
    content: '',
    status: STATUS_POST.PUBLIC,
    popularity: 10,
    createdAt: '29/07/2024',
    updateAt: '29/07/2024',
    category: CATEGORY_ENUM.FROND_END,
    imageThumbnail:
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfDF8MHx8fDA%3D'
  },
  {
    id: '3',
    user: {
      userName: 'Jane Doe'
    },
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 3',
    slug: 'Lorem ipsum dolor sit 3',
    content: '',
    status: STATUS_POST.PUBLIC,
    popularity: 10,
    createdAt: '29/07/2024',
    updateAt: '29/07/2024',
    category: CATEGORY_ENUM.BACK_END,
    imageThumbnail:
      'https://plus.unsplash.com/premium_photo-1675827055620-24d540e0892a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyZXxlbnwwfDF8MHx8fDA%3D'
  },
  {
    id: '4',
    user: {
      userName: 'Peter Parker'
    },
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. 4',
    slug: 'Lorem ipsum dolor sit 4',
    content: '',
    status: STATUS_POST.PUBLIC,
    popularity: 10,
    createdAt: '29/07/2024',
    updateAt: '29/07/2024',
    category: CATEGORY_ENUM.BACK_END,
    imageThumbnail:
      'https://plus.unsplash.com/premium_photo-1673264933051-3206029946b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5hdHVyZXxlbnwwfDF8MHx8fDA%3D'
  }
]
