import { useState } from 'react'
import {
  Layout
} from 'src/components/common'
import { DeliveryAndPolicyPage } from 'src/components/modules/delivery-policy'


export default function Test() {
  return (
    <>
      <DeliveryAndPolicyPage />
    </>
  )
}

Test.Layout = Layout
