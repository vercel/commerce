import Image from 'next/image';
import Tag from '../tag';

const { SITE_NAME } = process.env;
const WhyChoose = () => {
  return (
    <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-5 lg:gap-y-0">
      <div className="col-span-1 flex flex-col gap-3">
        <Tag text="Benefits" />
        <h3 className="text-3xl font-semibold lg:text-4xl">Why choose {SITE_NAME}?</h3>
      </div>
      <div className="col-span-1 grid grid-cols-subgrid gap-x-6 gap-y-12 lg:col-span-4">
        <div className="col-span-1 flex lg:col-span-2">
          <Image
            src="/icons/team.png"
            alt="Team"
            width={60}
            height={60}
            className="h-[60px] w-[60px]"
          />
          <div className="mx-3 h-[100px] min-w-0.5 bg-gray-200" />
          <div className="ml-2 flex flex-col gap-3">
            <h4 className="text-xl font-medium text-blue-800">Advanced Team</h4>
            <p className="text-justify leading-6 text-blue-200">
              We specialize in procuring high-quality used transmissions and engines as well as
              remanufactured engines and transmissions for the majority of truck and car makes and
              models. Whatever components you might need to repair or upgrade your vehicle, our
              advanced team of customer support specialists, sales leads, and automotive gurus can
              help you source the perfect quality engine or transmission for your needs.
            </p>
          </div>
        </div>
        <div className="col-span-1 flex lg:col-span-2">
          <Image
            src="/icons/customer-support.png"
            alt="Customer Support"
            width={60}
            height={60}
            className="h-[60px] w-[60px]"
          />
          <div className="mx-3 h-[100px] min-w-0.5 bg-gray-200" />
          <div className="ml-2 flex flex-col gap-3">
            <h4 className="text-xl font-medium text-blue-800">Customer Support Staff</h4>
            <p className="text-justify leading-6 text-blue-200">
              With more than 20 years of experience providing support to our customers, our
              representatives have deep knowledge about all aspects of vehicles. We will quickly
              help you locate the exact compatible engine or transmission you need and get it to
              your commercial or residential address quickly. Our customer service team undergoes
              extensive training so that no matter what your problem is, we can fix it.
            </p>
          </div>
        </div>
        <div className="col-span-1 flex lg:col-span-2">
          <Image
            src="/icons/replacement.png"
            alt="Replacement Process"
            width={60}
            height={60}
            className="h-[60px] w-[60px]"
          />
          <div className="mx-3 h-[100px] min-w-0.5 bg-gray-200" />
          <div className="ml-2 flex flex-col gap-3">
            <h4 className="text-xl font-medium text-blue-800">Replacement Process</h4>
            <p className="text-justify leading-6 text-blue-200">
              Car Part Planet is a partner with the most prominent automotive parts manufacturers
              and suppliers. The advanced online catalog we’ve created to support the customers of
              Car Part Planet is what you will use to find your exact part. Simply by using our
              Search Tool, you can find the exact engine or transmission swap for your ride. You can
              shop our smart catalog 24/7, no matter what time zone you’re in, for sourcing anything
              from a complete transmission replacement to a completely rebuilt engine, all at
              low-cost prices.
            </p>
          </div>
        </div>
        <div className="col-span-1 flex lg:col-span-2">
          <Image
            src="/icons/shipping.png"
            alt="Fast Shipping & Exclusive Warranty"
            width={60}
            height={60}
            className="h-[60px] w-[60px]"
          />
          <div className="mx-3 h-[100px] min-w-0.5 bg-gray-200" />
          <div className="ml-2 flex flex-col gap-3">
            <h4 className="text-xl font-medium text-blue-800">
              Fast Shipping & Exclusive Warranty
            </h4>
            <p className="text-justify leading-6 text-blue-200">
              We can offer great prices because we operate more efficiently as an online retailer,
              so we pass this benefit to you with fast flat-rate shipping straight to your
              commercial or residential address when you order with us. You deserve proper coverage
              for your purchases from Car Part Planet, which is why we are proud to offer unlimited
              mile warranty protection for up to five years, depending on what you purchase. Give us
              a call today to discuss the details about our outstanding warranty terms or check out
              our designated warranty page for complete information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
