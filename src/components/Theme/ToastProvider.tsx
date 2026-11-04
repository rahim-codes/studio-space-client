"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

export function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
