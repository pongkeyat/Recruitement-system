import { useEffect, useState } from "react";
import { getApplicationById } from "../../api/ApplicationApi";

export default function ApplicantSummaryCard({ applicationId }) {
  const [application, setApplication] = useState(null);

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = async () => {
    try {
      const data = await getApplicationById(applicationId);
      setApplication(data.data || data);
    } catch (err) {
      console.error("Failed to load application:", err);
    }
  };

  if (!application) return null;

  const fullName = [
    application.last_name,
    application.first_name,
    application.middle_name,
    application.suffix,
  ]
    .filter(Boolean)
    .join(", ");

  const initials = `${application.first_name?.[0] || ""}${
    application.last_name?.[0] || ""
  }`;

  const applicantNo = `APP-${new Date().getFullYear()}-${String(
    application.applicant_id
  ).padStart(5, "0")}`;

  const vacancyNo = `VCY-${new Date().getFullYear()}-${String(
    application.vacancy_id
  ).padStart(4, "0")}`;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#173F7A] text-yellow-400 flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {fullName}
            </h2>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
              <span>{applicantNo}</span>

              <span>•</span>

              <span>{application.sex}</span>

              <span>•</span>

              <span>
                {new Date(application.date_of_birth).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </span>

              <span>•</span>

              <span>{application.email_address}</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 min-w-[320px]">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Position Applied
          </p>

          <h3 className="text-xl font-bold text-slate-800">
            {application.position_title}
          </h3>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              {vacancyNo}
            </span>

            <span className="text-gray-400">•</span>

            <span className="text-sm text-gray-600">
              {application.office_unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}