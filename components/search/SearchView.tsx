"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import { type Hit, docs, runSearch } from "@/lib/content";
import { useStatus } from "../app/Status";
import { ArrowRight, SearchIcon } from "../Icons";

const COLLECTIONS = ["Constitution", "ODPP publications", "Laws of Kenya"] as const;

function Marked({ text, term }: { text: string; term: string }) {
  const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const words = term.split(/\s+/).filter((w) => w.length > 2);
  if (!words.length) return <>{text}</>;
  // Prefer the whole phrase; fall back to its words.
  const re = new RegExp(`(${[esc(term), ...words.map(esc)].join("|")})`, "gi");
  return (
    <>
      {text.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}

export function SearchView({
  q,
  base,
  readerBase,
  askHref,
  libraryHref,
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    router.push(v ? `${base}?q=${encodeURIComponent(v)}` : base);
  };

  const field = (
    <form className={`sfield${q ? " sfield--compact" : ""}`} role="search" onSubmit={submit}>
      <SearchIcon size={q ? 18 : 20} />
      <label htmlFor="sq" className="visually-hidden">
        Search the documents
      </label>
      <input id="sq" value={value} onChange={(e) => setValue(e.target.value)} placeholder="An article, section or phrase, e.g. Article 157" autoComplete="off" autoFocus={!q} />
      {value && (
        <button type="button" className="sfield-clear link" onClick={() => setValue("")}>
          Clear
        </button>
      )}
      <button type="submit" className="btn btn-primary sfield-go">
        Search
      </button>
    </form>
  );

  const statusGrid = aiPaused && (
    <dl className="svc">
      <div>
        <dt>AI answers</dt>
        <dd>
          <span className="dot dot--crimson" /> Unavailable
        </dd>
      </div>
      {["ODPP publications", "Constitution", "Laws of Kenya"].map((k) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>
            <span className="dot" /> Available
          </dd>
        </div>
      ))}
    </dl>
  );

  /* ---------- Empty ---------- */
  if (!result)
    return (
      <div className="search search--empty">
        {aiPaused && (
          <div className="paused" role="status">
            <span className="dot dot--crimson" />
            <p>
              <strong>AI answers are paused.</strong> Search and the document reader are working. You’ll get matching
              passages, not a written answer.
            </p>
          </div>
        )}
        <div className="search-stage">
          <p className="eyebrow enter">Search</p>
          <h1 className="display search-title enter" style={{ animationDelay: "50ms" }}>
            Find a provision.
          </h1>
          <p className="lede search-lede enter" style={{ animationDelay: "90ms" }}>
            Search the original text of every document. Results are passages, not summaries.
          </p>
          <div className="enter" style={{ animationDelay: "130ms" }}>
            {field}
          </div>
          <div className="search-scope enter" style={{ animationDelay: "170ms" }}>
            {COLLECTIONS.map((c) => (
              <label key={c} className="chk">
                <input type="checkbox" checked={on[c]} onChange={() => setOn((o) => ({ ...o, [c]: !o[c] }))} />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="search-quiet enter" style={{ animationDelay: "220ms" }}>
          <div>
            <p className="eyebrow">Recent searches</p>
            <ul className="ask-recent">
              {["plea agreement", "Article 157", "public interest test", "Article 49"].map((s) => (
                <li key={s}>
                  <Link href={`${base}?q=${encodeURIComponent(s)}`} className="link">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Search tips</p>
            <ul className="tips">
              <li>
                <span className="tip-k">“public interest”</span> Quotation marks match an exact phrase.
              </li>
              <li>
                <span className="tip-k">Art. 157</span> Article and section numbers jump straight to the provision.
              </li>
              <li>
                <span className="tip-k">Ask instead</span> For a written, cited answer, use{" "}
                <Link href={askHref} className="link">
                  Ask
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

  const hits = result.hits.filter((h) => on[docs[h.doc].collection]);
  const byCollection = (c: string) => result.hits.filter((h) => docs[h.doc].collection === c).length;
  const docCount = new Set(hits.map((h) => h.doc)).size;

  /* ---------- No results ---------- */
  if (!result.hits.length)
    return (
      <div className="search">
        <div className="search-bar">{field}</div>
        <div className="none enter">
          <h1 className="none-title">No matches.</h1>
          <p className="none-text">
            Nothing for “{q}” in ODPP publications or the Constitution of Kenya.
          </p>
          <div className="state-actions">
            <button className="btn btn-primary" onClick={() => router.push(`${base}?q=${encodeURIComponent(q)}&laws=1`)}>
              Include Laws of Kenya
            </button>
            <Link href={libraryHref} className="btn btn-secondary">
              Browse the library
            </Link>
          </div>
          <p className="meta none-hint">Check the spelling, try a broader phrase, or search by article number.</p>
        </div>
      </div>
    );

  /* ---------- Results ---------- */
  return (
    <div className="search">
      <div className="search-bar">{field}</div>
      <div className="results">
        <aside className="facets" aria-label="Filter results">
          <p className="eyebrow">Collections</p>
          <ul>
            {COLLECTIONS.map((c) => (
              <li key={c}>
                <label className="chk chk--row">
                  <input type="checkbox" checked={on[c]} onChange={() => setOn((o) => ({ ...o, [c]: !o[c] }))} />
                  <span>{c}</span>
                  <span className="facet-n">{byCollection(c)}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="eyebrow facets-h2">Documents</p>
          <ul className="facet-docs">
            {[...new Set(result.hits.map((h) => h.doc))].map((d) => (
              <li key={d}>
                <span>{docs[d].short}</span>
                <span className="facet-n">{result.hits.filter((h) => h.doc === d).length}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="hits" aria-label="Results">
          {statusGrid}
          {aiPaused && <p className="meta svc-note">AI answers are paused. You’ll get matching passages, not a written answer.</p>}
          <div className="hits-head">
            <h1 className="hits-title">
              {hits.length} passages <span>in {docCount} documents</span>
            </h1>
            <span className="meta">Sorted by relevance</span>
          </div>
          <ol>
            {hits.map((h: Hit, i) => {
              const d = docs[h.doc];
              const href = `${readerBase}/${h.doc}${h.pdf ? `?page=${h.pdf}` : ""}`;
              return (
                <li key={i} className="hit enter" style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="hit-top">
                    <span className="eyebrow">{d.collection === "ODPP publications" ? d.type : d.collection}</span>
                    <span className={`meta hit-loc${h.locator.startsWith("[") ? " ph" : ""}`}>
                      {h.locator} · PDF p. {h.pdf || "[00]"}
                    </span>
                  </div>
                  <Link href={href} className="hit-title">
                    {d.title}
                  </Link>
                  <p className="hit-snip">
                    <Marked text={h.snippet} term={result.term} />
                  </p>
                  <div className="hit-actions">
                    <Link href={href} className="hit-act">
                      Open the page <ArrowRight size={14} className="arrow" />
                    </Link>
                    {staff && !aiPaused && (
                      <Link href={askHref} className="hit-act hit-act--quiet">
                        Ask about this passage
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          {!hits.length && <p className="meta">All collections are filtered out. Tick one on the left to see results.</p>}
        </section>
      </div>
    </div>
  );
}
