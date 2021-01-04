import React, { useEffect, RefObject } from 'react'
import { tabbable } from 'tabbable'

interface Props {
  children: React.ReactNode | any
}

export default function FocusTrap({ children }: Props) {
  const root: RefObject<any> = React.useRef()
  const anchor: RefObject<any> = React.useRef(document.activeElement)

  const returnFocus = () => {
    if (anchor) {
      anchor.current.focus()
    }
  }

  const trapFocus = () => {
    const focusableElements = tabbable(root.current)

    if (focusableElements[0]) {
      focusableElements[0].focus()
    }
  }

  useEffect(() => {
    setTimeout(trapFocus, 20)
    return returnFocus
  }, [root, children])

  return React.createElement('div', {
    ref: root,
    children,
    className: 'outline-none focus-trap',
    tabIndex: -1,
  })
}
