import { useState } from 'react'
import {
  Layout,
} from 'src/components/common'
import { CardItemCheckoutProps } from 'src/components/common/CardItemCheckout/CardItemCheckout'
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import TabCommon from 'src/components/common/TabCommon/TabCommon'
import { CheckoutInfo } from 'src/components/modules/checkout'
import image7 from '../public/assets/images/image7.png'
import image8 from '../public/assets/images/image8.png'


export default function Test() {
  return (
    <>
      
      <TabCommon center={true}>
        <TabPane
          active={true}
          tabName={'dat datdat datdatdatdatdatdat'}
        >
          <div className="w-full">
          datdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdatdat
          </div>
        </TabPane>
        <TabPane active={true} tabName={'1234567890'}>
        <div className="w-full">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit harum sint maiores optio? Perspiciatis, necessitatibus pariatur, ut sed aperiam minus reiciendis alias deleniti eligendi obcaecati illum id maxime accusantium beatae.
          </div>
        </TabPane>
        <TabPane active={true} tabName={'1'}>
        <div className="w-full">
          11111111111111111111111111111111111111111111111111111111111
          </div>
        </TabPane>
      </TabCommon>
    </>
  )
}

Test.Layout = Layout
