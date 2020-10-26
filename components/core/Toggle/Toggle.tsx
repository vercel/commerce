import React, { FC } from 'react'
import { Switch } from '@headlessui/react'
import { Moon, Sun } from '@components/icons'
interface Props {
  className?: string
  checked: boolean
  onChange: any
}

const Toggle: FC<Props> = ({ className, checked, onChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className="focus:outline-none"
    >
      <span
        role="checkbox"
        aria-checked="false"
        tabIndex={0}
        className={`${
          checked ? 'bg-gray-800' : 'bg-gray-200'
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-150 focus:outline-none focus:shadow-outline`}
      >
        <span
          aria-hidden="true"
          className={`${
            checked ? 'translate-x-5' : 'translate-x-0'
          } translate-x-0 relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-150`}
        >
          <span
            className={`${
              checked
                ? 'opacity-0 ease-out duration-150'
                : 'opacity-100 ease-in duration-150'
            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          >
            <Sun className="h-3 w-3 text-accent-3" />
          </span>
          <span
            className={`${
              checked
                ? 'opacity-100 ease-in duration-150'
                : 'opacity-0 ease-out duration-150'
            } opacity-0 ease-out duration-150 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          >
            <Moon className="h-3 w-3 text-yellow-400" />
          </span>
        </span>
      </span>
    </Switch>
  )
}

export default Toggle
