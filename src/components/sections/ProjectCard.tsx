import { ExternalLinkIcon } from "../ui/ExternalLinkIcon";
import { ProjectStatusBadge } from "../ui/ProjectStatusBadge";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const showMakanSedapLink = project.id === "makan-sedap" && Boolean(project.linkUrl);
  const imageContain = project.imageFit === "contain";
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = innerRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const rx = (-dy / rect.height) * 8; // rotateX
      const ry = (dx / rect.width) * 10; // rotateY
      const tz = Math.min(12, Math.hypot(dx, dy) / 30);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = "perspective(900px) translateZ(0px) rotateX(0deg) rotateY(0deg)";
      });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <article
      data-carousel-card
      className="project-card-3d flex w-[calc(100vw-2.5rem)] max-w-[340px] shrink-0 snap-center sm:w-[300px]"
    >
      <div ref={innerRef} className="project-card-3d__inner will-change-transform transition-transform duration-200 ease-out flex w-full flex-col gap-3 rounded-2xl p-4">
        <div
          className={`relative overflow-hidden rounded-xl ${
            imageContain
              ? project.imageBgClass ?? "bg-white dark:bg-white/95"
              : ""
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            className={
              imageContain
                ? "aspect-[16/10] w-full object-contain object-center p-1 sm:p-2"
                : "aspect-[16/10] w-full object-cover object-top"
            }
          />
          <ProjectStatusBadge status={project.status} />
        </div>

        <h3 className="font-display text-base font-bold leading-snug text-ink sm:text-[17px]">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-ink/90 dark:text-body">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-900 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-zinc-200 pt-3 dark:border-zinc-600">
          {showMakanSedapLink ? (
            <a
              href={project.linkUrl}
              className="inline-flex cursor-pointer items-center gap-1.5 font-display text-sm font-bold text-coral hover:underline dark:text-[#ff8585]"
            >
              View Live Project
              <ExternalLinkIcon />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
