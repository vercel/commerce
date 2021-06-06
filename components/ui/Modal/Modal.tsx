import { FC, useRef, useEffect, useCallback } from 'react'
import s from './Modal.module.css'
import FocusTrap from '@lib/focus-trap'
import { Cross } from '@components/icons'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
interface ModalProps {
  className?: string
  children?: any
  onClose: () => void
  onEnter?: () => void | null
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
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
      disableBodyScroll(ref.current)
      window.addEventListener('keydown', handleKey)
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearAllBodyScrollLocks()
    }
  }, [open, handleKey])

  return (
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
  )
}

export default Modal
