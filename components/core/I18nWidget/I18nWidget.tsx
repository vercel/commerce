import { FC } from 'react'
import s from './I18nWidget.module.css'
import { Menu } from '@headlessui/react'
import { DoubleChevron } from '@components/icon'
import cn from 'classnames'

const I18nWidget: FC = () => {
  return (
    <nav className={s.root}>
      <Menu>
        <Menu.Button className={s.button}>
          <img className="" src="/flag-us.png" alt="US Flag" />
          <span>English</span>
          <span className="">
            <DoubleChevron />
          </span>
        </Menu.Button>
        <Menu.Items className={s.dropdownMenu}>
          <Menu.Item>
            {({ active }) => (
              <a
                className={cn(s.item, { [s.active]: active })}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Español
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  )
}

export default I18nWidget
