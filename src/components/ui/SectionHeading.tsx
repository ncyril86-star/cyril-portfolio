interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className = "" }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2
        className={`text-center font-display font-bold tracking-tight text-ink ${className}`}
      >
        {title}
      </h2>
      <span
        className="h-1.5 w-14 rounded-full bg-coral shadow-sm"
        aria-hidden
      />
    </div>
  );
}
