import IconVector from 'src/components/icons/IconVector'
import s from './ViewAllItem.module.scss'
import Link from 'next/link'

interface Props {
    link: string
    onClick?: () => void
}

const ViewAllItem = ({ link, onClick }: Props) => {
    return (
        <div className={s.viewAll} onClick={onClick}>
            <Link href={link}>
                <a className={s.content}>
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