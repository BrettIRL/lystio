'use server';

import type { Filters } from '@/ts/types/filters';
import type { TenementSearchResult } from '@/ts/types/listing';

export async function getListingsAction(
  filter: Filters,
): Promise<TenementSearchResult> {
  const apiUrl = process.env.API_URL || '';
  const response = await fetch(apiUrl + '/tenement/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter }),
  });
  const listings = await response.json();
  return listings;
}
