'use client';

import * as React from 'react';

import * as Slider from '@/components/ui/slider';
import * as Tooltip from '@/components/ui/tooltip';

interface SliderWithTooltipProps {
  min?: number;
  max?: number;
  value?: number[];
  onChange?: (value: number[]) => void;
  currency?: string | null;
  className?: string;
}

export function SliderWithTooltip({
  min = 0,
  max = 600,
  value,
  onChange,
  currency = 'USD',
  className = 'w-full max-w-xs'
}: SliderWithTooltipProps) {
  const [internalValue, setInternalValue] = React.useState<number[]>([300, 450]);
  const [isOpen, setIsOpen] = React.useState(false);

  const currentValue = value || internalValue;

  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  const formatValue = (val: number) => {
    if (currency === null) {
      return val.toString();
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleValueChange = (val: number[]) => {
    if (onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  return (
    <div className={className}>
      <Slider.Root
        value={currentValue}
        min={min}
        max={max}
        step={1}
        onValueChange={handleValueChange}
      >
        <Tooltip.Root open={isOpen}>
          <Tooltip.Trigger asChild>
            <Slider.Thumb />
          </Tooltip.Trigger>
          <Tooltip.Content size='xsmall' side='top' forceMount>
            {formatValue(currentValue[0] ?? 0)}
          </Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root open={isOpen}>
          <Tooltip.Trigger asChild>
            <Slider.Thumb />
          </Tooltip.Trigger>
          <Tooltip.Content size='xsmall' side='top' forceMount>
            {formatValue(currentValue[1] ?? 0)}
          </Tooltip.Content>
        </Tooltip.Root>
      </Slider.Root>
    </div>
  );
}
