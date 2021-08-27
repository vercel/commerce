import React, { useState } from 'react'
import FormLogin from './components/FormLogin/FormLogin'
import FormRegister from './components/FormRegister/FormRegister'
import s from './ModalAuthenticate.module.scss'

const ModalAuthenticate = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const onSwitch = () => {
        setIsLogin(!isLogin)
    }

    return (
        <section className={s.formAuthenticate}>
            <FormLogin isHide={!isLogin} onSwitch={onSwitch} />
            <FormRegister isHide={isLogin} onSwitch={onSwitch} />
        </section>
    )
}

export default ModalAuthenticate