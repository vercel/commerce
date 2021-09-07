import classNames from 'classnames'
import React from 'react'
import s from './CheckoutCollapse.module.scss'
interface CheckoutCollapseProps {
  visible: boolean
  id: number
  children: React.ReactNode
  title: string
  isEdit: boolean
  onClose: () => void
  onOpen: () => void
}

const CheckoutCollapse = ({
  children,
  id,
  title,
  isEdit,
  visible,
  onOpen,
	onClose,
}: CheckoutCollapseProps) => {
	const handleTitleClick = () => {
		if(visible){
			onClose && onClose()
		}else{
			onOpen && onOpen()
		}
	}
  return (
    <div className={s.warpper}>
      <div className={s.header}>
        <div className={s.left}>
          <div className={classNames(s.number, { [`${s.visible}`]: visible })}>
            {id}
          </div>
          <div className={s.title} onClick={handleTitleClick}>
            {title}
          </div>
        </div>
        {isEdit && <div className={s.edit}>{'Edit'}</div>}
      </div>
      <div className={classNames(s.body, { [`${s.show}`]: visible })}>{children}</div>
    </div>
  )
}

export default CheckoutCollapse
