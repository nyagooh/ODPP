"use client";

import Link from "next/link";
import { useState } from "react";
import { docs, saved } from "@/lib/content";
import { ArrowRight } from "../Icons";

const TABS = [
  { k: "research", label: "Saved research", n: saved.research.length },
  { k: "highlights", label: "Highlights", n: saved.highlights.length },
  { k: "notes", label: "Notes", n: saved.notes.length },
] as const;

export function MyDocuments() {
  const [tab, setTab] = useState<(typeof TABS)[number]["k"]>("research");
  return (
    <div className="lib">
      <header className="lib-head">
        <p className="eyebrow">My Documents</p>
        <h1 className="title-1 lib-title">Your research, kept.</h1>
        <p className="lede lib-lede">Answers you saved, passages you marked and notes you wrote. Visible only to you.</p>
      </header>

      <div className="lib-tools">
        <div className="tabs-line" role="tablist" aria-label="My Documents">
          {TABS.map((t) => (
            <button key={t.k} role="tab" aria-selected={tab === t.k} className="tl-tab" onClick={() => setTab(t.k)}>
              {t.label} <span className="tl-n">{t.n}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === "research" && (
        <ul className="my-rows">
          {saved.research.map((s) => (
            <li key={s.slug}>
              <Link href={`/ask/${s.slug}`} className="my-row row-link enter">
                <span className="my-title">{s.title}</span>
                <span className="meta">{s.meta}</span>
                {s.note && <span className="my-note">{s.note.includes("[") ? <span className="ph">{s.note}</span> : s.note}</span>}
                <ArrowRight size={16} className="arrow my-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tab === "highlights" && (
        <ul className="my-rows">
          {saved.highlights.map((h) => (
            <li key={h.locator}>
              <Link href={`/library/${h.doc}?page=${h.pdf}`} className="my-row row-link enter">
                <span className="eyebrow">
                  {docs[h.doc].short} · {h.locator}
                </span>
                <span className="my-quote">{h.text}</span>
                <span className="meta">{h.meta}</span>
                <ArrowRight size={16} className="arrow my-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tab === "notes" && (
        <ul className="my-rows">
          {saved.notes.map((n) => (
            <li key={n.title} className="my-row enter">
              <span className="my-title">{n.title}</span>
              <span className="my-body">{n.body}</span>
              <span className="meta">{n.meta}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
