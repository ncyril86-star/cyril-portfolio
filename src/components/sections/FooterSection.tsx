import { ScrollScene } from "../ui/ScrollScene";

export function FooterSection() {
  return (
    <ScrollScene
      id="contact"
      className="section-footer px-3 py-16 sm:px-4 md:px-8 md:py-20"
      bgClassName="bg-footer"
      stack={true}
      stackIndex={6}
      compact={true}
    >
      <footer className="mx-auto w-full max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Let&apos;s work together
        </h2>
        <p className="mt-3 text-body">
          Open to jobs, collaborations, and freelance projects.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="mailto:ncyril86@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <img src="/icons/email.svg" alt="" aria-hidden="true" className="size-4" />
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/cyril-noel-anak-raymond-60817219a"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            <img src="/icons/linkedin.svg" alt="" aria-hidden="true" className="size-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/ncyril86-star"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition hover:bg-zinc-100"
          >
            <img src="/icons/github.svg" alt="" aria-hidden="true" className="size-4" />
            GitHub
          </a>
        </div>

        <p className="mt-10 text-sm text-muted">
          © {new Date().getFullYear()} Cyril Noel. All rights reserved.
        </p>
      </footer>
    </ScrollScene>
  );
}
