import { Icon } from "@iconify/react/dist/iconify.js";

interface CardProps {
  title: string;
  link?: string;
  height?: string;
  children?: React.ReactNode;
}

export default function Card({
  title,
  link,
  height = "h-[300px]",
  children,
}: CardProps) {
  return (
    <div
      className={`w-full rounded-lg border border-[var(--border-nav)] bg-[var(--bg-primary)] ${height} p-4`}>
      <div className="flex flex-row justify-between items-center">
        {/* Title */}
        <span className="text-[var(--text-primary)] text-xl font-semibold">
          {title}
        </span>

        {/* Action link */}
        {link && (
          <a
            href={link}
            className="flex items-center gap-1 text-[var(--text-link)] hover:text-[var(--text-link-hover)] underline underline-offset-2">
            More
            <Icon
              icon="formkit:right"
              className="w-4 h-4"
            />
          </a>
        )}
      </div>

      {/* Body content */}
      {children}
    </div>
  );
}
