// Sample content for the prototype. Bracketed values are placeholders for real ODPP data.

export type Block =
  | { kind: "heading"; text: string }
  | { kind: "clause"; id: string; text: string; indent?: 0 | 1 };

export type DocPage = {
  pdf: number;
  printed: number;
  running: [string, string];
  blocks: Block[];
};

export type Doc = {
  slug: string;
  type: string;
  collection: "Constitution" | "ODPP publications" | "Laws of Kenya";
  title: string;
  short: string;
  year: string;
  totalPages: number;
  status: string;
  summary: string;
  contents: { label: string; pdf?: number }[];
  details: [string, string][];
  pages: DocPage[];
};

const constitutionPages: DocPage[] = [
  {
    pdf: 97,
    printed: 95,
    running: ["The Constitution of Kenya, 2010", "Chapter Nine — The Executive"],
    blocks: [
      { kind: "heading", text: "156. Attorney-General" },
      { kind: "clause", id: "156-1", text: "(1) There is established the office of Attorney-General." },
      { kind: "clause", id: "156-2", text: "(2) The Attorney-General shall be nominated and, with the approval of the National Assembly, appointed by the President." },
      { kind: "clause", id: "156-3", text: "(3) The qualifications for appointment as Attorney-General are the same as for appointment as a judge of the High Court." },
      { kind: "clause", id: "156-4", text: "(4) The Attorney-General—" },
      { kind: "clause", id: "156-4a", indent: 1, text: "(a) is the principal legal adviser to the Government;" },
      { kind: "clause", id: "156-4b", indent: 1, text: "(b) shall represent the national government in court or in any other legal proceedings to which the national government is a party, other than criminal proceedings; and" },
      { kind: "clause", id: "156-4c", indent: 1, text: "(c) shall perform any other functions conferred on the office by an Act of Parliament or by the President." },
      { kind: "clause", id: "156-5", text: "(5) The Attorney-General shall have authority, with the leave of the court, to appear as a friend of the court in any civil proceedings to which the Government is not a party." },
      { kind: "clause", id: "156-6", text: "(6) The Attorney-General shall promote, protect and uphold the rule of law and defend the public interest." },
    ],
  },
  {
    pdf: 98,
    printed: 96,
    running: ["The Constitution of Kenya, 2010", "Chapter Nine — The Executive"],
    blocks: [
      { kind: "heading", text: "157. Director of Public Prosecutions" },
      { kind: "clause", id: "157-1", text: "(1) There is established the office of Director of Public Prosecutions." },
      { kind: "clause", id: "157-2", text: "(2) The Director of Public Prosecutions shall be nominated and, with the approval of the National Assembly, appointed by the President." },
      { kind: "clause", id: "157-3", text: "(3) The qualifications for appointment as Director of Public Prosecutions are the same as for the appointment as a judge of the High Court." },
      { kind: "clause", id: "157-4", text: "(4) The Director of Public Prosecutions shall have power to direct the Inspector-General of the National Police Service to investigate any information or allegation of criminal conduct and the Inspector-General shall comply with any such direction." },
      { kind: "clause", id: "157-5", text: "(5) The Director of Public Prosecutions shall hold office for a term of eight years and shall not be eligible for re-appointment." },
      { kind: "clause", id: "157-6", text: "(6) The Director of Public Prosecutions shall exercise State powers of prosecution and may—" },
      { kind: "clause", id: "157-6a", indent: 1, text: "(a) institute and undertake criminal proceedings against any person before any court (other than a court martial) in respect of any offence alleged to have been committed;" },
      { kind: "clause", id: "157-6b", indent: 1, text: "(b) take over and continue any criminal proceedings commenced in any court (other than a court martial) that have been instituted or undertaken by another person or authority, with the permission of the person or authority; and" },
      { kind: "clause", id: "157-6c", indent: 1, text: "(c) subject to clause (7) and (8), discontinue at any stage before judgment is delivered any criminal proceedings instituted by the Director of Public Prosecutions or taken over by the Director of Public Prosecutions under paragraph (b)." },
      { kind: "clause", id: "157-7", text: "(7) If the discontinuance of any proceedings under clause (6)(c) takes place after the close of the prosecution’s case, the defendant shall be acquitted." },
    ],
  },
  {
    pdf: 99,
    printed: 97,
    running: ["The Constitution of Kenya, 2010", "Chapter Nine — The Executive"],
    blocks: [
      { kind: "clause", id: "157-8", text: "(8) The Director of Public Prosecutions may not discontinue a prosecution without the permission of the court." },
      { kind: "clause", id: "157-9", text: "(9) The powers of the Director of Public Prosecutions may be exercised in person or by subordinate officers acting in accordance with general or special instructions." },
      { kind: "clause", id: "157-10", text: "(10) The Director of Public Prosecutions shall not require the consent of any person or authority for the commencement of criminal proceedings and in the exercise of his or her powers or functions, shall not be under the direction or control of any person or authority." },
      { kind: "clause", id: "157-11", text: "(11) In exercising the powers conferred by this Article, the Director of Public Prosecutions shall have regard to the public interest, the interests of the administration of justice and the need to prevent and avoid abuse of the legal process." },
      { kind: "clause", id: "157-12", text: "(12) Parliament may enact legislation conferring powers of prosecution on authorities other than the Director of Public Prosecutions." },
      { kind: "heading", text: "158. Removal and resignation of Director of Public Prosecutions" },
      { kind: "clause", id: "158-1", text: "(1) The Director of Public Prosecutions may be removed from office only on the grounds of—" },
      { kind: "clause", id: "158-1a", indent: 1, text: "(a) inability to perform the functions of office arising from mental or physical incapacity;" },
      { kind: "clause", id: "158-1b", indent: 1, text: "(b) non-compliance with Chapter Six;" },
      { kind: "clause", id: "158-1c", indent: 1, text: "(c) bankruptcy;" },
      { kind: "clause", id: "158-1d", indent: 1, text: "(d) incompetence;" },
      { kind: "clause", id: "158-1e", indent: 1, text: "(e) gross misconduct or misbehaviour; or" },
      { kind: "clause", id: "158-1f", indent: 1, text: "(f) any other just cause." },
    ],
  },
];

const dcgPages: DocPage[] = [
  {
    pdf: 0,
    printed: 0,
    running: ["Decision to Charge Guidelines", "[SECTION]"],
    blocks: [
      { kind: "heading", text: "[SECTION] Continuous review" },
      { kind: "clause", id: "dcg-1", text: "[Placeholder paragraph. The real Decision to Charge Guidelines text will appear here once the source PDF is ingested.]" },
      { kind: "clause", id: "dcg-2", text: "[Cited passage on continuous case review: prosecutors keep each case under review against the evidential and public interest tests as the matter proceeds.]" },
      { kind: "clause", id: "dcg-3", text: "[Following paragraph from the original document.]" },
    ],
  },
];

export const docs: Record<string, Doc> = {
  constitution: {
    slug: "constitution",
    type: "Constitution",
    collection: "Constitution",
    title: "The Constitution of Kenya, 2010",
    short: "Constitution of Kenya, 2010",
    year: "2010",
    totalPages: 196,
    status: "In force",
    summary:
      "The supreme law of the Republic of Kenya. Article 157 establishes the office of the Director of Public Prosecutions and sets out its powers, independence and limits.",
    contents: [
      { label: "Chapter Four — The Bill of Rights" },
      { label: "Chapter Nine — The Executive", pdf: 97 },
      { label: "Art. 156 — Attorney-General", pdf: 97 },
      { label: "Art. 157 — Director of Public Prosecutions", pdf: 98 },
      { label: "Art. 158 — Removal and resignation of DPP", pdf: 99 },
      { label: "Chapter Ten — Judiciary" },
    ],
    details: [
      ["Type", "Constitution"],
      ["Status", "In force"],
      ["Source", "[SOURCE]"],
      ["Edition", "[EDITION]"],
      ["Pages", "196 PDF · printed numbering differs"],
    ],
    pages: constitutionPages,
  },
  "decision-to-charge": {
    slug: "decision-to-charge",
    type: "ODPP Guidelines",
    collection: "ODPP publications",
    title: "Decision to Charge Guidelines",
    short: "Decision to Charge Guidelines",
    year: "[YEAR]",
    totalPages: 0,
    status: "[STATUS]",
    summary:
      "Guidance for prosecutors on deciding whether to charge: the evidential test, the public interest test and keeping each case under review.",
    contents: [
      { label: "[SECTION] Introduction" },
      { label: "[SECTION] The evidential test" },
      { label: "[SECTION] The public interest test" },
      { label: "[SECTION] Continuous review", pdf: 0 },
    ],
    details: [
      ["Type", "ODPP Guidelines"],
      ["Status", "[STATUS]"],
      ["Source", "[SOURCE]"],
      ["Edition", "[EDITION]"],
    ],
    pages: dcgPages,
  },
};


function placeholderDoc(slug: string, type: string, collection: Doc["collection"], title: string, summary: string, contents: string[]): Doc {
  return {
    slug,
    type,
    collection,
    title,
    short: title,
    year: "[YEAR]",
    totalPages: 0,
    status: "[STATUS]",
    summary,
    contents: contents.map((label) => ({ label })),
    details: [
      ["Type", type],
      ["Status", "[STATUS]"],
      ["Source", "[SOURCE]"],
      ["Edition", "[EDITION]"],
    ],
    pages: [
      {
        pdf: 0,
        printed: 0,
        running: [title, "[SECTION]"],
        blocks: [
          { kind: "heading", text: "[SECTION]" },
          { kind: "clause", id: `${slug}-1`, text: "[The original text of this document will appear here once the source PDF is ingested.]" },
        ],
      },
    ],
  };
}

docs["national-prosecution-policy"] = placeholderDoc(
  "national-prosecution-policy",
  "ODPP Policy",
  "ODPP publications",
  "National Prosecution Policy",
  "The principles that guide prosecutorial decisions in Kenya, including independence, fairness, plea negotiations and the treatment of victims and witnesses.",
  ["[SECTION] Principles of prosecution", "[SECTION] Plea negotiations", "[SECTION] Victims and witnesses"],
);
docs["diversion-policy"] = placeholderDoc(
  "diversion-policy",
  "ODPP Policy",
  "ODPP publications",
  "Diversion Policy",
  "When a matter may be diverted away from prosecution, the conditions that apply and how diversion is monitored.",
  ["[SECTION] Purpose of diversion", "[SECTION] Eligibility", "[SECTION] Conditions and monitoring"],
);
docs["criminal-procedure-code"] = placeholderDoc(
  "criminal-procedure-code",
  "Act of Parliament",
  "Laws of Kenya",
  "Criminal Procedure Code",
  "Cap. 75. Procedure in criminal courts, including plea agreements under sections 137A–137O.",
  ["Part VIII — Plea agreements (ss. 137A–137O)", "[PART]", "[PART]"],
);

export const outline = [
  { label: "Chapter Eight — The Legislature", children: [] as { label: string; pdf?: number }[] },
  {
    label: "Chapter Nine — The Executive",
    open: true,
    children: [
      { label: "Part 1 — Principles and structure" },
      { label: "Part 2 — The President and Deputy President" },
      { label: "Part 3 — The Cabinet" },
      { label: "Part 4 — Other offices" },
      { label: "156  Attorney-General", pdf: 97 },
      { label: "157  Director of Public Prosecutions", pdf: 98 },
      { label: "158  Removal and resignation of DPP", pdf: 99 },
    ],
  },
  { label: "Chapter Ten — Judiciary", children: [] },
  { label: "Chapter Eleven — Devolved Government", children: [] },
];

export type Citation = {
  n: number;
  doc: string;
  docType: string;
  locator: string;
  pdf: number;
  printed: number;
  quote: string;
  clauses: string[];
};

export type AnswerPart = string | { cite: number; text: string };

export type Guidance = { type: string; title: string; locator: string; href: string };

export type Research = {
  kind?: "answer" | "partial" | "withheld" | "insufficient";
  notFound?: string[];
  guidance?: Guidance[];
  slug: string;
  question: string;
  topic: string;
  scope: string;
  askedAt: string;
  lead: AnswerPart[][];
  conditionsLabel: string;
  conditions: AnswerPart[][];
  citations: Citation[];
  followUps: string[];
  stats: { passages: number; documents: number };
};

export const research: Record<string, Research> = {
  "discontinue-a-prosecution": {
    slug: "discontinue-a-prosecution",
    question: "When can the DPP discontinue a prosecution?",
    topic: "Discontinuing a prosecution",
    scope: "ODPP publications + Constitution",
    askedAt: "4 Oct 2026, 15:42",
    stats: { passages: 41, documents: 6 },
    lead: [
      [
        { cite: 1, text: "The Director of Public Prosecutions may discontinue criminal proceedings that the office instituted or took over, at any stage before judgment is delivered." },
        " ",
        { cite: 2, text: "The court’s permission is required." },
      ],
    ],
    conditionsLabel: "Conditions",
    conditions: [
      [{ cite: 1, text: "If proceedings are discontinued after the close of the prosecution’s case, the accused is acquitted." }],
      [{ cite: 3, text: "The decision must have regard to the public interest, the interests of the administration of justice and the need to prevent abuse of the legal process." }],
      [{ cite: 4, text: "ODPP guidance asks prosecutors to keep cases under review against the evidential and public interest tests." }],
    ],
    citations: [
      { n: 1, doc: "constitution", docType: "Constitution", locator: "Art. 157(6)(c), (7)", pdf: 98, printed: 96, quote: "…discontinue at any stage before judgment is delivered any criminal proceedings…", clauses: ["157-6c", "157-7"] },
      { n: 2, doc: "constitution", docType: "Constitution", locator: "Art. 157(8)", pdf: 99, printed: 97, quote: "…may not discontinue a prosecution without the permission of the court.", clauses: ["157-8"] },
      { n: 3, doc: "constitution", docType: "Constitution", locator: "Art. 157(11)", pdf: 99, printed: 97, quote: "…regard to the public interest, the interests of the administration of justice…", clauses: ["157-11"] },
      { n: 4, doc: "decision-to-charge", docType: "ODPP Guidelines", locator: "[SECTION]", pdf: 0, printed: 0, quote: "[Cited passage on continuous case review]", clauses: ["dcg-2"] },
    ],
    followUps: [
      "What happens if the court refuses permission?",
      "Can a private prosecution be taken over and discontinued?",
    ],
  },
};


research["time-limit-charging"] = {
  kind: "partial",
  slug: "time-limit-charging",
  question: "Is there a time limit for making a charging decision?",
  topic: "Time limit for a charging decision",
  scope: "ODPP publications + Constitution",
  askedAt: "3 Oct 2026, 11:08",
  stats: { passages: 17, documents: 4 },
  lead: [
    [
      { cite: 1, text: "An arrested person must be brought before a court as soon as reasonably possible, and not later than twenty-four hours after arrest." },
      " ",
      { cite: 2, text: "ODPP guidance asks that charging decisions be made without undue delay." },
    ],
  ],
  conditionsLabel: "",
  conditions: [],
  notFound: ["A fixed number of days for a charging decision", "Timelines for specific offences"],
  citations: [
    { n: 1, doc: "constitution", docType: "Constitution", locator: "Art. 49(1)(f)", pdf: 0, printed: 0, quote: "…not later than twenty-four hours after being arrested…", clauses: [] },
    { n: 2, doc: "decision-to-charge", docType: "ODPP Guidelines", locator: "[SECTION]", pdf: 0, printed: 0, quote: "[Cited passage on timeliness]", clauses: ["dcg-2"] },
  ],
  followUps: ["What happens if the 24-hour limit is missed?", "Can police bail be granted before charge?"],
};

research["plea-agreement-matter"] = {
  kind: "withheld",
  slug: "plea-agreement-matter",
  question: "Will the court accept the plea agreement in the [MATTER] case next week?",
  topic: "Plea agreement — specific matter",
  scope: "ODPP publications + Constitution",
  askedAt: "2 Oct 2026, 16:30",
  stats: { passages: 0, documents: 0 },
  lead: [],
  conditionsLabel: "",
  conditions: [],
  citations: [],
  followUps: [],
  guidance: [
    { type: "Laws of Kenya", title: "Criminal Procedure Code — plea agreements", locator: "Sections 137A–137O", href: "/library/criminal-procedure-code/about" },
    { type: "ODPP Policy", title: "National Prosecution Policy", locator: "[SECTION ON PLEA NEGOTIATIONS]", href: "/library/national-prosecution-policy/about" },
  ],
};

research["diversion-first-time"] = {
  kind: "insufficient",
  slug: "diversion-first-time",
  question: "Must first-time offenders always be offered diversion?",
  topic: "Diversion for first-time offenders",
  scope: "ODPP publications + Constitution",
  askedAt: "1 Oct 2026, 09:52",
  stats: { passages: 9, documents: 2 },
  lead: [],
  conditionsLabel: "",
  conditions: [],
  citations: [
    { n: 1, doc: "diversion-policy", docType: "ODPP Policy", locator: "[SECTION] Eligibility", pdf: 0, printed: 0, quote: "[Passage on eligibility for diversion]", clauses: ["diversion-policy-1"] },
    { n: 2, doc: "national-prosecution-policy", docType: "ODPP Policy", locator: "[SECTION]", pdf: 0, printed: 0, quote: "[Passage on alternatives to prosecution]", clauses: ["national-prosecution-policy-1"] },
  ],
  followUps: ["What conditions can be attached to diversion?", "Who decides whether a matter is diverted?"],
};

export const recentResearch = [
  { slug: "discontinue-a-prosecution", label: "When can the DPP discontinue a prosecution?" },
  { slug: "time-limit-charging", label: "Time limit for a charging decision" },
  { slug: "plea-agreement-matter", label: "Plea agreement — specific matter" },
  { slug: "diversion-first-time", label: "Diversion for first-time offenders" },
];

/* ---------- Search ---------- */

export type Hit = { doc: string; locator: string; pdf: number; snippet: string };

export const searchSets: Record<string, { term: string; hits: Hit[] }> = {
  plea: {
    term: "plea agreement",
    hits: [
      { doc: "criminal-procedure-code", locator: "s. 137A", pdf: 0, snippet: "…a public prosecutor and an accused person, or his legal representative, may negotiate and enter into a plea agreement in respect of…" },
      { doc: "criminal-procedure-code", locator: "s. 137F", pdf: 0, snippet: "…the court shall not accept a plea agreement unless it is satisfied that the agreement was entered into voluntarily…" },
      { doc: "national-prosecution-policy", locator: "[SECTION]", pdf: 0, snippet: "…[passage containing plea agreement from the policy]…" },
      { doc: "decision-to-charge", locator: "[SECTION]", pdf: 0, snippet: "…[passage containing plea agreement from the guidelines]…" },
    ],
  },
  discontinue: {
    term: "discontinue",
    hits: [
      { doc: "constitution", locator: "Art. 157(6)(c)", pdf: 98, snippet: "…subject to clause (7) and (8), discontinue at any stage before judgment is delivered any criminal proceedings…" },
      { doc: "constitution", locator: "Art. 157(8)", pdf: 99, snippet: "…The Director of Public Prosecutions may not discontinue a prosecution without the permission of the court." },
      { doc: "constitution", locator: "Art. 157(7)", pdf: 98, snippet: "…If the discontinuance of any proceedings under clause (6)(c) takes place after the close of the prosecution’s case…" },
      { doc: "decision-to-charge", locator: "[SECTION]", pdf: 0, snippet: "…[passage on when to discontinue a case under review]…" },
    ],
  },
};

export function runSearch(q: string) {
  const s = q.toLowerCase();
  if (!s.trim()) return null;
  if (s.includes("matatu")) return { term: q, hits: [] as Hit[] };
  if (s.includes("plea")) return searchSets.plea;
  return searchSets.discontinue;
}

/* ---------- My Documents ---------- */

export const saved = {
  research: [
    { slug: "discontinue-a-prosecution", title: "When can the DPP discontinue a prosecution?", meta: "4 sources · saved 4 Oct 2026", note: "For the [MATTER] review meeting" },
    { slug: "time-limit-charging", title: "Is there a time limit for making a charging decision?", meta: "Partial answer · saved 3 Oct 2026", note: "" },
  ],
  highlights: [
    { doc: "constitution", locator: "Art. 157(10)", pdf: 99, text: "…shall not be under the direction or control of any person or authority.", meta: "Highlighted 4 Oct 2026" },
    { doc: "constitution", locator: "Art. 157(11)", pdf: 99, text: "…have regard to the public interest, the interests of the administration of justice…", meta: "Highlighted 2 Oct 2026" },
  ],
  notes: [
    { title: "Discontinuance after close of prosecution case", body: "Art. 157(7) — acquittal follows. Check with supervisor before filing.", meta: "Edited 4 Oct 2026" },
  ],
};

export const defaultResearch = "discontinue-a-prosecution";

export const suggested = [
  { q: "When can the DPP discontinue a prosecution?", meta: "Constitution · Art. 157" },
  { q: "How is the public interest test applied when charging?", meta: "Decision to Charge Guidelines" },
  { q: "What are the rights of an arrested person?", meta: "Constitution · Art. 49" },
];

export const recent = [
  "When can the DPP discontinue a prosecution?",
  "Time limit for a charging decision",
  "Article 49 and police bail",
  "Diversion for first-time offenders",
];

export const collection = [
  { type: "Constitution", title: "The Constitution of Kenya, 2010", year: "2010", slug: "constitution" },
  { type: "ODPP Policy", title: "National Prosecution Policy", year: "[YEAR]", slug: "national-prosecution-policy" },
  { type: "ODPP Guidelines", title: "Decision to Charge Guidelines", year: "[YEAR]", slug: "decision-to-charge" },
  { type: "ODPP Policy", title: "Diversion Policy", year: "[YEAR]", slug: "diversion-policy" },
  { type: "Laws of Kenya", title: "Criminal Procedure Code", year: "Cap. 75", slug: "criminal-procedure-code" },
];

export const topics = [
  { title: "Charging decisions", note: "The evidential and public interest tests" },
  { title: "Plea agreements", note: "Negotiation, terms and court approval" },
  { title: "Diversion", note: "Alternatives to prosecution" },
  { title: "Rights of arrested persons", note: "Article 49 and the 24-hour rule" },
  { title: "Victims and witnesses", note: "Protection, support and participation" },
  { title: "Discontinuing a case", note: "Article 157 and the court’s permission" },
];

export const pad = (n: number) => String(n).padStart(2, "0");
