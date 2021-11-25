import Link from 'next/link'
import s from './MenuSidebarView.module.css'
import { FC } from 'react'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import { Link as LinkProps} from '.'


interface MenuProps {
  links?: LinkProps[]
}

const MenuSidebarView: FC<MenuProps> = (props) => {
  const { closeSidebar } = useUI()
  const handleClose = () => closeSidebar()

  return (
    <SidebarLayout handleClose={handleClose}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item}>
              <Link href="/search">
                <a>All</a>
              </Link>
            </li>
            {props.links?.map((l: any) => (
              <li key={l.href} className={s.item}>
                <Link href={l.href}>
                  <a>{l.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}

export default MenuSidebarView
