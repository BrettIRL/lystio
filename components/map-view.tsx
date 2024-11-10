'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import mapboxgl from 'mapbox-gl';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import 'mapbox-gl/dist/mapbox-gl.css';

const CENTER: [number, number] = [16.3738, 48.2082];
const PITCH = 60;
const ZOOM = 16;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export function MapView() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

    return () => mapRef.current?.remove();
  });

  return (
    <div ref={mapContainerRef} className="relative">
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
