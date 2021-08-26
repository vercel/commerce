import IconVector from 'src/components/icons/IconVector'
import s from './ViewAllItem.module.scss'
import Link from 'next/link'

interface Props {
    link: string
}

const ViewAllItem = ({ link }: Props) => {
    return(
        <div className={s.viewAll}>
            <Link href={link}>
                <a className={s.conTent}>
                    View All
                </a>
            </Link>
            <div className={s.vector}>
                <IconVector />
            </div>
        </div>
    )
}

export default ViewAllItem