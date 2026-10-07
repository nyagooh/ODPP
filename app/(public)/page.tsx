import Image from "next/image";
import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { HeroAsk } from "@/components/public/HeroAsk";
import { EvidenceDemo } from "@/components/public/EvidenceDemo";
import { Footer } from "@/components/public/Footer";
import { ArrowRight } from "@/components/Icons";
import { collection, defaultResearch, docs, pad, topics } from "@/lib/content";
import judiciary from "@/public/images/judiciary.jpg";
import nairobi from "@/public/images/nairobi.jpg";
import scales from "@/public/images/scales.jpg";

export default function Landing() {
  return (
    <>
      <PublicNav />
      <main>
        {/* Centred hero */}
        <section className="hero">
          <p className="hero-eyebrow enter">
            <span className="hero-seal" aria-hidden />
            Office of the Director of Public Prosecutions · Republic of Kenya
          </p>
          <h1 className="display hero-title enter" style={{ animationDelay: "60ms" }}>
            Search Kenya’s
            <br />
            prosecution guidance.
          </h1>
          <p className="hero-sub enter" style={{ animationDelay: "110ms" }}>
            Plain answers drawn only from official sources — with every statement one click from the page it came from.
          </p>
          <div className="enter" style={{ animationDelay: "170ms" }}>
            <HeroAsk />
          </div>
        </section>

        {/* Near edge-to-edge photograph */}
        <figure className="pano enter" style={{ animationDelay: "240ms" }}>
          <Image src={nairobi} alt="Nairobi at sunset" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 38%" }} placeholder="blur" />
          <div className="pano-card" aria-hidden>
            <div className="ref-head">
              <span className="ref-num">01</span>
              <span className="ref-line" />
            </div>
            <p className="pano-card-type">Constitution of Kenya, 2010</p>
            <p className="pano-card-quote">“…discontinue at any stage before judgment is delivered any criminal proceedings…”</p>
            <p className="pano-card-loc">Art. 157(6)(c) · PDF p. 98 · printed p. 96</p>
          </div>
          <figcaption className="pano-caption">Nairobi</figcaption>
        </figure>

        {/* Answer ↔ source, shown as the product itself */}
        <section id="how" className="how" aria-labelledby="how-title">
          <p className="eyebrow">How answers are made</p>
          <h2 id="how-title" className="title-1 how-title">
            Read the answer.
            <br />
            Then read the source.
          </h2>
          <p className="how-sub">Point at any statement. The passage it came from is already marked on the page.</p>
          <div className="window">
            <div className="window-bar" aria-hidden>
              <span className="window-mark" />
              <span>ODPP Research</span>
              <span className="window-scope">ODPP publications + Constitution</span>
            </div>
            <EvidenceDemo />
          </div>
          <ol className="how-steps">
            {[
              ["Ask in plain language", "Or search for an article, section or phrase."],
              ["Every statement is cited", "Answers are written only from retrieved passages."],
              ["Open the exact page", "The passage is marked in the original document."],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="how-step-num">{pad(i + 1)}</span>
                <span className="how-step-title">{t}</span>
                <span className="how-step-text">{d}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Two wide photographs with editorial captions */}
        <section className="duo" aria-label="Principles">
          <Link href="/read/constitution?page=98" className="duo-tile">
            <Image src={judiciary} alt="The Judiciary building, Nairobi" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "50% 30%" }} placeholder="blur" />
            <span className="duo-copy">
              <span className="duo-title">The original always outranks the summary.</span>
              <span className="duo-link">
                Open the Constitution <ArrowRight size={16} />
              </span>
            </span>
          </Link>
          <Link href={`/research/${defaultResearch}`} className="duo-tile">
            <Image src={scales} alt="Scales of justice on a desk" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "50% 40%" }} placeholder="blur" />
            <span className="duo-copy">
              <span className="duo-title">No source, no statement.</span>
              <span className="duo-link">
                See a cited answer <ArrowRight size={16} />
              </span>
            </span>
          </Link>
        </section>

        {/* Explore the collection */}
        <section id="collection" className="explore" aria-labelledby="explore-title">
          <p className="eyebrow">The collection</p>
          <h2 id="explore-title" className="title-1 explore-title">
            Explore the documents behind every answer.
          </h2>
          <ul className="shelf">
            {collection.map((d, i) => (
              <li key={d.slug}>
                <Link href={`/read/${d.slug}`} className={`cover${i === 0 ? " cover--navy" : ""}`}>
                  <span className="cover-type">{d.type}</span>
                  <span className="cover-rule" aria-hidden />
                  <span className="cover-title">{d.title}</span>
                  <span className="cover-sum">{docs[d.slug].summary}</span>
                  <span className={`cover-year${d.year.startsWith("[") ? " ph" : ""}`}>{d.year}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div id="topics" className="topics">
            <p className="topics-label">Or start from a topic</p>
            <ul className="topic-chips">
              {topics.map((t) => (
                <li key={t.title}>
                  <Link href={`/research/${defaultResearch}`} className="topic-chip">
                    {t.title} <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
