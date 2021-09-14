import { useState } from 'react'
import { ButtonCommon, Layout } from 'src/components/common'

import CheckoutSuccess from 'src/components/modules/checkout/CheckoutSuccess/CheckoutSuccess'
import LoadingCommon from 'src/components/common/LoadingCommon/LoadingCommon'
import SkeletonParagraph from 'src/components/common/SkeletonCommon/SkeletonParagraph/SkeletonParagraph'
import SkeletonImage from 'src/components/common/SkeletonCommon/SkeletonImage/SkeletonImage'

export default function Test() {
  return (
    <>
      <CheckoutSuccess />
      <LoadingCommon />
      <SkeletonParagraph rows={3} />

      <SkeletonImage align="center" size="large" />
    </>
  )
}

Test.Layout = Layout
