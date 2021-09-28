import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ButtonCommon } from 'src/components/common'
import LoadingCommon from 'src/components/common/LoadingCommon/LoadingCommon'
import { useVerifyCustomer } from 'src/components/hooks'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './VerifyCustomerAccount.module.scss'
import Link from 'next/link'

export default function VerifyCustomerAccount() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const { error, loading, verify } = useVerifyCustomer()

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
          <div className={s.message}>Congratulation! Verified account successfully</div>
          <Link href={ROUTE.HOME}>
            <a href="">
              <ButtonCommon>Back to home</ButtonCommon>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
