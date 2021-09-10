import { Layout } from "src/components/common"
import { DeliveryAndPolicyContent, DeliveryAndPolicyBreadCrumb } from "src/components/modules/delivery-policy"

export default function DeliveryAndPolicyPage () {
    return (
        <>
            <DeliveryAndPolicyBreadCrumb />
            <DeliveryAndPolicyContent />
        </>
    )
}
DeliveryAndPolicyPage.Layout = Layout