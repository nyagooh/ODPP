import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PublicNav } from "@/components/public/PublicNav";
import { ResearchRoute } from "@/components/research/ResearchRoute";
import { research } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(research).map((slug) => ({ slug }));
}

export default async function Page({ params, searchParams }: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const r = research[slug];
  if (!r) notFound();
  return (
    <div className="public-app">
      <PublicNav />
      <Suspense>
        <ResearchRoute research={r} base="/research" readerBase="/read" searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
