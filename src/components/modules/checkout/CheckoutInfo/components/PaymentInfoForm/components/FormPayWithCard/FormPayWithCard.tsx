import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { ButtonCommon } from 'src/components/common';
import { useMessage } from 'src/components/contexts';
import { useAddPaymentToOrder, useGenerateBraintreeClientToken } from 'src/components/hooks/order';
import { PaymentMethod, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import ChekoutNotePolicy from '../../../ChekoutNotePolicy/ChekoutNotePolicy';
import s from '../../PaymentInfoForm.module.scss'


const BRAINTREE_SCRIPT_URL = "https://js.braintreegateway.com/web/dropin/1.10.0/js/dropin.js"
interface Props {
    orderId?: string

}

const FormPayWithCard = ({ orderId  = ''}: Props) => {
    const router = useRouter()
    const [braintreeInstance, setBraintreeInstance] = useState<any>(null)
    const options = useMemo(() => {
        return { orderId }
    }, [orderId])
    const { clientToken } = useGenerateBraintreeClientToken(options)
    const { addPaymentToOrder } = useAddPaymentToOrder()
    const { showMessageError } = useMessage()


    useEffect(() => {
        const script = document.createElement('script');
        script.src = BRAINTREE_SCRIPT_URL
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    useEffect(() => {
        if (clientToken && (window as any).braintree && !braintreeInstance) {
            (window as any).braintree?.dropin.create({
                authorization: clientToken,
                selector: '#dropin-container'
            }, function (err: any, instance: any) {
                if (err) {
                    // An error in the create call is likely due to
                    // incorrect configuration values or network issues
                    return;
                }
                setBraintreeInstance(instance)
            });
        }
    }, [clientToken, braintreeInstance]);

    const handleSubmit = () => {
        braintreeInstance?.requestPaymentMethod(function (err: any, payload: any) {
            if (err) {
                // An appropriate error will be shown in the UI
                return;
            }
            // Submit payload.nonce to your server
            addPaymentToOrder({ method: PaymentMethod.Braintree, metadata: payload }, onSubmitCalBack)
        });
    }

    const onSubmitCalBack = (isSuccess: boolean, rs?: string) => {
        if (isSuccess) {
            router.push(`${ROUTE.CHECKOUT_SUCCESS}?${QUERY_KEY.ORDER_ID}=${rs}`)
        } else {
            showMessageError(rs, 6000)
        }
    }

    return (
        <div>
            <div id="dropin-container"></div>
            <div className={s.bottom}>
                <ChekoutNotePolicy />
                <div className={s.button}>
                    <ButtonCommon onClick={handleSubmit}>
                        Submit Order
                    </ButtonCommon>
                </div>
            </div>
        </div>
    );
};

export default FormPayWithCard;