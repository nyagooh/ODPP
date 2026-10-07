"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Doc, type DocPage as Page, outline, pad, research } from "@/lib/content";
import { DocPage, countMatches } from "../DocPage";
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Close, Download, Minus, PanelRight, Plus, SearchIcon } from "../Icons";

const related = [
  { label: "Art. 157(8)", note: "Permission of the court", pdf: 99, clause: "157-8" },
  { label: "Art. 157(10)", note: "Independence of the DPP", pdf: 99, clause: "157-10" },
  { label: "Art. 157(11)", note: "Public interest and abuse of process", pdf: 99, clause: "157-11" },
  { label: "Art. 158", note: "Removal and resignation of the DPP", pdf: 99, clause: "158-1" },
];

function placeholderPage(doc: Doc, pdf: number): Page {
  return {
    pdf,
    printed: pdf - 2,
    running: [doc.title, "—"],
    blocks: [
      { kind: "clause", id: `ph-${pdf}`, text: `[PDF page ${pdf}. This prototype includes sample text for pages ${doc.pages[0].pdf}–${doc.pages[doc.pages.length - 1].pdf} only.]` },
    ],
  };
}

export function Reader({
  doc,
  initialPdf,
  fromSlug,
  citeN,
  libraryHref,
  askBase,
}: {
  doc: Doc;
  initialPdf: number | null;
  fromSlug: string | null;
  citeN: number | null;
  libraryHref: string;
  askBase: string;
}) {
  const from = fromSlug ? research[fromSlug] : null;
  const cite = from && citeN ? from.citations.find((c) => c.n === citeN && c.doc === doc.slug) ?? null : null;
  const docCites = from ? from.citations.filter((c) => c.doc === doc.slug) : [];

  const first = doc.pages[0].pdf;
  const [pdf, setPdf] = useState(initialPdf ?? cite?.pdf ?? doc.pages[Math.min(1, doc.pages.length - 1)].pdf);
  const [pageInput, setPageInput] = useState(String(pdf));
  const [zoom, setZoom] = useState(100);
  const [leftTab, setLeftTab] = useState<"contents" | "details">("contents");
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const [activeCite, setActiveCite] = useState(cite?.n ?? null);
  const [flash, setFlash] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [matchIdx, setMatchIdx] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const page = doc.pages.find((p) => p.pdf === pdf) ?? placeholderPage(doc, pdf);
  const total = doc.totalPages || doc.pages.length;
  const current = activeCite ? docCites.find((c) => c.n === activeCite) : null;
  const cited = current && current.pdf === pdf ? current.clauses : flash;

  useEffect(() => setPageInput(String(pdf || "[00]")), [pdf]);

  // Narrow screens start with rails closed.
  useEffect(() => {
    if (window.innerWidth < 1100) setShowRight(false);
    if (window.innerWidth < 860) setShowLeft(false);
  }, []);

  // Matches across all sample pages.
  const matches = useMemo(() => {
    const list: { pdf: number; local: number }[] = [];
    if (term.length < 2) return list;
    for (const p of doc.pages) {
      const n = countMatches(p, term);
      for (let i = 0; i < n; i++) list.push({ pdf: p.pdf, local: i });
    }
    return list;
  }, [term, doc.pages]);

  const m = matches[matchIdx];
  useEffect(() => {
    if (m) setPdf(m.pdf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchIdx, matches]);

  // Bring the passage of interest into view.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let target: HTMLElement | null = null;
    if (m && m.pdf === pdf) target = canvas.querySelector(`mark[data-match="${m.local}"]`);
    else if (cited.length) target = canvas.querySelector(`#clause-${cited[0]}`);
    if (target) {
      const top = target.getBoundingClientRect().top - canvas.getBoundingClientRect().top + canvas.scrollTop - canvas.clientHeight * 0.3;
      canvas.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    } else canvas.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf, activeCite, flash, m?.local, m?.pdf]);

  const go = (n: number) => {
    const clamped = Math.min(Math.max(n, 1), total);
    setFlash([]);
    setPdf(clamped);
  };

  const jumpTo = (p: number, clause: string) => {
    setActiveCite(null);
    setFlash([clause]);
    setPdf(p);
  };

  const docIndex = doc.pages.findIndex((p) => p.pdf === pdf);
  const canPrev = doc.totalPages ? pdf > 1 : docIndex > 0;
  const canNext = doc.totalPages ? pdf < total : docIndex < doc.pages.length - 1;
  const prev = () => (doc.totalPages ? go(pdf - 1) : setPdf(doc.pages[docIndex - 1].pdf));
  const next = () => (doc.totalPages ? go(pdf + 1) : setPdf(doc.pages[docIndex + 1].pdf));

  return (
    <div className={`reader${showLeft ? "" : " no-left"}${showRight ? "" : " no-right"}`}>
      <header className="reader-bar">
        <Link href={from ? `${askBase}/${from.slug}${cite ? `?cite=${cite.n}` : ""}` : libraryHref} className="icon-btn reader-back" aria-label={from ? "Back to the answer" : "Back to the library"}>
          <ArrowLeft />
        </Link>
        <div className="reader-id">
          <nav className="crumbs crumbs--sm" aria-label="Breadcrumb">
            <Link href={libraryHref}>Library</Link>
            <span aria-hidden>/</span>
            <span>{doc.type}</span>
          </nav>
          <h1 className="reader-title">{doc.title}</h1>
        </div>

        <div className="reader-tools">
          <div className={`docsearch${searchOpen ? " is-open" : ""}`}>
            {searchOpen ? (
              <>
                <SearchIcon />
                <input
                  autoFocus
                  value={term}
                  onChange={(e) => {
                    setTerm(e.target.value);
                    setMatchIdx(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && matches.length) setMatchIdx((i) => (i + (e.shiftKey ? matches.length - 1 : 1)) % matches.length);
                    if (e.key === "Escape") {
                      setSearchOpen(false);
                      setTerm("");
                    }
                  }}
                  placeholder="Search in document"
                  aria-label="Search in document"
                />
                <span className="docsearch-count">{term.length >= 2 ? (matches.length ? `${matchIdx + 1} of ${matches.length}` : "No matches") : ""}</span>
                <button className="icon-btn" aria-label="Previous match" disabled={!matches.length} onClick={() => setMatchIdx((i) => (i + matches.length - 1) % matches.length)}>
                  <ChevronUp />
                </button>
                <button className="icon-btn" aria-label="Next match" disabled={!matches.length} onClick={() => setMatchIdx((i) => (i + 1) % matches.length)}>
                  <ChevronDown />
                </button>
                <button
                  className="icon-btn"
                  aria-label="Close search"
                  onClick={() => {
                    setSearchOpen(false);
                    setTerm("");
                  }}
                >
                  <Close size={16} />
                </button>
              </>
            ) : (
              <button className="docsearch-btn" onClick={() => setSearchOpen(true)}>
                <SearchIcon /> <span>Search in document</span>
              </button>
            )}
          </div>

          <div className="pager pager--reader">
            <button className="icon-btn" aria-label="Previous page" disabled={!canPrev} onClick={prev}>
              <ChevronLeft />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const n = parseInt(pageInput, 10);
                if (!Number.isNaN(n)) go(n);
              }}
            >
              <label className="visually-hidden" htmlFor="pdf-page">
                PDF page
              </label>
              <input id="pdf-page" className="pager-input" value={pageInput} onChange={(e) => setPageInput(e.target.value)} inputMode="numeric" />
            </form>
            <span className="pager-text">
              / {doc.totalPages || "[00]"}
              <span className="pager-printed">Printed p. {page.printed || "[00]"}</span>
            </span>
            <button className="icon-btn" aria-label="Next page" disabled={!canNext} onClick={next}>
              <ChevronRight />
            </button>
          </div>

          <div className="zoom" role="group" aria-label="Zoom">
            <button className="icon-btn" aria-label="Zoom out" disabled={zoom <= 80} onClick={() => setZoom((z) => z - 10)}>
              <Minus />
            </button>
            <span className="zoom-val">{zoom}%</span>
            <button className="icon-btn" aria-label="Zoom in" disabled={zoom >= 140} onClick={() => setZoom((z) => z + 10)}>
              <Plus />
            </button>
          </div>

          <button className={`icon-btn rail-toggle${showRight ? " is-on" : ""}`} aria-label="Toggle context" aria-pressed={showRight} onClick={() => setShowRight((s) => !s)}>
            <PanelRight />
          </button>
        </div>
      </header>

      <div className="reader-body">
        {/* Left: contents + details */}
        <aside className="reader-left" aria-label="Document navigation">
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={leftTab === "contents"} className="tab" onClick={() => setLeftTab("contents")}>
              Contents
            </button>
            <button role="tab" aria-selected={leftTab === "details"} className="tab" onClick={() => setLeftTab("details")}>
              Details
            </button>
            <button className="icon-btn reader-left-close" aria-label="Hide contents" onClick={() => setShowLeft(false)}>
              <ChevronLeft />
            </button>
          </div>
          {leftTab === "contents" ? (
            doc.slug === "constitution" ? (
              <ol className="outline">
                {outline.map((ch) => (
                  <li key={ch.label}>
                    <details open={"open" in ch && ch.open}>
                      <summary>{ch.label}</summary>
                      {ch.children.length > 0 && (
                        <ol>
                          {ch.children.map((c) => (
                            <li key={c.label}>
                              {c.pdf ? (
                                <button className="outline-item" aria-current={c.pdf === pdf ? "true" : undefined} onClick={() => go(c.pdf!)}>
                                  <span className="outline-num">{c.label.slice(0, 3)}</span>
                                  <span>{c.label.slice(3).trim()}</span>
                                </button>
                              ) : (
                                <span className="outline-part">{c.label}</span>
                              )}
                            </li>
                          ))}
                        </ol>
                      )}
                    </details>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="meta reader-empty">[Outline will be generated from the document’s headings.]</p>
            )
          ) : (
            <div className="details">
              <dl>
                {doc.details.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd className={v.startsWith("[") ? "ph" : undefined}>{v}</dd>
                  </div>
                ))}
              </dl>
              <a className="details-dl" href="#">
                <Download /> Original PDF
              </a>
            </div>
          )}
        </aside>

        {!showLeft && (
          <button className="reader-left-open" onClick={() => setShowLeft(true)} aria-label="Show contents">
            Contents <ChevronRight size={14} />
          </button>
        )}

        {/* Canvas */}
        <main className="reader-canvas" ref={canvasRef}>
          <div className="reader-page" key={pdf} style={{ ["--zoom" as string]: zoom / 100 }}>
            <DocPage page={page} cited={cited} citeNumber={current && current.pdf === pdf ? current.n : undefined} reveal term={term} currentMatch={m && m.pdf === pdf ? m.local : -1} />
          </div>
          <div className="reader-turn">
            <button className="btn btn-quiet" disabled={!canPrev} onClick={prev}>
              <ChevronLeft /> Previous page
            </button>
            <span className="meta">
              PDF {pdf || "[00]"} · printed {page.printed || "[00]"}
            </span>
            <button className="btn btn-quiet" disabled={!canNext} onClick={next}>
              Next page <ChevronRight />
            </button>
          </div>
        </main>

        {/* Right: context */}
        <aside className="reader-right" aria-label="Context">
          {from && docCites.length > 0 && (
            <section className="ctx">
              <p className="eyebrow ctx-h">Cited in your research</p>
              <Link href={`${askBase}/${from.slug}`} className="ctx-from link">
                {from.question}
              </Link>
              <ol className="ctx-cites">
                {docCites.map((c) => (
                  <li key={c.n}>
                    <button
                      className={`ref ref--sm${activeCite === c.n ? " is-open" : ""}`}
                      onClick={() => {
                        setFlash([]);
                        setActiveCite(c.n);
                        setPdf(c.pdf);
                      }}
                    >
                      <span className="ref-head">
                        <span className="ref-num">{pad(c.n)}</span>
                        <span className="ref-line" />
                      </span>
                      <span className="ref-title" style={{ display: "block" }}>
                        {c.locator}
                      </span>
                      <span className="ref-loc">
                        PDF p. {c.pdf} · printed p. {c.printed}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {doc.slug === "constitution" && (
            <section className="ctx">
              <p className="eyebrow ctx-h">Related provisions</p>
              <ol>
                {related.map((r) => (
                  <li key={r.label}>
                    <button className={`ref ref--sm${flash[0] === r.clause ? " is-open" : ""}`} onClick={() => jumpTo(r.pdf, r.clause)}>
                      <span className="ref-head">
                        <span className="ref-num ref-num--art">{r.label}</span>
                        <span className="ref-line" />
                      </span>
                      <span className="ref-loc">{r.note}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="ctx ctx--status">
            <p className="eyebrow ctx-h">Status</p>
            <p className="ctx-status">
              <span className="dot" /> {doc.status}
            </p>
            <p className="meta">PDF page numbers follow the file; printed numbers follow the official print.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
