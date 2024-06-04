import Link from 'next/link';

const Footer = () => (
  <footer>
    <div>
      <ul>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/newsroom">Newsroom</Link>
        </li>
        <li>
          <Link href="/careers">Careers</Link>
        </li>
        <li>
          <Link href="/investors">Investors</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/lab">Labs</Link>
        </li>
        <li>
          <Link href="/test-results">Test Results</Link>
        </li>
        <li>
          <Link href="/all-patient">All Patient</Link>
        </li>
        <li>
          <Link href="/all-provider">All Provider</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/suppliers">Suppliers & Vendors</Link>
        </li>
        <li>
          <Link href="/hsnpa">HSNPA Notice</Link>
        </li>
        <li>
          <Link href="/privacy-practices">Privacy Practices</Link>
        </li>
        <li>
          <Link href="/no-surprises">No Surprises Act</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/biopharma">Biopharma</Link>
        </li>
        <li>
          <Link href="/drug-testing">Drug Testing</Link>
        </li>
        <li>
          <Link href="/paternity-testing">Paternity Testing</Link>
        </li>
        <li>
          <Link href="/health-testing">Health Testing</Link>
        </li>
      </ul>
    </div>
    <div>
      <p>&copy; 2024 Labcorp</p>
    </div>
  </footer>
);

export default Footer;
