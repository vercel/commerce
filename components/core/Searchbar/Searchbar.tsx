import { FC, useEffect } from 'react'
import cn from 'classnames'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'

interface Props {
  className?: string
}

const Searchbar: FC<Props> = ({ className }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  return (
    <div
      className={cn(
        'relative rounded-lg text-sm bg-accent-1 text-gray-600 w-full',
        className
      )}
    >
      <input
        className={s.input}
        placeholder="Search for products..."
        onKeyUp={(e) => {
          e.preventDefault()

          if (e.key === 'Enter') {
            router.push({
              pathname: `/search`,
              query: { q: e.currentTarget.value },
            })
          }
        }}
      />
      <div className={s.iconContainer}>
        <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
      </div>
    </div>
  )
}

export default Searchbar
