import { LeftDrawer } from "@/components/leftDrawer";
import { ModelDrawer } from "@/components/modalDrawer";
import { DrawerProvider } from "@/providers/drawerProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DrawerProvider>
      <div className="flex min-h-screen overflow-hidden">
        <LeftDrawer />
        <ModelDrawer />
        <main className="flex-1 ml-[180px] transition-all duration-300 ease-in-out overflow-hidden">
          {children}
        </main>
      </div>
    </DrawerProvider>
  );
}
