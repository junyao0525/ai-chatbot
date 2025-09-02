import { HistoryDrawer } from "@/app/(shared)/components/historyDrawer";
import { LeftDrawer } from "@/components/leftDrawer";
import { DrawerProvider } from "@/providers/drawerProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DrawerProvider>
      <div className="flex min-h-screen overflow-hidden">
        <LeftDrawer />
        <HistoryDrawer />
        <main className="flex-1 ml-[180px] transition-all duration-300 ease-in-out overflow-hidden">
          {children}
        </main>
      </div>
    </DrawerProvider>
  );
}
