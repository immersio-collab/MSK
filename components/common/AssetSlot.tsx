/**
 * Placeholder standing in for artwork that is still to be supplied.
 *
 * Deliberately styled rather than left blank, so the page reads as intentional
 * while the real illustrations and photography are outstanding. Each slot names
 * what belongs there and roughly what size it is drawn at.
 *
 * To swap one out, replace the <AssetSlot> element with the real
 * <Image>; nothing else in the section depends on it. `grep -rn AssetSlot`
 * lists every outstanding one.
 */
export const AssetSlot = ({
  label,
  hint,
  className,
  tone = "bg-msk-cream-200 text-msk-night-700",
}: {
  label: string;
  hint?: string;
  className?: string;
  tone?: string;
}) => (
  <div
    role="img"
    aria-label={`Emplacement visuel : ${label}`}
    className={`flex flex-col items-center justify-center gap-1 rounded-[1.5rem] border-2 border-dashed border-current/25 px-6 py-8 text-center ${tone} ${className ?? ""}`}
  >
    <span className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
      {label}
    </span>
    {hint ? <span className="text-xs opacity-70">{hint}</span> : null}
  </div>
);
