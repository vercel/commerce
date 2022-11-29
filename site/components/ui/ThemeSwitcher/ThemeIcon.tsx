import { Moon, Sun, System } from '@components/icons'

interface ThemeIconProps {
  theme?: string
  width: number
  height: number
}

const ThemeIcon = ({ theme, ...props }: ThemeIconProps) => {
  switch (theme) {
    case 'light':
      return <Sun {...props} />

    case 'dark':
      return <Moon {...props} />

    default:
      return <System {...props} />
  }
}

export default ThemeIcon
