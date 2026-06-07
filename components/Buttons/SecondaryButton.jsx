export default function SecondaryButton({
children,
className = "",
...props
}) {
return (
<button
className={`         bg-white
        border
        border-slate-200
        hover:border-slate-300
        text-slate-900
        font-medium
        px-10
        py-4
        rounded-xl
        transition-all
        duration-200
        ${className}
      `}
{...props}
>
{children} </button>
);
}
