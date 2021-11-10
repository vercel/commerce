import React, { useMemo } from 'react';
import { BreadcrumbCommon } from 'src/components/common';
import s from './RecipeBreadcrumb.module.scss';
interface Props {
    title?: string,
}

const RecipeBreadcrumb = ({ title }: Props) => {
    const CRUMBS = useMemo(() => {
        return [
            {
                name: "Recipes",
                link: "/recipes"
            },
            {
                name: title,
            }
        ];
    }, [title]);

    return (
        <div className={s.wrapper}>
            <BreadcrumbCommon crumbs={CRUMBS} />
        </div>
    )
}

export default RecipeBreadcrumb