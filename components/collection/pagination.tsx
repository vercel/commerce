'use client'

import ReactPaginate from 'react-paginate';
import { createUrl } from 'lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ itemsPerPage, itemsTotal, currentPage }: { itemsPerPage: number, itemsTotal: number, currentPage: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentParams = useSearchParams();
  const q = currentParams.get('q');
  const sort = currentParams.get('sort');
  const pageCount = Math.ceil(itemsTotal / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: clickEvent) => {
    const page = event.selected;
    const newPage = page + 1;
    let newUrl = createUrl(pathname, new URLSearchParams({
      ...(q && { q }),
      ...(sort && { sort }),
    }));
    if (page !== 0) {
      newUrl = createUrl(pathname, new URLSearchParams({
        ...(q && { q }),
        ...(sort && { sort }),
        page: newPage.toString(),
      }));
    }
    router.replace(newUrl);
  };

  return (
    <>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        initialPage={currentPage}
        pageCount={pageCount}
        breakLabel="..."
        nextLabel=">>"
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="inline sm:flex text-base h-10 mx-auto"
        activeClassName="active"
        pageClassName="m-2 sm:m-0 sm:mx-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white [&.active]:bg-gray-100"
        pageLinkClassName="flex items-center justify-center px-4 h-10 ml-0 leading-tight"
        previousClassName="m-2 sm:m-0 sm:mx-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white [&.disabled]:hidden"
        previousLinkClassName="flex items-center justify-center px-4 h-10 ml-0 leading-tight"
        nextClassName="m-2 sm:m-0 sm:mx-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white [&.disabled]:hidden"
        nextLinkClassName="flex items-center justify-center px-4 h-10 ml-0 leading-tight"
        breakClassName="m-2 sm:m-0 sm:mx-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        breakLinkClassName="flex items-center justify-center px-4 h-10 ml-0 leading-tight"
      />
    </>
  );
}

type clickEvent = {
  index: number | null;
  selected: number;
  nextSelectedPage: number | undefined;
  event: object;
  isPrevious: boolean;
  isNext: boolean;
  isBreak: boolean;
  isActive: boolean;
}