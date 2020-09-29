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
        <div className={s.container}>
          <input className={s.input} placeholder="Search for products..." />
          <div className={s.iconContainer}>
            <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
