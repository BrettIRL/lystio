'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { parseSearchParamsToFilters } from '@/lib/utils';

export function PriceFilterDropdown() {
  const searchParams = useSearchParams();

  const [minRent, setMinRent] = useState<number | string>(
    searchParams.get('min_rent') || '',
  );
  const [maxRent, setMaxRent] = useState<number | string>(
    searchParams.get('max_rent') || '',
  );
  const [open, setOpen] = useState<boolean>(false);

  const hasPriceParams =
    searchParams.get('min_rent') || searchParams.get('max_rent');
  const filters = parseSearchParamsToFilters(searchParams);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    if (minRent || maxRent) {
      params.set('min_rent', '' + minRent || '0');
      params.set('max_rent', '' + maxRent || '9999999');
    }

    if (!minRent && !maxRent) {
      params.delete('min_rent');
      params.delete('max_rent');
    }

    window.history.pushState(null, '', `?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <li className="group flex items-center gap-4 p-[5px]">
          Price
          {hasPriceParams
            ? `: \u20ac${filters.rent[0]} - \u20ac${filters.rent[1]}`
            : ''}
          <Image
            src="/chevron-down.svg"
            alt="Chevron down"
            width={8}
            height={4}
            className="transition-transform duration-150 ease-in group-data-[state=open]:rotate-180"
          />
        </li>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width">Min:</Label>
            <Input
              className="col-span-3 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
              max={maxRent || 9999999}
              min={0}
              placeholder="0"
              type="number"
              value={minRent}
              onChange={e => setMinRent(parseInt(e.target.value) || '')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxWidth">Max:</Label>
            <Input
              className="col-span-3 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
              max={9999999}
              min={minRent || 1}
              placeholder="9999999"
              type="number"
              value={maxRent}
              onChange={e => setMaxRent(parseInt(e.target.value) || '')}
            />
          </div>
          <div className="text-right">
            <Button
              className="bg-[#A540F3] hover:bg-[#8F35D8]"
              size="sm"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
