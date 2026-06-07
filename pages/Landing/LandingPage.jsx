import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";

export default function LandingPage() {
return ( <MainLayout>

  <section
    className="
    min-h-screen
    flex
    items-start
    justify-center
    pt-36
    px-6
    "
  >
    <div className="max-w-6xl mx-auto text-center">

      <p
        className="
        uppercase
        tracking-[7px]
        text-slate-500
        text-sm
        mb-10
        "
      >
        BUSINESS RESEARCH PLATFORM
      </p>

      <h1
        className="
        text-[72px]
        md:text-[96px]
        font-bold
        leading-[0.95]
        tracking-[-4px]
        text-slate-950
        "
      >
        Learn Faster.

        <span className="text-indigo-500">
          {" "}Research Smarter.
        </span>

        <br />

        Grow Further.
      </h1>

      <p
        className="
        mt-10
        text-[20px]
        leading-relaxed
        text-slate-500
        max-w-3xl
        mx-auto
        "
      >
        Access powerful tools for document analysis,
        business research & knowledge discovery all
        from a single workspace.
      </p>

      <div
        className="
        mt-14
        flex
        justify-center
        gap-4
        "
      >

        <Link to="/login">
          <SecondaryButton>
            Get a demo
          </SecondaryButton>
        </Link>

        <PrimaryButton>
          Get started for free →
        </PrimaryButton>

      </div>

    </div>
  </section>

</MainLayout>

);
}
