"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import { useDrawer } from "../providers/drawerProvider";
import { Divider } from "./divider";
import CustomSwitch from "./switch";

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

export const chatHistory: ChatHistoryItem[] = [
  {
    id: "1",
    title: "Learn Tailwind Basics",
    timestamp: "2025-09-01 10:24 AM",
  },
  {
    id: "2",
    title: "Build a React Drawer Component",
    timestamp: "2025-09-01 3:41 PM",
  },
  {
    id: "3",
    title: "Discuss AI Project Ideas",
    timestamp: "2025-08-30 8:15 PM",
  },
  {
    id: "4",
    title: "Debugging Next.js App",
    timestamp: "2025-08-29 11:02 AM",
  },
  {
    id: "5",
    title: "Optimize SQL Queries",
    timestamp: "2025-08-27 9:30 AM",
  },
];

export const HistoryDrawer = () => {
  const { isOpen, isSecondaryOpen, toggleSecondaryDrawer, isActiveItem } =
    useDrawer();
  const drawerRef = useRef<HTMLElement>(null);
  const [checked, setChecked] = useState(false);

  return (
    <nav
      ref={drawerRef}
      className={`
        fixed inset-y-0 z-[40] 
        ${isOpen ? "start-[180px]" : "start-[60px]"}
        ${
          isSecondaryOpen
            ? "w-[250px] shadow-xl border-r-[0.5px] border-[#3c3c3c]"
            : ""
        } 
        ${isActiveItem === "Chat" ? "block" : "hidden"}
        overflow-y-auto 
        pt-4 bg-[var(--bg-primary)] px-3 pb-2
      `}>
      {/* Header */}
      <div className="flex flex-row w-full items-center justify-between pl-2">
        {isSecondaryOpen && (
          <>
            <span className="text-[var(--text-primary)] text-xl font-bold ">
              Chat
            </span>
          </>
        )}

        <div className="border-r-[0.5px] border-[#3c3c3c] h-8 flex-1"></div>

        <button
          className="cursor-pointer p-2"
          onClick={toggleSecondaryDrawer}>
          <Icon
            icon="icon-park-outline:list-bottom"
            className="w-4 h-4 dark:text-[var(--text-primary)] text-[#f9fafb]"
          />
        </button>
      </div>

      {isSecondaryOpen && (
        <>
          {/* Menu Items (example only) */}
          <div className="flex flex-col pt-4 gap-2">
            <div className="flex flex-col gap-2">
              <button
                key={"chat"}
                onClick={() => {}}
                className="flex rounded-md transition-colors cursor-pointer hover:bg-blue-500 p-2 gap-2">
                <Icon
                  icon={"ri:chat-new-fill"}
                  className={`w-5 h-5 text-[var(--text-primary)] `}
                />
                <span
                  className={`
                          transition-all
                          text-[var(--text-primary)] text-sm font-medium
                        `}>
                  New Chat
                </span>
              </button>
              <button
                key={"dualChat"}
                onClick={() => {}}
                className="flex rounded-md transition-colors cursor-pointer hover:bg-blue-500 p-2 gap-2">
                <Icon
                  icon={"fluent:dual-screen-group-20-regular"}
                  className={`w-5 h-5 text-[var(--text-primary)] `}
                />
                <span
                  className={`
                          transition-all
                          text-[var(--text-primary)] text-sm font-medium
                        `}>
                  Dual Chat
                </span>
                <CustomSwitch
                  uniqueId="dualChat"
                  checked={checked}
                  onChange={setChecked}
                  className="ml-auto"
                />
              </button>
            </div>
          </div>

          <Divider className="border-[#3c3c3c] dark:border-[#3c3c3c]" />

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-row items-center p-2 pb-2">
              <span className="text-[var(--text-primary)] text-sm font-medium ">
                Recent Chats
              </span>

              <Icon
                icon="heroicons-outline:dots-horizontal"
                className="w-5 h-5 dark:text-[var(--text-primary)] text-[#f9fafb] ml-auto cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-1">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="flex items-center justify-between rounded-md p-2 hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="truncate text-[var(--text-primary)] text-sm">
                    {chat.title}
                  </span>
                  <Icon
                    icon="mdi:chevron-right"
                    className="w-4 h-4 text-[var(--text-primary)]"
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
