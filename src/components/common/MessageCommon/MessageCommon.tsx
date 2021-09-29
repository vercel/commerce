import React, { memo, useEffect } from 'react'
import s from './MessageCommon.module.scss'
import MessageItem, { MessageItemProps } from './MessageItem/MessageItem'

interface Props {
  messages: MessageItemProps[]
  onRemove?: (id: number) => void
}

const MessageCommon = memo(({ messages, onRemove }: Props) => {
  useEffect(() => {
    console.log("this fun change; onRemove")
  }, [onRemove])

  const handleRemove = (id: number) => {
    onRemove && onRemove(id)
  }
  
  return (
    <div className={s.messageCommon}>
      {messages.reverse().map((item) => (
        <MessageItem
          key={item.id}
          id={item.id}
          content={item.content}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
})

MessageCommon.displayName = 'MessageCommon'
export default MessageCommon
