import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";
import s from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "filled" | "outlined" | "flat" | "none";
  active?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export default class Button extends React.Component<Props> {
  public render() {
    const {
      className,
      variant = "filled",
      children,
      disabled = false,
      href,
      active,
      ...rest
    } = this.props;

    let Component: React.ComponentType<
      React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> &
        React.ClassAttributes<HTMLButtonElement | HTMLAnchorElement>
    > = "a" as any;

    // Catch for buttons / span / stc.

    const rootClassName = cn(
      s.root,
      {
        [s.filled]: variant === "filled",
      },
      className
    );

    return (
      <Component
        className={rootClassName}
        disabled={disabled}
        href={href}
        aria-pressed={active}
        data-variant={variant}
        {...rest}
      >
        <svg
          className="-ml-1 mr-3 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        {children}
      </Component>
    );
  }
}
