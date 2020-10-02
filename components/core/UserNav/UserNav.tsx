import cn from 'classnames'
import React, { FC } from 'react'
import s from './UserNav.module.css'
import { Avatar } from '@components/core'
import { Heart, Bag } from '@components/icon'
import { useUI } from '@components/ui/context'

interface Props {
  className?: string
}

const UserNav: FC<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className)
  const { openSidebar } = useUI()

  return (
    <nav className={rootClassName}>
      <ul className={s.list}>
        <li className={s.item} onClick={openSidebar}>
          <Bag />
          <span className="bg-black h-4 w-4 absolute rounded-full inset-3 text-white flex items-center justify-center font-bold text-xs">
            1
          </span>
        </li>
        <li className={s.item}>
          <Heart />
        </li>
        <li className={s.item}>
          <Avatar />
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
