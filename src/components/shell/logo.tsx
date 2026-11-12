import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Habi, inicio"
      className="text-brand flex items-center gap-1.5 rounded-sm"
    >
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <path
          fill="currentColor"
          d="M16 3 3 13.5V29h9.5v-8.5h7V29H29V13.5L16 3Zm0 4.1 9 7.3V26h-2.5v-8.5h-13V26H7V14.4l9-7.3Z"
        />
      </svg>
      <span className="text-2xl font-extrabold tracking-tight">habi</span>
    </Link>
  );
}
