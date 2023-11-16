import Image from 'next/image';
import backgroundImage from '../images/home-page-02-sale-full-width.jpg';

const testimonials = [
  {
    id: 1,
    quote:
      'Min ordre ankom super hurtigt. Produktet er endnu bedre, end jeg havde håbet. Meget tilfreds kunde her!',
    attribution: 'Sarah Peters, New Orleans'
  },
  {
    id: 2,
    quote:
      'Jeg måtte returnere et køb, der ikke passede. Hele processen var så simpel, at jeg endte med at bestille to nye varer!',
    attribution: 'Kelly McPherson, Chicago'
  },
  {
    id: 3,
    quote:
      'Nu hvor jeg er på ferie for sommeren, vil jeg sandsynligvis bestille et par flere skjorter. Det er bare så bekvemt, og jeg ved, at kvaliteten altid vil være der.',
    attribution: 'Chris Paul, Phoenix'
  }
];

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Dekorativ baggrundsbillede og gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
          <Image
            width={500}
            height={200}
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover object-center"
            priority={true}
          />
        </div>
        <div className="absolute inset-0 bg-white bg-opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
      </div>

      {/* Tilbud */}
      <section
        aria-labelledby="tilbud-heading"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="tilbud-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Få 25% rabat under vores engangssalg
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
            De fleste af vores produkter er begrænsede udgivelser, som ikke kommer tilbage. Få dine
            yndlingsvarer, mens de er på lager.
          </p>
          <a
            href="#"
            className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Få adgang til vores engangssalg
          </a>
        </div>
      </section>

      {/* Anmeldelser */}
      <section
        aria-labelledby="anmeldelser-heading"
        className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 id="anmeldelser-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Hvad siger folk?
          </h2>

          <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="sm:flex lg:block">
                <svg
                  width={24}
                  height={18}
                  viewBox="0 0 24 18"
                  aria-hidden="true"
                  className="flex-shrink-0 text-gray-300"
                >
                  <path
                    d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                    fill="currentColor"
                  />
                </svg>
                <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                  <p className="text-lg text-gray-600">{testimonial.quote}</p>
                  <cite className="mt-4 block font-semibold not-italic text-gray-900">
                    {testimonial.attribution}
                  </cite>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
