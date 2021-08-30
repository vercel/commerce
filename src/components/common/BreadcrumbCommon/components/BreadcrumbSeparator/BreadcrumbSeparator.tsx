import React from 'react'

interface BreadcrumbSeparatorProps {
    children: any;
}

const BreadcrumbSeparator = ({ children }: BreadcrumbSeparatorProps) => {
    return (
        <span>
            &nbsp;/&nbsp;{children}
        </span>
    )
}

export default BreadcrumbSeparator
