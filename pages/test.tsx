import { ProductCard } from '@commerce/types/product';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import PaymentInfoForm from 'src/components/modules/checkout/CheckoutInfo/components/PaymentInfoForm/PaymentInfoForm';
import { useToggleProductWishlist } from 'src/components/contexts'
interface Props {
  productDetail: ProductCard[],
}
export default function Home({ productDetail }: Props) {
  const {toggleProductWishlist,toggleWishlistVisible} = useToggleProductWishlist();


  function wishlist(){
    toggleProductWishlist  && toggleProductWishlist()
    console.log(toggleWishlistVisible);
  }
  return (
    <>
      <button onClick={wishlist}>Test</button>
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
