import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SearchBar() {
  return (
    <div className="relative flex w-1/3 items-center gap-4 rounded-full border p-1">
      <Input placeholder="Search" className="w-full rounded-full border-none" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Image src="/sparkle.svg" alt="Sparkle" width={16} height={16} />
            <span>AI Search</span>
            <Image
              src="/chevron-down.svg"
              alt="Chevron down"
              width={8}
              height={4}
            />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <Button className="h-11 w-20 rounded-full bg-[#A540F3]" size="icon">
        <Image src="/search.svg" alt="Search" width={24} height={24} />
      </Button>
    </div>
  );
}
