import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { ArrowLeftSmall, ArrowRightSmall } from 'src/components/icons'
import PaginationItem from './components/PaginationItem'
import s from './PaginationCommon.module.scss'
interface PaginationCommonProps {
  defaultCurrent?: number
  pageSize: number
  total: number
  onChange?: (page: number, pageSize: number) => void
}

const PaginationCommon = ({
  total,
  pageSize,
  defaultCurrent,
  onChange,
}: PaginationCommonProps) => {
  const [pageNum, setPageNum] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(0)
  useEffect(() => {
    setPageNum(Math.ceil(total / pageSize))
  }, [total, pageSize])

  useEffect(() => {
    if (defaultCurrent) {
      setCurrentPage(defaultCurrent)
    }
  }, [defaultCurrent])

  const onPageClick = (page: number) => {
    setCurrentPage(page)
    onChange && onChange(page, pageSize)
  }

  const onPrevClick = () => {
    setCurrentPage(currentPage - 1 < 0 ? 0 : currentPage - 1)
  }

  const onNextClick = () => {
    setCurrentPage((currentPage + 1) > (pageNum - 1) ? (pageNum - 1) : currentPage + 1)
  }

  return (
    <div className={s.warpper}>
      <div
        className={classNames(s.item, { [`${s.disable}`]: currentPage <= 0 })}
        onClick={onPrevClick}
      >
        <ArrowLeftSmall disable={currentPage <= 0} />
      </div>
      {[...Array(pageNum).keys()].map((index) => {
        return (
          <PaginationItem
            page={index}
            onClick={onPageClick}
            key={`${index}-item`}
            active={index === currentPage}
          />
        )
      })}
      <div
        className={classNames(s.item, {
          [`${s.disable}`]: currentPage >= pageNum - 1,
        })}
        onClick={onNextClick}
      >
        <ArrowRightSmall disable={currentPage >= pageNum} />
      </div>
    </div>
  )
}

export default PaginationCommon
