"use client";

type Props = {
  items: string[];
  reverse?: boolean;
  /** seconds per loop */
  duration?: number;
  className?: string;
};

/** Infinite horizontal marquee. Content is duplicated so the loop is seamless. */
export default function Marquee({
  items,
  reverse = false,
  duration = 30,
  className = "",
}: Props) {
  const Row = () => (
    <div
      className={`flex shrink-0 items-center gap-10 pr-10 ${
        reverse ? "animate-marquee-rev" : "animate-marquee"
      }`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-10">
          <span>{item}</span>
          <span className="text-cobalt" aria-hidden>
            ✳
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`flex w-full overflow-hidden ${className}`}>
      <Row />
      <Row />
    </div>
  );
}
