import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';

import styles from './Footer.module.scss'; // Importing the SCSS module

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = styles.skeleton;
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div>
          <Link className={styles.logoLink} href="/">
            <LogoSquare size="sm" />
            <span className={styles.siteName}>{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className={styles.skeletonContainer}>
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className={styles.deployContainer}>
          <a
            className={styles.deployButton}
            aria-label="Deploy on Vercel"
            href="https://vercel.com/templates/next.js/nextjs-commerce"
          >
            <span className={styles.deployIcon}>▲</span>
            <hr className={styles.deployDivider} />
            <span className={styles.deployText}>Deploy</span>
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContainer}>
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className={styles.divider} />
          <p>Designed in California</p>
          <p className={styles.craftedBy}>
            <a href="https://vercel.com" className={styles.craftedByLink}>
              Crafted by ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
