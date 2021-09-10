import React from "react"
import s from './OrderInformation.module.scss'

import { TabCommon } from '../../../../../common'
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import DeliveryItem from '../../../DeliveryItem/DeliveryItem'


interface OrderInformationProps {
    waiting: {id: string, products: string[], totalPrice: number}[],
    delivering: {id: string, products: string[], totalPrice: number}[],
    delivered: {id: string, products: string[], totalPrice: number}[],
    // active?: boolean
}

const OrderInformation = ({ waiting, delivering, delivered} : OrderInformationProps) => {

    return (
        <section className={s.orderInformation}>
            {
                <div>
                    <div className={s.title}>Order Information</div>

                    <div className={s.tabs}>
                        <TabCommon>
                            <TabPane tabName={"Wait for Comfirmation"} >
                                <div className={s.blank}></div>
                                {
                                    waiting.map((order, i) => {
                                        return (
                                            <DeliveryItem key={order.id} id={order.id} status="waiting" products={order.products} totalPrice={order.totalPrice} />
                                        )
                                    }) 
                                }
                            </TabPane>

                            <TabPane tabName={"Delivering"}>
                                <div className={s.blank}></div>
                                {
                                    delivering.map((order, i) => {
                                        return (
                                            <DeliveryItem key={order.id} id={order.id} status="delivering" products={order.products} totalPrice={order.totalPrice} />
                                        )
                                    }) 
                                }
                            </TabPane>

                            <TabPane tabName={"Delivered"}>
                                <div className={s.blank}></div>
                                {
                                    delivered.map((order, i) => {
                                        return (
                                            <DeliveryItem key={order.id} id={order.id} status="delivered" products={order.products} totalPrice={order.totalPrice} />
                                        )
                                    }) 
                                }
                            </TabPane>
                        </TabCommon>
                    </div>
                </div>
            }
        </section>
    )
}

export default OrderInformation