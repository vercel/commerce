import React from 'react'
import s from './AccountInfomation.module.scss'

import Image from 'next/image'
import avatar from '../../assets/avatar.png'

import { ButtonCommon } from 'src/components/common'
import { useActiveCustomer } from 'src/components/hooks/auth'
import { Address } from '@framework/schema'

export interface AccountProps {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?:string|null
  address?: Address
}

const states = [
  {name: "District 1", value: "D1"},
  {name: "District 2", value: "D2"},
  {name: "District 3", value: "D3"}
]
interface AccountInfomationProps {
  account: AccountProps
  onClick: () => void
}

const AccountInfomation = ({ account, onClick }: AccountInfomationProps) => {
  const { customer } = useActiveCustomer()
  // need to handle call back when edit account information

  const showEditForm = () => onClick()
  const state = states.find((val)=>val.value == account.address?.province);
  return (
    <section className={s.accountInfomation}>
      <div className={s.avatar}>
        <Image src={avatar} alt="avatar" />
      </div>

      <div className={s.accountName}>
        {customer?.firstName} {customer?.lastName}
      </div>
      <div className={s.accountEmail}>{customer?.emailAddress}</div>

      <div className={s.horizontalSeparator}></div>

      <div className={s.shippingInfo}>Shipping Infomation</div>

      <div className={s.accountAddress}>
        { `${account.address?.streetLine1 ? account.address?.streetLine1+ ', ' : ''} 
          ${state?.name ? state?.name + ',' : '' } 
          ${account.address?.city ? account.address?.city + ', ' : '' }
          ${account.address?.postalCode ? account.address?.postalCode + ', ':''}
          ${account.address?.country.name ? account.address?.country.name : ''}
          `}
      </div>

      <div className={s.accountPhoneNumber}>{account.phoneNumber ?? ''}</div>

      <div className={s.editInfoBtn}>
        <ButtonCommon onClick={showEditForm} type="light" size="small">
          Edit
        </ButtonCommon>
      </div>
    </section>
  )
}

export default AccountInfomation
