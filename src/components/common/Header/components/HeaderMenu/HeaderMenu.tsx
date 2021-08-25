import { memo } from 'react'
import s from './HeaderMenu.module.scss'

interface Props {
    className?: string
    children?: any
}

const HeaderMenu = memo(({ }: Props) => {
    return (
       <section className={s.headerMenu}>

       </section>
    )
})

export default HeaderMenu
