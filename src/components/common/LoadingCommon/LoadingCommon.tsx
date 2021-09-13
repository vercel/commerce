import React from "react";
import s from './LoadingCommon.module.scss'

interface LoadingCommonProps {
    children? : React.ReactNode;
}

const LoadingCommon = ({ children }: LoadingCommonProps) => {
    
    return (
        <>
            <div className={s.loadingCommon}>
                {children}
            </div>
        </>
    )
}

export default LoadingCommon