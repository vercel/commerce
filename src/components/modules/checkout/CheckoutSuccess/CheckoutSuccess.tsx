import React from "react";
import s from './CheckoutSuccess.module.scss';

import Image from "next/image";
import Link from "next/link";

import checkIcon from './assets/checkIcon.png';

import { ButtonCommon } from "src/components/common";
import { IconArrowRight } from "src/components/icons";

const CheckoutSuccess = () => {
    return (
        <div className={s.checkoutSuccessWrapper}>
            <div className={s.checkoutSuccess}>
                <div className={s.checkoutContent}>
                    <div>
                        <Image src={checkIcon} alt="check icon" />
                    </div>

                    <div className={s.checkoutMsg}>Your purchase has been successed!</div>
                    <div className={s.checkoutSubMsg}>Last call! Shop deep deals on 100+ bulk picks while you can.</div>
                    
                    <div className={s.backToHomeBtn}>
                        <Link href="/">
                            <a>
                                <ButtonCommon size="large" icon={<IconArrowRight />} isIconSuffix={true}>Back to home</ButtonCommon>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess