import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./Navbar.module.css";
import { Logo, Container } from "ui";
interface Props {
  className?: string;
  children?: any;
}

const Navbar: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);
  return (
    <div className={rootClassName}>
      <Container className={s.container}>
        <Logo />
        <div>SEARCH BAR</div>
        <div>Menu list bar</div>
        <div>Menu Icon bar</div>
      </Container>
    </div>
  );
};

export default Navbar;
