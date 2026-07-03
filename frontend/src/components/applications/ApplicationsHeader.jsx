import { Briefcase, List, Printer, Info } from "lucide-react";

function ApplicationHeader() {
  return (
    <>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border-l-4 border-[#183B74] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-[#183B74]">
            <Briefcase size={20} />
            Receive Walk-In Application
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Record and log application documents submitted personally at the HR
            Office
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <List size={16} />
            All Applications
          </button>

          <button className="flex items-center gap-2 border border-blue-600 text-blue-600 rounded-lg px-4 py-2 text-sm hover:bg-blue-50">
            <Printer size={16} />
            Print Form
          </button>
        </div>
      </div>

      {/* Information */}
      <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg px-4 py-3 flex items-start gap-3">
        <div className="bg-blue-600 rounded-full p-1.5 text-white mt-0.5">
          <Info size={14} />
        </div>

        <p className="text-sm text-gray-700 leading-6">
          <span className="font-semibold">Walk-In Submission Only.</span> This
          form is for recording applications submitted personally at the HR
          Office. Pursuant to{" "}
          <span className="font-semibold">DepEd Order No. 007, s. 2023.</span>{" "}
          All fields marked with{" "}
          <span className="text-red-500">*</span> are required.
        </p>
      </div>
    </>
  );
}

export default ApplicationHeader;