import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { WsDexProvider } from "@/contexts/WsDexContext";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WsDexProvider>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </WsDexProvider>
  );
}
