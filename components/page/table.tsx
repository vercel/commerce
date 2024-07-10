type TableProps = {
  columns: { key: string; title: string }[];
  data: Array<Record<string, string>>;
  title: string;
};

const Table = ({ columns, data, title }: TableProps) => {
  return (
    <div className="flex w-full flex-col gap-y-5">
      <h3 className="text-2xl font-semibold text-content-strong">{title}</h3>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.key} className={`text-left ${index === 0 ? 'pl-2' : ''}`}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
              {columns.map((column, index) => (
                <td key={column.key} className={`${index === 0 ? 'pl-2' : ''}`}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
