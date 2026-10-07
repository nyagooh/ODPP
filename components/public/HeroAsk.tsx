"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { defaultResearch } from "@/lib/content";
import { ArrowRight, Mic } from "../Icons";

const TRIES = [
  { label: "When can the DPP discontinue a prosecution?", mode: "ask" as const },
  { label: "Article 157", mode: "search" as const },
  { label: "plea agreement", mode: "search" as const },
];

/** The front door: one field, two intents. */
export function HeroAsk() {
  const router = useRouter();
  const [mode, setMode] = useState<"ask" | "search">("ask");
  const [value, setValue] = useState("");

  const go = () => {
    if (mode === "search") router.push(`/find?q=${encodeURIComponent(value || "discontinue")}`);
    else router.push(`/research/${defaultResearch}?fresh=${Date.now().toString(36)}`);
  };

  return (
    <div className="ha">
      <div className="ha-modes" role="tablist" aria-label="Mode">
        {(["ask", "search"] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m} className="ha-mode" onClick={() => setMode(m)}>
            {m === "ask" ? "Ask a question" : "Search the documents"}
          </button>
        ))}
      </div>
      <form
        className="ha-box"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <label htmlFor="ha-q" className="visually-hidden">
          {mode === "ask" ? "Ask a question" : "Search the documents"}
        </label>
        <input
          id="ha-q"
          className="ha-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={mode === "ask" ? "Ask in plain language — who can stop a prosecution?" : "An article, section or phrase — Article 157"}
          autoComplete="off"
        />
        <button type="button" className="icon-btn ha-mic" aria-label="Ask by voice">
          <Mic size={20} />
        </button>
        <button type="submit" className="ha-send">
          {mode === "ask" ? "Ask" : "Search"} <ArrowRight size={18} />
        </button>
      </form>
      <p className="ha-tries">
        {TRIES.map((t) => (
          <Link key={t.label} href={t.mode === "ask" ? `/research/${defaultResearch}?fresh=try` : `/find?q=${encodeURIComponent(t.label)}`} className="ha-try">
            {t.label}
          </Link>
        ))}
      </p>
    </div>
  );
}
