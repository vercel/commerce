import cn from 'classnames'
import { FC, useRef } from 'react'
import s from './Modal.module.css'
import { useDialog } from '@react-aria/dialog'
import { FocusScope } from '@react-aria/focus'
import { Transition } from '@headlessui/react'
import { useOverlay, useModal, OverlayContainer } from '@react-aria/overlays'
import { Cross } from '@components/icons'
interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
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
  let { dialogProps } = useDialog({}, ref)
  let { overlayProps } = useOverlay(
    {
      isOpen: open,
      isDismissable: false,
      onClose: onClose,
      ...props,
    },
    ref
  )

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
                className={s.modal}
                {...overlayProps}
                {...dialogProps}
                {...modalProps}
                ref={ref}
              >
                <div className="h-7 flex items-center justify-end w-full">
                  <button
                    onClick={() => onClose()}
                    aria-label="Close panel"
                    className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none"
                  >
                    <Cross className="h-6 w-6" />
                  </button>
                </div>

                {children}
              </div>
            </Transition.Child>
          </div>
        </FocusScope>
      </OverlayContainer>
    </Transition>
  )
}

export default Modal
