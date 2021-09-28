import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonCommon, Inputcommon, InputPassword } from 'src/components/common'
import { CustomInputCommon } from 'src/utils/type.utils'
import { useSignup } from '../../../../hooks'
import s from '../FormAuthen.module.scss'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import styles from './FormRegister.module.scss'

interface Props {
    isHide: boolean,
    onSwitch: () => void
}

const FormRegister = ({ onSwitch, isHide }: Props) => {
    const emailRef = useRef<CustomInputCommon>(null)
    const { loading, signup, error } = useSignup()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    useEffect(() => {
        if (!isHide) {
            emailRef.current?.focus()
        }
    }, [isHide])

    const onSignup = () => {
        // TODO: validate fields
        signup({ email, password })
        // TODO:
        alert("User created. Please verify your email")
    }


    useEffect(() => {
        if (error) {
            alert(error.message)
        }
    }, [error])

    return (
        <section className={classNames({
            [s.formAuthen]: true,
            [styles.formRegister]: true,
        })}>
            <div className={s.inner}>
                <div className={s.body}>
                    <Inputcommon
                        placeholder='Email Address'
                        type='email'
                        ref={emailRef}
                        value={email}
                        onChange={(val) => setEmail(val.toString())}
                    />
                    <InputPassword
                        placeholder='Password'
                        value={password}
                        onChange={(val) => setPassword(val.toString())}
                    />

                    <div className={styles.passwordNote}>
                        Must contain 8 characters with at least 1 uppercase and 1 lowercase letter and either 1 number or 1 special character.
                    </div>
                </div>
                <div className={styles.bottom}>
                    <ButtonCommon size='large'
                        loading={loading}
                        onClick={onSignup}>
                        Create Account
                    </ButtonCommon>
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