import Image from 'next/image';
import { FilterDropdown } from '@/components/filter-dropdown';
import { Button } from '@/components/ui/button';

const filters = [
  'Rent',
  'Apartment',
  'Property type',
  'Beds/baths',
  'Living rooms',
  'Pets',
  'Deposit',
  'Price: €300 - €500',
];
export function FilterBar() {
  return (
    <nav className="mx-5 flex h-16 items-center gap-4 rounded-s bg-white px-4 py-2 shadow-subnav">
      <ul className="flex gap-7">
        {filters.map(filter => (
          <FilterDropdown key={filter} label={filter} />
        ))}
        <Button className="flex gap-3 p-0" variant="ghost">
          <span>All</span>
          <Image src="/filter.svg" alt="Chevron down" width={16} height={16} />
        </Button>
      </ul>
    </nav>
  );
}
