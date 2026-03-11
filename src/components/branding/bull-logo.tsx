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
          d="M12 21C17 14 23 11 29 11L24 4C33 6 38 10 41 16C45 12 50 10 56 9L51 18C54 20 56 24 56 29C56 38 49 45 40 45H24C15 45 8 38 8 29C8 26 9 23 12 21Z"
          className="fill-current"
          opacity="0.16"
        />
        <path
          d="M16 23C20 18 25 16 31 16C37 16 43 18 48 23M20 23L24 12M44 23L40 12"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 29C18 22.925 22.925 18 29 18H35C42.18 18 48 23.82 48 31C48 38.18 42.18 44 35 44H29C22.925 44 18 39.075 18 33V29Z"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 30H43M23 36H39"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
