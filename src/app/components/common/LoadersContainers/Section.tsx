import { type PropsWithChildren } from "react";

const SectLoaderContainer = (props: PropsWithChildren) => {
  return (
    <div className="flex h-[70vh] max-h-[100rem] min-h-[30rem] items-center justify-center p-8 sm:h-[50vh]">
      {props.children}
    </div>
  );
};

export default SectLoaderContainer;
