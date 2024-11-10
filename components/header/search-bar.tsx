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
      <Input
        placeholder="Search"
        className="focus-visible:ring-none w-full flex-1 rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
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
      <Button
        className="h-11 w-11 rounded-full bg-[#A540F3] hover:bg-[#8F35D8]"
        size="icon"
      >
        <Image src="/search.svg" alt="Search" width={24} height={24} />
      </Button>
    </div>
  );
}
