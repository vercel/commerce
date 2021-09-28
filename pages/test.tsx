import { useEffect, useState } from 'react'
import {
  ButtonCommon, Layout
} from 'src/components/common'
export default function Test() {
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setisLoading(true)
    }, 3000)
  }, [])
  return (
    <>
      <ButtonCommon loading={isLoading}>Back to home</ButtonCommon>
      <ButtonCommon type='light' loading={isLoading}>Back to home</ButtonCommon>
      <ButtonCommon type='ghost' loading={isLoading}>Back to home</ButtonCommon>
    </>
  )
}

Test.Layout = Layout
