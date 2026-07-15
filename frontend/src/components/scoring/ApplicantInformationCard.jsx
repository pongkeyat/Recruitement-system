import React from "react";

const ApplicantInformationCard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-6">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="bg-[#1E3A6D] px-6 py-4">
          <h2 className="text-lg font-bold text-white">
            👤 Applicant Information
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div>
              <p className="text-xs uppercase text-gray-400 font-semibold">
                Applicant Name
              </p>

              <h3 className="mt-2 font-semibold text-slate-800">
                Juan Dela Cruz
              </h3>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400 font-semibold">
                Application No.
              </p>

              <h3 className="mt-2 font-semibold text-slate-800">
                APP-2026-0001
              </h3>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400 font-semibold">
                Position Applied
              </p>

              <h3 className="mt-2 font-semibold text-slate-800">
                Utility Worker I
              </h3>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400 font-semibold">
                Status
              </p>

              <span className="inline-flex mt-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Qualified
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ApplicantInformationCard;