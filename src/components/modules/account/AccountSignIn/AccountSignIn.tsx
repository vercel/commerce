import React from "react"
import { ButtonCommon, StaticImage } from "src/components/common";
import s from './AccountSignIn.module.scss';
import {LANGUAGE} from 'src/utils/language.utils';
import AccountSignInImg from '../../../../../public/assets/images/accountsignin.png'
import Link from 'next/link';
import { useRouter } from 'next/router';
interface AccountSignIn {

}

const AccountSignIn = ({ } : AccountSignIn) => {
    const router = useRouter();
    function openLogin(){
        router.push({
            pathname: '/account/query',
            search: '?openLogin=true'
          });
    }
    return (
       <>
            <div className={s.accountSignInWrapper}>
                <div className={s.imgError}>
                    <StaticImage src={AccountSignInImg} />
                </div>
                <div className={s.text}>
                    Sign in to get more interesting <br/> features
                </div>
                <div className={s.btn}>
                    <ButtonCommon size="default" onClick={openLogin}>{LANGUAGE.BUTTON_LABEL.SIGNIN}</ButtonCommon>
                </div>
                <div className={s.dontHaveAccount}>
                    <div>Don't have an account? &nbsp;</div> <span><a><Link href="/"> Create Account</Link></a></span>
                </div>
            </div>
       </>
    )
}

export default AccountSignIn