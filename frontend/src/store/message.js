import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
  }),
  actions: {
    setMessages(items) {
      this.messages = Array.isArray(items) ? items : []
    },
  },
})
