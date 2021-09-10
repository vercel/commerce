import Link from 'next/link';
import React from 'react';
import { ButtonCommon } from 'src/components/common';
import s from './ErrorPage.module.scss';

interface Props {
}

const ErrorPage = ({ }: Props) => {
    return (
       
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.text}>
                    <h1>
                        ERROR
                    </h1>
                    <p className={s.description}>Oh no, Something went wrong<br/>
                        We're doing our best and we'll back soon
                    </p>
                    
                    <Link href="/"><ButtonCommon >Return to Home Now</ButtonCommon></Link> 
                </div>
            </div>
        </div >
    )
}

export default ErrorPage
