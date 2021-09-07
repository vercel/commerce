import React from 'react'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ModalCommon, { ModalCommonProps } from '../ModalCommon/ModalCommon'
import s from './ModalInfo.module.scss'
interface ModalInfoProps extends ModalCommonProps {
  okText?: String
  onOk?: () => void
}

const ModalInfo = ({
  okText = 'Ok',
  onOk,
  children,
  title = 'Confirm',
  ...props
}: ModalInfoProps) => {
  return (
    <ModalCommon {...props} title={title}>
      {children}
      <div className={s.footer}>
          <ButtonCommon onClick={onOk}>{okText}</ButtonCommon>
      </div>
    </ModalCommon>
  )
}

export default ModalInfo
