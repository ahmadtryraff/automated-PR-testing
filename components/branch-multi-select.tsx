import React, { useState, useRef } from 'react';

type BranchMultiSelectProps = {
  options: string[];
  value: string[];
  onChange: (branches: string[]) => void;
  placeholder?: string;
};

const BranchMultiSelect: React.FC<BranchMultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select branches ...',
}) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only show unselected branches in dropdown
  const filteredOptions = options.filter(opt => !value.includes(opt));

  return (
    <div
      className="relative w-full"
      tabIndex={0}
      onBlur={() => setTimeout(() => setOpen(false), 100)}
    >
      <div
        className="flex flex-row-reverse flex-wrap items-center gap-2 bg-white w-full px-4 py-3 min-h-[56px] border border-[#EBEBEB] rounded-[10px] cursor-text"
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        {/* Chips (right to left) */}
        {value.slice().reverse().map(branch => (
          <span
            key={branch}
            className="flex items-center gap-1 bg-gray-100 rounded px-3 py-1 text-base text-gray-800"
          >
            {branch}
            <button
              type="button"
              className="ml-1 text-gray-400 hover:text-red-400"
              onClick={e => {
                e.stopPropagation();
                onChange(value.filter(b => b !== branch));
              }}
              aria-label="Remove"
            >
              ×
            </button>
          </span>
        ))}
        {/* Input for focus/keyboard */}
        <input
          ref={inputRef}
          className="flex-1 min-w-[120px] border-none outline-none text-base bg-transparent placeholder:text-gray-400"
          placeholder={value.length === 0 ? placeholder : ''}
          onFocus={() => setOpen(true)}
          readOnly
        />
      </div>
      {/* Dropdown */}
      {open && filteredOptions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-[#EBEBEB] rounded-[10px] shadow-lg z-10 max-h-60 overflow-auto">
          {filteredOptions.map(branch => (
            <div
              key={branch}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-base"
              onClick={() => {
                onChange([...value, branch]);
                setOpen(false);
              }}
            >
              {branch}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BranchMultiSelect; 