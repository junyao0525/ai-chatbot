"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type DrawerContextValue = {
  isOpen: boolean;
  toggleDrawer: () => void;
  isSecondaryOpen: boolean;
  toggleSecondaryDrawer: () => void;
  isActiveItem: string;
  setIsActiveItem: (item: string) => void;
};

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const [isActiveItem, setIsActiveItem] = useState("Chat");

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const toggleSecondaryDrawer = () => setIsSecondaryOpen((prev) => !prev);

  const value = useMemo(
    () => ({
      isOpen,
      toggleDrawer,
      isSecondaryOpen,
      toggleSecondaryDrawer,
      isActiveItem,
      setIsActiveItem,
    }),
    [isOpen, isSecondaryOpen, isActiveItem]
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

export function useDrawer(): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return ctx;
}
