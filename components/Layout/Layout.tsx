import cn from "classnames";
import React, { FunctionComponent } from "react";
import s from "./Layout.module.css";
import { Navbar, Featurebar } from "components";
import { Container } from "ui";

interface Props {
  className?: string;
  children?: any;
}

const Layout: FunctionComponent<Props> = ({ className, children }) => {
  const rootClassName = cn(s.root, className);
  return (
    <Container className={rootClassName}>
      <Featurebar
        title="Free Standard Shipping on orders over $99.99"
        description="Due to COVID-19, some orders may experience processing and delivery delays."
      />
      <Navbar />
      <main className="h-screen">{children}</main>
    </Container>
  );
};

export default Layout;
