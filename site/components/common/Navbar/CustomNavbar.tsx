import cn from 'clsx'
import Link from 'next/link'

import { NavigationItem } from '@framework/types/site'

import s from './Navbar.module.css'

interface SubItemProps {
  subItem: NavigationItem
  level?: number
}

const SubItem = ({ subItem, level = 0 }: SubItemProps) => {
  return (
    <>
      <Link href={subItem.url} key={subItem.url}>
        <a
          className={`block rounded ml-${
            level * 2
          } py-[10px] px-4 text-sm text-secondary`}
        >
          {subItem.label}
        </a>
      </Link>
      {subItem.items && subItem.items.length > 0
        ? subItem.items.map((el) => (
            <SubItem subItem={el} key={el.url} level={level + 1} />
          ))
        : null}
    </>
  )
}

interface CustomNavbarProps {
  links?: NavigationItem[]
}

const CustomNavbar = ({ links = [] }: CustomNavbarProps) => {
  return (
    <>
      {links.map((item) => (
        <div className="group inline-block relative" key={item.url}>
          <Link href={item.url}>
            <a
              className={cn(
                s.link,
                Number(item.items?.length) > 0 && s.customLink
              )}
            >
              {item.label}
            </a>
          </Link>
          {item.items && item.items.length > 0 ? (
            <div className="relative top-full left-0 hidden min-w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full">
              {item.items.map((subItem) => (
                <SubItem subItem={subItem} key={subItem.url} />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </>
  )
}

export default CustomNavbar
