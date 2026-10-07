import Link from "next/link";
import { Wordmark } from "../Wordmark";

const cols = [
  { h: "Research", items: [["Ask a question", "/research/discontinue-a-prosecution"], ["Search", "/find"], ["How answers are made", "/#how"]] },
  { h: "Collection", items: [["Constitution of Kenya", "/read/constitution"], ["ODPP publications", "/read/decision-to-charge"], ["Laws of Kenya", "/read/criminal-procedure-code"]] },
  { h: "Help", items: [["Accessibility", "/"], ["Privacy", "/"], ["Report a problem", "/"], ["Staff sign in", "/ask"]] },
];

export function Footer() {
  return (
    <footer className="footer on-navy">
      <div className="footer-inner">
        <div className="footer-id">
          <Wordmark />
          <p className="footer-office">Office of the Director of Public Prosecutions</p>
          <p className="footer-addr">
            Republic of Kenya · <span className="ph">[ADDRESS]</span> · <span className="ph">[PHONE]</span>
          </p>
        </div>
        <div className="footer-cols">
          {cols.map((c) => (
            <div key={c.h}>
              <p className="footer-h">{c.h}</p>
              <ul>
                {c.items.map(([l, h]) => (
                  <li key={l}>
                    <Link href={h} className="link">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Office of the Director of Public Prosecutions</span>
        <span>Design concept, not an official service · sample content · always verify against the original.</span>
      </div>
    </footer>
  );
}
