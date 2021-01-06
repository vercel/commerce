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
    // Up to 4 seconds of load time threshold
    let match = false
    let end = 22 // Try to find match at least n times.
    let i = 0
    const timer = setInterval(
      () => {
        console.log('-----------', i)
        if (!match !== i > end) {
          match = !!tabbable(root.current).length
          if (root.current) {
            tabbable(root.current)[0].focus()
          }
          i = i + 1
        } else {
          clearInterval(timer)
        }
      },
      i < 2 ? 0 : 200
    )
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
