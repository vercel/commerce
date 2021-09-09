import { StaticImage } from '..';
import EmptyImg from './empty.svg';
import s from './EmptyCommon.module.scss';


interface Props {
    description?: string
}

const EmptyCommon = ({ description = "No data to display" }: Props) => {
    return (
        <div className={s.empty}>
            <div className="imgWrap">
                <StaticImage src={EmptyImg} alt="empty" />
            </div>
            {
                description && <div className={s.description}>
                    {description}
                </div>
            }
        </div>
    )
}

export default EmptyCommon