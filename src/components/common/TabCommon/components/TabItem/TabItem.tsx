import classNames from 'classnames'
<<<<<<< HEAD
import React, { RefObject, useRef } from 'react'
=======
import React from 'react'
>>>>>>> 88f90912429447f6ae7bafa77484465965e0ee13
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
      className={classNames(s.tabItem, {[s.tabItemActive]:active})}
    >
      {children}
    </span>
  )
}

<<<<<<< HEAD
export default TabItem
=======
export default TabItem
>>>>>>> 88f90912429447f6ae7bafa77484465965e0ee13
