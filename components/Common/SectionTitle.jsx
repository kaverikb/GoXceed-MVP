export default function SectionTitle({
  badge,
  title,
  subtitle,
}) {
  return (
    <div className="text-center">

      <p
        className="
        uppercase
        tracking-[6px]
        text-slate-500
        text-sm
        mb-5
        "
      >
        {badge}
      </p>

      <h2
        className="
        text-6xl
        md:text-7xl
        font-bold
        text-slate-900
        mb-6
        "
      >
        {title}
      </h2>

      <p
        className="
        text-xl
        text-slate-500
        max-w-3xl
        mx-auto
        "
      >
        {subtitle}
      </p>
    </div>
  );
}