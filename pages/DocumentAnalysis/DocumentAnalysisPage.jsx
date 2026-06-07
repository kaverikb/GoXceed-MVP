import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  Upload,
  FileText,
  FileOutput,
} from "lucide-react";

import { uploadDocument } from "../../services/documentService";
import { summarizeReport } from "../../services/documentService";
import { saveReport } from "../../services/reportService";

export default function DocumentAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] =
    useState(false);
  const [executiveSummary, setExecutiveSummary] =
    useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setShowNotification(false);
    setLoading(true);

    try {
      const result = await uploadDocument(file);
      setSummary(result.summary);
    } catch (error) {
      setSummary("Unable to analyze document.");
    }

    setLoading(false);
  };

  const handleExecutiveSummary = async () => {
    if (!summary) {
      alert("Generate a report first.");
      return;
    }

    try {
      const result = await summarizeReport(summary);
      setExecutiveSummary(result.summary);
    } catch (error) {
      alert("Unable to generate executive summary.");
    }
  };

  const handleSaveReport = async () => {
    if (!summary) {
      alert("Generate a report first.");
      return;
    }

    try {
      await saveReport({
        title: selectedFile
          ? selectedFile.name.replace(".pdf", "")
          : "Document Report",

        content: summary,

        source_file: selectedFile
          ? selectedFile.name
          : "Unknown",
      });

      setShowNotification(true);

      window.setTimeout(() => {
        setShowNotification(false);
      }, 2500);

    } catch (error) {
      alert("Unable to save report.");
    }
  };

  return (
    <MainLayout>
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-5xl mx-auto">

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

              animate-in
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
              text-xs
              text-slate-500
              mb-4
              "
            >
              DOCUMENT ANALYSIS
            </p>

            <h1
              className="
              text-[56px]
              font-bold
              leading-none
              text-slate-900
              "
            >
              Document Analysis
            </h1>

            <p
              className="
              mt-4
              text-[18px]
              text-slate-500
              "
            >
              Upload files, summarize content,
              and create reports.
            </p>

          </div>

          <div
            className="
            mt-10
            border-2
            border-dashed
            border-indigo-200
            rounded-[28px]
            bg-white
            h-65
            flex
            flex-col
            items-center
            justify-center
            text-center
            "
          >

            <Upload
              size={42}
              className="text-slate-400 mb-5"
            />

            <h3 className="text-[24px] font-medium mb-2">
              Drop files here or click to upload
            </h3>

            <p className="text-slate-500 mb-6">
              PDF files only
            </p>

            <label
              className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition
              cursor-pointer
              "
            >
              Choose File

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {selectedFile && (
              <p className="mt-4 text-sm text-slate-500">
                {selectedFile.name}
              </p>
            )}

          </div>

          {loading && (
            <div
              className="
              mt-8
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              "
            >
              Analyzing document...
            </div>
          )}

          {summary && !loading && (
            <div
              className="
              mt-8
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-8
              overflow-x-auto
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4 mt-6 text-slate-900">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-4 mt-6 text-slate-900">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mb-3 mt-5 text-slate-900">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="text-slate-700 leading-8 mb-4">
                      {children}
                    </p>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-bold text-slate-900">
                      {children}
                    </strong>
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
                    <table className="w-full border-collapse border border-slate-300 my-6">
                      {children}
                    </table>
                  ),

                  thead: ({ children }) => (
                    <thead className="bg-slate-50">
                      {children}
                    </thead>
                  ),

                  th: ({ children }) => (
                    <th className="border border-slate-300 px-4 py-3 text-left font-semibold">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="border border-slate-300 px-4 py-3 align-top">
                      {children}
                    </td>
                  ),

                  hr: () => (
                    <hr className="my-8 border-slate-200" />
                  ),
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          )}

          {executiveSummary && (
            <div
              className="
              mt-6
              bg-sky-50
              border
              border-sky-200
              rounded-3xl
              p-6
              "
            >
              <h3 className="font-semibold mb-4">
                Executive Summary
              </h3>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
              >
                {executiveSummary}
              </ReactMarkdown>
            </div>
          )}

          <div
            className="
            mt-10
            grid
            md:grid-cols-2
            gap-5
            "
          >

            <button
              onClick={handleExecutiveSummary}
              className="
              text-left
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              hover:border-indigo-300
              transition
              "
            >
              <div
                className="
                w-12
                h-12
                rounded-xl
                bg-indigo-50
                flex
                items-center
                justify-center
                text-indigo-600
                mb-5
                "
              >
                <FileText size={20} />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Summarize
              </h3>

              <p className="text-slate-500">
                Generate a shorter executive summary.
              </p>
            </button>

            <button
              onClick={handleSaveReport}
              className="
              text-left
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-6
              hover:border-indigo-300
              transition
              "
            >
              <div
                className="
                w-12
                h-12
                rounded-xl
                bg-indigo-50
                flex
                items-center
                justify-center
                text-indigo-600
                mb-5
                "
              >
                <FileOutput size={20} />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Create Report
              </h3>

              <p className="text-slate-500">
                Save analysis to Reports dashboard.
              </p>
            </button>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}