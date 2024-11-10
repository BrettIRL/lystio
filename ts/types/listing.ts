interface TenementOwner {
  country: string;
  name: string;
  email: string;
  phone: string;
  description: string | null;
  vat: string | null;
  billingAddress: string | null;
}

export interface TenementMedia {
  type: string;
  name: string;
  cdnUrl: string;
  sort: number;
  title: string;
  bluredDataURL: string;
  id: number;
}

export interface Tenement {
  owner: TenementOwner | null;
  user: { id: number } | null;
  title: string;
  abstract: string;
  address: string;
  addressDoor: string;
  zip: string;
  city: string;
  country: string;
  rooms: number;
  roomsRange?: number[];
  roomsBed: number;
  roomsBedRange?: number[];
  roomsBath: number;
  roomsBathRange?: number[];
  size: number;
  sizeRange?: number[];
  rent: number;
  rentRange?: number[];
  rentUtilities: number;
  rentFull: number | null;
  rentDeposit: number | null;
  amenities: number[];
  amenitiesTexts: Record<number, string>;
  location: [number, number];
  locationReal: [number, number] | null;
  createdAt: string;
  updatedAt: string;
  type: number;
  subType: number;
  condition: number;
  accessibility: number;
  unitType: string;
  rentType: string;
  floorType: number;
  heatingType: number;
  leaseDuration: number;
  availableFrom: string | null;
  highlight: boolean | null;
  active: boolean;
  verified: boolean;
  deleted: boolean;
  autoRenewUntil: string | null;
  lastRenewAt: string | null;
  constructionYear: number | null;
  modernisationYear: number | null;
  floor: number | string | null;
  id: number;
  media?: TenementMedia[];
  tenements?: Tenement[];
}

export interface Paging {
  pageCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface TenementSearchResult {
  res: Tenement[];
  paging: Paging;
}
