import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { ButtonCommon, Inputcommon } from 'src/components/common'
import InputPassword from 'src/components/common/InputPassword/InputPassword'
import { ROUTE } from 'src/utils/constanst.utils'
import { CustomInputCommon } from 'src/utils/type.utils'
import s from '../FormAuthen.module.scss'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import styles from './FormLogin.module.scss'

interface Props {
    isHide: boolean,
    onSwitch: () => void
}

const FormLogin = ({ onSwitch, isHide }: Props) => {
    const emailRef = useRef<CustomInputCommon>(null)

    useEffect(() => {
        if (!isHide) {
            emailRef.current?.focus()
        }
    }, [isHide])

    return (
        <section className={s.formAuthen}>
            <div className={s.inner}>
                <div className={s.body}>
                    <Inputcommon placeholder='Email Address' type='email' ref={emailRef}
                        isShowIconSuccess={true} isIconSuffix={true} />
                    <InputPassword placeholder='Password'/>
                </div>
                <div className={styles.bottom}>
                    <Link href={ROUTE.FORGOT_PASSWORD}>
                        <a href="" className={styles.forgotPassword}>
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