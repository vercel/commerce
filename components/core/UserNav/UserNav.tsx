import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./UserNav.module.css";
import { Avatar } from "@components/core";
import { Heart, Bag } from "@components/icon";
import { useUI } from "@components/ui/context";

interface Props {
  className?: string;
}

const UserNav: FunctionComponent<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className);
  const { openSidebar } = useUI();

  return (
    <nav className={rootClassName}>
      <ul className={s.list}>
        <li className={s.item}>
          <Bag onClick={openSidebar} />
        </li>
        <li className={s.item}>
          <Heart />
        </li>
        <li className={s.item}>
          <Avatar />
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
