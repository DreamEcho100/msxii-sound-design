import { cx } from "class-variance-authority";
import Link from "next/link";

type Props = {
  href: string;
  linkClassName?: string;
};

export default function SeeMoreSlideChildren(props: Props) {
  return (
    <div className="isolate flex h-full w-full items-center justify-center">
      <Link
        href={props.href}
        className={cx(
          "relative flex aspect-square h-24 w-24 items-center justify-center rounded-full bg-special-primary-200 font-semibold capitalize",
          props.linkClassName,
        )}
      >
        see more
        <div
          className="absolute inset-0 -z-10 h-full w-full animate-ping rounded-full"
          style={{
            animationDuration: "5s",
            background:
              "radial-gradient(rgba(var(--color-special-primary-600) / var(--tw-bg-opacity, 1)), rgba(var(--color-special-primary-200) / var(--tw-bg-opacity, 1)))",
          }}
        />
      </Link>
    </div>
  );
}
