import React, { useEffect, RefObject } from 'react'
import { tabbable } from 'tabbable'

interface Props {
  children: React.ReactNode | any
  focusFirst?: boolean
}

export default function FocusTrap({ children, focusFirst = false }: Props) {
  const root: RefObject<any> = React.useRef()
  const anchor: RefObject<any> = React.useRef(document.activeElement)

  const returnFocus = () => {
    // Returns focus to the last focused element prior to trap.
    if (anchor) {
      anchor.current.focus()
    }
  }

  const trapFocus = () => {
    // Focus the container element
    if (root.current) {
      root.current.focus()
      if (focusFirst) {
        selectFirstFocusableEl()
      }
    }
  }

  const selectFirstFocusableEl = () => {
    // Try to find focusable elements, if match then focus.
    let match = false
    let end = 20 // Try to find match at least n times.
    let i = 0
    const timer = setTimeout(() => {
      if (!match !== i > end) {
        match = !!tabbable(root.current).length
        tabbable(root.current)[0].focus()
      } else {
        clearTimeout(timer)
      }
      console.log('-----------', i)
    }, 100)
  }

  useEffect(() => {
    setTimeout(trapFocus, 20)
    return () => {
      returnFocus()
    }
  }, [root, children])

  return React.createElement('div', {
    ref: root,
    children,
    className: 'outline-none focus-trap',
    tabIndex: -1,
  })
}
