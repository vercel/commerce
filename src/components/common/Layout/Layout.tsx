import { CommerceProvider } from '@framework'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useModalCommon } from 'src/components/hooks'
import { BRAND, CATEGORY, FEATURED } from 'src/utils/constanst.utils'
import { CustomShapeSvg, ScrollToTop } from '..'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import MenuNavigationProductList from '../MenuNavigationProductList/MenuNavigationProductList'
import s from './Layout.module.scss'

interface Props {
    className?: string
    children?: any
}

// note: demo code
const Layout: FC<Props> = ({ children }) => {
    const { locale = 'en-US' } = useRouter()
    const { visible: visibleFilter, openModal: openFilter, closeModal: closeFilter } = useModalCommon({ initialValue: false })

    const toggleFilter = () => {
        if (visibleFilter) {
            closeFilter()
        } else {
            openFilter()
        }
    }
    return (
        <CommerceProvider locale={locale}>
            <div className={s.mainLayout}>
                <Header toggleFilter={toggleFilter} />
                <main >{children}</main>

                <CustomShapeSvg />
                <div className={s.filter}><MenuNavigationProductList categories={CATEGORY} brands={BRAND} featured={FEATURED} visible={visibleFilter} onClose={closeFilter} /> </div>
                <ScrollToTop visibilityHeight={1500} />
                <Footer />
            </div>
        </CommerceProvider>

    )
}

export default Layout
