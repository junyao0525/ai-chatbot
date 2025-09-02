import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 ml-[400px] transition-all duration-300 ease-in-out overflow-hidden">
      {children}
    </main>
  );
}
