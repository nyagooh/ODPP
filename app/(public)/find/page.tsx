import { Suspense } from "react";
import { PublicNav } from "@/components/public/PublicNav";
import { SearchRoute } from "@/components/search/SearchRoute";

export default function Page({ searchParams }: PageProps<"/find">) {
  return (
    <div className="public-app">
      <PublicNav />
      <Suspense>
        <SearchRoute searchParams={searchParams} base="/find" readerBase="/read" askHref="/research/discontinue-a-prosecution" libraryHref="/#collection" staff={false} />
      </Suspense>
    </div>
  );
}
