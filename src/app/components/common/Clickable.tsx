"use client";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import Link from "next/link";

type SharedProps = {
  className?: string | ((clickableType: ClickableTypes) => string);
};

export type ButtonProps = {
  isA?: "button";
  href?: never;
} & SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;
export type NextJsLinkProps = { isA: "next-js" } & SharedProps &
  Omit<Parameters<typeof Link>[0], "className">;
export type BasicAnchor = {
  isA?: "basic-link";
  href: string;
} & SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export type ClickableProps = ButtonProps | NextJsLinkProps | BasicAnchor;

export type ClickableTypes = "button" | "next-js" | "basic-link";

// const isAnAnchorProps = (
// 	props: Record<string, any>,
// 	isA?: string
// ): props is Parameters<typeof Link>[0] =>
// 	(typeof isA === 'string' && ['next-js', 'basic-link'].includes(isA)) ||
// 	!!('href' in props);

const isANextJSAnchorProps = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
  isA?: string,
): props is Parameters<typeof Link>[0] => isA === "next-js"; // typeof props.href === 'string' &&

const isABasicAnchorProps = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
  isA?: string,
): props is AnchorHTMLAttributes<HTMLAnchorElement> =>
  isA === "basic-link" ||
  !!(
    typeof props.href === "string" &&
    (!props.href.startsWith("/") ||
      (props.href.startsWith("//") &&
        !(props.href.startsWith("//next") || props.href.startsWith("//_next"))))
  );
const isAButtonProps = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
  isA?: string,
): props is ButtonHTMLAttributes<HTMLButtonElement> =>
  !props.href || isA === "button";

const handleClassName = (options: {
  className: ClickableProps["className"];
  clickableType: ClickableTypes;
}) => {
  if (typeof options.className === "function")
    return options.className(options.clickableType);
  return options.className;
};

const Clickable = ({ isA, className, ...props }: ClickableProps) => {
  if (props.href) {
    if (isABasicAnchorProps(props, isA))
      return (
        <a
          rel="noopener noreferrer"
          target="_blank"
          {...props}
          className={handleClassName({
            className,
            clickableType: "basic-link",
          })}
        />
      );

    return (
      <Link
        {...(props as Parameters<typeof Link>[0])}
        className={handleClassName({ className, clickableType: "next-js" })}
      />
    );
  }

  return (
    <BasicButton
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={handleClassName({ className, clickableType: "button" })}
    />
  );
};

export default Clickable;

const BasicButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props} />
);
