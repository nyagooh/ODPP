import Link from "next/link";
import type { AnswerPart, Research } from "@/lib/content";
import { ArrowRight } from "../Icons";

/** Partial, withheld and insufficient-evidence outcomes: calm, typographic, useful. */
export function StateBody({
  research: r,
  base,
  renderParts,
}: {
  research: Research;
  base: string;
  renderParts: (parts: AnswerPart[], key: string) => React.ReactNode;
}) {
  if (r.kind === "partial")
    return (
      <div className="answer enter">
        <p className="state-tag state-tag--gold">
          <span className="dot dot--gold" /> Partial answer
        </p>
        <p className="state-lede">The selected sources cover part of this question.</p>

        <div className="answer-section">
          <p className="eyebrow">Supported</p>
          {r.lead.map((para, i) => (
            <p key={i} className="answer-p">
              {renderParts(para, `l${i}`)}
            </p>
          ))}
        </div>

        <div className="answer-section">
          <p className="eyebrow">Not found in these sources</p>
          <ul className="gaps">
            {r.notFound?.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>

        <div className="state-actions">
          <Link href={`${base}/${r.slug}?fresh=laws`} className="btn btn-primary">
            Include Laws of Kenya and ask again
          </Link>
          <Link href={base === "/ask" ? "/library" : "/#collection"} className="btn btn-secondary">
            Browse the library
          </Link>
        </div>
      </div>
    );

  if (r.kind === "insufficient")
    return (
      <div className="answer enter">
        <p className="state-tag">
          <span className="state-rule" /> Insufficient evidence
        </p>
        <h2 className="state-title">The available sources do not fully support an answer.</h2>
        <p className="state-text">
          Rather than guess, ODPP Research shows the closest passages it found. Read them, or narrow the question to a
          specific provision.
        </p>
        <div className="state-actions">
          <a href="#closest" className="btn btn-primary">
            View related sources <ArrowRight size={16} className="arrow" />
          </a>
          <Link href={base === "/ask" ? "/ask" : "/"} className="btn btn-secondary">
            Rephrase the question
          </Link>
        </div>
        <div className="answer-section">
          <p className="eyebrow">Try instead</p>
          <ul className="follow">
            {r.followUps.map((f) => (
              <li key={f}>
                <Link href={`${base}/discontinue-a-prosecution?fresh=alt`} className="follow-row row-link">
                  <span>{f}</span>
                  <ArrowRight size={16} className="arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

  // withheld
  return (
    <div className="answer enter state-solo">
      <p className="state-quote">“{r.question}”</p>
      <p className="state-tag state-tag--crimson">
        <span className="state-rule" /> No answer given
      </p>
      <h1 className="state-title state-title--lg">This needs judgement on a live case.</h1>
      <p className="state-text">
        ODPP Research answers from published guidance. It doesn’t predict outcomes or advise on individual matters.
      </p>
      <div className="state-actions">
        <Link href={base === "/ask" ? "/search?q=plea+agreement" : "/find?q=plea+agreement"} className="btn btn-primary">
          Search guidance on plea agreements
        </Link>
        <Link href={base === "/ask" ? "/ask" : "/"} className="btn btn-secondary">
          Ask a general question
        </Link>
      </div>
      <div className="answer-section">
        <p className="eyebrow">Relevant guidance</p>
        <ul className="guidance">
          {r.guidance?.map((g) => (
            <li key={g.title}>
              <Link href={g.href} className="guide row-link">
                <span className="eyebrow guide-type">{g.type}</span>
                <span className="guide-title">{g.title}</span>
                <span className={`meta guide-loc${g.locator.startsWith("[") ? " ph" : ""}`}>{g.locator}</span>
                <ArrowRight size={16} className="arrow guide-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
