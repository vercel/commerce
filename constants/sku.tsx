export const baseArtworkNumber = '000';

export const sizes = [ 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl' ];

export const garmentTypes = {
  tshirt: 'tshirt' as const,
  cropT: 'cropT' as const,
  hoodie: 'hoodie' as const,
  zipHood: 'zipHood' as const,
  crew: 'crew' as const,
  cropCrew: 'cropCrew' as const,
};

export const garmentHandleKeys = {
  'T-shirt': garmentTypes.tshirt,
  'Crop T-shirt': garmentTypes.cropT,
  'Hoodie': garmentTypes.hoodie,
  'Zipped Hoodie': garmentTypes.zipHood,
  'Crew Neck Sweatshirt': garmentTypes.crew,
  'Cropped Crew Neck Sweatshirt': garmentTypes.cropCrew,
};

const xsTo2xl = sizes.slice(1, 7);

export const garmentSizes = {
  [garmentTypes.tshirt]: sizes,
  [garmentTypes.cropT]: xsTo2xl,
  [garmentTypes.hoodie]: sizes,
  [garmentTypes.zipHood]: sizes,
  [garmentTypes.crew]: xsTo2xl,
  [garmentTypes.cropCrew]: xsTo2xl,
};

export const garmentSKUs = {
  [garmentTypes.tshirt]: 'STTU788',
  [garmentTypes.cropT]: 'STTW089',
  [garmentTypes.hoodie]: 'STSU867',
  [garmentTypes.zipHood]: 'STSU953',
  [garmentTypes.crew]: 'STSU886',
  [garmentTypes.cropCrew]: 'STSW873',
};

export const colorSKUs = {
  black: 'C002'
};

export const collectionsSKUs = {
  'flower': 1,
  'foliage': 2,
  'nature': 3,
  'sky': 4,
  'urban': 5,
};

export const customisationSKUs = {
  printArea: 'B',
  tags: 'NT'
};

export const sizeSKUs = {
  xxs: 'XXS',
  xs: 'XS',
  s: 'S',
  m: 'M',
  l: 'L',
  xl: 'XL',
  xxl: '2XL',
  xxxl: '3XL',
};

