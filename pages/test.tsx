import { ProductCard } from '@commerce/types/product';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import PaymentInfoForm from 'src/components/modules/checkout/CheckoutInfo/components/PaymentInfoForm/PaymentInfoForm';

interface Props {
  productDetail: ProductCard[],
}
export default function Home({ productDetail }: Props) {
  return (
    <>
      <PaymentInfoForm id={4} />
    </>
  )
}


export async function getServerSideProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {

  return {
    props: {},
  }
}


Home.Layout = Layout
