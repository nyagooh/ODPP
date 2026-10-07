"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type Citation, type Research, docs, pad } from "@/lib/content";
import { DocPage } from "../DocPage";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Close } from "../Icons";

export function SourcePanel({
  research: r,
  n,
  onChange,
  onClose,
  readerHref,
}: {
  research: Research;
  n: number;
  onChange: (n: number) => void;
  onClose: () => void;
  readerHref: (c: Citation) => string;
}) {
  const c = r.citations.find((x) => x.n === n)!;
  const doc = docs[c.doc];
  const startIndex = Math.max(0, doc.pages.findIndex((p) => p.pdf === c.pdf));
  const [pageIndex, setPageIndex] = useState(startIndex);
  const canvasRef = useRef<HTMLDivElement>(null);

  // A new citation jumps to its page.
  useEffect(() => setPageIndex(startIndex), [n, startIndex]);

  const page = doc.pages[pageIndex];
  const onCitedPage = page.pdf === c.pdf;

  useEffect(() => {
    if (!onCitedPage) {
      canvasRef.current?.scrollTo({ top: 0 });
      return;
    }
    const el = canvasRef.current?.querySelector<HTMLElement>(`#clause-${c.clauses[0]}`);
    const canvas = canvasRef.current;
    if (el && canvas) {
      const top = el.offsetTop - canvas.clientHeight * 0.28;
      canvas.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }, [n, pageIndex, onCitedPage, c.clauses]);

  const clauseLabel = c.locator.replace(/^Art\. \d+/, "clauses ");

  return (
    <section className="panel" aria-label={`Source ${pad(n)}: ${doc.title}`}>
      <header className="panel-head">
        <button className="panel-back" onClick={onClose}>
          <ArrowLeft size={16} /> Answer
        </button>
        <div className="panel-id">
          <p className="eyebrow">
            {doc.type}
            <span className="sep">·</span>
            {c.locator}
          </p>
          <h2 className="panel-title">{doc.title}</h2>
        </div>
        <div className="panel-tools">
          <div className="pager">
            <button className="icon-btn" aria-label="Previous page" disabled={pageIndex === 0} onClick={() => setPageIndex((i) => i - 1)}>
              <ChevronLeft />
            </button>
            <span className="pager-text">
              PDF <strong>{page.pdf || "[00]"}</strong>
              {doc.totalPages ? ` / ${doc.totalPages}` : ""}
              <span className="pager-printed">Printed p. {page.printed || "[00]"}</span>
            </span>
            <button
              className="icon-btn"
              aria-label="Next page"
              disabled={pageIndex === doc.pages.length - 1}
              onClick={() => setPageIndex((i) => i + 1)}
            >
              <ChevronRight />
            </button>
          </div>
          <Link href={readerHref(c)} className="btn btn-primary panel-open">
            Open in reader <ArrowUpRight size={15} />
          </Link>
          <button className="icon-btn panel-close" aria-label="Close source" onClick={onClose}>
            <Close />
          </button>
        </div>
      </header>

      <div className="panel-strip">
        <div className="panel-tabs" role="tablist" aria-label="Citations">
          {r.citations.map((x) => (
            <button
              key={x.n}
              role="tab"
              aria-selected={x.n === n}
              className="panel-tab"
              onClick={() => onChange(x.n)}
              title={`${docs[x.doc].short} · ${x.locator}`}
            >
              {pad(x.n)}
            </button>
          ))}
        </div>
        <p className="panel-hint">
          {onCitedPage ? (
            <>
              <span className="panel-hint-rule" aria-hidden />
              Cited passage marked · {clauseLabel}
            </>
          ) : (
            <button className="link" onClick={() => setPageIndex(startIndex)}>
              Return to the cited page ({c.pdf})
            </button>
          )}
        </p>
      </div>

      <div className="panel-canvas" ref={canvasRef}>
        <div className="panel-page" key={`${n}-${pageIndex}`}>
          <DocPage page={page} cited={onCitedPage ? c.clauses : []} citeNumber={n} reveal />
        </div>
      </div>
    </section>
  );
}
