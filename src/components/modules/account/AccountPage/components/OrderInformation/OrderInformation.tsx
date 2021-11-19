import React from "react"
import s from './OrderInformation.module.scss'

import { EmptyCommon, TabCommon } from '../../../../../common'
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import DeliveryItem from '../../../DeliveryItem/DeliveryItem'
import { Order } from "@framework/schema"
import { transformPrice } from "src/utils/funtion.utils"


interface OrderInformationProps {
    addingItem?: Order[],
    paymentAuthorized?: Order[],
    paymentSettled?: Order[],
    partiallyShipped?: Order[],
    shipped?: Order[],
    cancelled?: Order[],
}

const OrderInformation = ({ addingItem, paymentAuthorized, paymentSettled, partiallyShipped, shipped , cancelled} : OrderInformationProps) => {
    return (
        <section className={s.orderInformation}>
            <div className={s.title}>Order Information</div>

            <div className={s.tabs}>
                <TabCommon>
                    <TabPane tabName={"Adding Item"} >
                        <div>
                            <div className={s.blank}></div>
                            {
                                (addingItem && addingItem?.length > 0) ? addingItem?.map(order => {
                                    return (
                                        <DeliveryItem key={order.code} id={order.code} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                }):<EmptyCommon/> 
                            }
                        </div>
                    </TabPane>
                    
                    <TabPane tabName={"Payment Authorized"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                (paymentAuthorized && paymentAuthorized?.length > 0) ? paymentAuthorized?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                }): <EmptyCommon/> 
                            }
                         </div>
                    </TabPane>
                    
                    
                 
                    <TabPane tabName={"Payment Settled"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                (paymentSettled && paymentSettled?.length > 0) ? paymentSettled?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                }) : <EmptyCommon/> 
                            }
                        </div>
                    </TabPane>
                       
                    
                    <TabPane tabName={"Partially Shipped"}>
                        <div className={s.blank}></div>
                        {
                            (partiallyShipped && partiallyShipped?.length > 0) ? partiallyShipped?.map(order => {
                                return (
                                    <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                )
                            }) : <EmptyCommon/> 
                        }
                    </TabPane>

                    <TabPane tabName={"Shipped"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                (shipped && shipped?.length > 0) ?  shipped?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                }) : <EmptyCommon/> 
                            }
                        </div>
                    </TabPane>

                    <TabPane tabName={"Cancelled"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                (cancelled && cancelled?.length > 0) ? cancelled?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                }) : <EmptyCommon/> 
                            }
                        </div>
                    </TabPane>
                </TabCommon>
            </div>
        </section>
    )
}

export default OrderInformation