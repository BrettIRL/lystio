import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MockFilterDropdown } from '@/components/filter-bar/mock-filter-dropdown';
import { PriceFilterDropdown } from '@/components/filter-bar/price-filter-dropdown';

const FILTERS = [
  'Rent',
  'Apartment',
  'Property type',
  'Beds/baths',
  'Living rooms',
  'Pets',
  'Deposit',
];

export async function FilterBar() {
  return (
    <nav className="mx-5 flex h-16 items-center gap-4 rounded-s bg-white px-4 py-2 shadow-subnav">
      <ul className="flex gap-7">
        {FILTERS.map(filter => (
          <MockFilterDropdown key={filter} label={filter} />
        ))}
        <PriceFilterDropdown />
        <Button className="flex gap-3 p-0" variant="ghost">
          <span>All</span>
          <Image src="/filter.svg" alt="Chevron down" width={16} height={16} />
        </Button>
      </ul>
    </nav>
  );
}
