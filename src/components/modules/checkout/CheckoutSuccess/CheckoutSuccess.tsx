import Link from "next/link";
import React from "react";
import { ButtonCommon, StaticImage } from "src/components/common";
import { IconArrowRight } from "src/components/icons";
import { ACCOUNT_TAB, QUERY_KEY, ROUTE } from "src/utils/constanst.utils";
import checkIcon from './assets/checkIcon.png';
import s from './CheckoutSuccess.module.scss';


const CheckoutSuccess = () => {
    return (
        <div className={s.checkoutSuccessWrapper}>
            <div className={s.checkoutSuccess}>
                <div className={s.checkoutContent}>
                    <StaticImage src={checkIcon} alt="check icon" />

                    <div className={s.checkoutMsg}>Your purchase has been successed!</div>
                    <div className={s.checkoutSubMsg}>Last call! Shop deep deals on 100+ bulk picks while you can.</div>

                    <div className={s.btns}>
                        <Link href={ROUTE.HOME}>
                            <a>
                                <ButtonCommon size="large" icon={<IconArrowRight />} isIconSuffix={true}>Back to home</ButtonCommon>
                            </a>
                        </Link>
                        <Link href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`}>
                            <a>
                                <ButtonCommon size="large" type='ghost'>View my order</ButtonCommon>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess