import cn from "classnames";
import { FunctionComponent } from "react";
import s from "./Navbar.module.css";
import { Logo } from "ui";
interface Props {
  className?: string;
  children?: any;
}

const Navbar: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);
  return (
    <div className={rootClassName}>
      <Logo />
      <div>SEARCH BAR</div>
      <div>Menu list bar</div>
      <div>Menu Icon bar</div>
    </div>
  );
};

export default Navbar;
