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
  return allContent[slug] || null;
}

export default async function ContentPage({ params }: { params: { slug: string } }) {
  const content = await getContent(params.slug);

  if (!content) {
    // Handle case where content is not found, e.g., by returning a 404 or a specific message
    return <div>Content not found for {params.slug}</div>;
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

// Optional: Generate static paths if you have a known set of content pages
// export async function generateStaticParams() {
//   return [{ slug: 'about-us' }, { slug: 'contact-us' }, { slug: 'privacy-policy' }];
// }
