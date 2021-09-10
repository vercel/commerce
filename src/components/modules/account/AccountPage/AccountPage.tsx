import React, { useState } from "react"
import s from './AccountPage.module.scss'

import AccountNavigation from '../AccountNavigation/AccountNavigation'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import AccountInfomation from "./components/AccountInfomation/AccountInfomation"
import OrderInfomation from './components/OrderInformation/OrderInformation'
import EditInfoModal from './components/EditInfoModal/EditInfoModal'
import TabPane from "src/components/common/TabCommon/components/TabPane/TabPane"

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
        products: ["Tomato", "Fish", "Pork", "Onion", "Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    }
]

const delivered = [
    {
        id: "NO 123456",
        products: ["Tomato", "Fish", "Pork", "Onion", "Tomato", "Fish", "Pork", "Onion"],
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
    
    const [activeTab] = useState(defaultActiveContent==="info" ? 0 : defaultActiveContent==="orders" ? 1 : 2)
    const [modalVisible, setModalVisible] = useState(false);

    function showModal() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    return (
        <>
            <section className={s.accountPage}>
                <div className={s.header}>
                    <HeadingCommon>Account</HeadingCommon>
                </div>

                <AccountNavigation defaultActiveIndex={activeTab}>
                    <TabPane tabName="Customer Information"> 
                        <AccountInfomation account={account} onClick={showModal}  />
                    </TabPane>
                    <TabPane tabName="Your Orders"> 
                        <OrderInfomation waiting={waiting} delivering={delivering} delivered={delivered} />
                    </TabPane>
                    <TabPane tabName="Favourite"> 
                        {/* <FavoriteProduct active={activeTab === 2} favProducts={favProducts} /> */}
                    </TabPane>
                </AccountNavigation>
            </section>
            <EditInfoModal accountInfo={account} closeModal={closeModal} visible={modalVisible} />
        </>
    )
}

export default AccountPage