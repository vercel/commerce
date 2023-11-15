import AddressCard from '@/components/AddressCard';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Customer, MailingAddress } from '@/lib/shopify/types';
import { convertObjectToQueryString } from '@/lib/utils';

export default function AccountBook({
	customer,
	addresses,
}: {
	customer: Customer;
	addresses: MailingAddress[];
}) {
	return (
		<>
			<div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
				<h3 className="font-bold text-lead">Address Book</h3>
				<div>
					{!addresses?.length && (
						<Text className="mb-1" width="narrow" as="p" size="copy">
							You haven&apos;t saved any addresses yet.
						</Text>
					)}
					<div className="w-48">
						<a
							href={`account?${convertObjectToQueryString({
								modal: 'address-add',
							})}`}
							className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary mt-2 text-sm w-full mb-6"
						>
							Add an Address
						</a>
					</div>
					{Boolean(addresses?.length) && (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
							{customer.defaultAddress && (
								<AddressCard address={customer.defaultAddress} defaultAddress />
							)}
							{addresses
								.filter(address => address.id !== customer.defaultAddress?.id)
								.map(address => (
									<AddressCard key={address.id} address={address} />
								))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
