import cn from 'classnames'
import { FC, useRef } from 'react'
import s from './Modal.module.css'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { Transition } from '@headlessui/react'
import { useOverlay, useModal, OverlayContainer } from '@react-aria/overlays'
interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose?: () => void
}

const Modal: FC<Props> = ({
  className,
  children,
  open = false,
  onClose,
  ...props
}) => {
  const rootClassName = cn(s.root, className)
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { modalProps } = useModal()
  let { overlayProps } = useOverlay(props, ref)
  let { dialogProps } = useDialog(props, ref)

  return (
    <Transition show={open}>
      <OverlayContainer>
        <div className={rootClassName} onClick={onClose}>
          <FocusScope contain restoreFocus autoFocus>
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                {...overlayProps}
                {...dialogProps}
                {...modalProps}
                ref={ref}
                className={s.modal}
              >
                {children}
              </div>
            </Transition.Child>
          </FocusScope>
        </div>
      </OverlayContainer>
    </Transition>
  )
}

export default Modal
