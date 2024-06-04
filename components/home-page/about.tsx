import Image from 'next/image';
import ButtonLink from './button-link';
import Tag from './tag';

const About = () => {
  return (
    <div className="grid grid-cols-1 items-start gap-x-0 gap-y-10 lg:grid-cols-2 lg:gap-x-10">
      <div className="col-span-1">
        <Image
          src="/about.png"
          alt="About Us"
          sizes="(min-width: 1920px) 588px, (min-width: 770px) 50vw, 100vw"
          width={588}
          height={405}
          className="w-full object-contain"
        />
      </div>
      <div className="flex h-full flex-col justify-between pb-2">
        <div className="mb-3 flex flex-col gap-3">
          <Tag text="About Us" />
          <h3 className="text-3xl font-semibold lg:text-4xl">Engine & Transmission Experts</h3>
          <p className="leading-6 text-slate-500">
            {`Car Part Planet is your ultimate destination for all your drivetrain replacement needs.
            Whether you're searching for a used engine, a remanufactured engine, a used
            transmission, a remanufactured transmission, or seeking expert drivetrain fitment
            guidance for your DIY replacement project, we've got you covered.`}
          </p>
          <p className="leading-6 text-slate-500">
            Our dedicated team is committed to sourcing top-quality parts at affordable prices for a
            wide range of gasoline and diesel vehicles, including those from American, Japanese, and
            various other manufacturers. Our extensive inventory includes popular engines and
            transmissions for GM, Chevrolet, Dodge, Ford, Chrysler, Jeep, Nissan, Toyota, Honda, and
            many other manufacturers.
          </p>
        </div>
        <ButtonLink link={{ text: 'Learn More', url: '/about' }} />
      </div>
    </div>
  );
};

export default About;
