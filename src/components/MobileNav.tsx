"use client";

import { useState } from "react";

const LINKS = [
  { href: "/providers", label: "Providers" },
  { href: "/models", label: "Models" },
  { href: "/promos", label: "Promos" },
  { href: "/promos/1-dollar-deals", label: "$1 deals" },
  { href: "/dev", label: "Dev" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#1c2534] bg-[#0c111b] px-3 font-mono text-sm text-[#e8eef6]"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-[#1c2534] bg-[#0c111b]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-t border-[#1c2534] px-5 py-3.5 font-mono text-sm uppercase tracking-wider text-[#e8eef6] active:bg-[#1c2534]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
