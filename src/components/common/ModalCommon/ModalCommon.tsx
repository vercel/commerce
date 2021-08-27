import React, { useRef } from 'react'
import { Close } from 'src/components/icons'
import { useOnClickOutside } from 'src/utils/useClickOutSide'
import s from "./ModalCommon.module.scss"
interface Props {
  onClose: () => void
  visible: boolean
	children:React.ReactNode
}

const ModalCommon = ({ onClose, visible,children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const clickOutSide = () => {
    onClose && onClose()
  }
  useOnClickOutside(modalRef, clickOutSide)
  return (
    <>
      {visible && (
        <div
          className={s.background}
        >
          <div className={s.warpper}>
            <div
              className={s.modal}
              ref={modalRef}
            >
							<div className={s.close} onClick={clickOutSide}>
								<Close/>
							</div>
							{children}
						</div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalCommon
