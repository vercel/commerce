import cn from 'clsx'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { UserNav } from '@components/common'
import { Moon, Sun, Cross } from '@components/icons'
import s from './CustomerMenuContent.module.css'
import useLogout from '@framework/auth/use-logout'
import {
  Dropdown as DropdownRoot,
  DropdownMenuItem,
  DropdownContent,
  DropdownTrigger,
} from '@components/ui/Dropdown/Dropdown'

const LINKS = [
  {
    name: 'My Orders',
    href: '/orders',
  },
  {
    name: 'My Profile',
    href: '/profile',
  },
  {
    name: 'My Cart',
    href: '/cart',
  },
]

export const Dropdown = <DropdownRoot />

export default function CustomerMenuContent() {
  const router = useRouter()
  const logout = useLogout()
  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()

  function handleClick(_: React.MouseEvent<HTMLAnchorElement>, href: string) {
    router.push(href)
  }

  return (
    <DropdownContent
      asChild
      side="bottom"
      sideOffset={10}
      className={s.root}
      id="CustomerMenuContent"
    >
      {/* <div className={s.placeholder}>
        <button
          aria-label="Close"
          className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none mr-6"
        >
          <Cross className="h-6 w-6 hover:text-accent-3" />
          <span className="ml-2 text-accent-7 text-sm ">Close</span>
        </button>
        <div className={s.nav}>
          <UserNav />
        </div>
      </div> */}
      {LINKS.map(({ name, href }) => (
        <DropdownMenuItem key={href}>
          <a
            className={cn(s.link, {
              [s.active]: pathname === href,
            })}
            onClick={(e) => handleClick(e, href)}
          >
            {name}
          </a>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem>
        <a
          className={cn(s.link, 'justify-between')}
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
        >
          <div>
            Theme: <strong>{theme}</strong>{' '}
          </div>
          <div className="ml-3">
            {theme == 'dark' ? (
              <Moon width={20} height={20} />
            ) : (
              <Sun width={20} height={20} />
            )}
          </div>
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a
          className={cn(s.link, 'border-t border-accent-2 mt-4')}
          onClick={() => logout()}
        >
          Logout
        </a>
      </DropdownMenuItem>
    </DropdownContent>
  )
}
