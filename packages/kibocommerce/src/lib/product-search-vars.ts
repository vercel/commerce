function getFacetValueFilter(categoryCode: string, filters = []) {
    let facetValueFilter = '';
    if (categoryCode) {
      facetValueFilter = `categoryCode:${categoryCode},`;
    }
    return facetValueFilter + filters.join(',');
}

export const buildProductSearchVars = ({
  categoryCode = '',
  pageSize = 5,
  filters = {} as any,
  startIndex = 0,
  sort = '',
  search = '',
}) => {
  let facetTemplate = '';
  let filter = '';
  let sortBy;
  if (categoryCode) {
    facetTemplate = `categoryCode:${categoryCode}`;
    filter = `categoryCode req ${categoryCode}`;
  }
  const facetFilterList = Object.keys(filters).filter(k => filters[k].length).reduce((accum, k): any => {
    return [...accum, ...filters[k].map((facetValue: any) => `Tenant~${k}:${facetValue}`)];
  }, []);

  const facetValueFilter = getFacetValueFilter(categoryCode, facetFilterList);

  switch(sort) {
    case 'latest-desc':
      sortBy= 'createDate desc';
      break;
    case 'price-asc':
      sortBy= 'price asc';
      break;
    case 'price-desc':
      sortBy= 'price desc';
      break;
    case 'trending-desc':
    default:
      sortBy= '';
      break;
  }

  return {
    query: search,
    startIndex,
    pageSize,
    sortBy,
    filter: filter,
    facetTemplate,
    facetValueFilter
  }
}
