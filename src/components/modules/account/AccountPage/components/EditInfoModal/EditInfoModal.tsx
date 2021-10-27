import React, { useState } from "react"
import s from './EditInfoModal.module.scss'

import { ModalCommon, SelectFieldInForm,SelectCommon, ButtonCommon } from '../../../../../common'
import { Address } from "@framework/schema";
import {
    InputFiledInForm,
  } from 'src/components/common'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { useEditCustomerAddress, useEditUserInfo } from "src/components/hooks/account";
import { LANGUAGE } from 'src/utils/language.utils'
import { useMessage } from 'src/components/contexts'
import {  useAvailableCountries } from 'src/components/hooks'
import useCreateCustomerAddress from "src/components/hooks/account/useCreateCustomerAddress";
interface EditInfoModalProps {
    accountInfo: { 
        firstName?: string
        lastName?: string
        email?: string
        phoneNumber?:string|null
        address?: Address,
    };
    visible: boolean;
    closeModal: () => void;
}
const DEFAULT_COUNTRY_CODE = 'MY'
const DEFAULT_PROVINCE = 'Sabah'

const EditInfoModal = ({ accountInfo, visible = false, closeModal }: EditInfoModalProps) => {

    const { loading, editUserInfo } = useEditUserInfo();
    const {editCustomerAddress} = useEditCustomerAddress();
    const {createCustomerAddress} = useCreateCustomerAddress();
    const { showMessageSuccess, showMessageError } = useMessage()


    const { countries } = useAvailableCountries()

    const states = [
        {name: "District 1", value: "D1"},
        {name: "District 2", value: "D2"},
        {name: "District 3", value: "D3"}
    ]

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string(),
        postalCode: Yup.string(),
        phoneNumber: Yup.number().notRequired().nullable(),
        states:Yup.string(),
        countryCode:Yup.string().required('Required')
    })
    
    function onEditUserInfo (
        values: { 
        firstName: string|undefined;
        lastName: string|undefined,
        address:string|undefined,
        city?:string|null,
        postalCode?:string|null,
        phoneNumber?:string|null,
        states?:string,
        countryCode?:string|null
        })  {
    
        editUserInfo(
        {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber:values.phoneNumber ?? '',
        },onChangUserInfoCallBack);
 
        if(accountInfo.address == undefined){
            createCustomerAddress(
                {
                    address: values.address ,
                    city:values.city,
                    postalCode:values.postalCode,
                    state:values.states,
                    countryCode:values.countryCode
                },onChangUserInfoCallBack
            );
        }else{
            editCustomerAddress(
                {
                    id:accountInfo.address.id,
                    address:values.address ,
                    city:values.city,
                    postalCode:values.postalCode,
                    state:values.states,
                    countryCode:values.countryCode
                },
                onChangUserInfoCallBack);
        }
       
    }
    
    function onChangUserInfoCallBack(isSuccess: boolean, message?: string){
        if (isSuccess) {
            closeModal();
            showMessageSuccess("Change Your Information Successfully.", 15000)
        } else {
            showMessageError(LANGUAGE.MESSAGE.ERROR)
        }
    }
   
    return (
        <ModalCommon onClose={closeModal} visible={visible} title="Edit Infomation">
            <section className={s.editInfoModal}>
            <Formik
                initialValues={
                {
                    firstName:accountInfo.firstName,
                    lastName: accountInfo.lastName,
                    address:accountInfo.address?.streetLine1,
                    city: accountInfo.address?.city,
                    postalCode: accountInfo.address?.postalCode,
                    phoneNumber:accountInfo.phoneNumber,
                    states:accountInfo.address?.province ?? DEFAULT_PROVINCE,
                    countryCode: accountInfo.address?.country.code ?? DEFAULT_COUNTRY_CODE
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={onEditUserInfo}
            >
                {({ errors, touched, isValid, submitForm }) => (
                <Form className="u-form">
                    <div className={s.inputName}>
                        <div className={s.input}>
                            <InputFiledInForm
                            name="firstName"
                            placeholder="First Name"
                            error={
                            touched.firstName && errors.firstName
                                ? errors.firstName.toString()
                                : ''
                            }
                            isShowIconSuccess={touched.firstName && !errors.firstName}
                            />
                        </div>
                        <div className={s.input}>
                            <InputFiledInForm
                            name="lastName"
                            placeholder="Last Name"
                            error={
                            touched.lastName && errors.lastName
                                ? errors.lastName.toString()
                                : ''
                            }
                            isShowIconSuccess={touched.lastName && !errors.lastName}
                            />
                        </div>  
                    </div>

                    <div className={s.input}>
                        <InputFiledInForm
                        name="address"
                        placeholder="Address"
                        error={
                        touched.address && errors.address
                            ? errors.address.toString()
                            : ''
                        }
                        isShowIconSuccess={touched.address && !errors.address}
                        />
                    </div>
                    <div className="flex">

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

                        <div className={s.inputPostalCode}>
                            <InputFiledInForm
                            name="postalCode"
                            placeholder="Postal code"
                            error={
                            touched.postalCode && errors.postalCode
                                ? errors.postalCode.toString()
                                : ''
                            }
                            isShowIconSuccess={touched.postalCode && !errors.postalCode}
                            />
                        </div>

                    </div>

                    <div className="flex boxSelect">
                        <div className={s.inputState}>
                        
                            <SelectFieldInForm
                                options={states || []}
                                name="states"
                                placeholder="states"
                                keyValueOption="value"
                                error={
                                    touched.states && errors.states
                                        ? errors.states.toString()
                                        : ''
                                    }
                            />
                        </div>

                        <div className={s.inputCountry}>
                        
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
                            onEnter={submitForm}
                           />
                    </div>

                    <div className={s.buttons}>
                        <ButtonCommon  onClick={closeModal} type="light" size="large" >Cancel</ButtonCommon>
                        <ButtonCommon HTMLType="submit" loading={loading} size="large" >Save</ButtonCommon>
                    </div>
                </Form>
                )}
            </Formik>
            </section>
        </ModalCommon>
    )
}

export default EditInfoModal