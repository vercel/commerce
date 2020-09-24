import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./Navbar.module.css";
import { Logo, Container } from "ui";
import { Avatar, Searchbar } from "components";
interface Props {
  className?: string;
  children?: any;
}

const Navbar: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);
  return (
    <div className={rootClassName}>
      <Container className={s.container}>
        <div className="flex flex-row h-full content-center">
          <Searchbar />
          <nav className="flex flex-row items-center px-3">
            All Clothes Accesories
          </nav>
        </div>
        <Logo />
        <nav>
          <Avatar />
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
