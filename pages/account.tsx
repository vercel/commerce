import React from 'react';
import { Layout } from 'src/components/common';
import { AccountPage, AccountSignIn } from 'src/components/modules/account';

const Account = () => {
    return (
        // <AccountPage/>
        <>
            <AccountSignIn/>
        </>
    );
};

Account.Layout = Layout

export default Account;