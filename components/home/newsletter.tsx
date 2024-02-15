export default function Newsletter() {
  return (
    <div className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-lg px-6 text-center lg:px-8">
        <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <h2 className="inline max-w-xl sm:block">Want product news and updates?</h2>{' '}
          <p className="inline sm:block">Sign up for our newsletter.</p>
        </div>
        <form className="mt-10 max-w-xl">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-0-fern_green-600 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-0-fern_green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-0-fern_green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-0-fern_green-600"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-900">
            We care about your data. Read our{' '}
            <a href="#" className="font-semibold text-0-fern_green-600 hover:text-0-fern_green-500">
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
