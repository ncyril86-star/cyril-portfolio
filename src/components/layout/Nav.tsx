import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

const navLinks: NavLink[] = [
  { label: "Education", href: "#education" },
  { label: "Project", href: "#projects" },
  { label: "Experience", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Contact", href: "#contact" },
];

function NavAnchor({
  link,
  className,
  onNavigate,
}: {
  link: NavLink;
  className: string;
  onNavigate?: () => void;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    );
  }

  return (
    <a
      href={link.href}
      className={className}
      onClick={(e) => {
        if (link.href.startsWith("#")) {
          // Internal anchor — smooth scroll to target and prevent default hash jump
          e.preventDefault();
          const id = link.href.slice(1);
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          onNavigate?.();
        } else {
          onNavigate?.();
        }
      }}
    >
      {link.label}
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-6 md:py-4">
        <nav
          className="pointer-events-auto relative mx-auto flex max-w-2xl items-center justify-between rounded-full px-3 py-2 backdrop-blur-md bg-zinc-200/25 dark:bg-zinc-900/38 border border-zinc-300/25 dark:border-zinc-800/38 shadow-sm"
        aria-label="Main navigation"
      >
        <a href="#hero" className="font-display text-lg font-bold text-ink dark:text-white">
          Cyril Noel
        </a>

        <div className="hidden items-center gap-4 rounded-full px-4 py-1 md:flex bg-zinc-200/15 dark:bg-zinc-900/28 border border-zinc-300/15 dark:border-zinc-800/28 backdrop-blur-sm">
          {navLinks.map((link) => (
            <NavAnchor
              key={link.href}
              link={link}
              className="text-sm font-bold text-ink transition hover:text-coral dark:text-zinc-100 dark:hover:text-coral-dark"
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full text-ink transition hover:bg-zinc-400/18 md:hidden dark:text-white dark:hover:bg-zinc-600/28 bg-zinc-200/12 dark:bg-zinc-900/20 border border-zinc-300/12 dark:border-zinc-800/14"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open ? (
          <div className="absolute left-2 right-2 top-full mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden bg-zinc-100/30 dark:bg-zinc-900/40 border border-zinc-200/10 dark:border-zinc-800/30 backdrop-blur-sm">
            {navLinks.map((link) => (
              <NavAnchor
                key={link.href}
                link={link}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-zinc-400/50 dark:text-white dark:hover:bg-zinc-600/50"
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
