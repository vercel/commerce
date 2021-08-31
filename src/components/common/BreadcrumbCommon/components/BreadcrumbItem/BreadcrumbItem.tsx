import React from 'react'
import Link from 'next/link'

interface BreadcrumbItemProps {
    text: string;
    href: string;
}

const BreadcrumbItem = ({ text, href }: BreadcrumbItemProps) => {
    return (
        <Link href={href}>
            <a>{text}</a>
        </Link>
    )
}

export default BreadcrumbItem
