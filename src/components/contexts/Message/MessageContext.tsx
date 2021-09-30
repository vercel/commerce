import { createContext, useContext } from 'react'
import { MessageItemProps } from 'src/components/common/MessageCommon/MessageItem/MessageItem'

export type MessageContextType = {
  messages: MessageItemProps[]
  removeMessage: (id: number) => void
  showMessageSuccess: (content: string, timeout?: number) => void
  showMessageInfo: (content: string, timeout?: number) => void
  showMessageError: (content: string, timeout?: number) => void
  showMessageWarning: (content: string, timeout?: number) => void
}
export const DEFAULT_MESSAGE_CONTEXT: MessageContextType = {
  messages: [],
  removeMessage: () => {},
  showMessageSuccess: () => {},
  showMessageInfo: () => {},
  showMessageError: () => {},
  showMessageWarning: () => {},
}

export const MessageContext = createContext<MessageContextType>(
  DEFAULT_MESSAGE_CONTEXT
)

export function useMessage() {
  return useContext(MessageContext)
}
