import { ReactNode, useState } from 'react'
import { MessageItemProps } from 'src/components/common/MessageCommon/MessageItem/MessageItem'
import { LANGUAGE } from 'src/utils/language.utils'
import { MessageContext } from './MessageContext'

type Props = {
  children: ReactNode
}

export function MessageProvider({ children }: Props) {
  const [currentId, setCurrentId] = useState<number>(0)
  const [messages, setMessages] = useState<MessageItemProps[]>([])

  const createNewMessage = (
    content: string,
    timeout?: number,
    type?: 'info' | 'success' | 'error' | 'warning'
  ) => {
    const item: MessageItemProps = {
      id: currentId + 1,
      content,
      type,
      timeout,
    }
    setCurrentId(currentId + 1)
    setMessages([...messages, item])
  }

  const showMessageSuccess = (content: string, timeout?: number) => {
    createNewMessage(content, timeout, 'success')
  }

  const showMessageInfo = (content: string, timeout?: number) => {
    createNewMessage(content, timeout, 'info')
  }

  const showMessageError = (content?: string, timeout?: number) => {
    createNewMessage(content || LANGUAGE.MESSAGE.ERROR, timeout, 'error')
  }

  const showMessageWarning = (content: string, timeout?: number) => {
    createNewMessage(content, timeout, 'warning')
  }

  const removeMessage = (id: number) => {
    const newMessages = messages.filter((item) => item.id !== id)
    setMessages(newMessages)

    if (newMessages.length === 0) {
      setCurrentId(0)
    }
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        removeMessage,
        showMessageSuccess,
        showMessageInfo,
        showMessageError,
        showMessageWarning,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
