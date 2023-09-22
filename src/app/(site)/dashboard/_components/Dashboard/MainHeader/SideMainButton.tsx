"use client";

import { FaBars } from "react-icons/fa";
import { useStore } from "zustand";
import { dashboardStore } from "../utils";

export default function SideMainButton() {
  const setMenuIsOpen = useStore(
    dashboardStore,
    (store) => store.utils.setMenuIsOpen,
  );

  return (
    <button type="button" onClick={() => setMenuIsOpen("sideMain", true)}>
      <FaBars className="text-2xl" />
    </button>
  );
}
