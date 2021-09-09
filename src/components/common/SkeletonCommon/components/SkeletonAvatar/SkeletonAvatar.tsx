import classNames from "classnames";
import React from "react";
import s from './SkeletonAvatar.module.scss'

interface SkeletonAvatarProps {
    active?: boolean,
    shape?: "circle" | "square",
    size?: "small" | "default" | "large",
    children: React.ReactNode
}

const SkeletonAvatar = ({ active=true, shape="circle", size="default", children }: SkeletonAvatarProps) => {

    return (
        <div className={classNames(s.skeletonAvatar, {
            [s.active] : active,
            [s[shape]] : shape,
            [s[size]] : size,
        })}>
            {children}
        </div>
    )
}

export default SkeletonAvatar