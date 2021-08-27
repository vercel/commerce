import React from 'react'
import ButtonCommon from 'src/components/common/ButtonCommon/ButtonCommon'
import { IconApple, IconFacebookColor, IconGoogleColor } from 'src/components/icons'
import s from './SocialAuthen.module.scss'

const SocialAuthen = () => {
    return (
        <section className={s.socialAuthen}>
            <div className={s.captionText}>
                <span>
                    OR CONTINUE WITH
                </span>
            </div>
            <div className={s.btns}>
                <ButtonCommon type='light'>
                    <span className={s.buttonWithIcon}>
                        <IconFacebookColor />&nbsp;Facebook
                    </span>
                </ButtonCommon>
                <ButtonCommon type='light'>
                    <span className={s.buttonWithIcon}>
                        <IconApple />&nbsp;Apple
                    </span>
                </ButtonCommon>
                <ButtonCommon type='light'>
                    <span className={s.buttonWithIcon}>
                        <IconGoogleColor />&nbsp;Google
                    </span>
                </ButtonCommon>
            </div>
        </section>
    )
}

export default SocialAuthen