import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { ButtonCommon, InputFiledInForm } from 'src/components/common';
import { useModalCommon } from 'src/components/hooks';
import useRequestPasswordReset from 'src/components/hooks/auth/useRequestPasswordReset';
import { CustomInputCommon } from 'src/utils/type.utils';
import * as Yup from 'yup';
import ModalAuthenticate from '../../ModalAuthenticate/ModalAuthenticate';
import { default as s, default as styles } from './FormForgot.module.scss';
import { useMessage } from 'src/components/contexts'
import { LANGUAGE } from 'src/utils/language.utils'

interface Props {
   
}
const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Your email was wrong').required('Required')
})

const FormForgot = ({  }: Props) => {
    const { visible: visibleModalAuthen,closeModal: closeModalAuthen, openModal: openModalAuthen } = useModalCommon({ initialValue: false });
  

    const {requestPassword} = useRequestPasswordReset();
    const { showMessageSuccess, showMessageError } = useMessage();

    const emailRef = useRef<CustomInputCommon>(null);
    

    const onForgot = (values: { email: string }) => {
      requestPassword({email: values.email},onForgotPasswordCallBack);
    }

    const onForgotPasswordCallBack = (isSuccess: boolean, message?: string) => {
      if (isSuccess) {
        showMessageSuccess("Request forgot password successfully. Please verify your email to login.")
      } else {
        showMessageError(message || LANGUAGE.MESSAGE.ERROR)
      }
    }
  
    return (
        <section className={s.formAuthen}>
        <div className={s.inner}>
          <div className={s.body}>
            <div className={s.title}>Forgot Password</div>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={onForgot}
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
                      onEnter={isValid ? submitForm : undefined}
                    />
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.remembered} onClick={openModalAuthen}>
                      I Remembered My Password?
                    </div>
                    <ButtonCommon HTMLType='submit'  size="large">
                      Reset Password
                    </ButtonCommon>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <ModalAuthenticate visible={visibleModalAuthen} closeModal={closeModalAuthen}  />
        </div>
      </section>
    )


}


export default FormForgot;