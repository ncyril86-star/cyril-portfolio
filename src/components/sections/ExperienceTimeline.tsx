import type { Experience } from "../../types";

const accentStyles = {
  coral: {
    dot: "bg-coral",
    ring: "ring-coral/25",
    badge: "bg-coral/15 text-coral dark:text-coral-dark",
  },
  teal: {
    dot: "bg-teal",
    ring: "ring-teal/25",
    badge: "bg-teal/15 text-teal",
  },
  yellow: {
    dot: "bg-yellow",
    ring: "ring-yellow/30",
    badge: "bg-yellow/25 text-zinc-800 dark:text-yellow",
  },
} as const;

interface ExperienceTimelineProps {
  items: Experience[];
  variant?: "default" | "journey";
}

export function ExperienceTimeline({ items, variant = "default" }: ExperienceTimelineProps) {
  const ordered = [...items].reverse();
  const timelineClass =
    variant === "journey"
      ? "experience-timeline experience-timeline--journey"
      : "experience-timeline";

  return (
    <ol className={`${timelineClass} relative mt-8 border-l-2 md:mt-10 md:ml-2`}>
      {ordered.map((item, index) => {
        const accent = accentStyles[item.accent];
        const isLast = index === ordered.length - 1;

        return (
          <li
            key={item.id}
            className={`relative pl-7 sm:pl-9 ${isLast ? "pb-0" : "pb-10 md:pb-12"}`}
          >
            <span
              className={`absolute -left-[9px] top-1.5 z-10 size-4 rounded-full border-[3px] border-[var(--timeline-surface)] ring-4 ring-[var(--timeline-surface)] ${accent.dot}`}
              aria-hidden
            />

            <article className="section-card rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <time
                    dateTime={item.period.replace(/\s/g, "")}
                    className="font-display text-xs font-bold uppercase tracking-wide text-muted"
                  >
                    {item.period}
                  </time>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink md:text-xl">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-body">
                    {item.company}
                  </p>
                </div>
                <span
                  className={`hidden w-fit shrink-0 rounded-full px-3 py-1 text-xs font-bold sm:inline-flex ${accent.badge}`}
                >
                  {item.period}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-body md:text-[15px]">
                {item.description}
              </p>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
