"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { collection, docs } from "@/lib/content";
import { ArrowRight, SearchIcon } from "../Icons";

const TABS = ["All", "Constitution", "ODPP publications", "Laws of Kenya"] as const;

export function LibraryView() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [filter, setFilter] = useState("");

  const items = useMemo(
    () =>
      collection
        .map((c) => docs[c.slug])
        .filter((d) => (tab === "All" ? true : d.collection === tab))
        .filter((d) => d.title.toLowerCase().includes(filter.toLowerCase())),
    [tab, filter],
  );

  const count = (t: (typeof TABS)[number]) => (t === "All" ? collection.length : collection.filter((c) => docs[c.slug].collection === t).length);

  return (
    <div className="lib">
      <header className="lib-head">
        <p className="eyebrow">Library</p>
        <h1 className="title-1 lib-title">The collection</h1>
        <p className="lede lib-lede">Every document ODPP Research answers from, in its original form.</p>
      </header>

      <div className="lib-tools">
        <div className="tabs-line" role="tablist" aria-label="Collections">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className="tl-tab" onClick={() => setTab(t)}>
              {t} <span className="tl-n">{count(t)}</span>
            </button>
          ))}
        </div>
        <label className="lib-filter">
          <SearchIcon />
          <span className="visually-hidden">Filter by title</span>
          <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by title" />
        </label>
      </div>

      <ul className="lib-rows">
        {items.map((d) => (
          <li key={d.slug} className="lib-row enter">
            <div className="lib-row-main">
              <span className="eyebrow">{d.type}</span>
              <Link href={`/library/${d.slug}/about`} className="lib-row-title">
                {d.title}
              </Link>
              <p className="lib-row-sum">{d.summary}</p>
            </div>
            <dl className="lib-row-meta">
              <div>
                <dt>Year</dt>
                <dd className={d.year.startsWith("[") ? "ph" : undefined}>{d.year}</dd>
              </div>
              <div>
                <dt>Pages</dt>
                <dd className={d.totalPages ? undefined : "ph"}>{d.totalPages || "[00]"}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd className={d.status.startsWith("[") ? "ph" : undefined}>{d.status}</dd>
              </div>
            </dl>
            <div className="lib-row-actions">
              <Link href={`/library/${d.slug}`} className="btn btn-primary btn-sm">
                Read
              </Link>
              <Link href={`/library/${d.slug}/about`} className="btn btn-secondary btn-sm">
                Details
              </Link>
            </div>
          </li>
        ))}
        {!items.length && <li className="meta lib-none">No documents match “{filter}”.</li>}
      </ul>
    </div>
  );
}
