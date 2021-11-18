import { ShippingAddress } from '@commerce/types/cart'
import { Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { ButtonCommon, InputFiledInForm, SelectFieldInForm } from 'src/components/common'
import { useMessage } from 'src/components/contexts'
import { useAvailableCountries } from 'src/components/hooks'
import { useSetOrderShippingAddress } from 'src/components/hooks/order'
import { PHONE_REGEX, POSTAL_CODE_REGEX } from 'src/utils/constanst.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import { CustomInputCommon } from 'src/utils/type.utils'
import * as Yup from 'yup'
import ChekoutNotePolicy from '../ChekoutNotePolicy/ChekoutNotePolicy'
import s from './ShippingInfoForm.module.scss'

interface ShippingInfoFormProps {
  id: number
  activeStep: number
  onConfirm: (id: number) => void
  initialValues?: ShippingAddress

}


const displayingErrorMessagesSchema = Yup.object().shape({
  streetLine1: Yup.string().required(LANGUAGE.MESSAGE.REQUIRED),
  city: Yup.string().required(LANGUAGE.MESSAGE.REQUIRED),
  province: Yup.string().required(LANGUAGE.MESSAGE.REQUIRED),
  postalCode: Yup.string().matches(POSTAL_CODE_REGEX, 'Postal code is not valid').required(LANGUAGE.MESSAGE.REQUIRED),
  countryCode: Yup.string().required(LANGUAGE.MESSAGE.REQUIRED),
  phoneNumber: Yup.string().matches(PHONE_REGEX, 'Phone number is not valid').required(LANGUAGE.MESSAGE.REQUIRED)

})

const DEFAULT_COUNTRY_CODE = 'MY'
const DEFAULT_PROVINCE = 'Sabah'

const INITIAL_VALUES = {
  streetLine1: '',
  city: '',
  province: DEFAULT_PROVINCE,
  postalCode: '',
  countryCode: DEFAULT_COUNTRY_CODE,
  phoneNumber: '',
}

// TODO: update data
const provinceOptions = [
  {
    name: 'Hồ Chí Minh',
    value: 'Hồ Chí Minh',
  },
  {
    name: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    name: 'Sabah',
    value: 'Sabah',
  },
]

const ShippingInfoForm = ({ onConfirm, id, activeStep, initialValues = INITIAL_VALUES }: ShippingInfoFormProps) => {
  const addressRef = useRef<CustomInputCommon>(null)
  const { setOrderShippingAddress, loading } = useSetOrderShippingAddress()
  const { showMessageError } = useMessage()
  const { countries } = useAvailableCountries()

  useEffect(() => {
    setTimeout(() => {
      addressRef.current?.focus()
    }, 500);
  }, [activeStep])

  const handleSubmit = (values: any) => {
    setOrderShippingAddress(values, onSubmitCalBack)
  }

  const onSubmitCalBack = (isSuccess: boolean, msg?: string) => {
    if (isSuccess) {
      onConfirm(id)
    } else {
      showMessageError(msg)
    }
  }


  return (
    <div className={s.warpper}>
      <div className={s.body}>
        <Formik
          initialValues={{ ...initialValues, province: initialValues.province || DEFAULT_PROVINCE }}
          validationSchema={displayingErrorMessagesSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, submitForm }) => (
            <Form className="u-form">
              <div className="body">
                <div className={s.input}>
                  <InputFiledInForm
                    name="streetLine1"
                    placeholder="Address"
                    ref={addressRef}
                    error={
                      touched.streetLine1 && errors.streetLine1
                        ? errors.streetLine1.toString()
                        : ''
                    }
                    isShowIconSuccess={touched.streetLine1 && !errors.streetLine1}
                  />
                </div>
                <div className="line">
                  <div className={s.input}>
                    <InputFiledInForm
                      name="city"
                      placeholder="City"
                      error={
                        touched.city && errors.city
                          ? errors.city.toString()
                          : ''
                      }
                      isShowIconSuccess={touched.city && !errors.city}
                    />
                  </div>

                  <div className={s.input}>
                    <SelectFieldInForm
                      options={provinceOptions}
                      name="province"
                      placeholder="Province"
                      error={
                        touched.province && errors.province
                          ? errors.province.toString()
                          : ''
                      }
                    />
                  </div>
                </div>

                <div className="line">
                  <div className={s.input}>
                    <InputFiledInForm
                      name="postalCode"
                      placeholder="Postal Code"
                      error={
                        touched.postalCode && errors.postalCode
                          ? errors.postalCode.toString()
                          : ''
                      }
                      isShowIconSuccess={touched.postalCode && !errors.postalCode}
                    />
                  </div>
                  <div className={s.input}>
                    <SelectFieldInForm
                      options={countries || []}
                      keyNameOption={['name']}
                      keyValueOption="code"
                      name="countryCode"
                      placeholder="Country"
                      error={
                        touched.countryCode && errors.countryCode
                          ? errors.countryCode.toString()
                          : ''
                      }
                    />
                  </div>
                </div>

                <div className={s.inputPhoneNumber}>
                  <InputFiledInForm
                    name="phoneNumber"
                    placeholder="Phone number"
                    error={
                      touched.phoneNumber && errors.phoneNumber
                        ? errors.phoneNumber.toString()
                        : ''
                    }
                    isShowIconSuccess={touched.phoneNumber && !errors.phoneNumber}
                    onEnter={isValid ? submitForm : undefined}
                  />
                </div>
                <div className={s.bottom}>
                  <ChekoutNotePolicy />
                  <ButtonCommon HTMLType='submit' loading={loading} size="large">
                    Continue to Shipping method
                  </ButtonCommon>
                </div>
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}

export default ShippingInfoForm
