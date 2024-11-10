'use client';

import { useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import mapboxgl, { LngLatLike, Marker } from 'mapbox-gl';
import { useQuery } from '@tanstack/react-query';
import { MapMarker } from '@/components/map-marker';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { getListingsAction } from '@/lib/actions';
import { parseSearchParamsToFilters } from '@/lib/utils';
import type { TenementSearchResult } from '@/ts/types/listing';

import 'mapbox-gl/dist/mapbox-gl.css';

const CENTER: [number, number] = [16.3738, 48.2082];
const PITCH = 60;
const ZOOM = 16;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export function MapView({ listings }: { listings: TenementSearchResult }) {
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  const searchParams = useSearchParams();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<{ marker: Marker; root: Root }[]>([]);
  const filters = parseSearchParamsToFilters(searchParams);

  const { data } = useQuery({
    queryKey: ['listings'],
    queryFn: () => getListingsAction(filters),
    initialData: listings,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: CENTER,
      zoom: ZOOM,
      pitch: PITCH,
      antialias: true,
      style: 'mapbox://styles/lystio/cm1erwga302jt01pjh0nxh47n',
    });

    mapRef.current.scrollZoom.disable();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !data.res?.length) return;
    if (markers.length) markers.forEach(marker => marker.remove());
    const coordinates: LngLatLike[] = [];

    const newMarkers = data.res.map(listing => {
      const location = listing.location;
      const markerNode = document.createElement('div');
      const root = createRoot(markerNode);
      root.render(<MapMarker listing={listing} />);

      const marker = new mapboxgl.Marker(markerNode).setLngLat([
        location[0],
        location[1],
      ]);
      marker.addTo(mapRef.current!);
      coordinates.push([location[0], location[1]]);

      markerRefs.current.push({ marker, root });

      return marker;
    });
    setMarkers(newMarkers);

    if (coordinates.length) {
      const bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
      coordinates.forEach(coordinate => bounds.extend(coordinate));
      mapRef.current.fitBounds(bounds, { padding: 50, pitch: PITCH });
    }
  }, [data]);

  return (
    <div className="relative">
      <div ref={mapContainerRef} className="h-full w-full"></div>
      <div className="absolute left-7 top-7 z-10 flex flex-col gap-4">
        <Button className="text-black">
          <Image src="poi.svg" alt="Point of Interest" width={24} height={24} />
          Point of Interest
        </Button>
        <Button size="icon" className="rounded-full">
          <Image src="/layer.svg" alt="Layer" width={24} height={24} />
        </Button>
        <Switch checkedLabel="Draw" uncheckedLabel="Move">
          <Image src="/pencil.svg" alt="Pencil" width={24} height={24} />
        </Switch>
      </div>
      <div className="absolute bottom-10 z-10 flex w-full items-end justify-between px-7">
        <div className="flex items-center gap-4">
          <Button className="flex items-center gap-2 text-black">
            Streetview
            <Image
              src="/Streetview.svg"
              alt="Streetview"
              width={24}
              height={24}
            />
          </Button>
          <Button className="flex items-center gap-2 text-black">
            Route planner
            <Image
              src="/route.svg"
              alt="Route planner"
              width={24}
              height={24}
            />
          </Button>
        </div>
        <div className="flex flex-col gap-1 rounded-sm bg-[#f6f7f9]">
          <Button size="icon" onClick={() => mapRef.current?.zoomIn()}>
            <Image src="/add.svg" alt="Add" width={24} height={24} />
          </Button>
          <Button
            size="icon"
            className="bg-[#f6f7f9]"
            onClick={() => mapRef.current?.zoomOut()}
          >
            <Image src="/minus.svg" alt="Minus" width={24} height={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
