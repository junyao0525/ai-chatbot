// components/rightSidebar/RightSidebar.tsx
import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
  title?: string;
  children: React.ReactNode;
}

export default function RightDrawer({
  isOpen,
  onClose,
  size = "md",
  title = "",
  children,
}: RightDrawerProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Overlay click handler
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Drawer width classes
  const getWidthClasses = () => {
    const baseClasses = "w-full"; // Always full width on mobile

    switch (size) {
      case "lg":
        return `${baseClasses} md:w-[80%]`;
      case "sm":
        return `${baseClasses} md:w-[40%] lg:w-[25%]`;
      default: // md
        return `${baseClasses} md:w-[50%]`;
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1200] bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        ref={ref}
        className={`fixed end-0 top-0 z-[1201] h-full border bg-[var(--bg-primary)] shadow-lg transition-transform duration-300 border-[var(--border-nav)]
          ${getWidthClasses()}
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}>
        <div className="flex items-center justify-between border-b border-[var(--border-nav)] p-4">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 transition-colors hover:bg-muted-100 hover:text-red-500 dark:hover:bg-muted-800"
            aria-label="Close sidebar">
            <Icon
              icon="lucide:x"
              width={20}
              height={20}
              className="sm:hidden text-[var(--text-primary)]"
            />
            <Icon
              icon="lucide:arrow-right"
              width={20}
              height={20}
              className="hidden sm:block text-[var(--text-primary)]"
            />
          </button>
        </div>

        <div className="h-[calc(100%-73px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  );
}
