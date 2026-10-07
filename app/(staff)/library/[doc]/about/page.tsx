import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Download } from "@/components/Icons";
import { docs, pad, research, saved } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export default async function DocDetail({ params }: PageProps<"/library/[doc]/about">) {
  const { doc: slug } = await params;
  const d = docs[slug];
  if (!d) notFound();

  const citedIn = Object.values(research).filter((r) => r.citations.some((c) => c.doc === slug));
  const highlights = saved.highlights.filter((h) => h.doc === slug);
  const readHref = (pdf?: number) => `/library/${slug}${pdf ? `?page=${pdf}` : ""}`;

  return (
    <div className="plain">
      <header className="workbar">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/library">Library</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{d.short}</span>
        </nav>
      </header>

      <div className="dd">
        <div className="dd-main">
          <p className="eyebrow enter">{d.type}</p>
          <h1 className="title-1 dd-title enter">{d.title}</h1>
          <p className="lede dd-sum enter">{d.summary}</p>
          <div className="state-actions enter">
            <Link href={readHref(d.contents.find((c) => c.pdf)?.pdf)} className="btn btn-primary">
              Open in reader <ArrowUpRight size={15} />
            </Link>
            <a href="#" className="btn btn-secondary">
              <Download /> Original PDF
            </a>
            <Link href="/ask" className="btn btn-quiet">
              Ask about this document
            </Link>
          </div>

          <section className="dd-section">
            <p className="eyebrow">Contents</p>
            <ol className="dd-contents">
              {d.contents.map((c, i) => (
                <li key={c.label}>
                  <Link href={readHref(c.pdf)} className="dd-c row-link">
                    <span className="dd-c-num">{pad(i + 1)}</span>
                    <span className={`dd-c-label${c.label.startsWith("[") ? " ph" : ""}`}>{c.label}</span>
                    <span className="meta dd-c-page">{c.pdf ? `PDF p. ${c.pdf}` : ""}</span>
                    <ArrowRight size={16} className="arrow dd-c-arrow" />
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="dd-side">
          <section className="dd-card">
            <p className="eyebrow">Document</p>
            <dl className="dd-dl">
              {d.details.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className={v.startsWith("[") ? "ph" : undefined}>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {citedIn.length > 0 && (
            <section className="dd-card">
              <p className="eyebrow">Cited in your research</p>
              <ul className="dd-list">
                {citedIn.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/ask/${r.slug}`} className="link">
                      {r.question}
                    </Link>
                    <span className="meta">{r.citations.filter((c) => c.doc === slug).length} citations</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {highlights.length > 0 && (
            <section className="dd-card">
              <p className="eyebrow">Your highlights</p>
              <ul className="dd-list">
                {highlights.map((h) => (
                  <li key={h.locator}>
                    <Link href={readHref(h.pdf)} className="dd-hl">
                      {h.text}
                    </Link>
                    <span className="meta">{h.locator}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
