import React from "react";
import { cn } from "../lib/cn";

interface ToggleProps {
  uniqueId: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const CustomSwitch: React.FC<ToggleProps> = ({
  uniqueId,
  checked,
  onChange,
  className,
}) => {
  return (
    <label
      className={cn(
        "relative inline-flex cursor-pointer items-center",
        className
      )}
      data-uniqueid={uniqueId}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <div
        className="
          h-[18px] w-[36px]
          rounded-full bg-gray-400
          transition-colors
          duration-300 peer-checked:bg-green-500
          peer-focus:ring-2 peer-focus:ring-green-300
        "></div>
      <span
        className="
          absolute left-[3px] top-[3px]
          h-[14px] w-[14px]
          rounded-full bg-white
          transition-transform duration-300
          peer-checked:translate-x-[18px]
        "></span>
    </label>
  );
};

export default CustomSwitch;
