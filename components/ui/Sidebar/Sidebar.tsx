import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./Sidebar.module.css";

interface Props {
  className?: string;
  children?: any;
}

const Sidebar: FunctionComponent<Props> = ({ className, children }) => {
  const rootClassName = cn(s.root, className);
  return (
    <div className={rootClassName}>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 ">
            <div className="w-screen max-w-2xl">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
