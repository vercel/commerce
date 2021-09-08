import classNames from "classnames";
import React from "react";
import s from './LoadingCommon.module.scss'

interface LoadingCommonProps {
    visible: boolean
    size?: "small" | "default" | "large",
    children? : React.ReactNode;
}

const LoadingCommon = ({ visible, size="default", children }: LoadingCommonProps) => {
    
    return (
        <>
        {
            visible && <div className={classNames(s.loadingCommon, {
                [s[size]]: size
            })}>
                {children}
            </div>
        }
        </>
    )
}

export default LoadingCommon