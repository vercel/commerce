// import cn from 'clsx'
// import Link from 'next/link'
// import s from './UserNav.module.css'
// import useCart from '@framework/cart/use-cart'
// import { useUI } from '@components/ui/context'
// import { Heart, Bag, Menu } from '@components/icons'
// import CustomerMenuContent from './CustomerMenuContent'
// import useCustomer from '@framework/customer/use-customer'
// import React from 'react'
// import {
//   Dropdown,
//   DropdownTrigger as DropdownTriggerInst,
//   Button,
// } from '@components/ui'

// import type { LineItem } from '@commerce/types/cart'

// const countItem = (count: number, item: LineItem) => count + item.quantity

// const UserNav: React.FC<{
//   className?: string
// }> = ({ className }) => {
//   const { data } = useCart()
//   const { data: isCustomerLoggedIn } = useCustomer()
//   const {
//     toggleSidebar,
//     closeSidebarIfPresent,
//     openModal,
//     setSidebarView,
//     openSidebar,
//     displaySidebar,
//   } = useUI()

//   const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0
//   const DropdownTrigger = isCustomerLoggedIn
//     ? DropdownTriggerInst
//     : React.Fragment

//   return (
//     <nav className={cn(s.root, className)}>
//       <ul className={s.list}>
//         {process.env.COMMERCE_CART_ENABLED && (
//           <li className={s.item}>
//             <Button
//               className={s.item}
//               variant="naked"
//               onClick={() => {
//                 setSidebarView('CART_VIEW')
//                 openSidebar()
//               }}
//               aria-label={`Cart items: ${itemsCount}`}
//             >
//               <Bag className={displaySidebar ? undefined : 'text-white'} />

//               {itemsCount > 0 && (
//                 <span className={s.bagCount}>{itemsCount}</span>
//               )}
//             </Button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   )
// }

// export default UserNav
