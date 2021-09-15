import React, { useEffect, useState } from "react"
import s from './AccountPage.module.scss'

import { HeadingCommon, TabPane } from "src/components/common"

import AccountNavigation from '../AccountNavigation/AccountNavigation'
import AccountInfomation from "./components/AccountInfomation/AccountInfomation"
import FavouriteProducts from "./components/FavouriteProducts/FavouriteProducts"
import OrderInfomation from './components/OrderInformation/OrderInformation'
import EditInfoModal from './components/EditInfoModal/EditInfoModal'

import { PRODUCT_CART_DATA_TEST } from 'src/utils/demo-data';
import { ACCOUNT_TAB, QUERY_KEY } from "src/utils/constanst.utils"
import { useRouter } from "next/router"

const waiting = [
    {
        id: "NO 123456",
        products: ["Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    },
    {
        id: "NO 123457",
        products: ["Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    }
]

const delivering = [
    {
        id: "NO 123456",
        products: ["Tomato", "Fish", "Pork", "Onion", "Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    },
    {
        id: "NO 123457",
        products: ["Tomato", "Fish", "Pork", "Onion", "Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    }
]

const delivered = [
    {
        id: "NO 123456",
        products: ["Tomato", "Fish", "Pork", "Onion", "Tomato", "Fish", "Pork", "Onion"],
        totalPrice : 1000
    },
    {
        id: "NO 123457",
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
const getTabIndex = (tab?: string): number => {
    switch (tab) {
        case ACCOUNT_TAB.CUSTOMER_INFO:
            return 0;
        case ACCOUNT_TAB.ORDER:
            return 1;
        case ACCOUNT_TAB.FAVOURITE:
            return 2;
        default:
            return 0
    }
}

const AccountPage = ({ defaultActiveContent="orders" } : AccountPageProps) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState(defaultActiveContent==="info" ? 0 : defaultActiveContent==="orders" ? 1 : 2)
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const query = router.query[QUERY_KEY.TAB] as string
        const index = getTabIndex(query)
        setActiveTab(index)
    }, [router.query[QUERY_KEY.TAB]])

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
                        <FavouriteProducts products={PRODUCT_CART_DATA_TEST}  />
                    </TabPane>
                </AccountNavigation>
            </section>
            <EditInfoModal accountInfo={account} closeModal={closeModal} visible={modalVisible} />
        </>
    )
}

export default AccountPage