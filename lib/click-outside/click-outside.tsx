import React, { useRef, useEffect, MouseEvent, ReactElement } from 'react'
import mergeRefs from 'react-merge-refs'
import hasParent from './has-parent'

interface ClickOutsideProps {
  active: boolean
  onClick: (e?: MouseEvent) => void
  children: any
}

const ClickOutside = ({
  active = true,
  onClick,
  children,
}: ClickOutsideProps) => {
  const innerRef = useRef()
  const child = children ? React.Children.only(children) : undefined
  if (!child) {
    throw new Error('A valid non Fragment React Children should be provided')
  }

  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('touchstart', handleClick)
    }

    return () => {
      if (active) {
        document.removeEventListener('mousedown', handleClick)
        document.removeEventListener('touchstart', handleClick)
      }
    }
  })

  const handleClick = (event: any) => {
    if (!hasParent(event.target, innerRef?.current)) {
      if (typeof onClick === 'function') {
        onClick(event)
      }
    }
  }

  const composedRefCallback = (element: ReactElement) => {
    if (child) {
      if (typeof child.ref === 'function') {
        child.ref(element)
      } else if (child.ref) {
        child.ref.current = element
      }
    }
  }

  return React.cloneElement(child, {
    ref: mergeRefs([composedRefCallback, innerRef]),
  })
}

export default ClickOutside
