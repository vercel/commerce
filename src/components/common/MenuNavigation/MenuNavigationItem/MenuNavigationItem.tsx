import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { QUERY_SPLIT_SEPERATOR, ROUTE } from 'src/utils/constanst.utils'
import s from './MenuNavigationItem.module.scss'

interface Props {
    name: string
    value: string
    queryKey: string,
}

const MenuNavigationItem = ({ name, value, queryKey }: Props) => {
    const router = useRouter()
    const [isActive, setIsActive] = useState<boolean>()

    useEffect(() => {
        if (!value) {
            setIsActive(false)
        }

        const queryString = router.query[queryKey] as string || ''
        setIsActive(queryString.split(QUERY_SPLIT_SEPERATOR).includes(value))
    }, [router.query, queryKey, value])

    const handleClick = () => {
        const queryString = router.query[queryKey] as string || ''
        const prevQuery = queryString.split(QUERY_SPLIT_SEPERATOR)

        let newQuery = [] as string[]
        if (isActive) {
            newQuery = prevQuery.filter(item => item !== value)
        } else {
            newQuery = [...prevQuery, value]
        }
        // setIsActive(!isActive)

        router.push({
            pathname: ROUTE.PRODUCTS,
            query: { 
                ...router.query,
                [queryKey]: newQuery.join(QUERY_SPLIT_SEPERATOR)
             }
        },
            undefined, { shallow: true }
        )
    }

    return (<li className={classNames(s.menuNavigationItem, { [s.active]: isActive })}
        onClick={handleClick}>
        {name}
    </li>)


}

export default MenuNavigationItem
