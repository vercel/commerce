import classNames from "classnames";
import React from "react";
import s from './SkeletonTitle.module.scss'

interface SkeletonTitleProps {
    active?: boolean,
    width: string | number,      // number px
    height: string | number,
    children: React.ReactNode
}

const SkeletonTitle = ({ active=true, width, height, children }: SkeletonTitleProps) => {

    const styles = {
        width: width,
        height: height
    }

    return (
        <div style={styles} className={classNames(s.skeletonTitle, {
            [s.active] : active
        })}>
            {children}
        </div>
    )
}

export default SkeletonTitle