import React, { useRef, useState } from "react"
import s from './AccountPage.module.scss'

import AccountNavigation from '../AccountNavigation/AccountNavigation'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import AccountInfomation from "./components/AccountInfomation/AccountInfomation"
import OrderInfomation from './components/OrderInformation/OrderInformation'
import EditInfoModal from './components/EditInfoModal/EditInfoModal'

const waiting = [
    {
        id: "NO 123456",
        products: ["Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    }
]

const delivering = [
    {
        id: "NO 123456",
        products: ["Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    }
]

const delivered = [
    {
        id: "NO 123456",
        products: ["Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    }
]

let account = {
    name: "vu duong",
    email: "vuduong@gmail.com",
    address: "234 Dien Bien Phu Bis, Dakao ward",
    state: "District 1",
    city: "HCMC",
    postalCode: "700000",
    phoneNumber: "(+84) 937 937 195"
}

interface AccountPageProps {
    defaultActiveContent?: "info" | "orders" | "favorites"
}

const AccountPage = ({defaultActiveContent="orders"} : AccountPageProps) => {
    
    const [activeTab, setActiveTab] = useState(defaultActiveContent==="info"? 0 : defaultActiveContent==="orders"? 1 : 2)
    const [modalVisible, setModalVisible] = useState(false);

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    const changeTab = (tabIndex: number) => {
        setActiveTab(tabIndex);
    }

    const accNavItems = [
        {ref: useRef<HTMLDivElement>(null), active: activeTab===0, itemName: "Customer Information", onClick: changeTab},
        {ref: useRef<HTMLDivElement>(null), active: activeTab===1, itemName: "Your Orders", onClick: changeTab},
        {ref: useRef<HTMLDivElement>(null), active: activeTab===2, itemName: "Favorites", onClick: changeTab}
    ]

    return (
        <>
            <section className={s.accountPage}>
                <div className={s.pageLeft}>
                    <HeadingCommon>Account</HeadingCommon>
                    <div className={s.accNavi}>
                        <AccountNavigation items={accNavItems} defaultActiveIndex={activeTab} />
                    </div>
                </div>
                
                <div className={s.pageRight}>
                    <AccountInfomation active={activeTab === 0} account={account} onClick={showModal}  />
                    <OrderInfomation active={activeTab === 1} waiting={waiting} delivering={delivering} delivered={delivered} />

                    {/* Thieu cai favorite */}
                    {/* <FavoriteProduct active={favoritesActive} favProducts={favProducts} /> */}
                </div>

                
            </section>
            <EditInfoModal accountInfo={account} closeModal={closeModal} visible={modalVisible} />
        </>
    )
}

export default AccountPage