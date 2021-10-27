import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useMessage } from 'src/components/contexts';
import { useAddPaymentToOrder, useGenerateBraintreeClientToken } from 'src/components/hooks/order';
import { PaymentMethod, ROUTE } from 'src/utils/constanst.utils';

const BRAINTREE_SCRIPT_URL = "https://js.braintreegateway.com/web/dropin/1.10.0/js/dropin.js"
interface Props {
    orderId: string

}

const FormPayWithCard = ({ orderId }: Props) => {
    const router = useRouter()
    const [braintreeInstance, setBraintreeInstance] = useState<any>(null)
    const options = useMemo(() => {
        return { orderId }
    }, [orderId])
    const { clientToken } = useGenerateBraintreeClientToken(options)
    const { addPaymentToOrder } = useAddPaymentToOrder()
    const { showMessageSuccess, showMessageError } = useMessage()


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
                console.log("error: ", err)

                return;
            }
            // Submit payload.nonce to your server
            console.log("payload: ", payload)
            addPaymentToOrder({ method: PaymentMethod.Braintree, metadata: payload }, onSubmitCalBack)
        });
    }

    const onSubmitCalBack = (isSuccess: boolean, msg?: string) => {
        // TODO: change timeout
        if (isSuccess) {
            router.push(ROUTE.CHECKOUT_SUCCESS)
        } else {
            showMessageError(msg, 10000)
        }
    }


    return (
        <div>
            orderId = {orderId}
            <div id="dropin-container"></div>
            <button id="submit-button" onClick={handleSubmit}>Purchase</button>
        </div>
    );
};

export default FormPayWithCard;