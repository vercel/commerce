export const gots = 'Global Organic Textile Standard';

const oeko = 'OEKO-TEX®'
export const oekoStandard = `${oeko} Standard 100`;
export const oekoEco = `${oeko} Eco Passport`;

export const peta = "PETA Approved Vegan";
export const fairWear = 'Fair Wear';
export const fsc = 'Forest Stewardship Council';

export const credentials = {
  gots: {
    title: gots,
    excerpt: 'Having one common standard means textile processors and manufacturers can export their fabrics and garments with one organic certification that is accepted in all major markets. This transparency also gives consumers the power to choose truly organic products sourced from green supply chains.',
    link: 'https://global-standard.org/the-standard',
  },
  oekoStandard: {
    title: oekoStandard,
    excerpt: 'If a textile article carries the STANDARD 100 label, you can be certain that every component of this article, i.e. every thread, button and other accessories, has been tested for harmful substances and that the article therefore is harmless for human health.',
    link: 'https://www.oeko-tex.com/en/our-standards/oeko-tex-standard-100',
  },
  oekoEco: {
    title: oekoEco,
    excerpt: 'The leather and textile chemicals certified in accordance with the ECO PASSPORT have been tested for harmful substances in critical concentrations as listed in the ECO PASSPORT standard. The label also gives transparent proof of which articles meet the criteria for ecologically responsible textile and leather manufacture.',
    link: 'https://www.oeko-tex.com/en/our-standards/oeko-tex-eco-passport',
  },
  peta: {
    title: peta,
    excerpt: 'Our “PETA-Approved Vegan” logo is a way of recognising these progressive compassionate businesses – and helping ethical consumers identify where to shop with confidence, safe in the knowledge that they’re not supporting the exploitation of animals.',
    link: 'https://www.peta.org.uk/living/peta-approved-vegan/',
  },
  fairWear: {
    title: fairWear,
    excerpt: 'Fair Wear was founded in 1999 with the ambitious mission to improve labour conditions in the garment industry. Progress has been made since then, but significant challenges remain. Now is the time to accelerate this progress and push the industry to a tipping point.',
    link: 'https://www.fairwear.org/about-us/get-to-know-fair-wear/',
  },
  fsc: {
    title: fsc,
    excerpt: 'FSC sets the standard for responsible forest stewardship... Our open and transparent standards include safeguards to ensure that stakeholders throughout the forest supply chain live up to the principles that protect healthy and resilient forests for all, forever.',
    link: 'https://fsc.org/en/fsc-standards',
  },
};

export const credentialsKeys = Object.keys(credentials);
