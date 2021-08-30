import React from 'react'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ModalCommon, { ModalCommonProps } from '../ModalCommon/ModalCommon'
import s from './ModalConfirm.module.scss'
interface ModalConfirmProps extends ModalCommonProps {
  okText?: String
  cancelText?: String
  onOk?: () => void
  onCancel?: () => void
}

const ModalConfirm = ({
  okText = 'Ok',
  cancelText = 'cancel',
  onOk,
  onCancel,
  children,
  title = 'Confirm',
  ...props
}: ModalConfirmProps) => {
  return (
    <ModalCommon {...props} title={title}>
      {children}
      <div className={s.footer}>
        <div className="mr-4">
          <ButtonCommon onClick={onCancel} type="light"> {cancelText}</ButtonCommon>
        </div>
          <ButtonCommon onClick={onOk}>{okText}</ButtonCommon>
      </div>
    </ModalCommon>
  )
}

export default ModalConfirm
