"use client";

import { use } from "react";
import type { Research } from "@/lib/content";
import { ResearchView } from "./ResearchView";

type SP = Promise<Record<string, string | string[] | undefined>>;

export function ResearchRoute({
  research,
  base,
  readerBase,
  searchParams,
}: {
  research: Research;
  base: string;
  readerBase: string;
  searchParams: SP;
}) {
  const sp = use(searchParams);
  const cite = Number(sp.cite);
  return (
    <ResearchView
      key={typeof sp.fresh === "string" ? sp.fresh : "settled"}
      research={research}
      base={base}
      readerBase={readerBase}
      fresh={typeof sp.fresh === "string"}
      initialCite={cite && research.citations.some((c) => c.n === cite) ? cite : null}
    />
  );
}
