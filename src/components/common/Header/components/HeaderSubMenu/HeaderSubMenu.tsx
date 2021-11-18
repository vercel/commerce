import { QueryFacetsArgs } from '@framework/schema'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'
import MenuDropdown from 'src/components/common/MenuDropdown/MenuDropdown'
import { useGetAllCollection } from 'src/components/hooks/collection'
import { useFacets } from 'src/components/hooks/facets'
import { CODE_FACET_FEATURED, DEFAULT_FACET_FEATURED_SIZE, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { convertLinkCollections } from 'src/utils/funtion.utils'
import { SortOrder } from 'src/utils/types.utils'
import HeaderNoti from './HeaderNoti/HeaderNoti'
import s from './HeaderSubMenu.module.scss'


const FACET_QUERY = {
    options: {
        sort: {
            code: SortOrder.Asc
        },
        filter: {
            code: {
                in: [CODE_FACET_FEATURED]
            }
        }
    }
} as QueryFacetsArgs

const HeaderSubMenu = memo(() => {
    const router = useRouter()
    const {collections} = useGetAllCollection();
    const { facets } = useFacets(FACET_QUERY)

    return (
        <section className={s.headerSubMenu}>
            <ul className={s.menu}>
                {/* todo: handle active item */}
                <li>
                    <MenuDropdown options={convertLinkCollections(collections) || []} align="left">Categories</MenuDropdown>
                </li>
                {
                    facets?.[0]?.values.slice(0,DEFAULT_FACET_FEATURED_SIZE).map(item => <li key={item.name}
                        className={classNames({ [s.active]: router.asPath === item.code })}>
                        <Link href={`${ROUTE.PRODUCTS}?${QUERY_KEY.FEATURED}=${item.code}`}>
                            <a >
                                {item.name}
                            </a>
                        </Link>
                    </li>)
                }
                <li  className={classNames({ [s.active]: router.pathname === '/about-us' })}>
                    <Link href={ROUTE.ABOUT}>
                        <a >
                             About Us
                        </a>
                    </Link>

                </li>
                <li className={classNames({ [s.active]: router.pathname === '/blogs' })}>
                    <Link href={ROUTE.BLOGS}>
                        <a >
                            Blogs
                        </a>
                    </Link>

                </li>
            </ul>
            <HeaderNoti />
        </section>
    )
})
HeaderSubMenu.displayName = 'HeaderSubMenu'
export default HeaderSubMenu
