import { ClipboardCheck, FileText, ArrowLeft } from "lucide-react";

export default function ApplicantsByIdHeader({
  application,
  onBack,
  onViewApplication,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
        {/* Left */}
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <ClipboardCheck className="text-blue-700" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Initial Screening Checklist
            </h1>

            <p className="mt-1 text-gray-600 text-sm">
              <span className="font-semibold text-blue-700">
                LUSDO-APP-{application.applicant_id}
              </span>
              {" — "}
              {application.office_unit}
              {" — "}
              {application.position_title}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onBack}
            className="px-5 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 transition text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={onViewApplication}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition text-sm font-medium"
          >
            <FileText size={18} />
            View Full Application
          </button>
        </div>
      </div>
    </div>
  );
}