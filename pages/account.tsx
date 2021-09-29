import React from 'react'
import { Layout } from 'src/components/common'
import useActiveCustomer from 'src/components/hooks/useActiveCustomer'
import { AccountPage, AccountSignIn } from 'src/components/modules/account'

const Account = () => {
  const { customer } = useActiveCustomer()
  if (customer) {
    return <AccountPage />
  }
  return <AccountSignIn />
}

Account.Layout = Layout

export default Account
