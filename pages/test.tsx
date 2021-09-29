import { Layout } from 'src/components/common'
import { useMessage } from 'src/components/contexts'

export default function Test() {
  const { showMessageSuccess } = useMessage()

  const handleClick = () => {
    showMessageSuccess("Create account successfully")
  }

  return (
    <>
    <button onClick={handleClick}>Click me</button>
    </>
  )
}

Test.Layout = Layout
