import { Suspense } from "react";
import { SearchRoute } from "@/components/search/SearchRoute";

export default function Page({ searchParams }: PageProps<"/search">) {
  return (
    <div className="plain">
      <Suspense>
        <SearchRoute searchParams={searchParams} base="/search" readerBase="/library" askHref="/ask" libraryHref="/library" staff />
      </Suspense>
    </div>
  );
}
