import { useEffect } from 'react'
import { getRandomPairOfColors } from '@lib/colors'
import { useUI } from '@components/ui/context'

export const useUserAvatar = (name = 'userAvatar') => {
  const { userAvatar, setUserAvatar } = useUI()

  useEffect(() => {
    if (!userAvatar && localStorage.getItem(name)) {
      // get bg value locally.
      setUserAvatar(localStorage.getItem(name))
    }
    if (!localStorage.getItem(name)) {
      // local not set, set.
      const bg = getRandomPairOfColors()
      const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`
      localStorage.setItem(name, value)
      setUserAvatar(value)
    }
  }, [])

  return {
    userAvatar,
    setUserAvatar,
  }
}
