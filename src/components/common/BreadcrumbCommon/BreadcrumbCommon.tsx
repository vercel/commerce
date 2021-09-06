import React from 'react'
import s from './BreadcrumbCommon.module.scss'

import BreadcrumbItem from './components/BreadcrumbItem/BreadcrumbItem'
import BreadcrumbSeparator from './components/BreadcrumbSeparator/BreadcrumbSeparator'

interface BreadcrumbCommonProps {
    crumbs: { link:string, name:string }[];
    showHomePage?: boolean;
}

const BreadcrumbCommon = ({ crumbs, showHomePage=false } : BreadcrumbCommonProps) => {
    if (showHomePage) {
        crumbs.unshift({link: "/", name: "Home"});
    }
    return (
        <section className={s.breadcrumbCommon}>
            {
                crumbs.map((crumb, i) => {
                    if (i === 0) {
                        return (
                            <BreadcrumbItem key={crumb.name} text={crumb.name} href={crumb.link} />
                        )
                    }
                    if (i === crumbs.length-1) {
                        return (
                            <BreadcrumbSeparator key={crumb.name}>
                                <span>{crumb.name}</span>
                            </BreadcrumbSeparator>
                        )
                    }
                    return (
                        <BreadcrumbSeparator key={crumb.name}>
                            <BreadcrumbItem text={crumb.name} href={crumb.link} />
                        </BreadcrumbSeparator>
                    )
                })
            }
        </section>
    )
}

export default BreadcrumbCommon
