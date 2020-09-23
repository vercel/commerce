import cn from "classnames";
import { FunctionComponent } from "react";
import s from "./Featurebar.module.css";

interface Props {
  className?: string;
  children?: any;
}

const Featurebar: FunctionComponent<Props> = ({ children, className }) => {
  const rootClassName = cn(s.root, className);
  return <div className={rootClassName}>{children}</div>;
};

export default Featurebar;
