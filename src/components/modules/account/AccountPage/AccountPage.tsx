import { QueryFavorite } from "@framework/schema"

import React, { useEffect, useState } from "react"
import { HeadingCommon, TabPane } from "src/components/common"
import { useGetFavoriteProduct, useGetUserOrder } from 'src/components/hooks/account'
import { useActiveCustomer } from 'src/components/hooks/auth'
import { ACCOUNT_TAB, DEFAULT_PAGE_SIZE, QUERY_KEY } from "src/utils/constanst.utils"

import AccountNavigation from '../AccountNavigation/AccountNavigation'
import s from './AccountPage.module.scss'
import AccountInfomation from "./components/AccountInfomation/AccountInfomation"
import EditInfoModal from './components/EditInfoModal/EditInfoModal'
import FavouriteProducts from "./components/FavouriteProducts/FavouriteProducts"
import OrderInfomation from './components/OrderInformation/OrderInformation'
import { useRouter } from "next/router"
import { useToggleWishlist } from 'src/components/contexts'

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
    const {itemWishlist, totalItems} = useToggleWishlist();

    const router = useRouter()

    const {userInfo} = useActiveCustomer();
    
    const {addingItem,arrangingPayment,cancelled} = useGetUserOrder();


    const [activeTab, setActiveTab] = useState(defaultActiveContent==="info" ? 0 : defaultActiveContent==="orders" ? 1 : 2)
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        const query = router.query[QUERY_KEY.TAB] as string
        const index = getTabIndex(query)
        setActiveTab(index)
    }, [router.query])

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
                        <AccountInfomation account={userInfo} onClick={showModal}  />
                    </TabPane>
                    <TabPane tabName="Your Orders"> 
                        <OrderInfomation addingItem={addingItem} arrangingPayment={arrangingPayment} cancelled={cancelled} />
                    </TabPane>
                    <TabPane tabName="Favourite"> 
                        <FavouriteProducts products={itemWishlist || []} totalItems={totalItems || 0} />
                    </TabPane>
                </AccountNavigation>
            </section>
            <EditInfoModal accountInfo={userInfo} closeModal={closeModal} visible={modalVisible} />
        </>
    )
}

export default AccountPage

