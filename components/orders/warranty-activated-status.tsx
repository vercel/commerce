import Chip, { ChipProps } from 'components/ui/chip';
import { Order, WarrantyStatus } from 'lib/shopify/types';

const WarrantyActivatedStatus = ({ order }: { order: Order }) => {
  const warrantyStatus = order?.warrantyStatus?.value;
  const isOrderConfirmed = order?.orderConfirmation?.value;

  if (!isOrderConfirmed || !warrantyStatus) {
    return null;
  }

  let level: ChipProps['level'] = 'success';

  if (warrantyStatus === WarrantyStatus.NotActivated) {
    level = 'warn';
  }

  return <Chip level={level}>Warranty: {warrantyStatus}</Chip>;
};

export default WarrantyActivatedStatus;
