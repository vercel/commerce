import React, { useState } from "react"
import s from './AccountInfomation.module.scss'

import Image from "next/image"
import avatar from '../../assets/avatar.png';

interface AccountInfomationProps {
    account: {name: string, email: string, address: string, state: string, city: string, postalCode: string, phoneNumber: string};
    active: boolean;
    showEditForm: () => void;
}

const AccountInfomation = ({ account, active=false, showEditForm } : AccountInfomationProps) => {

    // need to handle call back when edit account information 

    return (
        <section className={s.accountInfomation}>
            {
                active && <div>
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

                    <div onClick={showEditForm} className={s.editInfoBtn}>Edit</div>
                </div>
            }

            
        </section>
    )
}

export default AccountInfomation