import Navbar from "../components/Navbar/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="bg-[#F6F7FB] min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}