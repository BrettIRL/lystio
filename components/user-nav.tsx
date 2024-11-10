import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/profile.png" alt="lystio" />
            <AvatarFallback>LY</AvatarFallback>
          </Avatar>
          <Image
            src="/chevron-down.svg"
            alt="Chevron down"
            width={8}
            height={4}
          />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
