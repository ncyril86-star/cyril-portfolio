import { useRef } from "react";
import { projects } from "../../data/projects";
import { useCarousel3D } from "../../hooks/useCarousel3D";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { ScrollScene } from "../ui/ScrollScene";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

const carouselProjects = [
  ...projects.filter((p) => p.status === "completed"),
  ...projects.filter((p) => p.status === "ongoing"),
];

const arrowClass =
  "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-ink text-base font-bold text-white shadow-lg transition hover:scale-105 sm:size-10 sm:text-lg md:size-11 md:text-xl dark:border-teal/60 dark:bg-teal dark:text-white dark:shadow-teal/30";

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useCarousel3D(scrollRef, !reducedMotion);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const amount = card ? card.clientWidth + 16 : 300;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <ScrollScene id="projects" className="section-elevated" bgClassName="bg-projects" stackIndex={2}>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-8">
        <SectionHeading title="My Project" className="text-2xl md:text-3xl" />

        <p className="mt-2 text-center text-sm text-muted md:hidden">
          Swipe or use arrows to see more projects
        </p>

        <div className="mt-6 overflow-x-hidden overflow-y-visible md:mt-8">
          <div className="mx-auto flex max-w-full items-center justify-center gap-2 overflow-x-hidden overflow-y-visible px-2 sm:gap-3 md:gap-4 md:px-6">
            <button
              type="button"
              onClick={() => scroll("left")}
              className={arrowClass}
              aria-label="Previous projects"
            >
              ‹
            </button>

            <div
              ref={scrollRef}
              className="project-carousel-3d flex min-w-0 max-w-[calc(100vw-4.5rem)] gap-4 overflow-x-auto overflow-y-visible scroll-smooth px-6 py-10 pb-4 [scrollbar-width:none] sm:max-w-[calc(100vw-5.5rem)] sm:px-8 md:max-w-none md:w-max md:px-12 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            >
              {carouselProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scroll("right")}
              className={arrowClass}
              aria-label="Next projects"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
