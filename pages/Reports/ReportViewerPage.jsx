import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  ArrowLeft,
} from "lucide-react";

import {
  getReportById,
} from "../../services/reportService";

export default function ReportViewerPage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [report, setReport] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadReport =
      async () => {

        try {

          const data =
            await getReportById(
              id
            );

          setReport(data);

        } catch (error) {
          console.error(error);
        }

        setLoading(false);
      };

    loadReport();

  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="px-6 pt-20">
          Loading report...
        </div>
      </MainLayout>
    );
  }

  if (!report) {
    return (
      <MainLayout>
        <div className="px-6 pt-20">
          Report not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <section className="px-6 pt-16 pb-20">

        <div className="max-w-5xl mx-auto">

          <button
            onClick={() =>
              navigate("/reports")
            }
            className="
            flex
            items-center
            gap-2
            border
            border-slate-200
            bg-white
            px-5
            py-3
            rounded-xl
            mb-8
            "
          >
            <ArrowLeft
              size={16}
            />
            Back
          </button>

          <div
            className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            "
          >

            <h1
              className="
              text-4xl
              font-bold
              text-slate-900
              "
            >
              {report.title}
            </h1>

            <p
              className="
              text-slate-500
              mt-3
              "
            >
              Created on {report.date}
            </p>

            <div
              className="
              mt-8
              border-t
              border-slate-200
              pt-8
              "
            >

              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                ]}
                components={{
                  h1: ({
                    children,
                  }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4">
                      {children}
                    </h1>
                  ),

                  h2: ({
                    children,
                  }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-4">
                      {children}
                    </h2>
                  ),

                  h3: ({
                    children,
                  }) => (
                    <h3 className="text-xl font-semibold mt-6 mb-3">
                      {children}
                    </h3>
                  ),

                  p: ({
                    children,
                  }) => (
                    <p className="text-slate-700 leading-8 mb-4">
                      {children}
                    </p>
                  ),

                  ul: ({
                    children,
                  }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      {children}
                    </ul>
                  ),

                  ol: ({
                    children,
                  }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-2">
                      {children}
                    </ol>
                  ),

                  table: ({
                    children,
                  }) => (
                    <table className="w-full border border-slate-300 my-6">
                      {children}
                    </table>
                  ),

                  th: ({
                    children,
                  }) => (
                    <th className="border border-slate-300 px-4 py-3 bg-slate-50 text-left">
                      {children}
                    </th>
                  ),

                  td: ({
                    children,
                  }) => (
                    <td className="border border-slate-300 px-4 py-3">
                      {children}
                    </td>
                  ),
                }}
              >
                {report.content}
              </ReactMarkdown>

            </div>

          </div>

        </div>

      </section>

    </MainLayout>
  );
}