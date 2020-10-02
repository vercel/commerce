import cn from 'classnames'
import { FC } from 'react'
import s from './Sidebar.module.css'

interface Props {
  className?: string
  children?: any
}

const Sidebar: FC<Props> = ({ className, children }) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      <div className="fixed inset-0 overflow-hidden shadow-sm bg-black bg-opacity-25">
        <div className="absolute inset-0 overflow-hidden">
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 ">
            <div className="w-screen max-w-2xl">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
