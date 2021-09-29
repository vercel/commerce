import classNames from 'classnames'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { IconCheck, IconError, IconInfo } from 'src/components/icons'
import s from './MessageItem.module.scss'

export interface MessageItemProps {
  id?: number
  content?: React.ReactNode
  type?: 'info' | 'success' | 'error' | 'warning'
  timeout?: number
  onRemove?: (id?: number) => void
}

const MessageItem = memo(
  ({ id, content, type = 'success', timeout = 3000, onRemove }: MessageItemProps) => {
    const [isHide, setIsHide] = useState<boolean>()
    const [isMouseOver, setIsMouseOver] = useState(false)

    const iconElement = useMemo(() => {
      switch (type) {
        case 'info':
          return <IconInfo />
        case 'success':
          return <IconCheck />
        case 'error':
          return <IconError />
        case 'warning':
          return <IconError />
        default:
          return <IconInfo />
      }
    }, [type])

    useEffect(() => {
      setIsHide(false)
      setTimeout(() => {
        setIsHide(true)
      }, timeout)
    }, [timeout, isMouseOver])

    useEffect(() => {
      if (isHide && !isMouseOver && onRemove) {
        onRemove(id)
      }
    }, [isHide, isMouseOver, onRemove, id])

    const onMouseOver = () => {
      setIsMouseOver(true)
    }

    const onMouseLeave = () => {
      setIsMouseOver(false)
    }

    return (
      <div
        className={classNames(s.messageItem, s[type], {
          [s.hide]: isHide && !isMouseOver,
        })}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <span className={s.icon}>{iconElement}</span>
        <span className={s.content}>{content}</span>
      </div>
    )
  }
)

MessageItem.displayName = 'MessageItem'
export default MessageItem
