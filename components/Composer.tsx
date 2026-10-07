"use client";

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { defaultResearch } from "@/lib/content";
import { ArrowRight, ChevronDown, Mic } from "./Icons";

type Variant = "hero" | "box" | "compact";

export function Composer({
  variant = "box",
  placeholder = "Ask a question or search for a provision",
  target = "/ask",
  autoFocus = false,
  label = "Ask a question or search for a provision",
  voice = true,
}: {
  variant?: Variant;
  placeholder?: string;
  target?: string;
  autoFocus?: boolean;
  label?: string;
  voice?: boolean;
}) {
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  useEffect(() => {
    if (autoFocus) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // Prototype: every question resolves to the sample research.
    router.push(`${target}/${defaultResearch}?fresh=${Date.now().toString(36)}`);
  };

  const cls = variant === "hero" ? "composer composer--hero" : `composer composer--box${variant === "compact" ? " composer--compact" : ""}`;

  return (
    <form className={cls} onSubmit={submit} role="search">
      <label className="visually-hidden" htmlFor={`composer-${variant}`}>
        {label}
      </label>
      <textarea
        id={`composer-${variant}`}
        ref={ref}
        rows={1}
        className="composer-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) submit(e);
        }}
      />
      <div className="composer-actions">
        {voice && (
          <button type="button" className="icon-btn" aria-label="Ask by voice">
            <Mic />
          </button>
        )}
        <button type="submit" className="composer-send" aria-label="Submit">
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
}

export function Modes({ value, onChange }: { value: "search" | "ask"; onChange: (v: "search" | "ask") => void }) {
  const searchRef = useRef<HTMLButtonElement>(null);
  const askRef = useRef<HTMLButtonElement>(null);
  const [marker, setMarker] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = value === "search" ? searchRef.current : askRef.current;
    if (el) setMarker({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value]);

  return (
    <div className="modes" role="group" aria-label="Mode">
      <button ref={searchRef} type="button" className="mode" aria-pressed={value === "search"} onClick={() => onChange("search")}>
        Search
      </button>
      <span className="modes-line" aria-hidden />
      <button ref={askRef} type="button" className="mode" aria-pressed={value === "ask"} onClick={() => onChange("ask")}>
        Ask
      </button>
      <span className="modes-marker" style={marker} aria-hidden />
    </div>
  );
}

const SCOPES = [
  { key: "odpp", label: "ODPP publications", note: "Policies, guidelines and circulars", default: true },
  { key: "const", label: "Constitution of Kenya, 2010", note: "All chapters and schedules", default: true },
  { key: "laws", label: "Laws of Kenya", note: "Acts of Parliament · wider and slower", default: false },
];

export function Scope() {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(SCOPES.map((s) => [s.key, s.default])));
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const summary =
    SCOPES.filter((s) => on[s.key])
      .map((s) => (s.key === "const" ? "Constitution" : s.label))
      .join(" + ") || "No sources selected";

  return (
    <div className="scope" ref={wrap}>
      <span>{summary}</span>
      <button type="button" className="scope-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        Scope <ChevronDown />
      </button>
      {open && (
        <div className="scope-menu" role="dialog" aria-label="Sources to search">
          {SCOPES.map((s) => (
            <label key={s.key} className="scope-opt">
              <input type="checkbox" checked={on[s.key]} onChange={() => setOn((o) => ({ ...o, [s.key]: !o[s.key] }))} />
              <span>
                <strong>{s.label}</strong>
                <span>{s.note}</span>
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
