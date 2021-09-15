import React, { useRef } from 'react';
import s from './DrawerCommon.module.scss';
import classNames from 'classnames';
import { IconClose } from 'src/components/icons';

interface Props {
  visible: boolean
  title?: string
  children?: React.ReactNode
  onClose: () => void
}

const DrawerCommon = ({ title, visible, children, onClose }: Props) => {
const refInner = useRef<HTMLDivElement>(null)

const handleClickOut = (e: any) => {
  if (e.target.contains(refInner.current)) {
    onClose()
  }
}

  return (
    <div className={classNames({
      [s.drawerCommon]: true,
      [s.hide]: !visible,
      [s.show]: visible,
    })}>
      <div className={s.innerWrap} onClick={handleClickOut}>
        <div className={s.inner} ref={refInner}>
          <div className={s.top}>
            <h4 className={s.heading}>
              {title}
            </h4>
            <div className={s.iconClose} onClick={onClose}>
              <IconClose />
            </div>
          </div>
          <div className={s.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerCommon;