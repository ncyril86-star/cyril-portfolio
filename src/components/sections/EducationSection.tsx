import { educationPath } from "../../data/education";
import { ScrollScene } from "../ui/ScrollScene";
import { SectionHeading } from "../ui/SectionHeading";
import { ExperienceTimeline } from "./ExperienceTimeline";

export function EducationSection() {
  return (
    <ScrollScene
      id="education"
      className="section-journey"
      bgClassName="bg-education"
      stackIndex={2}
    >
      <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-8">
        <SectionHeading title="Education Journey" className="text-2xl md:text-3xl" />
        <ExperienceTimeline items={educationPath} variant="journey" />
      </div>
    </ScrollScene>
  );
}
