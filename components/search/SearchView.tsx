"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { type Hit, docs, runSearch } from "@/lib/content";
import { useStatus } from "../app/Status";
import { DocPage } from "../DocPage";
import { ArrowRight, ArrowUpRight, Close, SearchIcon } from "../Icons";

const COLLECTIONS = ["Constitution", "ODPP publications", "Laws of Kenya"] as const;
const RECENT = ["plea agreement", "Article 157", "public interest test", "Article 49"];

const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function Marked({ text, term }: { text: string; term: string }) {
  const words = term.split(/\s+/).filter((w) => w.length > 2);
  if (!words.length) return <>{text}</>;
  const re = new RegExp(`(${[esc(term), ...words.map(esc)].join("|")})`, "gi");
  return <>{text.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>))}</>;
}

/**
 * Search in the same shape as the chat: results in a centred column,
 * the search bar pinned at the bottom, and the selected source on the side.
 */
export function SearchView({
  q,
  base,
  readerBase,
  askHref,
  staff,
}: {
  q: string;
  base: string;
  readerBase: string;
  askHref: string;
  libraryHref: string;
  staff: boolean;
}) {
  const router = useRouter();
  const { aiPaused } = useStatus();
  const [value, setValue] = useState(q);
  const [on, setOn] = useState<Record<string, boolean>>({ Constitution: true, "ODPP publications": true, "Laws of Kenya": true });
  const result = useMemo(() => runSearch(q), [q]);
  const hits = result ? result.hits.filter((h) => on[docs[h.doc].collection]) : [];
  const [sel, setSel] = useState(0);
  const [sideOpen, setSideOpen] = useState(true);
  // On phones the source opens full screen, so start with it closed.
  useEffect(() => {
    if (window.innerWidth <= 900) setSideOpen(false);
  }, []);
  const current: Hit | undefined = hits[Math.min(sel, hits.length - 1)];
  const canvasRef = useRef<HTMLDivElement>(null);

  // Bring the matched passage into view whenever the selected result changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !current) return;
    const words = current.snippet.replace(/…/g, "").trim().split(/\s+/).slice(0, 4).join(" ").toLowerCase();
    const target = Array.from(canvas.querySelectorAll<HTMLElement>(".clause")).find((c) => c.textContent?.toLowerCase().includes(words));
    canvas.querySelectorAll(".clause.is-cited").forEach((c) => c.classList.remove("is-cited"));
    if (target) {
      target.classList.add("is-cited");
      canvas.scrollTo({ top: Math.max(0, target.offsetTop - canvas.clientHeight * 0.25), behavior: "smooth" });
    } else canvas.scrollTo({ top: 0 });
  }, [current]);

  const go = (v: string) => {
    const t = v.trim();
    router.push(t ? `${base}?q=${encodeURIComponent(t)}` : base);
  };

  const bar = (
    <div className="sx-dock">
      <form
        className="sx-bar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
      >
        <SearchIcon size={18} />
        <label htmlFor="sx-q" className="visually-hidden">
          Search the documents
        </label>
        <input id="sx-q" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search an article, section or phrase" autoComplete="off" autoFocus={!q} />
        {value && (
          <button type="button" className="icon-btn sx-clear" aria-label="Clear" onClick={() => setValue("")}>
            <Close size={16} />
          </button>
        )}
        <button type="submit" className="sx-go" aria-label="Search">
          <ArrowRight size={18} />
        </button>
      </form>
      <div className="sx-scope">
        {COLLECTIONS.map((c) => (
          <label key={c} className="sx-toggle">
            <input type="checkbox" checked={on[c]} onChange={() => setOn((o) => ({ ...o, [c]: !o[c] }))} />
            <span>{c}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const paused = aiPaused && (
    <p className="sx-paused" role="status">
      <span className="dot dot--crimson" /> AI answers are paused. Search and the reader are working — you’ll get passages, not a written answer.
    </p>
  );

  /* ---------- Empty: centred, like a new chat ---------- */
  if (!result)
    return (
      <div className="sx sx--empty">
        <div className="sx-main">
          <div className="sx-stage">
            {paused}
            <h1 className="sx-title enter">Find a provision.</h1>
            <p className="sx-sub enter" style={{ animationDelay: "60ms" }}>
              Search the original text of every document. Results are passages, not summaries.
            </p>
            <div className="enter" style={{ animationDelay: "110ms" }}>
              {bar}
            </div>
            <div className="sx-recent enter" style={{ animationDelay: "160ms" }}>
              {RECENT.map((r) => (
                <Link key={r} href={`${base}?q=${encodeURIComponent(r)}`} className="chip">
                  {r}
                </Link>
              ))}
            </div>
            <p className="sx-tip enter" style={{ animationDelay: "200ms" }}>
              Use quotation marks for an exact phrase. Want a written, cited answer?{" "}
              <Link href={askHref} className="link">
                Ask instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    );

  const docCount = new Set(hits.map((h) => h.doc)).size;
  const showSide = !!current && sideOpen;

  return (
    <div className={`sx${showSide ? " has-side" : ""}`}>
      <div className="sx-main">
        <header className="sx-head">
          <span className="sx-q">“{q}”</span>
          <span className="meta">
            {hits.length} passages · {docCount} documents
          </span>
        </header>

        <div className="sx-results">
          {paused}
          {!result.hits.length ? (
            <div className="sx-none enter">
              <h1 className="sx-none-title">No matches.</h1>
              <p className="sx-none-text">Nothing for “{q}” in ODPP publications or the Constitution of Kenya.</p>
              <div className="sx-none-actions">
                <button className="btn btn-primary" onClick={() => setOn({ Constitution: true, "ODPP publications": true, "Laws of Kenya": true })}>
                  Include Laws of Kenya
                </button>
                <Link href={staff ? "/library" : "/#collection"} className="btn btn-secondary">
                  Browse the library
                </Link>
              </div>
              <p className="meta">Check the spelling, try a broader phrase, or search by article number.</p>
            </div>
          ) : !hits.length ? (
            <p className="meta sx-filtered">Every collection is switched off. Turn one on below to see results.</p>
          ) : (
            <ol className="sx-list">
              {hits.map((h, i) => {
                const d = docs[h.doc];
                const active = current === h && showSide;
                return (
                  <li key={i} className="enter" style={{ animationDelay: `${i * 40}ms` }}>
                    <button
                      className={`sx-hit${active ? " is-active" : ""}`}
                      onClick={() => {
                        setSel(i);
                        setSideOpen(true);
                      }}
                    >
                      <span className="sx-hit-top">
                        <span className="sx-hit-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="sx-hit-type">{d.collection === "ODPP publications" ? d.type : d.collection}</span>
                        <span className={`sx-hit-loc${h.locator.startsWith("[") ? " ph" : ""}`}>
                          {h.locator} · p. {h.pdf || "[00]"}
                        </span>
                      </span>
                      <span className="sx-hit-title">{d.title}</span>
                      <span className="sx-hit-snip">
                        <Marked text={h.snippet} term={result.term} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {bar}
      </div>

      {showSide && current && (
        <aside className="sx-side" aria-label="Source">
          <header className="sx-side-head">
            <div>
              <p className="sx-side-type">
                {docs[current.doc].type} · {current.locator}
              </p>
              <h2 className="sx-side-title">{docs[current.doc].title}</h2>
            </div>
            <button className="icon-btn" aria-label="Close source" onClick={() => setSideOpen(false)}>
              <Close size={16} />
            </button>
          </header>
          <div className="sx-side-actions">
            <Link href={`${readerBase}/${current.doc}${current.pdf ? `?page=${current.pdf}` : ""}`} className="btn btn-primary btn-sm">
              Open in reader <ArrowUpRight size={14} />
            </Link>
            {staff && !aiPaused && (
              <Link href={askHref} className="btn btn-secondary btn-sm">
                Ask about this
              </Link>
            )}
            <span className="meta sx-side-page">PDF p. {current.pdf || "[00]"}</span>
          </div>
          <div className="sx-side-canvas" ref={canvasRef} key={`${current.doc}-${current.pdf}-${current.locator}`}>
            <DocPage
              page={docs[current.doc].pages.find((p) => p.pdf === current.pdf) ?? docs[current.doc].pages[0]}
              term={result.term.split(/\s+/)[0]}
              folio={false}
            />
          </div>
        </aside>
      )}
    </div>
  );
}
