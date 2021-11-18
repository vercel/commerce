import { UserVerifyEmailResult } from '@framework/schema'
import classNames from 'classnames'
import { Form, Formik, FormikProps } from 'formik'
import React, { useEffect, useRef } from 'react'
import {
  ButtonCommon,
  InputFiledInForm,
  InputPasswordFiledInForm
} from 'src/components/common'
import { useMessage } from 'src/components/contexts'
import { LANGUAGE } from 'src/utils/language.utils'
import { CustomInputCommon } from 'src/utils/type.utils'
import * as Yup from 'yup'
import { useCheckIsUserVerifyEmail, useSignup } from '../../../../hooks/auth'
import s from '../FormAuthen.module.scss'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import styles from './FormRegister.module.scss'

interface Props {
  isHide: boolean
  onSwitch: () => void
}

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string().email(LANGUAGE.MESSAGE.INVALID_EMAIL).required('Required'),
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
  const formRef = useRef<FormikProps<{ password: string; email: string; }>>(null);
  const { loading, signup } = useSignup()
  const { showMessageSuccess, showMessageError, showMessageWarning } = useMessage()
  const { checkIsUserVerifyEmail } = useCheckIsUserVerifyEmail()

  useEffect(() => {
    if (!isHide) {
      emailRef.current?.focus()
    }
  }, [isHide])

  const onSignup = (values: { email: string; password: string }) => {
    checkIsUserVerifyEmail({ emailAddress: values.email }, onCheckIsUserVerifyEmailCallback)
  }

  const onCheckIsUserVerifyEmailCallback = (isSuccess: boolean, rs: UserVerifyEmailResult | string) => {
    if (isSuccess) {
      if ((rs as UserVerifyEmailResult).isVerified) {
        showMessageWarning("You already have an account with this email address. Please sign in to continue.", 10000)
      } else {
        if (formRef?.current) {
          const values = formRef.current.values
          signup({ email: values.email, password: values.password }, onSignupCallBack)
        } else {
          showMessageError(rs as string)
        }
      }
    } else {
      showMessageError(rs as string)

    }
  }

  const onSignupCallBack = (isSuccess: boolean, message?: string) => {
    if (isSuccess) {
      showMessageSuccess("Create account successfully. Please verify your email to login.", 15000)
    } else {
      showMessageError(message)
    }
  }

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
            innerRef={formRef}
            initialValues={{
              password: '',
              email: '',
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={onSignup}
          >
            {({ errors, touched, dirty, isValid, submitForm }) => (
              <Form className="u-form">
                <div className="body">
                  <InputFiledInForm
                    name="email"
                    placeholder="Email Address"
                    ref={emailRef}
                    error={
                      dirty && errors.email
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
