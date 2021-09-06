import React from 'react'
import s from './BreadcrumbCommon.module.scss'

import BreadcrumbItem from './components/BreadcrumbItem/BreadcrumbItem'
import BreadcrumbSeparator from './components/BreadcrumbSeparator/BreadcrumbSeparator'

interface BreadcrumbCommonProps {
    crumbs: { link:string, name:string }[];
    showHomePage?: boolean;
}

const BreadcrumbCommon = ({ crumbs, showHomePage=true } : BreadcrumbCommonProps) => {
    return (
        <section className={s.breadcrumbCommon}>
            {
                showHomePage && crumbs[0].link==="/" && crumbs.map((crumb, i) => {
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
            {
                !showHomePage && crumbs.map((crumb, i) => {
                    if (i === 0) {
                        return
                    }
                    if (i === 1) {
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
