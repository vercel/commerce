import React from "react";
import s from './SkeletonParagraph.module.scss'

interface SkeletonParagraphProps {
    rows?: number // number of rows in paragraph
}

const SkeletonParagraph = ({ rows=2 }: SkeletonParagraphProps) => {
    return (
        <div className={s.skeletonParagraph}>
            {
                [...Array(rows)].map((e, i) => {
                    if (i === rows-1) {
                        return <div key={i} className={s.lastRow}></div>
                    }
                    return <div key={i} className={s.row}></div>
                })
            }
        </div>
    )
}

export default SkeletonParagraph