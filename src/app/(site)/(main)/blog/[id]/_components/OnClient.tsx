"use client";

import { useEffect } from "react";

function OnClient() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const articleContentAnchors = document.querySelectorAll(
      "#article-content a",
    ) as unknown as HTMLAnchorElement[];

    articleContentAnchors.forEach((item) => {
      item.target = "_blank";
    });
  }, []);

  return <></>;
}

export default OnClient;
