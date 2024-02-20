export async function ComingSoon() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const homepageItems = await getCollectionProducts({
  //   collection: 'hidden-homepage-featured-items'
  // });

  // if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  // const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="container mx-auto mb-12">
      <p className="my-4 text-center text-4xl">Coming Soon...</p>
      <div className="my-8 flex w-full flex-col items-center gap-y-4">
        <div className="w-full indent-4 sm:w-1/2">
          <span className="text-xl">Welcome to The Happy Ape</span>, where joy meets compassion! We
          are a unique company dedicated to creating a world filled with kindness, love, and
          positive mental health for all ages. At The Happy Ape, we believe that cultivating these
          values is essential at every stage of life, and our diverse line of products aims to
          foster a culture of compassion and well-being for both children and adults.
        </div>
        <div className="w-full indent-4 sm:w-1/2">
          Immerse your little ones in the enchanting world of The Happy Ape with our delightful
          collection of kids` books. Each story is carefully crafted to not only entertain but also
          instill essential values of kindness, empathy, and understanding. Our authors and
          illustrators work collaboratively to create captivating narratives that captivate young
          minds and encourage positive behavior.
        </div>
        <div className="w-full indent-4 sm:w-1/2">
          Discover the warmth and comfort of The Happy Ape plushy toys – adorable companions that
          serve as reminders of the power of love and compassion. Each plushy is designed with
          meticulous attention to detail, ensuring they become cherished friends for individuals of
          all ages. These cuddly companions are not just toys; they are ambassadors of happiness and
          kindness, encouraging empathy and emotional well-being.
        </div>
        <div className="w-full indent-4 sm:w-1/2">
          Wrap yourself and loved ones in the embrace of positivity with our thoughtfully designed
          clothing line. From t-shirts adorned with inspiring messages to cozy hoodies that radiate
          warmth, The Happy Ape clothing collection not only keeps your children stylish but also
          spreads the message of love and mental health awareness. Our designs are not just fashion
          statements; they are expressions of a culture that values well-being and compassion.
        </div>
        <div className="w-full indent-4 sm:w-1/2">
          At The Happy Ape, our commitment is to positively impact the world by nurturing people of
          all ages with love, kindness, and a solid foundation in mental health. Join us on this
          journey of creating a brighter and happier future for all. Let The Happy Ape be your
          companion in cultivating thoughtful, compassionate, and mentally resilient individuals who
          contribute to making the world a better place, one person at a time.
        </div>
      </div>
    </section>
  );
}
