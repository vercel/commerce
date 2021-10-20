import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'

interface Link {
  href: string
  label: string
}

interface MenuProps {
  links?: Link[]
}

const MenuSidebarView: FC<MenuProps> = (props) => {
  const { closeSidebar } = useUI()
  const handleClose = () => closeSidebar()

  console.log(props.links)
  return (
    <SidebarLayout handleClose={handleClose}>
      <div className="px-4 sm:px-6 flex-1">
        <ul>
          {props.links?.map((l: any) => (
            <li key={l.href}>
              <Link href={l.href}>
                <a>{l.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SidebarLayout>
  )
}

export default MenuSidebarView
