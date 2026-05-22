import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const firstLine = "Welcome to";
const secondLine = "my portfolio";

export function TypewriterHeading() {
  const reduced = usePrefersReducedMotion();
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (reduced) {
      setCharIndex(secondLine.length);
      return;
    }

    if (charIndex < secondLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 55);
      return () => clearTimeout(t);
    }
  }, [charIndex, reduced]);

  const display = secondLine.slice(0, charIndex);
  const showCaret = !reduced && charIndex < secondLine.length;

  return (
    <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
      <span className="block text-ink dark:text-white">{firstLine}</span>
      <span className="mt-1 flex flex-wrap items-center justify-center gap-2 text-[#ff5555] dark:text-[#ff8585]">
        <span>{display}</span>
        <img
          src="/icons/waving-hand.svg"
          alt=""
          className="wave-hand size-10 sm:size-12"
          width={48}
          height={48}
        />
        {showCaret ? (
          <span className="typewriter-caret ml-1 inline-block h-[1em] w-[3px] bg-coral" />
        ) : null}
      </span>
    </h1>
  );
}
