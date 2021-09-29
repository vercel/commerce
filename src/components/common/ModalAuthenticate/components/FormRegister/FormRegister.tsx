import classNames from 'classnames'
import { Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import {
  ButtonCommon,
  InputFiledInForm,
  InputPasswordFiledInForm,
} from 'src/components/common'
import { useMessage } from 'src/components/contexts'
import { LANGUAGE } from 'src/utils/language.utils'
import { CustomInputCommon } from 'src/utils/type.utils'
import * as Yup from 'yup'
import { useSignup } from '../../../../hooks'
import s from '../FormAuthen.module.scss'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import styles from './FormRegister.module.scss'

interface Props {
  isHide: boolean
  onSwitch: () => void
}

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email('Your email was wrong').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      'Must contain 8 characters with at least 1 uppercase and 1 lowercase letter and either 1 number or 1 special character.'
    )
    .max(30, 'Password is too long')
    .required('Required'),
})

const FormRegister = ({ onSwitch, isHide }: Props) => {
  const emailRef = useRef<CustomInputCommon>(null)
  const { loading, signup, error } = useSignup()
  const { showMessageSuccess, showMessageError } = useMessage()

  useEffect(() => {
    if (!isHide) {
      emailRef.current?.focus()
    }
  }, [isHide])

  const onSignup = (values: { email: string; password: string }) => {
    signup({ email: values.email, password: values.password }, onSignupCallBack)
  }

  const onSignupCallBack = (isSuccess: boolean, message?: string) => {
    if (isSuccess) {
      showMessageSuccess("Create account successfully. Please verify your email to login.")
    } else {
      showMessageError(message || LANGUAGE.MESSAGE.ERROR)
    }
  }

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

  return (
    <section
      className={classNames({
        [s.formAuthen]: true,
        [styles.formRegister]: true,
      })}
    >
      <div className={s.inner}>
        <div className={s.body}>
          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={onSignup}
          >
            {({ errors, touched }) => (
              <Form className="u-form">
                <div className="body">
                  <InputFiledInForm
                    name="email"
                    placeholder="Email Address"
                    ref = {emailRef}
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
                  />
                  <div className={styles.passwordNote}>
                    Must contain 8 characters with at least 1 uppercase and 1
                    lowercase letter and either 1 number or 1 special character.
                  </div>
                </div>
                <div className={styles.bottom}>
                  <ButtonCommon
                    HTMLType="submit"
                    size="large"
                    loading={loading}
                  >
                    Create Account
                  </ButtonCommon>
                </div>
              </Form>
            )}
          </Formik>
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
