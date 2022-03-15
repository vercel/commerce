import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'

export default function AuthMenuSidebarView() {
  const { closeSidebar } = useUI()
  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      THIS IS A SIDEBAR VIEW
    </SidebarLayout>
  )
}
