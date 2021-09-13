import classNames from "classnames";
import React from "react";
import s from './SkeletonImage.module.scss'

interface SkeletonImageProps {
    align?: "left" | "center"
    size?: "small" | "default" | "large"
    children?: React.ReactNode
}

const SkeletonImage = ({ align="center", size="default", children }: SkeletonImageProps) => {
    return (
        <div className={classNames(s.skeletonImage, {
            [s[size]] : size,
            [s[align]] : align
        })}>
            {children}
        </div>
    )
}

export default SkeletonImage