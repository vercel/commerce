import classNames from 'classnames'
import React from 'react'
import { IconDoneCheckout } from 'src/components/icons'
import s from './CheckoutCollapse.module.scss'
interface CheckoutCollapseProps {
  visible: boolean
  id: number
  children: React.ReactNode
  title: string
  isEdit: boolean
  onClose?: (id:number) => void
  onOpen?: (id:number) => void
  onEditClick?:(id:number) => void
  note?:string
  disableEdit?: boolean
}

const CheckoutCollapse = ({
  children,
  id,
  title,
  isEdit,
  visible,
  note,
  onOpen,
	onClose,
  onEditClick,
  disableEdit,
}: CheckoutCollapseProps) => {
	const handleTitleClick = () => {
		if(visible){
			onClose && onClose(id)
    } else if (!disableEdit) {
      onOpen && onOpen(id)
    }
	}
  const handleEdit = () => {
		onEditClick && onEditClick(id)
	}
  return (
    <div className={s.warpper}>
      <div className={s.header}>
        <div className={s.left}>
          <div className={classNames(s.number, { [s.visible]: visible, [s.done]:isEdit })}>
            {isEdit?<IconDoneCheckout/>:id}
          </div>
          <div className={s.title} onClick={handleTitleClick}>
            {title}
          </div>
        </div>
        {!disableEdit && isEdit && <div className={s.edit} onClick={handleEdit}>{'Edit'}</div>}
      </div>
      {(!visible && isEdit) && (<div className={s.note}>{note}</div>) }
      <div className={classNames(s.body, { [`${s.show}`]: visible })}>{children}</div>
    </div>
  )
}

export default CheckoutCollapse
