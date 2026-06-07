export default function PrimaryButton({
children,
className = "",
...props
}) {
return (
<button
className={`         bg-indigo-600
        hover:bg-indigo-700
        text-white
        font-semibold
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
