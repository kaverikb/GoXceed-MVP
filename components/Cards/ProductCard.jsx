import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProductCard({
  icon,
  title,
  description,
  link,
}) {
  return (
    <Link
      to={link}
      className="
      bg-white
      border
      border-slate-200
      rounded-[28px]
      p-10
      h-80
      flex
      flex-col
      transition-all
      duration-300
      hover:border-indigo-300
      hover:shadow-[0_10px_25px_rgba(99,102,241,0.08)]
      "
    >
      <div
        className="
        w-16
        h-16
        rounded-2xl
        bg-indigo-50
        flex
        items-center
        justify-center
        text-indigo-600
        mb-8
        "
      >
        {icon}
      </div>

      <h3 className="text-[22px] font-semibold text-slate-900 mb-4">
        {title}
      </h3>

      <p className="text-slate-500 text-[18px] leading-9 flex-1">
        {description}
      </p>

      <div className="flex items-center gap-2 text-indigo-600 font-medium">
        Open
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}