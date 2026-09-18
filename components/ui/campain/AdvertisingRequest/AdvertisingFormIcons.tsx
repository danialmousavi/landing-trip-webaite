type IconProps = {
  className?: string;
};

export function UserIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M6.5 19C7 16 8.9 14.5 12 14.5C15.1 14.5 17 16 17.5 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhoneIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.3 4.5L10 8.3L8.4 10C9.6 12.6 11.4 14.4 14 15.6L15.7 14L19.5 15.7V18.5C19.5 19.1 19.1 19.5 18.5 19.5C10.8 19.5 4.5 13.2 4.5 5.5C4.5 4.9 4.9 4.5 5.5 4.5H8.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CompanyIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="4"
        width="12"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M9 8H11M13 8H15M9 12H11M13 12H15M10 20V16H14V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GridIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="5"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="14"
        y="5"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="5"
        y="14"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <rect
        x="14"
        y="14"
        width="5"
        height="5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ChevronIcon({
  className,
}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 10L12 14L16 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}