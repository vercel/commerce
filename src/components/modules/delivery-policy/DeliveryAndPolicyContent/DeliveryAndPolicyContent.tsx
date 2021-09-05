import { DateTime } from 'src/components/common'
import s from './DeliveryAndPolicyContent.module.scss'

interface DeliveryAndPolicyContentProps{
    title?: string,
    date: string,
    content: string[],
}

const DeliveryAndPolicyContent = ( { title, date, content } : DeliveryAndPolicyContentProps) => {
    return (
        <section>
            <div className={s.titleWrapper}>
                <div>LASTEST UPDATED: 
                    <DateTime date={date} />
                </div>
                <div className={s.title}>
                    {title}
                </div>
            </div>

        </section>
    )
}

export default DeliveryAndPolicyContent