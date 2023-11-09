import { type Bx, type PgStoreApi } from "./types";
import { type ReactNode } from "react";
import BordersContainer from "./BordersContainer";
import EditBoxModal from "./Modals/EditBox";

export default function BoxEditOverlay(props: {
  bxDeepLevel: number;
  bx: Bx;
  path: (string | number)[];
  pageStore: PgStoreApi;
  EditSideMenuChildren: ReactNode;
  ShowcaseBxChildren: ReactNode;
  // boundaryMultiType?: 'sm' | 'semi-md';
}) {
  return (
    <BordersContainer
      bxDeepLevel={props.bxDeepLevel}
      // boundaryMultiType={props.boundaryMultiType}
      Component={EditBoxModal}
      EditSideMenuChildren={props.EditSideMenuChildren}
      ShowcaseBxChildren={props.ShowcaseBxChildren}
    />
  );
}
