import { Layout } from 'src/components/common'
import { useMessage } from 'src/components/contexts'

export default function Test() {
  const { showMessageError } = useMessage()

  const handleClick = () => {
    showMessageError("Create account successfully")
  }

  return (
    <>
    <button onClick={handleClick}>Click me</button>
    </>
  )
}

Test.Layout = Layout
