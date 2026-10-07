"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Status = { aiPaused: boolean; toggle: () => void };

const Ctx = createContext<Status>({ aiPaused: false, toggle: () => {} });
const KEY = "odpp-rag:ai-paused";

/** Prototype switch for the "AI answers paused" state. Remembered per browser. */
export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [aiPaused, setPaused] = useState(false);

  useEffect(() => {
    try {
      setPaused(localStorage.getItem(KEY) === "1");
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setPaused((p) => {
      try {
        localStorage.setItem(KEY, p ? "0" : "1");
      } catch {}
      return !p;
    });
  }, []);

  return <Ctx.Provider value={{ aiPaused, toggle }}>{children}</Ctx.Provider>;
}

export const useStatus = () => useContext(Ctx);

export function PausedBanner({ children }: { children?: React.ReactNode }) {
  const { aiPaused, toggle } = useStatus();
  if (!aiPaused) return null;
  return (
    <div className="paused enter" role="status">
      <span className="dot dot--crimson" />
      <p>
        <strong>AI answers are paused.</strong> {children ?? "Search and the document reader are working."}
      </p>
      <button className="paused-btn link" onClick={toggle}>
        Restore (prototype)
      </button>
    </div>
  );
}
