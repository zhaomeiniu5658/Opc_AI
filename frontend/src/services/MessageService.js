import { messageApi } from '@/api/message.js'

export const MessageService = {
  fetchList(params) {
    return messageApi.list(params)
  },
}
