import classNames from 'classnames'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { QUERY_KEY, QUERY_SPLIT_SEPERATOR, ROUTE } from 'src/utils/constanst.utils'
import s from './MenuNavigationItem.module.scss'

interface Props {
    name: string
    value: string
    queryKey: string
    isSingleSelect?: boolean
    path?:string
}

const MenuNavigationItem = ({ name, value, queryKey, isSingleSelect,path = ROUTE.PRODUCTS }: Props) => {
 

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
        
        let newQuery = ''
        if (isSingleSelect) {
            newQuery = isActive ? '' : value
        } else {
            if (isActive) {
                newQuery = prevQuery.filter(item => item !== value).join(QUERY_SPLIT_SEPERATOR)
            } else {
                newQuery = [...prevQuery, value].join(QUERY_SPLIT_SEPERATOR)
            }
        }

        const query =  {
            ...router.query,
            [queryKey]: newQuery
        }

        if (queryKey === QUERY_KEY.CATEGORY) {
            query[QUERY_KEY.PAGE] = "0"
        }

        router.push({
            pathname: path,
            query
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
