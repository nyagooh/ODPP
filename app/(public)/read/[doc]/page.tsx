import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PublicNav } from "@/components/public/PublicNav";
import { ReaderRoute } from "@/components/reader/ReaderRoute";
import { docs } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export default async function Page({ params, searchParams }: PageProps<"/read/[doc]">) {
  const { doc } = await params;
  const d = docs[doc];
  if (!d) notFound();
  return (
    <div className="public-app">
      <PublicNav />
      <Suspense>
        <ReaderRoute doc={d} searchParams={searchParams} libraryHref="/" askBase="/research" />
      </Suspense>
    </div>
  );
}
