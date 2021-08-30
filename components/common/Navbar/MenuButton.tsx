import { FC } from 'react'
import s from './MenuButton.module.css'
import cn from 'classnames'

interface MenuButtonProps {
  isOpen: boolean
  onClick: any
}

const MenuButton: FC<MenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(s.menuButton, { [s.isOpen]: isOpen })}
    />
  )
}

export default MenuButton
