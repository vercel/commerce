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
                <ButtonCommon type='light' size='large'>
                    <span className={s.buttonWithIcon}>
                        <IconFacebookColor /><span className={s.label}>Facebook</span>
                    </span>
                </ButtonCommon>
                <ButtonCommon type='light' size='large'>
                    <span className={s.buttonWithIcon}>
                        <IconApple />
                        <span className={s.label}>Apple</span>
                    </span>
                </ButtonCommon>
                <ButtonCommon type='light' size='large'>
                    <span className={s.buttonWithIcon}>
                        <IconGoogleColor />
                        <span className={s.label}>Google</span>
                    </span>
                </ButtonCommon>
            </div>
        </section>
    )
}

export default SocialAuthen