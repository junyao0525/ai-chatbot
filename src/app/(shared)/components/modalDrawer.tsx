"use client";
import useDrawer from "@/providers/drawerProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";

export const ModelDrawer = () => {
  const { isOpen, isModelOpen, toggleModelDrawer, isActive } = useDrawer();
  const drawerRef = useRef<HTMLElement>(null);

  return (
    <nav
      ref={drawerRef}
      className={`
        fixed inset-y-0 z-[39] 
        ${isOpen ? "start-[180px]" : "start-[60px]"}
        ${isModelOpen ? "w-[250px] shadow-xl" : ""} 
        ${isActive === "Chat" ? "block" : "hidden"}
        overflow-y-auto transition-all duration-300 ease-in-out 
        bg-white pt-4 dark:bg-[#233]
      `}>
      {/* Header */}
      <div className="fixed flex flex-col items-center gap-2 pl-2">
        <button
          className="cursor-pointer p-2"
          onClick={toggleModelDrawer}>
          <Icon
            icon="icon-park-outline:list-bottom"
            className="w-4 h-4 dark:text-white"
          />
        </button>
      </div>

      {/* Menu Items (example only) */}
      <div className="flex flex-col pt-10 gap-2"></div>
    </nav>
  );
};
