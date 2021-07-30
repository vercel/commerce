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
    const sidebar = ref.current

    if (sidebar) {
      disableBodyScroll(sidebar, { reserveScrollBarGap: true })
    }

    return () => {
      if (sidebar) enableBodyScroll(sidebar)
      clearAllBodyScrollLocks()
    }
  }, [])

  return (
    <div className={cn(s.root)}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={s.backdrop} onClick={onClose} />
        <section className="absolute inset-y-0 right-0 max-w-full flex outline-none pl-10">
          <div className="h-full w-full md:w-screen md:max-w-md">
            <div className={s.sidebar} ref={ref}>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Sidebar
