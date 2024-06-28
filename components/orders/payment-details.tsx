import Text from 'components/ui/text';
import Label from 'components/ui/label';
import { Order } from 'lib/shopify/types';
import Price from 'components/price';
import { toPrintDate } from 'lib/utils';

export default function PaymentsDetails({ order, hideIcon }: { order: Order; hideIcon?: boolean }) {
  return (
    <>
      {order.transactions.map((transaction, index) => (
        <div key={index} className="flex items-start gap-2">
          {!hideIcon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={transaction.paymentIcon.url}
              alt={transaction.paymentIcon.altText}
              width={36}
            />
          )}

          <div>
            <Text>
              Ending with {transaction.paymentDetails.last4} -
              <Price
                as="span"
                amount={transaction.transactionAmount.amount}
                currencyCode={transaction.transactionAmount.currencyCode}
              />
            </Text>
            <Label>{toPrintDate(transaction.processedAt)}</Label>
          </div>
        </div>
      ))}
    </>
  );
}
