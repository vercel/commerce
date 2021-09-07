import React, { useState } from "react"
import s from './AccountInfomation.module.scss'

import Image from "next/image"
import avatar from '../../assets/avatar.png';

interface AccountInfomationProps {
    account: {name: string, email: string, address: string, postalCode: string, phoneNumber: string};
    active: boolean;
    clickShowEditForm: ()=>void;
}

const AccountInfomation = ({ account, active=false, clickShowEditForm } : AccountInfomationProps) => {
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
                        {account.address + `, ${account.postalCode}`}  
                    </div>

                    <div className={s.accountPhoneNumber}>
                        {account.phoneNumber}  
                    </div>

                    <div onClick={clickShowEditForm} className={s.editInfoBtn}>Edit</div>
                </div>
            }

            
        </section>
    )
}

export default AccountInfomation