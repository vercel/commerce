import React from 'react'
import ButtonCommon from 'src/components/common/ButtonCommon/ButtonCommon'
import useLoginGoogle from 'src/components/hooks/auth/useLoginGoogle'
import { IconApple, IconFacebookColor, IconGoogleColor } from 'src/components/icons'
import s from './SocialAuthen.module.scss'
import { useMessage } from 'src/components/contexts'
import { LANGUAGE } from 'src/utils/language.utils'
const SocialAuthen = () => {
    const {signIn,loginGoogle,loading } = useLoginGoogle();
    const { showMessageSuccess, showMessageError } = useMessage()

    function clickGoogle(){
        signIn().then(value=>{
            if(value?.tokenId ){
        
                loginGoogle({token: value?.tokenId} ,callback);
                function callback(isSuccess: boolean, message?: string){
                    if (isSuccess) {
                        showMessageSuccess("Login successfully!", 4000)
                      } else {
                        showMessageError(message || LANGUAGE.MESSAGE.ERROR)
                      }
                }
            }
        });
        
    }
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
                {
                <ButtonCommon type='light' size='large'>
                    <span className={s.buttonWithIcon}>
                        <IconGoogleColor />
                        <span className={s.label} onClick={clickGoogle}>Google</span>
                    </span>
                </ButtonCommon>
                }
                
            </div>
        </section>
    )
}

export default SocialAuthen