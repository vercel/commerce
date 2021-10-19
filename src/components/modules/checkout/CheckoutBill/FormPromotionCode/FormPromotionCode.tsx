import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { ButtonCommon, InputFiledInForm, ModalCommon } from 'src/components/common';
import { useMessage } from 'src/components/contexts';
import { useModalCommon } from 'src/components/hooks';
import { useApplyCouponCode } from 'src/components/hooks/order';
import { IconCirclePlus } from 'src/components/icons';
import { LANGUAGE } from 'src/utils/language.utils';
import { CustomInputCommon } from 'src/utils/type.utils';
import * as Yup from 'yup';
import s from './FormPromotionCode.module.scss';

const displayingErrorMessagesSchema = Yup.object().shape({
    couponCode: Yup.string().required(LANGUAGE.MESSAGE.REQUIRED),
})

const FormPromotionCode = () => {
    const { visible, openModal, closeModal } = useModalCommon({ initialValue: false })
    const { showMessageError, showMessageSuccess } = useMessage()
    const { applyCouponCode, loading } = useApplyCouponCode()
    const inputRef = useRef<CustomInputCommon>(null)

    useEffect(() => {
        setTimeout(() => {
            if (visible) {
                inputRef.current?.focus()
            }
        }, 500);
    }, [visible])

    const handleSubmit = (values: { couponCode: string }) => {
        applyCouponCode(values.couponCode, onSubmitCalBack)
    }

    const onSubmitCalBack = (isSuccess: boolean, msg?: string) => {
        // TODO:
        if (isSuccess) {
            showMessageSuccess("Applied coupon code successfully.", 5000)
            closeModal()
        } else {
            showMessageError(msg)
        }
    }

    return (
        <div className={s.promo}>
            Apply Promotion Code
            <button className={s.buttonAdd} onClick={openModal}>
                <IconCirclePlus />
            </button>
            <ModalCommon
                visible={visible}
                onClose={closeModal}
            >
                <div className={s.modalPromotion}>
                    <Formik
                        initialValues={{
                            couponCode: ''
                        }}
                        validationSchema={displayingErrorMessagesSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isValid, submitForm }) => (
                            <Form className="u-form">
                                <div className="body">

                                    <InputFiledInForm
                                        name="couponCode"
                                        placeholder="Coupon code"
                                        error={
                                            touched.couponCode && errors.couponCode
                                                ? errors.couponCode.toString()
                                                : ''
                                        }
                                        isShowIconSuccess={touched.couponCode && !errors.couponCode}
                                        onEnter={isValid ? submitForm : undefined}
                                        ref={inputRef}
                                    />
                                </div>
                                <div className={s.bottom}>
                                    <ButtonCommon disabled={loading} onClick={closeModal} type='light' size='small'>
                                        {LANGUAGE.BUTTON_LABEL.CANCEL}
                                    </ButtonCommon>
                                    <ButtonCommon HTMLType='submit' loading={loading} size='small'>
                                        Apply promotion code
                                    </ButtonCommon>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </ModalCommon>
        </div>
    );
};

export default FormPromotionCode;