"use client";
import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-left"
      autoClose={7500}
      newestOnTop={true}
      closeButton
      closeOnClick={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
