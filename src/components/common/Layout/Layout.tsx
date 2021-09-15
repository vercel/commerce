import { CommerceProvider } from '@framework'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useModalCommon } from 'src/components/hooks'
import { BRAND, CATEGORY, FEATURED, FILTER_PAGE } from 'src/utils/constanst.utils'
import { ScrollToTop } from '..'
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
    const { locale = 'en-US', pathname } = useRouter()
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
                <Header toggleFilter={toggleFilter} visibleFilter={visibleFilter} />
                <main >{children}</main>
                <div className={s.filter}><MenuNavigationProductList categories={CATEGORY} brands={BRAND} featured={FEATURED} visible={visibleFilter} onClose={closeFilter} /> </div>
                <ScrollToTop visibilityHeight={1500} />
                {
                    FILTER_PAGE.includes(pathname) && (<div className={s.filter}><MenuNavigationProductList categories={CATEGORY}  brands={BRAND} featured={FEATURED} visible={visibleFilter} onClose={closeFilter}/> </div>)
                }
                <Footer />
            </div>
        </CommerceProvider>

    )
}

export default Layout
