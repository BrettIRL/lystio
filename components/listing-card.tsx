import Image from 'next/image';
import { format, formatDistanceToNow } from 'date-fns';
import type { Tenement } from '@/ts/types/listing';
import { Skeleton } from '@/components/ui/skeleton';
import { TenementUnitSize } from '@/ts/enums/tenement';
import { currencyToLocale } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function ListingCard({ listing }: { listing: Tenement }) {
  return (
    <article>
      <Carousel className="group relative aspect-[19/15] overflow-hidden rounded-md">
        <CarouselContent className="-ml-0">
          {listing.media?.length ? (
            listing.media.map(media => (
              <CarouselItem key={media.id} className="pl-0">
                <div className="overflow-hidden">
                  <Image
                    className="scale-105 transition-transform duration-150 ease-in group-hover:scale-100"
                    src={media.cdnUrl}
                    alt={listing.title}
                    width={380}
                    height={300}
                    placeholder="blur"
                    blurDataURL={media.bluredDataURL}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="pl-0">
              <Skeleton className="h-[300px] w-[380px]" />
            </CarouselItem>
          )}
        </CarouselContent>
        <div className="absolute left-0 top-0 flex w-full items-center justify-between p-3">
          <span className="inline-flex gap-2">
            <Badge className="py-1 font-normal">New</Badge>
            <Badge className="py-1 font-normal">3D Tour</Badge>
          </span>
          <Button size="sm-icon">
            <Image src="/bookmark.svg" alt="Share" width={16} height={16} />
          </Button>
        </div>
        {!!listing.media?.length && (
          <div className="absolute left-0 top-1/2 h-8 w-full opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-100">
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </div>
        )}
      </Carousel>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between text-xs">
          {listing.verified ? (
            <span className="inline-flex gap-1 text-[#5a0cff]">
              <Image
                src="/verified.svg"
                alt="Verified"
                width={15}
                height={15}
              />
              Verified
            </span>
          ) : (
            <span className="inline-flex text-[rgba(0,0,0,0.6)]">
              Unverified
            </span>
          )}
          <span>
            {formatDistanceToNow(new Date(listing.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <h4 className="overflow-hidden truncate text-[15px] font-semibold">
          {listing.title}
        </h4>
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
        <h3 className="text-lg font-semibold">
          {listing.unitType === TenementUnitSize.Single
            ? `${currencyToLocale(listing.rent)}`
            : `${currencyToLocale(listing.rentRange)}`}
        </h3>
        <p className="text-xs text-[rgba(0,0,0,0.6)]">
          Available From:{' '}
          <span className="text-black">
            {listing.availableFrom
              ? format(new Date(listing.availableFrom), 'dd-MM-yyyy')
              : 'Immediately'}
          </span>
        </p>
      </div>
    </article>
  );
}
