import classNames from 'classnames'
import React, { RefObject, useRef } from 'react'
import s from './TabItem.module.scss'

interface TabItemProps {
  active: boolean
  children: string
  onClick?: (tabIndex: number) => void
  tabIndex: number
}

const TabItem = ({
  active = false,
  children,
  onClick,
  tabIndex,
}: TabItemProps) => {
  const handleClick = () => {
    onClick && onClick(tabIndex)
  }
  return (
    <span
      onClick={handleClick}
      // className={active ? s.tabItemActive : s.tabItem}
      className={classNames(s.tabItem, {[s.tabItemActive]:active})}
    >
      {children}
    </span>
  )
}

export default TabItem
