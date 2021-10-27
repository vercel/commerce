import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useActiveCustomer } from 'src/components/hooks/auth'
import { ROUTE } from 'src/utils/constanst.utils'
import ModalCommon from '../ModalCommon/ModalCommon'
import FormLogin from './components/FormLogin/FormLogin'
import FormRegister from './components/FormRegister/FormRegister'
import s from './ModalAuthenticate.module.scss'

interface Props {
  visible: boolean
  closeModal: () => void
  mode?: '' | 'register'
  initialEmail?: string
  disableRedirect ?: boolean
}

const ModalAuthenticate = ({ visible, mode, closeModal, initialEmail, disableRedirect }: Props) => {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const { customer } = useActiveCustomer()
  const router = useRouter()

  useEffect(() => {
    if (mode === 'register') {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }, [mode])

  useEffect(() => {
    if (visible && customer) {
      closeModal()
      if (!disableRedirect) {
        router.push(ROUTE.ACCOUNT)
      }
    }
  }, [customer, visible, closeModal, router, disableRedirect])

  const onSwitch = () => {
    setIsLogin(!isLogin)
  }

  return (
    <ModalCommon
      visible={visible}
      onClose={closeModal}
      title={isLogin ? 'Sign In' : 'Create Account'}
    >
      <section className={s.formAuthenticate}>
        <div
          className={classNames({
            [s.inner]: true,
            [s.register]: !isLogin,
          })}
        >
          <FormLogin isHide={!isLogin} onSwitch={onSwitch} initialEmail={initialEmail} />
          <FormRegister isHide={isLogin} onSwitch={onSwitch} />
        </div>
      </section>
    </ModalCommon>
  )
}

export default ModalAuthenticate
