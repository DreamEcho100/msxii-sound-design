"use client";
import { cx } from "class-variance-authority";
import { type HTMLAttributes, useState } from "react";
import CustomNextImage from "../../common/CustomNextImage";
import { type QuoteBx } from "~/libs/utils/types/custom-page";

export default function Quote({
  bx,
  ...props
}: HTMLAttributes<HTMLDivElement> & { bx: QuoteBx }) {
  const TEXT_MAX_LENGTH = 150;
  const isTextLong = bx.content.length > TEXT_MAX_LENGTH;

  const [isFullTextActive, setIsFullTextActive] = useState(!isTextLong);

  return (
    <div {...props} className={cx(props.className, "group")}>
      <CustomNextImage
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${bx.cite}`}
        alt={bx.cite}
        width={150}
        height={150}
        className="relative left-0 h-16 w-16 -translate-x-2/3 rounded-full"
      />
      <div className="-ml-8 flex flex-col pt-2">
        <cite>
          <strong
            className={cx(
              "text-[75%] font-semibold text-text-primary-500",
              "group-focus-within:text-special-primary-600 group-hover:text-special-primary-600",
              "group-focus-within:text-special-primary-400 group-hover:text-special-primary-400",
            )}
          >
            {bx.cite}
          </strong>
        </cite>
        <q className="flex-grow text-[70%] font-medium">
          <pre
            className="inline whitespace-pre-wrap"
            style={{ fontFamily: "inherit" }}
          >
            {isFullTextActive
              ? bx.content
              : bx.content.slice(0, TEXT_MAX_LENGTH)}
          </pre>
          {isTextLong && (
            <>
              {isFullTextActive ? (
                <>&nbsp;&nbsp;&nbsp;&nbsp;</>
              ) : (
                <>...&nbsp;</>
              )}
              <button
                className={cx(
                  "text-[90%] capitalize",
                  "text-special-primary-800 hover:text-special-primary-600 focus:text-special-primary-600",
                  "dark:text-special-primary-600 dark:hover:text-special-primary-400 dark:focus:text-special-primary-400",
                )}
                type="button"
                onClick={() => setIsFullTextActive((prev) => !prev)}
              >
                <strong className="font-semibold">
                  <em>see {isFullTextActive ? "less" : "more"}</em>
                </strong>
              </button>
            </>
          )}
        </q>
      </div>
    </div>
  );
}
