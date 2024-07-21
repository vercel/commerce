import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { GridTileImage } from 'components/grid/tile';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { getProductById, getProductRecommendations } from 'lib/shopify';
import { ContentLandingPages, Store } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

const icon = '/image.png';
const contentReel = '/snowboardLong.mp4';
const lookupContentLandingPage = async (contentLandingPageId: string) => {
  const contentLandingPages: ContentLandingPages = {
    ABC: {
      contentLandingPageId: 'ABC',
      content: {
        contentId: 'ABC-123',
        contentUrl: 'https://vercel.com'
      },
      brand: {
        brandId: '123456789',
        companyName: 'Vercel'
      },
      store: {
        domain: 'https://test-app-furie.myshopify.com',
        key: '30f0c9b2ee5c69d6c0de2e7a048eb6b4'
      },
      productId: 'gid://shopify/Product/8587441176812'
    },
    '123': {
      contentLandingPageId: '123',
      content: {
        contentId: '123-ABC',
        contentUrl: 'https://vercel.com'
      },
      brand: {
        brandId: '123456789',
        companyName: 'Vercel'
      },
      store: {
        domain: 'https://quickstart-ba952e54.myshopify.com',
        key: '8efbd119747c632000b04ed68313abf1'
      },
      productId: 'gid://shopify/Product/7913032548543'
    }
  };

  const contentLandingPage = contentLandingPages[contentLandingPageId];

  if (!contentLandingPage) {
    throw new Error('Content Landing Page not found');
  }

  const product = await getProductById(contentLandingPage.store, contentLandingPage?.productId);
  return { ...contentLandingPage, product };
};

const CheckoutForm = () => {
  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-neutral-200 bg-white p-4">
      <form
        method="post"
        action="/591976448466620419?index"
        className="flex flex-col gap-3"
        data-discover="true"
      >
        <input type="hidden" name="merchantId" value="661e73b629bed4710b980666" />
        <input type="hidden" name="productId" value="661e7364a0ef532a3c61a4b2" />
        <input
          type="hidden"
          name="variantId"
          value="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80Nzg5MDc4NzYzMTM3OQ=="
        />
        <div className="flex gap-3">
          <div className="flex min-w-0 grow gap-3">
            <div className="shrink-0">
              <img
                alt=""
                className="size-12 rounded-sm bg-neutral-100 object-contain ring-1 ring-inset ring-black/5"
                src="https://cdn.shopify.com/s/files/1/0179/9331/files/Group378_96x96.png?v=1717536648"
              />
            </div>
            <div className="min-w-0 grow">
              <div className="truncate text-base/6 font-medium text-black group-hover/link:underline">
                The Shore Thing Chair
              </div>
              <div className="flex gap-x-1 text-sm/6 text-black">
                <span>$165.00</span>
                <span className="text-xs/6 line-through opacity-60">
                  <span className="sr-only">Compare at:</span>$183.00
                </span>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <select
              name="quantity"
              className="min-w-[44px] grow appearance-none rounded-md border-none bg-transparent px-3 py-2.5 text-center text-inherit text-neutral-700 ring-1 ring-neutral-200 [text-align-last:center] disabled:cursor-not-allowed disabled:opacity-40 data-[arrow]:bg-[url:--bg-down-arrow] data-[arrow]:bg-[length:1.25rem] data-[arrow]:bg-[right_0.5rem_center] data-[arrow]:bg-no-repeat data-[arrow]:pr-8 data-[arrow]:text-left data-[arrow]:[text-align-last:left]"
              data-arrow=""
              defaultValue="1"
            >
              {[...Array(50).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 *:min-w-0 *:basis-1">
          <button
            type="submit"
            className="relative inline-flex grow items-center justify-center gap-x-2 rounded-md bg-neutral-900 px-4 py-2.5 text-center text-base font-semibold text-white ring-1 ring-inset ring-black/5 transition-colors before:pointer-events-none before:absolute before:inset-0 before:rounded-md before:bg-current before:opacity-0 hover:before:opacity-10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to cart
          </button>
          <button
            className="bg-shoppay relative inline-flex h-11 grow items-center justify-center gap-x-2 rounded-md px-4 py-2.5 text-center text-base font-semibold text-white ring-1 ring-inset ring-black/5 transition-colors before:pointer-events-none before:absolute before:inset-0 before:rounded-md before:bg-current before:opacity-0 hover:before:opacity-10 disabled:cursor-not-allowed disabled:opacity-40"
            type="submit"
            name="intent"
            value="buy-with-shop-pay"
          >
            <svg width="137" height="19" viewBox="0 0 137 19" fill="currentColor">
              <path d="M80.4191 6.71069C79.8091 5.43119 78.6531 4.60469 76.9111 4.60469C76.3761 4.61409 75.8501 4.74609 75.3751 4.99069C74.8991 5.23529 74.4861 5.58579 74.1671 6.01539L74.1031 6.09279V1.07819C74.1031 1.04919 74.0921 1.02139 74.0711 1.00089C74.0511 0.980389 74.0231 0.968887 73.9941 0.968887H71.5311C71.5021 0.969387 71.4751 0.981189 71.4551 1.00159C71.4341 1.02199 71.4231 1.04949 71.4231 1.07819V15.4626C71.4231 15.491 71.4351 15.5183 71.4551 15.5385C71.4751 15.5586 71.5021 15.5699 71.5311 15.5699H74.1691C74.1981 15.5699 74.2251 15.5586 74.2461 15.5386C74.2661 15.5185 74.2781 15.4912 74.2781 15.4626V9.32929C74.2781 8.13729 75.0731 7.29289 76.3451 7.29289C77.7351 7.29289 78.0871 8.43729 78.0871 9.60349V15.4626C78.0871 15.491 78.0981 15.5183 78.1181 15.5385C78.1381 15.5586 78.1661 15.5699 78.1941 15.5699H80.8271C80.8551 15.5699 80.8831 15.5586 80.9031 15.5386C80.9241 15.5185 80.9351 15.4912 80.9361 15.4626V9.25379C80.9361 9.04129 80.9361 8.83259 80.9081 8.62999C80.8631 7.96589 80.6971 7.31559 80.4191 6.71069Z"></path>
              <path d="M67.2451 8.84238C67.2451 8.84238 65.9021 8.52648 65.4071 8.39928C64.9131 8.27208 64.0481 8.00188 64.0481 7.34828C64.0481 6.69458 64.7461 6.48598 65.4531 6.48598C66.1601 6.48598 66.9471 6.65688 67.0091 7.44168C67.0111 7.46988 67.0241 7.49628 67.0451 7.51538C67.0661 7.53448 67.0931 7.54508 67.1221 7.54498L69.7231 7.53498C69.7381 7.53508 69.7531 7.53198 69.7671 7.52588C69.7811 7.51978 69.7941 7.51088 69.8041 7.49968C69.8151 7.48848 69.8231 7.47528 69.8281 7.46088C69.8331 7.44638 69.8351 7.43108 69.8341 7.41578C69.6731 4.90448 67.4701 4.00648 65.4371 4.00648C63.0271 4.00648 61.2651 5.59588 61.2651 7.34828C61.2651 8.62778 61.6261 9.82778 64.4691 10.6623C64.9681 10.8073 65.6461 10.996 66.2381 11.1609C66.9491 11.3596 67.3321 11.6596 67.3321 12.1325C67.3321 12.6808 66.5381 13.0623 65.7571 13.0623C64.6261 13.0623 63.8241 12.6431 63.7581 11.8901C63.7551 11.8625 63.7411 11.8372 63.7211 11.8189C63.7001 11.8006 63.6731 11.7906 63.6451 11.7908L61.0501 11.8027C61.0351 11.8027 61.0201 11.8057 61.0061 11.8117C60.9921 11.8176 60.9791 11.8263 60.9691 11.8372C60.9581 11.8482 60.9501 11.8611 60.9441 11.8753C60.9391 11.8895 60.9361 11.9047 60.9371 11.9199C61.0561 14.2902 63.3451 15.5677 65.4791 15.5677C68.6581 15.5677 70.0941 13.7795 70.0941 12.1047C70.0981 11.3179 69.9171 9.52578 67.2451 8.84238Z"></path>
              <path d="M100.703 4.6007C99.3811 4.6007 98.2751 5.33179 97.5611 6.21399V4.704C97.5611 4.6759 97.5501 4.6489 97.5311 4.6288C97.5111 4.6088 97.4841 4.59719 97.4561 4.59669H94.9891C94.9601 4.59669 94.9331 4.608 94.9131 4.6281C94.8931 4.6482 94.8811 4.6755 94.8811 4.704V18.8103C94.8821 18.8384 94.8931 18.8651 94.9131 18.8848C94.9331 18.9045 94.9601 18.9156 94.9891 18.9156H97.6291C97.6571 18.9156 97.6841 18.9045 97.7031 18.8847C97.7231 18.865 97.7341 18.8382 97.7341 18.8103V14.1731H97.7741C98.1931 14.8128 99.3401 15.5797 100.838 15.5797C103.655 15.5797 106.003 13.2432 106.003 10.0862C106.005 7.0564 103.669 4.6007 100.703 4.6007ZM100.458 12.8916C99.9021 12.9054 99.3541 12.7532 98.8851 12.4544C98.4161 12.1555 98.0461 11.7237 97.8231 11.2139C97.6011 10.7041 97.5351 10.1395 97.6341 9.5921C97.7341 9.0448 97.9941 8.5395 98.3821 8.1407C98.7701 7.742 99.2681 7.468 99.8131 7.3535C100.357 7.2391 100.923 7.2894 101.439 7.4982C101.955 7.707 102.397 8.0647 102.708 8.5256C103.02 8.9866 103.187 9.5299 103.188 10.0862C103.194 10.4499 103.128 10.8111 102.993 11.1492C102.859 11.4872 102.66 11.7954 102.406 12.0561C102.152 12.3167 101.85 12.5247 101.515 12.6681C101.181 12.8115 100.822 12.8874 100.458 12.8916Z"></path>
              <path d="M87.0671 3.98109C84.6061 3.98109 83.3781 4.81749 82.3921 5.48709L82.3631 5.50699C82.3121 5.54169 82.2761 5.59439 82.2621 5.65449C82.2491 5.71449 82.2581 5.77749 82.2891 5.83079L83.2631 7.50769C83.2811 7.53899 83.3061 7.56599 83.3361 7.58659C83.3651 7.60719 83.4001 7.62099 83.4351 7.62689C83.4701 7.63319 83.5061 7.63169 83.5411 7.62239C83.5751 7.61309 83.6071 7.59629 83.6341 7.57319L83.7121 7.50959C84.2181 7.08449 85.0311 6.51629 86.9981 6.36129C88.0921 6.27389 89.0381 6.55999 89.7361 7.21159C90.5021 7.91889 90.9611 9.06129 90.9611 10.2673C90.9611 12.4866 89.6541 13.8813 87.5541 13.9091C85.8241 13.8992 84.6611 12.9972 84.6611 11.664C84.6611 10.9567 84.9811 10.4958 85.6051 10.0349C85.6531 10.0008 85.6861 9.95059 85.7001 9.89369C85.7131 9.83669 85.7061 9.77679 85.6781 9.72489L84.8041 8.07189C84.7881 8.04229 84.7661 8.01619 84.7401 7.99509C84.7141 7.97389 84.6841 7.95819 84.6511 7.94869C84.6181 7.93889 84.5831 7.93609 84.5491 7.94049C84.5151 7.94499 84.4821 7.95659 84.4531 7.97459C83.4711 8.55669 82.2671 9.62159 82.3331 11.668C82.4121 14.2727 84.5781 16.2615 87.3931 16.343H87.7271C91.0731 16.2337 93.4891 13.7502 93.4891 10.3826C93.4891 7.29109 91.2361 3.98109 87.0671 3.98109Z"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M111.449 1.00481H133.978C135.533 1.00481 136.793 2.26521 136.793 3.82011V16.1541C136.793 17.709 135.533 18.9694 133.978 18.9694H111.449C109.895 18.9694 108.634 17.709 108.634 16.1541V3.82011C108.634 2.26521 109.895 1.00481 111.449 1.00481ZM116.504 10.7738C118.383 10.7738 119.728 9.40291 119.728 7.48171C119.728 5.57041 118.383 4.19151 116.504 4.19151H113.186C113.146 4.19151 113.109 4.20721 113.081 4.23521C113.053 4.26311 113.037 4.30101 113.037 4.34051V13.446C113.037 13.4854 113.053 13.523 113.081 13.5508C113.109 13.5787 113.147 13.5945 113.186 13.595H114.434C114.473 13.595 114.511 13.5793 114.539 13.5514C114.567 13.5234 114.583 13.4855 114.583 13.446V10.9228C114.583 10.8833 114.598 10.8454 114.626 10.8174C114.654 10.7895 114.692 10.7738 114.732 10.7738H116.504ZM116.409 5.57431C117.43 5.57431 118.183 6.38101 118.183 7.48171C118.183 8.58431 117.43 9.38901 116.409 9.38901H114.732C114.692 9.38901 114.655 9.37361 114.627 9.34601C114.599 9.31851 114.583 9.28111 114.583 9.24201V5.72331C114.583 5.68401 114.599 5.64641 114.627 5.61851C114.655 5.59071 114.692 5.57481 114.732 5.57431H116.409ZM120.096 11.8487C120.083 11.5541 120.144 11.261 120.273 10.9959C120.402 10.7308 120.595 10.5022 120.835 10.3308C121.32 9.96721 122.071 9.77841 123.186 9.73471L124.368 9.69501V9.34531C124.368 8.64791 123.899 8.35191 123.146 8.35191C122.393 8.35191 121.918 8.61811 121.807 9.05321C121.798 9.08401 121.779 9.11091 121.753 9.12961C121.727 9.14831 121.696 9.15781 121.664 9.15661H120.497C120.476 9.15711 120.455 9.15291 120.435 9.14431C120.415 9.13571 120.398 9.12291 120.384 9.10681C120.369 9.09081 120.359 9.07171 120.353 9.05121C120.347 9.03061 120.345 9.00891 120.348 8.98771C120.523 7.95451 121.378 7.16981 123.199 7.16981C125.135 7.16981 125.832 8.06981 125.832 9.78841V13.4401C125.832 13.4598 125.829 13.4794 125.821 13.4977C125.814 13.516 125.803 13.5327 125.789 13.5467C125.775 13.5608 125.759 13.5719 125.74 13.5796C125.722 13.5872 125.703 13.5911 125.683 13.5911H124.505C124.485 13.5911 124.465 13.5872 124.447 13.5796C124.429 13.5719 124.413 13.5608 124.399 13.5467C124.385 13.5327 124.374 13.516 124.367 13.4977C124.359 13.4794 124.355 13.4598 124.356 13.4401V13.1679C124.358 13.144 124.352 13.1201 124.339 13.0998C124.327 13.0795 124.308 13.0638 124.285 13.0551C124.263 13.0464 124.238 13.0451 124.215 13.0515C124.192 13.0579 124.172 13.0715 124.157 13.0904C123.805 13.4739 123.233 13.752 122.321 13.752C120.984 13.756 120.096 13.0566 120.096 11.8487ZM124.368 10.7718L122.838 10.8513C122.031 10.893 121.56 11.2288 121.56 11.793C121.56 12.3036 121.991 12.5878 122.742 12.5878C123.764 12.5878 124.368 12.0354 124.368 11.0559V10.7718ZM127.016 15.2897V16.3526C127.014 16.3869 127.024 16.4209 127.044 16.449C127.063 16.4772 127.092 16.4978 127.125 16.5076C127.333 16.5642 127.548 16.5903 127.763 16.585C128.905 16.585 129.948 16.1678 130.544 14.5426L133.167 7.54711C133.175 7.52461 133.177 7.50061 133.173 7.47711C133.17 7.45371 133.161 7.43131 133.147 7.41201C133.133 7.39261 133.115 7.37681 133.094 7.36581C133.073 7.35471 133.05 7.34881 133.026 7.34841H131.804C131.772 7.34821 131.741 7.35801 131.716 7.37661C131.69 7.39521 131.671 7.42151 131.661 7.45171L130.217 11.8823C130.206 11.9113 130.186 11.9363 130.161 11.954C130.135 11.9716 130.105 11.9811 130.074 11.9811C130.043 11.9811 130.012 11.9716 129.987 11.954C129.961 11.9363 129.942 11.9113 129.931 11.8823L128.266 7.43981C128.255 7.41141 128.235 7.38691 128.21 7.36951C128.185 7.35221 128.155 7.34281 128.125 7.34251H126.932C126.909 7.34281 126.885 7.34871 126.864 7.35981C126.843 7.37081 126.825 7.38671 126.812 7.40601C126.798 7.42541 126.789 7.44771 126.785 7.47121C126.782 7.49471 126.784 7.51861 126.791 7.54111L129.243 13.8393C129.255 13.872 129.255 13.9079 129.243 13.9406L129.166 14.185C129.075 14.4882 128.886 14.7522 128.627 14.9349C128.369 15.1175 128.057 15.2082 127.741 15.1923C127.558 15.1921 127.375 15.1748 127.195 15.1406C127.173 15.1366 127.15 15.1373 127.129 15.1429C127.107 15.1485 127.087 15.1588 127.07 15.1731C127.053 15.1873 127.039 15.2051 127.03 15.2253C127.021 15.2454 127.016 15.2674 127.016 15.2897Z"
              ></path>
              <path d="M4.60541 14.9695C7.00411 14.9695 8.42611 13.7898 8.42611 11.8054C8.42611 10.3054 7.4411 9.2273 5.91 9.032V8.9695C6.9961 8.7742 7.8551 7.6804 7.8551 6.5086C7.8551 4.8211 6.5507 3.6961 4.621 3.6961H0.206909V14.9695H4.60541ZM1.6132 4.9383H4.3007C5.6679 4.9383 6.4335 5.5554 6.4335 6.6726C6.4335 7.8914 5.5272 8.5554 3.8632 8.5554H1.6132V4.9383ZM1.6132 13.7273V9.7664H4.2616C6.0585 9.7664 6.9801 10.4304 6.9801 11.7351C6.9801 13.0398 6.08971 13.7273 4.39441 13.7273H1.6132ZM16.3151 6.5476H14.9551V11.4383C14.9551 12.8836 14.1191 13.8367 12.7371 13.8367C11.4161 13.8367 10.7681 13.0945 10.7681 11.7117V6.5476H9.4081V11.9461C9.4081 13.8601 10.4791 15.0476 12.3221 15.0476C13.6121 15.0476 14.4791 14.5476 15.0021 13.5789H15.0331V14.9695H16.3151V6.5476ZM18.4851 18.0242C19.9771 18.0242 20.6491 17.4383 21.3681 15.4851L24.6651 6.5476H23.2351L20.8761 13.5867H20.8441L18.4851 6.5476H17.0401L20.1571 14.9773L19.9931 15.4773C19.6491 16.4929 19.2271 16.8679 18.4461 16.8679C18.2661 16.8679 18.0471 16.8523 17.8911 16.8211V17.9695C18.0551 18.0007 18.3131 18.0242 18.4851 18.0242ZM39.4661 6.5476H38.1221L36.4121 13.4304H36.3801L34.4511 6.5476H33.1381L31.2081 13.4304H31.1771L29.4661 6.5476H28.1221L30.4821 14.9695H31.8571L33.7791 8.4226H33.8101L35.7321 14.9695H37.1071L39.4661 6.5476ZM40.3011 14.9695H41.6601V6.5476H40.3011V14.9695ZM40.9801 5.1883C41.4571 5.1883 41.8401 4.7976 41.8401 4.3289C41.8401 3.8523 41.4571 3.4695 40.9801 3.4695C40.5111 3.4695 40.1211 3.8523 40.1211 4.3289C40.1211 4.7976 40.5111 5.1883 40.9801 5.1883ZM43.6271 4.6492V6.5476H42.4551V7.6726H43.6271V12.782C43.6271 14.3992 44.2211 15.032 45.7441 15.032C46.0651 15.032 46.4551 15.0007 46.6191 14.9617V13.8133C46.5261 13.8289 46.1971 13.8523 46.0331 13.8523C45.3151 13.8523 44.9861 13.5007 44.9861 12.7273V7.6726H46.6271V6.5476H44.9861V4.6492H43.6271ZM47.8131 14.9695H49.1721V10.1257C49.1721 8.6492 50.0471 7.6804 51.4691 7.6804C52.8051 7.6804 53.4851 8.4929 53.4851 9.8367V14.9695H54.8441V9.5945C54.8441 7.7195 53.7191 6.4695 51.8761 6.4695C50.5871 6.4695 49.7271 6.9617 49.2041 7.9148H49.1721V3.2039H47.8131V14.9695Z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="relative">
      <div className="width-full bg-banner-bg text-banner-text relative h-11 shrink-0 overflow-hidden truncate bg-white text-center text-sm/[2.75rem] font-medium tracking-tight text-black md:text-base/[2.75rem]">
        <div className="data-closed:opacity-0 motion-safe:data-enter:data-closed:translate-x-full motion-safe:data-leave:data-closed:-translate-x-full absolute inset-0 truncate px-1 transition duration-1000">
          Free ground shipping on orders over $250
        </div>
      </div>
      <div className="absolute inset-x-0 top-full z-10 flex items-center justify-between gap-x-4 bg-transparent px-4 py-3 text-sm text-white drop-shadow md:text-base">
        <a className="group/link text-white" data-discover="true" href="/591976448466620419">
          <div className="flex items-center gap-2">
            <div className="flex shrink-0 -space-x-3">
              <Image
                src={icon}
                alt="Dan Shank"
                className="inline-block size-8 rounded bg-neutral-100 object-cover"
                width={32}
                height={32}
              />
            </div>
            <span className="group-hover/link:underline">
              <strong className="whitespace-nowrap text-white">Dan Shanks Boards</strong>
            </span>
          </div>
        </a>
        <a className="group/link text-white" data-discover="true" href="/cart">
          <span className="text-white group-hover/link:underline">Cart</span>
        </a>
      </div>
    </div>
  );
};

const ShoreThingComponent = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[40%] flex flex-col items-center justify-end gap-3 bg-gradient-to-t from-black/90 p-4">
      <a className="group/link pointer-events-auto w-full" href="#content">
        <div className="flex w-full items-center gap-2 text-sm text-white transition-colors md:text-base">
          <div className="shrink-0">
            <img
              srcSet="https://cdn.shopify.com/s/files/1/0179/9331/files/Shore_Thing_48x48.png?v=1717536592, https://cdn.shopify.com/s/files/1/0179/9331/files/Shore_Thing_192x192.png?v=1717536592 2x, https://cdn.shopify.com/s/files/1/0179/9331/files/Shore_Thing_432x432.png?v=1717536592 3x"
              src="https://cdn.shopify.com/s/files/1/0179/9331/files/Shore_Thing_48x48.png?v=1717536592"
              className="size-12 rounded-sm bg-neutral-100 object-contain"
              alt="Shore Thing"
            />
          </div>
          <div className="flex min-w-0 grow flex-col gap-1 px-1">
            <div className="truncate group-hover/link:underline">The Shore Thing Chair</div>
            <div className="flex flex-wrap items-center justify-between gap-x-2 text-xs">
              <div className="flex gap-x-1">
                <span>From $110.00</span>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-x-[0.2em]">
                  <span className="flex items-center gap-x-[0.2em]" aria-label="4.4 stars">
                    4.4
                    <svg
                      aria-hidden="true"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="opacity-60" aria-label="34 reviews">
                    (34)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      <a className="group/link pointer-events-auto w-full" href="#content">
        <div className="flex flex-col items-center gap-1 text-sm font-medium text-white drop-shadow">
          <div className="[@media(hover:none)]:hidden">Scroll down to shop</div>
          <div className="animate-bounce">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="[@media(hover:hover)]:rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 9.74a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="[@media(hover:hover)]:hidden">Swipe up to shop</div>
        </div>
      </a>
    </div>
  );
};

export default async function Page({ params }: { params: { ContentLandingPage: string } }) {
  const instance = await lookupContentLandingPage(params.ContentLandingPage);

  if (!instance.product) {
    return <div>Product not found</div>;
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: instance.product.title,
    description: instance.product.description,
    image: instance.product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: instance.product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: instance.product.priceRange.minVariantPrice.currencyCode,
      highPrice: instance.product.priceRange.maxVariantPrice.amount,
      lowPrice: instance.product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      {/* <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}></Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex justify-end md:w-1/3">
           
          </div>
        </div>
      </nav> */}
      <Banner />
      <div className="relative flex min-h-0 grow flex-col">
        <div className="relative bg-black">
          <div className="relative">
            <video
              autoPlay={true}
              loop={true}
              playsInline={true}
              muted
              className="aspect-ratio-[9/16] max-h-[calc(100svh-2.75rem)] min-h-[24rem] w-full"
              disablePictureInPicture={true}
              src={contentReel}
            ></video>
          </div>
          <ShoreThingComponent />
        </div>
        <div className="content">
          <div className="mx-auto max-w-screen-2xl px-4">
            <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
              <div className="h-full w-full basis-full lg:basis-4/6">
                <Suspense
                  fallback={
                    <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
                  }
                >
                  <Gallery
                    images={instance.product.images.map((image: Image) => ({
                      src: image.url,
                      altText: image.altText
                    }))}
                  />
                </Suspense>
              </div>

              <div className="basis-full lg:basis-2/6">
                <ProductDescription product={instance.product} store={instance.store} />
              </div>
            </div>
            <RelatedProducts id={instance.product.id} store={instance.store} />
          </div>
          <Suspense fallback={<OpenCart />}>
            <Cart store={instance.store} />
          </Suspense>
          <CheckoutForm />
        </div>
      </div>
    </>
  );
}

async function RelatedProducts({ store, id }: { store: Store; id: string }) {
  const relatedProducts = await getProductRecommendations(store, id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`/product/${product.handle}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
