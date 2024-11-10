import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { SearchBar } from '@/components/search-bar';

export function Header() {
  return (
    <header className="flex h-[5rem] items-center justify-between gap-2 border-b border-b-[rgba(0,0,0,0.1)] bg-white px-5">
      <Image src="/lystio.svg" alt="Lystio logo" width={80} height={40} />
      <SearchBar />
      <div className="flex items-center gap-6">
        <Link href="/advertise">Advertise</Link>
        <Button className="h-8 w-8 rounded-full" variant="outline" size="icon">
          <Image src="/world.svg" alt="Language" width={18} height={18} />
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
