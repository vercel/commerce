import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonCommon, Inputcommon, InputPassword } from 'src/components/common'
import { ROUTE } from 'src/utils/constanst.utils'
import { CustomInputCommon } from 'src/utils/type.utils'
import useLogin from 'src/components/hooks/useLogin'
import s from '../FormAuthen.module.scss'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import styles from './FormLogin.module.scss'

interface Props {
  isHide: boolean
  onSwitch: () => void
}

const FormLogin = ({ onSwitch, isHide }: Props) => {
  const emailRef = useRef<CustomInputCommon>(null)
  const { loading, login, error } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    login({ username: email, password })
  }

  useEffect(() => {
    if (!isHide) {
      emailRef.current?.focus()
    }
  }, [isHide])

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

  return (
    <section className={s.formAuthen}>
      <div className={s.inner}>
        <div className={s.body}>
          <Inputcommon
            placeholder="Email Address"
            value={email}
            onChange={(val) => setEmail(val.toString())}
            type="email"
            ref={emailRef}
          />

          {/* <Inputcommon placeholder='Email Address' type='email' ref={emailRef}
                        isShowIconSuccess={true} isIconSuffix={true} /> */}
          <InputPassword
            placeholder="Password"
            value={password}
            onChange={(val) => setPassword(val.toString())}
          />
        </div>
        <div className={styles.bottom}>
          <Link href={ROUTE.FORGOT_PASSWORD}>
            <a href="" className={styles.forgotPassword}>
              Forgot Password?
            </a>
          </Link>
          <ButtonCommon onClick={onLogin} loading={loading} size="large">
            Sign in
          </ButtonCommon>
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
