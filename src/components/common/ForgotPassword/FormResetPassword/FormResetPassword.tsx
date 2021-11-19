import { Form, Formik } from 'formik';
import React, { useRef } from 'react';
import { ButtonCommon, InputPasswordFiledInForm } from 'src/components/common';
import { useMessage } from 'src/components/contexts';
import useRequestPasswordReset from 'src/components/hooks/auth/useRequestPasswordReset';
import { LANGUAGE } from 'src/utils/language.utils';
import { CustomInputCommon } from 'src/utils/type.utils';
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import { default as s, default as styles } from './FormResetPassword.module.scss';
import { useResetPassword } from 'src/components/hooks/auth';
import { useModalAuthen } from 'src/components/contexts/ModalAuthen/ModalAuthenContext';

interface Props {
   
}
const DisplayingErrorMessagesSchema = Yup.object().shape({
    password: Yup.string()
    .matches(
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      'Must contain 8 characters with at least 1 uppercase and 1 lowercase letter and either 1 number or 1 special character.'
    )
    .max(30, 'Password is too long')
    .required('Required'),
    confirmPassword: Yup.string()
    .label('Password Confirm')
    .required()
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
})

const FormResetPassword = ({  }: Props) => {
    const router = useRouter();

    const {resetPassword} = useResetPassword();

    const { showMessageSuccess, showMessageError } = useMessage();

    const { openModalAuthen } = useModalAuthen();

    const onReset = (values: {password: string }) => {
        const { token } = router.query;
        resetPassword({token:token,password: values.password},onResetPasswordCallBack);
    }

    const onResetPasswordCallBack = (isSuccess: boolean, message?: string) => {
      if (isSuccess) {
        openModalAuthen();
        showMessageSuccess("Reset password successfully. Please to login.", 6000)
      } else {
        showMessageError(message || LANGUAGE.MESSAGE.ERROR)
      }
    }
  
    return (
        <section className={s.formAuthen}>
        <div className={s.inner}>
          <div className={s.body}>
            <div className={s.title}>Reset Password</div>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={onReset}
            >
              {({ errors, touched, isValid, submitForm }) => (
                <Form className="u-form">
                    <div>
                        <InputPasswordFiledInForm
                            name="password"
                            placeholder="Password"
                            error={
                            touched.password && errors.password
                                ? errors.password.toString()
                                : ''
                            }
                        />
                    </div>
                    <div className={s.confirmPassword}>
                        <InputPasswordFiledInForm
                            name="confirmPassword"
                            placeholder="Password confirm"
                            error={
                            touched.confirmPassword && errors.confirmPassword
                                ? errors.confirmPassword.toString()
                                : ''
                            }
                            onEnter={isValid ? submitForm : undefined}
                        />
                    </div>
                   
                  <div className={styles.passwordNote}>
                    Must contain 8 characters with at least 1 uppercase and 1
                    lowercase letter and either 1 number or 1 special character.
                  </div>
                  <div className={styles.bottom}>
                    <ButtonCommon HTMLType='submit'  size="large">
                      Change Password
                    </ButtonCommon>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    )
}


export default FormResetPassword;