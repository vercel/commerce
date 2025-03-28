import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for any questions or inquiries.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8 text-5xl font-bold">Contact Us</h1>
      <div className="prose max-w-none">
        <p>
          We'd love to hear from you. Please fill out the form below or contact
          us using the information provided.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <ul className="list-none space-y-2">
            <li>Email: info@linconson.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: Your Business Address</li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
          <ul className="list-none space-y-2">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 10:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
