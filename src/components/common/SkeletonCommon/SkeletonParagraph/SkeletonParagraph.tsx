import React, { useEffect, useState } from "react";
import s from './SkeletonParagraph.module.scss'

interface SkeletonParagraphProps {
    rows?: number // number of rows in paragraph
    children?: React.ReactNode
}

const SkeletonParagraph = ({ rows=2, children }: SkeletonParagraphProps) => {

    const [isChildLoaded, setIsChildLoaded] = useState(false)

    useEffect(() => {
        setIsChildLoaded(true);
    }, [])

    return (
        <div className={s.skeletonParagraph}>
            {
                isChildLoaded ? children : [...Array(rows)].map((e, i) => {
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