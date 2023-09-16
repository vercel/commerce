import { getMenu } from 'commerce/shopify';

export const getTags = async ({ product }) => {
    const typesMenu = await getMenu('types-nav');

    const types = typesMenu?.map(item => /search\/(\w+)/.exec(item?.path)?.[1]);
    const tags = product?.collections?.nodes
        ?.map(col => col?.title)
        ?.filter(col => types?.includes(col?.toLowerCase()));

    return tags;
};

export const listTags = ({ tags }) => `(${tags.join(', ')})`;
