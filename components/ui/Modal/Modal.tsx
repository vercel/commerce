import { FC, useRef, useEffect, useCallback } from 'react'
import Portal from '@reach/portal'
import s from './Modal.module.css'
import { Cross } from '@components/icons'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import FocusTrap from '@lib/focus-trap'
interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
  onEnter?: () => void | null
}

const Modal: FC<Props> = ({ children, open, onClose, onEnter = null }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
        window.addEventListener('keydown', handleKey)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearAllBodyScrollLocks()
    }
  }, [open, handleKey])

  return (
    <Portal>
      {open ? (
        <div className={s.root}>
          <div className={s.modal} role="dialog" ref={ref}>
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
            >
              <Cross className="h-6 w-6" />
            </button>
            <FocusTrap focusFirst>{children}</FocusTrap>
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Modal
