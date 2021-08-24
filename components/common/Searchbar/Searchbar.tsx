import { FC, memo, useEffect } from 'react'
import cn from 'classnames'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      const q = e.currentTarget.value

      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      )
    }
  }

  return (
    <div className={cn(s.root, className)}>
      <label className="hidden" htmlFor={id}>
        Search
      </label>
      <input
        id={id}
        className={s.input}
        placeholder="Search for products..."
        defaultValue={router.query.q}
        onKeyUp={handleKeyUp}
      />
      <div className={s.iconContainer}>
        <svg className={s.icon} width="21" height="21" viewBox="0 0 21 21" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M16.75 8.5C16.75 13.0563 13.0563 16.75 8.5 16.75C3.94365 16.75 0.25 13.0563 0.25 8.5C0.25 3.94365 3.94365 0.25 8.5 0.25C13.0563 0.25 16.75 3.94365 16.75 8.5ZM15.25 8.5C15.25 12.2279 12.2279 15.25 8.5 15.25C4.77208 15.25 1.75 12.2279 1.75 8.5C1.75 4.77208 4.77208 1.75 8.5 1.75C12.2279 1.75 15.25 4.77208 15.25 8.5Z" fill="black"></path>
          <path d="M16.5303 15.4697C16.2374 15.1768 15.7626 15.1768 15.4697 15.4697C15.1768 15.7626 15.1768 16.2374 15.4697 16.5303L19.2197 20.2803C19.5126 20.5732 19.9874 20.5732 20.2803 20.2803C20.5732 19.9874 20.5732 19.5126 20.2803 19.2197L16.5303 15.4697Z" fill="black"></path>
        </svg>
      </div>
    </div>
  )
}

export default memo(Searchbar)
