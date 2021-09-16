import React from "react"
import s from './AccountInfomation.module.scss'

import Image from "next/image"
import avatar from '../../assets/avatar.png';

import { ButtonCommon } from 'src/components/common'

interface AccountProps {
    name: string, email: string, address: string, state: string, city: string, postalCode: string, phoneNumber: string
}

interface AccountInfomationProps {
    account: AccountProps;
    onClick: () => void;
}

const AccountInfomation = ({ account, onClick } : AccountInfomationProps) => {

    // need to handle call back when edit account information 

    const showEditForm = () => onClick()

    return (
        <section className={s.accountInfomation}>
            <div className={s.avatar}>
                <Image src={avatar} alt="avatar" />
            </div>

            <div className={s.accountName}>
                {account.name}  
            </div>
            <div className={s.accountEmail}>
                {account.email}  
            </div>

            <div className={s.horizontalSeparator}></div>

            <div className={s.shippingInfo}>Shipping Infomation</div>

            <div className={s.accountAddress}>
                {account.address + `, ${account.state}, ${account.city}, ${account.postalCode}`}  
            </div>

            <div className={s.accountPhoneNumber}>
                {account.phoneNumber}  
            </div>

            <div className={s.editInfoBtn}>
                <ButtonCommon onClick={showEditForm} type="light" size="small">Edit</ButtonCommon>
            </div>
        </section>
    )
}

export default AccountInfomation