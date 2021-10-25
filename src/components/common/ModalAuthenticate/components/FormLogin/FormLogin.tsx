import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { ButtonCommon, InputFiledInForm, InputPasswordFiledInForm } from 'src/components/common'
import { useMessage } from 'src/components/contexts'
import useLogin from 'src/components/hooks/auth/useLogin'
import { ROUTE } from 'src/utils/constanst.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import { CustomInputCommon } from 'src/utils/type.utils'
import * as Yup from 'yup'
import s from '../FormAuthen.module.scss'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import styles from './FormLogin.module.scss'

interface Props {
  isHide: boolean
  onSwitch: () => void
  initialEmail?: string

}

const displayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email(LANGUAGE.MESSAGE.INVALID_EMAIL).required(LANGUAGE.MESSAGE.REQUIRED),
  password: Yup.string()
    .max(30, 'Password is too long')
    .required(LANGUAGE.MESSAGE.REQUIRED),
})

const FormLogin = ({ onSwitch, isHide, initialEmail = ''}: Props) => {
  const emailRef = useRef<CustomInputCommon>(null)
  const { loading, login } = useLogin()
  const { showMessageSuccess, showMessageError } = useMessage()

  useEffect(() => {
    if (!isHide) {
      emailRef.current?.focus()
    }
  }, [isHide])

  const onLogin = (values: { email: string; password: string }) => {
    login({ username: values.email, password: values.password }, onLoginCallBack)
  }

  const onLoginCallBack = (isSuccess: boolean, message?: string) => {
    if (isSuccess) {
      showMessageSuccess("Login successfully!", 4000)
    } else {
      showMessageError(message || LANGUAGE.MESSAGE.ERROR)
    }
  }

  return (
    <section className={s.formAuthen}>
      <div className={s.inner}>
        <div className={s.body}>
          <Formik
            initialValues={{
              password: '',
              email: initialEmail,
            }}
            validationSchema={displayingErrorMessagesSchema}
            onSubmit={onLogin}
            
          >
            {({ errors, touched, isValid, submitForm }) => (
              <Form className="u-form">
                <div className="body">
                  <InputFiledInForm
                    name="email"
                    placeholder="Email Address"
                    ref={emailRef}
                    error={
                      touched.email && errors.email
                        ? errors.email.toString()
                        : ''
                    }
                    isShowIconSuccess={touched.email && !errors.email}
                  />
                  <InputPasswordFiledInForm
                    name="password"
                    placeholder="Password"
                    error={
                      touched.password && errors.password
                        ? errors.password.toString()
                        : ''
                    }
                    onEnter={isValid ? submitForm : undefined}
                  />
                </div>
                <div className={styles.bottom}>
                  <Link href={ROUTE.FORGOT_PASSWORD}>
                    <a href="" className={styles.forgotPassword}>
                      Forgot Password?
                    </a>
                  </Link>
                  <ButtonCommon HTMLType='submit' loading={loading} size="large">
                    Sign in
                  </ButtonCommon>
                </div>
              </Form>
            )}
          </Formik>
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
