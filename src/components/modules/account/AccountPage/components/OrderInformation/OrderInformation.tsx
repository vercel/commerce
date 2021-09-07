import React, {useRef, useState, RefObject} from "react"
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

    const [activeTab, setActiveTab] = useState(0);
    const [activeTabPane, setActiveTabPane] = useState("waiting");
    const slider = useRef<HTMLDivElement>(null);

    function slide(ref: RefObject<HTMLLIElement>) {
        const width = ref.current.offsetWidth;
        const left = ref.current.offsetLeft; 
               
        slider.current.style.width = (width-48).toString()+"px";
        slider.current.style.left = left.toString()+"px";
    }

    function onTabClick(tabIndex: number, tabPane: string) {
        setActiveTab(tabIndex);
        setActiveTabPane(tabPane);
        slide(tabs[tabIndex].ref)
    }

    const tabs = [
        {ref: useRef<HTMLLIElement>(null), tabName: "Wait for comfirmation", active: activeTab === 0, onClick: () => onTabClick(0, "waiting") },
        {ref: useRef<HTMLLIElement>(null), tabName: "Delivering", active: activeTab === 1, onClick: () => onTabClick(1, "delivering") },
        {ref: useRef<HTMLLIElement>(null), tabName: "Delivered", active: activeTab === 2, onClick: () => onTabClick(2, "delivered") },
    ]

    return (
        <section className={s.orderInformation}>
            {
                active && <div>
                    <div className={s.title}>Order Information</div>

                    <div className={s.tabs}>
                        <TabCommon tabs={tabs} defaultActiveTab={activeTab} sliderRef={slider} slideToTab={slide} />
        
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