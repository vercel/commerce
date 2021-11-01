import { QueryFavorite } from "@framework/schema"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { HeadingCommon, TabPane } from "src/components/common"
import { useGetFavoriteProduct, useGetUserOrder } from 'src/components/hooks/account'
import { useActiveCustomer } from 'src/components/hooks/auth'
import { ACCOUNT_TAB, DEFAULT_PAGE_SIZE, QUERY_KEY } from "src/utils/constanst.utils"
import { getPageFromQuery } from 'src/utils/funtion.utils'
import AccountNavigation from '../AccountNavigation/AccountNavigation'
import s from './AccountPage.module.scss'
import AccountInfomation from "./components/AccountInfomation/AccountInfomation"
import EditInfoModal from './components/EditInfoModal/EditInfoModal'
import FavouriteProducts from "./components/FavouriteProducts/FavouriteProducts"
import OrderInfomation from './components/OrderInformation/OrderInformation'



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


const DEFAULT_FAVORITE_ARGS = {
    options:{
        skip:0, take:DEFAULT_PAGE_SIZE
    }
}

const AccountPage = ({ defaultActiveContent="orders" } : AccountPageProps) => {
    const router = useRouter()

    const {userInfo} = useActiveCustomer();
    
    const {addingItem,arrangingPayment,cancelled} = useGetUserOrder();


    const [activeTab, setActiveTab] = useState(defaultActiveContent==="info" ? 0 : defaultActiveContent==="orders" ? 1 : 2)
    const [modalVisible, setModalVisible] = useState(false);
    const [optionQueryFavorite, setoptionQueryFavorite] = useState<QueryFavorite>(DEFAULT_FAVORITE_ARGS)
   
    const { itemWishlist,totalItems }= useGetFavoriteProduct(optionQueryFavorite);


    // skip
    useEffect(() => {
        const query = { ...DEFAULT_FAVORITE_ARGS } as QueryFavorite;
        const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string);
        query.options.skip = page * DEFAULT_PAGE_SIZE;
        setoptionQueryFavorite(query);
    },[router.query])

       
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
                        <FavouriteProducts products={itemWishlist} totalItems={totalItems} />
                    </TabPane>
                </AccountNavigation>
            </section>
            <EditInfoModal accountInfo={userInfo} closeModal={closeModal} visible={modalVisible} />
        </>
    )
}

export default AccountPage

