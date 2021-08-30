import React, { useRef } from 'react'
import { Close } from 'src/components/icons'
import { useOnClickOutside } from 'src/utils/useClickOutSide'
import s from './ModalCommon.module.scss'
interface Props {
  onClose: () => void
  visible: boolean
  children: React.ReactNode
  title?: string
  maxWidth?:string
}

const ModalCommon = ({ onClose, visible, children, title="Modal",maxWidth }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const clickOutSide = () => {
    onClose && onClose()
  }
  useOnClickOutside(modalRef, clickOutSide)
  return (
    <>
      {visible && (
        <div className={s.background}>
          <div className={s.warpper}>
            <div className={s.modal} ref={modalRef} style={{maxWidth}}>
              <div className={s.top}>
                <div className={s.title}>{title}</div>
                <div className={s.close} onClick={clickOutSide}>
                  <Close />
                </div>
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
