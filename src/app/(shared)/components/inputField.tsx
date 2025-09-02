import { Icon } from "@iconify/react";
import { cn } from "../lib/cn";

export type InputFieldProps = {
  placeholder?: string;
  className?: string;
  placeholderClassName?: string;
  icon?: string; // iconify icon name
  iconClassName?: string;
};

export const InputField = ({
  placeholder = "Search",
  className,
  placeholderClassName,
  icon,
  iconClassName,
}: InputFieldProps) => {
  return (
    <div className="relative w-full">
      {icon && (
        <Icon
          icon={icon}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none",
            iconClassName
          )}
          width={18}
          height={18}
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full p-2 border border-[var(--border-light)] dark:border-[var(--border-dark)] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent",
          icon ? "pl-10" : "", // padding left for icon
          placeholderClassName && `placeholder:${placeholderClassName}`,
          className
        )}
      />
    </div>
  );
};
