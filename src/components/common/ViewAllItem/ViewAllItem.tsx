import Vector from 'src/components/icons/Vector'
import s from './ViewAllItem.module.scss'
import Link from 'next/link'

interface Props {
    className?: string
    children?: any
    link?: string
}

const ViewAllItem = ({ link }: Props) => {
    return(
        <div className={s.viewAll}>
            <Link href={"/all"}>
                <a className={s.conTent}>
                    View All
                </a>
            </Link>
            <div className={s.vecTor}>
                <Vector />
            </div>
        </div>
    )
}

export default ViewAllItem