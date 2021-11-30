import { ProductCard } from '@commerce/types/product';
import { Layout } from 'src/components/common';
interface Props {
  productDetail: ProductCard[],
}
export default function Home({ productDetail }: Props) {
  return (
    <>
      <div></div>
    </>
  )
}


Home.Layout = Layout
