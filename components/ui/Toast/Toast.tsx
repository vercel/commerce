import cn from 'classnames'
import { FC, useRef, useEffect, useCallback } from 'react'
import s from './Toast.module.css'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { Transition } from '@headlessui/react'
import { useOverlay, useModal, OverlayContainer } from '@react-aria/overlays'

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
}

const Toast: FC<Props> = ({
  className,
  children,
  open = false,
  onClose,
  ...props
}) => {
  const rootClassName = cn(s.root, className)
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { modalProps } = useModal()
  let { dialogProps } = useDialog({}, ref)
  let { overlayProps } = useOverlay(
    {
      isOpen: open,
      isDismissable: true,
      onClose: onClose,
      ...props,
    },
    ref
  )

  // useEffect(() => {
  //   setTimeout(() => {
  //     useCallback(onClose, [])
  //   }, 400)
  // })

  return (
    <Transition show={open}>
      <OverlayContainer>
        <FocusScope contain restoreFocus autoFocus>
          <div className={rootClassName}>
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={s.toast}
                {...overlayProps}
                {...dialogProps}
                {...modalProps}
                ref={ref}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </FocusScope>
      </OverlayContainer>
    </Transition>
  )
}

export default Toast
