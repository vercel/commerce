import React from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import FooterColumn from './components/FooterColumn/FooterColumn'
import FooterSocial from './components/FooterSocial/FooterSocial'
import s from './Footer.module.scss'

const FOOTER_COLUMNS = [
    {
        title: 'Company',
        items: [
            {
                name: 'All Product',
                link: ROUTE.PRODUCTS,
            },
            {
                name: 'About Us',
                link: ROUTE.ABOUT,
            },
            {
                name: 'Bussiness',
                link: ROUTE.BUSSINESS,
            }
        ]
    },
    {
        title: 'Resources',
        items: [
            {
                name: 'Contact Us',
                link: ROUTE.CONTACT,
            },
            {
                name: 'FAQ',
                link: ROUTE.FAQ,
            },
            {
                name: 'Customer Service',
                link: ROUTE.CUSTOMER_SERVICE,
            },
        ]
    },
    {
        title: 'Quick Links',
        items: [
            {
                name: 'Terms & Conditions',
                link: ROUTE.TERM_CONDITION,
            },
            {
                name: 'Privacy Policy',
                link: ROUTE.PRIVACY_POLICY,
            },
            {
                name: 'Blog',
                link: ROUTE.TERM_CONDITION,
            },
        ]
    }
]

interface Props {
    className?: string
    children?: any
}

const Footer = ({ }: Props) => {
    return (
        <footer className={s.footer}>
            <div className={s.footerMenu}>
                <section className={s.menu}>
                    {FOOTER_COLUMNS.map(item => <FooterColumn
                        key={item.title}
                        title={item.title}
                        items={item.items} />)}
                </section>
                <FooterSocial />
            </div>
            <div>
                © 2021 Online Grocery
            </div>
        </footer>
    )
}

export default Footer
