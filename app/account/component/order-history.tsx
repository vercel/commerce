import EmptyOrders from '@/components/EmptyOrder';
import Orders from '@/components/Orders';
import { Order } from '@/lib/shopify/types';

export default function OrderHistory({ orders }: { orders: Order[] }) {
	return (
		<div className="mt-6">
			<div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
				<h2 className="font-bold text-lead">Order History</h2>
				{orders?.length ? <Orders orders={orders} /> : <EmptyOrders />}
			</div>
		</div>
	);
}
