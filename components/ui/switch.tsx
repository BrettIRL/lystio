'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  checkedLabel?: string;
  uncheckedLabel?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, children, checkedLabel, uncheckedLabel, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'group peer relative inline-flex h-10 w-[88px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[47px] data-[state=unchecked]:-translate-x-1',
      )}
    >
      {children}
    </SwitchPrimitives.Thumb>
    <div className="absolute left-3 text-xs text-white transition-opacity duration-100 ease-in group-data-[state=unchecked]:opacity-0">
      {/* Move */}
      {uncheckedLabel}
    </div>
    <div className="absolute right-3 text-xs text-white transition-opacity duration-100 ease-in group-data-[state=checked]:opacity-0">
      {/* Draw */}
      {checkedLabel}
    </div>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
