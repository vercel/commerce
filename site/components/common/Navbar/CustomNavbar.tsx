import cn from 'clsx'
import Link from 'next/link'

import s from './Navbar.module.css'

type Navigation = {
  url: string
  label: string
  isUrlRelative: boolean
  shouldOpenInNewWindow: boolean
  items?: Navigation[]
}

interface SubItemProps {
  subItem: Navigation
  level?: number
}

const SubItem = ({ subItem, level = 0 }: SubItemProps) => {
  return (
    <>
      {subItem.isUrlRelative ? (
        <Link
          href={subItem.url}
          key={subItem.url}
          className={`block rounded ml-${
            level * 2
          } py-[10px] px-4 text-sm text-black`}
        >
          {subItem.label}
        </Link>
      ) : (
        <a
          href={subItem.url}
          className={`block rounded ml-${
            level * 2
          } py-[10px] px-4 text-sm text-black`}
          target={subItem.shouldOpenInNewWindow ? '_blank' : ''}
          rel="noreferrer"
        >
          {subItem.label}
        </a>
      )}

      {subItem.items && subItem.items.length > 0
        ? subItem.items.map((el) => (
            <SubItem subItem={el} key={el.url} level={level + 1} />
          ))
        : null}
    </>
  )
}

interface CustomNavbarProps {
  links?: Navigation[]
}

const CustomNavbar = ({ links = [] }: CustomNavbarProps) => {
  return (
    <>
      {links.map((item) => (
        <div className="group inline-block relative" key={item.url}>
          {item.isUrlRelative ? (
            <Link
              href={item.url}
              className={cn(
                s.link,
                Number(item.items?.length) > 0 && s.customLink
              )}
            >
              {item.label}
            </Link>
          ) : (
            <a
              href={item.url}
              target={item.shouldOpenInNewWindow ? '_blank' : ''}
              className={cn(
                s.link,
                Number(item.items?.length) > 0 && s.customLink
              )}
              rel="noreferrer"
            >
              {item.label}
            </a>
          )}

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
