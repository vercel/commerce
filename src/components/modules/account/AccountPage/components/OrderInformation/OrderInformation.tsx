import { Order } from "@framework/schema"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import { QUERY_KEY } from "src/utils/constanst.utils"
import { transformPrice } from "src/utils/funtion.utils"
import { OrderState } from "src/utils/types.utils"
import { TabCommon } from '../../../../../common'
import DeliveryItem from '../../../DeliveryItem/DeliveryItem'
import s from './OrderInformation.module.scss'



interface OrderInformationProps {
    addingItem?: Order[],
    paymentAuthorized?: Order[],
    paymentSettled?: Order[],
    partiallyShipped?: Order[],
    shipped?: Order[],
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
        case 'Cancelled':
            return 5;
        default:
            return 0
    }
}

const OrderInformation = ({ addingItem, paymentAuthorized, paymentSettled, partiallyShipped, shipped, cancelled }: OrderInformationProps) => {
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
                                addingItem?.map(order => {
                                    return (
                                        <DeliveryItem key={order.code} id={order.code} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                })
                            }
                        </div>
                    </TabPane>

                    <TabPane tabName={"Payment Authorized"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                paymentAuthorized?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                })
                            }
                        </div>
                    </TabPane>



                    <TabPane tabName={"Payment Settled"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                paymentSettled?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                })
                            }
                        </div>
                    </TabPane>


                    <TabPane tabName={"Partially Shipped"}>
                        <div className={s.blank}></div>
                        {
                            partiallyShipped?.map(order => {
                                return (
                                    <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                )
                            })
                        }
                    </TabPane>

                    <TabPane tabName={"Shipped"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                shipped?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                })
                            }
                        </div>
                    </TabPane>

                    <TabPane tabName={"Cancelled"}>
                        <div>
                            <div className={s.blank}></div>
                            {
                                cancelled?.map(order => {
                                    return (
                                        <DeliveryItem key={order.id} id={order.id} status={order.state} products={order.lines} currencyCode={order.currencyCode} totalPrice={transformPrice(order.totalWithTax)} />
                                    )
                                })
                            }
                        </div>
                    </TabPane>
                </TabCommon>
            </div>
        </section>
    )
}

export default OrderInformation