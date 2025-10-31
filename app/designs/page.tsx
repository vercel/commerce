import StockDesignViewer from 'components/designs/stock-design-viewer';
import { connection } from 'next/server';

export const metadata = {
  title: 'Stock Design Viewer',
  description: 'Browse and search through our collection of stock designs'
};

export default async function DesignsPage() {
  // Use connection() to make this page dynamic with Cache Components
  await connection();
  return <StockDesignViewer />;
}

