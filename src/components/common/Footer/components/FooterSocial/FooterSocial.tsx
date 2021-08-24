import React from 'react';
import IconFacebook from 'src/components/icons/IconFacebook';
import IconInstagram from 'src/components/icons/IconInstagram';
import IconTwitter from 'src/components/icons/IconTwitter';
import IconYoutube from 'src/components/icons/IconYoutube';
import { SOCIAL_LINKS } from 'src/utils/constanst.utils';
import IconVisa from '../../../../../assets/imgs/visa.png';
import IconMasterCard from '../../../../../assets/imgs/mastercard.png';
import IconGooglePlay from '../../../../../assets/imgs/gpay.png';
import IconApplePay from '../../../../../assets/imgs/apple_pay.png';
import s from './FooterSocial.module.scss';



const SOCIAL_MENU = [
    {
        icon: <IconFacebook />,
        link: SOCIAL_LINKS.FB,
    },
    {
        icon: <IconTwitter />,
        link: SOCIAL_LINKS.TWITTER,
    },
    {
        icon: <IconYoutube />,
        link: SOCIAL_LINKS.YOUTUBE,
    },
    {
        icon: <IconInstagram />,
        link: SOCIAL_LINKS.IG,
    },
]

const PAYMENT_METHODS = [
    {
        icon: IconVisa.src,
        name: 'Visa'
    },
    {
        icon: IconMasterCard.src,
        name: 'Master Card'
    },
    {
        icon: IconGooglePlay.src,
        name: 'GooglePay'
    },
    {
        icon: IconApplePay.src,
        name: 'Apple Pay'
    },
]

const FooterSocial = () => {
    return (
        <section className={s.footerSocial}>
            <div className={s.title}>Social</div>
            <ul className={s.socialMedia}>
                {
                    SOCIAL_MENU.map(item => <li key={item.link}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.icon}
                        </a>
                    </li>)
                }
            </ul>
            <ul className={s.payment}>
                {
                    PAYMENT_METHODS.map(item => <li key={item.name}>
                        <img src={item.icon} alt={item.name} />
                    </li>)
                }
            </ul>
        </section>
    );
};

export default FooterSocial;