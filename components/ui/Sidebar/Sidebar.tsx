import { FC, useEffect, useRef } from 'react'
import s from './Sidebar.module.css'
import cn from 'classnames'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

interface SidebarProps {
  children: any
  onClose: () => void
}

const Sidebar: FC<SidebarProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    console.log('Sidebar', ref)
    if (ref.current) {
      disableBodyScroll(ref.current)
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  return (
    <div className={cn(s.root)} ref={ref}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={s.backdrop} onClick={onClose} />
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
          <div className="h-full md:w-screen md:max-w-md">
            <div className={s.sidebar}>{children}</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Sidebar
