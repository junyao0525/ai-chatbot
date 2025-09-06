import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { cn } from "../lib/cn";

export type DropdownSelectorProps<T> = {
  selected: T;
  onSelect: (option: T) => void;
  options: readonly T[];
  show: boolean;
  toggle: () => void;
  containerClassName?: string;
  getKey: (opt: T) => string | number;
  getLabel?: (opt: T) => string;
  renderSelected: (opt: T) => React.ReactNode;
  renderOption: (opt: T) => React.ReactNode;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
};

export const DropdownSelector = <T,>({
  selected,
  onSelect,
  options,
  show,
  toggle,
  containerClassName,
  getKey,
  getLabel,
  renderSelected,
  renderOption,
  searchable,
  searchValue,
  onSearchChange,
  placeholder = "Select an option...",
}: DropdownSelectorProps<T>) => {
  const [internalSearch, setInternalSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onSearchChange) onSearchChange(val);
    else setInternalSearch(val);
  };

  const filterValue = searchValue ?? internalSearch;

  const filteredOptions = useMemo(() => {
    if (!searchable || !filterValue) return options;
    const lower = filterValue.toLowerCase();
    return options.filter((opt) =>
      (getLabel ? getLabel(opt) : String(opt)).toLowerCase().includes(lower)
    );
  }, [options, filterValue, searchable, getLabel]);

  return (
    <div className={cn("relative inline-block w-64", containerClassName)}>
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-2 shadow-sm hover:bg-gray-50">
        <div>{renderSelected(selected)}</div>
        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
      </button>

      {show && (
        <div className="absolute z-10 mt-2 w-full rounded-2xl border bg-white shadow-lg">
          {searchable && (
            <div className="p-2">
              <input
                type="text"
                value={filterValue}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring"
              />
            </div>
          )}

          <ul className="max-h-60 overflow-y-auto p-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={getKey(opt)}
                  className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    onSelect(opt);
                    toggle();
                  }}>
                  {renderOption(opt)}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
