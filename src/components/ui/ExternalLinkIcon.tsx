interface ExternalLinkIconProps {
  className?: string;
}

export function ExternalLinkIcon({ className = "size-3.5" }: ExternalLinkIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        d="M6 3h7v7M13 3 6 10M9 13H3V7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
