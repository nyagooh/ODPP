import Link from "next/link";
import { Composer, Scope } from "@/components/Composer";
import { PausedBanner } from "@/components/app/Status";
import { defaultResearch, suggested } from "@/lib/content";

export default function AskEmpty() {
  return (
    <div className="newchat">
      <PausedBanner>
        You can still search the documents and open the reader.{" "}
        <Link href="/search" className="link">
          Go to Search
        </Link>
      </PausedBanner>
      <div className="newchat-stage">
        <h1 className="newchat-title enter">What does the law say?</h1>
        <p className="newchat-sub enter" style={{ animationDelay: "60ms" }}>
          Ask about ODPP guidance or the Constitution. Every answer is cited to the original page.
        </p>
        <div className="newchat-composer enter" style={{ animationDelay: "110ms" }}>
          <Composer variant="box" target="/ask" autoFocus placeholder="Ask a question or search for a provision" />
          <div className="newchat-under">
            <Scope />
          </div>
        </div>
        <div className="newchat-chips enter" style={{ animationDelay: "170ms" }}>
          {suggested.map((s) => (
            <Link key={s.q} href={`/ask/${defaultResearch}?fresh=1`} className="chip chip--lg">
              <span>{s.q}</span>
              <span className="chip-meta">{s.meta}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
