import { useTheme } from 'next-themes'
import s from './DropdownMenu.module.css'
import { FC } from 'react'
import { FocusScope } from '@react-aria/focus'
import {
  useOverlay,
  DismissButton,
  usePreventScroll,
} from '@react-aria/overlays'
import Link from 'next/link'
import cn from 'classnames'

interface DropdownMenuProps {
  onClose: () => void
  innerRef: React.MutableRefObject<HTMLInputElement>
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  onClose,
  children,
  innerRef,
  ...props
}) => {
  const { theme, setTheme } = useTheme()

  let { overlayProps } = useOverlay(
    {
      isDismissable: true,
      onClose: onClose,
      isOpen: true,
    },
    innerRef
  )

  usePreventScroll()
  return (
    <FocusScope restoreFocus>
      <div className={cn(s.dropdownMenu)} ref={innerRef} {...overlayProps}>
        {/* Needed placeholder for User Interation*/}
        <div className="flex justify-end">
          <span onClick={onClose} className="bg-transparent h-12 w-12" />
        </div>

        <nav className={s.dropdownMenuContainer}>
          <Link href="#">
            <a className={s.link}>My Purchases</a>
          </Link>
          <Link href="#">
            <a className={s.link}>My Account</a>
          </Link>
          <a
            className={s.link}
            onClick={() =>
              theme === 'dark' ? setTheme('light') : setTheme('dark')
            }
          >
            Theme: <strong>{theme}</strong>
          </a>
          <Link href="#">
            <a className={cn(s.link, 'border-t border-accents-2 mt-4')}>
              Logout
            </a>
          </Link>
        </nav>
      </div>
    </FocusScope>
  )
}

export default DropdownMenu
