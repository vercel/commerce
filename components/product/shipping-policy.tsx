import DisclosureSection from './disclosure-section';

const { SITE_NAME } = process.env;
const ShippingPolicy = () => {
  return (
    <DisclosureSection title="Shipping & returns">
      <p>
        At {SITE_NAME}, we offer a Flat Rate Shipping (Commercial address) service as long as the
        delivery address is in a commercially zoned location. Unfortunately, residential and home
        businesses are not considered commercial addresses. A business or commercial address
        location must be able to receive freight without the requirement of prior appointment setup
        or notification. This location should also have the capability of unloading the
        remanufactured transmission with a forklift from the delivery truck. If you don&apos;t have
        a commercial or business address that meets these specifications, you should ship it
        directly to the dealership or repair shop that is performing the repairs to ensure you enjoy
        Flat Rate Shipping (Commercial address). Residential delivery or Liftgate service will
        result in additional $99 fee.
      </p>
      <p className="my-3">
        After placing the order for a remanufactured transmission, most customers will receive it
        within 7-14 business days — not including holidays or weekends. Please keep in mind that
        certain locations (remote areas) and locations in Colorado, Utah, New York, Oregon, and
        California may require an additional delivery fee. In either case, we will always ship your
        remanufactured transmission out as soon as possible. Because of weather conditions,
        increasing order volumes, and conditions outside of our control, all shipping times are
        estimates, not guarantees. It&apos;s important to note that {SITE_NAME} will not be liable
        for any extra fees the carrier may levy due to storage or redelivery. While every
        transmission from {SITE_NAME} has been rigorously inspected and tested prior to being
        shipped, damage may occur during transportation.
      </p>
      <p>
        As such, we strongly suggest you carefully inspect your transmission upon receipt. If you
        notice any missing parts, wrong parts, or damage, you should report it prior to signing any
        delivery documentation. It&quot;s imperative to report missing parts, damage, or wrong parts
        at the time of delivery. If you fail to do so prior to signing your shipping documents,
        responsibility will be placed on the purchaser or receiver. For clarity,
        &quot;purchaser&quot; refers to any representative of the company designated to sign for the
        delivery of the remanufactured transmission.
      </p>
    </DisclosureSection>
  );
};

export default ShippingPolicy;
