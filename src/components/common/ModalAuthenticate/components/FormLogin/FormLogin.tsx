import Link from 'next/link'
import React from 'react'
import { Inputcommon, ButtonCommon } from 'src/components/common'
import { ROUTE } from 'src/utils/constanst.utils'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import s from './FormLogin.module.scss'

interface Props {
    onSwitch: () => void
}

const FormLogin = ({ onSwitch }: Props) => {
    return (
        <section className={s.login}>
            <div className={s.inner}>
                <div className={s.body}>
                    <Inputcommon placeholder='Email Address' type='email' />
                    <Inputcommon placeholder='Password' type='password' />
                </div>
                <div className={s.bottom}>
                    <Link href={ROUTE.FORGOT_PASSWORD}>
                        <a href="" className={s.forgotPassword}>
                            Forgot Password?
                        </a>
                    </Link>
                    <ButtonCommon size='large'>Sign in</ButtonCommon>
                </div>
                <SocialAuthen />
                <div className={s.others}>
                    <span>Don't have an account?</span>
                    <button onClick={onSwitch}>Create Account</button>
                </div>
            </div>
        </section>
    )
}

export default FormLogin