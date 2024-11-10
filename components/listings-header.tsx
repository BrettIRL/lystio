import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ListingsHeaderProps {
  count: number;
}

export function ListingsHeader({ count }: ListingsHeaderProps) {
  return (
    <header className="h-[6.5rem] border-b px-10 pb-3 pt-5">
      <div className="flex justify-between">
        <h4 className="flex items-center gap-[10px] text-2xl">
          <Image src="/listing.svg" alt="Listing" width={30} height={24} />
          Listing around me
        </h4>
        <div className="flex items-center gap-8">
          <ToggleGroup
            className="rounded-sm bg-[#F6F7F9]"
            defaultValue="large-grid"
            type="single"
          >
            <ToggleGroupItem
              className="data-[state=on] scale-90 data-[state=on]:bg-white data-[state=on]:shadow-list-layout"
              value="small-grid"
              aria-label="Small Grid"
            >
              <Image
                src="/grid-small.svg"
                alt="small-grid"
                width={18}
                height={18}
              />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="data-[state=on] scale-90 data-[state=on]:bg-white data-[state=on]:shadow-list-layout"
              value="list"
              aria-label="List"
            >
              <Image src="/list.svg" alt="small-grid" width={18} height={18} />
            </ToggleGroupItem>
            <ToggleGroupItem
              className="data-[state=on] scale-90 data-[state=on]:bg-white data-[state=on]:shadow-list-layout"
              value="large-grid"
              aria-label="Large Grid"
            >
              <Image
                src="/grid-large.svg"
                alt="small-grid"
                width={18}
                height={18}
              />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="flex items-center text-xs">
            Sort by Relevance
            <Button variant="ghost" size="icon">
              <Image src="/sort.svg" alt="Sort" width={14} height={14} />
            </Button>
          </div>
        </div>
      </div>
      <h6 className="my-2 pl-10 text-xs">
        {count ? `${count} properties` : <Skeleton className="h-3 w-32" />}
      </h6>
    </header>
  );
}
