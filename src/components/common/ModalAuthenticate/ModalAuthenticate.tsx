import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import ModalCommon from '../ModalCommon/ModalCommon'
import FormLogin from './components/FormLogin/FormLogin'
import FormRegister from './components/FormRegister/FormRegister'
import s from './ModalAuthenticate.module.scss'

interface Props {
    visible: boolean,
    closeModal: () => void,
    mode?: '' | 'register'
}

const ModalAuthenticate = ({ visible, mode, closeModal }: Props) => {
    const [isLogin, setIsLogin] = useState<boolean>(true)

    useEffect(() => {
        if (mode === 'register') {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, [mode])

    const onSwitch = () => {
        setIsLogin(!isLogin)
    }

    return (
        <ModalCommon visible={visible} onClose={closeModal} title={isLogin ? 'Sign In' : 'Create Account'}>
            <section className={s.formAuthenticate}>
                <div className={classNames({
                    [s.inner]: true,
                    [s.register]: !isLogin,
                })}>
                    <FormLogin isHide={!isLogin} onSwitch={onSwitch} />
                    <FormRegister isHide={isLogin} onSwitch={onSwitch} />
                </div>
            </section>
        </ModalCommon>

    )
}

export default ModalAuthenticate