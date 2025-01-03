'use client';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
export default function Bread() {
  const paths: { name: string; href: string }[] = [];
  const currentPath = usePathname();
  if (currentPath !== '/') {
    currentPath.split('/').map((path) => {
      if (path.length === 0) {
        paths.push({
          name: 'Home',
          href: '/'
        });
      } else {
        const pathName = path.charAt(0).toUpperCase() + path.slice(1);
        paths.push({
          name: pathName,
          href: `/${path}`
        });
      }
    });
  }

  return (
    <>
      {paths.length > 0 && (
        <Breadcrumbs className="p-4">
          {paths.map((path) => (
            <BreadcrumbItem key={path.name} href={path.href}>
              {path.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      )}
    </>
  );
}
