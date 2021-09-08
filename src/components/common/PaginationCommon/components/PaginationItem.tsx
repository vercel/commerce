import classNames from 'classnames'
import React from 'react'
import s from "../PaginationCommon.module.scss"
interface PaginationItemProps {
    onClick:(page:number)=>void
    page:number
    active:boolean
}

const PaginationItem = ({onClick, page, active}: PaginationItemProps) => {
    const onPageClick = () => {
        onClick && onClick(page)
    }
    return (
        <div onClick={onPageClick} className={classNames(s.item,{[`${s.active}`]:active})}>
            {page+1}
        </div>
    )
}

export default PaginationItem
