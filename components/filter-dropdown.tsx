import Image from 'next/image';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface FilterDropdownProps {
  label: string;
}

export function FilterDropdown({ label }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li className="flex items-center gap-4 p-[5px]">
          {label}
          <Image
            src="/chevron-down.svg"
            alt="Chevron down"
            width={8}
            height={4}
          />
        </li>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
