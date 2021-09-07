import React, { useEffect, useState } from "react"
import s from './AccountPage.module.scss'

import AccountNavigation from '../AccountNavigation/AccountNavigation'
import HeadingCommon from '../../../common/HeadingCommon/HeadingCommon'
import AccountInfomation from "./components/AccountInfomation/AccountInfomation"
import OrderInfomation from './components/OrderInformation/OrderInformation'
import EditInfoModal from './components/EditInfoModal/EditInfoModal'

interface AccountPageProps {

}

const AccountPage = ({} : AccountPageProps) => {
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

    const [accountInfoActive, setAccountInfoActive] = useState(false);
    const [orderInfoActive, setOrderInfoActive] = useState(true);
    const [favoritesActive, setFavoritesActive] = useState(false);

    function accountActive() {
        setAccountInfoActive(true);
        setOrderInfoActive(false);
        setFavoritesActive(false);
    }

    function orderActive() {
        setAccountInfoActive(false);
        setOrderInfoActive(true);
        setFavoritesActive(false);
    }

    function favActive() {
        setAccountInfoActive(false);
        setOrderInfoActive(false);
        setFavoritesActive(true);
    }

    const [modalVisible, setModalVisible] = useState(false);

    function showEditForm() {
        setModalVisible(true);
    }

    function closeModal() {
        setModalVisible(false);
    }

    return (
        <>
            <section className={s.accountPage}>
                <div className={s.pageLeft}>
                    <HeadingCommon>Account</HeadingCommon>
                    <div className={s.accNavi}>
                        <AccountNavigation setAccountActive={accountActive} setOrderActive={orderActive} setFavActive={favActive} />
                    </div>
                </div>
                
                <div className={s.pageRight}>
                    <AccountInfomation active={accountInfoActive} account={account} showEditForm={showEditForm}  />
                    <OrderInfomation active={orderInfoActive} waiting={waiting} delivering={delivering} delivered={delivered} />

                    {/* Thieu cai favorite */}
                    {/* <FavoriteProduct active={favoritesActive} favProducts={favProducts} /> */}
                </div>

                
            </section>
            <EditInfoModal accountInfo={account} closeModal={closeModal} visible={modalVisible} />
        </>
    )
}

export default AccountPage