"use client";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  const maxWidth = align === "center" ? "mx-auto" : "";

  return (
    <div className={`${textAlign} ${maxWidth} ${className}`}>
      <p className="section-num" aria-hidden="true">
        {number}
      </p>
      <h2 className="mt-3 section-title reveal-line">
        <span>{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-5 section-subtitle reveal-line" style={{ animationDelay: "200ms" }}>
          <span>{subtitle}</span>
        </p>
      )}
    </div>
  );
}