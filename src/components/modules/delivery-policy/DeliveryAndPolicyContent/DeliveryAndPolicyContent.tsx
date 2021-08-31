import { CollapseCommon, DateTime, HeadingCommon } from 'src/components/common'
import CollapseContent from 'src/components/common/CollapseCommon/CollapseContent/CollapseContent'
import s from './DeliveryAndPolicyContent.module.scss'

interface DeliveryAndPolicyContentProps{
    title: string,
    date: string,
    content: Array<string>,
}

const CONTENT = [
    "When you’re trying to eat healthier but want something more substantial than a leafy green salad, broccoli salad is there for you. I love the crunch and heft of broccoli, especially when it’s cut up into bite size spoonable pieces.",
    "Some people aren’t into raw broccoli, but I love it! I always go for the raw broccoli on those vegetable platters that seem to be at every potluck/party you go to.",
    "This is a simple broccoli salad: you have the bulk of it, raw broccoli; crunchy red onions for a bit of acidity and raw crunch, craisins for sweetness, almonds for a nutty counter point; and a sweet and tangy soy-rice vinegar-sesame dressing.",
]

const DeliveryAndPolicyContent = ( { title, date, content } : DeliveryAndPolicyContentProps) => {
    return (
        <section className={s.deliveryAndPolicyContentWrapper}>

            <div className={s.titleWrapper}>
                <div className={s.date}>
                    <div className={s.update}>LASTEST UPDATED:&nbsp;</div>
                    <DateTime date={date} />
                </div>
                <HeadingCommon>{title}</HeadingCommon>
            </div>
            <div className={s.contentContainer}>
                {
                    content.map(item => <CollapseContent content={item} />)
                }
            </div>
            <CollapseCommon title="This is a subtitle" content={CONTENT} />
            <CollapseCommon title="This is a subtitle" content={CONTENT} />
            <CollapseCommon title="This is a subtitle" content={CONTENT} />
            <CollapseCommon title="This is a subtitle" content={CONTENT} />
            <CollapseCommon title="This is a subtitle" content={CONTENT} />

        </section>
    )
}

export default DeliveryAndPolicyContent