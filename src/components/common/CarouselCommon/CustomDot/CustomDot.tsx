import React from 'react'

interface Props {
  index: number
  dotActive:number
  onClick: (index: number) => void
}

const CustomDot = ({ index, onClick, dotActive }: Props) => {
  const handleOnClick = () => {
    onClick && onClick(index)
  }
  return (
    <button
      onClick={handleOnClick}
      className={'dot' + (dotActive === index ? ' active' : '')}
    />
  )
}

export default CustomDot
