"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "../Wordmark";
import { Close, Menu } from "../Icons";

const LINKS = [
  { href: "/find", label: "Search" },
  { href: "/#collection", label: "Library" },
  { href: "/#how", label: "How it works" },
  { href: "/#topics", label: "Topics" },
];

/** Wordmark left, centred links, staff sign-in right. */
export function PublicNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`pn${scrolled ? " is-scrolled" : ""}`}>
      <div className="pn-inner">
        <Wordmark />
        <nav className="pn-links" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="pn-link" aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="pn-right">
          <Link href="/ask" className="btn btn-primary pn-signin">
            Staff sign in
          </Link>
          <button className="icon-btn pn-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="pn-sheet" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/ask" className="btn btn-primary">
            Staff sign in
          </Link>
        </nav>
      )}
    </header>
  );
}
