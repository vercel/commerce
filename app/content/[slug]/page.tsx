// app/content/[slug]/page.tsx

// Simulate fetching content (replace with actual CMS fetching later)
async function getContent(slug: string) {
  // In a real app, you'd fetch this from a CMS
  const allContent: { [key: string]: { title: string; body: string[] } } = {
    'about-us': {
      title: 'About Us',
      body: [
        'This is the about us page.',
        'We are a company that does things.'
      ]
    },
    'contact-us': {
      title: 'Contact Us',
      body: [
        'You can contact us via email or phone.',
        'Email: contact@example.com',
        'Phone: 123-456-7890'
      ]
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      body: [
        'This is our privacy policy.',
        'We respect your privacy and are committed to protecting your personal data.'
      ]
    }
  };
  // Ensure slug is a string before using it as an index
  return allContent[String(slug)] || null;
}

// Define an interface for the page's props, with params and searchParams as Promises
interface ContentPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ContentPage({ params, searchParams }: ContentPageProps) {
  // Await the params promise to get its value
  const resolvedParams = await params;
  // Await searchParams if you need to use them, e.g.:
  // const resolvedSearchParams = await searchParams;

  const content = await getContent(resolvedParams.slug);

  if (!content) {
    return <div>Content not found for {resolvedParams.slug}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{content.title}</h1>
      {content.body.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

// Optional: Generate static params still works the same way
// export async function generateStaticParams() {
//   return [{ slug: 'about-us' }, { slug: 'contact-us' }, { slug: 'privacy-policy' }];
// }
