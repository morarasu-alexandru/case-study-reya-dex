import type { ReactNode } from "react";

interface MainProps {
  children?: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="flex-1 flex items-center justify-center text-reya-gray bg-reya-cod-gray">
      {children ?? "Main"}
    </main>
  );
};
