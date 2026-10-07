"use client";

import { use } from "react";
import type { Doc } from "@/lib/content";
import { Reader } from "./Reader";

type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? null;

export function ReaderRoute({ doc, searchParams, libraryHref, askBase }: { doc: Doc; searchParams: SP; libraryHref: string; askBase: string }) {
  const sp = use(searchParams);
  const page = Number(one(sp.page));
  const cite = Number(one(sp.cite));
  return (
    <Reader
      doc={doc}
      initialPdf={Number.isFinite(page) && page > 0 ? page : null}
      fromSlug={one(sp.from)}
      citeN={Number.isFinite(cite) && cite > 0 ? cite : null}
      libraryHref={libraryHref}
      askBase={askBase}
    />
  );
}
