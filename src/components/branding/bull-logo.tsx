import { cn } from "@/lib/utils";

export function BullLogo({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl bg-accent/15 text-accent",
        compact ? "h-10 w-10" : "h-12 w-12",
        className
      )}
    >
      <svg
        aria-hidden="true"
        className={compact ? "h-6 w-6" : "h-7 w-7"}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 16H18.5C18.5 22.8 21.3 28.1 26.8 31.4C29.8 29.4 33.1 28.4 36 28.4C38.9 28.4 42.2 29.4 45.2 31.4C50.7 28.1 53.5 22.8 53.5 16H61C61 24.7 57.2 31.9 49.9 36.4L53.7 40.1L49.1 44.7L43.9 39.6C41.5 40.6 38.9 41.1 36 41.1C33.1 41.1 30.5 40.6 28.1 39.6L22.9 44.7L18.3 40.1L22.1 36.4C14.8 31.9 11 24.7 11 16Z"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.5 50L21.1 40.8V34.8L25.3 30.7L32 33.9L38.7 30.7L42.9 34.8V40.8L38.5 50H25.5Z"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 29.9C27.5 33 31.4 34.4 36 34.4C40.6 34.4 44.5 33 49 29.9"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M20.4 32.8C25.1 28.8 30 27 36 27C42 27 46.9 28.8 51.6 32.8"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
