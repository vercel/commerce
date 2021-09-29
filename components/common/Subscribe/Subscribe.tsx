import { FC, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import s from './Subscribe.module.css'
import { Button } from '@components/ui'
import { validate } from 'email-validator'
import useSubscribe from '@framework/subscriptions/use-subscribe'

interface Props {
  className?: string
}

const Subscribe: FC<Props> = ({ className }) => {
  const [email, setEmail] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const subscribe = useSubscribe()

  const handleValidation = useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email))
    }
  }, [email, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  const handleSubscribe = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }
    setLoading(true)
    try {
      await subscribe({ email })
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
      setDisabled(false)
    }
  }
  return (

    <form onSubmit={handleSubscribe} className={cn(s.root, className)}>
      <label className="hidden">
        Subscribe
      </label>
      <input
        className={s.input}
        placeholder="Your email"
      />
      <Button
        variant="naked"
        type="submit"
        loading={loading}
        disabled={disabled}
      >I subscribe </Button>
    </form>
  )
}

export default Subscribe
