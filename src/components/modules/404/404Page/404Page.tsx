import React from 'react'
import { ButtonCommon, Logo } from 'src/components/common'
import s from './404Page.module.scss'
import Link from 'next/link';
interface Props {
}

const NotFoundPage = ({ }: Props) => {
    return (
       
        <div className={s.wrapper}>
            <div className={s.inner}>
                <div className={s.text}>
                    <h1>
                        404
                    </h1>
                    <p className={s.description}>Opps! it seems we found an Error <br/>
                        We couldn't found what you're looking for
                    </p>
                    
                    <Link href="/"><ButtonCommon >Return to Home Now</ButtonCommon></Link> 
                </div>
            </div>
        </div >
    )
}

export default NotFoundPage
