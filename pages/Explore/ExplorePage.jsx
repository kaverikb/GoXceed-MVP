import MainLayout from "../../layouts/MainLayout";
import ProductCard from "../../components/Cards/ProductCard";

import {
  Briefcase,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function ExplorePage() {
  return (
    <MainLayout>
      <section
        className="
        min-h-screen
        px-6
        pt-16
        pb-20
        "
      >
        <div className="max-w-6xl mx-auto">

          <div className="text-center">

            <p
              className="
              uppercase
              tracking-[5px]
              text-xs
              text-slate-500
              mb-4
              "
            >
              EXPLORE
            </p>

            <h1
              className="
              text-[56px]
              font-bold
              leading-none
              text-slate-900
              "
            >
              Explore our product
            </h1>

            <p
              className="
              mt-4
              text-[18px]
              text-slate-500
              "
            >
              Three powerful workspaces, one platform.
            </p>

          </div>

          <div
            className="
            mt-14
            flex
            justify-center
            items-stretch
            gap-5
            "
          >

            <div className="w-75">
              <ProductCard
                icon={<Briefcase size={24} />}
                title="Business Research"
                description="Generate company insights, market research, SWOT analysis & more."
                link="/business-research"
              />
            </div>

            <div className="w-105">
              <ProductCard
                icon={<MessageSquare size={24} />}
                title="AI Chat"
                description="General purpose AI assistant for business questions, content creation and productivity."
                link="/ai-chat"
              />
            </div>

            <div className="w-75">
              <ProductCard
                icon={<FileText size={24} />}
                title="Document Analysis"
                description="Upload files, summarize content, ask questions and create reports."
                link="/document-analysis"
              />
            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}