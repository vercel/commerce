import { useState } from 'react'
import { ChevronRight, Cross } from '@components/icons'
import { useToggleTheme } from '@lib/hooks/useToggleTheme'
import cn from 'clsx'
import ClickOutside from '@lib/click-outside'
import ThemeIcon from './ThemeIcon'

const ThemeSwitcher = () => {
  const [display, setDisplay] = useState(false)
  const { theme, themes, setTheme } = useToggleTheme()

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div className="relative">
        <div
          className="flex items-center relative"
          onClick={() => setDisplay(!display)}
        >
          <button
            className={
              'w-[125px] h-10 pl-2 pr-1 rounded-md border border-accent-2 flex items-center justify-between transition-colors ease-linear hover:border-accent-3 hover:shadow-sm'
            }
            aria-label="Theme Switcher"
          >
            <span className="flex flex-shrink items-center">
              <ThemeIcon width={20} height={20} theme={theme} />
              <span className={cn('capitalize leading-none ml-2')}>
                {theme}
              </span>
            </span>
            <span className="cursor-pointer">
              <ChevronRight
                className={cn('transition duration-300', {
                  ['rotate-90']: display,
                })}
              />
            </span>
          </button>
        </div>
        <div className="absolute top-0 right-0">
          {themes.length && display ? (
            <div
              className={
                'fixed shadow-lg right-0 top-12 mt-2 origin-top-right w-full h-full outline-none bg-accent-0 z-40 lg:absolute lg:border lg:border-accent-1 lg:shadow-lg lg:w-56 lg:h-auto'
              }
            >
              <div className="flex flex-row justify-end px-6">
                <button
                  className="md:hidden"
                  onClick={() => setDisplay(false)}
                  aria-label="Close panel"
                >
                  <Cross className="h-6 w-6" />
                </button>
              </div>
              <ul>
                {themes.map((t: string) => (
                  <li key={t}>
                    <button
                      className="flex w-full capitalize cursor-pointer px-6 py-3 transition ease-in-out duration-150 text-primary leading-6 font-medium items-center hover:bg-accent-1"
                      role={'link'}
                      onClick={() => {
                        setTheme(t)
                        setDisplay(false)
                      }}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </ClickOutside>
  )
}

export default ThemeSwitcher
