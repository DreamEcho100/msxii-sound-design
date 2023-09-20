"use client";
import { cx } from "class-variance-authority";
import React, { useState } from "react";

type Props = {
  TEXT_MAX_LENGTH?: number;
  content: string;
};

export default function TextTruncateManager(props: Props) {
  const TEXT_MAX_LENGTH = props.TEXT_MAX_LENGTH ?? 150;
  const isTextLong = props.content.length > TEXT_MAX_LENGTH;

  const [isFullTextActive, setIsFullTextActive] = useState(!isTextLong);

  return (
    <>
      <pre
        className="inline whitespace-pre-wrap"
        style={{ fontFamily: "inherit" }}
      >
        {isFullTextActive
          ? props.content
          : props.content.slice(0, TEXT_MAX_LENGTH)}
      </pre>
      {isTextLong && (
        <>
          {isFullTextActive ? <>&nbsp;&nbsp;&nbsp;&nbsp;</> : <>...&nbsp;</>}
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
    </>
  );
}
