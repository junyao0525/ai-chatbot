"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type DrawerContextValue = {
  isOpen: boolean;
  toggleDrawer: () => void;
  isModelOpen: boolean;
  toggleModelDrawer: () => void;
  isActiveItem: string;
  setIsActiveItem: (item: string) => void;
};

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [isActiveItem, setIsActiveItem] = useState<string>("Chat");

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const toggleModelDrawer = () => setIsModelOpen((prev) => !prev);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        toggleDrawer,
        isModelOpen,
        toggleModelDrawer,
        isActiveItem,
        setIsActiveItem,
      }}>
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawer = (): DrawerContextValue => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return ctx;
};

export default useDrawer;
