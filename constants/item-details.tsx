export const cotton100 = '100% organic cotton';
const print = 'water based ink print on back'

const heavy = 'heavy'
const standard = 'standard'

const relaxed = 'relaxed'
const oversized = 'oversized'
const medium = 'medium'

const unisex = 'unisex'

const branding = 'subtle brand label on front hem'
const creation = 'ethically and sustainably made'

export type GarmentDetailContent = {
  title: string;
  content: string;
  weight: {
    feel: string;
    gsm: number;
  };
  fit: string;
  print: string;
  common: {
    style: string;
    branding: string;
    creation: string;
  };
}

const garmentTypes = {
  tshirt: 'T-Shirt',
  sweat: 'Crew Neck Sweatshirt',
  hoodie: 'Hoodie',
}

const commonDetails = {
  print,
  common: {
    branding,
    style: unisex,
    creation,
  }
}

const tshirt = {
  title: garmentTypes.tshirt,
  content: cotton100,
  weight: {
    feel: heavy,
    gsm: 250,
  },
  fit: relaxed,
  ...commonDetails,
};

const crew = {
  title: garmentTypes.sweat,
  content: cotton100,
  weight: {
    feel: heavy,
    gsm: 500,
  },
  fit: relaxed,
  ...commonDetails,
};

const cropCrew = {
  title: `Crop ${garmentTypes.sweat}`,
  content: cotton100,
  weight: {
    feel: standard,
    gsm: 300,
  },
  fit: medium,
  ...commonDetails,
};

const cropT = {
  title: `Crop ${garmentTypes.tshirt}`,
  content: cotton100,
  weight: {
    feel: standard,
    gsm: 155,
  },
  fit: oversized,
  ...commonDetails,
};

const hoodie = {
  title: garmentTypes.hoodie,
  content: cotton100,
  weight: {
    feel: heavy,
    gsm: 500,
  },
  fit: relaxed,
  ...commonDetails,
};

const zipHoodie = {
  title: `Zipped ${garmentTypes.hoodie}`,
  content: cotton100,
  weight: {
    feel: heavy,
    gsm: 500,
  },
  fit: relaxed,
  ...commonDetails,
};

export const productTypes: {[productTypeName: string]: GarmentDetailContent} = {
  tshirt,
  crew,
  cropCrew,
  cropT,
  hoodie,
  zipHoodie,
};
