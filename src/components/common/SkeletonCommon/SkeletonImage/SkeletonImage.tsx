import classNames from "classnames";
import React from "react";
import s from './SkeletonImage.module.scss'

interface SkeletonImageProps {
    align?: "left" | "center"
    size?: "small" | "default" | "large"
}

const SkeletonImage = ({ align="center", size="default" }: SkeletonImageProps) => {
    return (
        <div className={classNames(s.skeletonImage, {
            [s[size]] : size,
            [s[align]] : align
        })}>
        </div>
    )
}

export default SkeletonImage