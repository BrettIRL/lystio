import Image from 'next/image';
import { Popover, PopoverTrigger } from '@/components/ui/popover';

interface MockFilterDropdownProps {
  label: string;
}

export function MockFilterDropdown({ label }: MockFilterDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <li className="flex items-center gap-4 p-[5px]">
          {label}
          <Image
            src="/chevron-down.svg"
            alt="Chevron down"
            width={8}
            height={4}
          />
        </li>
      </PopoverTrigger>
    </Popover>
  );
}
