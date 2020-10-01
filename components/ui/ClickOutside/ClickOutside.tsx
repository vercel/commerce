import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import { findDOMNode } from "react-dom";

export interface ClickOutsideProps {
  onClickOutside: (e?: MouseEvent) => void;
  children: React.ReactNode | any;
}

const ClickOutside: FunctionComponent<ClickOutsideProps> = ({
  children,
  onClickOutside,
}) => {
  let node = useRef(null);

  const handleClick = (e: MouseEvent) => {
    console.log("eeee");
    if (!e || !node.current.contains(e.target as HTMLInputElement)) {
      console.log("eeee");
      // onClickOutside && onClickOutside(e);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return children;
};

export default ClickOutside;
