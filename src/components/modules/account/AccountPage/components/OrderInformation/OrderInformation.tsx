import React from "react"
import s from './OrderInformation.module.scss'

import { TabCommon } from '../../../../../common'
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import DeliveryItem from '../../../DeliveryItem/DeliveryItem'
import { Order } from "@framework/schema"


interface OrderInformationProps {
    addingItem?: Order[],
    arrangingPayment?: Order[],
    cancelled?: Order[],
}

const OrderInformation = ({ addingItem, arrangingPayment, cancelled} : OrderInformationProps) => {
    return (
        <section className={s.orderInformation}>
            <div className={s.title}>Order Information</div>

            <div className={s.tabs}>
                <TabCommon>
                    <TabPane tabName={"Adding Item"} >
                        <div className={s.blank}></div>
                        {
                            addingItem?.map((order, i) => {
                                return (
                                    <DeliveryItem key={order.code} id={order.code} status="waiting" products={order.lines} totalPrice={order.total} />
                                )
                            }) 
                        }
                    </TabPane>

                    <TabPane tabName={"Arranging Payment"}>
                        <div className={s.blank}></div>
                        {
                            arrangingPayment?.map((order, i) => {
                                return (
                                    <DeliveryItem key={order.id} id={order.id} status="delivering" products={order.lines} totalPrice={order.total} />
                                )
                            }) 
                        }
                    </TabPane>

                    <TabPane tabName={"Cancelled"}>
                        <div className={s.blank}></div>
                        {
                            cancelled?.map((order, i) => {
                                return (
                                    <DeliveryItem key={order.id} id={order.id} status="delivered" products={order.lines} totalPrice={order.total} />
                                )
                            }) 
                        }
                    </TabPane>
                </TabCommon>
            </div>
        </section>
    )
}

export default OrderInformation