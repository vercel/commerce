import Image from 'next/image';

export async function ComingSoon() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const homepageItems = await getCollectionProducts({
  //   collection: 'hidden-homepage-featured-items'
  // });

  // if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  // const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="container mx-auto mb-12">
      <div className="mb-8 mt-2 flex w-full">
        <div className="basis-2/5 space-y-6 px-4">
          <h2 className="text-5xl">
            Welcome to <br />
            The Happy Ape
          </h2>
          <p className="my-4">&quot;Where joy meets compassion&quot;</p>
          <p>
            My name is Kevin, and I am a husabnd, father of 3, and have worked in the IT space over
            10 years. I have spent the last few years in what many refer to as web3. I`ve always had
            a passion for helping others. I was raised to treat others with kindness and compassion.
          </p>
          {/* tooltip:You the stuff about blockchains and crypto and those expensive jpeg images people are buying. */}
          <p>
            There are two goals I want to achieve. Improve mental health awareness for all ages, and
            help culture a world filled with more kindness and compassion.
          </p>
        </div>
        <div className="basis-3/5">
          <Image src={'/images/banner.png'} width={1000} height={1000} alt="banner"></Image>
        </div>
      </div>
      <div className="my-8 flex w-full p-4">
        <div className="basis-1/2"></div>
        <div className="basis-1/2 space-y-6">
          <h2 className="text-5xl">The Brand</h2>
          <p>
            We are a unique company dedicated to creating a world filled with kindness, love, and
            positive mental health for all ages. At The Happy Ape, we believe that cultivating these
            values is essential at every stage of life, and our diverse line of products aims to
            foster a culture of compassion and well-being for both children and adults.
          </p>
        </div>
      </div>
      <div className="my-8 flex w-full p-4">
        <div className="basis-1/2 space-y-6">
          <h2 className="text-5xl">Story Books</h2>
          <p>
            Immerse your yourself in the enchanting world of The Happy Ape with our delightful
            collection of story books. Each story is carefully crafted to not only entertain but
            also instill essential values of kindness, empathy, and understanding. Our authors and
            illustrators work collaboratively to create captivating narratives that encourage and
            inspire.
          </p>
        </div>
        <div className="basis-1/2"></div>
      </div>
      <div className="my-8 flex w-full p-4">
        <div className="basis-1/2"></div>
        <div className="basis-1/2 space-y-6">
          <h2 className="text-5xl">Plushies</h2>
          <p>
            Discover the warmth and comfort of The Happy Ape plushie, an adorable companion that
            serves as a reminder of the power of love and compassion. Each plushie is designed with
            meticulous attention to detail, ensuring they become cherished friends for individuals
            of all ages. These cuddly companions are not just toys; they are ambassadors of
            happiness and kindness, encouraging empathy and emotional well-being.
          </p>
        </div>
      </div>
      <div className="my-8 flex w-full p-4">
        <div className="basis-1/2 space-y-6">
          <h2 className="text-5xl">Clothing Line</h2>
          <p>
            Wrap yourself and loved ones in the embrace of positivity with our thoughtfully designed
            clothing line. From t-shirts adorned with inspiring messages to cozy hoodies that
            radiate warmth, The Happy Ape clothing collection not only keeps your children stylish
            but also spreads the message of love and mental health awareness. Our designs are not
            just fashion statements; they are expressions of a culture that values well-being and
            compassion.
          </p>
        </div>
        <div className="basis-1/2"></div>
      </div>

      <div className="my-8 flex w-full p-4">
        <div className="basis-1/2"></div>
        <div className="basis-1/2 space-y-6">
          <h2 className="text-5xl">Our Commitment</h2>
          <p>
            At The Happy Ape, our commitment is to positively impact the world by nurturing people
            of all ages with love, kindness, and a solid foundation in mental health. Join us on
            this journey of creating a brighter and happier future for all. Let The Happy Ape be
            your companion in cultivating thoughtful, compassionate, and mentally resilient
            individuals who contribute to making the world a better place, one person at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
