import OrdersHeader from 'components/orders/orders-header';

export default function OrdersLoadingPage() {
  return (
    <div className="py-5 sm:py-10">
      <OrdersHeader />
      <div className="mx-auto mt-10 max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl animate-pulse space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
          <div className="h-[200px] border-b border-t border-gray-200 bg-gray-100 shadow-sm sm:rounded-lg sm:border" />
          <div className="h-[200px] border-b border-t border-gray-200 bg-gray-100 shadow-sm sm:rounded-lg sm:border" />
          <div className="h-[200px] border-b border-t border-gray-200 bg-gray-100 shadow-sm sm:rounded-lg sm:border" />
        </div>
      </div>
    </div>
  );
}
