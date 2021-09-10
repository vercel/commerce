import { BreadcrumbCommon } from 'src/components/common'
import s from './DeliveryAndPolicyBreadCrumb.module.scss'

const CRUMB_DATA = [
    {
        link: "/delivery-policy",
        name: "Delivery And Policy"
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