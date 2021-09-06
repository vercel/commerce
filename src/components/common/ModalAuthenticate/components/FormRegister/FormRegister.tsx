import React, { useEffect, useRef } from 'react'
import { ButtonCommon, Inputcommon } from 'src/components/common'
import s from '../FormAuthen.module.scss'
import styles from './FormRegister.module.scss'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import classNames from 'classnames'
import { CustomInputCommon } from 'src/utils/type.utils'

interface Props {
    isHide: boolean,
    onSwitch: () => void
}

const FormRegister = ({ onSwitch, isHide }: Props) => {
    const emailRef = useRef<CustomInputCommon>(null)

    useEffect(() => {
        if (!isHide) {
            emailRef.current?.focus()
        }
    }, [isHide])

    return (
        <section className={classNames({
            [s.formAuthen]: true,
            [styles.formRegister]: true,
        })}>
            <div className={s.inner}>
                <div className={s.body}>
                    <Inputcommon placeholder='Email Address' type='email' ref={emailRef}/>
                    <InputPassword placeholder='Password'/>
                    <div className={styles.passwordNote}>
                        Must contain 8 characters with at least 1 uppercase and 1 lowercase letter and either 1 number or 1 special character.
                    </div>
                </div>
                <div className={styles.bottom}>
                    <ButtonCommon size='large'>Create Account</ButtonCommon>
                </div>
                <SocialAuthen />
                <div className={s.others}>
                    <span>Already an account?</span>
                    <button onClick={onSwitch}>Sign In</button>
                </div>
            </div>
        </section>
    )
}

export default FormRegister