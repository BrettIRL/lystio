import { FilterBar } from '@/components/filter-bar';
import { Header } from '@/components/header';

export default function Home() {

  return (
    <>
      <Header />
      <FilterBar />
      <main className="mx-5 my-[7px] grid h-full grid-cols-main gap-1">
      </main>
    </>
  );
}
