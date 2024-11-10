import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import { currencyToLocale } from '@/lib/utils';
import { TenementUnitSize } from '@/ts/enums/tenement';
import type { Tenement } from '@/ts/types/listing';
import Image from 'next/image';

interface MapMarkerProps {
  listing: Tenement;
}
export function MapMarker({ listing }: MapMarkerProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className="px-3 py-1 text-sm">
          {currencyToLocale(listing.rent)}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="p-3">
        {listing.media?.length ? (
          <Image
            src={listing.media[0].cdnUrl}
            alt={listing.title}
            width={300}
            height={200}
            placeholder="blur"
            blurDataURL={listing.media[0].bluredDataURL}
            className="aspect-[300/200] rounded-md"
          />
        ) : (
          <div className="aspect-[300/200] w-full overflow-hidden rounded-md">
            <Skeleton className="h-[200px] w-[300px]" />
          </div>
        )}
        <div className="mt-4 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">
            {listing.unitType === TenementUnitSize.Single
              ? `${currencyToLocale(listing.rent)}`
              : `${currencyToLocale(listing.rentRange)}`}
          </h3>
          <p className="text-xs">{`${listing.address}, ${listing.zip} ${listing.city}`}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-2">
              <Image src="/box.svg" alt="Box" width={16} height={16} />
              {listing.unitType === TenementUnitSize.Single
                ? `${listing.size}\u33A1`
                : `${listing.sizeRange?.join(' - ')}\u33A1`}
            </span>
            <span className="inline-flex items-center gap-2">
              <Image src="/bed.svg" alt="Box" width={16} height={16} />
              {listing.unitType === TenementUnitSize.Single
                ? `${listing.roomsBed} bed`
                : `${listing.roomsBedRange?.join(' - ')} bed`}
            </span>
            <span className="inline-flex items-center gap-2">
              <Image src="/bath.svg" alt="Box" width={16} height={16} />
              {listing.unitType === TenementUnitSize.Single
                ? `${listing.roomsBath} bath`
                : `${listing.roomsBathRange?.join(' - ')} bath`}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
