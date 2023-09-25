import { type Box, type PageStoreApi } from "./types";
import { type ReactNode } from "react";
import BordersContainer from "./BordersContainer";
import EditBoxModal from "./Modals/EditBox";

export default function BoxEditOverlay(props: {
  boxDeepLevel: number;
  box: Box;
  path: (string | number)[];
  pageStore: PageStoreApi;
  EditSideMenuChildren: ReactNode;
  ShowcaseBoxChildren: ReactNode;
  // boundaryMultiType?: 'sm' | 'semi-md';
}) {
  return (
    <BordersContainer
      boxDeepLevel={props.boxDeepLevel}
      // boundaryMultiType={props.boundaryMultiType}
      Component={EditBoxModal}
      EditSideMenuChildren={props.EditSideMenuChildren}
      ShowcaseBoxChildren={props.ShowcaseBoxChildren}
    />
  );
}
