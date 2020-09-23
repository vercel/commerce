import cn from "classnames";
import { FunctionComponent } from "react";
import s from "./Navbar.module.css";

interface Props {
  className?: string;
  children?: any;
}

const Navbar: FunctionComponent<Props> = ({ children, className }) => {
  const rootClassName = cn(s.root, className);
  return <div className={rootClassName}>{children}</div>;
};

export default Navbar;
