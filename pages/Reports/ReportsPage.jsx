import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
  Eye,
  Trash2,
  FileText,
} from "lucide-react";

import {
  getReports,
  deleteReport,
} from "../../services/reportService";

import { useNavigate } from "react-router-dom";

export default function ReportsPage() {
  const [reports, setReports] =
    useState([]);

  const navigate =
    useNavigate();

  const loadReports =
    async () => {
      try {
        const data =
          await getReports();

        setReports(data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadReports();
  }, []);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this report?"
        );

      if (!confirmDelete)
        return;

      await deleteReport(id);

      loadReports();
    };

  return (
    <MainLayout>
      <section className="px-6 pt-16 pb-20">

        <div className="max-w-6xl mx-auto">

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
              REPORTS
            </p>

            <h1
              className="
              text-[56px]
              font-bold
              leading-none
              text-slate-900
              "
            >
              Saved Reports
            </h1>

            <p
              className="
              mt-4
              text-[18px]
              text-slate-500
              "
            >
              View, manage and delete
              previously generated reports.
            </p>

          </div>

          {reports.length === 0 ? (

            <div
              className="
              mt-12
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-10
              text-center
              "
            >
              <h3 className="text-xl font-semibold">
                No reports yet
              </h3>

              <p className="text-slate-500 mt-2">
                Create a report from
                Document Analysis.
              </p>
            </div>

          ) : (

            <div
              className="
              mt-12
              grid
              md:grid-cols-2
              gap-6
              "
            >

              {reports.map(
                (report) => (

                  <div
                    key={report.id}
                    className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    p-6
                    "
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <div
                          className="
                          w-12
                          h-12
                          rounded-xl
                          bg-indigo-50
                          text-indigo-600
                          flex
                          items-center
                          justify-center
                          mb-4
                          "
                        >
                          <FileText
                            size={20}
                          />
                        </div>

                        <h3
                          className="
                          text-xl
                          font-semibold
                          "
                        >
                          {report.title}
                        </h3>

                        <p
                          className="
                          text-slate-500
                          text-sm
                          mt-2
                          "
                        >
                          {report.date}
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          navigate(
                            `/reports/${report.id}`
                          )
                        }
                        className="
                        flex
                        items-center
                        gap-2
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        "
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            report.id
                          )
                        }
                        className="
                        flex
                        items-center
                        gap-2
                        border
                        border-red-200
                        text-red-600
                        px-5
                        py-3
                        rounded-xl
                        "
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          )}

        </div>

      </section>
    </MainLayout>
  );
}