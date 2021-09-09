import React from "react";
import s from './SkeletonCommon.module.scss'

interface SkeletonCommonProps {
    children? : React.ReactNode;
}

const SkeletonCommon = ({ children }: SkeletonCommonProps) => {

    return (
        <div className={s.skeletonCommon}>
            {children}
        </div>
    )
}

export default SkeletonCommon