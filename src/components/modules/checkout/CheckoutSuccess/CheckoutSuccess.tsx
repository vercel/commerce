import React, { useEffect, useState } from "react";
import s from './CheckoutSuccess.module.scss';

import Image from "next/image";
import Link from "next/link";

import checkIcon from './assets/checkIcon.png';

const CheckoutSuccess = () => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          setIsShown(true);
        }, 3000);
      }, [3000]);

    return isShown ? (
        <div className={s.checkoutSuccessWrapper}>
            <div className={s.checkoutSuccess}>
                <div className={s.checkoutContent}>
                    <div>
                        <Image src={checkIcon} alt="check icon" />
                    </div>

                    <div className={s.checkoutMsg}>Your purchase has been successed!</div>
                    <div className={s.checkoutSubMsg}>Last call! Shop deep deals on 100+ bulk picks while you can.</div>
                    
                    <div>
                        <Link href="/">
                            <a className={s.backToHomeBtn}>Back to home
                                <div className={s.arrowRight}>
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.92 6.61994C11.8724 6.49719 11.801 6.38505 11.71 6.28994L6.71 1.28994C6.61676 1.1967 6.50607 1.12274 6.38425 1.07228C6.26243 1.02182 6.13186 0.99585 6 0.99585C5.7337 0.99585 5.4783 1.10164 5.29 1.28994C5.19676 1.38318 5.1228 1.49387 5.07234 1.61569C5.02188 1.73751 4.99591 1.86808 4.99591 1.99994C4.99591 2.26624 5.1017 2.52164 5.29 2.70994L8.59 5.99994H1C0.734784 5.99994 0.48043 6.1053 0.292893 6.29283C0.105357 6.48037 0 6.73472 0 6.99994C0 7.26516 0.105357 7.51951 0.292893 7.70705C0.48043 7.89458 0.734784 7.99994 1 7.99994H8.59L5.29 11.2899C5.19627 11.3829 5.12188 11.4935 5.07111 11.6154C5.02034 11.7372 4.9942 11.8679 4.9942 11.9999C4.9942 12.132 5.02034 12.2627 5.07111 12.3845C5.12188 12.5064 5.19627 12.617 5.29 12.7099C5.38296 12.8037 5.49356 12.8781 5.61542 12.9288C5.73728 12.9796 5.86799 13.0057 6 13.0057C6.13201 13.0057 6.26272 12.9796 6.38458 12.9288C6.50644 12.8781 6.61704 12.8037 6.71 12.7099L11.71 7.70994C11.801 7.61484 11.8724 7.50269 11.92 7.37994C12.02 7.13648 12.02 6.8634 11.92 6.61994Z" fill="white"/>
                                    </svg>
                                </div>
                            </a>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default CheckoutSuccess