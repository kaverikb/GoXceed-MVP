import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function Navbar() {
const location = useLocation();

const links = [
{ label: "Home", path: "/" },
{ label: "Explore", path: "/explore" },
{ label: "Business Research", path: "/business-research" },
{ label: "AI Chat", path: "/ai-chat" },
{ label: "Document Analysis", path: "/document-analysis" },
{ label: "Reports", path: "/reports" },
];

return ( <header className="sticky top-0 z-50 bg-white border-b border-slate-100"> <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">


    <Link
      to="/"
      className="text-[26px] font-bold text-slate-900"
    >
      GoXceed
    </Link>

    <nav className="flex items-center gap-2">

      {links.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`
            px-5 py-3 rounded-xl text-[17px] transition-all
            ${
              location.pathname === item.path
                ? "bg-slate-100 text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }
          `}
        >
          {item.label}
        </Link>
      ))}

    </nav>

    <div className="flex items-center gap-5">

      <Link
        to="/login"
        className="text-slate-900 text-lg"
      >
        Get a demo
      </Link>

      <PrimaryButton className="px-8 py-3 rounded-xl">
        Get started
      </PrimaryButton>

    </div>
  </div>
</header>

);
}
