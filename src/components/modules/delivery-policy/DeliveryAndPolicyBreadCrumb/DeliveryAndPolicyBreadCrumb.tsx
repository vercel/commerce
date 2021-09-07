import { BreadcrumbCommon } from 'src/components/common'
import s from './DeliveryAndPolicyBreadCrumb.module.scss'

const CRUMB_DATA = [
    {
        link: "/",
        name: "Home"
    },
    {
        link: "/blog",
        name: "Blog"
    }
]
const DeliveryAndPolicyBreadCrumb = () => {
    return (
        <section className={s.breadCrumb}>
            <BreadcrumbCommon crumbs={CRUMB_DATA}/>
        </section>  
    )
}
export default DeliveryAndPolicyBreadCrumb