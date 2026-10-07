import { Fragment } from "react";
import { type DocPage as Page, pad } from "@/lib/content";

function highlight(text: string, term: string | undefined, startIndex: number, current: number) {
  if (!term || term.length < 2) return { nodes: [text] as React.ReactNode[], count: 0 };
  const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(re);
  let count = 0;
  const nodes = parts.map((p, i) => {
    if (i % 2 === 1) {
      const idx = startIndex + count++;
      return (
        <mark key={i} data-match={idx} className={idx === current ? "is-current" : undefined}>
          {p}
        </mark>
      );
    }
    return <Fragment key={i}>{p}</Fragment>;
  });
  return { nodes, count };
}

export function DocPage({
  page,
  cited = [],
  citeNumber,
  reveal = false,
  term,
  currentMatch = -1,
  folio = true,
}: {
  page: Page;
  cited?: string[];
  citeNumber?: number;
  reveal?: boolean;
  term?: string;
  currentMatch?: number;
  folio?: boolean;
}) {
  let firstTagged = false;
  let matchIndex = 0;
  return (
    <article className="page">
      <div className="page-running">
        <span>{page.running[0]}</span>
        <span>{page.running[1]}</span>
      </div>
      {page.blocks.map((b, i) => {
        if (b.kind === "heading") return <h4 key={i}>{b.text}</h4>;
        const isCited = cited.includes(b.id);
        const showTag = isCited && citeNumber && !firstTagged;
        if (showTag) firstTagged = true;
        const { nodes, count } = highlight(b.text, term, matchIndex, currentMatch);
        matchIndex += count;
        return (
          <p
            key={b.id}
            id={`clause-${b.id}`}
            className={`clause${isCited ? " is-cited" : ""}${isCited && reveal ? " is-reveal" : ""}`}
            data-indent={b.indent ?? 0}
          >
            {showTag && (
              <span className="clause-tag" aria-label={`Citation ${citeNumber}`}>
                {pad(citeNumber!)}
              </span>
            )}
            {nodes}
          </p>
        );
      })}
      {folio && <div className="page-folio">{page.printed || "[00]"}</div>}
    </article>
  );
}

export function countMatches(page: Page, term: string) {
  if (!term || term.length < 2) return 0;
  const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return page.blocks.reduce((n, b) => n + (b.text.match(re)?.length ?? 0), 0);
}
