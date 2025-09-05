// chats/page.tsx
"use client";

import { useDrawer } from "@/app/(shared)/providers/drawerProvider";
import { Default } from "../../components/chat/default";
import { Input } from "../../components/chat/input/input";
import { HistoryDrawer } from "../../components/historyDrawer";
import DefaultLayout from "../layouts/default";

export default function Chats() {
  const { isOpen, isSecondaryOpen } = useDrawer();

  // adjust main margin depending on whether secondary drawer is open
  const className = isSecondaryOpen ? "ml-[240px]" : "ml-[180px]";

  return (
    <DefaultLayout
      title="Chats | Monica"
      description="Chat dashboard for Monica AI">
      <HistoryDrawer />
      <div
        className={`flex-1 ${
          isOpen ? "ml-[180px]" : isSecondaryOpen ? "ml-[60px]" : ""
        }`}>
        <div className={`flex flex-col min-h-screen ${className} relative`}>
          <div className="flex-1 px-[40px]">
            <Default />
          </div>

          <Input />
        </div>
      </div>
    </DefaultLayout>
  );
}
