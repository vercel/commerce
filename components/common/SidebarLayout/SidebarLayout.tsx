import React, { FC } from 'react'
import { Cross, ChevronLeft } from '@components/icons'
import { UserNav } from '@components/common'
import cn from 'classnames'
import s from './SidebarLayout.module.css'

type ComponentProps = { className?: string } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
)

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleClose,
  handleBack,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="hover:text-gray-500 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <Cross className="h-6 w-6" />
            <span className="ml-2 text-accent-7 text-xs hover:text-gray-500">
              Close
            </span>
          </button>
        )}

        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="hover:text-gray-500 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="ml-2 text-accent-7 text-xs hover:text-gray-500">
              Back
            </span>
          </button>
        )}
        <UserNav />
      </header>
      {children}
    </div>
  )
}

export default SidebarLayout
