import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Layout } from 'src/components/common'
import LoadingCommon from 'src/components/common/LoadingCommon/LoadingCommon'
import { useVerifyCustomer } from 'src/components/hooks'

export default function VerifyCustomer() {
    const router = useRouter()
    const { error, loading, verify } = useVerifyCustomer()

    useEffect(() => {
        const { token } = router.query
        console.log("token: ", token)
        if (token) {
            verify({ token: token.toString() })
        }
    }, [])

    return (
        <div>
            {
                loading ? <>
                    <LoadingCommon />
                    Verifing your account ....
                </> : <div className="error">
                    {error?.message}
                </div>
            }
        </div>
    )
}


VerifyCustomer.Layout = Layout
