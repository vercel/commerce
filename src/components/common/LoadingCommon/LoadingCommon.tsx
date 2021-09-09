import classNames from "classnames";
import React from "react";
import s from './LoadingCommon.module.scss'

interface LoadingCommonProps {
    size?: "small" | "default" | "large",
    children? : React.ReactNode;
}

const LoadingCommon = ({ size="default", children }: LoadingCommonProps) => {
    
    return (
        <>
        {
            <div className={classNames(s.loadingCommon, {
                [s[size]]: size
            })}>
                {children}
            </div>
        }
        </>
    )
}

export default LoadingCommon