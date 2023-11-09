import { type PropsWithChildren } from "react";

const PageLoaderContainer = (props: PropsWithChildren) => {
  return (
    <div className="flex h-screen items-center justify-center p-8">
      {props.children}
    </div>
  );
};

export default PageLoaderContainer;
