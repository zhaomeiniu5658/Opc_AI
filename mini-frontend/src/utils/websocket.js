export function createSocketClient({ url, onMessage, onOpen, onClose, onError }) {
  if (typeof uni === 'undefined' || typeof uni.connectSocket !== 'function') {
    return {
      send: () => false,
      close: () => false,
    }
  }

  const socket = uni.connectSocket({ url, complete: () => {} })
  socket.onOpen(onOpen)
  socket.onMessage(onMessage)
  socket.onClose(onClose)
  socket.onError(onError)

  return {
    send(data) {
      socket.send({ data: JSON.stringify(data) })
      return true
    },
    close() {
      socket.close()
      return true
    },
  }
}
