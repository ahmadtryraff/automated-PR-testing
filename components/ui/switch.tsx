import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cnExt } from '@/utils/cn';

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, disabled, ...rest }, forwardedRef) => {
  return (
    <SwitchPrimitives.Root
      className={cnExt(
        'group/switch block h-5 w-8 shrink-0 p-0.5 outline-none focus:outline-none',
        className,
      )}
      ref={forwardedRef}
      disabled={disabled}
      {...rest}
    >
      <div
        className={cnExt(
          // base
          'h-4 w-7 rounded-full bg-bg-soft-200 p-0.5 outline-none',
          'transition duration-200 ease-out',
          !disabled && [
            // hover
            'group-hover/switch:bg-bg-sub-300',
            // focus
            'group-focus-visible/switch:bg-bg-sub-300',
            // pressed
            'group-active/switch:bg-bg-soft-200',
            // checked
            'group-data-[state=checked]/switch:bg-red-500',
            // checked hover
            'group-hover:data-[state=checked]/switch:bg-primary-darker',
            // checked pressed
            'group-active:data-[state=checked]/switch:bg-primary-base',
            // focus
            'group-focus/switch:outline-none',
          ],
          // disabled
          disabled && [
            'bg-bg-white-0 p-[3px] ring-1 ring-inset ring-stroke-soft-200',
          ],
        )}
      >
        <SwitchPrimitives.Thumb
          className={cnExt(
            'pointer-events-none relative block size-3 rounded-full bg-white shadow-md transition-transform duration-200 ease-out',
            'ltr:data-[state=checked]:translate-x-3 rtl:data-[state=checked]:-translate-x-3',
            !disabled && [
              'group-active/switch:scale-90',
            ],
            disabled && ['size-2.5 bg-bg-soft-200 shadow-none']
          )}
          style={{
            ['--mask' as any]:
              'radial-gradient(circle farthest-side at 50% 50%, #0000 1.95px, #000 2.05px 100%) 50% 50%/100% 100% no-repeat',
          }}
        />
      </div>
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch as Root };
