import { HeadingCommon } from "src/components/common"
import s from './NotificationHeading.module.scss'

interface NotificationHeadingProps {
    children?: React.ReactNode,
    heading?: string,
}

const NotificationHeading = ({heading = "NOTIFICATIONS"}: NotificationHeadingProps) => {
    return (
        <section className={s.headingWrapper}>
            <div className={s.heading}>
                <HeadingCommon>{heading}</HeadingCommon>
            </div>
        </section>
    )
}
export default NotificationHeading