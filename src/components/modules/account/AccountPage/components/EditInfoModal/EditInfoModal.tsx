import React, { useState } from "react"
import s from './EditInfoModal.module.scss'

import { ModalCommon, SelectCommon, ButtonCommon } from '../../../../../common'
import { Address } from "@framework/schema";
import {
    InputFiledInForm,
  } from 'src/components/common'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { useEditCustomerAddress, useEditUserInfo } from "src/components/hooks";
import { LANGUAGE } from 'src/utils/language.utils'
import { useMessage } from 'src/components/contexts'
interface EditInfoModalProps {
    accountInfo: { 
        firstName?: string
        lastName?: string
        email?: string
        phoneNumber?:string|null
        address?: Address
    };
    visible: boolean;
    closeModal: () => void;
}

const EditInfoModal = ({ accountInfo, visible = false, closeModal }: EditInfoModalProps) => {
    const [stateValue,setStateValue] = useState('');
    const { loading, editUserInfo } = useEditUserInfo();
    const {editCustomerAddress} = useEditCustomerAddress();
    const { showMessageSuccess, showMessageError } = useMessage()


    const states = [
        {name: "District 1", value: "D1"},
        {name: "District 2", value: "D2"},
        {name: "District 3", value: "D3"}
    ]

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        postalCode: Yup.string(),
        phoneNumber: Yup.string(),
    })

    function onEditUserInfo (
        values: { 
        firstName: string|undefined;
        lastName: string|undefined,
        address:string|undefined,
        city?:string|null,
        postalCode?:string|null,
        phoneNumber?:string|null
        })  {
        
        editUserInfo(
        {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber:values.phoneNumber ?? '',
        },onChangUserInfoCallBack);

        editCustomerAddress(
        {
            address: values.address ,
            city:values.city,
            postalCode:values.postalCode,
            state:stateValue
        },
        onChangUserInfoCallBack);
    }
    
    function onChangUserInfoCallBack(isSuccess: boolean, message?: string){
        if (isSuccess) {
            closeModal();
            showMessageSuccess("Change Your Information Successfully.", 15000)
        } else {
            showMessageError(LANGUAGE.MESSAGE.ERROR)
        }
    }
    function state(state:string){
        setStateValue(state);
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
                    phoneNumber:accountInfo.phoneNumber
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
                    

                    <div className="flex">
                        <div className={s.inputState}>
                            <SelectCommon initValue={accountInfo.address?.province} selected={accountInfo.address?.province} type="custom" onChange={state} placeholder="State" option={states} size="large"/>
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