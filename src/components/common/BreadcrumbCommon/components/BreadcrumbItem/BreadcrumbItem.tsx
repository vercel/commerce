import React from 'react'
import Link from 'next/link'
import s from './BreadcrumbItem.module.scss'

interface BreadcrumbItemProps {
    text: string;
    href: string;
}

const BreadcrumbItem = ({ text, href }: BreadcrumbItemProps) => {
    return (
        <Link href={href}>
            <a className={s.breadcrumbItem}>{text}</a>
        </Link>
    )
}

export default BreadcrumbItem
