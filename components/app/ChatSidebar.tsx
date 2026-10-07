"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { recentResearch } from "@/lib/content";
import { Wordmark } from "../Wordmark";
import { Close, Menu, PanelRight, Plus, SearchIcon, SignOut } from "../Icons";
import { useStatus } from "./Status";

const TOOLS = [
  { href: "/search", label: "Search documents" },
  { href: "/library", label: "Library" },
  { href: "/documents", label: "My Documents" },
];

/** Familiar AI-product sidebar: new chat, tools, history, account. Light and collapsible. */
export function ChatSidebar() {
  const pathname = usePathname();
  const { aiPaused, toggle } = useStatus();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem("odpp-rag:sb") === "1");
    } catch {}
  }, []);
  const flip = () =>
    setCollapsed((c) => {
      try {
        localStorage.setItem("odpp-rag:sb", c ? "0" : "1");
      } catch {}
      return !c;
    });

  return (
    <>
      <div className="mbar">
        <button className="icon-btn" aria-label="Open sidebar" onClick={() => setOpen(true)}>
          <Menu />
        </button>
        <Wordmark href="/ask" />
        <Link href="/ask" className="icon-btn" aria-label="New chat">
          <Plus size={18} />
        </Link>
      </div>
      {open && <div className="csb-scrim" onClick={() => setOpen(false)} aria-hidden />}

      <aside className={`csb${collapsed ? " is-collapsed" : ""}${open ? " is-open" : ""}`} aria-label="Chats">
        <div className="csb-head">
          <Wordmark href="/ask" />
          <button className="icon-btn csb-toggle" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={flip}>
            <PanelRight />
          </button>
          <button className="icon-btn csb-close" aria-label="Close sidebar" onClick={() => setOpen(false)}>
            <Close />
          </button>
        </div>

        <Link href="/ask" className="csb-new" aria-current={pathname === "/ask" ? "page" : undefined}>
          <Plus size={18} />
          <span>New chat</span>
        </Link>

        <nav className="csb-tools" aria-label="Tools">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="csb-item" aria-current={pathname.startsWith(t.href) ? "page" : undefined}>
              <span className="csb-ico" aria-hidden>
                {t.href === "/search" ? <SearchIcon /> : <span className="csb-dot" />}
              </span>
              <span>{t.label}</span>
            </Link>
          ))}
        </nav>

        <div className="csb-hist">
          <p className="csb-label">Recent</p>
          <ul>
            {recentResearch.map((r) => (
              <li key={r.slug}>
                <Link href={`/ask/${r.slug}`} className="csb-chat" aria-current={pathname === `/ask/${r.slug}` ? "page" : undefined}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="csb-foot">
          <button className={`csb-status${aiPaused ? " is-paused" : ""}`} onClick={toggle} title="Prototype: simulate an AI outage">
            <span className={`dot${aiPaused ? " dot--crimson" : ""}`} />
            <span className="csb-hide">{aiPaused ? "AI answers paused" : "All systems normal"}</span>
            <span className="csb-hide csb-status-act">{aiPaused ? "Restore" : "Simulate"}</span>
          </button>
          <div className="csb-user">
            <span className="avatar">WK</span>
            <span className="csb-hide csb-user-text">
              <span className="csb-user-name">Wanjiru Kamau</span>
              <span className="csb-user-role">Prosecution Counsel</span>
            </span>
            <Link href="/" className="icon-btn csb-hide" aria-label="Sign out" title="Sign out">
              <SignOut />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
