import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  Building2,
  TrendingUp,
  Target,
  Search,
  FileOutput,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  runResearch,
} from "../../services/researchService";

import {
  saveReport,
} from "../../services/reportService";

export default function BusinessResearchPage() {
  const [company, setCompany] = useState("");

  const [research, setResearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showNotification,
    setShowNotification] =
    useState(false);

  const handleResearch =
    async () => {

      if (!company.trim())
        return;

      setLoading(true);

      try {

        const result =
          await runResearch(
            company
          );

        setResearch(
          result
        );

      } catch {

        setResearch(
          "Unable to generate research."
        );
      }

      setLoading(false);
    };

  const handleSaveReport =
    async () => {

      if (!research)
        return;

      try {

        await saveReport({
          title:
            `${company} Research`,
          content:
            research,
          source_file:
            company,
        });

        setShowNotification(
          true
        );

        setTimeout(() => {
          setShowNotification(
            false
          );
        }, 2500);

      } catch {

        alert(
          "Unable to save report."
        );
      }
    };

  const cleanBrTags = (content) => {
    if (typeof content === 'string') {
      return content.replace(/<br\s*\/?>/gi, '\n');
    }
    return content;
  };

  return (
    <MainLayout>
      <section className="px-6 pt-24 pb-20">

        <div className="max-w-6xl mx-auto">

          {showNotification && (
            <div
              className="
              fixed
              top-6
              right-6
              z-50
              bg-sky-50
              border
              border-sky-200
              rounded-2xl
              px-5
              py-4
              shadow-lg
              "
            >
              <p className="text-sky-900 font-semibold">
                Report Created
              </p>

              <p className="text-sky-700 text-sm mt-1">
                You can view it in the Reports section.
              </p>
            </div>
          )}

          <div className="text-center">

            <p
              className="
              uppercase
              tracking-[6px]
              text-sm
              text-slate-500
              mb-5
              "
            >
              BUSINESS RESEARCH
            </p>

            <h1
              className="
              text-[72px]
              font-bold
              leading-none
              text-slate-900
              "
            >
              Business Research
            </h1>

            <p
              className="
              mt-6
              text-[22px]
              text-slate-500
              "
            >
              Generate company insights, market research,
              SWOT analysis & more.
            </p>

          </div>

          <div
            className="
            mt-16
            flex
            gap-4
            "
          >

            <div className="relative flex-1">

              <Search
                size={20}
                className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-slate-400
                "
              />

              <input
                type="text"
                value={company}
                onChange={(e) =>
                  setCompany(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    handleResearch();
                  }
                }}
                placeholder="Enter a company, industry or topic..."
                className="
                w-full
                h-16
                rounded-2xl
                border
                border-slate-200
                bg-white
                pl-14
                pr-4
                outline-none
                focus:border-indigo-400
                "
              />

            </div>

            <button
              onClick={
                handleResearch
              }
              disabled={
                loading
              }
              className="
              px-12
              h-16
              rounded-2xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              transition
              "
            >
              {loading
                ? "Researching..."
                : "Research"}
            </button>

          </div>

          {!research && (

            <div
              className="
              mt-16
              grid
              md:grid-cols-3
              gap-6
              "
            >

              <div className="bg-white border border-slate-200 rounded-[28px] p-8">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <Building2 size={24} />
                </div>

                <h3 className="text-[22px] font-semibold mb-4">
                  Company Insights
                </h3>

                <p className="text-slate-500 text-lg">
                  Deep profile, financials and leadership overview.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-[28px] p-8">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <TrendingUp size={24} />
                </div>

                <h3 className="text-[22px] font-semibold mb-4">
                  Market Research
                </h3>

                <p className="text-slate-500 text-lg">
                  Industry trends, sizing and competitive landscape.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-[28px] p-8">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <Target size={24} />
                </div>

                <h3 className="text-[22px] font-semibold mb-4">
                  SWOT Analysis
                </h3>

                <p className="text-slate-500 text-lg">
                  Strengths, weaknesses, opportunities and threats.
                </p>
              </div>

            </div>
          )}

          {research && (

            <>
              <div
                className="
                mt-16
                bg-white
                border
                border-slate-200
                rounded-[28px]
                p-8
                overflow-x-auto
                "
              >

                <ReactMarkdown
                  remarkPlugins={[
                    remarkGfm,
                  ]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mt-8 mb-6 text-slate-900">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mt-7 mb-5 text-slate-900">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-6 mb-4 text-slate-900">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-slate-700 leading-7 mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-4 space-y-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-slate-700">
                        {children}
                      </li>
                    ),
                    table: ({ children }) => (
                      <table className="w-full border-collapse border border-slate-300 my-6 text-sm">
                        {children}
                      </table>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-slate-100">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => {
                      const content = cleanBrTags(
                        typeof children === 'string'
                          ? children
                          : String(children)
                      );
                      return (
                        <th className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900 whitespace-normal">
                          {content.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </th>
                      );
                    },
                    td: ({ children }) => {
                      const content = cleanBrTags(
                        typeof children === 'string'
                          ? children
                          : String(children)
                      );
                      return (
                        <td className="border border-slate-300 px-4 py-3 text-slate-700 whitespace-normal">
                          {content.split('\n').map((line, i) => (
                            <div key={i} className="mb-2">
                              {line}
                            </div>
                          ))}
                        </td>
                      );
                    },
                    hr: () => (
                      <hr className="my-8 border-slate-200" />
                    ),
                  }}
                >
                  {research}
                </ReactMarkdown>

              </div>

              <div
                className="
                mt-6
                "
              >

                <button
                  onClick={
                    handleSaveReport
                  }
                  className="
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-6
                  text-left
                  w-full
                  "
                >
                  <FileOutput
                    size={20}
                    className="mb-4 text-indigo-600"
                  />

                  <h3 className="text-xl font-semibold mb-2">
                    Create Report
                  </h3>

                  <p className="text-slate-500">
                    Save to Reports section.
                  </p>
                </button>

              </div>

            </>
          )}

        </div>

      </section>
    </MainLayout>
  );
}