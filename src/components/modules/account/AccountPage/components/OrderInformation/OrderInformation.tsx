import { Order } from "@framework/schema"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import { QUERY_KEY } from "src/utils/constanst.utils"
import { transformPrice } from "src/utils/funtion.utils"
import { OrderState } from "src/utils/types.utils"
import { TabCommon, EmptyCommon } from '../../../../../common'
import DeliveryItem from '../../../DeliveryItem/DeliveryItem'
import s from './OrderInformation.module.scss'



interface OrderInformationProps {
    addingItem?: Order[],
    paymentAuthorized?: Order[],
    paymentSettled?: Order[],
    partiallyShipped?: Order[],
    shipped?: Order[],
    partiallyDelivered?: Order[],
    delivered?: Order[],
    cancelled?: Order[],
}

const getTabIndex = (state?: OrderState): number => {

    switch (state) {
        case 'AddingItems':
            return 0;
        case 'PaymentAuthorized':
            return 1;
        case 'PaymentSettled':
            return 2;
        case 'PartiallyShipped':
            return 3;
        case 'Shipped':
            return 4;
        case 'PartiallyDelivered':
            return 5;   
        case 'Delivered':
            return 6;    
        case 'Cancelled':
            return 7;
        default:
            return 0
    }
}

const OrderInformation = ({ addingItem, paymentAuthorized, paymentSettled, partiallyShipped, shipped, partiallyDelivered, delivered, cancelled }: OrderInformationProps) => {
    const router = useRouter()
    const [defaultTab, setDefaultTab] = useState(0)

    useEffect(() => {
        const query = router.query[QUERY_KEY.ORDER_STATE] as OrderState
        const index = getTabIndex(query)
        setDefaultTab(index)
    }, [router.query])

    return (
        <section className={s.orderInformation}>
            <div className={s.title}>Order Information</div>

            <div className={s.tabs}>
                <TabCommon defaultActiveTab={defaultTab}>
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

                    <TabPane tabName={"Partially Delivered"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                (partiallyDelivered && partiallyDelivered?.length > 0) ?  partiallyDelivered?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                }) : <EmptyCommon/> 
                            }
                        </div>
                    </TabPane>

                    <TabPane tabName={"Delivered"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                (delivered && delivered?.length > 0) ?  delivered?.map(order => {
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