import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import Link from "next/link";

export type ButtonProps = {
  isA?: "button";
  href?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;
export type NextJsLinkProps = { isA: "next-js" } & Omit<
  Parameters<typeof Link>[0],
  "className"
>;
export type BasicAnchor = {
  isA?: "basic-link";
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export type ClickablesProps = ButtonProps | NextJsLinkProps | BasicAnchor;

export type ClickableTypes = "button" | "next-js" | "basic-link";

type Props = {
  className: string | ((clickableType: ClickableTypes) => string);
} & ClickablesProps;

const isAnAnchorProps = (
  props: Record<string, any>,
  isA?: string
): props is Parameters<typeof Link>[0] =>
  (typeof isA === "string" && ["next-js", "basic-link"].includes(isA)) ||
  !!("href" in props);

const isANextJSAnchorProps = (
  props: Record<string, any>,
  isA?: string
): props is Parameters<typeof Link>[0] => isA === "next-js";

const isABasicAnchorProps = (
  props: Record<string, any>,
  isA?: string
): props is AnchorHTMLAttributes<HTMLAnchorElement> =>
  isA === "basic-link" ||
  !!(typeof props.href === "string" && props.href.startsWith("/"));
const isAButtonProps = (
  props: Record<string, any>,
  isA?: string
): props is ButtonHTMLAttributes<HTMLButtonElement> =>
  !props.href || isA === "button";

const handleClassName = (oprions: {
  className: Props["className"];
  clickableType: ClickableTypes;
}) => {
  if (typeof oprions.className === "function")
    return oprions.className(oprions.clickableType);
  return oprions.className;
};

const Clickable = ({ isA, className, ...props }: Props) => {
  if (isAButtonProps(props, isA))
    return (
      <BasicButton
        {...props}
        className={handleClassName({ className, clickableType: "button" })}
      />
    );

  if (isABasicAnchorProps(props, isA))
    return (
      <a
        rel="noopener noreferrer"
        {...props}
        className={handleClassName({ className, clickableType: "basic-link" })}
      />
    );

  if (isANextJSAnchorProps(props, isA))
    return (
      <Link
        {...props}
        className={handleClassName({ className, clickableType: "next-js" })}
      />
    );

  throw new Error(
    "Invalid properties passed:" + JSON.stringify(props, null, 2)
  );
};

export default Clickable;

const BasicButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props} />
);
