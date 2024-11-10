import { FilterBar } from '@/components/filter-bar';
import { Header } from '@/components/header';
import { Listings } from '@/components/listings';
import { MapView } from '@/components/map-view';
import { getListingsAction } from '@/lib/actions';
import { parseSearchParamsToFilters } from '@/lib/utils';
import type { AsyncSearchParams } from '@/ts/types/searchParams';

interface HomeProps {
  searchParams: AsyncSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const filters = parseSearchParamsToFilters(new Map(Object.entries(params)));
  const listings = await getListingsAction(filters);

  return (
    <>
      <Header />
      <FilterBar />
      <main className="mx-5 my-[7px] grid h-full grid-cols-main gap-1">
        <MapView listings={listings} />
        <Listings listings={listings} />
      </main>
    </>
  );
}
