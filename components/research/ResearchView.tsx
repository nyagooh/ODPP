"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { type AnswerPart, type Research, docs, pad } from "@/lib/content";
import { Composer } from "../Composer";
import { ArrowRight, Copy, Download } from "../Icons";
import { Processing } from "./Processing";
import { SourcePanel } from "./SourcePanel";
import { StateBody } from "./States";

/**
 * Chat-style research: the question as a message, the cited answer beneath it,
 * and a sources sidebar on the right that opens into the original page.
 */
export function ResearchView({
  research: r,
  base,
  readerBase,
  fresh,
  initialCite,
}: {
  research: Research;
  base: string;
  readerBase: string;
  fresh: boolean;
  initialCite: number | null;
}) {
  const [phase, setPhase] = useState<"processing" | "answer">(fresh ? "processing" : "answer");
  const [hot, setHot] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(initialCite);
  const [copied, setCopied] = useState(false);

  const setUrl = (fn: (u: URL) => void) => {
    const url = new URL(window.location.href);
    fn(url);
    window.history.replaceState(null, "", url);
  };

  const openCite = useCallback((n: number | null) => {
    setOpen(n);
    setUrl((u) => {
      u.searchParams.delete("fresh");
      if (n) u.searchParams.set("cite", String(n));
      else u.searchParams.delete("cite");
    });
  }, []);

  const finish = useCallback(() => {
    setPhase("answer");
    setUrl((u) => u.searchParams.delete("fresh"));
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && openCite(null);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [openCite]);

  const kind = r.kind ?? "answer";
  const hasSources = r.citations.length > 0 && kind !== "withheld";
  const showSide = phase === "answer" && hasSources;
  const docCount = new Set(r.citations.map((c) => c.doc)).size;

  const renderParts = (parts: AnswerPart[], key: string) =>
    parts.map((p, i) =>
      typeof p === "string" ? (
        p
      ) : (
        <span
          key={`${key}-${i}`}
          data-claim={p.cite}
          className={`claim${hot === p.cite ? " is-hot" : ""}${open === p.cite ? " is-open" : ""}`}
          onMouseEnter={() => setHot(p.cite)}
          onMouseLeave={() => setHot(null)}
        >
          {p.text}
          <button
            className={`cite${hot === p.cite ? " is-hot" : ""}${open === p.cite ? " is-open" : ""}`}
            onClick={() => openCite(open === p.cite ? null : p.cite)}
            onFocus={() => setHot(p.cite)}
            onBlur={() => setHot(null)}
            aria-label={`Source ${p.cite}`}
          >
            {pad(p.cite)}
          </button>
        </span>
      ),
    );

  return (
    <div className={`chat${showSide ? " has-side" : ""}${open && showSide ? " is-reading" : ""}`}>
      <div className="chat-main">
        <header className="chat-head">
          <span className="chat-title">{r.topic}</span>
          <span className="meta chat-scope">{r.scope}</span>
        </header>

        <div className="thread">
          <div className="msg msg--user enter">
            <p className="bubble">{r.question}</p>
          </div>

          <div className="msg msg--ai">
            <span className="ai-mark" aria-hidden>
              O
            </span>
            <div className="ai-body">
              {phase === "processing" ? (
                <Processing stats={r.stats} sources={r.citations.length} onDone={finish} />
              ) : kind !== "answer" ? (
                <StateBody research={r} base={base} renderParts={renderParts} />
              ) : (
                <div className="answer enter">
                  {r.lead.map((para, i) => (
                    <p key={i} className="answer-p">
                      {renderParts(para, `l${i}`)}
                    </p>
                  ))}
                  <p className="answer-h">{r.conditionsLabel}</p>
                  <ul className="answer-list">
                    {r.conditions.map((para, i) => (
                      <li key={i}>{renderParts(para, `c${i}`)}</li>
                    ))}
                  </ul>
                  <p className="verify">
                    <strong>Verify before relying.</strong> Each statement links to its passage. The original document is the
                    authority, not this summary.
                  </p>
                  <div className="ai-actions">
                    <button
                      className="btn btn-quiet"
                      onClick={() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1600);
                      }}
                    >
                      <Copy /> {copied ? "Copied" : "Copy with citations"}
                    </button>
                    <button className="btn btn-quiet">
                      <Download /> Export
                    </button>
                    <span className="meta ai-time">{r.askedAt}</span>
                  </div>
                  <div className="follow-chips">
                    {r.followUps.map((f) => (
                      <Link key={f} href={`${base}/${r.slug}?fresh=f${f.length}`} className="chip">
                        {f} <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="chat-dock">
          <Composer variant="box" target={base} placeholder="Ask a follow-up" />
          <p className="dock-note">Answers come only from cited sources. Verify before relying on them.</p>
        </div>
      </div>

      {showSide &&
        (open ? (
          <SourcePanel
            key="panel"
            research={r}
            n={open}
            onChange={openCite}
            onClose={() => openCite(null)}
            readerHref={(c) => `${readerBase}/${c.doc}?page=${c.pdf}&from=${r.slug}&cite=${c.n}`}
          />
        ) : (
          <aside id="closest" className="side enter" aria-label="Sources">
            <div className="side-head">
              <h2 className="side-title">{kind === "insufficient" ? "Closest passages" : "Sources"}</h2>
              <span className="meta">
                {r.citations.length} passages · {docCount} documents
              </span>
            </div>
            <ol className="side-list">
              {r.citations.map((c) => (
                <li key={c.n}>
                  <button
                    className={`src${hot === c.n ? " is-hot" : ""}`}
                    onMouseEnter={() => setHot(c.n)}
                    onMouseLeave={() => setHot(null)}
                    onFocus={() => setHot(c.n)}
                    onBlur={() => setHot(null)}
                    onClick={() => openCite(c.n)}
                  >
                    <span className="src-top">
                      <span className="src-num">{pad(c.n)}</span>
                      <span className="src-type">{c.docType}</span>
                    </span>
                    <span className="src-title">{docs[c.doc].title}</span>
                    <span className="src-loc">
                      {c.locator} · p. {c.pdf || "[00]"}
                    </span>
                    <span className="src-quote">“{c.quote}”</span>
                    <span className="src-open">
                      Open page <ArrowRight size={13} />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>
        ))}
    </div>
  );
}
