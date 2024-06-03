const { COMPANY_NAME, SITE_NAME } = process.env;

import Navbar from 'components/layout/navbar';
import Topbar from 'components/layout/topbar';

export default function Header() {
  return (
    <header className="responsivegrid aem-GridColumn aem-GridColumn--default--12 container">
      <Topbar />
      <Navbar />
    </header>
  );
}
