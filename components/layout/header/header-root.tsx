import { cn } from 'lib/utils'
import { FC, ReactNode } from 'react'

const HeaderRoot: FC<{ children?: ReactNode }> = ({ children }) => {
  return <header className={cn('w-full bg-app')}>{children}</header>
}

export default HeaderRoot
