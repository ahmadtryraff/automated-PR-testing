import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';

type Option = { value: string; label: string };

type SelectFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  required?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  value,
  onValueChange,
  options,
  placeholder,
  icon,
  label,
  required,
}) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-medium mb-1">
      {label}
      {required && <span className="text-[#EF4F54] ml-1">*</span>}
    </label>
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className="flex items-center w-full px-4 py-3 min-h-[56px] bg-white border border-[#EBEBEB] rounded-[10px] focus:outline-none gap-2"
      >
        {icon}
        <span className={`flex-1 text-base font-medium text-left ${!value ? 'text-gray-400' : 'text-gray-900'}`}>
          {options.find(opt => opt.value === value)?.label || placeholder}
        </span>
        <ChevronDownIcon className="w-5 h-5 text-gray-900" style={{ marginRight: '-2px' }} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          side="bottom"
          align="start"
          className="bg-white border border-[#EBEBEB] rounded-[10px] shadow-lg z-50 min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)]"
        >
          <Select.Viewport>
            {options.map((opt, idx) => (
              <React.Fragment key={opt.value}>
                <Select.Item
                  value={opt.value}
                  className={`
                    flex items-center px-4 py-2 cursor-pointer
                    text-base h-[48px] transition-colors duration-150
                    hover:bg-gray-100
                    data-[highlighted]:bg-gray-100 data-[highlighted]:text-[#E05B5B]
                    data-[state=checked]:font-semibold
                    outline-none
                  `}
                >
                  <span className="flex-1 truncate font-medium">{opt.label}</span>
                </Select.Item>
                {idx < options.length - 1 && (
                  <div className="border-t border-[#EBEBEB]" />
                )}
              </React.Fragment>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>
);

export default SelectField;