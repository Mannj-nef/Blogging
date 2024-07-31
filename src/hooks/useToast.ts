import { notification } from 'antd'
import type { NotificationArgsProps } from 'antd'

type NotificationPlacement = NotificationArgsProps['placement']

interface IUseToast {
  placement?: NotificationPlacement
  message: string
  description?: string
  type?: 'success' | 'info' | 'warning' | 'error'
}

const useToast = () => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({
    message,
    placement = 'topRight',
    type = 'info'
  }: IUseToast) => {
    const toastInfo = {
      message,
      description: '',
      placement
    }

    return api[type](toastInfo)
  }

  return {
    contextHolder,
    openNotification
  }
}

export default useToast
