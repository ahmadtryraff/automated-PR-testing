'use client';

import React from 'react';
import * as PopoverPrimitives from '@radix-ui/react-popover';
import { RiArrowDownSLine, RiGlobalLine } from 'react-icons/ri';
import {
  CountryCode,
  getPhoneCode,
  getExampleNumber,
} from 'libphonenumber-js';
import examplePhoneNumbers from 'libphonenumber-js/examples.mobile.json';

import countryNames from '@/lib/country-names.json';
import { cn } from '@/utils/cn';
import * as Divider from '@/components/ui/divider';
import * as Input from '@/components/ui/input';
import { selectVariants } from '@/components/ui/select';

// Define a simple countries list
const allCountries: CountryCode[] = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'LT', 'LV', 'EE', 'IE', 'PT', 'GR', 'CY', 'MT', 'LU', 'IS', 'LI', 'MC', 'AD', 'SM', 'VA'];

const countriesWithPhoneAndName = allCountries.reduce(
  (acc, code) => {
    acc[code] = {
      phoneCode: getPhoneCode(code),
      // @ts-ignore
      countryName: countryNames[code],
    };
    return acc;
  },
  {} as Record<CountryCode, Record<string, string>>,
);

export function PhoneNumberInput({
  inputId,
  value = '',
  onChange = () => {},
  countryCode = 'US',
  onCountryCodeChange = () => {},
}: {
  inputId?: string;
  value?: string;
  onChange?: (val: string) => void;
  countryCode?: string;
  onCountryCodeChange?: (val: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { triggerRoot, triggerIcon, triggerArrow } = selectVariants({
    variant: 'compactForInput',
  });

  const exampleNumber = getExampleNumber(
    countryCode as CountryCode,
    examplePhoneNumbers,
  );

  // Determine the required length for the selected country
  const requiredLength = exampleNumber ? exampleNumber.nationalNumber.length : 15;

  // Handler to allow only numbers and enforce max length
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ''); // Remove non-numeric
    if (val.length > requiredLength) val = val.slice(0, requiredLength);
    onChange(val);
  };

  return (
    <div>
      <PopoverPrimitives.Root modal open={open} onOpenChange={setOpen}>
        <PopoverPrimitives.Anchor>
          <Input.Root>
            <PopoverPrimitives.Trigger className={triggerRoot()}>
              {countryCode ? (
                <>
                  <img
                    src={`/flags/${countryCode}.svg`}
                    className={triggerIcon()}
                    alt=''
                  />
                  +
                  {
                    Object.entries(countriesWithPhoneAndName).find(
                      ([countryCodeKey]) => countryCodeKey === countryCode,
                    )?.[1].phoneCode
                  }
                </>
              ) : (
                <RiGlobalLine className={triggerIcon()} />
              )}
              <RiArrowDownSLine className={triggerArrow()} />
            </PopoverPrimitives.Trigger>

            <Input.Wrapper>
              <Input.Input
                ref={inputRef}
                id={inputId}
                type='text'
                placeholder={exampleNumber?.formatNational()}
                value={value}
                onChange={handleInputChange}
                maxLength={requiredLength}
                inputMode='numeric'
                pattern='[0-9]*'
              />
            </Input.Wrapper>
          </Input.Root>
        </PopoverPrimitives.Anchor>
        <PopoverPrimitives.Portal>
          <PopoverPrimitives.Content
            className={cn(
              'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            )}
            align='start'
            sideOffset={4}
          >
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 px-2 py-1'>
                <RiGlobalLine className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm font-medium'>Select Country</span>
              </div>
              <Divider.Root className='my-1' />
              <div className='max-h-60 overflow-y-auto'>
                {allCountries.map((code) => (
                  <button
                    key={code}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                      countryCode === code && 'bg-accent text-accent-foreground',
                    )}
                    onClick={() => {
                      onCountryCodeChange(code);
                      setOpen(false);
                    }}
                  >
                    <img
                      src={`/flags/${code}.svg`}
                      className='h-4 w-4 rounded-sm'
                      alt=''
                    />
                    <span className='flex-1'>
                      {countriesWithPhoneAndName[code]?.countryName || code}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      +{countriesWithPhoneAndName[code]?.phoneCode}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </PopoverPrimitives.Content>
        </PopoverPrimitives.Portal>
      </PopoverPrimitives.Root>
    </div>
  );
}
