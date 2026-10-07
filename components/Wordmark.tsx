import Link from "next/link";

/** Serif lockup for public pages; stacked lockup (with `sub`) for the workspace. */
export function Wordmark({ href = "/", sub }: { href?: string; sub?: string }) {
  return (
    <Link href={href} className={`wm${sub ? "" : " wm--serif"}`} aria-label="ODPP Research, home">
      <span className="wm-seal" aria-hidden>
        O
      </span>
      {sub ? (
        <span className="wm-text">
          <span className="wm-name">ODPP</span>
          <span className="wm-sub">{sub}</span>
        </span>
      ) : (
        <span className="wm-serif">ODPP Research</span>
      )}
    </Link>
  );
}
