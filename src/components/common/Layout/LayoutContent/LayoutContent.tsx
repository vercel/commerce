import { useRouter } from 'next/router'
import { FC } from 'react'
import { useMessage } from 'src/components/contexts'
import { FILTER_PAGE, ROUTE } from 'src/utils/constanst.utils'
import { CartDrawer, Footer, MessageCommon, ScrollToTop } from '../..'
import Header from '../../Header/Header'
import MenuNavigationProductList from '../../MenuNavigationProductList/MenuNavigationProductList'
import s from './LayoutContent.module.scss'

interface Props {
    className?: string
    children?: any
}

const LayoutContent: FC<Props> = ({ children }) => {
    const router = useRouter()
    const {messages, removeMessage} = useMessage()

    return (
        <>
            <div className={s.mainLayout}>
                <Header/>
                {
                    router.pathname === ROUTE.ACCOUNT ?
                        <section className={s.wrapperWithBg}>
                            <main>{children}</main>
                        </section> :
                        <main>{children}</main>
                }
                <ScrollToTop visibilityHeight={1500} />
                {
                    FILTER_PAGE.includes(router.pathname) && (<div className={s.filter}><MenuNavigationProductList /> </div>)
                }
                <Footer />
            </div>
            <CartDrawer />
            <MessageCommon messages={messages} onRemove={removeMessage}/>
        </>

    )
}

export default LayoutContent
