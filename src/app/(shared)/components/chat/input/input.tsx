// components/chat/input/input.tsx
"use client";

import { useDrawer } from "@/app/(shared)/providers/drawerProvider";

export const Input = () => {
  const { isOpen, isSecondaryOpen } = useDrawer();

  const className = isOpen
    ? isSecondaryOpen
      ? "left-[420px]"
      : "left-[360px]"
    : isSecondaryOpen
    ? "left-[300px]"
    : "left-[180px]";

  return (
    <div
      className={`fixed bottom-0 right-0 ${className} bg-[var(--bg-primary)] px-[40px]`}>
      <div className="flex flex-col max-w-full mx-auto rounded-lg h-[180px] items-center focus:outline-none focus:ring-1 focus:ring-white">
        {/* model selection */}
        <div className="bg-[var(--bg-primary)] h-10 w-full">name</div>
        <div className="flex flex-col w-full rounded-lg border border-[var(--border-nav)] bg-[var(--bg-primary)] focus-within:ring-1 focus-within:ring-white">
          <textarea
            placeholder="Ask Me Question..."
            className="w-full h-20 px-4 pt-2 rounded-t-lg bg-transparent text-white focus:outline-none"
          />

          <div className="px-3 py-2 bg-[var(--bg-secondary)] text-white rounded-b-lg">
            name
          </div>
        </div>
      </div>
    </div>
  );
};
