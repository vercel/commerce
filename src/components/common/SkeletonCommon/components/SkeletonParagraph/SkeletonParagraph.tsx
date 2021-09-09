import classNames from "classnames";
import React from "react";
import s from './SkeletonParagraph.module.scss'

interface SkeletonParagraphProps {
    active?: boolean,
    rows?: number // number of rows in paragraph
    children: React.ReactNode
}

const SkeletonParagraph = ({ active=true, rows=2, children }: SkeletonParagraphProps) => {

    return (
        <div className={classNames(s.skeletonParagraph, {
            [s.active] : active
        })}>
            {
                [...Array(rows)].map((e, i) => {
                    if (i === rows-1) {
                        return <p key={i} className={s.lastRow}></p>
                    }
                    return <p key={i} className={s.row}></p>
                })
            }
            {children}
        </div>
    )
}

export default SkeletonParagraph