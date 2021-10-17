import { useState, useEffect } from 'react'
import { validate } from 'email-validator'
import { Button } from '@components/ui'
import useSubscribe from '@framework/subscriptions/use-subscribe'

const Subscribe = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const subscribe = useSubscribe()

  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubscribe = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await subscribe({
        email: email,
      })
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="w-full max-w-sm">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="email"
          placeholder="janedoe@gmail.com"
          aria-label="Email"
          onChange={handleChange}
        />
        <Button variant="slim" className="mt-1 h-8 " loading={loading}>
          S'INSCRIRE
        </Button>
      </div>
    </form>
  )
}

export default Subscribe
