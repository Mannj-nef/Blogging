import { IconBook, IconPencilSquare, IconUser } from '~/components/icons'
import { ROUTER } from '../constants'

export const NAVIGATORS = [
  {
    title: 'Articles',
    path: '/'
  },
  {
    title: 'About',
    path: '/'
  },
  {
    title: 'Q&A',
    path: '/'
  },
  {
    title: 'Discuss',
    path: '/'
  }
]

export const NAVIGATE_USER = [
  {
    title: 'Write new post',
    icon: <IconPencilSquare />,
    click: (callback: void) => callback
  },
  {
    title: 'Edit profile',
    icon: <IconUser />,
    href: ROUTER.USER
  },
  {
    title: 'Your posts',
    icon: <IconBook />,
    href: ROUTER.POSTS
  }
]

export const NAVIGATE_MANAGER = [
  {
    title: 'Your posts',
    icon: <IconBook />,
    href: ROUTER.POSTS
  },
  {
    title: 'User Profile',
    icon: <IconUser />,
    href: ROUTER.USER
  },
  {
    title: 'Logout',
    icon: <IconUser />,
    click: (callback: void) => callback
  }
]
