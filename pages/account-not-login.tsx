import React from 'react';
import { Layout } from 'src/components/common';
import { AccountSignIn } from 'src/components/modules/account';

const AccountNotLogin = () => {
    return (
        <>
            <AccountSignIn/>
        </>
    );
};

AccountNotLogin.Layout = Layout

export default AccountNotLogin;