import React from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './BreadcrumbCommon.module.scss'

import BreadcrumbItem from './components/BreadcrumbItem/BreadcrumbItem'
import BreadcrumbSeparator from './components/BreadcrumbSeparator/BreadcrumbSeparator'

interface BreadcrumbCommonProps {
    crumbs: { link: string, name: string }[];
    showHomePage?: boolean;
}

const BreadcrumbCommon = ({ crumbs, showHomePage = true }: BreadcrumbCommonProps) => {
    return (
        <section className={s.breadcrumbCommon}>
            {

                showHomePage && <BreadcrumbItem key='Home' text='Home' href={ROUTE.HOME} />
            }
            {
                crumbs.length > 0 && <>

                    {
                        crumbs.slice(0, crumbs.length - 1).map((crumb) => (
                            < BreadcrumbSeparator key={crumb.name}>
                                <BreadcrumbItem text={crumb.name} href={crumb.link} />
                            </BreadcrumbSeparator>
                        ))}
                    < BreadcrumbSeparator>
                        <span className={s.currentItem}>{crumbs[crumbs.length - 1].name}</span>
                    </BreadcrumbSeparator>
                </>
            }
        </section >
    )
}

export default BreadcrumbCommon
