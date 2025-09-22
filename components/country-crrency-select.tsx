import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';

type CountryCurrency = {
  name: string;
  code: string;
  symbol: string;
  flag: string;
};

type Props = {
  value?: string; // currency code
  onChange: (currency: CountryCurrency) => void;
};

const CountryCurrencySelect: React.FC<Props> = ({ value, onChange }) => {
  const [options, setOptions] = useState<CountryCurrency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,currencies,flags')
      .then(res => res.json())
      .then(data => {
        const opts: CountryCurrency[] = [];
        data.forEach((country: any) => {
          if (country.currencies) {
            Object.entries(country.currencies).forEach(([code, cur]: any) => {
              opts.push({
                name: country.name.common,
                code,
                symbol: cur.symbol || code,
                flag: country.flags?.svg || country.flags?.png || '',
              });
            });
          }
        });
        // Remove duplicates by currency code
        const unique = Array.from(new Map(opts.map(o => [o.code, o])).values());
        setOptions(unique.sort((a, b) => a.name.localeCompare(b.name)));
        setLoading(false);
      });
  }, []);

  const selected = options.find(o => o.code === value);

  return (
    <div>
      <Select.Root
        value={value}
        onValueChange={val => {
          const selected = options.find(o => o.code === val);
          if (selected) onChange(selected);
        }}
        disabled={loading}
      >
        <Select.Trigger
          className="flex items-center gap-2 px-3 h-full bg-white border-none rounded-none focus:outline-none min-w-[120px] w-44"
        >
          {selected ? (
            <>
              <img src={selected.flag} alt={selected.code} className="w-8 h-8 rounded-full" />
              <span className="font-medium">{selected.code}</span>
              <ChevronDownIcon className="w-5 h-5 text-gray-900" />
            </>
          ) : (
            <span className="text-gray-400">Select</span>
          )}
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            align="start"
            className="bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)] -mt-[1px]"
            sideOffset={5}
            avoidCollisions={false}
          >
            <Select.Viewport className="max-h-[192px] overflow-auto">
              {options.map((opt, idx) => (
                <React.Fragment key={opt.code}>
                  <Select.Item
                    value={opt.code}
                    className={`
                      text-[15px] h-[44px] flex items-center px-4 cursor-pointer
                      transition-colors duration-150
                      data-[highlighted]:bg-[#F5F5F5] data-[highlighted]:text-[#E05B5B]
                      data-[state=checked]:font-semibold
                      outline-none
                    `}
                  >
                    <img src={opt.flag} alt={opt.name} className="w-5 h-5 rounded-full mr-2" />
                    <span className="flex-1 truncate">{opt.name}</span>
                    <span className="ml-2 font-mono text-xs text-gray-500">{opt.code}</span>
                    <span className="ml-2 text-xs text-gray-400">{opt.symbol}</span>
                  </Select.Item>
                  {idx < options.length - 1 && (
                    <div className="border-b border-gray-100 mx-0" />
                  )}
                </React.Fragment>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {loading && <div className="text-xs text-gray-400 mt-1">Loading countries...</div>}
    </div>
  );
};

export default CountryCurrencySelect;