"use client";

import { useEffect, useState } from "react";
import { docs, pad, research } from "@/lib/content";
import { DocPage } from "../DocPage";

const r = research["discontinue-a-prosecution"];
const shown = r.citations.filter((c) => c.doc === "constitution");
const sentences = [
  { cite: 1, text: "The DPP may discontinue criminal proceedings at any stage before judgment is delivered." },
  { cite: 2, text: "The court’s permission is required." },
  { cite: 3, text: "The decision must have regard to the public interest and the need to prevent abuse of the legal process." },
];

/**
 * The product's promise made tangible: each statement lights up the passage
 * it came from. Cycles on its own; hovering takes over.
 */
export function EvidenceDemo() {
  const [active, setActive] = useState(1);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a % shown.length) + 1), 3400);
    return () => clearTimeout(t);
  }, [active, held]);

  const c = shown.find((x) => x.n === active)!;
  const page = docs.constitution.pages.find((p) => p.pdf === c.pdf)!;
  const visible = {
    ...page,
    blocks: page.blocks.filter((b) => b.kind === "clause" && !b.id.startsWith("158") && !["157-1", "157-2", "157-3", "157-4", "157-5", "157-6a", "157-9", "157-12"].includes(b.id)),
  };

  return (
    <div className="ed" onMouseLeave={() => setHeld(false)}>
      <div className="ed-answer">
        <p className="ed-q">When can the DPP discontinue a prosecution?</p>
        <p className="ed-text">
          {sentences.map((s) => (
            <span
              key={s.cite}
              className={`ed-claim${active === s.cite ? " is-on" : ""}`}
              onMouseEnter={() => {
                setHeld(true);
                setActive(s.cite);
              }}
            >
              {s.text}
              <button className="ed-cite" onFocus={() => setActive(s.cite)} aria-label={`Source ${s.cite}`}>
                {pad(s.cite)}
              </button>{" "}
            </span>
          ))}
        </p>
        <div className="ed-ref" key={active}>
          <span className="ed-ref-num">{pad(active)}</span>
          <span className="ed-ref-line" />
          <span className="ed-ref-text">
            {c.locator} · PDF p. {c.pdf} · printed p. {c.printed}
          </span>
        </div>
      </div>
      <div className="ed-source" aria-hidden>
        <div className="ed-page" key={page.pdf}>
          <DocPage page={visible} cited={c.clauses} citeNumber={c.n} reveal folio={false} />
        </div>
      </div>
    </div>
  );
}
