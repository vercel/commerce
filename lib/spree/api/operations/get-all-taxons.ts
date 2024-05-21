import _ from 'lodash';
import type { ITaxons, TaxonAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Taxon';
import type { SpreeSdkVariables } from '../../types';

const taxonsSort = (spreeTaxon1: TaxonAttr, spreeTaxon2: TaxonAttr): number => {
  const { left: left1, right: right1 } = spreeTaxon1.attributes;
  const { left: left2, right: right2 } = spreeTaxon2.attributes;

  if (right1 < left2) {
    return -1;
  }

  if (right2 < left1) {
    return 1;
  }

  return 0;
};

const buildTaxonsTree = (taxons: TaxonAttr[], parentId: string | number): TaxonAttr[] => {
  const children = _.chain(taxons)
    .filter((item) => {
      const relationships = item.relationships || {};
      return parentId === _.get(relationships, 'parent.data.id');
    })
    .sort(taxonsSort)
    .value();

  return children.map((child) => ({
    id: child.id,
    name: child.attributes.name,
    type: child.type,
    position: child.attributes.position,
    children: buildTaxonsTree(taxons, child.id)
  }));
};

export default function getAllTaxonsOperation({ commerce, locale }) {
  async function getAllTaxons(options = {}) {
    const { config: userConfig } = options;

    const config = commerce.getConfig(userConfig);

    const { fetch: apiFetch } = config;

    const variables: SpreeSdkVariables = {
      methodPath: 'taxons.list',
      arguments: [
        {
          locale: config.locale
        }
      ]
    };

    const { data: spreeSuccessResponse } = await apiFetch('__UNUSED__', { variables });

    const normalizedTaxons = buildTaxonsTree(spreeSuccessResponse.data, '1');

    return { taxons: normalizedTaxons };
  }

  return getAllTaxons;
}
