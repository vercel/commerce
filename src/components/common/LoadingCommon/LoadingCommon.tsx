import React from "react";
import s from './LoadingCommon.module.scss'

const LoadingCommon = () => {
    
    return (
        <div className={s.wrapper}>
            <div className={s.loadingCommon}>
            </div>
            <p className={s.text}>Loading...</p>
        </div>
    )
}

export default LoadingCommon