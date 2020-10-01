import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./Navbar.module.css";
import { Logo, Container } from "@components/ui";
import { Avatar, Searchbar } from "@components/core";
import { Heart, Bag } from "@components/icon";
import { useUI } from "@components/ui/context";
interface Props {
  className?: string;
  children?: any;
}

const Navbar: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);
  const { openSidebar } = useUI();

  return (
    <Container className={rootClassName}>
      <Logo />
      <div className="flex flex-row h-full content-center flex-1">
        <Searchbar />
        <nav className="hidden flex-row items-center px-3 lg:flex">
          <a className="pr-4">All</a>
          <a className="pr-4">Clothes</a>
          <a>Accesories</a>
        </nav>
      </div>
      <nav className="flex flex-row items-center">
        <Bag className="mr-6" onClick={openSidebar} />
        <Heart className="mr-6" />
        <Avatar />
      </nav>
    </Container>
  );
};

export default Navbar;
