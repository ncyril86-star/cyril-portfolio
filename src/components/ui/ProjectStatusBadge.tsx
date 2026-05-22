import type { ProjectStatus } from "../../types";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  if (status === "ongoing") {
    return (
      <span className="absolute right-2 top-2 flex items-center gap-2 rounded-lg bg-[#fde047] px-2.5 py-1.5 text-xs font-bold text-zinc-900 shadow-sm">
        <span className="size-2 shrink-0 rounded-full bg-[#ef4444]" aria-hidden />
        Ongoing
      </span>
    );
  }

  return (
    <span className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full border border-[#86efac]/80 bg-[#f0fdf4]/92 px-2.5 py-1 text-xs font-bold text-[#15803d] shadow-sm backdrop-blur-sm dark:border-emerald-600/50 dark:bg-emerald-950/75 dark:text-emerald-200">
      <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-[9px] leading-none text-white" aria-hidden>
        ✓
      </span>
      Completed
    </span>
  );
}
