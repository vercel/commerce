import React from 'react'
import s from './BreadcrumbCommon.module.scss'

import { useRouter } from 'next/router'

import BreadcrumbItem from './components/BreadcrumbItem/BreadcrumbItem'
import BreadcrumbSeparator from './components/BreadcrumbSeparator/BreadcrumbSeparator'

const BreadcrumbCommon = () => {

    const paths: string | any = {
        "/": "Home",
        "fresh-product-today" : "Fresh Product Today",
        "product-list": "Product List",
        "recipes-list": "Recipes List",
        "blogs": "Blog",
        "account": "Account",
        "delivery&policy": "Delivery & Policy",
        "product-detail": "Product Detail",
        "recipes-detail": "Recipes Detail",
        "blog-detail": "Blog Detail"
    }

    const router = useRouter();
    let crumbs = router.route.split('/');

    return (
        <section className={s.breadcrumbCommon}>
            <BreadcrumbItem text="Home" href="/" />
            {
                crumbs.map((crumb, i) => {
                    if (crumb === "") {
                        return
                    }
                    if (i === crumbs.length-1) {
                        return (
                            <BreadcrumbSeparator key={i}>
                                <BreadcrumbItem text={`${paths[crumb]}`} href="#" />
                            </BreadcrumbSeparator>
                        )
                    }
                    return (
                        <BreadcrumbSeparator key={i}>
                            <BreadcrumbItem text={`${paths[crumb]}`} href={`/${paths[crumb]}`} />
                        </BreadcrumbSeparator>
                    )
                })
            }
        </section>
    )

}

export default BreadcrumbCommon
