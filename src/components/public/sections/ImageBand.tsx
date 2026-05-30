import Image from "next/image";
import { Reveal } from "@/components/public";
import { cn } from "@/lib/utils";

interface ImageBandProps {
  src: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-[21/9]" (default) or "aspect-[3/1]". */
  ratioClassName?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}

/** Full-width image band — a large visual breather between content sections. */
export function ImageBand({
  src,
  alt,
  ratioClassName = "aspect-[21/9]",
  caption,
  priority = false,
  className,
}: ImageBandProps) {
  return (
    <Reveal variant="img" className={cn("relative", className)}>
      <div className={cn("relative w-full overflow-hidden", ratioClassName)}>
        <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className="object-cover" />
      </div>
      {caption && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink-mute mt-3 px-(--rg-pad-x)">
          {caption}
        </p>
      )}
    </Reveal>
  );
}
