import { expertiseGroups } from "../../data/expertise";
import { ScrollScene } from "../ui/ScrollScene";
import { SectionHeading } from "../ui/SectionHeading";

export function ExpertiseSection() {
  return (
    <ScrollScene
      id="expertise"
      className="section-elevated"
      bgClassName="bg-expertise"
      stack={true}
      stackIndex={4}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading title="Expertise" className="text-2xl md:text-3xl" />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {expertiseGroups.map((group, index) => {
            // center the last card if it's the only item in the final row
            // For 3-column layout, if total % 3 === 1 and this is the last item,
            // apply mx-auto to center it.
            const total = expertiseGroups.length;
            const isLast = index === total - 1;
            const singleLastInRow = total % 3 === 1 && isLast;

            return (
              <article
                key={group.id}
                // ensure each card fills its grid column and when there is a
                // single item in the final row, place it in the middle column
                className={`section-card rounded-2xl p-5 w-full ${singleLastInRow ? "sm:col-start-2" : ""}`}
              >
                <h3 className="font-display text-lg font-bold text-ink">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border bg-cream px-2.5 py-1 text-xs font-semibold text-ink dark:border-zinc-500 dark:bg-zinc-700 dark:text-white"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </ScrollScene>
  );
}
