import React,{memo, useState} from "react"
import { ButtonCommon, StaticImage } from "src/components/common";
import s from './AccountSignIn.module.scss';
import {LANGUAGE} from 'src/utils/language.utils';
import AccountSignInImg from '../../../../../public/assets/images/accountsignin.png'
import { useRouter } from 'next/router';
import ModalAuthenticate from "src/components/common/ModalAuthenticate/ModalAuthenticate";
import { useModalCommon } from "src/components/hooks";

interface AccountSignIn {

}

const AccountSignIn = memo(({ } : AccountSignIn) => {
    const router = useRouter();
    const { visible: visibleModalAuthen, closeModal: closeModalAuthen, openModal: openModalAuthen } = useModalCommon({ initialValue: false })
    const [isModeAuthenSignup, setIsModeAuthenSignup] = useState<boolean>(false)

    const openModalSignup = () => {
        setIsModeAuthenSignup(true)
        openModalAuthen()
    }

    return (
       <>
            <div className={s.accountSignInWrapper}>
                <div>
                    <div className={s.imgError}>
                        <StaticImage src={AccountSignInImg} />
                    </div>
                    <div className={s.text}>
                        Sign in to get more interesting <br/> features
                    </div>
                    <div className={s.btn}>
                        <ButtonCommon size="default" type = 'primary' onClick={openModalAuthen}>{LANGUAGE.BUTTON_LABEL.SIGNIN}</ButtonCommon>
                    </div>
                    <div className={s.dontHaveAccount}>
                        <div>Don't have an account? &nbsp;</div> <span><button onClick={openModalSignup}>Create Account</button></span>
                    </div>
                </div>
            </div>
            <ModalAuthenticate visible={visibleModalAuthen} closeModal={closeModalAuthen} mode={isModeAuthenSignup ? 'register' : ''} />
       </>
    )
});

export default AccountSignIn