const cotton100 = '100% organic cotton';
const print = 'water based ink print on back'

const heavy = 'heavy'
const standard = 'standard'

const relaxed = 'relaxed'
const oversized = 'oversized'
const medium = 'medium'

const unisex = 'unisex'

const branding = `${cotton100} brand label`

export type GarmentDetailContent = {
  title: string;
  content: string;
  weight: {
    feel: string;
    gsm: number;
  };
  fit: string;
  style: string;
  print: string;
  branding: string;
}

const garmentTypes = {
  tshirt: 'T-Shirt',
  sweat: 'Crew Neck Sweatshirt',
  hoodie: 'Hoodie',
}

const commonDetails = {
  style: unisex,
  print,
  branding,
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
