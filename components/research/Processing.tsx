"use client";

import { useEffect, useState } from "react";
import { Check } from "../Icons";

const STEP_MS = 900;

export function Processing({
  stats,
  sources,
  onDone,
}: {
  stats: { passages: number; documents: number };
  sources: number;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Searching sources", detail: `${stats.passages} passages across ${stats.documents} documents` },
    { label: "Checking citations", detail: "Matching each statement to its passage" },
    { label: "Preparing answer", detail: `Only cited statements are kept · ${sources} sources` },
  ];

  useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(onDone, 380);
    return () => clearTimeout(t);
  }, [step, steps.length, onDone]);

  return (
    <ol className="proc" aria-live="polite">
      {steps.map((s, i) => {
        const state = i < step ? "done" : i === step ? "active" : "waiting";
        return (
          <li key={s.label} className={`proc-step is-${state}`}>
            <span className="proc-num">{state === "done" ? <Check /> : String(i + 1).padStart(2, "0")}</span>
            <span className="proc-text">
              <span className="proc-label">{s.label}</span>
              <span className="proc-detail">{state === "waiting" ? " " : s.detail}</span>
            </span>
            <span className="proc-line" style={{ ["--d" as string]: `${STEP_MS}ms` }} aria-hidden />
          </li>
        );
      })}
    </ol>
  );
}
