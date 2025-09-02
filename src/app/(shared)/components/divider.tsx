"use client";

import clsx from "clsx";
import React from "react";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className,
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={clsx("h-full border-l border-gray-700 mx-2", className)}
      />
    );
  }

  return (
    <div className={clsx("w-full border-t border-gray-700 my-2", className)} />
  );
};
