'use client';

import { useQuery } from '@tanstack/react-query';
import { ListingCard } from '@/components/listing-card';
import { ListingsHeader } from '@/components/listings-header';
import { getListingsAction } from '@/lib/actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import type { TenementSearchResult } from '@/ts/types/listing';
import { parseSearchParamsToFilters } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { ListingSekeleton } from './listing-skeleton';

export function Listings({ listings }: { listings: TenementSearchResult }) {
  const searchParams = useSearchParams();
  const filters = parseSearchParamsToFilters(searchParams);
  const prevSearchParams = useRef(searchParams);

  const { data, isRefetching, refetch } = useQuery({
    queryKey: ['listings'],
    queryFn: () => getListingsAction(filters),
    initialData: listings,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (searchParams !== prevSearchParams.current) {
      refetch();
    }
  }, [refetch, searchParams]);

  return (
    <section className="relative bg-white">
      <ListingsHeader count={listings.paging?.totalCount || 0} />
      <ScrollArea className="h-[calc(100vh-(15rem+20px))]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 px-10 pt-5">
          {isRefetching ? (
            <ListingSekeleton count={4} />
          ) : !!data.res?.length ? (
            data.res?.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : null}
        </div>
      </ScrollArea>
    </section>
  );
}
