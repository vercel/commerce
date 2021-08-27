import React, { useState } from 'react'
import ModalCommon from '../ModalCommon/ModalCommon'
import FormLogin from './components/FormLogin/FormLogin'
import FormRegister from './components/FormRegister/FormRegister'
import s from './ModalAuthenticate.module.scss'

interface Props {
    visible: boolean,
    closeModal: () => void,
}

const ModalAuthenticate = ({ visible, closeModal }: Props) => {
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const onSwitch = () => {
        setIsLogin(!isLogin)
    }

    return (
        <ModalCommon visible={visible} onClose={closeModal} title={isLogin ? 'Sign In' : 'Create Account'}>
            <section className={s.formAuthenticate}>
                <div className={s.inner}>
                    <FormLogin isHide={!isLogin} onSwitch={onSwitch} />
                    <FormRegister isHide={isLogin} onSwitch={onSwitch} />
                </div>
            </section>
        </ModalCommon>

    )
}

export default ModalAuthenticate