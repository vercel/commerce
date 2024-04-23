import { getProduct } from 'lib/shopify';
import { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb-list';

type BreadcrumbProps = {
  type: 'product' | 'collection';
  handle: string;
};

const BreadcrumbComponent = async ({ type, handle }: BreadcrumbProps) => {
  const items: Array<{ href: string; title: string }> = [{ href: '/', title: 'Home' }];

  if (type === 'product') {
    const product = await getProduct(handle);
    if (!product) return null;
    const collection = product?.collections.nodes.length ? product.collections.nodes[0] : null;

    if (collection) {
      items.push({
        href: `/search/${collection.handle}`,
        title: collection.title
      });
    }

    items.push({
      title: product.title,
      href: `/product/${product.handle}`
    });
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.slice(0, items.length).map((item, index) => (
          <Fragment key={item.href}>
            {index === items.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
