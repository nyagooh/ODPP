import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ReaderRoute } from "@/components/reader/ReaderRoute";
import { docs } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export default async function Page({ params, searchParams }: PageProps<"/library/[doc]">) {
  const { doc } = await params;
  const d = docs[doc];
  if (!d) notFound();
  return (
    <Suspense>
      <ReaderRoute doc={d} searchParams={searchParams} libraryHref="/library" askBase="/ask" />
    </Suspense>
  );
}
