import React, {useState} from "react"
import s from './OrderInformation.module.scss'

import { TabCommon } from '../../../../../common'
import TabPane from '../../components/TabPane/TabPane'
import DeliveryItem from '../../../DeliveryItem/DeliveryItem'


interface OrderInformationProps {
    waiting: {id: string, products: string[], totalPrice: number}[],
    delivering: {id: string, products: string[], totalPrice: number}[],
    delivered: {id: string, products: string[], totalPrice: number}[],
    active: boolean
}

const OrderInformation = ({ waiting, delivering, delivered, active=true } : OrderInformationProps) => {
    const [activeTabPane, setActiveTabPane] = useState("waiting");

    function changeTabPane(tab: string) {
        setActiveTabPane(tab);
    }

    return (
        <section className={s.orderInformation}>
            {
                active && <div>
                    <div className={s.title}>Order Information</div>

                    <div className={s.tabs}>
                        <TabCommon changeTabPane={changeTabPane} />
        
                        <div className={s.tabPanes}>
                            <TabPane active={activeTabPane==="waiting" ? `active` : ""}>
                                {
                                    waiting.map((order, i) => {
                                        return (
                                            <DeliveryItem key={i} id={order.id} status="waiting" products={order.products} totalPrice={order.totalPrice} />
                                        )
                                    }) 
                                }
                            </TabPane>
                            <TabPane active={activeTabPane==="delivering" ? `active` : ""}>
                                {
                                    delivering.map((order, i) => {
                                        return (
                                            <DeliveryItem key={i} id={order.id} status="delivering" products={order.products} totalPrice={order.totalPrice} />
                                        )
                                    }) 
                                }
                            </TabPane>
                            <TabPane active={activeTabPane==="delivered" ?`active` : ""}>
                                {
                                    delivered.map((order, i) => {
                                        return (
                                            <DeliveryItem key={i} id={order.id} status="delivered" products={order.products} totalPrice={order.totalPrice} />
                                        )
                                    }) 
                                }
                            </TabPane>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default OrderInformation