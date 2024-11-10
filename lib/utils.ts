import { ReadonlyURLSearchParams } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Filters } from '@/ts/types/filters';
import type { SearchParams } from '@/ts/types/searchParams';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyToLocale(amount: number | number[] | undefined) {
  if (!amount) return '';

  const formatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (typeof amount === 'number') {
    return formatter.format(amount);
  }

  return amount.map(a => formatter.format(a)).join(' - ');
}

export function parseSearchParamsToFilters(
  params: SearchParams | ReadonlyURLSearchParams,
): Filters {
  return {
    rent: [
      parseInt(params.get('min_rent') || '0'),
      parseInt(params.get('max_rent') || '9999999'),
    ],
  };
}
