import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ButtonCommon } from 'src/components/common'
import LoadingCommon from 'src/components/common/LoadingCommon/LoadingCommon'
import { useModalCommon } from 'src/components/hooks'
import { useVerifyCustomer } from 'src/components/hooks/auth'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './VerifyCustomerAccount.module.scss'
import Link from 'next/link'
import { LANGUAGE } from 'src/utils/language.utils'
import ModalAuthenticate from 'src/components/common/ModalAuthenticate/ModalAuthenticate'

export default function VerifyCustomerAccount() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const { error, loading, verify } = useVerifyCustomer()
  const {
    visible: visibleModalAuthen,
    closeModal: closeModalAuthen,
    openModal: openModalAuthen,
  } = useModalCommon({ initialValue: false })

  useEffect(() => {
    const token = router.query.token
    if (token && !isVerified) {
      setIsVerified(true)
      verify({ token: token.toString() })
    }
  }, [router, verify, isVerified])

  return (
    <div className={s.verifyCustomerAccount}>
      {loading || !isVerified ? (
        <div>
          <LoadingCommon description="Verifing your account ...." />
        </div>
      ) : error ? (
        <div className={s.result}>
          <div className={s.message}>Error: {error?.message}</div>
          <Link href={ROUTE.HOME}>
            <a href="">
              <ButtonCommon>Back to home</ButtonCommon>
            </a>
          </Link>
        </div>
      ) : (
        <div className={s.result}>
          <div className={s.message}>
            Congratulation! Verified account successfully
          </div>
          <div className={s.bottom}>
            <Link href={ROUTE.HOME}>
              <a href="">
                <ButtonCommon type="light">Back to home</ButtonCommon>
              </a>
            </Link>

            <ButtonCommon onClick={openModalAuthen}>
              {LANGUAGE.BUTTON_LABEL.SIGNIN}
            </ButtonCommon>
          </div>
        </div>
      )}

      <ModalAuthenticate
        visible={visibleModalAuthen}
        closeModal={closeModalAuthen}
      />
    </div>
  )
}
