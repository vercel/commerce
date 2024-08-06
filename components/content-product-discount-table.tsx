export default function DiscountTable() {
  return (
    <div className="prose mb-4 rounded-xl border border-neutral-200 p-4 text-sm/relaxed shadow-xl">
      <h2 className="mt-0 text-base font-semibold">Buy more and save!</h2>
      <table className="text-left">
        <caption className="mt-4 caption-bottom text-left text-xs">
          Discount applied at checkout.
        </caption>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1px] border-b-neutral-200">
            <td>Any 2+ chairs</td>
            <td>
              <strong>10% off</strong>
            </td>
          </tr>
          <tr className="border-b-[1px] border-b-neutral-200">
            <td>Any 4+ chairs</td>
            <td>
              <strong>15% off</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
