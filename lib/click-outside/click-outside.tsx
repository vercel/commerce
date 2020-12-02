import React, { forwardRef, useEffect, Ref, MouseEvent } from 'react'
import hasParent from './has-parent'

interface ClickOutsideProps {
  active: boolean
  onClick: (e?: MouseEvent) => void
  children: any
}

const ClickOutside = forwardRef(
  (
    { active = true, onClick, children }: ClickOutsideProps,
    ref: Ref<HTMLDivElement> | null | any = {}
  ) => {
    const innerRef = ref?.current

    const handleClick = (event: any) => {
      if (!hasParent(event.target, innerRef)) {
        if (typeof onClick === 'function') {
          event.preventDefault()
          event.stopImmediatePropagation()
          onClick(event)
        }
      }
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

    return React.cloneElement(children, { ref })
  }
)

export default ClickOutside
