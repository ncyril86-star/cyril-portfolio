import { experiences } from "../../data/experience";
import { ScrollScene } from "../ui/ScrollScene";
import { SectionHeading } from "../ui/SectionHeading";
import { ExperienceTimeline } from "./ExperienceTimeline";

export function WorkSection() {
  return (
    <ScrollScene id="work" className="section-alt" bgClassName="bg-work" stackIndex={3}>
      <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-8">
        <SectionHeading title="Experience" className="text-2xl md:text-3xl" />
        <ExperienceTimeline items={experiences} />
      </div>
    </ScrollScene>
  );
}
