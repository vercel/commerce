import './../../globals.css';

export const metadata = {
  title: `Studio | ${process.env.SITE_NAME}`,
  description: 'KM Storefront studio admin interface.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
