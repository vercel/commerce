import cn from 'classnames'
import { FC, useRef } from 'react'
import s from './Modal.module.css'
import { useDialog } from '@react-aria/dialog'
import { useOverlay, usePreventScroll, useModal } from '@react-aria/overlays'
import { FocusScope } from '@react-aria/focus'

interface Props {
  className?: string
  children?: any
  show?: boolean
  close: () => void
}

const Modal: FC<Props> = ({
  className,
  children,
  show = true,
  close,
  ...props
}) => {
  const rootClassName = cn(s.root, className)
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  usePreventScroll()
  let { modalProps } = useModal()
  let { overlayProps } = useOverlay(props, ref)
  let { dialogProps } = useDialog(props, ref)

  return (
    <div className={rootClassName}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
          ref={ref}
          className={s.modal}
        >
          {children}
        </div>
      </FocusScope>
    </div>
  )
}

export default Modal
