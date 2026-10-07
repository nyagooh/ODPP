import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ResearchRoute } from "@/components/research/ResearchRoute";
import { research } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(research).map((slug) => ({ slug }));
}

export default async function Page({ params, searchParams }: PageProps<"/ask/[slug]">) {
  const { slug } = await params;
  const r = research[slug];
  if (!r) notFound();
  return (
    <Suspense>
      <ResearchRoute research={r} base="/ask" readerBase="/library" searchParams={searchParams} />
    </Suspense>
  );
}
