import { ProfileAvatar } from "../ui/ProfileAvatar";
import { ScrollScene } from "../ui/ScrollScene";
import { TypewriterHeading } from "../ui/TypewriterHeading";

export function HeroSection() {
  return (
    <ScrollScene
      id="hero"
      className="section-hero pt-12 pb-8 md:pt-16 md:pb-12"
      bgClassName="bg-hero"
      stack={true}
      stackIndex={1}
    >
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-3 pb-6 text-center sm:px-4 md:px-8 md:pb-10">
        <ProfileAvatar />

        <span className="inline-block rounded-full border-2 border-border bg-white px-4 py-2 text-sm font-bold text-ink shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:border-zinc-500 dark:bg-zinc-800 dark:text-white">
          Open to opportunities
        </span>

        <TypewriterHeading />

        <p className="mx-auto w-full max-w-3xl text-center text-base font-semibold leading-relaxed text-body md:text-lg">
          Hi, I&apos;m Cyril Anak Raymond, a final year Bachelor of Computer Science with Honours
          (Network Engineering) student at Universiti Malaysia Sabah.
          <span className="mt-3 block">
          I am currently completing my internship actively seeking full-time graduate or 
          entry-level opportunities in Software Engineering, Test Development, IoT, IT Support, as well as mobile or web development roles in Sarawak, 
          Sabah, or remote environments.
          </span>
        </p>
      </div>
    </ScrollScene>
  );
}
