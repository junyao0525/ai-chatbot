import { cn } from "../lib/cn";

export type InputFieldProps = {
  placeholder?: string;
  className?: string;
};

export const InputField = ({
  placeholder = "Search",
  className,
}: InputFieldProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
      />
    </div>
  );
};
