import s from './Sidebar.module.css'
import Portal from '@reach/portal'
import { FC, useEffect, useRef } from 'react'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

interface SidebarProps {
  children: any
  open: boolean
  onClose: () => void
}

const Sidebar: FC<SidebarProps> = ({ children, open = false, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   if (ref.current && open) {
  //   //     window.document.body.style.overflow = 'hidden'
  //   //     disableBodyScroll(ref.current)
  //   //   } else {
  //   //     window.document.body.style.overflow &&
  //   //       setTimeout(() => (window.document.body.style.overflow = 'unset'), 30)
  //   //     !!ref.current && enableBodyScroll(ref.current)
  //   //   }
  //   // }, 30)
  //   return () => {
  //     clearAllBodyScrollLocks()
  //   }
  // }, [open])

  return (
    <Portal>
      {open && (
        <div className={s.root} ref={ref}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={onClose}
            />
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
              <div className="h-full md:w-screen md:max-w-md">
                <div className={s.sidebar}>{children}</div>
              </div>
            </section>
          </div>
        </div>
      )}
    </Portal>
  )
}

export default Sidebar
