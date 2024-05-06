import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from './breadcrumb-list';

const BreadcrumbHome = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbHome;
