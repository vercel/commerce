import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./Searchbar.module.css";

interface Props {
  className?: string;
  children?: any;
}

const Searchbar: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);
  return (
    <div className={rootClassName}>
      <div className="flex-1 flex justify-between px-2">
        <div className="flex-1 flex">
          <form className="w-full flex md:mr-0" action="#">
            <label htmlFor="search_field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-600 focus-within:text-gray-600">
              <input
                id="search_field"
                className="block w-full h-full pr-12 pl-3 py-2 rounded-md  bg-gray-200 text-gray-900 placeholder-gray-600 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                placeholder="Search"
                type="search"
              />
              <div className="absolute inset-y-0 right-0 mr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
