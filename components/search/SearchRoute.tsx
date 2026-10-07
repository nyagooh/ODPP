"use client";

import { use } from "react";
import { SearchView } from "./SearchView";

type SP = Promise<Record<string, string | string[] | undefined>>;

export function SearchRoute({ searchParams, ...rest }: { searchParams: SP } & Omit<React.ComponentProps<typeof SearchView>, "q">) {
  const sp = use(searchParams);
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q) ?? "";
  return <SearchView key={q} q={q} {...rest} />;
}
