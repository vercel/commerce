import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import { ButtonCommon, InputFiledInForm } from 'src/components/common'
import { useMessage } from 'src/components/contexts'
import { useSetCustomerForOrder } from 'src/components/hooks/order'
import { LANGUAGE } from 'src/utils/language.utils'
import { CustomInputCommon } from 'src/utils/type.utils'
import * as Yup from 'yup'
import ChekoutNotePolicy from '../ChekoutNotePolicy/ChekoutNotePolicy'
import s from './CustomerInfoForm.module.scss'
interface Props {
  isHide: boolean
  onSwitch: () => void
}

const displayingErrorMessagesSchema = Yup.object().shape({
  firstName: Yup.string().required(LANGUAGE.MESSAGE.REQUIRED),
  lastName: Yup.string().required(LANGUAGE.MESSAGE.REQUIRED),
  emailAddress: Yup.string().email(LANGUAGE.MESSAGE.INVALID_EMAIL).required(LANGUAGE.MESSAGE.REQUIRED),
})

const CustomerInfoForm = ({ onSwitch, isHide }: Props) => {
  const firstNameRef = useRef<CustomInputCommon>(null)
  const emailRef = useRef<CustomInputCommon>(null)
  const { setCustomerForOrder, loading } = useSetCustomerForOrder()
  const { showMessageError } = useMessage()

  const handleSubmit = (values: { firstName: string, lastName: string, emailAddress: string }) => {
    console.log('on submit: ', values)
    const { firstName, lastName, emailAddress } = values
    setCustomerForOrder({ firstName, lastName, emailAddress }, onSubmitCalBack)
    // onConfirm &&
    //   onConfirm(id, {
    //     name: nameRef?.current?.getValue().toString(),
    //     email: emailRef.current?.getValue().toString(),
    //   })
  }
  const onSubmitCalBack = (isSuccess: boolean, msg?: string) => {
    // TODO:
    console.log("result: ", isSuccess, msg)
    if (isSuccess) {

    } else {
      console.log("error here")
      showMessageError(msg)
    }

  }

  return (
    <section className={s.warpper}>
      <div className={s.body}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            emailAddress: '',
          }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={handleSubmit}

        >
          {({ errors, touched, isValid, submitForm }) => (
            <Form className="u-form">
              <div className="body">
                <div className="line">
                  <InputFiledInForm
                    name="firstName"
                    placeholder="First name"
                    ref={firstNameRef}
                    error={
                      touched.firstName && errors.firstName
                        ? errors.firstName.toString()
                        : ''
                    }
                    isShowIconSuccess={touched.firstName && !errors.firstName}
                  />

                  <InputFiledInForm
                    name="lastName"
                    placeholder="Last name"
                    error={
                      touched.lastName && errors.lastName
                        ? errors.lastName.toString()
                        : ''
                    }
                    isShowIconSuccess={touched.lastName && !errors.lastName}
                  />
                </div>
                <InputFiledInForm
                  name="emailAddress"
                  placeholder="Email Address"
                  ref={emailRef}
                  error={
                    touched.emailAddress && errors.emailAddress
                      ? errors.emailAddress.toString()
                      : ''
                  }
                  isShowIconSuccess={touched.emailAddress && !errors.emailAddress}
                  onEnter={isValid ? submitForm : undefined}

                />
              </div>
              <div className={s.bottom}>
                <ChekoutNotePolicy />
                <ButtonCommon HTMLType='submit' loading={loading} size="large">
                  Continue to Shipping
                </ButtonCommon>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default CustomerInfoForm
